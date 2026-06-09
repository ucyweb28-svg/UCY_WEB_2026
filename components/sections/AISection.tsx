'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { stagger, fadeUp } from '@/lib/utils/animations';

const AI_STACK = [
  { name: 'GPT-4 / Claude',   cat: 'Rédaction & stratégie' },
  { name: 'Midjourney',        cat: 'Création visuelle' },
  { name: 'Adobe Firefly',     cat: 'Retouche & génération' },
  { name: 'Cursor',            cat: 'Développement IA' },
  { name: 'Runway',            cat: 'Vidéo & motion' },
];

export function AISection() {
  const t = useTranslations('ai');

  return (
    <section className="py-16 md:py-32" style={{ backgroundColor: '#FBF9FF' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left: text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-1 flex flex-col items-start gap-6"
          >
            <motion.div variants={fadeUp}>
              <Badge>{t('label')}</Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading font-extrabold text-4xl md:text-5xl leading-tight"
              style={{ color: '#000807' }}
            >
              {t('headline')}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-sans text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: 'rgba(0,8,7,0.6)' }}
            >
              {t('body')}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button variant="primary" href="#contact">
                {t('cta')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: AI stack card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:flex-1 max-w-sm lg:max-w-none"
          >
            <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: '#000807' }}>
              <p
                className="font-heading font-bold text-xs uppercase tracking-widest mb-6"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Notre stack IA
              </p>
              <div className="flex flex-col">
                {AI_STACK.map(({ name, cat }, i) => (
                  <div
                    key={name}
                    className="flex items-center justify-between py-4"
                    style={{
                      borderBottom:
                        i < AI_STACK.length - 1
                          ? '1px solid rgba(255,255,255,0.07)'
                          : 'none',
                    }}
                  >
                    <span className="font-sans font-medium text-sm" style={{ color: 'white' }}>
                      {name}
                    </span>
                    <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {cat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
