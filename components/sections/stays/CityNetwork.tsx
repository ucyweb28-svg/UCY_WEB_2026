'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin } from '@phosphor-icons/react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { stagger, fadeUp } from '@/lib/utils/animations';

type CityDef = {
  id: string;
  nameKey: string;
  active: boolean;
};

const CITIES: CityDef[] = [
  { id: 'jerusalem', nameKey: 'cities_jerusalem', active: true },
  { id: 'netanya',   nameKey: 'cities_netanya',   active: true },
  { id: 'telaviv',  nameKey: 'cities_telaviv',   active: false },
  { id: 'raanana',  nameKey: 'cities_raanana',   active: false },
];

export function CityNetwork() {
  const t = useTranslations('stays');

  return (
    <section id="cities" className="section" style={{ backgroundColor: '#000807' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-start gap-4 mb-16"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="dark">{t('cities_badge')}</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold leading-tight"
            style={{ color: '#FBF9FF', fontSize: 'clamp(1.5rem, 5vw, 2.75rem)' }}
          >
            {t('cities_title_start')}
            <span className="bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent animate-gradient">
              {t('cities_title_highlight')}
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CITIES.map(({ id, nameKey, active }, index) => (
            <ScrollReveal key={id} delay={index * 0.1}>
              <motion.div
                whileHover={active ? { y: -4, transition: { duration: 0.2 } } : {}}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl"
                style={{
                  border: active
                    ? '1px solid rgba(255,255,255,0.18)'
                    : '1.5px dashed rgba(255,255,255,0.12)',
                  backgroundColor: active
                    ? 'rgba(255,255,255,0.05)'
                    : 'transparent',
                  padding: '32px 16px',
                  minHeight: 168,
                }}
              >
                <MapPin
                  size={24}
                  weight={active ? 'fill' : 'regular'}
                  style={{ color: active ? '#DF57BC' : 'rgba(255,255,255,0.2)' }}
                />
                <span
                  className="font-heading font-bold text-center"
                  style={{
                    fontSize: 20,
                    color: active ? '#FBF9FF' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {t(nameKey)}
                </span>
                <span
                  className="font-sans font-bold uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    color: active ? '#1D9E75' : 'rgba(255,255,255,0.25)',
                    backgroundColor: active
                      ? 'rgba(29,158,117,0.15)'
                      : 'rgba(255,255,255,0.06)',
                    padding: '3px 10px',
                    borderRadius: 20,
                  }}
                >
                  {active ? t('cities_active') : t('cities_soon')}
                </span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
