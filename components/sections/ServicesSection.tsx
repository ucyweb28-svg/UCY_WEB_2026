'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { stagger, fadeUp } from '@/lib/utils/animations';

const SERVICES = [
  { image: '/images/icon-engineering.jpg', titleKey: 'web_title',      descKey: 'web_desc' },
  { image: '/images/icon-design.jpg',      titleKey: 'ui_title',       descKey: 'ui_desc' },
  { image: '/images/icon-print.jpg',       titleKey: 'branding_title', descKey: 'branding_desc' },
  { image: '/images/icon-social.jpg',      titleKey: 'strategy_title', descKey: 'strategy_desc' },
] as const;

export function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-16 md:py-32" style={{ backgroundColor: '#FBF9FF' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-start gap-4 mb-16"
        >
          <motion.div variants={fadeUp}>
            <Badge>{t('label')}</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-4xl md:text-5xl max-w-xl leading-tight"
            style={{ color: '#000807' }}
          >
            {t('headline')}
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {SERVICES.map(({ image, titleKey, descKey }) => (
            <motion.div
              key={titleKey}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: 'white', border: '1px solid rgba(0,8,7,0.08)' }}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={image}
                  alt={t(titleKey)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="font-heading font-bold text-xl" style={{ color: '#000807' }}>
                  {t(titleKey)}
                </h3>
                <p className="font-sans text-sm leading-relaxed flex-1" style={{ color: 'rgba(0,8,7,0.6)' }}>
                  {t(descKey)}
                </p>
                <span
                  className="font-sans text-sm font-semibold mt-1 inline-flex items-center gap-1"
                  style={{ color: '#3626A7' }}
                >
                  {t('cta')} →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
