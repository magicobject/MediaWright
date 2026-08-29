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

## Deployment

Push to `main` — Cloudflare deploys `public/` automatically, same as the other sites. The Workers custom domain (`mediawright.uk`) still needs to be added in the Cloudflare dashboard for the Worker once it's first deployed (Workers & Pages → the `mediawright` worker → Settings → Domains & Routes → Add Custom Domain) — DNS is already pointed at Cloudflare, so that's the only remaining step.
