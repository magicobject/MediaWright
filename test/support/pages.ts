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
