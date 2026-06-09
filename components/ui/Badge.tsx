import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'dark';

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  default: 'border-[#3626A7] bg-[#FBF9FF] text-[#3626A7]',
  dark:    'border-white/25 bg-white/10 text-white',
};

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
}

export function Badge({ children, className = '', variant = 'default' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-block rounded-full border px-4 py-1',
        'text-xs font-medium font-sans uppercase tracking-widest',
        VARIANT_STYLES[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
