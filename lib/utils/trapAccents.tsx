import type { ReactNode, CSSProperties } from 'react';

const ACCENT_MAP: Record<string, string> = {
  'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
  'à': 'a', 'â': 'a', 'ä': 'a',
  'î': 'i', 'ï': 'i',
  'ô': 'o', 'ö': 'o',
  'û': 'u', 'ü': 'u', 'ù': 'u',
  'ç': 'c',
  'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
  'À': 'A', 'Â': 'A', 'Ä': 'A',
  'Î': 'I', 'Ï': 'I',
  'Ô': 'O', 'Ö': 'O',
  'Û': 'U', 'Ü': 'U', 'Ù': 'U',
  'Ç': 'C',
};

const barStyle: CSSProperties = {
  position: 'absolute',
  top: '-0.32em',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '0.42em',
  height: '0.075em',
  background: 'currentColor',
  borderRadius: 1,
  display: 'block',
};

/**
 * Replaces French accented vowels in Trap-font headings with the base letter
 * + a flat horizontal bar positioned above, matching Trap's geometric style.
 * Use only for font-trap text on /stays — never on Montserrat.
 */
export function trapAccents(text: string): ReactNode[] {
  const result: ReactNode[] = [];
  let plain = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const base = ACCENT_MAP[char];
    if (base !== undefined) {
      if (plain) { result.push(plain); plain = ''; }
      result.push(
        <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
          {base}
          <i aria-hidden={true} style={barStyle} />
        </span>
      );
    } else {
      plain += char;
    }
  }
  if (plain) result.push(plain);
  return result;
}
