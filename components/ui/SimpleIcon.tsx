import * as SimpleIcons from 'simple-icons';

interface Props {
  slug: string;
  size?: number;
  color?: string;
}

export function SimpleIcon({ slug, size = 20, color }: Props) {
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
  const icon = (SimpleIcons as Record<string, { svg: string; hex: string }>)[key];
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
