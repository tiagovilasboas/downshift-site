# downshift-site

Static landing page for [Downshift](https://github.com/tiagovilasboas/downshift), deployed on Vercel at https://downshift-ai.vercel.app.

Plain HTML, no build step. Deploy with `vercel deploy --prod`. The CSP in `vercel.json` pins sha256 hashes of the inline `<style>` and `<script>`: recompute them after editing either block.

Downshift by Tiago Vilas Boas
