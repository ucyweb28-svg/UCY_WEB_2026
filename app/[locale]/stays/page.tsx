import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata, type Locale } from '@/components/SEO';
import { StaysHero } from '@/components/sections/stays/StaysHero';
import { StaysShowcase } from '@/components/sections/stays/StaysShowcase';
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

  return {
    ...buildPageMetadata({
      locale,
      path: '/stays',
      title: t('meta_title'),
      description: t('meta_description'),
    }),
    robots: { index: false, follow: false },
  };
}

export default function StaysPage() {
  return (
    <main className="pt-[104px]" style={{ backgroundColor: '#FBF9FF' }}>
      <StaysHero />
      <StaysShowcase />
      <Collection />
      <BrandPillars />
      <TrustTeam />
      <NewBuildDesign />
      <BecomePartner />
    </main>
  );
}
