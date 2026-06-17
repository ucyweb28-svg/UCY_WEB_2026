'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { stagger, fadeUp } from '@/lib/utils/animations';

type Property = {
  id: string;
  image: string;
  nameKey: string;
  typeKey: string;
  active: boolean;
};

const PROPERTIES: Property[] = [
  {
    id: 'prop1',
    image: '/images/stays/collection-1.jpg',
    nameKey: 'collection_prop1_name',
    typeKey: 'collection_prop1_type',
    active: true,
  },
  {
    id: 'prop2',
    image: '/images/stays/collection-2.jpg',
    nameKey: 'collection_prop2_name',
    typeKey: 'collection_prop2_type',
    active: true,
  },
  {
    id: 'prop3',
    image: '/images/stays/collection-3.jpg',
    nameKey: 'collection_prop3_name',
    typeKey: 'collection_prop3_type',
    active: false,
  },
  {
    id: 'prop4',
    image: '/images/stays/collection-4.jpg',
    nameKey: 'collection_prop4_name',
    typeKey: 'collection_prop4_type',
    active: false,
  },
];

export function Collection() {
  const t = useTranslations('stays');

  return (
    <section id="collection" className="section" style={{ backgroundColor: '#FBF9FF', borderTop: '1px solid rgba(0,8,7,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-start gap-4 mb-6"
        >
          <motion.div variants={fadeUp}>
            <Badge>{t('collection_badge')}</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold leading-tight"
            style={{ color: '#000807', fontSize: 'clamp(1.5rem, 5vw, 2.75rem)' }}
          >
            {t('collection_title_start')}
            <span
              style={{
                background: 'linear-gradient(90deg, #3626A7, #DF57BC, #DE541E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('collection_title_highlight')}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans"
            style={{ fontSize: 16, color: 'rgba(0,8,7,0.55)', maxWidth: 520 }}
          >
            {t('collection_intro')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
        >
          {PROPERTIES.map(({ id, image, nameKey, typeKey, active }, index) => (
            <ScrollReveal key={id} delay={index * 0.1}>
              <motion.div
                variants={fadeUp}
                whileHover={active ? { y: -4, transition: { duration: 0.2 } } : {}}
                className="group rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid rgba(0,8,7,0.08)',
                  opacity: active ? 1 : 0.65,
                }}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ height: 240, backgroundColor: '#f0ede8' }}
                >
                  <Image
                    src={image}
                    alt={t(nameKey)}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {!active && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(0,8,7,0.35)' }}
                    >
                      <span
                        className="font-sans font-bold uppercase"
                        style={{
                          fontSize: 11,
                          letterSpacing: '0.14em',
                          color: 'rgba(255,255,255,0.7)',
                          border: '1px dashed rgba(255,255,255,0.4)',
                          padding: '6px 14px',
                          borderRadius: 20,
                        }}
                      >
                        {t('cities_soon')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-sans text-xs" style={{ color: 'rgba(0,8,7,0.4)' }}>
                      {t(typeKey)}
                    </span>
                    <h3 className="font-heading font-bold text-lg" style={{ color: '#000807' }}>
                      {t(nameKey)}
                    </h3>
                  </div>
                  {active && (
                    <a
                      href="#partner"
                      className="font-sans text-sm font-semibold flex-shrink-0 ml-4 inline-flex items-center gap-1 transition-colors duration-200"
                      style={{ color: '#3626A7' }}
                    >
                      {t('collection_view')}
                      <ArrowUpRight size={14} weight="bold" />
                    </a>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
