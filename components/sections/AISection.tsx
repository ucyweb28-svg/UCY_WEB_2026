'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Sparkle, ChatCircleDots, ImageSquare, ArrowUpRight } from '@phosphor-icons/react';

const MODULES = [
  {
    icon: Sparkle,
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
    icon: ChatCircleDots,
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
    icon: ImageSquare,
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
    <section className="relative overflow-hidden section" style={{ minHeight: '85vh' }}>
      {/* Layer 1: background image */}
      <div className="absolute inset-0">
        <Image src="/images/ai-bg.jpg" fill className="object-cover object-center" alt="" priority />
      </div>

      {/* Layer 2: gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.75) 40%, rgba(54,38,167,0.3) 70%, rgba(223,87,188,0.15) 100%)',
        }}
      />

      {/* Layer 3: content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[85vh]">

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.0, 1] }}
          className="relative flex flex-col items-start"
        >
          <img src="/logo.svg" alt="UCY Studio" width={80} className="mb-12 brightness-0 invert opacity-80" />

          <div
            className="inline-flex items-center rounded-full border px-3 py-1.5 mb-6"
            style={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.08)' }}
          >
            <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-white">
              {t('badge')}
            </span>
          </div>

          <h2
            className="font-heading font-extrabold"
            style={{ fontSize: 'clamp(24px, 2.8vw, 40px)', color: '#ffffff', lineHeight: 1.2 }}
          >
            <span className="block whitespace-nowrap">{t('headline_start')}</span>
            <span className="block whitespace-nowrap">{t('headline_middle')}</span>
            <span
              className="block whitespace-nowrap"
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

          <p
            className="max-w-sm mt-6 font-sans"
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}
          >
            {t('body')}
          </p>

          <Link
            href="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className="mt-10 inline-flex items-center gap-1 font-sans font-bold text-base rounded-full px-7 py-3 bg-white text-[#0a0a0f] hover:bg-[#FBF9FF] transition-colors duration-200"
          >
            {t('btn_primary')}
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </motion.div>

        {/* Right: product UI mockup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.0, 1] }}
          className="hidden md:flex relative items-center justify-center"
          style={{ marginLeft: 'auto', marginRight: -40 }}
        >
          {/* Pink glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 400,
              height: 400,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(223,87,188,0.2) 0%, transparent 70%)',
              filter: 'blur(60px)',
              borderRadius: '50%',
            }}
            aria-hidden="true"
          />

          {/* Glass card */}
          <div
            className="relative w-full max-w-[420px]"
            style={{
              backgroundColor: 'rgba(10,10,15,0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: 28,
              boxShadow: '0 0 60px rgba(223,87,188,0.15), 0 0 120px rgba(54,38,167,0.1)',
            }}
          >
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#111118', border: '1px solid #1e1e2e' }}>
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
                        style={{ width: 28, height: 28, backgroundColor: mod.iconBg, color: mod.iconColor }}
                      >
                        <mod.icon size={14} weight="bold" />
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
                  <ArrowUpRight size={14} weight="bold" className="shrink-0" style={{ color: '#DF57BC' }} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
