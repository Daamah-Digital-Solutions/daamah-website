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
through the `.anim-ready` class that `main.tsx` puts on `<html>` **before first paint**, and
only when the page is visible and the user has not asked for reduced motion. Any animation
starting from `opacity: 0` would otherwise leave content hidden forever if it never ran — a
background tab, or an engine not compositing frames. `Reveal` likewise shows its content
immediately when `IntersectionObserver` is unavailable.

**2. `overflow-x: clip` on `html` and `body` — never `hidden`.** With `hidden` the element
becomes a scroll container, which shifts the paint origin in RTL and renders the page blank on
mobile. Large decorative elements must be constrained by width, not height.

**3. Centering in RTL:** use `inset-x-0 mx-auto w-fit`, not `start-1/2 -translate-x-1/2`.

**4. No hard-coded copy in components.** Every string belongs in `src/content/`. Adding text
directly to a component silently breaks the English side.

**5. Images carry `width` and `height`.** Their intrinsic size is how the browser reserves
space before the file arrives; without it the page jumps as images load.

## Deployment

Vercel, with `vercel.json` rewriting all paths to `index.html` for client-side routing
(`public/_redirects` does the same on Netlify). Build output is `dist/`, which is not tracked.

## Open items

- Package prices in `content/home.ts` came from social campaigns and **need confirming**.
- Work images were extracted from the company profile PDF — originals would be better.
- Logo assets are PNG; SVG from the source Illustrator file would be sharper.
- Client stories carry an optional `since` year and work items an optional `year`; both are
  currently unset, and the timeline reads better once they are filled in.
- No work items exist yet for the `profile` and `crm` services — their filters appear
  automatically once the first item is added.
