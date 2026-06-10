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

interface Props {
  slug: string;
  size?: number;
  color?: string;
}

export function SimpleIcon({ slug, size = 20, color }: Props) {
  const icon = ICONS[slug];
  if (!icon) return null;
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
