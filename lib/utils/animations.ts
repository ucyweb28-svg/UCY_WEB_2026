import type { Variants } from 'framer-motion';

const EASE_REVEAL = [0.25, 0.1, 0.0, 1] as const;
const EASE_EXIT   = [0.4, 0, 1, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_REVEAL },
  },
};

export const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_REVEAL },
  },
};

// Hero sequences — slower stagger, more ceremonial
export const staggerHero: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// Default stagger — section headers and general use
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// Card/grid stagger — tighter rhythm for grids
export const staggerCards: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// Nav links — very fast, near-instant cascade
export const staggerNav: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

// Legacy alias kept for imports that haven't been updated yet
export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export { EASE_REVEAL, EASE_EXIT };
