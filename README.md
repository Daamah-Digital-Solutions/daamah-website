# Daamah Digital Solutions

Marketing site for Daamah Digital Solutions — bilingual (Arabic RTL / English LTR), light and dark themes.

**Vite 7 · React 19 · TypeScript · Tailwind v4 · React Router 7**

```bash
npm install
npm run dev       # http://localhost:4100
npm run build     # type-check, SSR bundle, client bundle, prerender every page
npm run preview   # serves dist/ the way Vercel does — not vite preview
npm run new-post <slug> [--en]
```

## How it is put together

### Language lives in the URL, not in storage

Arabic sits at the root, English under `/en`. The path is the single source of truth —
`src/i18n.tsx` reads the language from it, and `index.html` applies `lang`/`dir` before the
first paint so direction never flashes.

This matters for more than tidiness: when language was kept in `localStorage`, both versions
shared one URL, so a crawler only ever saw Arabic — half the site did not exist as far as
search engines were concerned. Now each language has its own URL and `hreflang` ties them
together.

All copy is bilingual (`Bi<T> = { ar: T; en: T }`) and lives in `src/content/`. **Components
contain no hard-coded strings.**

### Content

| File | Holds |
|---|---|
| `content/home.ts` | Brand facts, navigation, and every home-page section's copy |
| `content/pages.ts` | Inner-page copy, plus per-work and per-service detail text |
| `content/work.ts` | Work taxonomy, the work items themselves, and client stories |
| `content/form.ts` | Quote-form labels, validation messages, WhatsApp message template |
| `content/faq.ts` | Questions — general and per service; read by the page *and* by `FAQPage` markup |
| `content/blog/` | One folder per article: `meta.ts` + `ar.mdx` / `en.mdx` |
| `content/seo.ts` | Route index — title, description, kind, and parent per page |
| `seo/schema.ts` | The JSON-LD graph each page declares |

### Work is classified by keys, not free text

`content/work.ts` is the taxonomy: **service** (5) × **sector** (8) × **markets** (7).

The browsable unit is the delivered piece of work, not the client — so filtering by
"Websites" returns websites rather than client cards. The two filters intersect, and each
one's counts are computed within the other's current selection, so a count always promises
what will actually appear.

A **client story** (`/clients/:slug`) is a layer *over* those items, not a second store of
them: its chapters are the work items carrying its key, and their descriptions are read from
the same `workDetails` the work page reads. Nothing is written twice, so nothing can drift.

Filters are derived from the data — a filter appears only once at least one item uses it.

### Search engines see finished pages

The build runs twice. First `src/entry-server.tsx` is bundled; then the client build's
`closeBundle` imports it and renders **every route × language** with `prerenderToNodeStream`
inside a `StaticRouter`, writing a complete HTML file — head *and* body — plus `sitemap.xml`,
`robots.txt`, `feed.xml`, and a real `404.html`.

The tree rendered on the server is `Shell`, the same one the browser mounts; only the router
differs. Two trees would drift apart at the first edit.

Prerendering the head alone was not enough. Social crawlers (WhatsApp, Facebook, LinkedIn) and
the crawlers behind language models **do not run JavaScript at all**, so an empty
`<div id="root">` was a site with no text as far as they were concerned.

Two things this requires, both easy to undo by accident:

- **Nothing may render differently on the first client paint than it did at build time**, or
  React discards the finished page and redraws it. That is why the theme starts light and is
  read from `data-theme` in an effect, why the logo is chosen by CSS rather than by state, and
  why `Counter` starts at its final value. See *Rules worth keeping*.
- **React 19 hoists resource `<link>` tags to the front of what it renders.** In the browser
  those belong in `<head>`; left in the body they become the root's first child and hydration
  fails. The build plugin moves them.

`npm run preview` serves `dist/` with Vercel's own resolution rules — `/about` →
`dist/about/index.html`, unknown paths → `404.html` with a 404 status. `vite preview` answers
every unknown path with `index.html`, so each inner page arrives as the home page and then gets
overwritten client-side; it cannot be used to check this.

### The blog

`src/content/blog/<slug>/` holds `meta.ts` (bilingual title, description, date, tags) beside
`ar.mdx` and/or `en.mdx`. `npm run new-post <slug>` creates all three.

Metadata sits *next to* the prose rather than inside it so the index can list every article
without importing any of them — article bodies are lazy, one chunk each. Reading time is
counted at build time and reaches the browser as a number (`virtual:blog-stats`).

A folder with only `ar.mdx` is an Arabic-only article: no `/en/` page is written and no
`hreflang` is emitted, so Google is never promised a translation that does not exist.

### Analytics stay silent unless configured

`src/analytics.ts` loads GA4 and Meta Pixel only when their IDs are present, and only after
checking `Do Not Track` and `Global Privacy Control`. The rest of the app calls `track()`
with business-language event names and knows nothing about Google or Meta.

Copy `.env.example` to `.env`, or set these in the deployment environment:

```
VITE_GA_ID               # G-XXXXXXXXXX
VITE_META_PIXEL_ID       # digits only
VITE_GSC_VERIFICATION    # Search Console HTML-tag value
```

All three are optional — the site works fully without them.

### The quote form hands off to WhatsApp

`components/QuoteForm.tsx` has no backend. It validates, composes a formatted message, and
opens WhatsApp on the number published across the site. Package and service buttons deep-link
with `?package=<slug>` / `?service=<slug>`, so the form arrives with the choice preselected.

## Design system

Tokens are defined in `src/styles/globals.css` under `@theme`.

```
--color-red   #e70000      --color-ink    #0b0b0d      --color-paper  #fbfaf8
```

`ink` and `paper` swap under `html[data-theme="dark"]`, so components written against them
work in both themes without conditionals. The theme is applied before first paint from
`index.html`; the toggle lives in `theme.tsx`.

**Type classes** — `.display` · `.lede` · `.h2` · `.body` · `.tag`. Each is tuned per language
(`html[lang="ar"]` / `html[lang="en"]`), because the two scripts need different sizes and line
heights to feel the same weight.

**Fonts** are self-hosted in `public/fonts/` — Satoshi for Latin, Plex Arabic for Arabic. The
build never depends on a network font host.

## Rules worth keeping

**1. Motion never hides content.** Content is visible by default. Animations are enabled only
through the `.anim-ready` class that the inline script in `index.html` puts on `<html>`
**before first paint**, and only when the page is visible and the user has not asked for
reduced motion. Any animation starting from `opacity: 0` would otherwise leave content hidden
forever if it never ran — a background tab, or an engine not compositing frames. `Reveal`
likewise shows its content immediately when `IntersectionObserver` is unavailable.

Anything already on screen at load takes `eager` (`Reveal`, `MaskLines`) and animates from CSS
instead of waiting for `IntersectionObserver` — pages now arrive drawn, so waiting for JS would
show the hero and then hide it to animate it in. Those keyframes write their `to` state
explicitly: the mask rule sets `translateY(110%)` on every line, so an implicit end would
resolve back to it and animate 110% → 110%.

**1b. Nothing may render differently on the first client paint than it did at build time.**
React discards the whole prerendered tree over one mismatch. This is why the theme starts light
and is read from `data-theme` in an effect, why both logos render and CSS picks one, why
`Counter` starts at its final value, why the footer year is `__BUILD_YEAR__`, and why the quote
form reads `?service=` in an effect. Verify with `npm run preview` — never `vite preview`.

**2. `overflow-x: clip` on `html` and `body` — never `hidden`.** With `hidden` the element
becomes a scroll container, which shifts the paint origin in RTL and renders the page blank on
mobile. Large decorative elements must be constrained by width, not height.

**3. Centering in RTL:** use `inset-x-0 mx-auto w-fit`, not `start-1/2 -translate-x-1/2`.

**4. No hard-coded copy in components.** Every string belongs in `src/content/`. Adding text
directly to a component silently breaks the English side.

**5. Images go through `Img`, and carry `width` and `height`.** Intrinsic size is how the
browser reserves space before the file arrives; without it the page jumps as images load. `Img`
adds the AVIF/WebP `srcset` — run `npm run images` after adding a picture, and commit what it
generates.

**6. Structured data must match what the page shows.** `FAQPage` markup is built from the same
`content/faq.ts` entries the page renders. Declaring questions a visitor cannot see is what
gets a rich result pulled. For the same reason there is no `LocalBusiness`, no `address`, and no
self-authored `Review` anywhere.

## The Saudi layer

`content/saudi.ts` holds one page per (service × city) — currently four services × Riyadh and
Jeddah. Every field is written for that pairing: a Riyadh buyer's problems are not a Jeddah
trader's, and their questions differ.

Pages that repeat one text with the city name swapped are doorway pages, and they cost the
whole site rather than the page. The build fails on two routes sharing a description, so
duplication surfaces at build time rather than a month into indexing.

Proof is derived, never written twice: work comes from `work.ts` filtered to the `sa` market,
testimonials from `testimonials.ts`. `/saudi` gathers the set so internal link strength reaches
all of them.

## Deployment

Vercel. `vercel.json` sets `cleanUrls` and `trailingSlash: false` and adds cache headers — no
catch-all rewrite, so unknown paths reach `404.html` with a real 404 instead of returning 200.
`public/_redirects` keeps Netlify parity. Build output is `dist/`, untracked.

Optional environment variables (the site works fully without them):

```
VITE_GA_ID               # G-XXXXXXXXXX
VITE_META_PIXEL_ID       # digits only
VITE_GSC_VERIFICATION    # Search Console HTML-tag value
VITE_BING_VERIFICATION   # Bing Webmaster msvalidate.01 value
```

## Open items

- **Testimonials are empty on purpose.** `content/testimonials.ts` has the shape and no
  entries; the section stays hidden until real quotes arrive. Never invent one.
- **A Saudi WhatsApp number** would raise conversion more than anything else here. Add it to
  `brand.phones` with `market: "sa"` and `phoneFor()` picks it up site-wide.
- `saudi.since` and `saudi.clients` in `content/home.ts` are estimates — confirm them.
- Package prices in `content/home.ts` came from social campaigns and **need confirming**.
- Work images were extracted from the company profile PDF — originals would be better.
- Logo assets are PNG; SVG from the source Illustrator file would be sharper.
- Client stories carry an optional `since` year and work items an optional `year`; both are
  currently unset, and the timeline reads better once they are filled in.
- No work items exist yet for the `profile`, `crm`, and `seo` services — their filters and
  related-work sections appear automatically once the first item is added.
- City pages exist for Riyadh and Jeddah. Dammam needs only its copy written into
  `cityPages`; the routes, sitemap, and schema follow from the data.
