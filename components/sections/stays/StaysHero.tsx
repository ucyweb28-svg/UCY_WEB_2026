'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { EASE_REVEAL } from '@/lib/utils/animations';
import { GlowButton } from '@/components/ui/GlowButton';

export function StaysHero() {
  const t = useTranslations('stays');

  return (
    <section className="relative min-h-screen flex flex-col justify-center" style={{ backgroundColor: '#000807' }}>

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

      {/* Brand-tinted colour wash */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(135deg, rgba(222,84,30,0.12), rgba(223,87,188,0.10), rgba(54,38,167,0.15))',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Dark gradient — legibility veil on bottom 45% */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(0,8,7,0.80) 100%)',
        }}
      />

      {/* Content — vertically centred, left-aligned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_REVEAL }}
        className="relative w-full"
        style={{ zIndex: 3 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-start text-left gap-5 md:gap-6 max-w-xl">

            {/* Eyebrow pill */}
            <span
              className="font-montserrat font-bold uppercase tracking-widest inline-flex items-center backdrop-blur-sm"
              style={{
                fontSize: 12,
                color: '#FBF9FF',
                background: 'rgba(0,8,7,0.30)',
                borderRadius: 9999,
                padding: '4px 12px',
                letterSpacing: '0.14em',
              }}
            >
              {t('hero_eyebrow')}
            </span>

            <h1
              className="font-trap font-extrabold tracking-tight leading-[1.05] text-pretty"
              style={{ color: '#FBF9FF', fontSize: 'clamp(36px, 5.5vw, 68px)' }}
            >
              {t('hero_title_start')}{t('hero_title_highlight')}
            </h1>

            <p
              className="font-montserrat text-base md:text-lg leading-relaxed text-pretty"
              style={{ color: 'rgba(251,249,255,0.82)' }}
            >
              {t.rich('hero_subtitle', {
                b: (chunks) => (
                  <strong style={{ color: '#FBF9FF', fontWeight: 600 }}>
                    {chunks}
                  </strong>
                ),
              })}
            </p>

            <div className="pt-2">
              <GlowButton href="#partner" variant="white" className="font-montserrat">
                {t('hero_cta_primary')}
              </GlowButton>
            </div>

          </div>
        </div>
      </motion.div>

    </section>
  );
}
