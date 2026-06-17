import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Script from 'next/script';
import localFont from 'next/font/local';
import { Syne, DM_Sans, Montserrat } from 'next/font/google';
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

const trap = localFont({
  src: [
    { path: '../fonts/Trap-Light.otf', weight: '300', style: 'normal' },
    { path: '../fonts/Trap-Regular.otf', weight: '400', style: 'normal' },
    { path: '../fonts/Trap-Medium.otf', weight: '500', style: 'normal' },
    { path: '../fonts/Trap-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../fonts/Trap-Bold.otf', weight: '700', style: 'normal' },
    { path: '../fonts/Trap-ExtraBold.otf', weight: '800', style: 'normal' },
    { path: '../fonts/Trap-Black.otf', weight: '900', style: 'normal' },
  ],
  variable: '--font-trap',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
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
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
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
      className={`${syne.variable} ${dmSans.variable} ${trap.variable} ${montserrat.variable}`}
    >
      <body>
        <OrganizationSchema locale={locale as Locale} />
        <Script
          defer
          src="https://plausible.io/js/pa-tFDAOfMye2Yqt_RFpKqo_.js"
          strategy="afterInteractive"
        />
        <Script
          id="plausible-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              'window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()',
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <div className="fixed top-0 left-0 right-0 z-50">
            <AnnouncementBanner />
            <Nav />
          </div>
          <div style={{ opacity: 1, transition: 'opacity 0.15s ease' }}>
            {children}
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
