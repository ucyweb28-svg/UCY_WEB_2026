import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import { Syne, DM_Sans } from 'next/font/google';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

const locales = ['fr', 'en'] as const;
type Locale = (typeof locales)[number];

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

export const metadata: Metadata = {
  metadataBase: new URL('https://ucyweb.fr'),
  title: {
    default: 'UCY Studio — Design & Développement Digital',
    template: '%s | UCY Studio',
  },
  description:
    'Studio de design & développement digital haut de gamme. Jérusalem × Paris.',
  openGraph: {
    siteName: 'UCY Studio',
    locale: 'fr_FR',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

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
        <Script
          defer
          data-domain="ucyweb.fr"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
