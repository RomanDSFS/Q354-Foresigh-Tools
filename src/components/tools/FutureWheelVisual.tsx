// src/components/tools/FutureWheelVisual.tsx

'use client';

import { useState, useEffect } from 'react';

type Consequence = {
  id: string;
  text: string;
};

const LEVEL1_COUNT = 6; // количество секторов 1-го уровня

export default function FutureWheelVisual() {
  const [center, setCenter] = useState<string>('ИИ в образовании');
  const [level1, setLevel1] = useState<Consequence[]>(() =>
    Array.from({ length: LEVEL1_COUNT }, (_, i) => ({
      id: `l1-${i}`,
      text: `Следствие ${i + 1}`,
    }))
  );
  const [level2, setLevel2] = useState<Record<string, Consequence[]>>(() =>
    Object.fromEntries(
      level1.map((item) => [item.id, [{ id: `${item.id}-l2-0`, text: 'Реакция' }]])
    )
  );

  // Обновляем level2 при изменении level1 (на случай, если кол-во изменится)
  useEffect(() => {
    setLevel2((prev) => {
      const newLevel2 = { ...prev };
      level1.forEach((item) => {
        if (!newLevel2[item.id]) {
          newLevel2[item.id] = [{ id: `${item.id}-l2-0`, text: 'Реакция' }];
        }
      });
      return newLevel2;
    });
  }, [level1]);

  const updateCenter = (e: React.ChangeEvent<HTMLInputElement>) => setCenter(e.target.value);
  const updateLevel1 = (id: string, text: string) => {
    setLevel1((prev) => prev.map((item) => (item.id === id ? { ...item, text } : item)));
  };
  const updateLevel2 = (parentId: string, childId: string, text: string) => {
    setLevel2((prev) => ({
      ...prev,
      [parentId]: prev[parentId].map((child) => (child.id === childId ? { ...child, text } : child)),
    }));
  };

  // Параметры SVG
  const SIZE = 600;
  const CENTER = SIZE / 2;
  const RADIUS_CENTER = 60;
  const RADIUS_LEVEL1 = 140;
  const RADIUS_LEVEL2 = 220;

  // Функция для рисования сектора
  const renderSector = (
    id: string,
    angle: number,
    innerRadius: number,
    outerRadius: number,
    text: string,
    onUpdate: (text: string) => void,
    isCenter = false
  ) => {
    const startAngle = angle - Math.PI / LEVEL1_COUNT;
    const endAngle = angle + Math.PI / LEVEL1_COUNT;

    const x1 = CENTER + innerRadius * Math.cos(startAngle);
    const y1 = CENTER + innerRadius * Math.sin(startAngle);
    const x2 = CENTER + outerRadius * Math.cos(startAngle);
    const y2 = CENTER + outerRadius * Math.sin(startAngle);
    const x3 = CENTER + outerRadius * Math.cos(endAngle);
    const y3 = CENTER + outerRadius * Math.sin(endAngle);
    const x4 = CENTER + innerRadius * Math.cos(endAngle);
    const y4 = CENTER + innerRadius * Math.sin(endAngle);

    const largeArcFlag = outerRadius - innerRadius > RADIUS_LEVEL1 ? 0 : 0;

    let pathData = '';
    if (isCenter) {
      // Круг для центра
      return (
        <g key={id}>
          <circle cx={CENTER} cy={CENTER} r={RADIUS_CENTER} fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
          <foreignObject
            x={CENTER - RADIUS_CENTER + 10}
            y={CENTER - 20}
            width={RADIUS_CENTER * 2 - 20}
            height={40}
          >
            <input
              value={text}
              onChange={(e) => onUpdate(e.target.value)}
              className="w-full h-full text-center text-sm font-medium bg-transparent border-none outline-none text-blue-800"
              style={{ lineHeight: '40px' }}
            />
          </foreignObject>
        </g>
      );
    }

    // Путь для сектора (кольца)
    pathData = `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}
      Z
    `;

    // Положение текста — посередине сектора
    const midRadius = (innerRadius + outerRadius) / 2;
    const midAngle = angle;
    const textX = CENTER + midRadius * Math.cos(midAngle);
    const textY = CENTER + midRadius * Math.sin(midAngle);

    return (
      <g key={id}>
        <path d={pathData} fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />
        <foreignObject
          x={textX - 80}
          y={textY - 30}
          width="160"
          height="60"
        >
          <div className="flex items-center justify-center h-full">
            <input
              value={text}
              onChange={(e) => onUpdate(e.target.value)}
              className="w-full h-full text-center text-xs bg-transparent border-none outline-none text-gray-800 resize-none"
              style={{ lineHeight: '1.2' }}
            />
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Управление центром */}
      <div className="mb-4 w-full max-w-md">
        <label className="block text-sm font-bold text-gray-700 mb-1">Центральное событие</label>
        <input
          type="text"
          value={center}
          onChange={updateCenter}
          className="w-full p-2 text-left text-gray-700 font-medium border border-gray-300 rounded-md text-sm"
        />
      </div>

      {/* SVG Колесо */}
      <div className="overflow-hidden rounded-full border border-gray-200 shadow-sm">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="bg-white">
          {/* Центр */}
          {renderSector('center', 0, 0, RADIUS_CENTER, center, setCenter, true)}

          {/* Уровень 1 */}
          {level1.map((item, i) => {
            const angle = (i * 2 * Math.PI) / LEVEL1_COUNT - Math.PI / 2; // начинаем сверху
            return renderSector(
              item.id,
              angle,
              RADIUS_CENTER,
              RADIUS_LEVEL1,
              item.text,
              (text) => updateLevel1(item.id, text)
            );
          })}

          {/* Уровень 2 — по одному сектору на каждый уровень 1 */}
          {level1.map((l1Item, i) => {
            const l2Items = level2[l1Item.id] || [];
            const angle = (i * 2 * Math.PI) / LEVEL1_COUNT - Math.PI / 2;
            return l2Items.map((l2Item, j) => {
              // Слегка смещаем угол, чтобы не перекрывалось
              const offset = (j - (l2Items.length - 1) / 2) * 0.3;
              const sectorAngle = angle + offset;
              return renderSector(
                l2Item.id,
                sectorAngle,
                RADIUS_LEVEL1,
                RADIUS_LEVEL2,
                l2Item.text,
                (text) => updateLevel2(l1Item.id, l2Item.id, text)
              );
            });
          })}
        </svg>
      </div>

      <div className="mt-4 text-sm text-gray-600 max-w-lg text-center">
        💡 Редактируйте текст прямо на колесе! Каждый сектор — прямое или косвенное следствие центрального события.
      </div>
    </div>
  );
}