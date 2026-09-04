#!/usr/bin/env node
// Assembles public/*.html from templates/ + src/pages/*.html + src/pages.config.mjs.
// Run `npm run build` after editing anything in templates/ or src/, and commit the
// regenerated public/*.html — Cloudflare serves that directory as-is.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { NAV, PAGES } from '../src/pages.config.mjs';
import { SITE, PORTFOLIO_URLS } from '../src/site.config.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(join(root, path), 'utf8');

const pageTemplate = read('templates/page.html');
const headerTemplate = read('templates/header.html').trimEnd();
const footerTemplate = read('templates/footer.html').trimEnd();

function readBuildNumber() {
  const file = join(root, 'build-number.json');
  if (!existsSync(file)) return '0000.00.00.000';
  const { date, build } = JSON.parse(readFileSync(file, 'utf8'));
  return `${date}.${String(build).padStart(3, '0')}`;
}

// camelCase site.config.mjs keys become {{UPPER_SNAKE_CASE}} tokens, e.g.
// phoneDisplay -> {{PHONE_DISPLAY}}. Every token is replaced everywhere it
// appears — in templates and in page content alike — so contact details
// only ever need to be typed once.
function tokensFromSite(site, buildNumber) {
  const tokens = { BUILD_NUMBER: buildNumber };
  for (const [key, value] of Object.entries(site)) {
    const token = key.replace(/[A-Z]/g, (c) => `_${c}`).toUpperCase();
    tokens[token] = value;
  }
  return tokens;
}

function replaceTokens(html, tokens) {
  let out = html;
  for (const [token, value] of Object.entries(tokens)) {
    out = out.replaceAll(`{{${token}}}`, value);
  }
  return out;
}

// External nav entries (e.g. the Proof of Work brochure, hosted off-site)
// open in a new tab — same auto-detection kington-parishes' footer nav uses.
function externalAttrs(href) {
  return /^https?:\/\//.test(href) ? ' target="_blank" rel="noopener"' : '';
}

function renderNavItems(activeHref) {
  return NAV.map(({ href, label }) => {
    const current = href === activeHref ? ' aria-current="page"' : '';
    return `        <li><a href="${href}"${current}${externalAttrs(href)}>${label}</a></li>`;
  }).join('\n');
}

const footerNavItems = NAV.map(
  ({ href, label }) => `        <li><a href="${href}"${externalAttrs(href)}>${label}</a></li>`
).join('\n');

const buildNumber = readBuildNumber();
const tokens = tokensFromSite(SITE, buildNumber);

const footer = replaceTokens(footerTemplate.replace('{{FOOTER_NAV_ITEMS}}', footerNavItems), tokens);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.orgName,
  url: 'https://mediawright.uk/',
  email: SITE.email,
  telephone: SITE.phoneTel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${SITE.hqName}, ${SITE.street}`,
    addressLocality: SITE.town,
    postalCode: SITE.postcode,
    addressCountry: SITE.country,
  },
  description: 'MediaWright is a web development consultancy building websites for businesses, charities, churches and community groups, and helping turn writing projects into proper websites.',
  areaServed: 'GB',
  sameAs: PORTFOLIO_URLS,
};

for (const page of PAGES) {
  const cta = page.cta ?? { href: 'contact.html', text: 'Get in touch' };

  const header = replaceTokens(
    headerTemplate
      .replace('{{NAV_ITEMS}}', renderNavItems(page.active))
      .replace('{{CTA_HREF}}', cta.href)
      .replace('{{CTA_TEXT}}', cta.text),
    tokens,
  );

  const content = read(`src/pages/${page.slug}.html`).trimEnd();

  let extraHead = '';
  if (page.robots) extraHead += `<meta name="robots" content="${page.robots}">\n`;
  if (page.canonical !== false) {
    extraHead += `<link rel="canonical" href="https://mediawright.uk/${page.slug}.html">\n`;
  }
  if (page.jsonLd !== false) {
    extraHead += `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n`;
  }

  let html = pageTemplate
    .replace('{{TITLE}}', page.title)
    .replace('{{DESCRIPTION}}', page.description)
    .replace('{{EXTRA_HEAD}}', extraHead)
    .replace('{{HEADER}}', header)
    .replace('{{CONTENT}}', content)
    .replace('{{FOOTER}}', footer);

  html = replaceTokens(html, tokens);

  writeFileSync(join(root, 'public', `${page.slug}.html`), html);
  console.log(`built public/${page.slug}.html`);
}
