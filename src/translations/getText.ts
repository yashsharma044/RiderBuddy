import en from './en.json'
import hi from './hi.json'

export type LocaleKey = 'en' | 'hi'

type LocaleDictionary = typeof en

const translations: Record<LocaleKey, LocaleDictionary> = {
  en,
  hi,
}

export const getText = (locale: LocaleKey): LocaleDictionary => {
  return translations[locale]
}
