import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('meta');

  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <p style={{ color: 'var(--m)', marginTop: '1rem' }}>
        🚧 Milestone 2 — site sections coming next
      </p>
    </main>
  );
}
