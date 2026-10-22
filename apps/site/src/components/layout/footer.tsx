const GH = 'https://github.com/tiagovilasboas/downshift';
const SPONSOR = 'https://github.com/sponsors/tiagovilasboas';

function GithubIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
    </svg>
  );
}

const columns = [
  {
    heading: 'Product',
    links: [
      { href: '#flow', label: 'How it works' },
      { href: '#action', label: 'See it in action' },
      { href: '#harnesses', label: 'Harnesses' },
      { href: '#evidence', label: 'Evidence' },
      { href: '#faq', label: 'FAQ' },
    ],
  },
  {
    heading: 'Docs',
    links: [
      { href: `${GH}/blob/main/docs/guides/install.md`, label: 'Install guide', external: true },
      { href: `${GH}/blob/main/docs/README.md`, label: 'Documentation', external: true },
      { href: `${GH}/blob/main/docs/reference/capability-matrix.md`, label: 'Capability matrix', external: true },
      { href: '/llms.txt', label: 'llms.txt' },
    ],
  },
  {
    heading: 'Project',
    links: [
      { href: GH, label: 'GitHub', external: true },
      { href: `${GH}/blob/main/CONTRIBUTING.md`, label: 'Contributing', external: true },
      { href: SPONSOR, label: 'Sponsor', external: true },
      { href: `${GH}/blob/main/LICENSE`, label: 'Apache-2.0 license', external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-5">
            <picture>
              <source srcSet="/downshift-logo-dark.svg" media="(prefers-color-scheme:dark)" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/downshift-logo-light.svg" alt="Downshift" width={360} height={84} loading="lazy" className="h-12 w-auto" />
            </picture>
            <div className="flex items-center gap-4 text-muted">
              <a href={GH} rel="noopener" aria-label="GitHub" className="transition-colors hover:text-title">
                <GithubIcon />
              </a>
              <a href={SPONSOR} rel="noopener" aria-label="Sponsor" className="transition-colors hover:text-title">
                <HeartIcon />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="mb-3 text-sm font-semibold text-title">{col.heading}</p>
                <ul className="flex flex-col gap-2 text-sm text-muted">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...('external' in link && link.external ? { rel: 'noopener' } : {})}
                        className="transition-colors hover:text-title"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-1 border-t border-border pt-6 text-sm text-muted">
          <p>Downshift by Tiago Vilas Boas</p>
          <p className="text-xs text-hint">MONTANHA TECH · CNPJ 60.782.110/0001-84</p>
        </div>
      </div>
    </footer>
  );
}
