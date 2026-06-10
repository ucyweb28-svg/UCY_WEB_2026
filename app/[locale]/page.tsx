import { HeroSection }      from '@/components/sections/HeroSection';
import { TrustStrip }       from '@/components/sections/TrustStrip';
import { StatsBar }         from '@/components/sections/StatsBar';
import { ServicesSection }  from '@/components/sections/ServicesSection';
import { AISection }        from '@/components/sections/AISection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { AboutSection }     from '@/components/sections/AboutSection';
import { FooterCTA }        from '@/components/sections/FooterCTA';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustStrip />
      <StatsBar />
      <ServicesSection />
      <AISection />
      <PortfolioSection />
      <AboutSection />
      <FooterCTA />
    </main>
  );
}
