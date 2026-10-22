import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Problem } from '@/components/sections/problem';
import { Features } from '@/components/sections/features';
import { Evidence } from '@/components/sections/evidence';
import { Install } from '@/components/sections/install';
import { Faq } from '@/components/sections/faq';
import { Stub } from '@/components/sections/stub';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Stub id="who" label="Who it is for" />
        <Problem />
        <Features />
        <Stub id="action" label="See it in action" />
        <Stub id="compact" label="Clean output, smaller context" />
        <Stub id="dci" label="Code intelligence (DCI)" />
        <Stub id="flow" label="How a spawn gets its model" />
        <Stub id="layers" label="Nine layers" />
        <Evidence />
        <Stub id="harnesses" label="Harnesses" />
        <Install />
        <Stub id="open" label="Open source" />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
