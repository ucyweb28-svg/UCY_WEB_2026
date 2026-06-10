'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { stagger, fadeUp } from '@/lib/utils/animations';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL_FORM: ContactFormData = { name: '', email: '', phone: '', message: '' };

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ucy_studio/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/115831904/',
    path: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z',
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/yonathanchetrit3',
    path: 'M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z',
  },
] as const;

function SocialIcon({ path, size = 20 }: { path: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

const inputClass =
  'w-full rounded-xl border-none bg-[#F5F5F7] p-4 font-sans text-sm text-[#000807] placeholder:text-[rgba(0,8,7,0.35)] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-[#3626A7]';

type Status = 'idle' | 'loading' | 'success' | 'error';

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
        body: JSON.stringify(formData),
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
    <section className="pt-28 pb-16 md:pt-36 md:pb-32" style={{ backgroundColor: '#FBF9FF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-4 mb-16 max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <Badge>{t('badge')}</Badge>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-heading font-extrabold text-4xl md:text-6xl leading-[1.05]"
            style={{ color: '#000807' }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-sans text-base md:text-lg leading-relaxed"
            style={{ color: 'rgba(0,8,7,0.6)' }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Form + info */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
        >
          {/* Form */}
          <motion.form variants={fadeUp} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-sans text-sm font-medium" style={{ color: '#000807' }}>
                {t('name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-sans text-sm font-medium" style={{ color: '#000807' }}>
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

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-sans text-sm font-medium" style={{ color: '#000807' }}>
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

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-sans text-sm font-medium" style={{ color: '#000807' }}>
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-y`}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'loading'}
              className="w-full sm:w-auto"
            >
              {status === 'loading' ? t('loading') : t('submit')}
            </Button>

            {status === 'success' && (
              <p className="font-sans text-sm" style={{ color: '#3626A7' }}>
                {t('success')}
              </p>
            )}
            {status === 'error' && (
              <p className="font-sans text-sm" style={{ color: '#DE541E' }}>
                {t('error')}
              </p>
            )}
          </motion.form>

          {/* Info column */}
          <motion.div variants={fadeUp} className="flex flex-col gap-10">

            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-bold text-lg" style={{ color: '#000807' }}>
                {t('address_paris')}
              </h3>
              <Button variant="whatsapp-outline" href={whatsappFR} size="md" external className="self-start">
                <WhatsAppIcon />
                {t('whatsapp_fr')}
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-bold text-lg" style={{ color: '#000807' }}>
                {t('address_jerusalem')}
              </h3>
              <Button variant="whatsapp-outline" href={whatsappIL} size="md" external className="self-start">
                <WhatsAppIcon />
                {t('whatsapp_il')}
              </Button>
            </div>

            <div className="flex gap-6 items-center pt-6 border-t border-[rgba(0,8,7,0.08)]">
              {SOCIAL_LINKS.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors duration-200 hover:text-[#3626A7]"
                  style={{ color: 'rgba(0,8,7,0.5)' }}
                >
                  <SocialIcon path={path} />
                </a>
              ))}
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
