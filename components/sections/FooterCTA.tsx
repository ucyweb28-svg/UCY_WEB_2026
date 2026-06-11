'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function FooterCTA() {
  const t = useTranslations('footer_cta');
  const needs = t.raw('needs') as string[];

  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Prospect CTA',
          email,
          message: `Besoin: ${selectedNeeds.join(', ') || 'Non précisé'}`,
          source: 'CTA Section',
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error('FooterCTA submit error:', error);
      setLoading(false);
    }
  };

  const buttonLabel = loading ? t('btn_loading') : submitted ? t('btn_sent') : t('btn_default');

  return (
    <section id="contact" className="py-16 px-6" style={{ backgroundColor: '#f2f0eb' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-stretch overflow-hidden"
          style={{ borderRadius: 24, minHeight: 240 }}
        >
          {/* Background layers */}
          <Image
            src="/images/cta-bg-texture.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(125deg, #0d0520 0%, rgba(54,38,167,0.85) 50%, rgba(222,84,30,0.6) 100%)',
            }}
          />

          {/* Content */}
          <div
            className="relative z-10 flex flex-col md:flex-row items-center w-full flex-wrap px-6 py-8 md:px-[52px] md:py-[44px] gap-6 md:gap-10"
          >
            {/* Left side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 min-w-0 w-full md:w-auto"
            >
              <p
                className="font-sans font-bold uppercase"
                style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', marginBottom: 12 }}
              >
                {t('kicker')}
              </p>
              <h2
                className="font-heading font-black md:whitespace-nowrap"
                style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', color: 'white', lineHeight: 1.1, marginBottom: 8 }}
              >
                {t('headline_start')}
                <span style={{ color: '#DF57BC' }}>{t('headline_highlight')}</span>
              </h2>
              <p className="font-sans md:whitespace-nowrap" style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                {t('sub')}
              </p>
            </motion.div>

            {/* Vertical divider */}
            <div
              className="hidden md:block self-stretch flex-shrink-0"
              style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            />

            {/* Right side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col w-full md:w-[290px] flex-shrink-0"
              style={{ gap: 10 }}
            >
              <p
                className="font-sans font-bold uppercase"
                style={{ fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}
              >
                {t('needs_label')}
              </p>

              <div className="flex flex-wrap" style={{ gap: 6 }}>
                {needs.map((need) => {
                  const isSelected = selectedNeeds.includes(need);
                  return (
                    <motion.button
                      key={need}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleNeed(need)}
                      className="font-sans transition-colors duration-200 cursor-pointer"
                      style={{
                        fontSize: 11,
                        padding: '5px 11px',
                        borderRadius: 20,
                        border: isSelected ? '1px solid #DF57BC' : '1px solid rgba(255,255,255,0.2)',
                        backgroundColor: isSelected ? 'rgba(223,87,188,0.25)' : 'transparent',
                        color: isSelected ? 'white' : 'rgba(255,255,255,0.55)',
                      }}
                    >
                      {need}
                    </motion.button>
                  );
                })}
              </div>

              <div
                className="flex overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder={t('placeholder')}
                  className="flex-1 bg-transparent border-none outline-none font-sans"
                  style={{ color: 'white', fontSize: 13, padding: '11px 14px' }}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="font-sans font-bold whitespace-nowrap cursor-pointer"
                  style={{ backgroundColor: 'white', color: '#0a0a0a', border: 'none', padding: '11px 16px', fontSize: 13 }}
                >
                  {buttonLabel}
                </button>
              </div>

              <p className="font-sans text-center" style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
                {t('note')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
