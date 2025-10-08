// src/contexts/LanguageContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations } from '@/lib/translations';

export type Language = 'ru' | 'en';
type TranslationKey = Exclude<keyof typeof translations.ru, 'tools'>;
type ToolSlug = keyof typeof translations.ru.tools;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  tTool: (slug: ToolSlug, field: 'name' | 'shortDesc' | 'longDesc') => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language | null;
    if (saved === 'ru' || saved === 'en') {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  const tTool = (slug: ToolSlug, field: 'name' | 'shortDesc' | 'longDesc'): string => {
    return translations[lang].tools[slug]?.[field] || translations['en'].tools[slug]?.[field] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tTool }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}