'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/toc';

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-88px 0px -70% 0px', threshold: 0 },
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="hidden xl:block"
    >
      <div className="sticky top-[88px] max-h-[calc(100vh-112px)] overflow-y-auto pt-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
          On this page
        </p>
        <ul className="flex flex-col gap-0.5 border-l border-border text-sm">
          {headings.map((h) => {
            const active = h.id === activeId;
            return (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={
                    active
                      ? 'block border-l-2 border-accent py-1 pl-3 text-accent'
                      : 'block border-l-2 border-transparent py-1 text-muted hover:text-title'
                  }
                  style={{
                    marginLeft: '-1px',
                    paddingLeft: h.depth === 3 ? '1.5rem' : '0.75rem',
                  }}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default TableOfContents;
