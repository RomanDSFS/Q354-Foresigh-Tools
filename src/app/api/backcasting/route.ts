// src/app/api/backcasting/route.ts
import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are an expert foresight strategist. Generate a backcasting scenario in JSON format with:
- "goal": the user's desired future state (2035)
- "steps": array of 4-5 milestones from 2025 to 2035 (in reverse chronological order: 2025, 2028, ..., 2035)
Each step must have "year" (string) and "description" (string).
Respond ONLY with valid JSON. No markdown, no explanation.
`;

export async function POST(req: NextRequest) {
  try {
    const { goal, language } = await req.json();

    if (!goal || typeof goal !== 'string' || goal.length < 10) {
      return Response.json({ error: 'Goal is required (min 10 chars)' }, { status: 400 });
    }

    const userPrompt = `Generate a backcasting scenario for: "${goal}". Language: ${language === 'ru' ? 'Russian' : 'English'}.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0].message.content?.trim() || '{}';

    let json;
    try {
      json = JSON.parse(content);
    } catch {
      console.error('Failed to parse AI response:', content);
      return Response.json({ error: 'Invalid AI response' }, { status: 500 });
    }

    return Response.json(json);
  } catch (error) {
    console.error('AI error:', error);
    return Response.json({ error: 'Failed to generate scenario' }, { status: 500 });
  }
}