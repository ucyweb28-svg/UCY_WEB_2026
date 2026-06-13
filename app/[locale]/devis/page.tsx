import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DevisSection } from '@/components/sections/DevisSection';
import { buildPageMetadata, type Locale } from '@/components/SEO';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'devis' });

  return buildPageMetadata({
    locale,
    path: '/devis',
    title: t('meta_title'),
    description: t('subtitle'),
  });
}

export default function DevisPage() {
  return (
    <main className="pt-[104px]">
      <Suspense fallback={null}>
        <DevisSection />
      </Suspense>
    </main>
  );
}
