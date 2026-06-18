'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { stagger, fadeUp } from '@/lib/utils/animations';
import { trapAccents } from '@/lib/utils/trapAccents';

export function TrustTeam() {
  const t = useTranslations('stays');

  return (
    <section className="section" style={{ backgroundColor: '#000807' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image — left */}
          <ScrollReveal>
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ height: 420, backgroundColor: 'rgba(255,255,255,0.04)' }}
            >
              <Image
                src="/images/stays/team.jpg"
                alt="L'équipe UCY Stays"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Text — right */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="dark">{t('trust_badge')}</Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-trap font-extrabold leading-tight"
              style={{ color: '#FBF9FF', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              {trapAccents(t('trust_title_start'))}
              <span className="bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent animate-gradient">
                {trapAccents(t('trust_title_highlight'))}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-montserrat leading-relaxed"
              style={{ fontSize: 17, color: 'rgba(251,249,255,0.65)', maxWidth: 480 }}
            >
              {t('trust_body')}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
