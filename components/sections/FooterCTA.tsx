'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';
import { stagger, fadeUp } from '@/lib/utils/animations';

export function FooterCTA() {
  const t = useTranslations('footer_cta');

  const whatsappFR = formatWhatsAppLink('fr', 'Bonjour%20UCY%20Studio%2C%20j%27ai%20un%20projet%20%C3%A0%20vous%20soumettre');
  const whatsappIL = formatWhatsAppLink('il', 'Bonjour%20UCY%20Studio%2C%20j%27ai%20un%20projet%20%C3%A0%20vous%20soumettre');

  return (
    <section id="contact" className="py-24 md:py-40" style={{ backgroundColor: '#000807' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Accent line — #DE541E used as a single accent element */}
          <motion.div
            variants={fadeUp}
            className="w-10 h-1 rounded-full"
            style={{ backgroundColor: '#DE541E' }}
          />

          <motion.h2
            variants={fadeUp}
            className="font-heading font-extrabold text-4xl md:text-6xl max-w-3xl leading-[1.05]"
            style={{ color: 'white' }}
          >
            {t('headline')}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-sans text-base md:text-lg max-w-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {t('sub')}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <Button variant="whatsapp" href={whatsappFR} size="lg" external>
              {t('whatsapp_fr')}
            </Button>
            <Button variant="ghost" href={whatsappIL} size="lg" external>
              {t('whatsapp_il')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
