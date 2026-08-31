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
    heading: /worth building/i,
  },
  {
    path: '/work.html',
    navLabel: 'Work',
    titleContains: 'Our Work',
    heading: /what we.ve built/i,
  },
  {
    path: '/services.html',
    navLabel: 'Services',
    titleContains: 'Services',
    heading: /what we can build for you/i,
  },
  {
    path: '/contact.html',
    navLabel: 'Contact',
    titleContains: 'Contact',
    heading: /tell us about your project/i,
  },
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
