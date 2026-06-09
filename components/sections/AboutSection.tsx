'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { stagger, fadeUp } from '@/lib/utils/animations';

const TEAM = [
  { image: '/images/team-yonathan.png', nameKey: 'member1_name', roleKey: 'member1_role' },
  { image: '/images/team-sarah.png',    nameKey: 'member2_name', roleKey: 'member2_role' },
  { image: '/images/team-lucas.png',    nameKey: 'member3_name', roleKey: 'member3_role' },
] as const;

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-16 md:py-32" style={{ backgroundColor: '#000807' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Manifesto */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-start gap-6 mb-20 max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="dark">{t('label')}</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-4xl md:text-5xl leading-tight"
            style={{ color: 'white' }}
          >
            {t('headline')}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-sans text-base md:text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            {t('body')}
          </motion.p>
        </motion.div>

        {/* Team label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-xs uppercase tracking-widest mb-10"
          style={{ color: 'rgba(255,255,255,0.3)' }}
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
          {TEAM.map(({ image, nameKey, roleKey }) => (
            <motion.div key={nameKey} variants={fadeUp} className="flex flex-col gap-4">
              <div
                className="relative w-full aspect-square rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#111' }}
              >
                <Image
                  src={image}
                  alt={t(nameKey)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
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
          ))}
        </motion.div>

      </div>
    </section>
  );
}
