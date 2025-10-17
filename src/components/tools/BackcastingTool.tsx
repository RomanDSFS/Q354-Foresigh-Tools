// src/components/tools/BackcastingTool.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

// В начале BackcastingTool.tsx (внутри файла)
interface GeneratedScenario {
  goal: string;
  steps: Array<{
    year: string;
    description: string;
  }>;
}
// Типы
type ViewMode = 'examples' | 'custom';

type BackcastingScenario = {
  id: string;
  title: { ru: string; en: string };
  goal: { ru: string; en: string };
  steps: Array<{
    year: string;
    description: { ru: string; en: string };
  }>;
};

// Готовые сценарии
const PREDEFINED_SCENARIOS: BackcastingScenario[] = [
  {
    id: 'economy',
    title: { ru: 'Экономическая тема', en: 'Economic Theme' },
    goal: {
      ru: 'Глобальная экономика адаптирована к фрагментации: устойчивые региональные торговые блоки, низкая инфляция и устойчивый рост (~2% в год).',
      en: 'Global economy adapted to fragmentation: resilient regional trade blocs, low inflation, and stable growth (~2% annually).',
    },
    steps: [
      { year: '2025', description: { ru: 'Высокая геоэкономическая фрагментация, торговые барьеры, замедление роста (~1.9%) и остаточная инфляция (~3.6%).', en: 'High geo-economic fragmentation, trade barriers, slowed growth (~1.9%), and residual inflation (~3.6%).' } },
      { year: '2028', description: { ru: 'Формирование трёх основных торговых зон (Северная Америка, ЕС+партнёры, Азия без Китая/с Китаем); рост региональных цепочек поставок.', en: 'Formation of three major trade zones (North America, EU+partners, Asia with/without China); rise of regional supply chains.' } },
      { year: '2031', description: { ru: 'Снижение зависимости от критических импортов; внедрение «зелёных» промышленных стандартов как условие торговли.', en: 'Reduced dependency on critical imports; “green” industrial standards adopted as trade prerequisites.' } },
      { year: '2033', description: { ru: 'Цифровые валюты и блокчейн-платформы стандартизированы внутри блоков; трансграничные расчёты упрощены.', en: 'Digital currencies and blockchain platforms standardized within blocs; cross-border settlements simplified.' } },
      { year: '2035', description: { ru: 'Сбалансированная многополярная торговая система с устойчивыми ростом и инфляцией (~2% и ~2.5% соответственно).', en: 'Balanced multipolar trade system with stable growth and inflation (~2% and ~2.5%, respectively).' } },
    ],
  },
  {
    id: 'technology',
    title: { ru: 'Технологическая тема', en: 'Technological Theme' },
    goal: {
      ru: 'Повсеместное и безопасное использование автономных ИИ-агентов при строгом глобальном регулировании и прозрачных механизмах ответственности.',
      en: 'Ubiquitous and safe use of autonomous AI agents under strict global regulation and transparent accountability mechanisms.',
    },
    steps: [
      { year: '2025', description: { ru: 'Вступление в силу первых крупных регуляторных актов (ЕС, США, Китай); начало коммерческого внедрения простых ИИ-агентов.', en: 'First major AI regulations enacted (EU, US, China); commercial rollout of basic AI agents begins.' } },
      { year: '2028', description: { ru: 'Стандартизация требований к «высокорисковым» ИИ-агентам; появление национальных органов по надзору за ИИ.', en: 'Standardized requirements for “high-risk” AI agents; national AI oversight bodies established.' } },
      { year: '2031', description: { ru: 'Международные соглашения по ИИ-безопасности (аналог МАГАТЭ для ИИ); запрет на автономное оружие с ИИ.', en: 'International AI safety treaties (IAEA-like body for AI); ban on autonomous AI weapons.' } },
      { year: '2033', description: { ru: 'Глобальные платформы управления ИИ обеспечивают аудит, лицензирование и «выключатели» для агентов.', en: 'Global AI governance platforms enable auditing, licensing, and “kill switches” for agents.' } },
      { year: '2035', description: { ru: 'ИИ-агенты интегрированы в здравоохранение, образование и инфраструктуру под контролем демократических институтов.', en: 'AI agents integrated into healthcare, education, and infrastructure under democratic oversight.' } },
    ],
  },
  {
    id: 'social',
    title: { ru: 'Социальная тема', en: 'Social Theme' },
    goal: {
      ru: 'Снижение глобального социального неравенства и обеспечение базовой экономической безопасности для 90% населения мира.',
      en: 'Reduction of global social inequality and provision of basic economic security for 90% of the world’s population.',
    },
    steps: [
      { year: '2025', description: { ru: 'Социальный контракт под угрозой; высокая уязвимость к бедности даже при низкой безработице (~5%).', en: 'Social contract under strain; high vulnerability to poverty despite low unemployment (~5%).' } },
      { year: '2028', description: { ru: 'Расширение систем минимального дохода и цифровых социальных реестров в странах G20 и ОЭСР.', en: 'Expansion of minimum income systems and digital social registries in G20 and OECD countries.' } },
      { year: '2031', description: { ru: 'Внедрение «социальных технологий» (например, ИИ для таргетирования помощи); рост инвестиций в доступное жильё и здравоохранение.', en: 'Deployment of “social tech” (e.g., AI for targeted aid); increased investment in affordable housing and healthcare.' } },
      { year: '2033', description: { ru: 'Глобальный фонд социальной устойчивости (при поддержке ООН и МВФ) финансирует программы в странах с высоким уровнем неравенства.', en: 'Global Social Resilience Fund (UN/IMF-backed) finances programs in high-inequality countries.' } },
      { year: '2035', description: { ru: 'Относительная бедность снижена на 30% по сравнению с 2025 г.; устойчивые системы защиты от кризисов (климат, здоровье, автоматизация).', en: 'Relative poverty reduced by 30% vs. 2025; resilient crisis-protection systems (climate, health, automation).' } },
    ],
  },
];

export default function BackcastingTool() {
  const { lang } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('examples');
  const [openScenarios, setOpenScenarios] = useState<Record<string, boolean>>({
    economy: true,
    technology: false,
    social: false,
  });
  const [customGoal, setCustomGoal] = useState('');
  const [generatedScenario, setGeneratedScenario] = useState<GeneratedScenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Сброс генерации при переключении вкладок
  useEffect(() => {
    if (viewMode === 'examples') {
      setGeneratedScenario(null);
      setError('');
    }
  }, [viewMode]);

  

  const toggleScenario = (id: string) => {
    setOpenScenarios(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoal.trim()) return;

    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/backcasting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: customGoal, language: lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setGeneratedScenario(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to generate scenario');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Переключатель */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setViewMode('examples')}
          className={`px-4 py-2 font-medium text-sm ${
            viewMode === 'examples'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          {lang === 'ru' ? 'Примеры' : 'Examples'}
        </button>
        <button
          onClick={() => setViewMode('custom')}
          className={`px-4 py-2 font-medium text-sm ${
            viewMode === 'custom'
              ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          {lang === 'ru' ? 'Свой сценарий' : 'Custom Scenario'}
        </button>
      </div>
       
            
      {/* Контент */}
      {viewMode === 'examples' ? (
        <div className="space-y-6">
          {PREDEFINED_SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <button
                onClick={() => toggleScenario(scenario.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {scenario.title[lang]}
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  {openScenarios[scenario.id] ? '▲' : '▼'}
                </span>
              </button>

              {openScenarios[scenario.id] && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <div className="mb-3 text-gray-700 dark:text-gray-300">
                    <strong>{lang === 'ru' ? 'Цель к 2035 г.:' : 'Goal for 2035:'}</strong>{' '}
                    {scenario.goal[lang]}
                  </div>
                  <div className="space-y-2">
                    {scenario.steps.map((step, i) => (
                      <div
                        key={i}
                        className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
                      >
                        <div className="font-bold text-blue-600 dark:text-blue-400 min-w-[50px]">
                          {step.year}
                        </div>
                        <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
                          {step.description[lang]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
      ) : (
        <div>
          <p className="text-gray-500 font-bold dark:text-gray-800 mb-6">
            {lang === 'ru'
              ? 'Для работы инструмента с ИИ генерацией этапов, необходим API Key Open Ai (или другой). На данном этапе разработки инструмента Вы можете скачать репозиторий и вставить свой API Key.'
              : 'To use the AI ​​stage generation tool, you need an Open AI API Key (or another one). At this stage of the tool`s development you can download the repository and insert your API Key.'}
          </p>

          <form onSubmit={handleGenerate} className="space-y-4">
            <textarea
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder={
                lang === 'ru'
                  ?  'Опишите желаемое будущее — и получите логические этапы, которые к нему ведут. Например: Каждый человек имеет доступ к чистой воде и возобновляемой энергии к 2035 году.'
                  : 'Describe your desired future — and get logical milestones that lead to it. E.g.: By 2035, every person has access to clean water and renewable energy.'
              }
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading
                ? lang === 'ru'
                  ? 'Генерация...'
                  : 'Generating...'
                : lang === 'ru'
                ? 'Создать сценарий'
                : 'Generate Scenario'}
            </button>
          </form>

          {error && <p className="mt-3 text-red-600">{error}</p>}

          {generatedScenario && (
            <div className="mt-6 p-5 border border-green-200 bg-green-50 rounded-xl dark:bg-green-900/20 dark:border-green-800">
              <h3 className="font-bold text-green-800 dark:text-green-200">
                {lang === 'ru' ? 'Ваш сценарий:' : 'Your scenario:'}
              </h3>
              <p className="mt-2">
                <strong>{lang === 'ru' ? 'Цель:' : 'Goal:'}</strong> {generatedScenario.goal}
              </p>
              <div className="mt-4 space-y-2">
                {generatedScenario.steps?.map((step, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="font-mono text-green-700 dark:text-green-300">{step.year}:</span>
                    <span className="text-gray-800 dark:text-gray-200">{step.description}</span>
                  </div>
                ))}
              </div>
            </div> 
          )}
        </div>
      )}
       {/*     
      ) : (
        // 👇 ЗАГЛУШКА вместо формы AI (временно)
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
          <p className="text-gray-800 dark:text-gray-700">
            {lang === 'ru'
              ? 'Эта функция скоро появится! Следите за обновлениями.'
              : 'This feature is coming soon! Stay tuned.'}
          </p>
        </div>
      )}*/}
    </div>
  );
}