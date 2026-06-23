'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDiag } from '@/components/ui/ArrowDiag';
import { Badge } from '@/components/ui/Badge';
import { stagger, fadeUp, EASE_REVEAL } from '@/lib/utils/animations';
import {
  PRICING_PACKS,
  PRICING_OPTIONS,
  type Currency,
  formatPrice,
  getPackPrice,
  getOptionPrice,
} from '@/lib/utils/pricing';

function CheckIcon({ size = 14, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
}

export function PricingSection() {
  const t = useTranslations('pricing');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  const toggleOption = (id: string) => {
    if (!selectedPack) return;
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

  const selectedPackObj = PRICING_PACKS.find((pack) => pack.id === selectedPack) ?? null;

  const optionsTotal = Array.from(selectedOptions).reduce((sum, id) => {
    const option = PRICING_OPTIONS.find((o) => o.id === id);
    return option ? sum + getOptionPrice(option, currency) : sum;
  }, 0);

  const total = selectedPackObj ? getPackPrice(selectedPackObj, currency) + optionsTotal : null;

  const quoteHref = selectedPackObj
    ? `/devis?pack=${selectedPackObj.id}${selectedOptions.size ? `&options=${Array.from(selectedOptions).join(',')}` : ''}`
    : '/devis';

  return (
    <section className="pt-14 section-b" style={{ backgroundColor: '#FBF9FF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_REVEAL }}
          className="flex flex-col items-center text-center"
          style={{ marginBottom: 40 }}
        >
          <Badge>{t('badge')}</Badge>

          <h1
            className="font-heading"
            style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 900, color: '#0a0a0f', marginTop: 16, lineHeight: 1.2 }}
          >
            {t('headline_start')}
            <span
              style={{
                background: 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('headline_highlight')}
            </span>
          </h1>

          <p className="font-sans" style={{ color: 'rgba(10,10,15,0.5)', fontSize: 14, marginTop: 12 }}>
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
                    color: isActive ? '#ffffff' : 'rgba(10,10,15,.5)',
                    border: isActive ? '1px solid #3626A7' : '1px solid #e4e1d8',
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
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {PRICING_PACKS.map((pack) => {
            const isSelected = selectedPack === pack.id;
            const price = getPackPrice(pack, currency);
            return (
              <motion.div
                key={pack.id}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setSelectedPack(pack.id)}
                className="relative rounded-2xl cursor-pointer flex flex-col bg-white"
                style={{
                  borderRadius: 18,
                  padding: 28,
                  borderWidth: isSelected || pack.featured ? 2 : 1.5,
                  borderStyle: 'solid',
                  borderColor: isSelected ? '#DF57BC' : pack.featured ? '#3626A7' : '#e4e1d8',
                }}
              >
                {pack.featured && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full font-sans font-bold uppercase tracking-wide"
                    style={{
                      top: -12,
                      fontSize: 10,
                      padding: '4px 14px',
                      background: 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)',
                      color: 'white',
                    }}
                  >
                    {t('recommended')}
                  </span>
                )}

                <p
                  className="font-sans uppercase font-semibold"
                  style={{ fontSize: 11, letterSpacing: '0.15em', color: '#3626A7' }}
                >
                  {t(pack.tagKey)}
                </p>

                <h3 className="font-heading font-bold" style={{ fontSize: 20, color: '#0a0a0f', marginTop: 8 }}>
                  {t(pack.titleKey)}
                </h3>

                <p className="font-sans" style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(10,10,15,.5)', marginTop: 6, minHeight: 32 }}>
                  {t(pack.taglineKey)}
                </p>

                <div style={{ marginTop: 20, marginBottom: 16 }}>
                  <p className="font-heading" style={{ fontSize: 30, fontWeight: 900, color: '#0a0a0f', lineHeight: 1.2 }}>
                    {formatPrice(price, currency)}
                  </p>
                  <p className="font-sans" style={{ fontSize: 13, color: 'rgba(10,10,15,.5)', marginTop: 4 }}>
                    {t(pack.pagesKey)}
                  </p>
                  <p className="font-sans font-semibold" style={{ fontSize: 13, color: '#3626A7', marginTop: 2 }}>
                    {t('delivery_prefix')} {t(pack.deliveryKey)}
                  </p>
                </div>

                <ul className="flex flex-col" style={{ gap: 10, marginBottom: 24, flex: 1 }}>
                  {pack.featuresKey.map((featureKey) => (
                    <li key={featureKey} className="flex items-start" style={{ gap: 8 }}>
                      <span style={{ marginTop: 2, flexShrink: 0 }}>
                        <CheckIcon color="#DF57BC" />
                      </span>
                      <span className="font-sans" style={{ fontSize: 13, color: 'rgba(10,10,15,.7)', lineHeight: 1.5 }}>
                        {t(featureKey)}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPack(pack.id);
                  }}
                  className="w-full rounded-full font-sans font-semibold transition-all duration-200 cursor-pointer"
                  style={
                    isSelected
                      ? {
                          background: 'linear-gradient(135deg, #3626A7 0%, #DF57BC 100%)',
                          color: 'white',
                          padding: '10px 0',
                          fontSize: 13,
                          border: '1px solid transparent',
                        }
                      : {
                          background: 'transparent',
                          color: '#0a0a0f',
                          padding: '10px 0',
                          fontSize: 13,
                          border: '1px solid #e4e1d8',
                        }
                  }
                >
                  {isSelected ? t('selected') : t('select')}
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Options */}
        <div
          className="bg-white"
          style={{
            border: '1px solid #e4e1d8',
            borderRadius: 18,
            padding: 28,
            marginTop: 16,
            marginBottom: 24,
            opacity: selectedPack ? 1 : 0.55,
            transition: 'opacity 0.2s ease',
          }}
        >
          <h3 className="font-heading font-bold" style={{ fontSize: 18, color: '#0a0a0f' }}>
            {t('options_title')}
          </h3>
          <p className="font-sans" style={{ fontSize: 13, color: 'rgba(10,10,15,.5)', marginTop: 4, marginBottom: 20 }}>
            {selectedPack ? t('options_subtitle_selected') : t('options_subtitle_empty')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10 }}>
            {PRICING_OPTIONS.map((option) => {
              const checked = selectedOptions.has(option.id);
              const price = getOptionPrice(option, currency);
              const priceLabel = `${option.hasFromPrefix ? `${t('price_from_prefix')} ` : ''}${formatPrice(price, currency)}`;

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={!selectedPack}
                  onClick={() => toggleOption(option.id)}
                  className="flex flex-col text-left rounded-xl transition-colors duration-200"
                  style={{
                    padding: 14,
                    border: checked ? '1px solid #DF57BC' : '1px solid #e4e1d8',
                    backgroundColor: checked ? 'rgba(223,87,188,0.05)' : 'transparent',
                    cursor: selectedPack ? 'pointer' : 'not-allowed',
                  }}
                >
                  <div className="flex items-center" style={{ gap: 12 }}>
                    <span
                      className="flex items-center justify-center rounded-[5px] shrink-0"
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: checked ? '#DF57BC' : 'transparent',
                        border: checked ? '1px solid #DF57BC' : '1px solid #e4e1d8',
                      }}
                    >
                      {checked && <CheckIcon size={13} color="white" />}
                    </span>
                    <span className="font-sans font-bold flex-1" style={{ fontSize: 13, color: '#0a0a0f' }}>
                      {t(option.nameKey)}
                      {option.noteKey && <sup style={{ marginLeft: 2 }}>*</sup>}
                    </span>
                    <span className="font-sans font-semibold" style={{ fontSize: 13, color: '#DF57BC', whiteSpace: 'nowrap' }}>
                      {priceLabel}
                    </span>
                  </div>
                  <p className="font-sans" style={{ fontSize: 12, color: 'rgba(10,10,15,.5)', lineHeight: 1.5, marginTop: 6 }}>
                    {t(option.pitchKey)}
                  </p>
                </button>
              );
            })}
          </div>

          <p className="font-sans" style={{ fontSize: 10.5, color: 'rgba(10,10,15,.4)', marginTop: 14 }}>
            {t('option_photo_note')}
          </p>
        </div>

        {/* Live quote */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(54,38,167,.14) 0%, rgba(223,87,188,.10) 100%)',
            border: '1px solid rgba(223,87,188,.33)',
            borderRadius: 18,
            padding: 28,
          }}
        >
          {!selectedPackObj || total === null ? (
            <p className="text-center font-sans" style={{ fontSize: 14, color: 'rgba(10,10,15,.4)' }}>
              {t('quote_empty')}
            </p>
          ) : (
            <div className="flex flex-col">
              <p className="font-sans uppercase font-semibold" style={{ fontSize: 11, letterSpacing: '0.15em', color: '#3626A7', marginBottom: 16 }}>
                {t('quote_label')}
              </p>

              <div className="flex items-center justify-between font-sans" style={{ fontSize: 14, color: '#0a0a0f', padding: '10px 0', borderBottom: '1px solid rgba(10,10,15,.08)' }}>
                <span>{t(selectedPackObj.titleKey)}</span>
                <span style={{ fontWeight: 700 }}>{formatPrice(getPackPrice(selectedPackObj, currency), currency)}</span>
              </div>

              {Array.from(selectedOptions).map((id) => {
                const option = PRICING_OPTIONS.find((o) => o.id === id);
                if (!option) return null;
                const price = getOptionPrice(option, currency);
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between font-sans"
                    style={{ fontSize: 13, color: 'rgba(10,10,15,.6)', padding: '10px 0', borderBottom: '1px solid rgba(10,10,15,.08)' }}
                  >
                    <span>{t(option.nameKey)}</span>
                    <span>+{formatPrice(price, currency)}</span>
                  </div>
                );
              })}

              <div className="flex items-center justify-between" style={{ padding: '16px 0' }}>
                <span className="font-heading font-bold" style={{ fontSize: 15, color: '#0a0a0f' }}>
                  {t('quote_total')}
                </span>
                <span className="font-heading" style={{ fontSize: 26, fontWeight: 900, color: '#0a0a0f' }}>
                  {formatPrice(total, currency)}
                </span>
              </div>

              <Link
                href={quoteHref}
                scroll={true}
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
                {t('quote_cta')}
                <ArrowDiag size={12} className="inline ml-1" />
              </Link>

              <p className="text-center font-sans" style={{ fontSize: 12, color: 'rgba(10,10,15,.5)', marginTop: 16 }}>
                {t('quote_micro_prefix')}
                <Link href={quoteHref} scroll={true} className="underline" style={{ color: '#3626A7' }}>
                  {t('quote_micro_link')}
                  <ArrowDiag size={11} className="inline ml-1" />
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Pages note */}
        <p className="font-sans text-center" style={{ fontSize: 11, color: 'rgba(10,10,15,.4)', marginTop: 24 }}>
          {t('pages_note')}
        </p>

      </div>
    </section>
  );
}
