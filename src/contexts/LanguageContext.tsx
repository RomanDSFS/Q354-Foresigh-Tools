// src/contexts/LanguageContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations } from '@/lib/translations';

export type Language = 'ru' | 'en';
type TranslationKey = Exclude<keyof typeof translations.ru, 'tools'>;
export type ToolSlug = keyof typeof translations.ru.tools;

// Получаем тип значения поля инструмента
type ToolValue<T extends ToolSlug, K extends PropertyKey> =
  K extends keyof (typeof translations.ru.tools)[T]
    ? (typeof translations.ru.tools)[T][K]
    : never;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  tTool: <T extends ToolSlug, K extends keyof (typeof translations.ru.tools)[T]>(
    slug: T,
    field: K
  ) => ToolValue<T, K>;
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

  const tTool = <T extends ToolSlug, K extends keyof (typeof translations.ru.tools)[T]>(
    slug: T,
    field: K
  ): ToolValue<T, K> => {
    // Пытаемся взять на текущем языке
    const value = translations[lang].tools[slug]?.[field];
    if (value !== undefined) return value as ToolValue<T, K>;

    // Fallback на английский
    const enValue = translations['en'].tools[slug]?.[field];
    if (enValue !== undefined) return enValue as ToolValue<T, K>;

    // Fallback на русский
    return translations['ru'].tools[slug]?.[field] as ToolValue<T, K>;
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