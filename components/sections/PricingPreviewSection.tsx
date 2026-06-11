'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { stagger, fadeUp } from '@/lib/utils/animations';

interface PreviewCard {
  id: string;
  tagKey: string;
  priceKey: string;
  priceAltKey: string;
  featuresKey: string[];
  ctaKey: string;
  featured: boolean;
}

const CARDS: PreviewCard[] = [
  {
    id: 'essentiel',
    tagKey: 'essentiel_tag',
    priceKey: 'essentiel_price',
    priceAltKey: 'essentiel_price_alt',
    featuresKey: ['essentiel_feature1', 'essentiel_feature2', 'essentiel_feature3'],
    ctaKey: 'cta_details',
    featured: false,
  },
  {
    id: 'professionnel',
    tagKey: 'professionnel_tag',
    priceKey: 'professionnel_price',
    priceAltKey: 'professionnel_price_alt',
    featuresKey: ['professionnel_feature1', 'professionnel_feature2', 'professionnel_feature3'],
    ctaKey: 'cta_simulate',
    featured: true,
  },
  {
    id: 'premium',
    tagKey: 'premium_tag',
    priceKey: 'premium_price',
    priceAltKey: 'premium_price_alt',
    featuresKey: ['premium_feature1', 'premium_feature2', 'premium_feature3'],
    ctaKey: 'cta_details',
    featured: false,
  },
];

function CheckIcon({ size = 14, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
}

export function PricingPreviewSection() {
  const t = useTranslations('pricing_preview');

  return (
    <section
      className="bg-white pt-20 pb-28"
      style={{ borderTop: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 -4px 24px rgba(0,0,0,0.04)' }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
          style={{ marginBottom: 48 }}
        >
          <motion.div variants={fadeUp}>
            <Badge>{t('badge')}</Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-4xl md:text-5xl leading-tight"
            style={{ color: '#000807', marginTop: 16 }}
          >
            {t('headline_start')}
            <span className="bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent animate-gradient">
              {t('headline_highlight')}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-sans text-base"
            style={{ color: 'rgba(0,8,7,0.5)', marginTop: 12, maxWidth: 480 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {CARDS.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeUp}
              className={[
                'relative rounded-2xl flex flex-col p-6 transition-all duration-200',
                card.featured
                  ? 'border-2 border-[#3626A7] bg-[#fafafe] hover:shadow-sm'
                  : 'border border-[#e5e7eb] bg-white hover:border-[#3626A7] hover:shadow-sm',
              ].join(' ')}
            >
              {card.featured && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full font-sans font-bold uppercase tracking-wide"
                  style={{
                    top: -12,
                    fontSize: 10,
                    padding: '4px 14px',
                    background: 'linear-gradient(90deg, #3626A7, #DF57BC, #DE541E)',
                    color: 'white',
                  }}
                >
                  {t('professionnel_badge')}
                </span>
              )}

              <span
                className="self-start inline-block rounded-full font-sans font-bold uppercase tracking-widest"
                style={{ fontSize: 10, padding: '4px 12px', backgroundColor: '#FBF9FF', color: '#3626A7' }}
              >
                {t(card.tagKey)}
              </span>

              <p
                className="font-heading font-extrabold whitespace-nowrap"
                style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#0a0a0f', marginTop: 16 }}
              >
                {t(card.priceKey)}
              </p>
              <p className="font-sans" style={{ fontSize: 13, color: 'rgba(0,8,7,0.4)', marginTop: 2 }}>
                {t(card.priceAltKey)}
              </p>

              <ul className="flex flex-col" style={{ gap: 10, marginTop: 20, marginBottom: 24, flex: 1 }}>
                {card.featuresKey.map((featureKey) => (
                  <li key={featureKey} className="flex items-start" style={{ gap: 8 }}>
                    <span style={{ marginTop: 2, flexShrink: 0 }}>
                      <CheckIcon color="#3626A7" />
                    </span>
                    <span className="font-sans" style={{ fontSize: 13, color: 'rgba(0,8,7,0.6)', lineHeight: 1.5 }}>
                      {t(featureKey)}
                    </span>
                  </li>
                ))}
              </ul>

              {card.featured ? (
                <Button variant="primary" href="/pricing" size="md" className="w-full">
                  {t(card.ctaKey)}
                </Button>
              ) : (
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full font-sans font-semibold text-sm w-full transition-colors duration-200 hover:border-[#3626A7] hover:text-[#3626A7]"
                  style={{ border: '1px solid rgba(0,8,7,0.15)', color: '#000807', padding: '11px 0' }}
                >
                  {t(card.ctaKey)}
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
          style={{ marginTop: 40 }}
        >
          <Link
            href="/pricing"
            className="group inline-flex items-center font-sans font-semibold transition-opacity duration-200 hover:opacity-70"
            style={{ color: '#3626A7', fontSize: 15, gap: 6 }}
          >
            <span>{t('cta_full')}</span>
            <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
