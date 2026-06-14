'use client';

import type { ComponentType, CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { stagger, fadeUp } from '@/lib/utils/animations';

interface IconProps {
  size?: number;
  color: string;
}

function SearchIcon({ size = 16, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </svg>
  );
}

function PencilIcon({ size = 16, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

function CodeIcon({ size = 16, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
}

function RocketIcon({ size = 16, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
      <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
      <path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  );
}

interface ProcessStep {
  labelKey: string;
  titleKey: string;
  descKey: string;
  durationKey: string;
  Icon: ComponentType<IconProps>;
}

const STEPS: ProcessStep[] = [
  {
    labelKey: 'step1_label',
    titleKey: 'step1_title',
    descKey: 'step1_desc',
    durationKey: 'step1_duration',
    Icon: SearchIcon,
  },
  {
    labelKey: 'step2_label',
    titleKey: 'step2_title',
    descKey: 'step2_desc',
    durationKey: 'step2_duration',
    Icon: PencilIcon,
  },
  {
    labelKey: 'step3_label',
    titleKey: 'step3_title',
    descKey: 'step3_desc',
    durationKey: 'step3_duration',
    Icon: CodeIcon,
  },
  {
    labelKey: 'step4_label',
    titleKey: 'step4_title',
    descKey: 'step4_desc',
    durationKey: 'step4_duration',
    Icon: RocketIcon,
  },
];

const ICON_CIRCLE_BG = 'linear-gradient(135deg, rgba(54,38,167,0.15), rgba(223,87,188,0.15))';

function ChevronArrow({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M4 2 L10 8 L4 14" stroke="url(#process-arrow-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProcessSection() {
  const t = useTranslations('process');

  return (
    <section className="section" style={{ backgroundColor: '#FBF9FF', position: 'relative', overflow: 'visible', zIndex: 0 }}>
      {/* Glow violet en arrière-plan */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '80%',
          background: 'radial-gradient(ellipse at center, rgba(54,38,167,0.18) 0%, rgba(223,87,188,0.08) 50%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Shared gradient defs for icons & connectors */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id="process-icon-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3626A7" />
              <stop offset="1" stopColor="#DF57BC" />
            </linearGradient>
            <linearGradient id="process-arrow-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#DF57BC" />
              <stop offset="1" stopColor="#3626A7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Wrapper */}
        <div
          className="mx-auto max-w-6xl px-10 py-12 md:px-14 md:py-14"
          style={{
            background: 'rgba(10, 10, 15, 0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 28,
          }}
        >

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center mb-10"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
              style={{ borderColor: 'rgba(223,87,188,.3)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#DF57BC' }} />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#DF57BC' }}>
                {t('badge')}
              </span>
            </div>

            <h2
              className="font-heading font-extrabold leading-tight"
              style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginTop: 16 }}
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
            </h2>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {STEPS.map((step, index) => (
              <motion.div
                key={step.titleKey}
                variants={fadeUp}
                whileHover={{
                  borderColor: 'rgba(223,87,188,0.3)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="relative flex flex-col justify-between"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: 28,
                  overflow: 'hidden',
                }}
              >
                <span
                  className="absolute font-heading font-extrabold pointer-events-none select-none"
                  style={{ top: 8, right: 12, fontSize: 48, lineHeight: 1, color: '#ffffff', opacity: 0.06 }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <p className="font-sans uppercase tracking-widest" style={{ fontSize: 10, color: '#aaa' }}>
                    {t(step.labelKey)}
                  </p>

                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 40, height: 40, background: ICON_CIRCLE_BG, marginTop: 16 }}
                  >
                    <step.Icon size={20} color="url(#process-icon-gradient)" />
                  </div>

                  <h3 className="font-heading font-bold" style={{ fontSize: 15, color: '#ffffff', marginTop: 12 }}>
                    {t(step.titleKey)}
                  </h3>

                  <p className="font-sans" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 8, lineHeight: 1.7 }}>
                    {t(step.descKey)}
                  </p>
                </div>

                <span
                  className="font-sans font-bold inline-flex self-start"
                  style={{
                    fontSize: 11,
                    color: '#DF57BC',
                    backgroundColor: 'rgba(54,38,167,0.2)',
                    borderRadius: 100,
                    padding: '4px 12px',
                    marginTop: 16,
                  }}
                >
                  {t(step.durationKey)}
                </span>
              </motion.div>
            ))}

            {/* Connectors (desktop only) */}
            {[0, 1, 2].map((i) => (
              <ChevronArrow
                key={i}
                className="hidden lg:block absolute pointer-events-none"
                style={{ top: '50%', left: `${(i + 1) * 25}%`, transform: 'translate(-50%, -50%)' }}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
