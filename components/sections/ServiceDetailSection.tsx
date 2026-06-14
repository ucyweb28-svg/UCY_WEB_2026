'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDiag } from '@/components/ui/ArrowDiag';
import { Badge } from '@/components/ui/Badge';
import { GlowButton } from '@/components/ui/GlowButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { stagger, fadeUp } from '@/lib/utils/animations';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';
import type { RelatedProjectRef } from '@/lib/utils/services';

interface LocalizedContent {
  title: string;
  subtitle: string;
  tagline: string;
}

interface FeatureContent {
  title: string;
  desc: string;
}

interface ProcessStepContent {
  title: string;
  desc: string;
  duration: string;
}

interface ServiceDetailSectionProps {
  image: string;
  hero: LocalizedContent;
  color: string;
  heroGradientWord: string;
  heroSub: string;
  features: FeatureContent[];
  process: ProcessStepContent[];
  relatedProjects: RelatedProjectRef[];
}

export function ServiceDetailSection({
  image,
  hero,
  color,
  heroGradientWord,
  heroSub,
  features,
  process,
  relatedProjects,
}: ServiceDetailSectionProps) {
  const t = useTranslations('service_detail');
  const tPortfolio = useTranslations('portfolio');
  const locale = useLocale();

  const waMessage =
    locale === 'en'
      ? `Hi UCY Studio, I'm interested in your ${hero.title} service`
      : `Bonjour UCY Studio, je suis intéressé(e) par votre service ${hero.title}`;
  const whatsappFR = formatWhatsAppLink('fr', encodeURIComponent(waMessage));

  const titleWords = hero.title.split(' ');
  const titleHighlight = titleWords.pop() ?? '';
  const titleStart = titleWords.length > 0 ? `${titleWords.join(' ')} ` : '';

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[75vh] flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <Image
            src={image}
            alt={hero.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.75) 100%)' }}
        />

        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
          <Link
            href="/#services"
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-white/80 hover:text-white transition-colors duration-200"
          >
            <ArrowDiag size={11} className="rotate-180" />
            {t('back_link')}
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl mx-auto text-center px-4 md:px-8 pt-20 md:pt-28 flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="mb-5">
            <Badge variant="dark">{t('badge')}</Badge>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold leading-tight text-white text-[clamp(28px,4.5vw,56px)]"
            style={{ wordBreak: 'keep-all', overflowWrap: 'normal', hyphens: 'none' }}
          >
            {titleStart}
            <span
              className="bg-gradient-to-r from-[#3626A7] via-[#DF57BC] to-[#DE541E] bg-clip-text text-transparent"
              style={{ display: 'inline' }}
            >
              {titleHighlight}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-sans text-base text-white/80 max-w-full px-4 md:max-w-xl md:px-0 mx-auto mt-4"
            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.span variants={fadeUp} className="font-sans text-[13px] uppercase tracking-widest text-white/50 mt-2">
            {hero.tagline}
          </motion.span>
          <motion.div variants={fadeUp} className="mt-8">
            <GlowButton href={whatsappFR} variant="white" external>
              {t('hero_cta')}
              <ArrowDiag size={11} className="inline ml-1" />
            </GlowButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Ce qu'on fait */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <h2
              className="font-heading font-extrabold leading-tight mb-3"
              style={{ color: '#0a0a0f', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
            >
              {t('features_heading_prefix')}
              <span
                style={{
                  background: 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {heroGradientWord}
              </span>
            </h2>
            <p className="font-sans text-[13px] mb-10" style={{ color: '#888' }}>
              {heroSub}
            </p>
          </ScrollReveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                whileHover={{ borderColor: color, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="relative overflow-hidden rounded-[20px]"
                style={{ backgroundColor: '#ffffff', border: '1px solid #e4e1d8', padding: 32 }}
              >
                <span
                  className="absolute font-heading pointer-events-none select-none"
                  style={{ top: 16, right: 16, fontSize: 72, fontWeight: 900, lineHeight: 1, color: 'rgba(10, 10, 15, 0.07)', zIndex: 0 }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <span className="block w-2 h-2 rounded-full" style={{ backgroundColor: color, marginBottom: 20 }} />
                  <h3 className="font-heading font-bold" style={{ fontSize: 16, color: '#0a0a0f', marginBottom: 10 }}>
                    {feature.title}
                  </h3>
                  <p className="font-sans" style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <ScrollReveal>
                <p
                  className="font-sans text-xs font-bold uppercase tracking-widest mb-6"
                  style={{ color: 'rgba(0,8,7,0.4)' }}
                >
                  {t('related_heading')}
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProjects.map((project) => (
                  <ScrollReveal key={project.titleKey}>
                    <Link href="/#portfolio" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className="group block relative h-[140px] rounded-xl overflow-hidden">
                      <Image
                        src={project.image}
                        alt={tPortfolio(project.titleKey)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                        <span className="font-sans text-white text-sm font-semibold">
                          {tPortfolio(project.titleKey)}
                        </span>
                        <span className="font-sans text-white/70 text-xs">{tPortfolio(project.catKey)}</span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Notre processus */}
      <section className="section" style={{ backgroundColor: '#0a0a0f' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className="mx-auto"
            style={{
              background: 'linear-gradient(135deg, #3626A714 0%, #DF57BC0a 50%, #0a0a0f 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 24,
              padding: '48px 40px',
              maxWidth: 1100,
              overflow: 'hidden',
            }}
          >
            <ScrollReveal>
              <div className="flex flex-col items-center text-center mb-10">
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                  style={{ borderColor: 'rgba(223,87,188,.3)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#DF57BC' }} />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#DF57BC' }}>
                    {t('process_badge')}
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-4xl leading-tight mt-4" style={{ color: '#ffffff' }}>
                  {t('process_heading_start')}
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {t('process_heading_highlight')}
                  </span>
                </h2>
                <p className="font-sans mt-2" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                  {t('process_subtitle')}
                </p>
              </div>
            </ScrollReveal>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {process.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  whileHover={{
                    borderColor: 'rgba(223,87,188,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  className="relative flex flex-col justify-between"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16,
                    padding: 24,
                    minHeight: 200,
                    overflow: 'hidden',
                  }}
                >
                  <div>
                    <span className="font-sans uppercase tracking-widest block" style={{ fontSize: 10, color: '#aaa', marginBottom: 12 }}>
                      {t('step_label')} {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading font-bold" style={{ fontSize: 14, color: '#ffffff', marginBottom: 8 }}>
                      {step.title}
                    </h3>
                    <p className="font-sans" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>

                  <span
                    className="font-sans font-bold inline-flex self-start"
                    style={{
                      fontSize: 11,
                      color: '#DF57BC',
                      backgroundColor: 'rgba(54,38,167,0.2)',
                      borderRadius: 100,
                      padding: '3px 10px',
                      marginTop: 16,
                    }}
                  >
                    {step.duration}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <p className="text-center font-sans mt-8" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
              {t('process_footer')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
