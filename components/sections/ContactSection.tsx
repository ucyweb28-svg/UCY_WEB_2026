'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { stagger, fadeUp } from '@/lib/utils/animations';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL_FORM: ContactFormData = { firstName: '', lastName: '', email: '', phone: '', message: '' };

type Status = 'idle' | 'loading' | 'success' | 'error';

const BULLETS = [
  { title: 'bullet1_title', sub: 'bullet1_sub' },
  { title: 'bullet2_title', sub: 'bullet2_sub' },
  { title: 'bullet3_title', sub: 'bullet3_sub' },
  { title: 'bullet4_title', sub: 'bullet4_sub' },
] as const;

const inputClass =
  'w-full px-[14px] py-3 bg-[#f8f8f6] border-[1.5px] border-[#e8e8e4] rounded-[10px] font-sans text-sm text-[#0a0a0a] outline-none transition-colors duration-200 focus:border-[#3626A7] focus:bg-white';

const labelClass = 'block font-sans text-[11px] font-bold uppercase tracking-wider text-[#0a0a0a] mb-2';

function WhatsAppIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 448 512" fill={color} aria-hidden="true">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

function WhatsAppCard({
  flag,
  city,
  sub,
  label,
  href,
}: {
  flag: string;
  city: string;
  sub: string;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-card group block bg-white border-[1.5px] border-[#e8e8e4] rounded-[14px] px-4 py-[18px] text-center transition-colors duration-200 hover:border-[#3626A7]"
    >
      <div className="flex justify-center mb-2">
        <WhatsAppIcon size={28} color="#25D366" />
      </div>
      <div className="mb-1 text-xl">{flag}</div>
      <p className="font-sans font-bold text-[13px]" style={{ color: '#0a0a0a' }}>
        {city}
      </p>
      <p className="font-sans mb-[10px] text-[10px]" style={{ color: 'rgba(0,0,0,0.4)' }}>
        {sub}
      </p>
      <span className="whatsapp-card-btn block w-full font-sans text-[11px] font-bold text-white py-[7px] px-[14px] rounded-full">
        {label}
      </span>
    </a>
  );
}

export function ContactSection() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      setFormData(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  };

  const whatsappFR = formatWhatsAppLink(
    'fr',
    'Bonjour%20UCY%20Studio%2C%20j%27ai%20un%20projet%20%C3%A0%20vous%20soumettre'
  );
  const whatsappIL = formatWhatsAppLink(
    'il',
    'Bonjour%20UCY%20Studio%2C%20j%27ai%20un%20projet%20%C3%A0%20vous%20soumettre'
  );

  return (
    <section className="bg-[#f8f8f6] min-h-screen pt-12 pb-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 lg:gap-16 items-start">

        {/* Left column */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="lg:sticky lg:top-8">
          <motion.span
            variants={fadeUp}
            className="inline-block rounded-full font-sans font-semibold uppercase tracking-widest mb-5"
            style={{ fontSize: 10, color: '#3626A7', border: '1px solid rgba(54,38,167,0.2)', padding: '4px 12px' }}
          >
            {t('badge')}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold mb-3"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', lineHeight: 1.15, color: '#0a0a0a' }}
          >
            {t('title_start')}
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('title_highlight')}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-sans mb-8"
            style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(0,0,0,0.5)' }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-4 mb-6">
            {BULLETS.map((bullet) => (
              <div key={bullet.title} className="flex items-start gap-3">
                <span
                  className="shrink-0 flex items-center justify-center rounded-full font-sans text-[11px] font-bold"
                  style={{
                    width: 20,
                    height: 20,
                    marginTop: 2,
                    backgroundColor: 'rgba(54,38,167,0.1)',
                    border: '1px solid rgba(54,38,167,0.2)',
                    color: '#3626A7',
                  }}
                >
                  ✓
                </span>
                <div>
                  <p className="font-sans font-bold text-sm" style={{ color: '#0a0a0a' }}>
                    {t(bullet.title)}
                  </p>
                  <p className="font-sans mt-0.5" style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)' }}>
                    {t(bullet.sub)}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="my-6" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }} />

          <motion.div variants={fadeUp} className="grid grid-cols-2 max-[374px]:grid-cols-1 gap-[10px]">
            <WhatsAppCard
              flag="🇫🇷"
              city={t('city_paris')}
              sub={t('city_paris_sub')}
              label={t('whatsapp_fr')}
              href={whatsappFR}
            />
            <WhatsAppCard
              flag="🇮🇱"
              city={t('city_jerusalem')}
              sub={t('city_jerusalem_sub')}
              label={t('whatsapp_il')}
              href={whatsappIL}
            />
          </motion.div>
        </motion.div>

        {/* Right column — form card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-[20px] p-6 md:p-9"
          style={{ border: '1px solid #e8e8e4', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className={labelClass}>
                  {t('first_name')}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>
                  {t('last_name')}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                {t('email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                {t('phone')}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} h-[120px] resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full font-sans text-white text-sm font-bold mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7, #DF57BC, #DE541E)',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 4s ease infinite',
                padding: '14px 28px',
                borderRadius: '100px',
                border: 'none',
              }}
            >
              {status === 'loading' ? t('loading') : t('submit')}
            </button>

            {status === 'success' && (
              <p
                className="flex items-center justify-center gap-2 font-sans text-sm font-semibold"
                style={{ color: '#1D9E75' }}
              >
                <span aria-hidden>✓</span> {t('success')}
              </p>
            )}
            {status === 'error' && (
              <p className="text-center font-sans text-sm" style={{ color: '#DE541E' }}>
                {t('error')}
              </p>
            )}

            <p className="text-center font-sans" style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)' }}>
              {t('note')}
            </p>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
