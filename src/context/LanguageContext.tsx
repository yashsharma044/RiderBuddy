import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react'
import { getText } from '@/src/translations/getText'

export type LocaleKey = 'en' | 'hi'

type LanguageContextType = {
  locale: LocaleKey
  setLocale: (locale: LocaleKey) => void
  t: ReturnType<typeof getText>
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

type Props = {
  children: ReactNode
  defaultLocale?: LocaleKey
}

export const LanguageProvider = ({
  children,
  defaultLocale = 'en',
}: Props) => {
  const [locale, setLocale] = useState<LocaleKey>(defaultLocale)

  const value = useMemo(() => {
    const t = getText(locale)
    const toggleLocale = () =>
      setLocale((prev) => (prev === 'en' ? 'hi' : 'en'))
    return { locale, setLocale, t, toggleLocale }
  }, [locale])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * Hook to access the current locale, translation dictionary,
 * and a toggle function for switching languages.
 */
export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
