import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/components/SEO';
import { SERVICE_SLUGS } from '@/lib/utils/services';

const locales = ['fr', 'en'] as const;

function url(locale: 'fr' | 'en', path: string): string {
  const prefix = locale === 'fr' ? '' : '/en';
  const normalizedPath = path === '/' ? '' : path;
  return `${SITE_URL}${prefix}${normalizedPath}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: url(locale, '/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: url(locale, '/contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: url(locale, '/pricing'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: url(locale, '/devis'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: url(locale, '/mentions-legales'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]);

  const serviceRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({
      url: url(locale, `/services/${slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...serviceRoutes];
}
