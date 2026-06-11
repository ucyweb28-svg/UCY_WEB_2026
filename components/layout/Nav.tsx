'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { formatWhatsAppLink } from '@/lib/utils/formatWhatsAppLink';
import { gradientText } from '@/lib/utils/gradientText';
import { stagger, fadeUp } from '@/lib/utils/animations';

const NAV_LINKS = [
  { key: 'services' as const, href: '/#services' },
  { key: 'portfolio' as const, href: '/#portfolio' },
  { key: 'about' as const, href: '/#about' },
  { key: 'contact' as const, href: '/contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ucy_studio/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/115831904/',
    path: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z',
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/yonathanchetrit3',
    path: 'M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z',
  },
] as const;

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

function SocialIcon({ path, size = 22 }: { path: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function LocaleSwitch({
  locale,
  onSwitch,
  size = 'lg',
}: {
  locale: string;
  onSwitch: () => void;
  size?: 'sm' | 'lg';
}) {
  const isLarge = size === 'lg';
  return (
    <div
      className="inline-flex items-center"
      style={{ border: '1px solid #e0e0e0', borderRadius: 20, padding: isLarge ? 4 : 3, gap: 2 }}
    >
      {(['fr', 'en'] as const).map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            onClick={() => {
              if (!isActive) onSwitch();
            }}
            className="font-sans font-semibold transition-colors duration-200 cursor-pointer"
            style={{
              borderRadius: 20,
              padding: isLarge ? '8px 20px' : '4px 12px',
              fontSize: isLarge ? 16 : 12,
              backgroundColor: isActive ? '#3626A7' : 'transparent',
              color: isActive ? '#ffffff' : '#888888',
            }}
            aria-label={`Switch language to ${loc.toUpperCase()}`}
          >
            {loc.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export function Nav() {
  const t = useTranslations('nav');
  const tHero = useTranslations('hero');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isContactPage = pathname?.endsWith('/contact') ?? false;
  const isHomePage = pathname === '/' || pathname === '/en';
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

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith('/#')) {
      e.preventDefault();
      const id = href.slice(2);
      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const switchLocale = () => {
    const nextLocale = locale === 'fr' ? 'en' : 'fr';

    // Save current scroll position
    const scrollY = window.scrollY;

    // Build new path
    const segments = (pathname ?? '/').split('/');
    if (segments[1] === 'fr' || segments[1] === 'en') {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    const newPath = segments.join('/') || '/';

    // Navigate then restore scroll
    router.push(newPath);

    // Restore scroll after navigation
    setTimeout(() => {
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    }, 100);
  };

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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5 select-none">
          <span className={`font-heading text-xl font-extrabold tracking-tight leading-none ${gradientText}`}>
            {t('logo')}
          </span>
          <span className="font-sans text-sm font-normal text-black/60 leading-none">
            {t('logo_suffix')}
          </span>
        </Link>

        {/* Desktop links + language switcher */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8" aria-label="Navigation principale">
            {NAV_LINKS.map(({ key, href }) => {
              const isActive = key === 'contact' && isContactPage;
              return (
                <a
                  key={key}
                  href={href}
                  onClick={(e) => handleAnchorClick(e, href)}
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

          <LocaleSwitch locale={locale} onSwitch={switchLocale} size="sm" />
        </div>

        {/* Desktop CTA + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex shrink-0">
            <Button
              variant="primary"
              href={whatsappHref}
              size="md"
              external
              className="whitespace-nowrap [-webkit-appearance:none]"
            >
              {t('cta')}
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-black cursor-pointer"
            aria-label={menuOpen ? t('menu_close') : t('menu_open')}
            aria-expanded={menuOpen}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Fullscreen mobile/tablet menu */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="fullscreen-menu"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden fixed inset-0 z-[100] flex flex-col overflow-y-auto"
              style={{ backgroundColor: '#ffffff' }}
            >
              {/* Top bar: logo + close */}
              <div className="shrink-0 flex items-center justify-between px-6 md:px-8 h-16 md:h-20">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-1.5 select-none"
                >
                  <span className={`font-heading text-xl font-extrabold tracking-tight leading-none ${gradientText}`}>
                    {t('logo')}
                  </span>
                  <span className="font-sans text-sm font-normal text-black/50 leading-none">
                    {t('logo_suffix')}
                  </span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label={t('menu_close')}
                  className="text-3xl leading-none p-2 -mr-2 text-black/40 hover:text-black transition-colors duration-200 cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Nav links */}
              <motion.nav
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="flex-1 flex flex-col justify-center px-6 md:px-8"
                aria-label="Navigation principale"
              >
                {NAV_LINKS.map(({ key, href }) => (
                  <motion.a
                    key={key}
                    variants={fadeUp}
                    href={href}
                    onClick={(e) => {
                      handleAnchorClick(e, href);
                      setMenuOpen(false);
                    }}
                    className="flex items-center justify-between font-heading transition-colors duration-200 text-[#0a0a0a] hover:text-[#3626A7]"
                    style={{ fontSize: 42, fontWeight: 800, borderBottom: '1px solid #f0f0f0', padding: '16px 0' }}
                  >
                    <span>{t(key)}</span>
                    <span style={{ color: '#3626A7', fontSize: 24 }}>→</span>
                  </motion.a>
                ))}
              </motion.nav>

              {/* Language toggle switch */}
              <div className="shrink-0 flex justify-center px-6 md:px-8" style={{ marginTop: 32 }}>
                <LocaleSwitch
                  locale={locale}
                  onSwitch={() => {
                    switchLocale();
                    setMenuOpen(false);
                  }}
                  size="lg"
                />
              </div>

              {/* Social icons */}
              <div className="shrink-0 flex items-center justify-center" style={{ gap: 24, marginTop: 24 }}>
                {SOCIAL_LINKS.map(({ label, href, path }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-[#0a0a0a] opacity-60 hover:opacity-100 hover:text-[#3626A7] transition-all duration-200"
                  >
                    <SocialIcon path={path} size={22} />
                  </a>
                ))}
              </div>

              {/* Bottom tag */}
              <p
                className="shrink-0 text-center font-sans"
                style={{ fontSize: 12, color: '#aaa', marginTop: 16, paddingBottom: 32 }}
              >
                {tHero('badge')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
