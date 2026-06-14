import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetailSection } from '@/components/sections/ServiceDetailSection';
import { buildPageMetadata, type Locale } from '@/components/SEO';
import { getServiceBySlug } from '@/lib/utils/services';

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {};
  }

  return buildPageMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: service.meta.title[locale],
    description: service.meta.description[locale],
  });
}

export default function ServiceDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as Locale;
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const hero = {
    title: service.hero.title[locale],
    subtitle: service.hero.subtitle[locale],
    tagline: service.hero.tagline[locale],
  };

  const features = service.features.map((feature) => ({
    title: feature.title[locale],
    desc: feature.desc[locale],
  }));

  const process = service.process.map((step) => ({
    title: step.title[locale],
    desc: step.desc[locale],
    duration: step.duration[locale],
  }));

  return (
    <main style={{ backgroundColor: '#FBF9FF' }}>
      <ServiceDetailSection
        image={service.image}
        hero={hero}
        color={service.color}
        heroGradientWord={service.heroGradientWord[locale]}
        heroSub={service.heroSub[locale]}
        features={features}
        process={process}
        relatedProjects={service.relatedProjects}
      />
    </main>
  );
}
