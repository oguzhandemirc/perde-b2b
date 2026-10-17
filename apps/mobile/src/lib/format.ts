import { getCurrentLanguage, type Language } from '@/i18n';

export type Currency = 'TRY' | 'USD' | 'EUR';

export type Money = {
  amountMinor: number;
  currency: Currency;
};

const LOCALE_BY_LANGUAGE: Record<Language, string> = {
  tr: 'tr-TR',
  en: 'en-US',
};

const MINOR_UNITS_PER_MAJOR = 100;
const CENTIMETERS_PER_METER = 100;

function getLocale(): string {
  return LOCALE_BY_LANGUAGE[getCurrentLanguage()];
}

/** `{ amountMinor: 123450, currency: 'TRY' }` → "₺1.234,50" (tr) / "TRY 1,234.50" (en). */
export function formatMoney({ amountMinor, currency }: Money): string {
  // Division happens only for display; amounts stay integer minor units everywhere else.
  return new Intl.NumberFormat(getLocale(), { style: 'currency', currency }).format(
    amountMinor / MINOR_UNITS_PER_MAJOR,
  );
}

/** `1250` → "12,5 m" (tr) / "12.5 m" (en). */
export function formatLengthCm(lengthCm: number): string {
  // Not `style: 'unit'`: Hermes on iOS converts units (12.5 m → "0,012 km").
  const meters = new Intl.NumberFormat(getLocale(), { maximumFractionDigits: 2 }).format(
    lengthCm / CENTIMETERS_PER_METER,
  );
  return `${meters}\u00A0m`;
}

/** ISO 8601 string or Date → "17.10.2026" (tr) / "10/17/2026" (en). */
export function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat(getLocale(), {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(typeof value === 'string' ? new Date(value) : value);
}
