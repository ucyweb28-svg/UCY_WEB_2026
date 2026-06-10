import {
  siCursor,
  siFigma,
  siFramer,
  siNextdotjs,
  siNotion,
  siReact,
  siTailwindcss,
  siTypescript,
  siWebflow,
  siWordpress,
} from 'simple-icons';

const ICONS: Record<string, { svg: string; hex: string }> = {
  figma: siFigma,
  framer: siFramer,
  nextdotjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  tailwindcss: siTailwindcss,
  wordpress: siWordpress,
  webflow: siWebflow,
  notion: siNotion,
  cursor: siCursor,
};

// Removed from simple-icons (trademark reasons) — rendered as colored letter badges instead.
const FALLBACK_ICONS: Record<string, { bg: string; label: string }> = {
  adobeillustrator: { bg: '#FF9A00', label: 'Ai' },
  adobephotoshop: { bg: '#31A8FF', label: 'Ps' },
  adobeaftereffects: { bg: '#9999FF', label: 'Ae' },
};

interface Props {
  slug: string;
  size?: number;
  color?: string;
}

export function SimpleIcon({ slug, size = 20, color }: Props) {
  const icon = ICONS[slug];
  if (icon) {
    const fill = color ?? `#${icon.hex}`;
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        dangerouslySetInnerHTML={{ __html: icon.svg }}
      />
    );
  }

  const fallback = FALLBACK_ICONS[slug];
  if (fallback) {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20">
        <rect width="20" height="20" rx="3" fill={fallback.bg} />
        <text
          x="10"
          y="10"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="8"
          fontWeight="bold"
          fontFamily="sans-serif"
          fill="#ffffff"
        >
          {fallback.label}
        </text>
      </svg>
    );
  }

  return null;
}
