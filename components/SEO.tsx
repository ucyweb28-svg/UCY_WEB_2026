import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const SITE_URL = 'https://ucyweb.fr';
export const SITE_NAME = 'UCY Studio';

export const OG_IMAGE = '/images/og-image.jpg';

export type Locale = 'fr' | 'en';

const OG_LOCALE: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
};

// next-intl est configuré en `localePrefix: 'as-needed'` :
// le FR (locale par défaut) n'a pas de préfixe d'URL, l'EN est préfixé par /en.
function absoluteUrl(locale: Locale, path: string): string {
  const prefix = locale === 'fr' ? '' : `/${locale}`;
  const normalizedPath = path === '/' ? '' : path;
  return `${SITE_URL}${prefix}${normalizedPath}` || SITE_URL;
}

interface PageMetadataInput {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}

export function buildPageMetadata({ locale, path, title, description }: PageMetadataInput): Metadata {
  const url = absoluteUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: absoluteUrl('fr', path),
        en: absoluteUrl('en', path),
        'x-default': absoluteUrl('fr', path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: 'website',
      images: [{ url: OG_IMAGE }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export async function OrganizationSchema({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'meta' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: t('home_description'),
    telephone: '+972587467029',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jerusalem',
      addressCountry: 'IL',
    },
    areaServed: ['IL', 'FR'],
    founder: {
      '@type': 'Person',
      name: 'Yonathan Chetrit',
    },
    sameAs: [
      'https://www.instagram.com/ucy_studio/',
      'https://www.linkedin.com/company/115831904/',
      'https://www.behance.net/yonathanchetrit3',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
