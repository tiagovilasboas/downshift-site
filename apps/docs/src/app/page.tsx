import Link from 'next/link';
import { NAV } from '@/lib/nav';
import { getDoc, type Collection } from '@/lib/content';

function collectionFromHref(href: string): Collection {
  return href.startsWith('/guides/') ? 'guides' : 'docs';
}

export default function DocsIndexPage() {
  const groups = NAV.map((group) => ({
    label: group.label,
    items: group.items.map((item) => {
      const doc = getDoc(collectionFromHref(item.href), item.slug);
      return {
        href: item.href,
        title: doc?.title ?? item.slug,
        description: doc?.description ?? '',
      };
    }),
  }));

  return (
    <div className="mx-auto max-w-[900px]">
      <h1 className="text-3xl font-medium tracking-tight text-title sm:text-4xl">
        Downshift documentation
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Model routing, the compactor, and Downshift Code Intelligence for Claude
        Code, Codex, Cursor and other harnesses. Start with installation, then
        explore the reference and guides.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {groups.map((group) => (
          <section key={group.label}>
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
                >
                  <h3 className="font-medium text-title group-hover:text-accent">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted">
                      {item.description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
