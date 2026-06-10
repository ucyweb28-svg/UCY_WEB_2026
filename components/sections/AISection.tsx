'use client';

import { useTranslations } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const columnFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const columnStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const MODULES = [
  {
    icon: '✦',
    iconBg: 'rgba(54,38,167,.2)',
    iconColor: '#7F77DD',
    nameKey: 'module1_name',
    descKey: 'module1_desc',
    active: true,
    statusKey: 'status_live',
    statusBg: 'rgba(29,158,117,.15)',
    statusColor: '#1D9E75',
  },
  {
    icon: '◈',
    iconBg: 'rgba(223,87,188,.1)',
    iconColor: '#DF57BC',
    nameKey: 'module2_name',
    descKey: 'module2_desc',
    active: false,
    statusKey: 'status_live',
    statusBg: 'rgba(29,158,117,.15)',
    statusColor: '#1D9E75',
  },
  {
    icon: '⬡',
    iconBg: 'rgba(222,84,30,.1)',
    iconColor: '#DE541E',
    nameKey: 'module3_name',
    descKey: 'module3_desc',
    active: false,
    statusKey: 'status_soon',
    statusBg: 'rgba(136,136,136,.1)',
    statusColor: '#555555',
  },
] as const;

export function AISection() {
  const t = useTranslations('ai');

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 md:min-h-[600px]"
      style={{ backgroundColor: '#0a0a0f' }}
    >
      {/* Left: text */}
      <motion.div
        variants={columnStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative overflow-hidden flex items-center"
        style={{ padding: '52px 44px' }}
      >
        {/* Glow orbs */}
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ backgroundColor: '#3626A7', opacity: 0.18, filter: 'blur(80px)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ backgroundColor: '#DF57BC', opacity: 0.12, filter: 'blur(80px)' }}
        />

        <motion.div variants={columnFade} className="relative flex flex-col items-start gap-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{ borderColor: 'rgba(223,87,188,.3)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#DF57BC' }} />
            <span
              className="font-sans text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: '#DF57BC' }}
            >
              {t('badge')}
            </span>
          </div>

          <h2
            className="font-heading font-extrabold text-4xl md:text-5xl leading-tight"
            style={{ color: 'white' }}
          >
            {t('headline_start')}
            <span style={{ color: '#DF57BC' }}>{t('headline_highlight')}</span>
          </h2>

          <p
            className="font-sans text-base leading-relaxed max-w-[380px]"
            style={{ color: '#888888' }}
          >
            {t('body')}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" href="/contact">
              {t('btn_primary')}
            </Button>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-heading font-semibold border transition-all duration-200 hover:bg-white/5 active:scale-[0.98]"
              style={{ borderColor: '#2a2a3a', color: '#888888', backgroundColor: 'transparent' }}
            >
              {t('btn_secondary')}
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Right: product UI mockup */}
      <motion.div
        variants={columnStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex items-center justify-center"
        style={{ padding: '32px 28px' }}
      >
        <motion.div
          variants={columnFade}
          className="w-full max-w-[380px] rounded-xl overflow-hidden"
          style={{ backgroundColor: '#111118', border: '1px solid #1e1e2e' }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between"
            style={{ backgroundColor: '#0d0d16', borderBottom: '1px solid #1a1a28', padding: '10px 14px' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="rounded-full" style={{ width: 7, height: 7, backgroundColor: '#ff5f57' }} />
                <span className="rounded-full" style={{ width: 7, height: 7, backgroundColor: '#ffbd2e' }} />
                <span className="rounded-full" style={{ width: 7, height: 7, backgroundColor: '#28ca41' }} />
              </div>
              <span className="font-sans" style={{ fontSize: 11, color: '#555555' }}>
                {t('card_title')}
              </span>
            </div>
            <span
              className="font-sans font-bold uppercase tracking-wide rounded-full px-2 py-0.5"
              style={{ fontSize: 9, color: '#3626A7', backgroundColor: 'rgba(54,38,167,.15)' }}
            >
              {t('card_badge')}
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3" style={{ padding: '16px' }}>
            <p
              className="font-sans uppercase tracking-widest"
              style={{ fontSize: 9, color: '#444444' }}
            >
              {t('modules_label')}
            </p>

            <div className="flex flex-col gap-2">
              {MODULES.map((mod) => (
                <div
                  key={mod.nameKey}
                  className="flex items-center gap-2.5 rounded-[7px] border"
                  style={{
                    padding: '8px 10px',
                    backgroundColor: mod.active ? 'rgba(54,38,167,.12)' : 'transparent',
                    borderColor: mod.active ? 'rgba(54,38,167,.25)' : 'transparent',
                  }}
                >
                  <span
                    className="shrink-0 flex items-center justify-center rounded-[6px]"
                    style={{ width: 28, height: 28, backgroundColor: mod.iconBg, color: mod.iconColor, fontSize: 13 }}
                  >
                    {mod.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-medium truncate" style={{ fontSize: 12, color: 'white' }}>
                      {t(mod.nameKey)}
                    </p>
                    <p className="font-sans truncate" style={{ fontSize: 10, color: '#666666' }}>
                      {t(mod.descKey)}
                    </p>
                  </div>
                  <span
                    className="shrink-0 font-sans font-semibold rounded-full px-2 py-0.5"
                    style={{ fontSize: 9, backgroundColor: mod.statusBg, color: mod.statusColor }}
                  >
                    {t(mod.statusKey)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #1a1a28' }} />

            <a
              href="/contact"
              className="flex items-center justify-between gap-3 rounded-lg"
              style={{ backgroundColor: 'rgba(223,87,188,.06)', border: '1px solid rgba(223,87,188,.15)', padding: '10px' }}
            >
              <div className="min-w-0">
                <p className="font-sans font-bold truncate" style={{ fontSize: 11, color: '#DF57BC' }}>
                  {t('cta_title')}
                </p>
                <p className="font-sans truncate" style={{ fontSize: 10, color: '#555555' }}>
                  {t('cta_subtitle')}
                </p>
              </div>
              <span className="shrink-0" style={{ color: '#DF57BC' }}>↗</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
