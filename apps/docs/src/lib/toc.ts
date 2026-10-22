import GithubSlugger from 'github-slugger';

export interface Heading {
  depth: number;
  text: string;
  id: string;
}

/**
 * Extract h2/h3 headings from raw MDX, ignoring lines inside fenced code blocks
 * and the leading h1 (page title). IDs are produced with github-slugger — the
 * same slugger rehype-slug uses — so the TOC anchors match the rendered ids,
 * including repeated-heading suffixes.
 */
export function extractHeadings(mdx: string): Heading[] {
  const lines = mdx.split('\n');
  const headings: Heading[] = [];
  const slugger = new GithubSlugger();
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.*)$/.exec(line);
    if (!m) continue;
    const depth = m[1].length;
    const text = m[2]
      .replace(/`([^`]*)`/g, '$1')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_]/g, '')
      .trim();
    if (!text) continue;
    headings.push({ depth, text, id: slugger.slug(text) });
  }
  return headings;
}
