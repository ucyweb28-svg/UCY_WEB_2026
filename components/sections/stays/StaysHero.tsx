'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDown } from '@phosphor-icons/react';
import { EASE_REVEAL } from '@/lib/utils/animations';
import { ArrowDiag } from '@/components/ui/ArrowDiag';

export function StaysHero() {
  const t = useTranslations('stays');

  const stats = [
    { value: t('hero_stats_residences_value'), label: t('hero_stats_residences_label') },
    { value: t('hero_stats_rating_value'),      label: t('hero_stats_rating_label') },
    { value: t('hero_stats_management_value'),  label: t('hero_stats_management_label') },
  ];

  return (
    <section className="relative min-h-screen flex flex-col" style={{ backgroundColor: '#000807' }}>

      {/* Background image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, ease: EASE_REVEAL, delay: 0.12 }}
        className="absolute inset-0"
      >
        <Image
          src="/images/stays/hero-bg.png"
          alt="Façade rénovée en pierre de Jérusalem, Jaffa Road, golden hour"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Brand-tinted colour wash */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(135deg, rgba(222,84,30,0.12), rgba(223,87,188,0.10), rgba(54,38,167,0.15))',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Top scrim — 54% height, fades downward */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          zIndex: 2,
          height: '54%',
          background: 'linear-gradient(to bottom, rgba(10,8,7,0.76) 0%, rgba(10,8,7,0.50) 60%, transparent 100%)',
        }}
      />

      {/* Bottom scrim — 42% height, fades upward */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          zIndex: 2,
          height: '42%',
          background: 'linear-gradient(to top, rgba(10,8,7,0.74) 0%, rgba(10,8,7,0.42) 55%, transparent 100%)',
        }}
      />

      {/* Content layer */}
      <div className="relative flex-1 flex flex-col" style={{ zIndex: 3 }}>

        {/* Hero text block — top ~16% */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_REVEAL }}
          className="max-w-7xl mx-auto w-full"
          style={{ paddingTop: 'clamp(120px, 26vh, 240px)', paddingLeft: '5.5%', paddingRight: '5.5%' }}
        >
          <div
            className="flex flex-col items-start gap-5 w-full lg:max-w-[47%]"
            style={{ textShadow: '0 2px 18px rgba(10,8,7,.6)' }}
          >

            {/* Kicker pill */}
            <span
              className="font-montserrat font-bold uppercase tracking-widest inline-flex items-center gap-2 backdrop-blur-sm"
              style={{
                fontSize: 12,
                color: '#FBF9FF',
                background: 'rgba(0,8,7,0.30)',
                borderRadius: 9999,
                padding: '4px 12px',
                letterSpacing: '0.14em',
              }}
            >
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #DE541E, #DF57BC)',
                  flexShrink: 0,
                }}
              />
              {t('hero_kicker')}
            </span>

            {/* Title — two separate lines */}
            <h1
              className="font-trap font-extrabold"
              style={{
                color: '#FBF9FF',
                fontSize: 'clamp(28px, 3.1vw, 46px)',
                lineHeight: 1.16,
                letterSpacing: '-0.005em',
              }}
            >
              {t('hero_title_line1')}<br />
              {t('hero_title_line2')}
            </h1>

            {/* CTAs */}
            <div className="flex items-center gap-4 pt-1 flex-wrap">

              {/* Primary — white pill → "Devenir partenaire" */}
              <motion.div
                whileHover={{
                  y: -2,
                  boxShadow: '0 8px 32px rgba(223,87,188,.40), 0 2px 10px rgba(0,0,0,.22)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-block', borderRadius: 9999 }}
              >
                <Link
                  href="/stays#partner"
                  className="font-montserrat font-semibold"
                  style={{
                    display: 'inline-block',
                    background: '#ffffff',
                    color: '#000807',
                    padding: '12px 28px',
                    borderRadius: 9999,
                    fontSize: 15,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t('hero_cta_secondary')}
                </Link>
              </motion.div>

              {/* Ghost — "Découvrir les résidences →" */}
              <Link
                href="/stays#collection"
                className="font-montserrat font-semibold inline-flex items-center gap-1.5 hover:underline transition-all duration-200"
                style={{ color: '#FBF9FF', fontSize: 15, textDecoration: 'none' }}
              >
                {t('hero_cta_primary')} →
              </Link>

            </div>
          </div>
        </motion.div>

        {/* Stats bar — pinned to bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE_REVEAL, delay: 0.45 }}
          className="mt-auto max-w-7xl mx-auto w-full"
          style={{ paddingBottom: 40, paddingLeft: '5.5%', paddingRight: '5.5%' }}
        >
          <div
            className="flex items-end justify-between"
            style={{ textShadow: '0 2px 18px rgba(10,8,7,.6)' }}
          >
            {/* Three stat blocks — gap 36px */}
            <div className="flex items-start flex-wrap" style={{ gap: 36 }}>
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col" style={{ gap: 3 }}>
                  <span
                    className="font-trap font-bold"
                    style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', color: '#FBF9FF', lineHeight: 1 }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-montserrat"
                    style={{ fontSize: 12, color: 'rgba(251,249,255,0.80)', lineHeight: 1.35 }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* En savoir plus — scroll to #cities */}
            <button
              type="button"
              onClick={() => document.getElementById('cities')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-montserrat inline-flex flex-col items-center gap-1 transition-opacity duration-200 hover:opacity-70 shrink-0 backdrop-blur-sm"
              style={{
                fontSize: 11,
                color: '#FBF9FF',
                border: 'none',
                background: 'rgba(10,8,7,0.40)',
                backdropFilter: 'blur(6px)',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                padding: '8px 16px',
                borderRadius: 9999,
              }}
            >
              {t('hero_stats_cta')}
              <ArrowDown size={16} weight="light" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
