<!-- Downshift by Tiago Vilas Boas · https://github.com/tiagovilasboas/downshift -->

# Roadmap: scroll navigation and subtle motion on the home (2026-10-21)

Not published: `.vercelignore` excludes `ROADMAP*.md`.

## Decision

CSS first, plus the one inline script that already exists, both pinned by sha256 in `vercel.json`.
No scroll library: Lenis, GSAP ScrollSmoother and Locomotive would need a `script-src` change and take
over native scrolling, which this page does not need. Every motion sits under
`prefers-reduced-motion: no-preference` and has a static fallback; content is never hidden when a
feature or the script is missing.

## Spike (draft PR #23)

Built on both homes: scroll-spy on the header links (`aria-current="location"`), a reading-progress bar
(CSS `animation-timeline: scroll(root)`), section reveals (`animation-timeline: view()` under `@supports`),
hover and press micro-interactions, hero count-up with the final value in the HTML.
Cost per page: +825 B CSS, +1,230 B JS. AppSec: pass with conditions. QA (Chromium only): pass; reduced
motion verified statically; Safari and Firefox not verified.

## Tasks

| # | Task | Size | Status |
|---|---|---|---|
| 1 | Close the AppSec conditions: print shows every section, focus makes a section visible, count-up gated on no-preference, non-colour active link | S | running |
| 2 | Apply the product copy on top of the spike (see the product narrative roadmap) | M | waiting on 1 |
| 3 | Review: CSP hashes, a11y, browser checks at 1280 and 375 px | S | waiting on 2 |
| 4 | Measure CLS and INP before and after (Lighthouse or the browser trace) and record the numbers | S | open |
| 5 | Check Safari and Firefox on a real device; until then the reveals stay behind `@supports` | S | open |
| 6 | A script that regenerates the CSP hashes from the pages, so a CSS or JS edit stops being a manual hash edit | M | open |
| 7 | Section rail as a nav with text labels, if the header links are not enough | M | later |
| — | Parallax, scroll-snap, a scroll library | — | rejected unless a measured need appears |
