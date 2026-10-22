import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { Problem } from '@/components/sections/problem';
import {
  SectionWho,
  Install,
  FAQ,
  SectionAction,
  SectionCompact,
  SectionDCI,
  SectionFlow,
  SectionLayers,
  SectionEvidence,
  SectionHarnesses,
  SectionOpen,
} from '@/components/sections/remaining';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale} />
      <main id="main" tabIndex={-1}>
        {/* Hero + stats */}
        <Hero />

        {/* Features strip (#features is inside Features) */}
        <Features />

        {/* Who it is for */}
        <SectionWho />

        {/* Problem */}
        <Problem />

        {/* See it in action — M3 */}
        <SectionAction />

        {/* Compact section — M3 */}
        <SectionCompact />

        {/* DCI — M3 */}
        <SectionDCI />

        {/* How it works — M3 */}
        <SectionFlow />

        {/* Layers — M3 */}
        <SectionLayers />

        {/* Evidence — M3 */}
        <SectionEvidence />

        {/* Harnesses — M3 */}
        <SectionHarnesses />

        {/* Install / Get started */}
        <Install />

        {/* Open source — M3 */}
        <SectionOpen />

        {/* FAQ */}
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
