'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { stagger, fadeUp, staggerFast } from '@/lib/utils/animations';

const TOOLS = [
  'Figma',
  'Adobe Illustrator',
  'Adobe Photoshop',
  'After Effects',
  'Framer',
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'WordPress',
  'Webflow',
  'Notion',
];

export function ToolsSection() {
  const t = useTranslations('tools');

  return (
    <section className="py-16 md:py-32" style={{ backgroundColor: '#000807' }}>
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
            <Badge variant="dark">{t('label')}</Badge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-4xl md:text-5xl max-w-xl leading-tight"
            style={{ color: 'white' }}
          >
            {t('headline')}
          </motion.h2>
        </motion.div>

        {/* Tool pills */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3"
        >
          {TOOLS.map((tool) => (
            <motion.span
              key={tool}
              variants={fadeUp}
              className="font-sans text-sm font-medium px-5 py-2.5 rounded-full"
              style={{
                border: '1px solid rgba(255,255,255,0.14)',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
