type WhatsAppLocale = 'fr' | 'il';

const NUMBERS: Record<WhatsAppLocale, string> = {
  fr: '33656684640',
  il: '972587467029',
};

export function formatWhatsAppLink(
  locale: WhatsAppLocale = 'fr',
  message = 'Bonjour%20UCY%20Studio'
): string {
  return `https://wa.me/${NUMBERS[locale]}?text=${message}`;
}
