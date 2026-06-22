'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { GlowButton } from '@/components/ui/GlowButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { stagger, fadeUp } from '@/lib/utils/animations';

export function NewBuildDesign() {
  const t = useTranslations('stays');

  return (
    <section className="section" style={{ backgroundColor: '#FBF9FF', borderTop: '1px solid rgba(0,8,7,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text — left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <Badge>{t('newbuild_badge')}</Badge>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-trap font-extrabold leading-tight"
              style={{ color: '#000807', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              {t('newbuild_title_start')}
              <span
                style={{
                  background: 'linear-gradient(90deg, #3626A7, #DF57BC, #DE541E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('newbuild_title_highlight')}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-montserrat leading-relaxed"
              style={{ fontSize: 17, color: 'rgba(0,8,7,0.6)', maxWidth: 480 }}
            >
              {t('newbuild_body')}
            </motion.p>

            <motion.div variants={fadeUp}>
              <GlowButton href="/contact" variant="dark">
                {t('newbuild_cta')}
              </GlowButton>
            </motion.div>
          </motion.div>

          {/* Image / video — right */}
          <ScrollReveal delay={0.1}>
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ height: 420, backgroundColor: '#f0ede8' }}
            >
              <Image
                src="/images/stays/design-section.jpg"
                alt="Design d'intérieur UCY Stays"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
