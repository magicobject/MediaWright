// Single source of truth for what each page in the main nav should look
// like. Used by both the nav-behaviour specs and the per-page content specs.
export interface SitePage {
  /** Path served by the static test server, e.g. "/work.html". */
  path: string;
  /** Visible text of this page's link in the main nav / footer. */
  navLabel: string;
  /** Substring expected in <title>. */
  titleContains: string;
  /** Text expected in the page's <h1>. */
  heading: RegExp;
}

export const PAGES: SitePage[] = [
  {
    path: '/index.html',
    navLabel: 'Home',
    titleContains: 'MediaWright',
    heading: /world-class web craft/i,
  },
  {
    path: '/work.html',
    navLabel: 'Work',
    titleContains: 'Our Work',
    heading: /what we.ve built/i,
  },
  {
    path: '/craft.html',
    navLabel: 'Craft',
    titleContains: 'Our Craft',
    heading: /how we actually work/i,
  },
  {
    path: '/services.html',
    navLabel: 'Services',
    titleContains: 'Services',
    heading: /what we can build for you/i,
  },
  {
    path: '/prices.html',
    navLabel: 'Prices',
    titleContains: 'Prices',
    heading: /straightforward pricing/i,
  },
  {
    path: '/contact.html',
    navLabel: 'Contact',
    titleContains: 'Contact',
    heading: /tell us about your project/i,
  },
];

// The full nav in DOM order, including external links (the Proof of Work
// brochure) that aren't real local pages and so don't belong in PAGES above
// — used only to verify the nav renders exactly the right links, in the
// right order. Keep this in sync with src/pages.config.mjs's NAV export.
export interface NavItem {
  label: string;
  href: string;
}
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: 'index.html' },
  { label: 'Work', href: 'work.html' },
  { label: 'Proof of Work', href: 'https://claude.ai/code/artifact/69b4d4f2-e8c6-4240-b4b1-86a2aeccc42e' },
  { label: 'Craft', href: 'craft.html' },
  { label: 'Services', href: 'services.html' },
  { label: 'Prices', href: 'prices.html' },
  { label: 'Contact', href: 'contact.html' },
];

// Not in the primary nav — deliberately unlinked from anywhere on the site
// (see CLAUDE.md's "Build numbers" section). Kept out of PAGES above so it
// never gets pulled into the nav-behaviour specs, which assume every entry
// there has a real nav link.
export const UPDATES_PAGE: SitePage = {
  path: '/updates.html',
  navLabel: 'Updates',
  titleContains: 'Site Updates',
  heading: /site updates/i,
};

// Every generated page, including the ones without a primary nav link —
// used by specs that should run against literally everything (footer,
// accessibility, canonical URLs).
export const ALL_PAGES: SitePage[] = [...PAGES, UPDATES_PAGE];
