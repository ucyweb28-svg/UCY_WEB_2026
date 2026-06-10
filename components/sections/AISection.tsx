'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

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
    <section className="relative overflow-hidden py-24" style={{ backgroundColor: '#0a0a0f' }}>
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/ai-section-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.25 }}
          priority
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(to right, rgba(10,10,15,0.95) 40%, rgba(10,10,15,0.6) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
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
            className="mt-6 font-heading font-extrabold"
            style={{ color: 'white', fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: 1.15 }}
          >
            {t('headline_start')}
            <br />
            <span style={{ color: '#DF57BC' }}>{t('headline_highlight')}</span>
          </h2>

          <p
            className="mt-6 font-sans leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 420, fontSize: 15 }}
          >
            {t('body')}
          </p>

          <div className="flex flex-wrap items-center" style={{ gap: 12, marginTop: 32 }}>
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

        {/* Right: product UI mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center mt-8 md:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ borderColor: ['#1e1e2e', '#3626A7', '#1e1e2e'] }}
            transition={{
              default: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              borderColor: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="w-full max-w-[420px] rounded-xl overflow-hidden"
            style={{ backgroundColor: '#111118', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e1e2e' }}
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
                  <motion.div
                    key={mod.nameKey}
                    whileHover={{ backgroundColor: 'rgba(54,38,167,0.2)', x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-center gap-2.5 rounded-[7px] border cursor-pointer"
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
                    {mod.statusKey === 'status_live' ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="shrink-0 font-sans font-semibold rounded-full px-2 py-0.5"
                        style={{ fontSize: 9, backgroundColor: mod.statusBg, color: mod.statusColor }}
                      >
                        {t(mod.statusKey)}
                      </motion.span>
                    ) : (
                      <span
                        className="shrink-0 font-sans font-semibold rounded-full px-2 py-0.5"
                        style={{ fontSize: 9, backgroundColor: mod.statusBg, color: mod.statusColor }}
                      >
                        {t(mod.statusKey)}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #1a1a28' }} />

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between gap-3 rounded-lg cursor-pointer"
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
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
