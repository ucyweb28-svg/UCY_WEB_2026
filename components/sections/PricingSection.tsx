'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { GradientGlow } from '@/components/ui/GradientGlow';
import { stagger, fadeUp } from '@/lib/utils/animations';

type Currency = 'ILS' | 'EUR';

interface Pack {
  id: string;
  nameKey: string;
  titleKey: string;
  taglineKey: string;
  minILS: number;
  maxILS: number;
  minEUR: number;
  maxEUR: number;
  featuresKey: string[];
  featured: boolean;
  deliveryDays: string;
}

interface Option {
  id: string;
  nameKey: string;
  fixedILS: number | null;
  fixedEUR: number | null;
  percentOfPack: number | null;
}

interface PriceRange {
  min: number;
  max: number;
}

const PACKS: Pack[] = [
  {
    id: 'essentiel',
    nameKey: 'pack_essentiel_name',
    titleKey: 'pack_essentiel_title',
    taglineKey: 'pack_essentiel_tagline',
    minILS: 3000,
    maxILS: 5000,
    minEUR: 750,
    maxEUR: 1250,
    featuresKey: [
      'pack_essentiel_feature1',
      'pack_essentiel_feature2',
      'pack_essentiel_feature3',
      'pack_essentiel_feature4',
      'pack_essentiel_feature5',
    ],
    featured: false,
    deliveryDays: 'pack_essentiel_delivery',
  },
  {
    id: 'professionnel',
    nameKey: 'pack_professionnel_name',
    titleKey: 'pack_professionnel_title',
    taglineKey: 'pack_professionnel_tagline',
    minILS: 5000,
    maxILS: 8000,
    minEUR: 1250,
    maxEUR: 2000,
    featuresKey: [
      'pack_professionnel_feature1',
      'pack_professionnel_feature2',
      'pack_professionnel_feature3',
      'pack_professionnel_feature4',
      'pack_professionnel_feature5',
    ],
    featured: true,
    deliveryDays: 'pack_professionnel_delivery',
  },
  {
    id: 'premium',
    nameKey: 'pack_premium_name',
    titleKey: 'pack_premium_title',
    taglineKey: 'pack_premium_tagline',
    minILS: 8000,
    maxILS: 12000,
    minEUR: 2000,
    maxEUR: 3000,
    featuresKey: [
      'pack_premium_feature1',
      'pack_premium_feature2',
      'pack_premium_feature3',
      'pack_premium_feature4',
      'pack_premium_feature5',
    ],
    featured: false,
    deliveryDays: 'pack_premium_delivery',
  },
];

const OPTIONS: Option[] = [
  { id: 'langue', nameKey: 'option_langue_name', fixedILS: null, fixedEUR: null, percentOfPack: 0.25 },
  { id: 'calendrier', nameKey: 'option_calendrier_name', fixedILS: 2000, fixedEUR: 500, percentOfPack: null },
  { id: 'crm', nameKey: 'option_crm_name', fixedILS: 3000, fixedEUR: 750, percentOfPack: null },
  { id: 'cms', nameKey: 'option_cms_name', fixedILS: 4000, fixedEUR: 1000, percentOfPack: null },
];

const MAINTENANCE_RATE = 0.2;

function formatNumber(value: number): string {
  return Math.round(value).toLocaleString('fr-FR');
}

function formatRange(range: PriceRange, currency: Currency): string {
  const symbol = currency === 'ILS' ? '₪' : '€';
  if (range.min === range.max) return `${formatNumber(range.min)} ${symbol}`;
  return `${formatNumber(range.min)} – ${formatNumber(range.max)} ${symbol}`;
}

function getPackPrice(pack: Pack, currency: Currency): PriceRange {
  return currency === 'ILS'
    ? { min: pack.minILS, max: pack.maxILS }
    : { min: pack.minEUR, max: pack.maxEUR };
}

function getOptionPrice(option: Option, pack: Pack | null, currency: Currency): PriceRange {
  if (option.percentOfPack !== null) {
    if (!pack) return { min: 0, max: 0 };
    const packPrice = getPackPrice(pack, currency);
    return {
      min: packPrice.min * option.percentOfPack,
      max: packPrice.max * option.percentOfPack,
    };
  }
  const fixed = currency === 'ILS' ? option.fixedILS : option.fixedEUR;
  return { min: fixed ?? 0, max: fixed ?? 0 };
}

function CheckIcon({ size = 14, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
}

export function PricingSection() {
  const t = useTranslations('pricing');
  const [currency, setCurrency] = useState<Currency>('ILS');
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedPackObj = PACKS.find((pack) => pack.id === selectedPack) ?? null;

  const packPrice = selectedPackObj ? getPackPrice(selectedPackObj, currency) : null;

  const optionsTotal = Array.from(selectedOptions).reduce<PriceRange>(
    (acc, id) => {
      const option = OPTIONS.find((o) => o.id === id);
      if (!option) return acc;
      const price = getOptionPrice(option, selectedPackObj, currency);
      return { min: acc.min + price.min, max: acc.max + price.max };
    },
    { min: 0, max: 0 }
  );

  const subtotal: PriceRange | null = packPrice
    ? { min: packPrice.min + optionsTotal.min, max: packPrice.max + optionsTotal.max }
    : null;

  const maintenance: PriceRange | null = subtotal
    ? { min: subtotal.min * MAINTENANCE_RATE, max: subtotal.max * MAINTENANCE_RATE }
    : null;

  const total = subtotal;

  return (
    <section className="py-24" style={{ backgroundColor: '#0a0a0f' }}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
          style={{ marginBottom: 40 }}
        >
          <Badge variant="dark">{t('badge')}</Badge>

          <h2
            className="font-heading font-extrabold leading-tight"
            style={{ color: 'white', fontSize: 'clamp(1.75rem, 4.5vw, 3rem)', marginTop: 16 }}
          >
            {t('headline_start')}
            <span
              style={{
                background: 'linear-gradient(90deg, #3626A7, #DF57BC, #DE541E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('headline_highlight')}
            </span>
          </h2>

          <p className="font-sans" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginTop: 12 }}>
            {t('subtitle')}
          </p>

          {/* Currency toggle */}
          <div className="flex items-center" style={{ gap: 8, marginTop: 24 }}>
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
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,.4)',
                    border: isActive ? '1px solid #3626A7' : '1px solid #2a2a3a',
                  }}
                >
                  {t(cur === 'ILS' ? 'currency_ils' : 'currency_eur')}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Packs grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {PACKS.map((pack) => {
            const isSelected = selectedPack === pack.id;
            const range = getPackPrice(pack, currency);
            return (
              <motion.div
                key={pack.id}
                variants={fadeUp}
                whileHover={{ scale: 1.01 }}
                animate={{
                  borderColor: isSelected ? '#DF57BC' : pack.featured ? '#3626A7' : '#1e1e2a',
                  boxShadow: isSelected ? '0 0 0 3px rgba(223,87,188,0.15)' : '0 0 0 0px rgba(223,87,188,0)',
                }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedPack(pack.id)}
                className="relative rounded-2xl cursor-pointer flex flex-col"
                style={{
                  backgroundColor: pack.featured ? '#0d0d1a' : '#0d0d14',
                  borderWidth: 1.5,
                  borderStyle: 'solid',
                  padding: 24,
                }}
              >
                {pack.featured && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full font-sans font-bold uppercase tracking-wide"
                    style={{
                      top: -10,
                      fontSize: 10,
                      padding: '4px 14px',
                      background: 'linear-gradient(90deg, #3626A7, #DF57BC, #DE541E)',
                      color: 'white',
                    }}
                  >
                    ✦ {t('recommended')}
                  </span>
                )}

                <p
                  className="font-sans uppercase font-semibold"
                  style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,.4)' }}
                >
                  {t(pack.nameKey)}
                </p>

                <h3 className="font-heading font-bold" style={{ fontSize: 18, color: 'white', marginTop: 6 }}>
                  {t(pack.titleKey)}
                </h3>

                <p className="font-sans" style={{ fontSize: 12, fontStyle: 'italic', color: 'rgba(255,255,255,.35)', marginTop: 6 }}>
                  {t(pack.taglineKey)}
                </p>

                <div style={{ marginTop: 20, marginBottom: 20 }}>
                  <p className="font-heading font-bold" style={{ fontSize: 28, color: 'white', lineHeight: 1.2 }}>
                    {formatRange(range, currency)}
                  </p>
                  <p className="font-sans" style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginTop: 4 }}>
                    {t('delivery_prefix')} {t(pack.deliveryDays)}
                  </p>
                </div>

                <ul className="flex flex-col" style={{ gap: 10, marginBottom: 24, flex: 1 }}>
                  {pack.featuresKey.map((featureKey) => (
                    <li key={featureKey} className="flex items-start" style={{ gap: 8 }}>
                      <span style={{ marginTop: 2, flexShrink: 0 }}>
                        <CheckIcon color="#DF57BC" />
                      </span>
                      <span className="font-sans" style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.5 }}>
                        {t(featureKey)}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setSelectedPack(pack.id)}
                  className="w-full rounded-full font-sans font-semibold transition-all duration-200 cursor-pointer"
                  style={
                    isSelected
                      ? {
                          background: 'linear-gradient(135deg, #3626A7 0%, #DF57BC 50%, #DE541E 100%)',
                          color: 'white',
                          padding: '10px 0',
                          fontSize: 13,
                          border: '1px solid transparent',
                        }
                      : {
                          background: 'transparent',
                          color: 'rgba(255,255,255,.7)',
                          padding: '10px 0',
                          fontSize: 13,
                          border: '1px solid rgba(255,255,255,.15)',
                        }
                  }
                >
                  {isSelected ? t('selected') : t('select')}
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Options à la carte */}
        <div
          className="rounded-2xl"
          style={{ backgroundColor: '#0d0d14', border: '1px solid #1e1e2a', padding: 24, marginTop: 16 }}
        >
          <h3 className="font-heading font-bold" style={{ fontSize: 16, color: 'white' }}>
            {t('options_title')}
          </h3>
          <p className="font-sans" style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginTop: 4, marginBottom: 20 }}>
            {t('options_subtitle')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
            {OPTIONS.map((option) => {
              const checked = selectedOptions.has(option.id);
              const price = getOptionPrice(option, selectedPackObj, currency);

              let priceLabel: string;
              if (option.percentOfPack !== null) {
                if (selectedPackObj) {
                  priceLabel = `+${formatRange(price, currency)} (${option.percentOfPack * 100}% ${t('of_pack')})`;
                } else {
                  priceLabel = `+${option.percentOfPack * 100}% ${t('of_pack')}`;
                }
              } else {
                priceLabel = `+${formatNumber(price.min)} ${currency === 'ILS' ? '₪' : '€'}`;
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleOption(option.id)}
                  className="flex items-center text-left rounded-xl transition-colors duration-200 cursor-pointer"
                  style={{ gap: 12, padding: 12, border: '1px solid rgba(255,255,255,.06)', backgroundColor: checked ? 'rgba(223,87,188,0.06)' : 'transparent' }}
                >
                  <span
                    className="flex items-center justify-center rounded-[5px] shrink-0"
                    style={{
                      width: 18,
                      height: 18,
                      backgroundColor: checked ? '#DF57BC' : 'transparent',
                      border: checked ? '1px solid #DF57BC' : '1px solid rgba(255,255,255,.2)',
                    }}
                  >
                    {checked && <CheckIcon size={12} color="white" />}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="font-sans block" style={{ fontSize: 13, color: 'white', fontWeight: 600 }}>
                      {t(option.nameKey)}
                    </span>
                    <span className="font-sans block" style={{ fontSize: 12, color: '#DF57BC', marginTop: 2 }}>
                      {priceLabel}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulator */}
        <div
          className="rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(54,38,167,.15) 0%, rgba(223,87,188,.08) 100%)',
            border: '1px solid rgba(255,255,255,.08)',
            padding: 24,
            marginTop: 16,
          }}
        >
          {!selectedPackObj || !packPrice || !subtotal || !maintenance || !total ? (
            <p className="text-center font-sans" style={{ fontSize: 14, color: 'rgba(255,255,255,.3)' }}>
              ← {t('simulator_empty')}
            </p>
          ) : (
            <div className="flex flex-col">
              <h3 className="font-heading font-bold" style={{ fontSize: 16, color: 'white', marginBottom: 16 }}>
                {t('simulator_title')}
              </h3>

              <div className="flex items-center justify-between font-sans" style={{ fontSize: 14, color: 'white', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                <span>{t(selectedPackObj.titleKey)}</span>
                <span style={{ fontWeight: 600 }}>{formatRange(packPrice, currency)}</span>
              </div>

              {Array.from(selectedOptions).map((id) => {
                const option = OPTIONS.find((o) => o.id === id);
                if (!option) return null;
                const price = getOptionPrice(option, selectedPackObj, currency);
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between font-sans"
                    style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}
                  >
                    <span>{t(option.nameKey)}</span>
                    <span>+{formatRange(price, currency)}</span>
                  </div>
                );
              })}

              <div
                className="flex items-center justify-between font-sans"
                style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}
              >
                <span>{t('maintenance_label')}</span>
                <span>{formatRange(maintenance, currency)}{t('maintenance_suffix')}</span>
              </div>

              <div className="flex items-center justify-between" style={{ padding: '16px 0' }}>
                <span className="font-heading font-bold" style={{ fontSize: 15, color: 'white' }}>
                  {t('total_label')}
                </span>
                <span className="font-heading font-extrabold" style={{ fontSize: 24, color: 'white' }}>
                  {formatRange(total, currency)}
                </span>
              </div>

              <div className="flex justify-center" style={{ marginTop: 8 }}>
                <GradientGlow className="w-full sm:w-auto">
                  <a
                    href={`/contact?pack=${selectedPackObj.id}&total=${Math.round(total.min)}-${Math.round(total.max)}`}
                    className="flex items-center justify-center rounded-full font-heading font-semibold w-full sm:w-auto"
                    style={{
                      background: 'linear-gradient(135deg, #3626A7 0%, #DF57BC 50%, #DE541E 100%)',
                      color: 'white',
                      fontSize: 14,
                      padding: '14px 32px',
                    }}
                  >
                    {t('cta')}
                  </a>
                </GradientGlow>
              </div>

              <p className="text-center font-sans" style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginTop: 16 }}>
                {t('micro_text')}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
