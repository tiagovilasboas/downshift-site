// Header faithful to index.html — preserves all original CSS classes
// EN version; PT-BR swaps href/hreflang/lang on the lang switcher

interface HeaderProps {
  locale?: string;
}

export async function Header({ locale = 'en' }: HeaderProps) {
  const isPt = locale === 'pt-BR';
  const langHref = isPt ? '/' : '/pt-br/';
  const langHreflang = isPt ? 'en' : 'pt-BR';
  const langLang = isPt ? 'en' : 'pt-BR';
  const langLabel = isPt ? 'Read in English' : 'Ler em português';
  const langText = isPt ? 'EN' : 'PT';

  return (
    <header>
      <input type="checkbox" id="mn" aria-label="Menu" />
      <div className="w">
        <nav aria-label="Main">
          <a className="lg" href={isPt ? '/pt-br/' : '/'} aria-label="Downshift home">
            <picture>
              <source srcSet="/downshift-logo-dark.svg" media="(prefers-color-scheme:dark)" />
              <img
                src="/downshift-logo-light.svg"
                alt="Downshift"
                width={258}
                height={60}
                fetchPriority="high"
              />
            </picture>
          </a>

          <ul className="dl">
            <li><a href="#action">See it in action</a></li>
            <li><a href="#layers">Layers</a></li>
            <li><a href="#flow">How it works</a></li>
            <li><a href="#evidence">Evidence</a></li>
            <li><a href="/docs/">Docs</a></li>
          </ul>

          <div className="hr">
            <a
              className="btn lang"
              href={langHref}
              hrefLang={langHreflang}
              lang={langLang}
              aria-label={langLabel}
            >
              {langText}
            </a>
            <a className="btn" href="https://github.com/sponsors/tiagovilasboas" rel="noopener noreferrer">
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#ie" /></svg>
              Sponsor
            </a>
            <a className="btn p" href="https://github.com/tiagovilasboas/downshift" rel="noopener noreferrer">
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#is" /></svg>
              GitHub
            </a>
          </div>

          <label className="mt" htmlFor="mn" aria-hidden="true">
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#im" /></svg>
          </label>
        </nav>
      </div>

      <div className="mp">
        <ul>
          <li><a href="#problem">The problem</a></li>
          <li><a href="#features">What you get</a></li>
          <li><a href="#action">See it in action</a></li>
          <li><a href="#flow">How it works</a></li>
          <li><a href="#layers">Layers</a></li>
          <li><a href="#evidence">Evidence</a></li>
          <li><a href="#harnesses">Harnesses</a></li>
          <li><a href="#start">Get started</a></li>
          <li><a href="/docs/">Docs</a></li>
          <li><a href="https://github.com/tiagovilasboas/downshift" rel="noopener noreferrer">GitHub</a></li>
        </ul>
        <div className="acts">
          <a className="btn lang" href={langHref} hrefLang={langHreflang} lang={langLang} aria-label={langLabel}>
            {langText}
          </a>
          <a className="btn" href="https://github.com/sponsors/tiagovilasboas" rel="noopener noreferrer">
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#ie" /></svg>
            Sponsor
          </a>
        </div>
      </div>
    </header>
  );
}
