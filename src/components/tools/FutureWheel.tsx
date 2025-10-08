// src/components/tools/FutureWheel.tsx

'use client';

import { useState } from 'react';

type Consequence = {
  id: string;
  text: string;
};

export default function FutureWheel() {
  const [center, setCenter] = useState<string>('Новое технологическое событие');
  const [level1, setLevel1] = useState<Consequence[]>([
    { id: '1', text: 'Прямое следствие 1' },
    { id: '2', text: 'Прямое следствие 2' },
    { id: '3', text: 'Прямое следствие 3' },
    { id: '4', text: 'Прямое следствие 4' },
  ]);
  const [level2, setLevel2] = useState<Record<string, Consequence[]>>({
    '1': [{ id: '1-1', text: 'Вторичное следствие' }],
    '2': [{ id: '2-1', text: 'Вторичное следствие' }],
    '3': [{ id: '3-1', text: 'Вторичное следствие' }],
    '4': [{ id: '4-1', text: 'Вторичное следствие' }],
  });

  const updateCenter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCenter(e.target.value);
  };

  const updateLevel1 = (id: string, text: string) => {
    setLevel1(prev => prev.map(item => (item.id === id ? { ...item, text } : item)));
  };

  const addLevel2 = (parentId: string) => {
    setLevel2(prev => ({
      ...prev,
      [parentId]: [...(prev[parentId] || []), { id: `${parentId}-${Date.now()}`, text: 'Новое следствие' }],
    }));
  };

  const updateLevel2 = (parentId: string, childId: string, text: string) => {
    setLevel2(prev => ({
      ...prev,
      [parentId]: prev[parentId].map(child => (child.id === childId ? { ...child, text } : child)),
    }));
  };

  // Простая визуализация в виде текста (можно позже заменить на SVG)
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Колесо будущего</h3>

      {/* Центр */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Центральное событие</label>
        <input
          type="text"
          value={center}
          onChange={updateCenter}
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
        />
      </div>

      {/* Уровень 1 */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Прямые последствия (1-й уровень)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {level1.map((item) => (
            <div key={item.id} className="border-l-4 border-blue-500 pl-3">
              <input
                type="text"
                value={item.text}
                onChange={(e) => updateLevel1(item.id, e.target.value)}
                className="w-full p-1 text-sm text-gray-700 border-b border-gray-700 focus:outline-none"
              />
              {/* Уровень 2 для этого элемента */}
              <div className="mt-2 ml-2">
                {level2[item.id]?.map((child) => (
                  <div key={child.id} className="mt-1">
                    <input
                      type="text"
                      value={child.text}
                      onChange={(e) => updateLevel2(item.id, child.id, e.target.value)}
                      className="w-full p-1 text-xs text-gray-700 border-b border-gray-700 focus:outline-none bg-gray-50"
                      placeholder="Вторичное следствие..."
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addLevel2(item.id)}
                  className="mt-1 text-xs text-blue-600 hover:underline"
                >
                  + Добавить вторичное следствие
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Совет */}
      <div className="text-sm text-gray-600 mt-4 p-3 bg-blue-50 rounded">
        💡 Совет: начните с реального тренда (например, «рост ИИ»), затем подумайте: «Что изменится напрямую?», а потом — «Как общество/бизнес отреагирует на это?»
      </div>
    </div>
  );
}