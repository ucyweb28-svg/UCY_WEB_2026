import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PricingSection } from '@/components/sections/PricingSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pricing');

  return {
    title: t('meta_title'),
    description: t('subtitle'),
  };
}

export default function PricingPage() {
  return (
    <main className="pt-[104px]">
      <PricingSection />
    </main>
  );
}
