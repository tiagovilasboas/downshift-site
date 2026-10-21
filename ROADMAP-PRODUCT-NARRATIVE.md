<!-- Downshift by Tiago Vilas Boas · https://github.com/tiagovilasboas/downshift -->

# Roadmap: product narrative for the home and the docs (2026-10-21)

Not published: `.vercelignore` excludes `ROADMAP*.md`.

Goal: the home reads as a product (benefit first, plain words, short), and every claim keeps its
evidence level. The brief behind it lists a fact sheet with sources, the claims we may make as written,
the claims that need their qualifier, and the claims we must not make.

## Rules for every page

- Pillars in this order: model routing per subagent, the Compactor, DCI.
- Qualifiers stay next to the number: the ~12% figure is one controlled trial, one operator, list price,
  mechanical delegated tasks; compaction figures are bytes on a synthetic corpus, never tokens.
- Not said: savings on plan limits, better answers from DCI, any dollar saving, any number not in the
  docs, named competitors or third-party output-cutting tools, routing for models outside Claude,
  KiroCrew or Antigravity as production.
- Harness levels follow the product repo's harness matrix.

## Parts

| Part | What | Depends on | Status |
|---|---|---|---|
| P1 | Brief: fact sheet, claims table, home outline | none | done |
| P2a | Copy deck for every home section, EN and PT-BR | P1 | running |
| P2b | Apply the copy on top of the scroll spike, one PR | P2a, spike task 1 | waiting |
| P3 | Docs refresh to the same positioning (README entry points, guides index) | P1 | open |
| P4 | Claims review by AppSec and QA before any merge | P2b, P3 | waiting |

Product repo: the README claims were aligned with the evidence in PR #403, which waits for the branch
protection decision (code owner review on PRs opened by the owner's own account).
