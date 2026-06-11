'use client';

import { Fragment } from 'react';
import type { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
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
  iconBg: string;
  iconBorderColor: string;
}

const STEPS: ProcessStep[] = [
  {
    labelKey: 'step1_label',
    titleKey: 'step1_title',
    descKey: 'step1_desc',
    durationKey: 'step1_duration',
    Icon: SearchIcon,
    iconColor: '#7F77DD',
    iconBg: 'rgba(54,38,167,.15)',
    iconBorderColor: 'rgba(54,38,167,.25)',
  },
  {
    labelKey: 'step2_label',
    titleKey: 'step2_title',
    descKey: 'step2_desc',
    durationKey: 'step2_duration',
    Icon: PencilIcon,
    iconColor: '#DF57BC',
    iconBg: 'rgba(223,87,188,.1)',
    iconBorderColor: 'rgba(223,87,188,.2)',
  },
  {
    labelKey: 'step3_label',
    titleKey: 'step3_title',
    descKey: 'step3_desc',
    durationKey: 'step3_duration',
    Icon: CodeIcon,
    iconColor: '#c070e0',
    iconBg: 'rgba(140,60,190,.1)',
    iconBorderColor: 'rgba(140,60,190,.2)',
  },
  {
    labelKey: 'step4_label',
    titleKey: 'step4_title',
    descKey: 'step4_desc',
    durationKey: 'step4_duration',
    Icon: RocketIcon,
    iconColor: '#DE541E',
    iconBg: 'rgba(222,84,30,.1)',
    iconBorderColor: 'rgba(222,84,30,.2)',
  },
];

const arrowLineVariants: Variants = {
  hidden: { width: 0 },
  visible: { width: 20, transition: { duration: 0.4, ease: 'easeOut' } },
};

function ArrowConnector() {
  return (
    <div className="hidden lg:flex items-center justify-center" style={{ width: 40, flexShrink: 0 }}>
      <motion.div
        variants={arrowLineVariants}
        style={{ height: 1, background: 'linear-gradient(90deg, #3626A7, #DF57BC)' }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: '5px solid #DF57BC',
          marginLeft: -1,
        }}
      />
    </div>
  );
}

export function ProcessSection() {
  const t = useTranslations('process');

  return (
    <section className="py-20" style={{ backgroundColor: '#0a0a0f' }}>
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

        {/* Cards row */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-stretch gap-4"
        >
          {STEPS.map((step, index) => (
            <Fragment key={step.titleKey}>
              <motion.div
                variants={fadeUp}
                className="w-full lg:flex-1 lg:min-w-0 rounded-[14px] border border-[#1e1e2a] hover:border-[#3626A7] transition-colors duration-200"
                style={{ backgroundColor: '#0d0d14', padding: '28px 24px', minHeight: 220 }}
              >
                <p
                  className="font-sans uppercase font-bold"
                  style={{ fontSize: 10, color: 'rgba(255,255,255,.45)', marginBottom: 12 }}
                >
                  {t(step.labelKey)}
                </p>

                <div
                  className="flex items-center justify-center rounded-[8px] border"
                  style={{ width: 44, height: 44, backgroundColor: step.iconBg, borderColor: step.iconBorderColor }}
                >
                  <step.Icon size={20} color={step.iconColor} />
                </div>

                <h3
                  className="font-heading font-bold"
                  style={{ fontSize: 16, color: 'white', marginTop: 12, marginBottom: 6 }}
                >
                  {t(step.titleKey)}
                </h3>

                <p
                  className="font-sans"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', lineHeight: 1.55, marginBottom: 12 }}
                >
                  {t(step.descKey)}
                </p>

                <div
                  className="font-sans"
                  style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 8, fontSize: 10, color: 'rgba(255,255,255,.4)' }}
                >
                  {t('duration_label')}{' · '}
                  <span style={{ color: '#DF57BC', fontWeight: 600 }}>{t(step.durationKey)}</span>
                </div>
              </motion.div>

              {index < STEPS.length - 1 && <ArrowConnector />}
            </Fragment>
          ))}
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
