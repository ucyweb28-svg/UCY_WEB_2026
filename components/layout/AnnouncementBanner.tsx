'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function AnnouncementBanner() {
  const t = useTranslations('banner');
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="relative z-[60] h-10 flex items-center justify-center px-6"
      style={{ backgroundColor: '#000807' }}
    >
      <p className="font-sans text-[11px] md:text-[13px] text-white text-center truncate pr-8">
        {t('text')}
      </p>
      <button
        onClick={() => {
          setVisible(false);
          window.dispatchEvent(new Event('banner-closed'));
        }}
        aria-label={t('close')}
        className="absolute right-6 top-1/2 -translate-y-1/2 flex-shrink-0 text-white opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer p-1 border-none bg-transparent"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="1" y1="1" x2="9" y2="9" />
          <line x1="9" y1="1" x2="1" y2="9" />
        </svg>
      </button>
    </div>
  );
}
