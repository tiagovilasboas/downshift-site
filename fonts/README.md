# Fonts

Self-hosted Geist variable fonts, licensed under the SIL Open Font License 1.1
(see [OFL.txt](OFL.txt)). Copyright (c) 2023 Vercel, in collaboration with
basement.studio.

Source: npm package `geist`, version **1.7.2** (pinned; published 2026-06-01),
served by jsDelivr. Each file is byte-identical to the one in the npm tarball
`geist-1.7.2.tgz` (integrity
`sha512-Gu5lDFa3pLRyoBlBPf0QIFHVdWAnpco7fS1bJm41jyLPFoguBgiubseUN2oLXMgqZ7uxAxDoXcHMhCY/fOTTgg==`).

| File | Bytes | SHA-256 | Source URL |
| --- | --- | --- | --- |
| `Geist-Variable.woff2` | 69652 | `a369fcf5628ea2aa4e1b9e2ec6a5b3624e365bda588e1f0f2f12b564f728fbb8` | https://cdn.jsdelivr.net/npm/geist@1.7.2/dist/fonts/geist-sans/Geist-Variable.woff2 |
| `GeistMono-Variable.woff2` | 71368 | `fba8f577f38a2bbcbe818efa6348dd58f36303a10b8737c42fefad275be563ab` | https://cdn.jsdelivr.net/npm/geist@1.7.2/dist/fonts/geist-mono/GeistMono-Variable.woff2 |
| `OFL.txt` | 4368 | `930853ee1daa68554d9e35c8a9175affb74f699fad9a5da6ee5ebe76379d9137` | https://cdn.jsdelivr.net/npm/geist@1.7.2/LICENSE.txt |

Verify: `shasum -a 256 fonts/*.woff2 fonts/OFL.txt`.

Files are served with `Cache-Control: public, max-age=31536000, immutable`
(see `vercel.json`). To update, pick a new pinned version, rename the files
or change their URLs so cached copies are not reused, and update this table.
