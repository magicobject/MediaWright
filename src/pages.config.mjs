// Single source of truth for the main nav and per-page <head> metadata.
// Edit this file (and src/pages/*.html for content) — public/*.html is generated
// by scripts/build.mjs and should not be hand-edited.

export const NAV = [
  { href: 'index.html', label: 'Home' },
  { href: 'work.html', label: 'Work' },
  { href: 'craft.html', label: 'Craft' },
  { href: 'services.html', label: 'Services' },
  { href: 'prices.html', label: 'Prices' },
  { href: 'contact.html', label: 'Contact' },
];

export const PAGES = [
  {
    slug: 'index',
    title: 'MediaWright | World-Class Web Craft, Without the Overhead',
    description: 'MediaWright is a web development consultancy: legacy-consultancy calibre — accessible, secure, tested to 100% coverage — at a fraction of the cost, because AI does the typing and forty years of engineering discipline does the thinking.',
    active: 'index.html',
  },
  {
    slug: 'work',
    title: 'Our Work | MediaWright',
    description: 'A look at what MediaWright has built: a maths tuition business, a local foodbank, a five-church benefice proof of concept, a book turned into a proper website, and the engineering rules behind all of it.',
    active: 'work.html',
  },
  {
    slug: 'craft',
    title: 'Our Craft | MediaWright',
    description: "How MediaWright actually works: Mr Wright's Rules, forty years of software engineering principles, and exactly how each one applies when AI is doing most of the typing.",
    active: 'craft.html',
  },
  {
    slug: 'services',
    title: 'Services | MediaWright',
    description: 'What MediaWright can build for you: sites for businesses and sole traders, charities and community groups, and writing/book projects.',
    active: 'services.html',
  },
  {
    slug: 'prices',
    title: 'Prices | MediaWright',
    description: 'Free web development for charities and community projects, with hosting and ongoing support from £10 a month. Businesses: get in touch for a quote.',
    active: 'prices.html',
  },
  {
    slug: 'contact',
    title: 'Contact | MediaWright',
    description: 'Get in touch with MediaWright about a website for your business, charity, church or book.',
    active: 'contact.html',
  },
  {
    slug: 'updates',
    title: 'Site Updates | MediaWright',
    description: 'Internal build changelog for mediawright.uk — not linked from anywhere on the site.',
    active: null,
    robots: 'noindex',
  },
  {
    slug: '404',
    title: 'Page Not Found | MediaWright',
    description: "This page couldn't be found. Find your way back to MediaWright's home, work or contact page.",
    active: null,
    canonical: false,
    robots: 'noindex',
  },
];
