'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface Testimonial {
  client: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
  image: string;
  tags: string[];
}

const TESTIMONIALS: Testimonial[] = [
  {
    client: 'Bloomair',
    logo: 'BLOOMAIR',
    quote:
      "UCY Studio a transformé notre présence digitale. Le site qu'ils ont livré dépasse tout ce qu'on espérait — en délai, en qualité, en impact.",
    author: 'Sarah M.',
    role: 'Fondatrice, Bloomair',
    image: '/images/testimonial-bloomair.jpg',
    tags: ['E-commerce', 'Branding'],
  },
  {
    client: 'TopNos',
    logo: 'TopNos',
    quote:
      'Une équipe qui comprend vraiment les enjeux de marque. Notre identité visuelle est maintenant cohérente sur tous nos supports.',
    author: 'David L.',
    role: 'Directeur Marketing, TopNos',
    image: '/images/testimonial-topnos.jpg',
    tags: ['Identité Visuelle', 'Print'],
  },
  {
    client: 'Nexus Capital',
    logo: 'NEXUS',
    quote:
      "Le dashboard qu'UCY a conçu pour nous a changé la façon dont nos équipes travaillent. UX irréprochable, livré en 3 semaines.",
    author: 'Marc R.',
    role: 'CTO, Nexus Capital',
    image: '/images/testimonial-nexus.jpg',
    tags: ['Fintech', 'Dashboard'],
  },
  {
    client: 'Aurora Media',
    logo: 'Aurora',
    quote:
      'Notre design system est maintenant la référence interne pour toutes nos équipes produit. Travail remarquable.',
    author: 'Léa K.',
    role: 'Head of Product, Aurora Media',
    image: '/images/testimonial-aurora.jpg',
    tags: ['Design System', 'UI'],
  },
];

const AUTO_ADVANCE_MS = 6000;

const cardVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

const imageVariants: Variants = {
  initial: { opacity: 0, scale: 1.02 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_MS);
  }, []);

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

  const goPrev = () => goTo((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => goTo((activeIndex + 1) % TESTIMONIALS.length);

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="py-16 md:py-32" style={{ backgroundColor: '#0a0a0f' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
        style={{ minHeight: 560 }}
      >
        {/* Top row */}
        <div className="flex items-end justify-between gap-6 flex-wrap" style={{ marginBottom: 32 }}>
          <h2
            className="font-heading font-extrabold leading-tight"
            style={{ color: 'white', fontSize: 'clamp(1.5rem, 8vw, 3rem)' }}
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
              className="flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 hover:bg-white/[0.08]"
              style={{ width: 44, height: 44, border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
            >
              ←
            </button>
            <button
              onClick={goNext}
              aria-label={t('next_aria')}
              className="flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 hover:bg-white/[0.08]"
              style={{ width: 44, height: 44, border: '1px solid rgba(255,255,255,0.15)', color: 'white' }}
            >
              →
            </button>
          </div>
        </div>

        {/* Main card */}
        <div className="flex flex-col md:flex-row rounded-[20px] overflow-hidden">
          {/* Left column */}
          <div className="w-full md:w-[55%] p-6 md:p-12" style={{ backgroundColor: '#0f0f14' }}>
            <AnimatePresence mode="wait">
              <motion.div key={activeIndex} variants={cardVariants} initial="initial" animate="animate" exit="exit">
                <div
                  className="font-heading"
                  style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 32 }}
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
                    color: 'rgba(255,255,255,0.85)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    margin: '20px 0 32px',
                  }}
                >
                  <span style={{ color: '#DF57BC', fontSize: 60, lineHeight: 0, verticalAlign: '-20px' }}>
                    "
                  </span>
                  {active.quote}
                </p>

                <p className="font-sans" style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>
                  {active.author}
                </p>
                <p className="font-sans" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  {active.role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right column */}
          <div className="relative w-full md:w-[45%] min-h-[280px] md:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.client}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #0f0f14 0%, transparent 30%)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, #0f0f14 0%, transparent 40%)' }}
            />
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center" style={{ gap: 8, marginTop: 24 }}>
          {TESTIMONIALS.map((_, index) =>
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
                style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }}
              />
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
