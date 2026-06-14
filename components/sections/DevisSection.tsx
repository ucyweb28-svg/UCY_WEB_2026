'use client';

import { Fragment, useEffect, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDiag } from '@/components/ui/ArrowDiag';
import { Badge } from '@/components/ui/Badge';
import { stagger, fadeUp } from '@/lib/utils/animations';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';
import {
  PRICING_PACKS,
  PRICING_OPTIONS,
  formatPrice,
  getPackPrice,
  getOptionPrice,
} from '@/lib/utils/pricing';

type Step = 1 | 2 | 3;
type Status = 'idle' | 'loading' | 'success' | 'error';

const PROJECT_TYPES = ['vitrine', 'ecommerce', 'branding', 'refonte', 'app', 'autre'];
const DELAYS = ['urgent', 'normal', 'flexible', 'unsure'];
const STEP_KEYS = ['step1_label', 'step2_label', 'step3_label'];
const CONDITION_COLORS = ['#3626A7', '#DF57BC', '#DE541E', '#3626A7', '#DF57BC'];

const inputClass =
  'font-sans w-full outline-none transition-colors duration-200 border-[1.5px] border-[#e4e1d8] focus:border-[#3626A7] focus:bg-white';
const inputStyle: CSSProperties = { backgroundColor: '#f8f7f3', borderRadius: 10, padding: '12px 14px', fontSize: 14, color: '#0a0a0f' };
const labelClass = 'font-sans font-bold uppercase tracking-wider block';
const labelStyle: CSSProperties = { fontSize: 11, color: 'rgba(10,10,15,.5)', marginBottom: 6 };

const gradientButton: CSSProperties = {
  background: 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)',
  backgroundSize: '300% 100%',
  animation: 'gradientShift 4s ease infinite',
  borderRadius: 100,
  color: 'white',
  fontSize: 14,
  padding: '14px 0',
  border: 'none',
};

function CheckIcon({ size = 14, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5l10 -10" />
    </svg>
  );
}

export function DevisSection() {
  const t = useTranslations('devis');
  const tp = useTranslations('pricing');
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>(1);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('');
  const [delay, setDelay] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    const packParam = searchParams.get('pack');
    const optionsParam = searchParams.get('options');

    if (packParam && PRICING_PACKS.some((p) => p.id === packParam)) {
      setSelectedPack(packParam);
    }
    if (optionsParam) {
      const ids = optionsParam.split(',').filter((id) => PRICING_OPTIONS.some((o) => o.id === id));
      setSelectedOptions(new Set(ids));
    }
  }, [searchParams]);

  const toggleOption = (id: string) => {
    if (!selectedPack) return;
    setSelectedOptions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedPackObj = PRICING_PACKS.find((pack) => pack.id === selectedPack) ?? null;
  const optionsTotal = Array.from(selectedOptions).reduce((sum, id) => {
    const option = PRICING_OPTIONS.find((o) => o.id === id);
    return option ? sum + getOptionPrice(option, 'EUR') : sum;
  }, 0);
  const total = selectedPackObj ? getPackPrice(selectedPackObj, 'EUR') + optionsTotal : 0;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const optionsLine = Array.from(selectedOptions)
      .map((id) => PRICING_OPTIONS.find((o) => o.id === id)?.nameKey)
      .filter((key): key is string => Boolean(key))
      .map((key) => tp(key))
      .join(', ');

    const summary = [
      `Pack: ${selectedPackObj ? tp(selectedPackObj.titleKey) : '-'}`,
      `Options: ${optionsLine || '-'}`,
      `Total: ${formatPrice(total, 'EUR')}`,
      `Entreprise: ${company || '-'}`,
      `Type de projet: ${projectType ? t(`project_type_${projectType}`) : '-'}`,
      `Délai: ${delay ? t(`delay_${delay}`) : '-'}`,
      '',
      message,
    ].join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          message: summary,
          source: 'devis',
        }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-14" style={{ backgroundColor: '#f5f3ee' }}>
      <div className="max-w-2xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
          style={{ marginBottom: 32 }}
        >
          <motion.div variants={fadeUp}>
            <Badge>{t('badge')}</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading"
            style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 900, color: '#0a0a0f', marginTop: 16, lineHeight: 1.2 }}
          >
            {t('headline_start')}
            <span
              style={{
                background: 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('headline_highlight')}
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="font-sans" style={{ color: 'rgba(10,10,15,0.5)', fontSize: 14, marginTop: 12 }}>
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Step indicator */}
        {status !== 'success' && (
          <div className="flex items-center justify-center" style={{ marginBottom: 32 }}>
            {([1, 2, 3] as const).map((n, i) => (
              <Fragment key={n}>
                <div className="flex flex-col items-center" style={{ width: 90 }}>
                  <div
                    className="flex items-center justify-center font-heading font-bold"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      fontSize: 13,
                      backgroundColor: step > n ? '#3626A7' : step === n ? '#0a0a0f' : 'transparent',
                      color: step >= n ? 'white' : 'rgba(10,10,15,.4)',
                      border: step < n ? '1px solid #e4e1d8' : 'none',
                    }}
                  >
                    {step > n ? <CheckIcon size={14} color="white" /> : n}
                  </div>
                  <span
                    className="font-sans text-center"
                    style={{
                      fontSize: 11,
                      marginTop: 8,
                      color: step >= n ? '#0a0a0f' : 'rgba(10,10,15,.4)',
                      fontWeight: step === n ? 700 : 500,
                    }}
                  >
                    {t(STEP_KEYS[i])}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    style={{
                      width: 80,
                      height: 1,
                      backgroundColor: step > n ? '#3626A7' : '#e4e1d8',
                      marginBottom: 22,
                    }}
                  />
                )}
              </Fragment>
            ))}
          </div>
        )}

        {/* Success state */}
        {status === 'success' ? (
          <div className="bg-white text-center" style={{ borderRadius: 18, padding: 48 }}>
            <div
              className="flex items-center justify-center mx-auto"
              style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #3626A7, #DF57BC)' }}
            >
              <CheckIcon size={24} color="white" />
            </div>
            <h2 className="font-heading font-extrabold" style={{ fontSize: 22, color: '#0a0a0f', marginTop: 20 }}>
              {t('success_title')}
            </h2>
            <p className="font-sans" style={{ fontSize: 14, color: 'rgba(10,10,15,.6)', marginTop: 12, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
              {t('success_text')}
            </p>
            <div className="flex items-center justify-center flex-wrap" style={{ gap: 12, marginTop: 24 }}>
              <a
                href={formatWhatsAppLink('fr')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-bold"
                style={{ backgroundColor: '#25D366', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 13 }}
              >
                {t('success_whatsapp_paris')}
              </a>
              <a
                href={formatWhatsAppLink('il')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-bold"
                style={{ backgroundColor: '#0a0a0f', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 13 }}
              >
                {t('success_whatsapp_jerusalem')}
              </a>
            </div>
          </div>
        ) : step === 1 ? (
          <div className="flex flex-col" style={{ gap: 16 }}>

            {/* Pack selector */}
            <div className="bg-white" style={{ border: '1px solid #e4e1d8', borderRadius: 18, padding: 28 }}>
              <h2 className="font-heading font-bold" style={{ fontSize: 18, color: '#0a0a0f' }}>
                {t('pack_title')}
              </h2>
              <p className="font-sans" style={{ fontSize: 13, color: 'rgba(10,10,15,.5)', marginTop: 4 }}>
                {t('pack_subtitle')}
              </p>

              {PRICING_PACKS.map((pack, i) => {
                const isSelected = selectedPack === pack.id;
                return (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => setSelectedPack(pack.id)}
                    className="flex items-center justify-between w-full text-left cursor-pointer"
                    style={{
                      padding: '16px 0',
                      background: 'none',
                      border: 'none',
                      borderTop: i === 0 ? 'none' : '1px solid #e4e1d8',
                    }}
                  >
                    <div className="flex items-center" style={{ gap: 12, minWidth: 0, flex: 1 }}>
                      <span
                        className="shrink-0"
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          border: isSelected ? '5px solid #3626A7' : '1.5px solid #e4e1d8',
                          backgroundColor: 'white',
                        }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <p className="font-heading font-bold" style={{ fontSize: 14, color: '#0a0a0f' }}>
                          {tp(pack.titleKey)}
                        </p>
                        <p className="font-sans" style={{ fontSize: 12, color: 'rgba(10,10,15,.5)' }}>
                          {tp(pack.taglineKey)}
                        </p>
                      </div>
                    </div>
                    <span className="font-heading font-bold whitespace-nowrap shrink-0" style={{ fontSize: 16, color: '#0a0a0f', marginLeft: 12 }}>
                      {formatPrice(getPackPrice(pack, 'EUR'), 'EUR')}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Options selector */}
            <div
              className="bg-white"
              style={{ border: '1px solid #e4e1d8', borderRadius: 18, padding: 28, opacity: selectedPack ? 1 : 0.55, transition: 'opacity 0.2s ease' }}
            >
              <h2 className="font-heading font-bold" style={{ fontSize: 18, color: '#0a0a0f' }}>
                {t('options_title')}
              </h2>
              <p className="font-sans" style={{ fontSize: 13, color: 'rgba(10,10,15,.5)', marginTop: 4, marginBottom: 20 }}>
                {selectedPack ? t('options_subtitle_selected') : t('options_subtitle_empty')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10 }}>
                {PRICING_OPTIONS.map((option) => {
                  const checked = selectedOptions.has(option.id);
                  const price = getOptionPrice(option, 'EUR');
                  const priceLabel = `${option.hasFromPrefix ? `${tp('price_from_prefix')} ` : ''}+${formatPrice(price, 'EUR')}`;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={!selectedPack}
                      onClick={() => toggleOption(option.id)}
                      className="flex flex-col text-left rounded-xl transition-colors duration-200"
                      style={{
                        padding: 14,
                        border: checked ? '1px solid #DF57BC' : '1px solid #e4e1d8',
                        backgroundColor: checked ? '#DF57BC0a' : 'transparent',
                        cursor: selectedPack ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <div className="flex items-center" style={{ gap: 12 }}>
                        <span
                          className="flex items-center justify-center rounded-[5px] shrink-0"
                          style={{
                            width: 20,
                            height: 20,
                            backgroundColor: checked ? '#DF57BC' : 'transparent',
                            border: checked ? '1px solid #DF57BC' : '1px solid #e4e1d8',
                          }}
                        >
                          {checked && <CheckIcon size={13} color="white" />}
                        </span>
                        <span className="font-sans font-bold flex-1" style={{ fontSize: 13, color: '#0a0a0f' }}>
                          {tp(option.nameKey)}
                        </span>
                        <span className="font-sans font-semibold" style={{ fontSize: 13, color: '#DF57BC', whiteSpace: 'nowrap' }}>
                          {priceLabel}
                        </span>
                      </div>
                      <p className="font-sans" style={{ fontSize: 12, color: 'rgba(10,10,15,.5)', lineHeight: 1.5, marginTop: 6 }}>
                        {tp(option.pitchKey)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total recap */}
            <div style={{ background: 'linear-gradient(135deg, rgba(54,38,167,.14) 0%, rgba(223,87,188,.10) 100%)', border: '1px solid #DF57BC33', borderRadius: 18, padding: 28 }}>
              <p className="font-sans uppercase font-semibold" style={{ fontSize: 11, letterSpacing: '0.15em', color: '#3626A7', marginBottom: 16 }}>
                {t('recap_label')}
              </p>

              {!selectedPackObj ? (
                <p className="text-center font-sans" style={{ fontSize: 14, color: 'rgba(10,10,15,.4)' }}>
                  {t('recap_empty')}
                </p>
              ) : (
                <>
                  <div className="flex items-center justify-between font-sans" style={{ fontSize: 14, color: '#0a0a0f', padding: '10px 0', borderBottom: '1px solid rgba(10,10,15,.08)' }}>
                    <span>{tp(selectedPackObj.titleKey)}</span>
                    <span style={{ fontWeight: 700 }}>{formatPrice(getPackPrice(selectedPackObj, 'EUR'), 'EUR')}</span>
                  </div>

                  {selectedOptions.size > 0 && (
                    <div className="flex items-center justify-between font-sans" style={{ fontSize: 13, color: 'rgba(10,10,15,.6)', padding: '10px 0', borderBottom: '1px solid rgba(10,10,15,.08)' }}>
                      <span>{selectedOptions.size === 1 ? t('recap_options_one') : t('recap_options_other', { count: selectedOptions.size })}</span>
                      <span>+{formatPrice(optionsTotal, 'EUR')}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between" style={{ padding: '16px 0' }}>
                    <span className="font-heading font-bold" style={{ fontSize: 15, color: '#0a0a0f' }}>
                      {t('recap_total_label')}
                    </span>
                    <span className="font-heading" style={{ fontSize: 26, fontWeight: 900, color: '#0a0a0f' }}>
                      {formatPrice(total, 'EUR')}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Next button */}
            <button
              type="button"
              disabled={!selectedPack}
              onClick={() => setStep(2)}
              className="flex items-center justify-center font-heading font-semibold w-full"
              style={{ ...gradientButton, opacity: selectedPack ? 1 : 0.4, cursor: selectedPack ? 'pointer' : 'not-allowed' }}
            >
              {t('step1_next')}
              <ArrowDiag size={12} className="inline ml-1" />
            </button>
          </div>
        ) : step === 2 ? (
          <div className="flex flex-col" style={{ gap: 16 }}>

            {/* Conditions */}
            <div className="bg-white" style={{ border: '1px solid #e4e1d8', borderRadius: 18, padding: 28 }}>
              {[1, 2, 3, 4, 5].map((n, i) => (
                <div key={n} style={{ borderLeft: `3px solid ${CONDITION_COLORS[i]}`, paddingLeft: 16, marginBottom: i < 4 ? 20 : 0 }}>
                  <h3 className="font-heading font-bold" style={{ fontSize: 14, color: '#0a0a0f' }}>
                    {t(`cond_title${n}`)}
                  </h3>
                  <p className="font-sans" style={{ fontSize: 13, color: 'rgba(10,10,15,.6)', marginTop: 4, lineHeight: 1.6 }}>
                    {t(`cond_text${n}`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Info box */}
            <div style={{ backgroundColor: '#3626A714', border: '1px solid #3626A733', borderRadius: 14, padding: 16 }}>
              <p className="font-sans" style={{ fontSize: 13, color: '#3626A7', lineHeight: 1.6 }}>
                {t('cond_info')}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex" style={{ gap: 12 }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 flex items-center justify-center font-heading font-semibold"
                style={{ background: 'transparent', border: '1px solid #e4e1d8', borderRadius: 100, color: '#0a0a0f', fontSize: 14, padding: '14px 0', cursor: 'pointer' }}
              >
                {t('step2_back')}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-[2] flex items-center justify-center font-heading font-semibold"
                style={{ ...gradientButton, cursor: 'pointer' }}
              >
                {t('step2_accept')}
                <ArrowDiag size={12} className="inline ml-1" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 16 }}>

            {/* Form */}
            <div className="bg-white" style={{ border: '1px solid #e4e1d8', borderRadius: 18, padding: 28 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
                <div>
                  <label className={labelClass} style={labelStyle}>{t('firstname_label')}</label>
                  <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t('firstname_placeholder')} className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>{t('lastname_label')}</label>
                  <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={t('lastname_placeholder')} className={inputClass} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <label className={labelClass} style={labelStyle}>{t('email_label')}</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('email_placeholder')} className={inputClass} style={inputStyle} />
              </div>

              <div style={{ marginTop: 16 }}>
                <label className={labelClass} style={labelStyle}>{t('phone_label')}</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('phone_placeholder')} className={inputClass} style={inputStyle} />
              </div>

              <div style={{ marginTop: 16 }}>
                <label className={labelClass} style={labelStyle}>{t('company_label')}</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder={t('company_placeholder')} className={inputClass} style={inputStyle} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16, marginTop: 16 }}>
                <div>
                  <label className={labelClass} style={labelStyle}>{t('project_type_label')}</label>
                  <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className={inputClass} style={inputStyle}>
                    <option value="">{t('project_type_placeholder')}</option>
                    {PROJECT_TYPES.map((id) => (
                      <option key={id} value={id}>{t(`project_type_${id}`)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>{t('delay_label')}</label>
                  <select value={delay} onChange={(e) => setDelay(e.target.value)} className={inputClass} style={inputStyle}>
                    <option value="">{t('delay_placeholder')}</option>
                    {DELAYS.map((id) => (
                      <option key={id} value={id}>{t(`delay_${id}`)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <label className={labelClass} style={labelStyle}>{t('message_label')}</label>
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t('message_placeholder')} className={inputClass} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
            </div>

            {/* Mini recap */}
            <div className="bg-white" style={{ border: '1px solid #e4e1d8', borderRadius: 14, padding: 20 }}>
              <p className="font-sans uppercase font-semibold" style={{ fontSize: 11, letterSpacing: '0.15em', color: '#3626A7', marginBottom: 12 }}>
                {t('mini_recap_label')}
              </p>
              {selectedPackObj && (
                <div className="flex items-center justify-between font-sans" style={{ fontSize: 13, color: '#0a0a0f', padding: '6px 0' }}>
                  <span>{tp(selectedPackObj.titleKey)}</span>
                  <span style={{ fontWeight: 700 }}>{formatPrice(getPackPrice(selectedPackObj, 'EUR'), 'EUR')}</span>
                </div>
              )}
              {Array.from(selectedOptions).map((id) => {
                const option = PRICING_OPTIONS.find((o) => o.id === id);
                if (!option) return null;
                return (
                  <div key={id} className="flex items-center justify-between font-sans" style={{ fontSize: 12, color: 'rgba(10,10,15,.6)', padding: '6px 0' }}>
                    <span>{tp(option.nameKey)}</span>
                    <span>+{formatPrice(getOptionPrice(option, 'EUR'), 'EUR')}</span>
                  </div>
                );
              })}
              <div className="flex items-center justify-between" style={{ paddingTop: 10, marginTop: 8, borderTop: '1px solid rgba(10,10,15,.08)' }}>
                <span className="font-heading font-bold" style={{ fontSize: 14, color: '#0a0a0f' }}>
                  {t('recap_total_label')}
                </span>
                <span className="font-heading font-bold" style={{ fontSize: 18, color: '#0a0a0f' }}>
                  {formatPrice(total, 'EUR')}
                </span>
              </div>
            </div>

            {/* Back button */}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center justify-center font-heading font-semibold w-full"
              style={{ background: 'transparent', border: '1px solid #e4e1d8', borderRadius: 100, color: '#0a0a0f', fontSize: 14, padding: '14px 0', cursor: 'pointer' }}
            >
              {t('step3_back')}
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center font-heading font-semibold w-full"
              style={{ ...gradientButton, cursor: status === 'loading' ? 'wait' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? (
                t('submit_loading')
              ) : (
                <>
                  {t('submit')}
                  <ArrowDiag size={12} className="inline ml-1" />
                </>
              )}
            </button>

            {status === 'error' && (
              <p className="text-center font-sans" style={{ fontSize: 13, color: '#DE541E' }}>
                {t('submit_error')}
              </p>
            )}

            <p className="text-center font-sans" style={{ fontSize: 12, color: 'rgba(10,10,15,.5)' }}>
              {t('submit_note')}
            </p>
          </form>
        )}

      </div>
    </section>
  );
}
