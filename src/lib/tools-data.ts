// src/lib/tools-data.ts
import { ToolSlug } from './translations';

export type Tool = {
  id: ToolSlug; // ← теперь строго типизировано!
  icon?: string;
  interactive: boolean;
  /** Процент готовности инструмента (0–100). Заполняется вручную. */
  progress?: number;
};

export const tools: Tool[] = [
  { id: 'horizontal-scanning', interactive: true, progress: 15 },
  { id: 'weak-signals',        interactive: true, progress: 0 },
  { id: 'trend-analysis',      interactive: true, progress: 0 },
  { id: 'scenario-analysis',   interactive: true, progress: 0 },
  { id: 'future-wheel',        interactive: true, progress: 80 },
  { id: 'delphi-method',       interactive: true, progress: 0 },
  { id: 'backcasting',         interactive: true, progress: 0 },
  { id: 'expert-games',        interactive: true, progress: 0 },
  { id: 'wild-cards',          interactive: true, progress: 0 },
];
