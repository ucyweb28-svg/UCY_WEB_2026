'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { EASE_REVEAL } from '@/lib/utils/animations';
import { GlowButton } from '@/components/ui/GlowButton';

export function StaysHero() {
  const t = useTranslations('stays');

  return (
    <section
      className="min-h-screen flex flex-col pt-32 md:pt-24 section-b"
      style={{ backgroundColor: '#FBF9FF' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_REVEAL }}
          className="flex flex-col items-center text-center gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          <span
            className="font-sans font-bold uppercase"
            style={{ fontSize: 13, letterSpacing: '0.15em', color: 'rgba(0,8,7,0.35)' }}
          >
            {t('hero_eyebrow')}
          </span>

          <h1
            className="font-heading font-extrabold tracking-tight leading-[1.05] text-balance"
            style={{ color: '#000807', fontSize: 'clamp(36px, 5.5vw, 68px)' }}
          >
            {t('hero_title_start')}
            <span className="bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent animate-gradient">
              {t('hero_title_highlight')}
            </span>
          </h1>

          <p
            className="font-sans text-base md:text-lg leading-relaxed max-w-2xl text-pretty"
            style={{ color: 'rgba(0,8,7,0.65)' }}
          >
            {t('hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2" style={{ overflow: 'visible' }}>
            <GlowButton href="#partner" variant="gradient">
              {t('hero_cta_primary')}
            </GlowButton>
            <a
              href="#collection"
              className="group relative inline-flex items-center font-heading font-semibold text-base px-2 py-[14px]"
              style={{ color: '#000807' }}
            >
              {t('hero_cta_secondary')}
              <span className="absolute left-2 right-2 -bottom-0.5 h-[1.5px] bg-current scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_REVEAL, delay: 0.12 }}
          className="mt-12 md:mt-16 relative w-full h-[280px] sm:h-[380px] md:h-[500px] rounded-3xl overflow-hidden"
        >
          <Image
            src="/images/stays/hero-bg.jpg"
            alt="UCY Stays — Résidences courte durée à Jérusalem et Netanya"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,8,7,0.45) 0%, transparent 55%)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
