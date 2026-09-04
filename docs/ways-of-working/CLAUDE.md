# Ways of working — starting point for every new project

Copy this file to a new repo's root as `CLAUDE.md` on day one, before the first line of code. Adapt the specifics — file paths, stack, business facts — to that project; the principles don't change. This isn't theoretical: every practice below is proven on real, shipping sites (kington-parishes, MediaWright itself), not aspirational.

## Before starting any change
- **Pull from `main` (or `master`) first — every time, even mid-session, even if you pulled ten minutes ago.** More than one person, human or AI, may be working on this repo. A stale local branch is how work gets silently overwritten, or a release gets tagged against the wrong commit. `git pull` before the first edit of any session, and again before committing if any real time has passed since.

## Before any push to origin
- Run the full automated test suite and a dependency audit. Fix real findings — don't suppress, downgrade, or skip them to get a push out.
- Whenever the full suite runs, report the pass/fail count and the time taken, prefixed with the repo's name (e.g. "kington-parishes: 219 tests passed in 26.3s"). It's a quick way to notice a regression in coverage or speed — and to know which project you're looking at when work spans several in one session.

## Testing
- Every change ships with test coverage for the behaviour it adds or changes — written alongside the change, not audited in afterwards.
- Prefer real browser end-to-end tests (Playwright or equivalent) for user-facing behaviour, plus fast unit tests for pure logic. Both run before every push.
- A failing test blocks the release. There's no "ship now, fix the test later."

## Accessibility
- Every page/screen passes an automated accessibility scan (axe-core or equivalent) with zero violations — checked on every change, not audited once at launch and left to drift.
- Any new heading fits the existing outline (no skipped levels — h1 → h2 → h3, not h1 → h3).
- Any new text/background colour pairing clears WCAG AA contrast (4.5:1 normal text, 3:1 large text/UI components) — computed by relative luminance, never eyeballed.
- Full keyboard operability: visible focus states, skip links where relevant, nothing that only works with a mouse.
- Respect `prefers-reduced-motion`.

## Security
- Keep the dependency audit clean (no unresolved high/critical) before every push.
- Obfuscate any email address, phone number, or similarly harvestable contact detail that appears in page source, against simple pattern-matching scrapers.
- Don't add third-party scripts, trackers, or embeds without checking what they contribute to CSP/privacy first.
- Prefer the smallest attack surface the project allows — static output with no server or database to compromise beats a dynamic stack with a plugin ecosystem, wherever the requirements permit it.

## SEO (for anything public-facing)
- A unique, hand-written title and meta description on every page — not just the homepage.
- Canonical URL, Open Graph and Twitter Card tags on every page, so a shared link always previews correctly.
- Structured data (JSON-LD) matching the actual content type — `Organization`/`LocalBusiness`, `Article`/`BlogPosting`, `Event`, and so on. Compute it from the same data the page itself renders from, so a new entry doesn't need separately hand-authored JSON-LD anywhere.
- `sitemap.xml` generated automatically from the real page list on every build — never hand-maintained, never allowed to go stale.
- Full favicon coverage: a modern format (SVG) plus a PNG fallback and an Apple touch icon, generated from one source icon so they can never drift apart.
- A correctly engineered `robots.txt`. If pages must stay out of search results (a demo, a proof-of-concept), use a `noindex` meta tag on every page — and make sure crawling itself isn't blocked in a way that would stop that tag from ever being seen.

## Build pipeline (where the project has one)
- Generated output (`public/`, `dist/`, `build/`) is never hand-edited — it's rebuilt from source on every commit, and that regeneration is automated (a pre-commit hook or equivalent), never a manual step someone has to remember.
- Site-wide facts — contact details, business name, repeated URLs — live in exactly one config file and get substituted everywhere they're used. Never hand-type the same fact in more than one place.
- Data that's genuinely one thing (a person, a product, an event) lives in exactly one source of truth and renders everywhere it needs to appear. Adding it once should be enough.

## Build numbers, changelog and tagging
- Every commit gets a build number (`yyyy.mm.dd.NNN` — same day increments the counter, a new day resets it to 1) and a matching git tag (`build-<date>.<NNN>`), pushed alongside the commit.
- Every change gets a one-line entry in a changelog page, newest first, dated — and **linking the page(s) it actually touched**, not just naming them in prose. A changelog entry with nothing to click through to is only half useful.
- The changelog page doesn't need to be linked from the site's own navigation — it's a build log for whoever knows the URL, not user-facing content — but it must be a real, reachable page, not a private file only the author can see.

## Data kept in sync by hand
- Whenever something genuinely can't be made DRY yet (a fact duplicated across files with no shared source), write it down explicitly in this file — which files, which fact, and why it isn't centralised yet. An undocumented duplication is a silent trap for the next change; a documented one is just a known, temporary cost with a name on it.

## Reporting back
- State the pass/fail count and duration whenever the full test suite runs, prefixed with the project's name.
- When something's fixed, say what was actually wrong — not just that it's "fixed now."
- When something's left deliberately imperfect (a scoped-out feature, a known gap), say so plainly rather than letting it pass as finished.
