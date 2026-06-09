'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
});

const THUMBNAILS = [
  {
    label: 'E-commerce',
    title: 'Maison Éclat',
    gradient: 'linear-gradient(135deg, #3626A7 0%, #DF57BC 100%)',
  },
  {
    label: 'Branding',
    title: 'Nexus Capital',
    gradient: 'linear-gradient(135deg, #1a0f6e 0%, #3626A7 100%)',
  },
  {
    label: 'Design System',
    title: 'Aurora Media',
    gradient: 'linear-gradient(135deg, #DF57BC 0%, #DE541E 100%)',
  },
];

export function HeroSection() {
  const t = useTranslations('hero');
  const [line1, line2] = t('headline').split('\n');

  const whatsappHref = formatWhatsAppLink(
    'fr',
    'Bonjour%20UCY%20Studio%2C%20je%20voudrais%20d%C3%A9marrer%20un%20projet'
  );

  return (
    <section
      className="min-h-screen flex items-center pt-24 md:pt-32 pb-16 md:pb-24"
      style={{ backgroundColor: '#FBF9FF' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

          {/* ── Left: text ── */}
          <div className="w-full md:flex-1 flex flex-col items-start gap-7 md:gap-8">

            <Badge>{t('badge')}</Badge>

            {/* Headline — both lines text-5xl desktop, same weight */}
            <motion.h1
              {...fadeUp(0.1)}
              className="font-heading font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight"
            >
              <span className="block" style={{ color: '#000807' }}>{line1}</span>
              <span className="block" style={{ color: '#3626A7' }}>{line2}</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="font-sans text-base md:text-lg leading-relaxed max-w-[420px]"
              style={{ color: 'rgba(0,8,7,0.65)' }}
            >
              {t('subheadline')}
            </motion.p>

            <motion.div
              {...fadeUp(0.5)}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-1"
            >
              <Button variant="primary" href={whatsappHref} size="lg" external>
                {t('cta_primary')}
              </Button>
              <Button variant="secondary" href="#portfolio" size="lg">
                {t('cta_secondary')}
              </Button>
            </motion.div>
          </div>

          {/* ── Right: decorative portfolio card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full md:flex-1"
          >
            <div
              className="rounded-2xl p-6 md:p-8 flex flex-col gap-3 min-h-[440px] md:min-h-[520px]"
              style={{ backgroundColor: '#000807' }}
            >
              {/* Card header */}
              <div
                className="flex items-center justify-between pb-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span
                  className="font-heading font-bold text-xs tracking-widest uppercase"
                  style={{ color: 'white' }}
                >
                  UCY Studio
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: '#25D366' }}
                  />
                  <span
                    className="font-sans text-xs"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    En ligne
                  </span>
                </span>
              </div>

              {/* Project thumbnails */}
              {THUMBNAILS.map(({ label, title, gradient }) => (
                <div
                  key={title}
                  className="flex-1 rounded-xl flex flex-col justify-end p-4"
                  style={{ background: gradient, minHeight: '120px' }}
                >
                  <span
                    className="font-sans text-xs mb-0.5"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {label}
                  </span>
                  <span
                    className="font-heading font-bold text-sm"
                    style={{ color: 'white' }}
                  >
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
