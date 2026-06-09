'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { stagger, fadeUp } from '@/lib/utils/animations';

export function StatsBar() {
  const t = useTranslations('stats');

  const STATS = [
    { value: t('projects_value'),     label: t('projects_label') },
    { value: t('clients_value'),      label: t('clients_label') },
    { value: t('satisfaction_value'), label: t('satisfaction_label') },
    { value: t('years_value'),        label: t('years_label') },
  ];

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#000807' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.07)' }}
        >
          {STATS.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex flex-col items-center gap-2 py-10 md:py-12 text-center"
              style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span
                className="font-heading font-extrabold text-5xl md:text-6xl leading-none"
                style={{ color: 'white' }}
              >
                {value}
              </span>
              <span
                className="font-sans text-sm"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
