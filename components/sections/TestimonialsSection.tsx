'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ArrowDiag } from '@/components/ui/ArrowDiag';

interface TestimonialItem {
  client: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
  tags: string[];
  avatar: string;
}

const TESTIMONIAL_IMAGES = [
  '/images/testimonial-bloomair.jpg',
  '/images/testimonial-topnos.jpg',
  '/images/testimonial-nexus.jpg',
  '/images/testimonial-aurora.jpg',
] as const;

const AUTO_ADVANCE_MS = 6000;

const cardVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.0, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as TestimonialItem[];
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % items.length);
    }, AUTO_ADVANCE_MS);
  }, [items.length]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    startInterval();
  };

  const goPrev = () => goTo((activeIndex - 1 + items.length) % items.length);
  const goNext = () => goTo((activeIndex + 1) % items.length);

  const active = items[activeIndex];
  const activeImage = TESTIMONIAL_IMAGES[activeIndex];

  return (
    <section
      className="section"
      style={{
        backgroundColor: '#FBF9FF',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.0, 1] }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
        style={{ minHeight: 560 }}
      >
        {/* Top row */}
        <div className="flex items-end justify-between gap-6 flex-wrap" style={{ marginBottom: 32 }}>
          <h2
            className="font-heading ds-h2 leading-tight"
            style={{ color: '#0a0a0a' }}
          >
            {t('heading_start')}
            <span
              style={{
                background: 'linear-gradient(90deg, #3626A7, #DF57BC, #DE541E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('heading_highlight')}
            </span>
          </h2>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={goPrev}
              aria-label={t('prev_aria')}
              className="flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 hover:bg-black/[0.05]"
              style={{ width: 44, height: 44, border: '1px solid rgba(0,0,0,0.12)', color: '#0a0a0a' }}
            >
              <ArrowDiag size={16} className="-rotate-[135deg]" />
            </button>
            <button
              onClick={goNext}
              aria-label={t('next_aria')}
              className="flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 hover:bg-black/[0.05]"
              style={{ width: 44, height: 44, border: '1px solid rgba(0,0,0,0.12)', color: '#0a0a0a' }}
            >
              <ArrowDiag size={16} className="rotate-45" />
            </button>
          </div>
        </div>

        {/* Main card */}
        <div
          className="flex flex-col md:flex-row rounded-[20px] overflow-hidden"
          style={{ border: '1px solid #e8e8e4', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col md:flex-row w-full"
            >
              {/* Left column */}
              <div className="relative w-full md:w-[55%] p-6 md:p-12 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
                {/* Decorative gradient quote mark */}
                <span
                  aria-hidden="true"
                  className="absolute font-heading pointer-events-none select-none"
                  style={{
                    top: -28,
                    left: 12,
                    fontSize: 'clamp(140px, 16vw, 220px)',
                    lineHeight: 1,
                    fontWeight: 800,
                    background: 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    opacity: 0.08,
                    zIndex: 0,
                  }}
                >
                  "
                </span>

                <div className="relative" style={{ zIndex: 1 }}>
                  <div
                    className="font-heading"
                    style={{ fontSize: 28, fontWeight: 800, color: '#0a0a0a', marginBottom: 32 }}
                  >
                    {active.logo}
                  </div>

                  <div className="flex flex-wrap" style={{ gap: 8 }}>
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans"
                        style={{
                          backgroundColor: 'rgba(223,87,188,0.1)',
                          color: '#DF57BC',
                          border: '1px solid rgba(223,87,188,0.2)',
                          fontSize: 11,
                          padding: '3px 10px',
                          borderRadius: 20,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p
                    className="font-sans"
                    style={{
                      fontSize: 20,
                      lineHeight: 1.6,
                      color: 'rgba(0,0,0,0.72)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      margin: '20px 0 32px',
                    }}
                  >
                    {active.quote}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '2px solid rgba(223,87,188,0.3)',
                        position: 'relative',
                      }}
                    >
                      <Image
                        src={active.avatar}
                        alt={active.author}
                        fill
                        quality={85}
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                      />
                    </div>

                    <div>
                      <p className="font-sans" style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a' }}>
                        {active.author}
                      </p>
                      <p className="font-sans" style={{ fontSize: 13, color: 'rgba(0,0,0,0.4)' }}>
                        {active.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="relative w-full md:w-[45%] min-h-[280px] md:min-h-[400px]">
                <Image
                  src={activeImage}
                  alt={active.client}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                  priority
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, #ffffff 0%, transparent 30%)' }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #ffffff 0%, transparent 40%)' }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center" style={{ gap: 8, marginTop: 24 }}>
          {items.map((_, index) =>
            index === activeIndex ? (
              <motion.button
                key={index}
                layoutId="testimonial-active-dot"
                onClick={() => goTo(index)}
                aria-label={t('go_to_aria', { number: index + 1 })}
                className="cursor-pointer"
                style={{
                  width: 24,
                  height: 6,
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #3626A7, #DF57BC)',
                }}
              />
            ) : (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={t('go_to_aria', { number: index + 1 })}
                className="cursor-pointer"
                style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.15)' }}
              />
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
