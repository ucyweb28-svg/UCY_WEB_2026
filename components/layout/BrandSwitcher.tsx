'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface BrandSwitcherProps {
  onDark?: boolean;
}

export function BrandSwitcher({ onDark = false }: BrandSwitcherProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const isStays = (pathname ?? '').split('/').includes('stays');

  const studioHref = locale === 'en' ? '/en' : '/';
  const staysHref = locale === 'en' ? '/en/stays' : '/stays';

  const segments = [
    { label: 'Studio', active: !isStays, href: studioHref },
    { label: 'Stays', active: isStays, href: staysHref },
  ];

  return (
    <div
      className="inline-flex items-center shrink-0 transition-all duration-300"
      style={{
        border: onDark
          ? '0.5px solid rgba(251,249,255,0.28)'
          : '0.5px solid rgba(0,8,7,0.09)',
        borderRadius: 20,
        padding: 2,
        gap: 1,
        backgroundColor: onDark
          ? 'rgba(251,249,255,0.08)'
          : 'rgba(0,8,7,0.03)',
      }}
      role="group"
      aria-label="Changer de marque"
    >
      {segments.map(({ label, active, href }) => (
        <button
          key={label}
          type="button"
          onClick={() => { if (!active) router.push(href); }}
          className={`${isStays ? 'font-trap' : 'font-sans'} transition-all duration-300`}
          style={{
            borderRadius: 20,
            padding: '3px 9px',
            fontSize: 11,
            fontWeight: active ? 600 : 400,
            color: active
              ? (onDark ? '#FBF9FF' : '#000807')
              : (onDark ? 'rgba(251,249,255,0.40)' : 'rgba(0,8,7,0.35)'),
            backgroundColor: active
              ? (onDark ? 'rgba(251,249,255,0.18)' : 'rgba(223,87,188,0.14)')
              : 'transparent',
            cursor: active ? 'default' : 'pointer',
            border: 'none',
            lineHeight: 1.5,
          }}
          aria-current={active ? 'page' : undefined}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
