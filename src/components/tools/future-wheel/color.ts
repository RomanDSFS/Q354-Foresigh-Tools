// src/components/tools/future-wheel/color.ts
/** Палитра колеса (читается из CSS-переменных, есть дефолтные фоллбеки) */
export type Palette = {
  primary: string;      // акцент/центр
  ringStroke: string;   // обводки концентрических колец
  ringFill: string;     // заливка колец
  nodeFill: string;     // фон “пилюль” узлов
  nodeText: string;     // текст в узлах/лейблах
};
/** Значения по умолчанию (если CSS-переменные не заданы) */
const DEFAULTS: Palette = {
  primary:    '#2563eb', // blue-600
  ringStroke: '#94a3b8', // slate-400
  ringFill:   '#e2e8f0', // slate-200
  nodeFill:   '#e0f2fe', // sky-100
  nodeText:   '#0f172a', // slate-900
};
/** Безопасное чтение CSS-переменной на клиенте */
function cssVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}
/** Текущая палитра (лениво читаем из :root; можно вызвать refreshPalette() если тема поменялась) */
let _palette: Palette | null = null;
export function getPalette(): Palette {
  if (_palette) return _palette;
  _palette = {
    primary:    cssVar('--fw-accent',      DEFAULTS.primary),
    ringStroke: cssVar('--fw-ring-stroke', DEFAULTS.ringStroke),
    ringFill:   cssVar('--fw-ring-fill',   DEFAULTS.ringFill),
    nodeFill:   cssVar('--fw-node-fill',   DEFAULTS.nodeFill),
    nodeText:   cssVar('--fw-node-text',   DEFAULTS.nodeText),
  };
  return _palette;
}
/** Насильно перечитать палитру (например, после смены темы) */
export function refreshPalette(): Palette {
  _palette = null;
  return getPalette();
}
/** Твоя логика окраски по impact — оставляю без изменений */
export const colorByImpact = (i?: number) => {
  if (i === undefined) return '#60a5fa';
  const t = Math.max(-3, Math.min(3, i));
  return t >= 0 ? `hsl(145 65% ${50 - t * 5}%)` : `hsl(0 70% ${55 - Math.abs(t) * 5}%)`;
};
/** Прозрачность по вероятности — без изменений */
export const alphaByP = (p?: number) =>
  p === undefined ? 0.95 : 0.75 + 0.25 * Math.max(0, Math.min(1, p));
