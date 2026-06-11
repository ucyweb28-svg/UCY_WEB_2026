import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactSection } from '@/components/sections/ContactSection';
import { buildPageMetadata, type Locale } from '@/components/SEO';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return buildPageMetadata({
    locale,
    path: '/contact',
    title: t('meta_title'),
    description: t('subtitle'),
  });
}

export default function ContactPage() {
  return (
    <main className="pt-[104px]">
      <ContactSection />
    </main>
  );
}
