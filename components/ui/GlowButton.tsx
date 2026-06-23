'use client';

import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type GlowButtonVariant = 'dark' | 'gradient' | 'white';

interface GlowButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variant?: GlowButtonVariant;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const ANIMATED_GRADIENT = 'linear-gradient(90deg, #DE541E, #DF57BC, #3626A7, #DF57BC, #DE541E)';

const BG_MAP: Record<GlowButtonVariant, string> = {
  dark: '#0a0a0a',
  gradient: ANIMATED_GRADIENT,
  white: '#ffffff',
};

const COLOR_MAP: Record<GlowButtonVariant, string> = {
  dark: '#ffffff',
  gradient: '#ffffff',
  white: '#0a0a0a',
};

export function GlowButton({ href, children, className, style, variant = 'dark', external, onClick, disabled }: GlowButtonProps) {
  const isGradient = variant === 'gradient';

  const glowStyle: CSSProperties = {
    position: 'absolute',
    bottom: -8,
    left: -4,
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    filter: 'blur(14px)',
    zIndex: 0,
    pointerEvents: 'none',
    ...(isGradient
      ? {
          background: ANIMATED_GRADIENT,
          backgroundSize: '300% 300%',
          animation: 'gradientShift 4s ease infinite',
        }
      : {
          background: 'linear-gradient(135deg, #DE541E 0%, #DF57BC 50%, #3626A7 100%)',
        }),
  };

  const linkStyle: CSSProperties = {
    display: 'inline-block',
    background: disabled ? '#c8c8c8' : BG_MAP[variant],
    color: disabled ? '#888888' : COLOR_MAP[variant],
    padding: '12px 28px',
    borderRadius: '100px',
    fontSize: 16,
    fontWeight: 600,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    ...(!disabled && isGradient && {
      backgroundSize: '300% 300%',
      animation: 'gradientShift 4s ease infinite',
      border: 'none',
    }),
    ...style,
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {!disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={glowStyle}
        />
      )}
      <motion.div
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Link
          href={disabled ? '#' : href}
          target={external && !disabled ? '_blank' : undefined}
          rel={external && !disabled ? 'noopener noreferrer' : undefined}
          style={linkStyle}
          className={className}
          onClick={disabled ? (e) => e.preventDefault() : onClick}
          aria-disabled={disabled}
        >
          {children}
        </Link>
      </motion.div>
    </div>
  );
}
