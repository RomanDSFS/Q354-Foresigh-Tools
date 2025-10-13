// src/components/tools/future-wheel/FutureWheelVisual.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useLayoutEffect, useRef, useState } from 'react'; // ← убрали useEffect
import type { Wheel } from '@/types/futures';
import { SIZE } from './constants';
import { useWheelState } from './useWheel';
import { useOverlayRects } from './useOverlay';
import FutureWheelSVG from './FutureWheelSVG';
import FutureWheelOverlay from './FutureWheelOverlay';
import FutureWheelNetwork from './FutureWheelNetwork';

export default function FutureWheelVisual() {
  // берём текущий язык из глобального контекста
  const { lang } = useLanguage();

  // простой словарь переводов для этого экрана
  const t = lang === 'en'
    ? {
        centralEvent: 'Central event',
        wheel: 'Wheel',
        network: 'Network',
        export: 'Export JSON',
        import: 'Import JSON',
        tryExample: 'Try example JSON',
        generate: 'Generate with AI',
        generating: 'Generating…',
        hint: '(+R2, +R3 — add your effect. Edit inside the effect field. X — delete.)',
        genError: 'Generation error: ',
      }
    : {
        centralEvent: 'Центральное событие',
        wheel: 'Колесо',
        network: 'Сеть',
        export: 'Экспорт JSON',
        import: 'Импорт JSON',
        tryExample: 'Попробовать пример JSON',
        generate: 'Сгенерировать от ИИ',
        generating: 'Генерация…',
        hint: '(+R2, +R3 — добавить свой эффект. Редактировать в поле эффекта. X — удалить.)',
        genError: 'Ошибка генерации: ',
      };

  // демо-данные
  const initial: Wheel = {
    centerId: 'C',
    nodes: [
      { id: 'C', title: 'Central event (edit)', level: 0, p: 0.8, i: 2 },
      ...Array.from({ length: 5 }, (_, k) => ({
        id: `R1-${k + 1}`,
        title: `EDIT EFFECT R1- ${k + 1}`,
        level: 1 as const,
        parentId: 'C',
        p: 0.6,
        i: k % 2 ? -2 : 3,
      })),
    ],
  };

  const { wheel, setWheel, center, l1Angles, childrenOf, updateTitle, addChild, removeNode } =
    useWheelState(initial);
  const rects = useOverlayRects(wheel, l1Angles, childrenOf);

  // генерация через API
  const [loading, setLoading] = useState(false);
  const generateFromAI = async () => {
    try {
      setLoading(true);
      const focus = wheel.nodes.find((n) => n.id === wheel.centerId)?.title || 'Фокус-событие';
      const r = await fetch('/api/futures/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ focus }),
      });
      const json = await r.json();
      if (json.error) throw new Error(json.error);
      setWheel(json as Wheel);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      alert(t.genError + message);
    } finally {
      setLoading(false);
    }
  };

  // режим: колесо / сеть
  const [view, setView] = useState<'wheel' | 'network'>('wheel');

  // ======= АДАПТИВ: масштабируем SVG+overlay целиком =======
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!shellRef.current) return;
    const measure = () => {
      const width = shellRef.current!.clientWidth || SIZE;
      const next = Math.min(1, width / SIZE);
      setScale(next);
    };

    measure();

    const ro = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      const next = Math.min(1, width / SIZE);
      setScale(next);
    });
    ro.observe(shellRef.current);
    return () => ro.disconnect();
  }, [view]);

  const scaledH = Math.round(SIZE * scale);

  return (
    <div className="w-full flex flex-col items-center gap-4 text-gray-900 bg-white isolate">
      {/* Центральное событие */}
      <div className="w-full max-w-xl">
        <label className="block text-sm font-semibold mb-1">{t.centralEvent}</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={center.title}
          onChange={(e) => updateTitle(center.id, e.target.value)}
        />
      </div>

      {/* Переключатель вида */}
      <div className="flex gap-2">
        <button
          className={`px-3 py-1.5 rounded border ${
            view === 'wheel'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
          onClick={() => setView('wheel')}
        >
          {t.wheel}
        </button>
        <button
          className={`px-3 py-1.5 rounded border ${
            view === 'network'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
          onClick={() => setView('network')}
        >
          {t.network}
        </button>
      </div>

      {/* Визуализация */}
      {view === 'wheel' ? (
        <div ref={shellRef} className="w-full" style={{ height: scaledH }}>
          <div
            className="relative"
            style={{
              width: SIZE,
              height: SIZE,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              margin: '0 auto',
            }}
          >
            <FutureWheelSVG wheel={wheel} l1Angles={l1Angles} childrenOf={childrenOf} />
            <FutureWheelOverlay
              wheel={wheel}
              rects={rects}
              updateTitle={updateTitle}
              addChild={addChild}
              removeNode={removeNode}
              lang={lang}
            />
          </div>
        </div>
      ) : (
        <FutureWheelNetwork wheel={wheel} />
      )}

      <div className="text-sm text-gray-700 max-w-xl text-center">{t.hint}</div>

      {/* Экспорт / Импорт / Пример / Генерация */}
      <div className="flex gap-2 items-center flex-wrap justify-center">
        <button
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          onClick={() => {
            const blob = new Blob([JSON.stringify(wheel, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'futures-wheel.json';
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          {t.export}
        </button>

        <label className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition cursor-pointer">
          {t.import}
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const text = await f.text();
              setWheel(JSON.parse(text));
            }}
          />
        </label>

        <button
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          onClick={async () => {
            try {
              const res = await fetch('/data/example-wheel.json');
              if (!res.ok) throw new Error('File not found');
              const json = await res.json();
              setWheel(json);
            } catch (e: unknown) {
              const message = e instanceof Error ? e.message : 'Unknown error';
              alert(
                (lang === 'en' ? 'Error loading example: ' : 'Ошибка загрузки примера: ') + message
              );
            }
          }}
        >
          {t.tryExample}
        </button>

        <button
          onClick={generateFromAI}
          disabled={loading}
          className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-800 disabled:opacity-50 transition"
        >
          {loading ? t.generating : t.generate}
        </button>
      </div>
    </div>
  );
}