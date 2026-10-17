import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import tr from './locales/tr.json';

export type Translation = typeof tr;

// A dedicated instance (registered globally by initReactI18next) keeps typed `t` and avoids
// sharing state with the default i18next singleton.
const i18n = createInstance();

export const SUPPORTED_LANGUAGES = ['tr', 'en'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

const DEFAULT_LANGUAGE: Language = 'tr';

export const resources = {
  tr: { translation: tr },
  en: { translation: en satisfies Translation },
} as const;

function isSupportedLanguage(code: string | null): code is Language {
  return SUPPORTED_LANGUAGES.some((language) => language === code);
}

function detectDeviceLanguage(): Language {
  const deviceLanguage = getLocales()[0].languageCode;
  return isSupportedLanguage(deviceLanguage) ? deviceLanguage : DEFAULT_LANGUAGE;
}

/** Active app language; falls back to Turkish when i18n reports anything unexpected. */
export function getCurrentLanguage(): Language {
  return isSupportedLanguage(i18n.language) ? i18n.language : DEFAULT_LANGUAGE;
}

// Resources are bundled, so `initAsync: false` makes init synchronous and
// the first render already has translations.
void i18n.use(initReactI18next).init({
  resources,
  lng: detectDeviceLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: { escapeValue: false },
  initAsync: false,
});

export { i18n };
