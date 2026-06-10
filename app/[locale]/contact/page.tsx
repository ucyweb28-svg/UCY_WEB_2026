import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactSection } from '@/components/sections/ContactSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact');

  return {
    title: 'Contact — UCY Studio',
    description: t('subtitle'),
  };
}

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
