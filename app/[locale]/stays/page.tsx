import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata, type Locale } from '@/components/SEO';
import { StaysHero } from '@/components/sections/stays/StaysHero';
import { CityNetwork } from '@/components/sections/stays/CityNetwork';
import { Collection } from '@/components/sections/stays/Collection';
import { BrandPillars } from '@/components/sections/stays/BrandPillars';
import { TrustTeam } from '@/components/sections/stays/TrustTeam';
import { NewBuildDesign } from '@/components/sections/stays/NewBuildDesign';
import { BecomePartner } from '@/components/sections/stays/BecomePartner';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'stays' });

  return buildPageMetadata({
    locale,
    path: '/stays',
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default function StaysPage() {
  return (
    <main style={{ backgroundColor: '#FBF9FF' }}>
      <StaysHero />
      <CityNetwork />
      <Collection />
      <BrandPillars />
      <TrustTeam />
      <NewBuildDesign />
      <BecomePartner />
    </main>
  );
}
