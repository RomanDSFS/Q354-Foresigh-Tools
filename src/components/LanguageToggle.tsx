// src/components/LanguageToggle.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
      className="text-sm text-gray-600 hover:text-gray-900 underline"
      aria-label={lang === 'ru' ? 'Switch to English' : 'Переключить на русский'}
    >
      {lang === 'ru' ? 'EN English' : 'RU Русский'}
    </button>
  );
}