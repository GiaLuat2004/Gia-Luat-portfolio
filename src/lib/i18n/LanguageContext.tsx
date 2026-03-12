'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import enData from './en.json'
import viData from './vi.json'

type Language = 'en' | 'vi'
type TranslationData = typeof enData

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationData
  toggleLanguage: () => void
}

const translations: Record<Language, TranslationData> = {
  en: enData,
  vi: viData as unknown as TranslationData,
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: enData,
  toggleLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang') as Language
    if (saved && (saved === 'en' || saved === 'vi')) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('portfolio-lang', lang)
  }

  const toggleLanguage = () => {
    const next: Language = language === 'en' ? 'vi' : 'en'
    handleSetLanguage(next)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
