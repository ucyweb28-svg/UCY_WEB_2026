'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
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
    <section className="py-16" style={{ backgroundColor: '#000807' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20"
        >
          {STATS.map(({ value, label }, index) => (
            <ScrollReveal key={label} delay={index * 0.1}>
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center gap-2 py-10 md:py-12 text-center"
              >
                <span className="font-heading font-extrabold text-7xl md:text-8xl leading-none bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent animate-gradient">
                  {value}
                </span>
                <span
                  className="font-sans text-sm"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {label}
                </span>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        <p className="text-center text-white/30 text-sm mt-8 tracking-widest uppercase">
          {t('tagline')}
        </p>
      </div>
    </section>
  );
}
