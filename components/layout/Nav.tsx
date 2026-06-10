'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';
import { gradientText } from '@/lib/utils/gradientText';

const NAV_LINKS = [
  { key: 'services' as const, href: '#services' },
  { key: 'portfolio' as const, href: '#portfolio' },
  { key: 'about' as const, href: '#about' },
  { key: 'contact' as const, href: '/contact' },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-[18px] flex flex-col justify-between">
      <motion.span
        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="block h-[1.5px] w-full bg-current rounded-full origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-[1.5px] w-full bg-current rounded-full"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="block h-[1.5px] w-full bg-current rounded-full origin-center"
      />
    </div>
  );
}

export function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const isContactPage = pathname?.endsWith('/contact') ?? false;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      if (currentY > prevScrollY.current && currentY > 10) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      prevScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappHref = formatWhatsAppLink(
    'fr',
    'Bonjour%20UCY%20Studio%2C%20je%20voudrais%20d%C3%A9marrer%20un%20projet'
  );

  return (
    <header
      className="bg-white/95 backdrop-blur-md border-b border-black/10"
      style={{
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 300ms ease, background-color 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease',
      }}
    >
      {/* Main bar */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5 select-none">
          <span className={`font-heading text-xl font-extrabold tracking-tight leading-none ${gradientText}`}>
            {t('logo')}
          </span>
          <span className="font-sans text-sm font-normal text-black/60 leading-none">
            {t('logo_suffix')}
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {NAV_LINKS.map(({ key, href }) => {
            const isActive = key === 'contact' && isContactPage;
            return (
              <a
                key={key}
                href={href}
                className={[
                  'font-sans text-sm transition-colors duration-200',
                  isActive
                    ? 'font-semibold text-accent'
                    : 'font-medium text-black hover:text-accent',
                ].join(' ')}
              >
                {t(key)}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            href={whatsappHref}
            size="md"
            external
            className="hidden md:flex shrink-0 whitespace-nowrap [-webkit-appearance:none]"
          >
            {t('cta')}
          </Button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 -mr-2 text-black cursor-pointer"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-black/10 bg-white/95 backdrop-blur-md"
          >
            <div className="px-6 pt-6 pb-8 flex flex-col gap-6">
              {NAV_LINKS.map(({ key, href }) => {
                const isActive = key === 'contact' && isContactPage;
                return (
                  <a
                    key={key}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={[
                      'font-sans text-base transition-colors duration-200',
                      isActive
                        ? 'font-semibold text-accent'
                        : 'font-medium text-black hover:text-accent',
                    ].join(' ')}
                  >
                    {t(key)}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
