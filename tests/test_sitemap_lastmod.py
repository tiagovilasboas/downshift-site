"""Tests for scripts/sitemap-lastmod.py. Run with: python3 -m unittest discover -s tests"""

import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent.parent / "scripts" / "sitemap-lastmod.py"
ORIGIN = "https://downshift-ai.vercel.app"
HREFLANG = f'<xhtml:link rel="alternate" hreflang="en" href="{ORIGIN}/"/>'


def sitemap(*entries: tuple[str, str]) -> str:
    urls = "".join(
        f"<url><loc>{ORIGIN}{path}</loc><lastmod>{lastmod}</lastmod>{HREFLANG}</url>\n"
        for path, lastmod in entries
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
        'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + urls + "</urlset>\n"
    )


class SitemapLastmodTest(unittest.TestCase):
    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name)
        self.git("init", "-q")
        self.git("config", "user.email", "test@example.com")
        self.git("config", "user.name", "Test")
        self.page("index.html", "<html><head></head></html>")
        self.page("guides/index.html", "<html><head></head></html>")
        self.page("demo/index.html", '<html><head><meta name="robots" content="noindex"></head></html>')
        self.commit("2026-10-01T12:00:00")
        self.page("guides/index.html", "<html><head><title>v2</title></head></html>")
        self.commit("2026-10-05T12:00:00")

    def tearDown(self):
        self._tmp.cleanup()

    def git(self, *args, env=None):
        subprocess.run(["git", *args], cwd=self.root, check=True, capture_output=True, env=env)

    def page(self, rel: str, html: str):
        path = self.root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(html, encoding="utf-8")

    def commit(self, when: str):
        env = {**os.environ, "GIT_AUTHOR_DATE": when, "GIT_COMMITTER_DATE": when}
        self.git("add", "-A", env=env)
        self.git("commit", "-q", "-m", "c", env=env)

    def write_sitemap(self, *entries):
        (self.root / "sitemap.xml").write_text(sitemap(*entries), encoding="utf-8")

    def run_script(self, *args):
        return subprocess.run(
            [sys.executable, str(SCRIPT), "--root", str(self.root), *args],
            capture_output=True,
            text=True,
        )

    def test_check_fails_on_stale_lastmod_then_write_fixes_it(self):
        self.write_sitemap(("/", "2026-09-01"), ("/guides/", "2026-10-01"))

        stale = self.run_script("--check")
        self.assertEqual(stale.returncode, 1)
        self.assertIn("/guides/: lastmod 2026-10-01 older than last change 2026-10-05", stale.stdout)

        self.assertEqual(self.run_script().returncode, 0)
        text = (self.root / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn(f"<loc>{ORIGIN}/</loc><lastmod>2026-10-01</lastmod>{HREFLANG}", text)
        self.assertIn(f"<loc>{ORIGIN}/guides/</loc><lastmod>2026-10-05</lastmod>", text)
        self.assertEqual(self.run_script("--check").returncode, 0)

    def test_newer_lastmod_is_kept(self):
        self.write_sitemap(("/", "2026-10-20"), ("/guides/", "2026-10-20"))
        before = (self.root / "sitemap.xml").read_text(encoding="utf-8")
        self.assertEqual(self.run_script().returncode, 0)
        self.assertEqual((self.root / "sitemap.xml").read_text(encoding="utf-8"), before)

    def test_check_fails_when_indexable_page_is_missing(self):
        self.write_sitemap(("/", "2026-10-01"))
        result = self.run_script("--check")
        self.assertEqual(result.returncode, 1)
        self.assertIn("missing from sitemap: guides/index.html", result.stdout)

    def test_check_fails_when_noindex_page_is_listed(self):
        self.write_sitemap(("/", "2026-10-01"), ("/guides/", "2026-10-05"), ("/demo/", "2026-10-01"))
        result = self.run_script("--check")
        self.assertEqual(result.returncode, 1)
        self.assertIn("not indexable but listed: demo/index.html", result.stdout)


if __name__ == "__main__":
    unittest.main()
