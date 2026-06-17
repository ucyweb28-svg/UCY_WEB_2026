'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { X } from '@phosphor-icons/react';

export function AnnouncementBanner() {
  const t = useTranslations('banner');
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  const isStays = (pathname ?? '').split('/').includes('stays');

  if (isStays) return null;
  if (!visible) return null;

  return (
    <div
      className="relative z-[60] h-10 flex items-center justify-center px-6"
      style={{ backgroundColor: '#000807' }}
    >
      <p className="font-sans text-[11px] md:text-[13px] text-white text-center truncate pr-8">
        {isStays ? t('stays') : t('studio')}
      </p>
      <button
        onClick={() => {
          setVisible(false);
          window.dispatchEvent(new Event('banner-closed'));
        }}
        aria-label={t('close')}
        className="absolute right-6 top-1/2 -translate-y-1/2 flex-shrink-0 text-white opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer p-1 border-none bg-transparent"
      >
        <X size={12} weight="bold" />
      </button>
    </div>
  );
}
