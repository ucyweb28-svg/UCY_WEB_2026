'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { stagger, fadeUp } from '@/lib/utils/animations';

type Currency = 'ILS' | 'EUR';

interface PreviewCard {
  id: string;
  tagKey: string;
  priceEurKey: string;
  priceIlsKey: string;
  featuresKey: string[];
  ctaKey: string;
  featured: boolean;
}

const CARDS: PreviewCard[] = [
  {
    id: 'essentiel',
    tagKey: 'essentiel_tag',
    priceEurKey: 'essentiel_price_eur',
    priceIlsKey: 'essentiel_price_ils',
    featuresKey: ['essentiel_feature1', 'essentiel_feature2', 'essentiel_feature3'],
    ctaKey: 'cta_details',
    featured: false,
  },
  {
    id: 'professionnel',
    tagKey: 'professionnel_tag',
    priceEurKey: 'professionnel_price_eur',
    priceIlsKey: 'professionnel_price_ils',
    featuresKey: ['professionnel_feature1', 'professionnel_feature2', 'professionnel_feature3'],
    ctaKey: 'cta_simulate',
    featured: true,
  },
  {
    id: 'premium',
    tagKey: 'premium_tag',
    priceEurKey: 'premium_price_eur',
    priceIlsKey: 'premium_price_ils',
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

function GlowCTA({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%', overflow: 'visible' }} className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          bottom: -8,
          left: -4,
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          background: 'linear-gradient(135deg, #3626A7 0%, #DF57BC 50%, #DE541E 100%)',
          filter: 'blur(12px)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.div>
    </div>
  );
}

export function PricingPreviewSection() {
  const t = useTranslations('pricing_preview');
  const [currency, setCurrency] = useState<Currency>('ILS');

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
            className="font-sans text-base whitespace-nowrap"
            style={{ color: 'rgba(0,8,7,0.5)', marginTop: 12 }}
          >
            {t('subtitle')}
          </motion.p>

          {/* Currency toggle */}
          <motion.div variants={fadeUp} className="flex items-center" style={{ gap: 8, marginTop: 20 }}>
            {(['ILS', 'EUR'] as const).map((cur) => {
              const isActive = currency === cur;
              return (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setCurrency(cur)}
                  className="font-sans font-semibold rounded-full transition-colors duration-200 cursor-pointer"
                  style={{
                    fontSize: 13,
                    padding: '8px 20px',
                    backgroundColor: isActive ? '#3626A7' : 'transparent',
                    color: isActive ? '#ffffff' : '#888888',
                    border: isActive ? '1px solid #3626A7' : '1px solid #e0e0e0',
                  }}
                >
                  {t(cur === 'ILS' ? 'currency_ils' : 'currency_eur')}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {CARDS.map((card) => {
            const priceKey = currency === 'ILS' ? card.priceIlsKey : card.priceEurKey;
            const altKey = currency === 'ILS' ? card.priceEurKey : card.priceIlsKey;

            return (
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
                  style={{ fontSize: 'clamp(16px, 2vw, 22px)', color: '#0a0a0f', marginTop: 16 }}
                >
                  {t('price_prefix')}{t(priceKey)}
                </p>
                <p className="font-sans whitespace-nowrap" style={{ fontSize: 13, color: 'rgba(0,8,7,0.4)', marginTop: 2 }}>
                  {t('price_alt_prefix')}{t(altKey)}
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

                <GlowCTA>
                  {card.featured ? (
                    <Link
                      href="/pricing"
                      className="flex items-center justify-center rounded-full font-heading font-semibold text-sm w-full"
                      style={{ backgroundColor: '#3626A7', color: 'white', padding: '11px 0' }}
                    >
                      {t(card.ctaKey)}
                    </Link>
                  ) : (
                    <Link
                      href="/pricing"
                      className="flex items-center justify-center rounded-full font-sans font-semibold text-sm w-full transition-colors duration-200 hover:border-[#3626A7] hover:text-[#3626A7]"
                      style={{ border: '1px solid rgba(0,8,7,0.15)', color: '#000807', padding: '11px 0', backgroundColor: '#ffffff' }}
                    >
                      {t(card.ctaKey)}
                    </Link>
                  )}
                </GlowCTA>
              </motion.div>
            );
          })}
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
          <GlowCTA>
            <Link
              href="/pricing"
              className="group inline-flex items-center justify-center font-sans font-semibold transition-opacity duration-200 hover:opacity-70"
              style={{ color: '#3626A7', fontSize: 15, gap: 6 }}
            >
              <span>{t('cta_full')}</span>
              <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </GlowCTA>
        </motion.div>

      </div>
    </section>
  );
}
