export type Currency = 'EUR' | 'ILS';

export interface PricingPack {
  id: string;
  tagKey: string;
  titleKey: string;
  taglineKey: string;
  priceEUR: number;
  priceILS: number;
  pagesKey: string;
  deliveryKey: string;
  featuresKey: string[];
  featured: boolean;
}

export interface PricingOption {
  id: string;
  nameKey: string;
  priceEUR: number;
  priceILS: number;
  hasFromPrefix: boolean;
  pitchKey: string;
  noteKey?: string;
}

export const PRICING_PACKS: PricingPack[] = [
  {
    id: 'presence',
    tagKey: 'pack_presence_tag',
    titleKey: 'pack_presence_title',
    taglineKey: 'pack_presence_tagline',
    priceEUR: 990,
    priceILS: 3400,
    pagesKey: 'pack_presence_pages',
    deliveryKey: 'pack_presence_delivery',
    featuresKey: ['pack_presence_feature1', 'pack_presence_feature2', 'pack_presence_feature3', 'pack_presence_feature4'],
    featured: false,
  },
  {
    id: 'conversion',
    tagKey: 'pack_conversion_tag',
    titleKey: 'pack_conversion_title',
    taglineKey: 'pack_conversion_tagline',
    priceEUR: 1990,
    priceILS: 6800,
    pagesKey: 'pack_conversion_pages',
    deliveryKey: 'pack_conversion_delivery',
    featuresKey: ['pack_conversion_feature1', 'pack_conversion_feature2', 'pack_conversion_feature3', 'pack_conversion_feature4'],
    featured: true,
  },
  {
    id: 'autonomie',
    tagKey: 'pack_autonomie_tag',
    titleKey: 'pack_autonomie_title',
    taglineKey: 'pack_autonomie_tagline',
    priceEUR: 3490,
    priceILS: 11900,
    pagesKey: 'pack_autonomie_pages',
    deliveryKey: 'pack_autonomie_delivery',
    featuresKey: ['pack_autonomie_feature1', 'pack_autonomie_feature2', 'pack_autonomie_feature3', 'pack_autonomie_feature4'],
    featured: false,
  },
];

export const PRICING_OPTIONS: PricingOption[] = [
  {
    id: 'redaction',
    nameKey: 'option_redaction_name',
    priceEUR: 290,
    priceILS: 990,
    hasFromPrefix: true,
    pitchKey: 'option_redaction_pitch',
  },
  {
    id: 'visuels',
    nameKey: 'option_visuels_name',
    priceEUR: 390,
    priceILS: 1350,
    hasFromPrefix: false,
    pitchKey: 'option_visuels_pitch',
  },
  {
    id: 'photo',
    nameKey: 'option_photo_name',
    priceEUR: 690,
    priceILS: 2350,
    hasFromPrefix: false,
    pitchKey: 'option_photo_pitch',
    noteKey: 'option_photo_note',
  },
  {
    id: 'seo',
    nameKey: 'option_seo_name',
    priceEUR: 490,
    priceILS: 1690,
    hasFromPrefix: false,
    pitchKey: 'option_seo_pitch',
  },
];

const CURRENCY_SYMBOL: Record<Currency, string> = { EUR: '€', ILS: '₪' };

export function formatPrice(value: number, currency: Currency): string {
  return `${value.toLocaleString('fr-FR')} ${CURRENCY_SYMBOL[currency]}`;
}

export function getPackPrice(pack: PricingPack, currency: Currency): number {
  return currency === 'EUR' ? pack.priceEUR : pack.priceILS;
}

export function getOptionPrice(option: PricingOption, currency: Currency): number {
  return currency === 'EUR' ? option.priceEUR : option.priceILS;
}
