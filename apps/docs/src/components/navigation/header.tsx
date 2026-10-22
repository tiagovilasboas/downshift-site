import Link from 'next/link';

export function Header() {
  return (
    <header
      className="sticky top-0 z-10 border-b border-border backdrop-blur"
      style={{ background: 'color-mix(in srgb, var(--b) 88%, transparent)' }}
    >
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center gap-2 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Downshift Docs home"
          className="mr-auto inline-flex items-center gap-2"
        >
          <picture>
            <source
              srcSet="/downshift-logo-dark.svg"
              media="(prefers-color-scheme: dark)"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/downshift-logo-light.svg"
              alt="Downshift"
              width={172}
              height={40}
              className="h-8 w-auto"
            />
          </picture>
          <span className="text-sm font-medium text-title">Docs</span>
        </Link>
        <Link
          href="/guides/claude-code-token-usage"
          className="hidden rounded-full px-3 py-2 text-sm text-muted hover:bg-secondary-bg hover:text-title sm:inline-flex"
        >
          Guides
        </Link>
        <Link
          href="/"
          className="hidden rounded-full px-3 py-2 text-sm text-muted hover:bg-secondary-bg hover:text-title sm:inline-flex"
        >
          Home
        </Link>
        <a
          href="https://github.com/tiagovilasboas/downshift"
          rel="noopener noreferrer"
          target="_blank"
          className="hidden rounded-full px-3 py-2 text-sm text-muted hover:bg-secondary-bg hover:text-title sm:inline-flex"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}

export default Header;
