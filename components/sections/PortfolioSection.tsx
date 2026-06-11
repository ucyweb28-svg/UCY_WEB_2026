'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { stagger, fadeUp } from '@/lib/utils/animations';

const PROJECTS = [
  { image: '/images/project-bloomair.png', titleKey: 'project1_title', catKey: 'project1_cat' },
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

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
            className="font-heading font-extrabold leading-tight break-words hyphens-auto"
            style={{ color: '#000807', fontSize: 'clamp(1.5rem, 8vw, 3rem)' }}
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
          {PROJECTS.map(({ image, titleKey, catKey }, index) => (
            <ScrollReveal key={titleKey} delay={index * 0.1}>
              <motion.div
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
            </ScrollReveal>
          ))}
        </motion.div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-end"
          style={{ marginTop: 32 }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.6 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: -6,
                left: -3,
                width: '100%',
                height: '100%',
                borderRadius: 'inherit',
                background: 'linear-gradient(135deg, #3626A7 0%, #DF57BC 50%, #DE541E 100%)',
                filter: 'blur(10px)',
                zIndex: -1,
                pointerEvents: 'none',
              }}
            />
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/portfolio"
                className="inline-flex items-center bg-transparent font-sans font-semibold transition-colors duration-200 hover:bg-[#0a0a0a] hover:text-white"
                style={{
                  fontSize: 14,
                  padding: '12px 24px',
                  borderRadius: 10,
                  border: '1.5px solid #0a0a0a',
                  color: '#0a0a0a',
                }}
              >
                {t('view_all')}
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
