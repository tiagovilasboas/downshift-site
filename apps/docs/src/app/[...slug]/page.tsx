import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import { allDocMeta, getDoc, type Collection } from '@/lib/content';
import { useMDXComponents } from '../../../mdx-components';
import { TableOfContents } from '@/components/navigation/toc';
import { extractHeadings } from '@/lib/toc';

interface Params {
  slug: string[];
}

// Pre-render every docs/guides page at build time.
export function generateStaticParams(): Params[] {
  return allDocMeta().map((d) => ({ slug: [d.collection, d.slug] }));
}

function parseSlug(slug: string[]): { collection: Collection; name: string } | null {
  if (slug.length !== 2) return null;
  const [col, name] = slug;
  if (col !== 'docs' && col !== 'guides') return null;
  return { collection: col, name };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const doc = getDoc(parsed.collection, parsed.name);
  if (!doc) return {};
  const canonical = `https://downshift-ai.vercel.app${doc.href}/`;
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: canonical,
      type: 'article',
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const doc = getDoc(parsed.collection, parsed.name);
  if (!doc) notFound();

  const headings = extractHeadings(doc.content);
  const components = useMDXComponents({});

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-12">
      <article className="prose prose-invert max-w-[720px] prose-headings:scroll-mt-24 prose-pre:bg-card prose-pre:border prose-pre:border-border">
        <MDXRemote
          source={doc.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypePrettyCode,
                  { theme: 'github-dark', keepBackground: false },
                ],
              ],
            },
          }}
        />
      </article>
      <TableOfContents headings={headings} />
    </div>
  );
}
