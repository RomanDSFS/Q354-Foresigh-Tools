// types/scenario.ts
export type ScenarioKey = 'baseline' | 'optimistic' | 'pessimistic';

export interface Scenario {
  id: ScenarioKey;
  title: string;
  description: string;
  drivers: string[];      // Драйверы изменений
  events: string[];       // Ключевые события
  implications: string[]; // Последствия
}