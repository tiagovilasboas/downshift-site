# downshift-site

Static landing page for [Downshift](https://github.com/tiagovilasboas/downshift), deployed on Vercel at https://downshift-ai.vercel.app.

Plain HTML, no build step. Deploy with `vercel deploy --prod`.

## CSP hashes

`vercel.json` pins the sha256 hashes of the inline `<style>` and `<script>` blocks in `script-src` and `style-src`. After editing any inline `<style>` or `<script>`, run `python3 scripts/csp-hashes.py`. `python3 scripts/csp-hashes.py --check` fails with a diff when the hashes are stale.

Downshift by Tiago Vilas Boas
