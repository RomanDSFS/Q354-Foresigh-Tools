// src/app/tools/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { tools } from '@/lib/tools-data';
import { translations } from '@/lib/translations'; // ← импортируем переводы
import ToolContent from '@/components/tools/ToolContent';

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.id }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug as keyof typeof translations.ru.tools;

  // Получаем переводы для обоих языков (для SEO можно выбрать основной, например ru)
  const toolRu = translations.ru.tools[slug];
  const toolEn = translations.en.tools[slug];

  if (!toolRu) return {};

  return {
    title: `${toolRu.name} — Инструменты форсайта`,
    description: toolRu.shortDesc,
    // Опционально: добавь альтернативные языки для SEO
    alternates: {
      languages: {
        'en': `${toolEn?.name || toolRu.name} — Foresight Tools`,
      },
    },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.id === params.slug);
  if (!tool) notFound();

  return <ToolContent toolId={tool.id} interactive={tool.interactive} />;
}