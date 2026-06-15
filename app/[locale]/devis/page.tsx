import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DevisSection } from '@/components/sections/DevisSection';
import { buildPageMetadata, type Locale } from '@/components/SEO';

export const dynamic = 'force-dynamic';

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
      <Suspense
        fallback={
          <div
            style={{
              minHeight: '100vh',
              background: '#FBF9FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '3px solid #e4e1d8',
                borderTopColor: '#3626A7',
                animation: 'spin 0.8s linear infinite',
              }}
            />
          </div>
        }
      >
        <DevisSection />
      </Suspense>
    </main>
  );
}
