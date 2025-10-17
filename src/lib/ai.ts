// src/lib/ai.ts
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export function createSystemPrompt(template: string, language: string): string {
  const langName = language === 'ru' ? 'Russian' : 'English';
  return `${template} Отвечай на ${langName}.`;
}