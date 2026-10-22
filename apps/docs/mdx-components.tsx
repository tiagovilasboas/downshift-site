import type { MDXComponents } from 'mdx/types';
import type { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { Callout } from '@/components/mdx/callout';

// Next.js MDX requires a top-level mdx-components file. These components style
// the Markdown output and expose custom components (Callout) to MDX content.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    a: ({
      href = '',
      children,
      ...props
    }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const isInternal = href.startsWith('/') && !href.startsWith('//');
      if (isInternal) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          rel="noopener noreferrer"
          target={href.startsWith('http') ? '_blank' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    ...components,
  };
}
