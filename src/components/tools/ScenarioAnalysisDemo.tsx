// src/components/tools/ScenarioAnalysisDemo.tsx
'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type ScenarioKey = 'baseline' | 'optimistic' | 'pessimistic';

// Приводим ожидаемую структуру сценариев
type ScenarioRecord = {
  title: string;
  description: string;
  drivers: string[];
  events: string[];
  implications: string[];
};
type ScenariosMap = Record<ScenarioKey, ScenarioRecord>;

export default function ScenarioAnalysisDemo() {
  const { tTool } = useLanguage();
  const { lang } = useLanguage();
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('baseline');

  // ✅ Только допустимые ключи tTool и безопасные fallback’и
  const scenarios = (tTool('scenario-analysis', 'scenarios') as ScenariosMap) || {
    baseline: { title: 'Базовый', description: '', drivers: [], events: [], implications: [] },
    optimistic: { title: 'Оптимистичный', description: '', drivers: [], events: [], implications: [] },
    pessimistic: { title: 'Пессимистичный', description: '', drivers: [], events: [], implications: [] },
  };

  const githubRepo = ((tTool('scenario-analysis', 'githubRepo') as string) || '').trim();

  // const sidebarTitle = (tTool('scenario-analysis', 'name') as string) || 'Сценарный анализ';
  // const sidebarDesc =
  //   (tTool('scenario-analysis', 'shortDesc') as string) ||
  //   'Сравнивайте базовый, оптимистичный и пессимистичный сценарии: драйверы, события и последствия.';

  const current = scenarios[activeScenario];

  return (
    <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:[grid-template-columns:300px_minmax(0,1fr)]">
      {/* ===== Левый сайдбар ===== */}
      <aside className="lg:sticky lg:top-6 space-y-4 h-max">
        {/* Описание инструмента */}
        

        {/* Быстрый старт / выбор сценария */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">{lang === 'ru' ? 'Быстрый старт' : 'Quick Start'}</h5>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            {(['baseline', 'optimistic', 'pessimistic'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveScenario(key)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  activeScenario === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                }`}
              >
                {scenarios[key].title}
              </button>
            ))}
          </div>

          {githubRepo && (
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <span>📦</span>
              <span>GitHub репозиторий</span>
            </a>
          )}
        </div>

        {/* Советы */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="font-semibold text-gray-900 dark:text-white">Советы</h5>
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>Сначала изучите базовый сценарий — это точка отсчёта.</li>
            <li>Сравните, какие драйверы меняются между сценариями.</li>
            <li>Сформулируйте управленческие решения из блока «Последствия».</li>
          </ul>
        </div>
      </aside>

      {/* ===== Правая колонка — основной контент ===== */}
      <section className="space-y-6">
        {/* Переключатель сценариев (рядом с контентом) */}
        

        {/* Карточка сценария */}
        <div className="bg-white p-6 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
          <p className="text-black dark:text-gray-100 mb-4 italic">{current.description}</p>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-2">Драйверы / Drivers</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-900 dark:text-gray-100">
                {current.drivers.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black dark:text-white mb-2">События / Events</h4>
              <ul className="list-disc pl-5 space-y-1 text-black dark:text-gray-100">
                {current.events.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black dark:text-white mb-2">
                Последствия / Implications
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-900 dark:text-gray-100">
                {current.implications.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Ссылка на репозиторий (как в оригинале) 
        {githubRepo && (
          <div className="pt-4">
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              📦 GitHub репозиторий
            </a>
          </div>
        )} */}
      </section>
    </div>
  );
}
