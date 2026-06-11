import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Script from 'next/script';
import { Syne, DM_Sans } from 'next/font/google';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBanner } from '@/components/layout/AnnouncementBanner';
import { buildPageMetadata, OrganizationSchema, SITE_URL, type Locale } from '@/components/SEO';
import '../globals.css';

const locales = ['fr', 'en'] as const;

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: '/favicon.svg',
    },
    ...buildPageMetadata({
      locale,
      path: '/',
      title: t('home_title'),
      description: t('home_description'),
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${dmSans.variable}`}
    >
      <body>
        <OrganizationSchema locale={locale as Locale} />
        <Script
          defer
          data-domain="ucyweb.fr"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <NextIntlClientProvider messages={messages}>
          <div className="fixed top-0 left-0 right-0 z-50">
            <AnnouncementBanner />
            <Nav />
          </div>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
