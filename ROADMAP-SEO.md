# SEO and marketing roadmap (2026-10-23)

Downshift by Tiago Vilas Boas · https://github.com/tiagovilasboas/downshift

Source: spike of 2026-10-23 (desk research, standard web search, repo at 69b4eeb). No search
volumes were available; every interest signal is relative. Rule for all copy: aggressive tone,
honest numbers. A figure appears only with its qualifier beside it (sample, date, interval). The
retired KiroCrew "53%" / "55%" figures never appear.

## 0. Incident fixed first (2026-10-24)

Production returned 404 on every page: the Vercel project was switched to `rootDirectory=apps/site`
(Next.js migration, only the home ported) with `framework=null`. Fixed: promoted the last static
deploy (3847c49) and set the project to `rootDirectory=.`, no build, `outputDirectory=.`. The
Next.js migration continues on a branch with previews and replaces the static site only when it has
every indexed page (37 URLs). Production stays pinned to the promoted deploy until the owner
promotes `main` again.

Done: `.vercelignore` keeps `apps/`, `packages/`, `.claude/`, `.github/`, `scripts/`, `tests/`, `brand/`,
`SPIKE*.md`, `turbo.json`, `pnpm-*` and `package.json` out of the deploy (#50).

## Deploy rule (owner decision, 2026-10-24)

**Merged and green on `main` means live.** Automatic production deploys from `main` are on: every
merge whose Vercel and Typecheck checks pass goes to https://downshift-ai.vercel.app within about a
minute, with no manual promote. Consequences:

- Review happens before the merge, not before the deploy. A PR that changes copy or numbers is
  checked against the evidence rule (qualifier beside every figure, no retired figures) before it
  is merged.
- Rollback is `vercel promote <previous production deployment URL>` (instant); it pauses automatic
  deploys until the next `vercel deploy --prod` from `main` re-enables them.
- The Next.js migration (`apps/site`) must not switch the project's root directory or build back on
  until it serves every indexed URL; test it on a branch preview first.

## 1. Waves

| Wave | Item | Pts | Who | Depends | Parallel with |
|---|---|--:|---|---|---|
| 1 | T1 technical: sitemap lastmod from git (+check), JSON-LD fields, related-guides blocks, favicon PNG, manifest | 3 | agent | — | S1 |
| 1 | S1 spike (done) | 3 | agent | — | T1 |
| 1 | `.vercelignore` for internal folders | 1 | root | — | T1 |
| 2 | (done: C1, C2, integration #53) Home title/description around demand ("Claude Code token usage", "subagent model"); brand after | 1 | agent | T1 merged | C1–C3 |
| 2 | C1 Opus vs Sonnet vs Haiku in Claude Code (EN + PT-BR) | 2 | agent | — | C2, C3 |
| 2 | C2 Long test and build output burns context (EN + PT-BR), Compactor corpus with its caveat | 2 | agent | — | C1, C3 |
| 2 | C3 Case study: the 46-run battery, lead with the interval (EN + PT-BR) | 3 | agent | evidence page merged in downshift (#427) | C1, C2 |
| 3 | C4 Claude Code hooks pillar guide (EN + PT-BR) | 3 | agent | — | C5 |
| 3 | C5 PreToolUse not firing for subagents: troubleshooting (EN) | 2 | agent | C4 | — |
| 3 | C6 Weekly limit explained, dated (EN + PT-BR) | 2 | agent | — | C4 |
| 3 | C7 Cost cheat sheet: settings, env vars, commands (EN + PT-BR) | 2 | agent | — | C4 |
| 3 | C8 Is a routing hook safe? what it reads and changes (EN + PT-BR) | 1 | agent | — | C4 |
| 4 | Integration: sitemap, guides indexes, llms.txt, related links for all new pages | 2 | root | each wave | — |
| 4 | Promote `main` to production, then one live check (titles, hreflang, sitemap 200) | 1 | root + owner ok | waves 1–3 | — |

Shared files (`sitemap.xml`, `guides/index.html`, `pt-br/guias/index.html`, `llms.txt`,
`vercel.json`) are edited only by the integration step, never by content agents in parallel.

## 2. Off-site (owner acts)

| Place | Action | When |
|---|---|---|
| GitHub topics | `claude-code`, `claude-code-hooks`, `subagents`, `llm-routing`, `token-optimization`, `codex`, `cursor` | now |
| awesome-claude-code | web issue form, one neutral line | when eligible (14 days of development or 100 stars) |
| Claude Code plugin directory | submit after `claude plugin validate` | after wave 2 |
| Show HN | repo link, be in the thread | after the site is promoted and C3 is live |
| Reddit r/ClaudeAI, r/ClaudeCode | discussion post leading with the 46-run result and its interval; read each sidebar first | after Show HN |
| dev.to | long-form with `canonical_url` to the site guide | after C3 |

## 3. Measure

Add Google Search Console for `downshift-ai.vercel.app` (owner account): impressions and clicks per
query weekly. Without it, "aggressive SEO" has no feedback loop. A custom domain is the largest
remaining lever (a `.vercel.app` subdomain carries little authority); owner decision.
