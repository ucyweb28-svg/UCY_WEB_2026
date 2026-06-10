'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { stagger, fadeUp } from '@/lib/utils/animations';

const PROJECTS = [
  { image: '/images/project-eclat.png',   titleKey: 'project1_title', catKey: 'project1_cat' },
  { image: '/images/project-daniela.png', titleKey: 'project2_title', catKey: 'project2_cat' },
  { image: '/images/project-nexus.png',   titleKey: 'project3_title', catKey: 'project3_cat' },
  { image: '/images/project-aurora.png',  titleKey: 'project4_title', catKey: 'project4_cat' },
] as const;

export function PortfolioSection() {
  const t = useTranslations('portfolio');

  return (
    <section
      id="portfolio"
      className="py-16 md:py-32"
      style={{ backgroundColor: '#FBF9FF', borderTop: '1px solid rgba(0,8,7,0.06)' }}
    >
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

        {/* Project grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PROJECTS.map(({ image, titleKey, catKey }) => (
            <motion.div
              key={titleKey}
              variants={fadeUp}
              className="group rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'white', border: '1px solid rgba(0,8,7,0.08)' }}
            >
              {/* Project image */}
              <div
                className="relative w-full h-[220px] md:h-[280px] overflow-hidden"
                style={{ backgroundColor: '#F5F5F0' }}
              >
                <Image
                  src={image}
                  alt={t(titleKey)}
                  fill
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Card footer */}
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="font-sans text-xs" style={{ color: 'rgba(0,8,7,0.4)' }}>
                    {t(catKey)}
                  </span>
                  <h3 className="font-heading font-bold text-lg" style={{ color: '#000807' }}>
                    {t(titleKey)}
                  </h3>
                </div>
                <a
                  href="#contact"
                  className="font-sans text-sm font-semibold flex-shrink-0 ml-4"
                  style={{ color: '#3626A7' }}
                >
                  {t('cta')} →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
