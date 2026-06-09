'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

const NAV_LINKS = [
  { key: 'services', href: '#services' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
] as const;

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/ucy_studio/' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/115831904/' },
  { label: 'Behance',   href: 'https://www.behance.net/yonathanchetrit3' },
];

export function Footer() {
  const tNav    = useTranslations('nav');
  const tFooter = useTranslations('footer');

  return (
    <footer style={{ backgroundColor: '#000807', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">

        {/* Top: logo + links + social */}
        <div
          className="flex flex-col md:flex-row justify-between gap-10 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-baseline gap-1.5">
              <span className="font-heading text-xl font-extrabold tracking-tight" style={{ color: 'white' }}>
                {tNav('logo')}
              </span>
              <span className="font-sans text-sm font-normal" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {tNav('logo_suffix')}
              </span>
            </Link>
            <p
              className="font-sans text-sm leading-relaxed max-w-[220px]"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Design &amp; développement digital haut de gamme.
            </p>
          </div>

          {/* Nav links + Social links */}
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  {tNav(key)}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div
          className="flex flex-col sm:flex-row gap-6 py-8"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {tFooter('address_paris')}
          </p>
          <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {tFooter('address_jlm')}
          </p>
        </div>

        {/* Bottom: copyright + legal */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-8">
          <p className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {tFooter('copyright')}
          </p>
          <a
            href="#"
            className="font-sans text-xs text-white/20 hover:text-white/50 transition-colors duration-200"
          >
            {tFooter('legal')}
          </a>
        </div>

      </div>
    </footer>
  );
}
