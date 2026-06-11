import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PricingSection } from '@/components/sections/PricingSection';
import { buildPageMetadata, type Locale } from '@/components/SEO';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return buildPageMetadata({
    locale,
    path: '/pricing',
    title: t('meta_title'),
    description: t('subtitle'),
  });
}

export default function PricingPage() {
  return (
    <main className="pt-[104px]">
      <PricingSection />
    </main>
  );
}
