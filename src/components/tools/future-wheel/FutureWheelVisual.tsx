// src/components/tools/future-wheel/FutureWheelVisual.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import React, {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import type { Wheel, Node } from '@/types/futures'; // ← WheelNode заменён на Node
import { SIZE } from './constants';
import { useWheelState } from './useWheel';
import { useOverlayRects } from './useOverlay';
import FutureWheelSVG from './FutureWheelSVG';
import FutureWheelOverlay from './FutureWheelOverlay';
import FutureWheelNetwork from './FutureWheelNetwork';

type SidebarInfo = {
  title?: string;
  description?: string;
};

function isWheel(x: unknown): x is Wheel {
  if (!x || typeof x !== 'object') return false;
  const w = x as Partial<Wheel>;
  if (typeof w.centerId !== 'string' || !Array.isArray(w.nodes)) return false;

  return w.nodes.every((node) => {
    if (!node || typeof node !== 'object') return false;
    const n = node as Partial<Node>;
    return (
      typeof n.id === 'string' &&
      typeof n.title === 'string' &&
      (n.level === 0 || n.level === 1 || n.level === 2 || n.level === 3)
    );
  });
}

export default function FutureWheelVisual({ sidebar }: { sidebar?: SidebarInfo }) {
  const { lang } = useLanguage();

  const t = useMemo(
    () =>
      lang === 'en'
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
            invalidJSON: 'Invalid JSON structure',
            fileTooLarge: 'File is too large (max 2 MB)',
            loadExampleError: 'Error loading example: ',
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
            hint:
              '(+R2, +R3 — добавить свой эффект. Редактировать в поле эффекта. X — удалить.)',
            genError: 'Ошибка генерации: ',
            invalidJSON: 'Некорректная структура JSON',
            fileTooLarge: 'Файл слишком большой (макс. 2 МБ)',
            loadExampleError: 'Ошибка загрузки примера: ',
          },
    [lang]
  );

  const initial: Wheel = useMemo(
    () => ({
      centerId: 'C',
      nodes: [
        { id: 'C', title: 'Central event (edit)', level: 0 as const, p: 0.8, i: 2 },
        ...Array.from({ length: 5 }, (_, k) => ({
          id: `R1-${k + 1}`,
          title: `EDIT EFFECT R1-${k + 1}`,
          level: 1 as const, // ← ключевое исправление
          parentId: 'C',
          p: 0.6,
          i: k % 2 ? -2 : 3,
        })),
      ],
    }),
    []
  );

  const {
    wheel,
    setWheel,
    center,
    l1Angles,
    childrenOf,
    updateTitle,
    addChild,
    removeNode,
  } = useWheelState(initial);

  const rects = useOverlayRects(wheel, l1Angles, childrenOf);

  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  interface AIResponse {
    error?: string;
  }

  const generateFromAI = useCallback(async () => {
    try {
      setLoading(true);
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      const focus =
        wheel.nodes.find((n) => n.id === wheel.centerId)?.title || 'Фокус-событие';

      const r = await fetch('/api/futures/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ focus }),
        signal: ctrl.signal,
      });

      if (!r.ok) {
        const text = await r.text().catch(() => '');
        throw new Error(text || `HTTP ${r.status}`);
      }

      const json = await r.json();
      const aiResponse = json as AIResponse;
      if (aiResponse.error) throw new Error(aiResponse.error);

      if (!isWheel(json)) throw new Error(t.invalidJSON);
      setWheel(json);
    } catch (e) {
      // Проверка на AbortError с типобезопасностью
      if (e instanceof DOMException && e.name === 'AbortError') return;
      const message = e instanceof Error ? e.message : 'Unknown error';
      alert(t.genError + message);
    } finally {
      setLoading(false);
    }
  }, [setWheel, t.genError, t.invalidJSON, wheel.centerId, wheel.nodes]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const [view, setView] = useState<'wheel' | 'network'>('wheel');

  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let rafId = 0;

    const measureOnce = (w: number, h: number) => {
      const dim = Math.min(w, h || w);
      const next = Math.min(1, dim / SIZE);
      setScale(next);
    };

    const measure = () => {
      const rect = el.getBoundingClientRect();
      measureOnce(rect.width, rect.height);
    };

    measure();

    const RO = window.ResizeObserver;

    if (!RO) {
      const onResize = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(measure);
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    const ro = new RO((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        measureOnce(cr.width, cr.height);
      });
    });

    ro.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [view]);

  const workAreaStyle: React.CSSProperties = useMemo(
    () => ({
      height: 'calc(100vh - 160px)',
      minHeight: 520,
    }),
    []
  );

  const onExport = useCallback(() => {
    try {
      const blob = new Blob([JSON.stringify(wheel, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'futures-wheel.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // no-op
    }
  }, [wheel]);

  const onImportFile = useCallback(
    async (file?: File | null) => {
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert(t.fileTooLarge);
        return;
      }
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        if (!isWheel(parsed)) throw new Error(t.invalidJSON);
        setWheel(parsed);
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        alert((lang === 'en' ? 'Import error: ' : 'Ошибка импорта: ') + message);
      }
    },
    [lang, setWheel, t.fileTooLarge, t.invalidJSON]
  );

  const onLoadExample = useCallback(async () => {
    try {
      const res = await fetch('/data/example-wheel.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('File not found');
      const json = await res.json();
      if (!isWheel(json)) throw new Error(t.invalidJSON);
      setWheel(json);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      alert(t.loadExampleError + message);
    }
  }, [setWheel, t.invalidJSON, t.loadExampleError]);

  const centerTitle = center?.title ?? '';

  return (
    <div className="fw-layout w-full" style={workAreaStyle}>
      <aside className="fw-sidebar overflow-auto pr-2">
        {sidebar?.title && (
          <h2 className="text-xl font-bold text-gray-500 clamp-2">
            {sidebar.title}
          </h2>
        )}
        {sidebar?.description && (
          <p className="mt-2 text-sm text-gray-200 leading-relaxed">
            {sidebar.description}
          </p>
        )}

        <div className="fw-controls mt-4">
          <label
            htmlFor="fw-center"
            className="block text-sm font-semibold mb-1 text-gray-200"
          >
            {t.centralEvent}
          </label>
          <input
            id="fw-center"
            className="w-full border rounded px-3 h-9 italic text-gray-400 text-sm"
            value={centerTitle}
            onChange={(e) => center && updateTitle(center.id, e.target.value)}
            placeholder={lang === 'en' ? 'Type central event' : 'Опишите центральное событие'}
            aria-label={t.centralEvent}
          />
        </div>

        <div className="fw-controls mt-3 flex gap-2">
          <button
            type="button"
            aria-pressed={view === 'wheel'}
            className={`tab border ${
              view === 'wheel'
                ? 'bg-blue-800 text-white border-blue-200'
                : 'bg-gray-800 text-gray-200 border-gray-200'
            }`}
            onClick={() => setView('wheel')}
          >
            {t.wheel}
          </button>
          <button
            type="button"
            aria-pressed={view === 'network'}
            className={`tab border ${
              view === 'network'
                ? 'bg-blue-800 text-white border-blue-200'  // голубой для активной кнопки
                : 'bg-gray-800 text-gray-200 border-gray-200'
            }`}
            onClick={() => setView('network')}
          >
            {t.network}
          </button>
        </div>

        <p className="fw-note mt-3 text-sm text-gray-300">{t.hint}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="h-8 px-3 rounded bg-gray-700 hover:bg-gray-500 text-gray-200 transition text-sm"
            onClick={onExport}
          >
            {t.export}
          </button>

          <label className="h-8 px-3 rounded bg-gray-700 hover:bg-gray-500 text-gray-200 transition text-sm inline-flex items-center">
            {t.import}
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => onImportFile(e.target.files?.[0])}
            />
          </label>

          <button
            type="button"
            className="h-8 px-3 rounded bg-gray-700 hover:bg-gray-500 text-gray-200 transition text-sm"
            onClick={onLoadExample}
          >
            {t.tryExample}
          </button>

          <button
            type="button"
            onClick={generateFromAI}
            disabled={loading}
            className="h-8 px-3 rounded bg-blue-800 text-white hover:bg-blue-500 disabled:opacity-50 transition text-sm"
            aria-busy={loading}
          >
            {loading ? t.generating : t.generate}
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-200 fw-note">
          💡 {lang === 'ru'
            ? 'Совет: используйте инструмент в команде для более глубокого анализа.'
            : 'Tip: use this tool with a team for deeper analysis.'}
        </p>
      </aside>

      <div
        ref={stageRef}
        className="fw-stage relative"
        style={{ height: '100%', width: '100%' }}
      >
        {view === 'wheel' ? (
          <div
            className="relative"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: SIZE,
              height: SIZE,
              transform: `translate(-50%, -50%) scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            <FutureWheelSVG
              wheel={wheel}
              l1Angles={l1Angles}
              childrenOf={childrenOf}
            />
            <FutureWheelOverlay
              wheel={wheel}
              rects={rects}
              updateTitle={updateTitle}
              addChild={addChild}
              removeNode={removeNode}
              lang={lang}
            />
          </div>
        ) : (
          <div className="absolute inset-0 overflow-auto p-2">
            <FutureWheelNetwork wheel={wheel} />
          </div>
        )}
      </div>
    </div>
  );
}