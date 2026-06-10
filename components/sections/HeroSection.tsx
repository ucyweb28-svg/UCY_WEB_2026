'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';
import { gradientText } from '@/lib/utils/gradientText';

const VIDEOS = [
  '/videos/hero-video-1.mp4',
  '/videos/hero-video-2.mp4',
  '/videos/hero-video-3.mp4',
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
});

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
    <div
      className="relative w-full rounded-2xl overflow-hidden min-h-[440px] md:min-h-[520px]"
      style={{ backgroundColor: '#000807' }}
    >
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
  const [line1, line2] = t('headline').split('\n');
  const highlight = t('headline_highlight');
  const splitIdx = line1.indexOf(highlight);
  const before = splitIdx >= 0 ? line1.slice(0, splitIdx) : line1;
  const after  = splitIdx >= 0 ? line1.slice(splitIdx + highlight.length) : '';

  const whatsappHref = formatWhatsAppLink(
    'fr',
    'Bonjour%20UCY%20Studio%2C%20je%20voudrais%20d%C3%A9marrer%20un%20projet'
  );

  return (
    <section
      className="min-h-screen flex items-center pt-24 md:pt-32 pb-16 md:pb-24"
      style={{ backgroundColor: '#FBF9FF' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

          {/* ── Left: text ── */}
          <div className="relative z-[2] w-full md:flex-1 flex flex-col items-start gap-7 md:gap-8">

            <Badge>{t('badge')}</Badge>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-heading font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight"
            >
              <span className="block" style={{ color: '#000807' }}>
                {before}
                <span className={gradientText}>{highlight}</span>
                {after}
              </span>
              <span className="block" style={{ color: '#3626A7' }}>{line2}</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="font-sans text-base md:text-lg leading-relaxed max-w-[420px]"
              style={{ color: 'rgba(0,8,7,0.65)' }}
            >
              {t('subheadline')}
            </motion.p>

            <motion.div
              {...fadeUp(0.5)}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-1"
            >
              <Button variant="primary" href={whatsappHref} size="lg" external>
                {t('cta_primary')}
              </Button>
              <Button variant="secondary" href="#portfolio" size="lg">
                {t('cta_secondary')}
              </Button>
            </motion.div>
          </div>

          {/* ── Right: video carousel ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="w-full md:flex-1"
          >
            <VideoCarousel />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
