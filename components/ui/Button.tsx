import type { ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'whatsapp' | 'ghost';
type Size = 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-[#3626A7] text-white font-heading font-semibold hover:opacity-90 active:scale-[0.98]',
  secondary:
    'border-2 border-[#000807] text-[#000807] bg-transparent font-heading font-semibold hover:bg-[#000807] hover:text-white active:scale-[0.98]',
  whatsapp:
    'bg-[#25D366] text-white font-heading font-semibold hover:opacity-90 active:scale-[0.98]',
  ghost:
    'border border-white/25 text-white bg-transparent font-heading font-semibold hover:bg-white/10 active:scale-[0.98]',
};

const SIZE_CLASSES: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-[14px] text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  onClick,
  type = 'button',
  external = false,
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full',
    'transition-all duration-200 cursor-pointer',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ].join(' ');

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
