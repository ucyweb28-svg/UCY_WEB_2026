import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';
import { buildPageMetadata, type Locale } from '@/components/SEO';
import {
  PRICING_PACKS,
  PRICING_OPTIONS,
  formatPrice,
  getPackPrice,
  getOptionPrice,
} from '@/lib/utils/pricing';

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

export default async function DevisPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { pack?: string; options?: string };
}) {
  const locale = params.locale as Locale;
  const t = await getTranslations({ locale, namespace: 'devis' });
  const tp = await getTranslations({ locale, namespace: 'pricing' });

  const pack = PRICING_PACKS.find((p) => p.id === searchParams.pack) ?? null;
  const optionIds = (searchParams.options ?? '').split(',').filter(Boolean);
  const options = PRICING_OPTIONS.filter((o) => optionIds.includes(o.id));

  const totalEUR = pack
    ? getPackPrice(pack, 'EUR') + options.reduce((sum, o) => sum + getOptionPrice(o, 'EUR'), 0)
    : 0;
  const totalILS = pack
    ? getPackPrice(pack, 'ILS') + options.reduce((sum, o) => sum + getOptionPrice(o, 'ILS'), 0)
    : 0;

  return (
    <main className="pt-[104px]">
      <section className="py-14" style={{ backgroundColor: '#f5f3ee' }}>
        <div className="max-w-2xl mx-auto px-6">

          <div className="flex flex-col items-center text-center" style={{ marginBottom: 32 }}>
            <Badge>{t('badge')}</Badge>
            <h1 className="font-heading font-bold" style={{ fontSize: 'clamp(24px, 4vw, 32px)', color: '#0a0a0f', marginTop: 16 }}>
              {t('headline')}
            </h1>
            <p className="font-sans" style={{ color: 'rgba(10,10,15,0.5)', fontSize: 14, marginTop: 12 }}>
              {t('subtitle')}
            </p>
          </div>

          {!pack ? (
            <div className="bg-white text-center" style={{ border: '1px solid #e4e1d8', borderRadius: 18, padding: 28 }}>
              <h2 className="font-heading font-bold" style={{ fontSize: 16, color: '#0a0a0f' }}>
                {t('empty_title')}
              </h2>
              <p className="font-sans" style={{ fontSize: 13, color: 'rgba(10,10,15,.5)', marginTop: 8 }}>
                {t('empty_text')}
              </p>
              <Link
                href="/pricing"
                className="inline-block font-sans font-semibold"
                style={{ color: '#3626A7', fontSize: 14, marginTop: 16 }}
              >
                {t('back_to_pricing')}
              </Link>
            </div>
          ) : (
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(54,38,167,.14) 0%, rgba(223,87,188,.10) 100%)',
                border: '1px solid rgba(223,87,188,.33)',
                borderRadius: 18,
                padding: 28,
              }}
            >
              <p className="font-sans uppercase font-semibold" style={{ fontSize: 11, letterSpacing: '0.15em', color: '#3626A7', marginBottom: 16 }}>
                {t('selection_label')}
              </p>

              <div className="flex items-center justify-between font-sans" style={{ fontSize: 14, color: '#0a0a0f', padding: '10px 0', borderBottom: '1px solid rgba(10,10,15,.08)' }}>
                <span>{tp(pack.titleKey)}</span>
                <span style={{ fontWeight: 700 }}>{formatPrice(getPackPrice(pack, 'EUR'), 'EUR')} / {formatPrice(getPackPrice(pack, 'ILS'), 'ILS')}</span>
              </div>

              {options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between font-sans"
                  style={{ fontSize: 13, color: 'rgba(10,10,15,.6)', padding: '10px 0', borderBottom: '1px solid rgba(10,10,15,.08)' }}
                >
                  <span>{tp(option.nameKey)}</span>
                  <span>+{formatPrice(getOptionPrice(option, 'EUR'), 'EUR')} / +{formatPrice(getOptionPrice(option, 'ILS'), 'ILS')}</span>
                </div>
              ))}

              <div className="flex items-center justify-between" style={{ padding: '16px 0' }}>
                <span className="font-heading font-bold" style={{ fontSize: 15, color: '#0a0a0f' }}>
                  {t('total_label')}
                </span>
                <span className="font-heading" style={{ fontSize: 22, fontWeight: 900, color: '#0a0a0f' }}>
                  {formatPrice(totalEUR, 'EUR')} / {formatPrice(totalILS, 'ILS')}
                </span>
              </div>

              <Link
                href="/contact"
                className="flex items-center justify-center font-heading font-semibold w-full"
                style={{
                  background: 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)',
                  backgroundSize: '300% 100%',
                  animation: 'gradientShift 4s ease infinite',
                  borderRadius: 100,
                  color: 'white',
                  fontSize: 14,
                  padding: '14px 0',
                  marginTop: 8,
                }}
              >
                {t('cta_contact')}
              </Link>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
