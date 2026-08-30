// Single source of truth for the main nav and per-page <head> metadata.
// Edit this file (and src/pages/*.html for content) — public/*.html is generated
// by scripts/build.mjs and should not be hand-edited.

export const NAV = [
  { href: 'index.html', label: 'Home' },
  { href: 'work.html', label: 'Work' },
  { href: 'services.html', label: 'Services' },
  { href: 'contact.html', label: 'Contact' },
];

export const PAGES = [
  {
    slug: 'index',
    title: 'MediaWright | Websites for Businesses, Charities &amp; Books',
    description: 'MediaWright builds accessible, secure websites for small businesses, charities, churches and community groups — plus the occasional book. Fast, honest, easy to maintain.',
    active: 'index.html',
  },
  {
    slug: 'work',
    title: 'Our Work | MediaWright',
    description: 'A look at what MediaWright has built: a maths tuition business, a local foodbank, and a book turned into a proper website.',
    active: 'work.html',
  },
  {
    slug: 'services',
    title: 'Services | MediaWright',
    description: 'What MediaWright can build for you: sites for small businesses and sole traders, charities and community groups, and writing/book projects.',
    active: 'services.html',
  },
  {
    slug: 'contact',
    title: 'Contact | MediaWright',
    description: 'Get in touch with MediaWright about a website for your business, charity, church or book.',
    active: 'contact.html',
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
