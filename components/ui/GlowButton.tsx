'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type GlowButtonVariant = 'dark' | 'gradient' | 'white';

interface GlowButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: GlowButtonVariant;
  external?: boolean;
}

const BG_MAP: Record<GlowButtonVariant, string> = {
  dark: '#0a0a0a',
  gradient: 'linear-gradient(90deg, #3626A7, #DF57BC)',
  white: '#ffffff',
};

const COLOR_MAP: Record<GlowButtonVariant, string> = {
  dark: '#ffffff',
  gradient: '#ffffff',
  white: '#0a0a0a',
};

export function GlowButton({ href, children, className, variant = 'dark', external }: GlowButtonProps) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          bottom: -8,
          left: -4,
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          background: 'linear-gradient(135deg, #3626A7 0%, #DF57BC 50%, #DE541E 100%)',
          filter: 'blur(14px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Link
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          style={{
            display: 'inline-block',
            background: BG_MAP[variant],
            color: COLOR_MAP[variant],
            padding: '12px 28px',
            borderRadius: '100px',
            fontSize: 15,
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
          className={className}
        >
          {children}
        </Link>
      </motion.div>
    </div>
  );
}
