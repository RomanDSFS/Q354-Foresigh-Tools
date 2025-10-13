import React, { useLayoutEffect, useRef } from 'react';
import type { Wheel, Node } from '@/types/futures';

type Rect = { x: number; y: number; w: number; h: number; angle: number; level: 0 | 1 | 2 | 3 };

type Props = {
  wheel: Wheel;
  rects: Record<string, Rect>;
  updateTitle: (id: string, title: string) => void;
  addChild: (parent: Node) => void;
  removeNode: (id: string) => void;
  lang?: 'ru' | 'en'; // ← принимаем язык
};

// ── автосайзируемая textarea (автономно, реагирует и на импорт JSON)
function AutoGrowTextarea({
  value,
  onChange,
  className,
  style,
  //rows = 1,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  style?: React.CSSProperties;
  rows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const fit = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${el.scrollHeight}px`;
  };

  useLayoutEffect(() => {
    fit(); // срабатывает при импорте JSON, при любом изменении value
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={1}
      wrap="soft"
      spellCheck={false}
      className={className}
      style={style}
      onInput={fit}
    />
  );
}

export default function FutureWheelOverlay({
  wheel,
  rects,
  updateTitle,
  addChild,
  removeNode,
  lang = 'ru',
}: Props) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Object.entries(rects).map(([id, r]) => {
        const node = wheel.nodes.find((n) => n.id === id);
        if (!node) return null;

        const canAddChild = node.level === 1 || node.level === 2; // L1→+R2, L2→+R3
        const canDelete = node.level > 0;
        const nextLevel = Math.min(3, node.level + 1);

        // ── контейнер узла (центрируем, высота авто)
        return (
          <div key={`${id}-wrap`} className="contents">
            <div
              style={{
                position: 'absolute',
                left: r.x + r.w / 2,
                top: r.y + r.h / 2,
                width: r.w,
                transform: 'translate(-50%, -50%)',
              }}
              className="group pointer-events-auto flex flex-col items-stretch px-1"
            >
              {/* Текст узла */}
              <AutoGrowTextarea
                value={node.title}
                onChange={(v) => updateTitle(id, v)}
                rows={1}
                className="w-full h-auto resize-none bg-green-100/80 rounded-lg border border-green-200 shadow-sm
                           focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none
                           text-center text-[12px] leading-4 font-medium text-gray-900"
                style={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              />

              {/* Внутренняя панель действий — показываем на hover/focus */}
              <div className="mt-1 hidden group-hover:flex group-focus-within:flex justify-center gap-1">
                {canAddChild && (
                  <button
                    className="px-2 py-0.5 text-[11px] rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
                    onClick={() => addChild(node)}
                    title={
                      nextLevel === 2
                        ? lang === 'en'
                          ? 'Add effect R2'
                          : 'Добавить эффект R2'
                        : lang === 'en'
                        ? 'Add effect R3'
                        : 'Добавить эффект R3'
                    }
                  >
                    + {nextLevel}
                  </button>
                )}
                {canDelete && (
                  <button
                    className="px-2 py-0.5 text-[11px] rounded bg-red-200/80 hover:bg-red-300 text-red-900 transition"
                    onClick={() => removeNode(node.id)}
                    title={lang === 'en' ? 'Delete' : 'Удалить'}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
