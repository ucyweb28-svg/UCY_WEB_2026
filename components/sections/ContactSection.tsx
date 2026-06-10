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
  { label: 'Instagram', href: 'https://www.instagram.com/ucy_studio/' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/115831904/' },
  { label: 'Behance',   href: 'https://www.behance.net/yonathanchetrit3' },
];

const inputClass =
  'w-full rounded-xl border border-[rgba(0,8,7,0.12)] bg-white px-4 py-3 font-sans text-sm text-[#000807] placeholder:text-[rgba(0,8,7,0.35)] outline-none transition-colors duration-200 focus:border-[#3626A7]';

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
      <div className="max-w-7xl mx-auto px-6">

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
            className="font-heading font-extrabold text-4xl md:text-6xl leading-tight"
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
          <motion.form variants={fadeUp} onSubmit={handleSubmit} className="flex flex-col gap-5">
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
              <Button variant="whatsapp" href={whatsappFR} size="md" external className="self-start">
                {t('whatsapp_fr')}
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-bold text-lg" style={{ color: '#000807' }}>
                {t('address_jerusalem')}
              </h3>
              <Button variant="whatsapp" href={whatsappIL} size="md" external className="self-start">
                {t('whatsapp_il')}
              </Button>
            </div>

            <div className="flex gap-4 pt-6 border-t border-[rgba(0,8,7,0.08)]">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm font-medium transition-colors duration-200 hover:text-[#3626A7]"
                  style={{ color: 'rgba(0,8,7,0.5)' }}
                >
                  {label}
                </a>
              ))}
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
