'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { stagger, fadeUp } from '@/lib/utils/animations';

const TEAM = [
  { image: '/images/team-yonathan.png', nameKey: 'member1_name', roleKey: 'member1_role', objectPosition: 'center 20%', linkedin: 'https://www.linkedin.com/company/115831904/' },
  { image: '/images/team-sarah.png',    nameKey: 'member2_name', roleKey: 'member2_role', objectPosition: 'center 15%', linkedin: null },
  { image: '/images/team-lucas.png',    nameKey: 'member3_name', roleKey: 'member3_role', objectPosition: 'center 10%', linkedin: null },
] as const;

const STATS = [
  { valueKey: 'stat1_value', labelKey: 'stat1_label' },
  { valueKey: 'stat2_value', labelKey: 'stat2_label' },
  { valueKey: 'stat3_value', labelKey: 'stat3_label' },
] as const;

const LINKEDIN_PATH =
  'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z';

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-16 md:py-32" style={{ backgroundColor: '#000807' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Manifesto */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20"
        >
          {/* Left: badge, heading, body, stats */}
          <div className="flex flex-col items-start gap-6">
            <motion.div variants={fadeUp}>
              <Badge variant="dark">{t('label')}</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading font-extrabold text-4xl md:text-5xl leading-tight"
            >
              <span style={{ color: 'white' }}>{t('headline_start')}</span>
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
            <motion.p
              variants={fadeUp}
              className="font-sans text-base md:text-lg leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {t('body')}
            </motion.p>

            {/* Mini stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-8">
              {STATS.map(({ valueKey, labelKey }) => (
                <div key={valueKey} className="flex flex-col gap-1">
                  <span className="font-heading font-bold" style={{ color: '#DF57BC', fontSize: 24 }}>
                    {t(valueKey)}
                  </span>
                  <span className="font-sans" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
                    {t(labelKey)}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: brand manifesto quote */}
          <motion.div variants={fadeUp} className="flex items-center">
            <p
              className="font-heading italic"
              style={{ fontSize: 28, lineHeight: 1.4, color: 'rgba(255,255,255,0.15)' }}
            >
              {t('manifesto_quote')}
            </p>
          </motion.div>
        </motion.div>

        {/* Team label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold uppercase mb-10"
          style={{ fontSize: 13, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}
        >
          {t('team_headline')}
        </motion.p>

        {/* Team grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8"
        >
          {TEAM.map(({ image, nameKey, roleKey, objectPosition, linkedin }, index) => (
            <ScrollReveal key={nameKey} delay={index * 0.1}>
              <motion.div
                variants={fadeUp}
                whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="group flex flex-col gap-4"
              >
                <div
                  className="w-full relative overflow-hidden"
                  style={{ height: 380, borderRadius: 16, backgroundColor: '#111' }}
                >
                  <Image
                    src={image}
                    alt={t(nameKey)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ objectPosition }}
                  />
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: 'rgba(0,8,7,0.6)' }}
                    >
                      <svg width={28} height={28} viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d={LINKEDIN_PATH} />
                      </svg>
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-heading font-bold text-base" style={{ color: 'white' }}>
                    {t(nameKey)}
                  </p>
                  <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {t(roleKey)}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
