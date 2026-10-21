"""Tests for scripts/csp-hashes.py. Run with: python3 -m unittest discover -s tests"""

import base64
import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent.parent / "scripts" / "csp-hashes.py"

SHARED_STYLE = "body { margin: 0; }"
UNIQUE_SCRIPT = 'document.title = "unique";'
JSON_LD = '{"@context": "https://schema.org", "@type": "WebSite", "name": "ignored"}'


def sha256_token(content: str) -> str:
    digest = hashlib.sha256(content.encode("utf-8")).digest()
    return "'sha256-" + base64.b64encode(digest).decode("ascii") + "'"


def csp_for(script_src: str, style_src: str) -> str:
    return (
        "default-src 'none'; "
        f"script-src {script_src}; "
        f"style-src {style_src}; "
        "img-src 'self'; base-uri 'none'"
    )


def vercel_config(csp: str) -> str:
    config = {
        "cleanUrls": True,
        "headers": [
            {
                "source": "/(.*)",
                "headers": [
                    {"key": "X-Frame-Options", "value": "DENY"},
                    {"key": "Content-Security-Policy", "value": csp},
                ],
            },
            {
                "source": "/sw.js",
                "headers": [{"key": "Content-Security-Policy", "value": "default-src 'none'"}],
            },
        ],
    }
    return json.dumps(config, indent=2) + "\n"


class CspHashesTest(unittest.TestCase):
    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name)
        (self.root / "a.html").write_text(
            "<!doctype html><html><head>"
            f"<style>{SHARED_STYLE}</style>"
            f'<script type="application/ld+json">{JSON_LD}</script>'
            "</head><body></body></html>\n",
            encoding="utf-8",
        )
        (self.root / "b.html").write_text(
            "<!doctype html><html><head>"
            f"<style>{SHARED_STYLE}</style>"
            f"<script>{UNIQUE_SCRIPT}</script>"
            '<script src="/app.js"></script>'
            "</head><body></body></html>\n",
            encoding="utf-8",
        )
        (self.root / "node_modules").mkdir()
        (self.root / "node_modules" / "vendor.html").write_text(
            "<style>vendor only</style>", encoding="utf-8"
        )
        (self.root / "vercel.json").write_text(
            vercel_config(csp_for("'self' 'sha256-STALE='", "'sha256-STALE2='")), encoding="utf-8"
        )

    def tearDown(self):
        self._tmp.cleanup()

    def run_script(self, *args):
        return subprocess.run(
            [sys.executable, str(SCRIPT), "--root", str(self.root), *args],
            capture_output=True,
            text=True,
        )

    def read_csp(self) -> str:
        config = json.loads((self.root / "vercel.json").read_text(encoding="utf-8"))
        return config["headers"][0]["headers"][1]["value"]

    def directive(self, name: str) -> list[str]:
        for part in self.read_csp().split(";"):
            tokens = part.split()
            if tokens and tokens[0] == name:
                return tokens[1:]
        raise AssertionError(f"missing directive {name}")

    def test_check_fails_on_stale_hashes_then_write_fixes_and_check_passes(self):
        stale = self.run_script("--check")
        self.assertEqual(stale.returncode, 1)
        self.assertIn("-", stale.stdout)

        written = self.run_script()
        self.assertEqual(written.returncode, 0, written.stderr)

        self.assertEqual(self.run_script("--check").returncode, 0)
        self.assertEqual(self.run_script().returncode, 0)

    def test_rewrites_only_script_and_style_hashes(self):
        self.run_script()

        self.assertEqual(self.directive("script-src"), ["'self'", sha256_token(UNIQUE_SCRIPT)])
        self.assertEqual(self.directive("style-src"), [sha256_token(SHARED_STYLE)])
        self.assertEqual(self.directive("img-src"), ["'self'"])
        self.assertEqual(self.directive("base-uri"), ["'none'"])
        self.assertNotIn(sha256_token(JSON_LD), self.read_csp())
        self.assertNotIn("STALE", (self.root / "vercel.json").read_text(encoding="utf-8"))

    def test_other_headers_and_formatting_are_untouched(self):
        before = json.loads((self.root / "vercel.json").read_text(encoding="utf-8"))
        self.run_script()
        after_text = (self.root / "vercel.json").read_text(encoding="utf-8")
        after = json.loads(after_text)

        self.assertEqual(after["headers"][0]["headers"][0], before["headers"][0]["headers"][0])
        self.assertEqual(after["headers"][1], before["headers"][1])
        self.assertEqual(after["cleanUrls"], before["cleanUrls"])
        self.assertTrue(after_text.endswith("\n"))
        self.assertEqual(after_text.replace(self.read_csp(), "<csp>"), vercel_config("<csp>"))


if __name__ == "__main__":
    unittest.main()
