#!/usr/bin/env python3
"""Keep sitemap.xml <lastmod> in step with git history.

Each <url>'s <lastmod> becomes the committer date (YYYY-MM-DD) of the last commit that
touched the page's index.html. A page with uncommitted changes gets today's date, so the
value is right once those changes are committed.

The sitemap must list exactly the indexable pages: every index.html under the site root
whose <meta name="robots"> does not say noindex.

Usage:
  python3 scripts/sitemap-lastmod.py           rewrite stale <lastmod> values
  python3 scripts/sitemap-lastmod.py --check   exit 1 when a <lastmod> is older than the
                                               page's last commit or the URL set is wrong
"""

from __future__ import annotations

import argparse
import datetime
import os
import re
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SITE_ORIGIN = "https://downshift-ai.vercel.app"
SKIPPED_DIRS = {"node_modules", ".git", "apps", "packages"}

URL_BLOCK = re.compile(r"<url>(.*?)</url>", re.DOTALL)
LOC = re.compile(r"<loc>([^<]+)</loc>")
LASTMOD = re.compile(r"<lastmod>([^<]*)</lastmod>")
ROBOTS_META = re.compile(r"<meta\s+name=\"robots\"\s+content=\"([^\"]*)\"", re.IGNORECASE)


def page_file(root: Path, loc: str) -> Path:
    if not loc.startswith(SITE_ORIGIN + "/"):
        raise ValueError(f"loc outside {SITE_ORIGIN}: {loc}")
    rel = loc[len(SITE_ORIGIN) + 1:].strip("/")
    parts = [p for p in rel.split("/") if p]
    return root.joinpath(*parts, "index.html")


def indexable_pages(root: Path) -> set[Path]:
    pages = set()
    for dirpath, dirnames, filenames in os.walk(root):
        current = Path(dirpath)
        dirnames[:] = [
            d for d in dirnames
            if d not in SKIPPED_DIRS and not (current / d / ".git").exists()
        ]
        if "index.html" not in filenames:
            continue
        page = current / "index.html"
        robots = ROBOTS_META.search(page.read_text(encoding="utf-8"))
        if robots and "noindex" in robots.group(1).lower():
            continue
        pages.add(page.resolve())
    return pages


def git(root: Path, *args: str) -> str:
    return subprocess.run(
        ["git", *args], cwd=root, capture_output=True, text=True, check=True
    ).stdout.strip()


def last_change(root: Path, page: Path) -> str:
    rel = page.relative_to(root.resolve()).as_posix()
    if git(root, "status", "--porcelain", "--", rel):
        return datetime.date.today().isoformat()
    committed = git(root, "log", "-1", "--format=%cs", "--", rel)
    return committed or datetime.date.today().isoformat()


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Set sitemap.xml <lastmod> from git history.")
    parser.add_argument("--check", action="store_true", help="fail instead of writing when stale")
    parser.add_argument("--root", type=Path, default=REPO_ROOT, help="site root (default: this repository)")
    args = parser.parse_args(argv)
    root = args.root.resolve()
    sitemap_path = root / "sitemap.xml"
    text = sitemap_path.read_text(encoding="utf-8")

    problems: list[str] = []
    listed: set[Path] = set()

    def update(block: re.Match) -> str:
        body = block.group(1)
        loc = LOC.search(body).group(1)
        page = page_file(root, loc).resolve()
        listed.add(page)
        if not page.exists():
            problems.append(f"{loc}: no page at {page.relative_to(root)}")
            return block.group(0)
        want = last_change(root, page)
        current = LASTMOD.search(body)
        have = current.group(1) if current else ""
        if have >= want:
            return block.group(0)
        problems.append(f"{loc}: lastmod {have or '(missing)'} older than last change {want}")
        if current:
            body = body[:current.start(1)] + want + body[current.end(1):]
        else:
            body = body.replace("</loc>", f"</loc><lastmod>{want}</lastmod>", 1)
        return f"<url>{body}</url>"

    updated = URL_BLOCK.sub(update, text)
    indexable = indexable_pages(root)
    url_set_errors = [f"missing from sitemap: {p.relative_to(root)}" for p in sorted(indexable - listed)]
    url_set_errors += [f"not indexable but listed: {p.relative_to(root)}" for p in sorted(listed - indexable) if p.exists()]

    if args.check:
        for line in problems + url_set_errors:
            print(line)
        if problems or url_set_errors:
            return 1
        print("sitemap.xml lastmod and URL set are up to date.")
        return 0

    if updated != text:
        sitemap_path.write_text(updated, encoding="utf-8")
        print(f"sitemap.xml: updated {sum('older than' in p for p in problems)} lastmod value(s).")
    for line in url_set_errors:
        print(line, file=sys.stderr)
    return 1 if url_set_errors or any("no page at" in p for p in problems) else 0


if __name__ == "__main__":
    sys.exit(main())
