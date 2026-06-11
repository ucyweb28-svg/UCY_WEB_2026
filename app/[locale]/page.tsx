import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');

  return {
    title: t('home_title'),
    description: t('home_description'),
  };
}

export default async function HomePage() {
  const t = await getTranslations('meta');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'UCY Studio',
    url: 'https://ucyweb.fr',
    logo: 'https://ucyweb.fr/favicon.svg',
    description: t('home_description'),
    telephone: '+972587467029',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jerusalem',
      addressCountry: 'IL',
    },
    areaServed: ['IL', 'FR'],
    founder: {
      '@type': 'Person',
      name: 'Yonathan Chetrit',
    },
    sameAs: [
      'https://www.instagram.com/ucy_studio/',
      'https://www.linkedin.com/company/115831904/',
      'https://www.behance.net/yonathanchetrit3',
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
