'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { stagger, fadeUp } from '@/lib/utils/animations';

const BORDER_CLASSES = [
  '',
  'border-l border-white/15',
  'border-t border-white/15 md:border-t-0 md:border-l',
  'border-t border-l border-white/15 md:border-t-0',
];

export function StatsBar() {
  const t = useTranslations('stats');

  const STATS = [
    { value: t('projects_value'),     label: t('projects_label') },
    { value: t('clients_value'),      label: t('clients_label') },
    { value: t('satisfaction_value'), label: t('satisfaction_label') },
    { value: t('years_value'),        label: t('years_label') },
  ];

  return (
    <section className="py-16" style={{ backgroundColor: '#000807' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {STATS.map(({ value, label }, index) => (
            <ScrollReveal key={label} delay={index * 0.1}>
              <motion.div
                variants={fadeUp}
                className={`flex flex-col items-center text-center py-10 px-6 ${BORDER_CLASSES[index]}`}
              >
                <span
                  className="font-heading font-extrabold leading-none bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent animate-gradient"
                  style={{ fontSize: 'clamp(32px, 6vw, 48px)' }}
                >
                  {value}
                </span>
                <span
                  className="font-sans mt-2"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}
                >
                  {label}
                </span>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        <p
          className="text-center text-white/60 text-sm mt-8 pt-6 mx-6 tracking-widest uppercase"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          {t('tagline')}
        </p>
      </div>
    </section>
  );
}
