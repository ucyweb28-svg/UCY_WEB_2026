'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';

const NAV_LINKS = [
  { key: 'services' as const, href: '#services' },
  { key: 'portfolio' as const, href: '#portfolio' },
  { key: 'about' as const, href: '#about' },
  { key: 'contact' as const, href: '#contact' },
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappHref = formatWhatsAppLink(
    'fr',
    'Bonjour%20UCY%20Studio%2C%20je%20voudrais%20d%C3%A9marrer%20un%20projet'
  );

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-black/10'
          : 'bg-bg border-b border-transparent',
      ].join(' ')}
    >
      {/* Main bar */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5 select-none">
          <span className="font-heading text-xl font-extrabold text-black tracking-tight leading-none">
            {t('logo')}
          </span>
          <span className="font-sans text-sm font-normal text-black/60 leading-none">
            {t('logo_suffix')}
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="font-sans text-sm font-medium text-black hover:text-accent transition-colors duration-200"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Desktop CTA + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            href={whatsappHref}
            size="md"
            external
            className="hidden md:inline-flex text-sm"
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
            className="md:hidden overflow-hidden border-t border-black/10 bg-bg"
          >
            <div className="px-6 pt-6 pb-8 flex flex-col gap-6">
              {NAV_LINKS.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-base font-medium text-black hover:text-accent transition-colors duration-200"
                >
                  {t(key)}
                </a>
              ))}
              <Button
                variant="primary"
                href={whatsappHref}
                size="lg"
                external
                className="w-full justify-center mt-2"
              >
                {t('cta')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
