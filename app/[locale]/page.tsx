import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata, type Locale } from '@/components/SEO';
import { HeroSection }      from '@/components/sections/HeroSection';
import { TrustStrip }       from '@/components/sections/TrustStrip';
import { StatsBar }         from '@/components/sections/StatsBar';
import { ServicesSection }  from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ProcessSection }   from '@/components/sections/ProcessSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { AISection }        from '@/components/sections/AISection';
import { PricingPreviewSection } from '@/components/sections/PricingPreviewSection';
import { AboutSection }     from '@/components/sections/AboutSection';
import { FooterCTA }        from '@/components/sections/FooterCTA';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return buildPageMetadata({
    locale,
    path: '/',
    title: t('home_title'),
    description: t('home_description'),
  });
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustStrip />
      <StatsBar />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <AISection />
      <PricingPreviewSection />
      <AboutSection />
      <FooterCTA />
    </main>
  );
}
