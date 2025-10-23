// src/components/tools/ToolContent.tsx
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { ToolSlug } from '@/lib/translations';

const FutureWheelVisual = dynamic(() => import('./future-wheel/FutureWheelVisual'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse p-4 border rounded-lg bg-white">
      <div className="h-5 w-40 bg-gray-500 rounded mb-3" />
      <div className="h-9 w-full bg-gray-300 rounded mb-3" />
      <div className="h-72 w-full bg-gray-100 rounded" />
    </div>
  ),
});
const HorizontalScanning = dynamic(() => import('./HorizontalScanning'), { ssr: false });
const BackcastingTool = dynamic(() => import('./BackcastingTool'), { ssr: false });
const ScenarioAnalysisDemo = dynamic(() => import('./ScenarioAnalysisDemo'), { ssr: false });

type Props = {
  toolId: ToolSlug;
  interactive: boolean;
};

export default function ToolContent({ toolId, interactive }: Props) {
  const { t, tTool, lang } = useLanguage();

  const isFutureWheel = useMemo(() => toolId === 'future-wheel', [toolId]);
  const pageTitle = useMemo(() => tTool(toolId, 'name'), [tTool, toolId]);
  const longDesc = useMemo(() => tTool(toolId, 'longDesc'), [tTool, toolId]);

  const interactiveBlock = useMemo(() => {
    if (!interactive) return null;
    switch (toolId) {
      case 'future-wheel':
        return (
          <FutureWheelVisual
            sidebar={{
              title: tTool('future-wheel', 'name'),
              description: tTool('future-wheel', 'longDesc'),
            }}
          />
        );
      case 'horizon-scanning':
        return <HorizontalScanning />;
      case 'backcasting':
        return <BackcastingTool />;
      case 'scenario-analysis':
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
    
  }, [interactive, toolId, t, tTool, lang]);

  return (
    <div
      className={isFutureWheel ? 'min-h-screen future-wheel-theme' : 'min-h-screen bg-blue to-sky-500'}
      //style={isFutureWheel ? { background: 'var(--fw-page-bg)' } : undefined}
      //style={wrapperStyle}
    >
      {/* Компактная шапка */}
      <header className={isFutureWheel ? 'bg-blue-50 backdrop-blur border-b' : 'bg-white border-b'}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-start">
          <div>
            <Link href="/" className="text-bold text-blue-800 hover:text-blue-500 font-bold">
              ⬅️ {t('backToTools')}
            </Link>

            {/* ТОЛЬКО если НЕ future-wheel — показываем название в хедере */}
            {!isFutureWheel && (
              <h1
                id="tool-title"
                className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 leading-tight"
              >
                {pageTitle}
              </h1>
            )}
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main
        className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8"
        aria-labelledby={!isFutureWheel ? 'tool-title' : undefined}
      >
        {/* Для future-wheel описание и заголовок перенесены в сайдбар инструмента */}
        {!isFutureWheel && (
          <>
            <section className="text-gray-100 mb-4" aria-label={lang === 'ru' ? 'Описание' : 'Description'}>
              <p className="text-base md:text-lg leading-relaxed">{longDesc}</p>
            </section>
            
          </>
        )}

        {/* Интерактив */}
        {interactive && (
          <section className={isFutureWheel ? 'mb-2' : 'mb-6'} aria-label="Interactive area">
            {interactiveBlock}
          </section>
        )}

                {!isFutureWheel && (
          <section
            className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r"
            aria-label={lang === 'ru' ? 'Подсказка' : 'Tip'}
          >
            <p className="text-gray-800 text-sm">
              💡 {t('tip')}: {t('tipText')}
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
