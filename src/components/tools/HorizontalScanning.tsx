// src/components/tools/HorizontalScanning.tsx

'use client';

import { useState, useEffect } from 'react';

type Signal = {
  id: string;
  text: string;
};

type PESTEL = {
  political: Signal[];
  economic: Signal[];
  social: Signal[];
  technological: Signal[];
  environmental: Signal[];
  legal: Signal[];
};

const PESTEL_CATEGORIES: { key: keyof PESTEL; label: string; color: string; examples: string[] }[] = [
  { key: 'political', label: 'Политические', color: 'bg-red-100 border-red-300', examples: ['Смена регулятора', 'Новые санкции', 'Изменение налоговой политики'] },
  { key: 'economic', label: 'Экономические', color: 'bg-yellow-100 border-yellow-300', examples: ['Рост инфляции', 'Изменение курса валют', 'Рецессия'] },
  { key: 'social', label: 'Социальные', color: 'bg-green-100 border-green-300', examples: ['Старение населения', 'Рост удалёнки', 'Изменение ценностей'] },
  { key: 'technological', label: 'Технологические', color: 'bg-blue-100 border-blue-300', examples: ['Прорыв в ИИ', 'Квантовые компьютеры', 'Новые биотехнологии'] },
  { key: 'environmental', label: 'Экологические', color: 'bg-emerald-100 border-emerald-300', examples: ['Изменение климата', 'Дефицит воды', 'Переход на ВИЭ'] },
  { key: 'legal', label: 'Правовые', color: 'bg-purple-100 border-purple-300', examples: ['Новые законы о данных', 'Антимонопольные расследования', 'Изменение трудового законодательства'] },
];

const STORAGE_KEY = 'horizontal-scanning-data';

export default function HorizontalScanning() {
  const [data, setData] = useState<PESTEL>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    }
    return {
      political: [{ id: 'p1', text: 'Новый закон о цифровых активах' }],
      economic: [{ id: 'e1', text: 'Рост ставок ЦБ' }],
      social: [{ id: 's1', text: 'Увеличение продолжительности жизни' }],
      technological: [{ id: 't1', text: 'Массовое внедрение ИИ в медицину' }],
      environmental: [{ id: 'env1', text: 'Ужесточение норм выбросов CO2' }],
      legal: [{ id: 'l1', text: 'GDPR-подобные законы в новых странах' }],
    };
  });

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addSignal = (category: keyof PESTEL) => {
    const newSignal: Signal = { id: `${category}-${Date.now()}`, text: 'Новый сигнал' };
    setData(prev => ({
      ...prev,
      [category]: [...prev[category], newSignal],
    }));
  };

  const updateSignal = (category: keyof PESTEL, id: string, text: string) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item => item.id === id ? { ...item, text } : item),
    }));
  };

  const deleteSignal = (category: keyof PESTEL, id: string) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id),
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Горизонтальное сканирование (PESTEL)</h3>
        <p className="text-sm text-gray-600 mt-1">
          Добавьте сигналы изменений в каждую категорию. Это поможет выявить тренды и риски.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PESTEL_CATEGORIES.map(({ key, label, color, examples }) => (
          <div key={key} className={`border rounded-lg p-4 ${color}`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-800">{label}</h4>
              <button
                type="button"
                onClick={() => addSignal(key)}
                className="text-xs text-blue-600 hover:underline"
              >
                + Добавить
              </button>
            </div>

            <div className="space-y-2 mb-3">
              {data[key].map((signal) => (
                <div key={signal.id} className="flex items-start">
                  <input
                    type="text"
                    value={signal.text}
                    onChange={(e) => updateSignal(key, signal.id, e.target.value)}
                    className="flex-1 text-sm text-gray-800 p-1 border-b border-gray-500 focus:outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => deleteSignal(key, signal.id)}
                    className="ml-2 text-xs text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="text-xs text-gray-700 mt-2">
              <p className="font-bold">Примеры:</p>
              <ul className="list-disc list-inside space-y-1">
                {examples.slice(0, 2).map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
        💡 <strong>Совет:</strong> Используйте этот инструмент на регулярной основе (ежеквартально). Горизонтальное сканирование — не разовое упражнение, а процесс!
      </div>
    </div>
  );
}