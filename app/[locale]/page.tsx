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
