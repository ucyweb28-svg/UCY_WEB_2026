'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function AnnouncementBanner() {
  const t = useTranslations('banner');
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const text = t('text');
  const highlight = t('highlight');
  const rest = text.startsWith(highlight) ? text.slice(highlight.length) : text;

  return (
    <div
      className="relative z-[60] h-10 flex items-center justify-center px-6"
      style={{ backgroundColor: '#000807' }}
    >
      <p className="font-sans text-[11px] md:text-[13px] text-white text-center truncate pr-8">
        <span className="font-bold" style={{ color: '#3626A7' }}>
          {highlight}
        </span>
        {rest}
      </p>
      <button
        onClick={() => setVisible(false)}
        aria-label={t('close')}
        className="absolute right-6 top-1/2 -translate-y-1/2 flex-shrink-0 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
      >
        ×
      </button>
    </div>
  );
}
