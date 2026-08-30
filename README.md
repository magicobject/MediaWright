# MediaWright

Portfolio and services site, live at [mediawright.uk](https://mediawright.uk) (Cloudflare Workers, auto-deploys on push to `main`). Same build pipeline as [wrightmaths.uk](https://wrightmaths.uk) and [lovinggod.uk](https://lovinggod.uk) — see their READMEs for the full explanation; the short version is below.

## Quick start

```bash
npm install       # also wires up the pre-commit hook — see below
npm run build     # generate public/*.html from templates/ + src/
npm run serve     # serve public/ locally at http://localhost:4175
npm test          # run the Playwright suite
```

## What to edit, and what never to touch

| Want to change... | Edit this | Never edit this |
|---|---|---|
| Page content | `src/pages/<page>.html` | `public/<page>.html` |
| Nav items, page title/description | `src/pages.config.mjs` | `public/<page>.html` |
| Header/footer, structured data | `templates/*.html` | `public/<page>.html` |
| Styling | `public/css/style.css` (not generated) | — |
| Favicon | `public/img/favicon.svg` (not generated) | — |

`public/*.html` is a build artefact, regenerated automatically from `src/`/`templates/` on every commit by [.githooks/pre-commit](.githooks/pre-commit) (installed via `npm install`'s `prepare` script). A hand-edit made there gets silently overwritten — edit the source instead.

## Content notes

- The three portfolio items on [work.html](src/pages/work.html) (Wright Maths Tuition, Kington Foodbank, Loving God) are real projects, all live and maintained.
- Contact details (`hello@mediawright.uk`, the phone number) are reused from the same person behind the other sites — confirm the email works once Cloudflare Email Routing is set up for `mediawright.uk` the same way it was for `wrightmaths.uk`.
- Copy is written in "we" voice per an explicit decision to frame MediaWright as a studio/brand rather than a personal "I" site.

## Accessibility

Every page is scanned with [axe-core](https://github.com/dequelabs/axe-core) (via `@axe-core/playwright`) in [test/accessibility.spec.ts](test/accessibility.spec.ts) — part of `npm test`, so a real regression fails the suite, not just a one-off manual check.

Fixes that came out of the last full pass:

- **No page had a `<main>` landmark at all.** `templates/page.html` wrapped `{{HEADER}}`/`{{CONTENT}}`/`{{FOOTER}}` with no landmark around the actual content, so every section on every page (hero, cards, work items, the lot) was flagged as not contained by any landmark. Fixed once, at the template level, by wrapping `{{CONTENT}}` in `<main>`.
- **Footer heading levels.** "MediaWright" / "Explore" / "Get in touch" were real `<h4>`s, which skips a level (the last real heading on most pages is an `<h1>` or `<h2>`, with nothing in between). They're group labels, not part of the content outline, so they're `<p class="foot-heading">` now — identical styling, no heading semantics.
- **Two pages skipped straight from `<h1>` to `<h3>`.** The Email/Phone cards on [contact.html](src/pages/contact.html) and the five portfolio entries on [work.html](src/pages/work.html) had no `<h2>` section heading above them. Bumped to `<h2>` — `h1, h2, h3` already share one CSS rule, so this changed no styling.
- **Two real color-contrast failures:** the hero "eyebrow" badge (teal-on-navy) and the footer copyright/build-number text both fell short of the 4.5:1 minimum. Lightened the eyebrow teal and darkened the footer text (and dropped an `opacity` that was quietly cutting the footer text's contrast further) until both comfortably cleared it.

## Tests

[Playwright](https://playwright.dev) specs in `test/` cover:

- **[footer.spec.ts](test/footer.spec.ts)** — every page shows a correctly-formatted build number.
- **[nav.spec.ts](test/nav.spec.ts)** — the nav highlights the right item on every page, and the brand logo always links home.
- **[not-found.spec.ts](test/not-found.spec.ts)** — unknown URLs get a real 404 status and the branded 404 page, which is `noindex`.
- **[page-content.spec.ts](test/page-content.spec.ts)** — every page shows its own title, heading and canonical URL.
- **[accessibility.spec.ts](test/accessibility.spec.ts)** — an axe-core scan of every page with zero tolerated violations (see "Accessibility" above for what that's already caught).

`test/support/pages.ts` is the shared list of generated pages used across specs; add an entry there when adding a new page.

## Deployment

Push to `main` — Cloudflare deploys `public/` automatically, same as the other sites. The Workers custom domain (`mediawright.uk`) still needs to be added in the Cloudflare dashboard for the Worker once it's first deployed (Workers & Pages → the `mediawright` worker → Settings → Domains & Routes → Add Custom Domain) — DNS is already pointed at Cloudflare, so that's the only remaining step.
