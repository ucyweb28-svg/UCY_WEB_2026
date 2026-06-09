'use client';

import { useTranslations } from 'next-intl';

const BRANDS = ['Maison Éclat', 'Daniella Studio', 'Nexus Capital', 'Aurora Media'];

export function TrustStrip() {
  const t = useTranslations('trust');

  // Duplicated for seamless CSS marquee loop
  const items = [...BRANDS, ...BRANDS];

  return (
    <section
      className="py-12 overflow-hidden"
      style={{
        backgroundColor: '#FBF9FF',
        borderTop: '1px solid rgba(0,8,7,0.07)',
        borderBottom: '1px solid rgba(0,8,7,0.07)',
      }}
    >
      {/* Label */}
      <p
        className="text-center font-sans text-xs font-medium uppercase tracking-widest mb-8"
        style={{ color: 'rgba(0,8,7,0.35)' }}
      >
        {t('label')}
      </p>

      {/* Scrolling track */}
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #FBF9FF, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #FBF9FF, transparent)' }}
        />

        <div
          className="flex items-center"
          style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}
        >
          {items.map((brand, i) => (
            <span key={i} className="flex items-center flex-shrink-0">
              <span
                className="font-heading font-extrabold text-2xl md:text-3xl whitespace-nowrap px-8"
                style={{ color: '#000807' }}
              >
                {brand}
              </span>
              <span className="text-lg flex-shrink-0" style={{ color: '#3626A7' }}>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
