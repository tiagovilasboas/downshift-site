import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type Collection = 'docs' | 'guides';

export interface DocFrontmatter {
  title: string;
  description: string;
  order: number;
}

export interface DocMeta extends DocFrontmatter {
  slug: string;
  collection: Collection;
  /** URL path, e.g. /docs/install or /guides/claude-code-token-usage */
  href: string;
}

export interface DocEntry extends DocMeta {
  content: string;
}

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function collectionDir(collection: Collection): string {
  return path.join(CONTENT_ROOT, collection);
}

function readFrontmatter(collection: Collection, slug: string): DocMeta {
  const file = path.join(collectionDir(collection), `${slug}.mdx`);
  const raw = fs.readFileSync(file, 'utf8');
  const { data } = matter(raw);
  const fm = data as Partial<DocFrontmatter>;
  const base = collection === 'guides' ? '/guides' : '/docs';
  return {
    slug,
    collection,
    href: `${base}/${slug}`,
    title: fm.title ?? slug,
    description: fm.description ?? '',
    order: typeof fm.order === 'number' ? fm.order : 999,
  };
}

/** List all MDX slugs in a collection, sorted by frontmatter order then title. */
export function listDocs(collection: Collection): DocMeta[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => readFrontmatter(collection, f.replace(/\.mdx$/, '')))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/** Read a single doc (frontmatter + content) or null if it does not exist. */
export function getDoc(collection: Collection, slug: string): DocEntry | null {
  const file = path.join(collectionDir(collection), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const meta = readFrontmatter(collection, slug);
  return { ...meta, ...(data as Partial<DocFrontmatter>), content } as DocEntry;
}

/** All doc + guide entries for generateStaticParams. */
export function allDocMeta(): DocMeta[] {
  return [...listDocs('docs'), ...listDocs('guides')];
}
