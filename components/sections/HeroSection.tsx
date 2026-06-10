'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';

const VIDEOS = [
  '/videos/hero-video-1.mp4',
  '/videos/hero-video-2.mp4',
  '/videos/hero-video-3.mp4',
];

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VideoCarousel() {
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((v) => (v + 1) % VIDEOS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setActiveVideo((v) => (v - 1 + VIDEOS.length) % VIDEOS.length);
  const next = () => setActiveVideo((v) => (v + 1) % VIDEOS.length);

  return (
    <div className="relative w-full h-full" style={{ backgroundColor: '#000807' }}>
      {/* Crossfade videos */}
      <AnimatePresence mode="sync">
        <motion.video
          key={activeVideo}
          src={VIDEOS[activeVideo]}
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#000807]/70 to-transparent md:bg-gradient-to-r md:from-[#3626A7]/55 md:via-[#DF57BC]/35 md:to-transparent" />

      {/* Arrow — previous */}
      <button
        onClick={prev}
        aria-label="Vidéo précédente"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/20 hover:bg-white/40 transition-colors duration-200 cursor-pointer z-10"
      >
        <ChevronLeft />
      </button>

      {/* Arrow — next */}
      <button
        onClick={next}
        aria-label="Vidéo suivante"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/20 hover:bg-white/40 transition-colors duration-200 cursor-pointer z-10"
      >
        <ChevronRight />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveVideo(i)}
            aria-label={`Vidéo ${i + 1}`}
            className={`h-1.5 rounded-full cursor-pointer transition-all ${
              i === activeVideo ? 'w-4 bg-white' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations('hero');
  const [marginTop, setMarginTop] = useState(104);

  useEffect(() => {
    const onBannerClosed = () => setMarginTop(64);
    window.addEventListener('banner-closed', onBannerClosed);
    return () => window.removeEventListener('banner-closed', onBannerClosed);
  }, []);

  const whatsappHref = formatWhatsAppLink(
    'fr',
    'Bonjour%20UCY%20Studio%2C%20je%20voudrais%20d%C3%A9marrer%20un%20projet'
  );

  return (
    <section
      className="min-h-screen flex flex-col pt-32 md:pt-20 pb-6 md:pb-8"
      style={{ backgroundColor: '#FBF9FF', marginTop: `${marginTop}px` }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col flex-1">

        {/* ── Centered headline + subtitle + CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          <h1
            className="font-heading font-extrabold text-[1.75rem] md:text-6xl tracking-tight leading-[1.05] whitespace-nowrap"
            style={{ color: '#000807' }}
          >
            {t('headline_start')}
            <span className="bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent animate-gradient">
              {t('headline_highlight')}
            </span>
          </h1>

          <p
            className="font-sans text-base md:text-lg leading-relaxed max-w-4xl"
            style={{ color: 'rgba(0,8,7,0.65)' }}
          >
            {t('subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            {/* Primary CTA — dark with gradient glow */}
            <motion.div
              className="relative inline-block rounded-full"
              initial={{ boxShadow: '0px 0px 0px 0px rgba(54, 38, 167, 0)' }}
              whileHover={{ boxShadow: '-4px 4px 20px rgba(54, 38, 167, 0.5)' }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center rounded-full bg-[#000807] text-white font-heading font-semibold text-base px-8 py-[14px] transition-transform duration-200 active:scale-[0.98] before:absolute before:-bottom-1 before:-left-1 before:w-full before:h-full before:rounded-full before:bg-gradient-to-tr before:from-[#3626A7] before:via-[#DF57BC] before:to-[#DE541E] before:blur-md before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:-z-10"
              >
                {t('cta_primary')}
              </Link>
            </motion.div>

            {/* Secondary CTA — minimalist underline link */}
            <a
              href="#services"
              className="group relative inline-flex items-center font-heading font-semibold text-base px-2 py-[14px]"
              style={{ color: '#000807' }}
            >
              {t('cta_secondary')}
              <span className="absolute left-2 right-2 -bottom-0.5 h-[1.5px] bg-current scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          </div>
        </motion.div>

        {/* ── Two-column scroll-hook containers ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mt-auto pt-12 md:pt-16"
        >
          <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden lg:col-span-7">
            <Image
              src="/images/hero-woman.jpg"
              alt={`${t('headline_start')}${t('headline_highlight')}`}
              fill
              className="object-cover object-center w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden lg:col-span-5">
            <VideoCarousel />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
