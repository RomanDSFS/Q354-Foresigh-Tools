// src/lib/tools-data.ts
import { ToolSlug } from './translations';

export type Tool = {
  id: ToolSlug; // ← теперь строго типизировано!
  icon?: string;
  interactive: boolean;
};

export const tools: Tool[] = [
  { id: 'horizontal-scanning', interactive: true },
  { id: 'weak-signals', interactive: true },
  { id: 'trend-analysis', interactive: true },
  { id: 'scenario-analysis', interactive: true },
  { id: 'future-wheel', interactive: true },
  { id: 'delphi-method', interactive: true },
  { id: 'backcasting', interactive: true },
  { id: 'expert-games', interactive: true },
  { id: 'wild-cards', interactive: true },
];