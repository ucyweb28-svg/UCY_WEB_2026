'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

const glowVariants: Variants = {
  rest: { opacity: 0, scale: 0.8, x: 0, y: 0 },
  hover: { opacity: 1, scale: 1, x: -4, y: 6 },
};

const contentVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

interface GradientGlowProps {
  children: ReactNode;
  className?: string;
}

export function GradientGlow({ children, className = '' }: GradientGlowProps) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      className={['relative inline-block rounded-full', className].filter(Boolean).join(' ')}
      style={{ overflow: 'visible' }}
    >
      {/* Gradient glow shadow */}
      <motion.div
        variants={glowVariants}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: -8,
          left: -4,
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          background: 'linear-gradient(135deg, #3626A7 0%, #DF57BC 50%, #DE541E 100%)',
          filter: 'blur(12px)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* Actual button content */}
      <motion.div variants={contentVariants} transition={{ duration: 0.2 }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
