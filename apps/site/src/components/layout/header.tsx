import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface HeaderProps {
  locale: string;
}

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: 'nav' });
  const altLocale = locale === 'en' ? 'pt-BR' : 'en';
  const altHref = locale === 'en' ? '/pt-br' : '/';
  const altLabel = locale === 'en' ? 'Ler em português' : 'Read in English';

  return (
    <header>
      {/* Skip link */}
      <a className="skip" href="#main">
        {t('skipToContent')}
      </a>

      <div className="w">
        <nav aria-label="Main">
          {/* Logo */}
          <Link className="lg" href={locale === 'en' ? '/' : '/pt-br'} aria-label="Downshift home">
            <picture>
              <source srcSet="/downshift-logo-dark.svg" media="(prefers-color-scheme: dark)" />
              <img
                src="/downshift-logo-light.svg"
                alt="Downshift"
                width={258}
                height={60}
                fetchPriority="high"
              />
            </picture>
          </Link>

          {/* Desktop nav */}
          <ul className="dl">
            <li><a href="#action">{t('action')}</a></li>
            <li><a href="#layers">{t('layers')}</a></li>
            <li><a href="#flow">{t('flow')}</a></li>
            <li><a href="#evidence">{t('evidence')}</a></li>
            <li><Link href="/docs/">{t('docs')}</Link></li>
          </ul>

          {/* Desktop right actions */}
          <div className="hr">
            <a
              className="btn lang"
              href={altHref}
              hrefLang={altLocale}
              lang={altLocale}
              aria-label={altLabel}
            >
              {locale === 'en' ? 'PT' : 'EN'}
            </a>
            <a
              className="btn"
              href="https://github.com/sponsors/tiagovilasboas"
              rel="noopener noreferrer"
            >
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                <use href="#ie" />
              </svg>
              {t('sponsor')}
            </a>
            <a
              className="btn p"
              href="https://github.com/tiagovilasboas/downshift"
              rel="noopener noreferrer"
            >
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                <use href="#is" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Mobile hamburger — checkbox hack, zero JS */}
          <input type="checkbox" id="mn" aria-label="Menu" />
          <label className="mt" htmlFor="mn" aria-hidden="true">
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#im" />
            </svg>
          </label>
        </nav>
      </div>

      {/* Mobile menu panel */}
      <div className="mp">
        <ul>
          <li><a href="#problem">{t('problem')}</a></li>
          <li><a href="#features">{t('features')}</a></li>
          <li><a href="#action">{t('action')}</a></li>
          <li><a href="#flow">{t('flow')}</a></li>
          <li><a href="#layers">{t('layers')}</a></li>
          <li><a href="#evidence">{t('evidence')}</a></li>
          <li><a href="#harnesses">{t('harnesses')}</a></li>
          <li><a href="#start">{t('start')}</a></li>
          <li><Link href="/docs/">{t('docs')}</Link></li>
          <li>
            <a href="https://github.com/tiagovilasboas/downshift" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
        </ul>
        <div className="acts">
          <a
            className="btn lang"
            href={altHref}
            hrefLang={altLocale}
            lang={altLocale}
            aria-label={altLabel}
          >
            {locale === 'en' ? 'PT' : 'EN'}
          </a>
          <a
            className="btn"
            href="https://github.com/sponsors/tiagovilasboas"
            rel="noopener noreferrer"
          >
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#ie" />
            </svg>
            {t('sponsor')}
          </a>
        </div>
      </div>
    </header>
  );
}
