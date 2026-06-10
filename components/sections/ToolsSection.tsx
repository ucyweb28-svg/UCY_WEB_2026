'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { stagger, fadeUp, staggerFast } from '@/lib/utils/animations';

const CATEGORIES = [
  {
    labelKey: 'category_design',
    color: '#DF57BC',
    tools: [
      { name: 'Figma', primary: true },
      { name: 'Adobe Illustrator', primary: false },
      { name: 'Adobe Photoshop', primary: false },
      { name: 'Framer', primary: false },
    ],
  },
  {
    labelKey: 'category_dev',
    color: '#3626A7',
    tools: [
      { name: 'Next.js', primary: true },
      { name: 'React', primary: false },
      { name: 'TypeScript', primary: false },
      { name: 'Tailwind CSS', primary: false },
    ],
  },
  {
    labelKey: 'category_motion',
    color: '#DE541E',
    tools: [
      { name: 'After Effects', primary: true },
      { name: 'GPT-4 / Claude', primary: false },
      { name: 'Midjourney', primary: false },
      { name: 'Cursor', primary: false },
    ],
  },
  {
    labelKey: 'category_platforms',
    color: '#888888',
    tools: [
      { name: 'WordPress', primary: false },
      { name: 'Webflow', primary: false },
      { name: 'Notion', primary: false },
    ],
  },
] as const;

export function ToolsSection() {
  const t = useTranslations('tools');

  return (
    <section className="py-16 md:py-32" style={{ backgroundColor: '#000807' }}>
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-start gap-4 mb-16"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="dark">{t('label')}</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-4xl md:text-5xl leading-tight"
            style={{ color: 'white' }}
          >
            {t('headline_start')}
            <br />
            <span className="bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent animate-gradient">
              {t('headline_highlight')}
            </span>
          </motion.h2>
        </motion.div>

        {/* Tools grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          {CATEGORIES.map(({ labelKey, color, tools }) => (
            <motion.div
              key={labelKey}
              variants={fadeUp}
              className="flex flex-col gap-4 p-6"
              style={{ backgroundColor: '#0f0f0f' }}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span
                  className="font-sans text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {t(labelKey)}
                </span>
              </div>

              <motion.div variants={staggerFast} className="flex flex-col gap-3">
                {tools.map(({ name, primary }) => (
                  <motion.div key={name} variants={fadeUp} className="flex items-center gap-2.5">
                    <span
                      className="w-[22px] h-[22px] rounded-[6px] shrink-0"
                      style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                    />
                    <span
                      className="font-sans text-[13px] truncate"
                      style={{ color: primary ? 'white' : 'rgba(255,255,255,0.7)' }}
                    >
                      {name}
                    </span>
                    {primary && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: color }}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
