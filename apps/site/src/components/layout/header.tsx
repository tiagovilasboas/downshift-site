import { useTranslations, useLocale } from 'next-intl';

const GH = 'https://github.com/tiagovilasboas/downshift';
const SPONSOR = 'https://github.com/sponsors/tiagovilasboas';

function Logo() {
  return (
    <a className="shrink-0" href="/" aria-label="Downshift home">
      <picture>
        <source srcSet="/downshift-logo-dark.svg" media="(prefers-color-scheme:dark)" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/downshift-logo-light.svg"
          alt="Downshift"
          width={258}
          height={60}
          fetchPriority="high"
          className="h-7 w-auto"
        />
      </picture>
    </a>
  );
}

function StarIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

const btnBase =
  'inline-flex items-center gap-2 h-9 px-4 rounded-full border border-border text-sm font-medium text-foreground transition-colors hover:border-muted';
const btnPrimary =
  'inline-flex items-center gap-2 h-9 px-4 rounded-full bg-primary-bg text-primary-fg text-sm font-medium transition-opacity hover:opacity-90';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  // en lives at /, pt-BR at /pt-br (localePrefix: as-needed)
  const otherHref = locale === 'pt-BR' ? '/' : '/pt-br';
  const langLabel = locale === 'pt-BR' ? 'Read in English' : 'Ler em português';
  const langShort = locale === 'pt-BR' ? 'EN' : 'PT';
  const otherLang = locale === 'pt-BR' ? 'en' : 'pt-BR';

  const desktopNav = [
    { href: '#action', label: t('action') },
    { href: '#layers', label: t('layers') },
    { href: '#flow', label: t('flow') },
    { href: '#evidence', label: t('evidence') },
  ];

  const mobileNav = [
    { href: '#problem', label: t('problem') },
    { href: '#features', label: t('features') },
    { href: '#action', label: t('action') },
    { href: '#flow', label: t('flow') },
    { href: '#layers', label: t('layers') },
    { href: '#evidence', label: t('evidence') },
    { href: '#harnesses', label: t('harnesses') },
    { href: '#start', label: t('start') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-title" href="#main">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {desktopNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-title">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/docs/" className="transition-colors hover:text-title">
                {t('docs')}
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <a href={otherHref} hrefLang={otherLang} lang={otherLang} className={btnBase} aria-label={langLabel}>
            {langShort}
          </a>
          <a href={SPONSOR} rel="noopener" className={btnBase}>
            <HeartIcon />
            Sponsor
          </a>
          <a href={GH} rel="noopener" className={btnPrimary}>
            <StarIcon />
            GitHub
          </a>
        </div>

        {/* Mobile menu — zero JS via <details> */}
        <details className="relative md:hidden">
          <summary
            className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md text-muted transition-colors hover:text-title [&::-webkit-details-marker]:hidden"
            aria-label="Menu"
          >
            <MenuIcon />
          </summary>
          <div className="absolute right-0 top-11 w-64 rounded-xl border border-border bg-card p-4 shadow-lg">
            <ul className="flex flex-col gap-1 text-sm text-foreground">
              {mobileNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="block rounded-md px-2 py-2 transition-colors hover:bg-secondary-bg hover:text-title">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/docs/" className="block rounded-md px-2 py-2 transition-colors hover:bg-secondary-bg hover:text-title">
                  {t('docs')}
                </a>
              </li>
              <li>
                <a href={GH} rel="noopener" className="block rounded-md px-2 py-2 transition-colors hover:bg-secondary-bg hover:text-title">
                  {t('github')}
                </a>
              </li>
            </ul>
            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <a href={otherHref} hrefLang={otherLang} lang={otherLang} className={btnBase} aria-label={langLabel}>
                {langShort}
              </a>
              <a href={SPONSOR} rel="noopener" className={btnBase}>
                <HeartIcon />
                Sponsor
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
