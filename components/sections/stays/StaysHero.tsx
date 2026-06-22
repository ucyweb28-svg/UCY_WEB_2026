'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { trapAccents } from '@/lib/utils/trapAccents';

export function StaysHero() {
  const t = useTranslations('stays.hero');

  return (
    <section
      className="text-center px-6 pt-16 pb-14 max-w-[1000px] mx-auto"
      style={{ backgroundColor: '#FBF9FF' }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-trap font-extrabold text-[clamp(36px,5.4vw,64px)] leading-[1.1] tracking-[-0.01em]"
        style={{ color: '#000807' }}
      >
        {trapAccents(t('titleLine1'))}{' '}
        <span className="bg-gradient-to-r from-[#DE541E] via-[#DF57BC] to-[#3626A7] bg-clip-text text-transparent">
          {trapAccents(t('titleLine2'))}
        </span>
      </motion.h1>

      <p
        className="mt-6 mb-8 text-[17px] leading-relaxed"
        style={{ color: 'rgba(0,8,7,0.55)' }}
      >
        {t('subtitle')}
      </p>

      <div className="flex items-center justify-center gap-7 flex-wrap">
        <Link
          href="#devenir-partenaire"
          className="font-montserrat rounded-full px-8 py-4 text-[15px] font-semibold transition-[box-shadow,transform] duration-300 hover:shadow-[0_14px_28px_-6px_rgba(10,8,7,0.35)] hover:-translate-y-0.5"
          style={{ backgroundColor: '#000807', color: '#FBF9FF' }}
        >
          {t('ctaPrimary')}
        </Link>
        <Link
          href="#residences"
          className="font-montserrat text-[15px] font-semibold border-b border-transparent pb-0.5 transition-colors duration-200 hover:border-[rgba(0,8,7,0.4)]"
          style={{ color: '#000807' }}
        >
          {t('ctaSecondary')}
        </Link>
      </div>
    </section>
  );
}
