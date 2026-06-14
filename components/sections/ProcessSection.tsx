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
  iconColor: string;
}

const STEPS: ProcessStep[] = [
  {
    labelKey: 'step1_label',
    titleKey: 'step1_title',
    descKey: 'step1_desc',
    durationKey: 'step1_duration',
    Icon: SearchIcon,
    iconColor: '#7F77DD',
  },
  {
    labelKey: 'step2_label',
    titleKey: 'step2_title',
    descKey: 'step2_desc',
    durationKey: 'step2_duration',
    Icon: PencilIcon,
    iconColor: '#DF57BC',
  },
  {
    labelKey: 'step3_label',
    titleKey: 'step3_title',
    descKey: 'step3_desc',
    durationKey: 'step3_duration',
    Icon: CodeIcon,
    iconColor: '#c070e0',
  },
  {
    labelKey: 'step4_label',
    titleKey: 'step4_title',
    descKey: 'step4_desc',
    durationKey: 'step4_duration',
    Icon: RocketIcon,
    iconColor: '#DE541E',
  },
];

const TIMELINE_GRADIENT = 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)';
const TIMELINE_GRADIENT_VERTICAL = 'linear-gradient(180deg, #DE541E, #DF57BC, #3626A7)';
const DOT_GRADIENT = 'linear-gradient(135deg, #3626A7, #DF57BC)';

function ChevronConnector({ index, className, style }: { index: number; className?: string; style?: CSSProperties }) {
  const gradientId = `process-chevron-${index}`;

  return (
    <svg width="20" height="12" viewBox="0 0 20 12" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DF57BC" />
          <stop offset="100%" stopColor="#3626A7" />
        </linearGradient>
      </defs>
      <path d="M0 6 L16 6 M11 1 L16 6 L11 11" stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function ProcessSection() {
  const t = useTranslations('process');

  return (
    <section className="section" style={{ backgroundColor: '#0a0a0f' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
          style={{ marginBottom: 48 }}
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
                background: 'linear-gradient(90deg, #3626A7, #DF57BC, #DE541E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('headline_highlight')}
            </span>
          </h2>

          <p className="font-sans" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginTop: 12 }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0"
        >
          {/* Horizontal line (desktop) */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{ top: 7, left: '12.5%', right: '12.5%', height: 2, background: TIMELINE_GRADIENT }}
          />

          {/* Vertical line (mobile) */}
          <div
            className="md:hidden absolute pointer-events-none"
            style={{ top: 7, bottom: 7, left: 7, width: 2, background: TIMELINE_GRADIENT_VERTICAL }}
          />

          {STEPS.map((step, index) => {
            const accent = step.iconColor;

            return (
              <motion.div
                key={step.titleKey}
                variants={fadeUp}
                className="relative flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-0"
              >
                {/* Dot */}
                <div
                  className="relative z-10 shrink-0 w-[14px] h-[14px] rounded-full border-2 border-white mt-[1px] md:mt-0"
                  style={{ background: DOT_GRADIENT }}
                />

                {/* Chevron to next step (desktop) */}
                {index < STEPS.length - 1 && (
                  <ChevronConnector
                    index={index}
                    className="hidden md:block absolute z-10"
                    style={{ top: 1, right: 0, transform: 'translateX(50%)' }}
                  />
                )}

                {/* Content */}
                <div className="flex flex-col items-start md:items-center md:mt-6">
                  <p
                    className="font-sans uppercase tracking-widest"
                    style={{ fontSize: 10, color: '#aaa', marginBottom: 8 }}
                  >
                    {t(step.labelKey)}
                  </p>

                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 40, height: 40, backgroundColor: `${accent}1A` }}
                  >
                    <step.Icon size={20} color={accent} />
                  </div>

                  <h3
                    className="font-heading font-bold"
                    style={{ fontSize: 15, color: '#ffffff', marginTop: 12 }}
                  >
                    {t(step.titleKey)}
                  </h3>

                  <p
                    className="font-sans"
                    style={{ fontSize: 13, color: '#aaa', marginTop: 8, maxWidth: 200 }}
                  >
                    {t(step.descKey)}
                  </p>

                  <span
                    className="font-sans font-bold inline-block"
                    style={{
                      fontSize: 10,
                      color: accent,
                      backgroundColor: `${accent}20`,
                      borderRadius: 100,
                      padding: '3px 10px',
                      marginTop: 12,
                    }}
                  >
                    {t(step.durationKey)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom */}
        <p className="text-center font-sans" style={{ marginTop: 28, fontSize: 13, color: 'rgba(255,255,255,.35)' }}>
          {t('footer_start')}
          <span style={{ color: '#DF57BC', fontWeight: 700 }}>{t('footer_highlight')}</span>
          {t('footer_end')}
        </p>

      </div>
    </section>
  );
}
