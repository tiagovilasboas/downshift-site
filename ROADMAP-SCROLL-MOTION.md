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
| 4 | Measure CLS and INP before and after (Lighthouse or the browser trace) and record the numbers | S | done (baseline below; "before" = no spike, not measured) |
| 5 | Check Safari and Firefox on a real device; until then the reveals stay behind `@supports` | S | open |
| 6 | A script that regenerates the CSP hashes from the pages, so a CSS or JS edit stops being a manual hash edit | M | open |
| 7 | Section rail as a nav with text labels, if the header links are not enough | M | later |
| — | Parallax, scroll-snap, a scroll library | — | rejected unless a measured need appears |

### Task 4: lab baseline of the new home (2026-10-21)

Measured on commit `33b6273` (PR #25, the spike on `main`), served locally with the production CSP headers.
Worst of two runs per combination.

| Page | Viewport | CLS | INP proxy (worst event, ms) | LCP (ms) |
|---|---|---|---|---|
| EN `/` | 1280x900 | 0 | 32 | 112 |
| PT `/pt-br/` | 1280x900 | 0 | 32 | 112 |
| EN `/` | 375x812 | 0 | 24 | 136 |
| PT `/pt-br/` | 375x812 | 0 | 24 | 136 |

Method: Chromium in the Browser pane. Observers (`layout-shift`, `event` with 16 ms threshold,
`largest-contentful-paint`) registered after load with `buffered: true`; the page scrolled in 400 px steps
with 200 ms pauses, then the first FAQ item opened and closed, then one header anchor clicked. CLS sums
layout-shift values without recent input.

Caveat: lab measurement on a local server, Chromium only. The INP value is a proxy (the worst event at or
above 16 ms, not the p98 interaction INP of field data), and the event timer rounds to 8 ms. Not field data.
Safari and Firefox are not covered (task 5).
