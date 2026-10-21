#!/usr/bin/env python3
"""Pin the CSP script-src and style-src hashes in vercel.json to the inline blocks in the pages.

Scans every *.html file under the repository, hashes the exact bytes of each inline
<style> and each inline <script> (except JSON-LD), and rewrites only the script-src and
style-src directives of the Content-Security-Policy header for source "/(.*)".

Usage:
  python3 scripts/csp-hashes.py           rewrite vercel.json when it is out of date
  python3 scripts/csp-hashes.py --check   exit 1 and print the diff when it is out of date
"""

from __future__ import annotations

import argparse
import base64
import difflib
import hashlib
import json
import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
CSP_SOURCE = "/(.*)"
CSP_KEY = "Content-Security-Policy"
HASHED_DIRECTIVES = ("script-src", "style-src")
SKIPPED_DIRS = {"node_modules", ".git"}
DATA_BLOCK_TYPES = {"application/ld+json", "application/json"}  # never executed, so no hash

INLINE_BLOCK = re.compile(rb"<(style|script)\b([^>]*)>(.*?)</\1\s*>", re.DOTALL | re.IGNORECASE)
ATTR_SRC = re.compile(rb"(?<![\w-])src\s*=", re.IGNORECASE)
ATTR_TYPE = re.compile(rb"(?<![\w-])type\s*=\s*[\"']?([^\"'\s>]+)", re.IGNORECASE)
HASH_TOKEN = re.compile(r"'(?:sha256|sha384|sha512)-[^']+'")


class CspConfigError(Exception):
    """vercel.json does not have the CSP header this script manages."""


def csp_hash(content: bytes) -> str:
    digest = base64.b64encode(hashlib.sha256(content).digest()).decode("ascii")
    return f"'sha256-{digest}'"


def is_skipped_inline(tag: str, attrs: bytes) -> bool:
    if tag != "script":
        return False
    if ATTR_SRC.search(attrs):
        return True  # external script, no inline body to hash
    type_match = ATTR_TYPE.search(attrs)
    return bool(type_match) and type_match.group(1).decode("ascii").lower() in DATA_BLOCK_TYPES


def iter_html_files(root: Path):
    for dirpath, dirnames, filenames in os.walk(root):
        current = Path(dirpath)
        # A child holding .git is a worktree or nested repository; skip it with node_modules.
        dirnames[:] = sorted(
            name
            for name in dirnames
            if name not in SKIPPED_DIRS and not (current / name / ".git").exists()
        )
        for name in sorted(filenames):
            if name.endswith(".html"):
                yield current / name


def collect_hashes(root: Path) -> dict[str, list[str]]:
    """Map each hashed directive to the sorted, deduplicated hashes of its inline blocks."""
    hashes: dict[str, set[str]] = {directive: set() for directive in HASHED_DIRECTIVES}
    for page in iter_html_files(root):
        for match in INLINE_BLOCK.finditer(page.read_bytes()):
            tag = match.group(1).decode("ascii").lower()
            if is_skipped_inline(tag, match.group(2)):
                continue
            hashes[f"{tag}-src"].add(csp_hash(match.group(3)))
    return {directive: sorted(values) for directive, values in hashes.items()}


def find_csp(config: dict) -> str:
    values = [
        header["value"]
        for entry in config.get("headers", [])
        if entry.get("source") == CSP_SOURCE
        for header in entry.get("headers", [])
        if header.get("key") == CSP_KEY
    ]
    if len(values) != 1:
        raise CspConfigError(f"expected one {CSP_KEY} header for source {CSP_SOURCE!r}, found {len(values)}")
    return values[0]


def rewrite_csp(csp: str, hashes: dict[str, list[str]]) -> str:
    parts = []
    for part in csp.split(";"):
        tokens = part.split()
        if tokens and tokens[0] in HASHED_DIRECTIVES:
            leading = part[: len(part) - len(part.lstrip())]
            kept = [token for token in tokens[1:] if not HASH_TOKEN.fullmatch(token)]
            parts.append(leading + " ".join([tokens[0], *kept, *hashes[tokens[0]]]))
        else:
            parts.append(part)
    return ";".join(parts)


def render_vercel(text: str, hashes: dict[str, list[str]]) -> str:
    """Return vercel.json text with the CSP hashes replaced; every other byte is kept."""
    old_csp = find_csp(json.loads(text))
    new_csp = rewrite_csp(old_csp, hashes)
    if new_csp == old_csp:
        return text
    old_token = json.dumps(old_csp)
    if text.count(old_token) != 1:
        raise CspConfigError("CSP value is not stored verbatim once in vercel.json; edit it by hand")
    return text.replace(old_token, json.dumps(new_csp), 1)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Regenerate the CSP script-src and style-src hashes in vercel.json.")
    parser.add_argument("--check", action="store_true", help="fail with a diff instead of writing when out of date")
    parser.add_argument("--root", type=Path, default=REPO_ROOT, help="site root to scan (default: this repository)")
    args = parser.parse_args(argv)

    config_path = args.root / "vercel.json"
    try:
        current = config_path.read_text(encoding="utf-8")
        updated = render_vercel(current, collect_hashes(args.root))
    except (CspConfigError, json.JSONDecodeError, OSError) as error:
        print(f"csp-hashes: {error}", file=sys.stderr)
        return 2

    if args.check:
        if updated == current:
            print("vercel.json CSP hashes are up to date.")
            return 0
        expected = json.dumps(json.loads(updated), indent=2).splitlines(keepends=True)
        actual = json.dumps(json.loads(current), indent=2).splitlines(keepends=True)
        sys.stdout.writelines(difflib.unified_diff(actual, expected, "vercel.json", "vercel.json (expected)"))
        print("vercel.json CSP hashes are out of date. Run: python3 scripts/csp-hashes.py", file=sys.stderr)
        return 1

    if updated == current:
        print("vercel.json CSP hashes already up to date.")
    else:
        config_path.write_text(updated, encoding="utf-8")
        print("vercel.json CSP hashes updated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
