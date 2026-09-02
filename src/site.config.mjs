// Single source of truth for contact details and facts repeated across the
// site — the footer, the JSON-LD block, and any page content that needs
// them. Edit a value here to update it everywhere at once; scripts/build.mjs
// replaces every {{TOKEN}} (e.g. {{EMAIL}}, {{PHONE_TEL}}) with the matching
// value below, in templates and in src/pages/*.html content alike.

export const SITE = {
  orgName: 'MediaWright',

  email: 'hello@mediawright.uk',
  phoneDisplay: '07449 301083',
  phoneTel: '+447449301083',

  hqName: 'Ravenswood',
  street: 'Pinsley Rd',
  town: 'Leominster',
  postcode: 'HR6 8NN',
  country: 'GB',
};

// URLs only — used to build the JSON-LD sameAs list. The prose describing
// each project stays hand-written in src/pages/index.html and work.html on
// purpose: good case-study copy shouldn't be squeezed through a template.
export const PORTFOLIO_URLS = [
  'https://wrightmaths.uk/',
  'https://kingtonfoodbank.org.uk/',
  'https://lovinggod.uk/',
  'https://kington-parishes.magicobject.workers.dev/',
  'https://mrwrightsrules.magicobject.workers.dev/',
];
