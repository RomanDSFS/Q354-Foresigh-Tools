// src/components/tools/ScenarioAnalysisDemo.tsx
'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type ScenarioKey = 'baseline' | 'optimistic' | 'pessimistic';

export default function ScenarioAnalysisDemo() {
  const { tTool } = useLanguage();
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('baseline');

  // TypeScript теперь знает точный тип!
  const scenarios = tTool('scenario-analysis', 'scenarios');
  const githubRepo = tTool('scenario-analysis', 'githubRepo');
  const current = scenarios[activeScenario];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(['baseline', 'optimistic', 'pessimistic'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setActiveScenario(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeScenario === key ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {scenarios[key].title}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <p className="text-black mb-4 italic">{current.description}</p>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-black  mb-2">Драйверы / Drivers</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-900">
              {current.drivers.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-2">События / Events</h4>
            <ul className="list-disc pl-5 space-y-1 text-black ">
              {current.events.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-black  mb-2">Последствия / Implications</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-900">
              {current.implications.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <a
          href={githubRepo.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          📦 GitHub репозиторий
        </a>
      </div>
    </div>
  );
}