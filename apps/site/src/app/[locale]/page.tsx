import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { Problem } from '@/components/sections/problem';
import { Install } from '@/components/sections/install';
import { Faq } from '@/components/sections/faq';
import { SectionAction } from '@/components/sections/section-action';
import { SectionCompact } from '@/components/sections/section-compact';
import { SectionDCI } from '@/components/sections/section-dci';
import { SectionFlow } from '@/components/sections/section-flow';
import { SectionHarnesses } from '@/components/sections/section-harnesses';
import { SectionOpen } from '@/components/sections/section-open';

// Evidence is inside Features already (stub still in remaining.tsx for ordering)
// Layers: content-heavy, low SEO value — using minimal stub until M5 polish
function SectionLayers() {
  return (
    <section id="layers" style={{ padding: '64px 0' }}>
      <div className="w">
        <div className="hd">
          <h2 className="h2x">Nine layers, each with its status.</h2>
          <p className="bd">
            Status is what the repository shows today, not what is planned. Implemented does not
            mean validated on every harness.
          </p>
        </div>
        <p className="sm" style={{ marginTop: '16px' }}>
          Full layer breakdown available in the{' '}
          <a href="/docs/architecture">architecture docs</a>.
        </p>
      </div>
    </section>
  );
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale: _locale } = await params;

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        {/* Hero + stats */}
        <Hero />

        {/* Features strip + features list */}
        <Features />

        {/* Problem */}
        <Problem />

        {/* See it in action (ds-chat) */}
        <SectionAction />

        {/* Compact section */}
        <SectionCompact />

        {/* DCI */}
        <SectionDCI />

        {/* How it works — 8 steps */}
        <SectionFlow />

        {/* Nine layers */}
        <SectionLayers />

        {/* Harnesses table */}
        <SectionHarnesses />

        {/* Install / Get started */}
        <Install />

        {/* Open source */}
        <SectionOpen />

        {/* FAQ */}
        <Faq />
      </main>
      <Footer />
    </>
  );
}
