// src/components/LanguageToggle.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
      className="text-bold text-blue-600 hover:text-blue-500 font-bold"
      aria-label={lang === 'ru' ? 'Switch to English' : 'Переключить на русский'}
    >
      {lang === 'ru' ? 'EN' : 'RU'}
    </button>
  );
}