'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { GlowButton } from '@/components/ui/GlowButton';
import { stagger, fadeUp } from '@/lib/utils/animations';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';

export function BecomePartner() {
  const t = useTranslations('stays');
  const whatsAppLink = formatWhatsAppLink('il', 'Bonjour%20UCY%20Stays%2C%20je%20souhaite%20confier%20mon%20bien');

  return (
    <section id="partner" className="section" style={{ backgroundColor: '#000807' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="dark">{t('partner_badge')}</Badge>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-trap font-extrabold leading-tight"
            style={{ color: '#FBF9FF', fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            {t('partner_title_start')}
            <span className="bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent animate-gradient">
              {t('partner_title_highlight')}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-montserrat leading-relaxed"
            style={{ fontSize: 17, color: 'rgba(251,249,255,0.6)', maxWidth: 540 }}
          >
            {t('partner_body')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            style={{ overflow: 'visible' }}
          >
            <GlowButton href="/contact" variant="gradient">
              {t('partner_cta_primary')}
            </GlowButton>
            <GlowButton href={whatsAppLink} variant="white" external>
              {t('partner_cta_secondary')}
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
