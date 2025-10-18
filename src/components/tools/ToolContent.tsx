// src/components/tools/ToolContent.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ToolSlug } from '@/lib/translations'; // ← новый импорт
// Импортируем интерактивные компоненты
import FutureWheelVisual from './future-wheel/FutureWheelVisual';
import HorizontalScanning from './HorizontalScanning';
import BackcastingTool from './BackcastingTool';
import ScenarioAnalysisDemo from './ScenarioAnalysisDemo';

export default function ToolContent({ toolId, interactive }: { toolId: ToolSlug; interactive: boolean }) {
  const { t, tTool, lang } = useLanguage();

  const renderInteractiveComponent = () => {
    switch (toolId) {
      case 'future-wheel':
        return <FutureWheelVisual />;
      case 'horizontal-scanning':
        return <HorizontalScanning />;
      case 'backcasting':  
        return <BackcastingTool />;
         case 'scenario-analysis': // ← добавьте эту строку
      return <ScenarioAnalysisDemo />;
      default:
        return (
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <p className="text-blue-800 font-medium">{t('comingSoon')}</p>
            <p className="text-sm text-blue-700 mt-2">
              {lang === 'ru'
                ? 'Вы можете ввести данные и увидеть результат в реальном времени.'
                : 'You can enter data and see the result in real time.'}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-start">
          <div>
            <Link href="/" className="text-blue-600 hover:underline">
              &larr; {t('backToTools')}
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">{tTool(toolId, 'name')}</h1>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-gray-700 max-w-none mb-8">
          <p>{tTool(toolId, 'longDesc')}</p>
        </div>

        {interactive && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('tryTool')}</h2>
            {renderInteractiveComponent()}
          </div>
        )}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-yellow-700">
             💡 {t('tip')}: {t('tipText')}
          </p>
        </div>
      </main>
    </div>
  );
}