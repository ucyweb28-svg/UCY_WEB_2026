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
  { label: 'Instagram', href: 'https://www.instagram.com/ucy_studio/', icon: '/icons/icon-instagram.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/115831904/', icon: '/icons/icon-linkedin.svg' },
  { label: 'Behance', href: 'https://www.behance.net/yonathanchetrit3', icon: '/icons/icon-behance.svg' },
];

function getLocalizedPath(pathname: string, targetLocale: 'fr' | 'en'): string {
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const pathWithoutLocale = isEn ? pathname.slice(3) || '/' : pathname;
  if (targetLocale === 'en') {
    return pathWithoutLocale === '/' ? '/en' : `/en${pathWithoutLocale}`;
  }
  return pathWithoutLocale;
}

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
  const tHero = useTranslations('hero');
  const tFooterCta = useTranslations('footer_cta');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isContactPage = pathname?.endsWith('/contact') ?? false;
  const isHomePage = pathname === '/' || pathname === '/en';
  const otherLocale = locale === 'fr' ? 'en' : 'fr';
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
    router.push(getLocalizedPath(pathname ?? '/', otherLocale));
  };

  const whatsappHref = formatWhatsAppLink(
    'fr',
    'Bonjour%20UCY%20Studio%2C%20je%20voudrais%20d%C3%A9marrer%20un%20projet'
  );
  const whatsappHrefIL = formatWhatsAppLink(
    'il',
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

          <button
            onClick={switchLocale}
            className="inline-flex items-center justify-center rounded-full border font-sans transition-colors duration-200 hover:bg-black/5 cursor-pointer"
            style={{ borderColor: 'rgba(0,8,7,0.2)', color: '#000807', backgroundColor: 'transparent', padding: '6px 14px', fontSize: 13 }}
            aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
          >
            {otherLocale.toUpperCase()}
          </button>
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
              style={{ backgroundColor: '#000807' }}
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
                  <span className="font-sans text-sm font-normal text-white/60 leading-none">
                    {t('logo_suffix')}
                  </span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label={t('menu_close')}
                  className="text-3xl leading-none p-2 -mr-2 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Centered nav links */}
              <motion.nav
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 py-12"
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
                    className="nav-fullscreen-link font-heading font-bold text-4xl md:text-6xl text-white"
                  >
                    {t(key)}
                  </motion.a>
                ))}
              </motion.nav>

              {/* Language switcher (mobile) */}
              <div className="shrink-0 px-6 md:px-8 pb-6">
                <button
                  onClick={() => {
                    switchLocale();
                    setMenuOpen(false);
                  }}
                  className="block w-full max-w-xs mx-auto rounded-full border font-sans text-center transition-colors duration-200 hover:bg-white/10 cursor-pointer"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', backgroundColor: 'transparent', padding: '10px 24px', fontSize: 15 }}
                  aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
                >
                  {otherLocale.toUpperCase()}
                </button>
              </div>

              {/* Bottom row: locale, WhatsApp CTAs, social links */}
              <div className="shrink-0 px-6 md:px-8 pb-8 md:pb-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
                <p className="order-3 md:order-1 font-sans text-xs md:text-sm text-white/40">
                  {tHero('badge')}
                </p>

                <div className="order-1 md:order-2 flex flex-wrap items-center justify-center gap-3">
                  <Button variant="whatsapp" href={whatsappHref} size="md" external>
                    {tFooterCta('whatsapp_fr')}
                  </Button>
                  <Button variant="ghost" href={whatsappHrefIL} size="md" external>
                    {tFooterCta('whatsapp_il')}
                  </Button>
                </div>

                <div className="order-2 md:order-3 flex items-center gap-3">
                  {SOCIAL_LINKS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="block w-9 h-9 rounded-lg overflow-hidden"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={icon} alt="" className="w-full h-full object-cover" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
