'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { EASE_REVEAL } from '@/lib/utils/animations';

export function StaysHero() {
  const t = useTranslations('stays');

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
          alt="Jérusalem, vue depuis la terrasse Holyland — UCY Stays"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Brand-tinted colour wash — blends with the warm photo tones */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(135deg, rgba(222,84,30,0.12), rgba(223,87,188,0.10), rgba(54,38,167,0.15))',
          mixBlendMode: 'overlay',
          /* swap to 'multiply' if overlay looks too flat against the warm tones */
        }}
      />

      {/* Dark gradient — legibility veil on bottom 45% */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(0,8,7,0.75) 100%)',
        }}
      />

      {/* Content — bottom third */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_REVEAL }}
        className="relative mt-auto w-full"
        style={{ zIndex: 3, paddingBottom: 80 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-5 md:gap-6 max-w-3xl mx-auto">

            <span
              className="font-sans font-bold uppercase"
              style={{ fontSize: 13, letterSpacing: '0.15em', color: '#DF57BC' }}
            >
              {t('hero_eyebrow')}
            </span>

            <h1
              className="font-heading font-extrabold tracking-tight leading-[1.05] text-balance"
              style={{ color: '#FBF9FF', fontSize: 'clamp(36px, 5.5vw, 68px)' }}
            >
              {t('hero_title_start')}
              <span className="bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent animate-gradient">
                {t('hero_title_highlight')}
              </span>
            </h1>

            <p
              className="font-sans text-base md:text-lg leading-relaxed max-w-2xl text-pretty"
              style={{ color: 'rgba(251,249,255,0.85)' }}
            >
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              {/* Primary — solid white */}
              <a
                href="#partner"
                className="font-sans font-bold whitespace-nowrap transition-opacity duration-200 hover:opacity-90"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FBF9FF',
                  color: '#000807',
                  padding: '14px 32px',
                  borderRadius: 100,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                {t('hero_cta_primary')}
              </a>

              {/* Secondary — ghost white */}
              <a
                href="#collection"
                className="font-sans font-semibold whitespace-nowrap transition-colors duration-200 hover:bg-white/10"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'transparent',
                  color: '#FBF9FF',
                  border: '1.5px solid rgba(251,249,255,0.65)',
                  padding: '14px 32px',
                  borderRadius: 100,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                {t('hero_cta_secondary')}
              </a>
            </div>

          </div>
        </div>
      </motion.div>

    </section>
  );
}
