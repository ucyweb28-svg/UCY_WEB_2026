'use client';

import { useRef, useState } from 'react';
import type { UIEvent } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { stagger, fadeUp } from '@/lib/utils/animations';

const SERVICES = [
  { image: '/images/icon-engineering.jpg', titleKey: 'web_title',      descKey: 'web_desc' },
  { image: '/images/icon-design.jpg',      titleKey: 'ui_title',       descKey: 'ui_desc' },
  { image: '/images/icon-print.jpg',       titleKey: 'branding_title', descKey: 'branding_desc' },
  { image: '/images/icon-social.jpg',      titleKey: 'strategy_title', descKey: 'strategy_desc' },
] as const;

const SCROLL_AMOUNT = 340;

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ServicesSection() {
  const t = useTranslations('services');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };

  return (
    <section id="services" className="py-16 md:py-32" style={{ backgroundColor: '#FBF9FF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
        >
          <motion.div variants={fadeUp} className="flex flex-col items-start gap-4">
            <Badge>{t('label')}</Badge>
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl leading-tight" style={{ color: '#000807' }}>
              {t('headline')}
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label={t('prev')}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-white/60"
              style={{ backgroundColor: '#000807' }}
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label={t('next')}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-white/60"
              style={{ backgroundColor: '#000807' }}
            >
              <ArrowRightIcon />
            </button>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <ScrollReveal>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {SERVICES.map(({ image, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="group flex-shrink-0 snap-start w-[280px] md:w-[320px] h-[380px] rounded-xl overflow-hidden flex flex-col"
                style={{ backgroundColor: '#000807' }}
              >
                <div className="relative w-full h-[180px] overflow-hidden rounded-t-xl">
                  <Image
                    src={image}
                    alt={t(titleKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 280px, 320px"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="font-sans font-semibold text-lg" style={{ color: 'white' }}>
                    {t(titleKey)}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {t(descKey)}
                  </p>
                  <a
                    href="#contact"
                    className="font-sans text-sm font-semibold mt-auto inline-flex items-center gap-1"
                    style={{ color: '#3626A7' }}
                  >
                    {t('cta')} →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-[2px] w-full rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,8,7,0.1)' }}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] animate-gradient transition-[width] duration-150 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
