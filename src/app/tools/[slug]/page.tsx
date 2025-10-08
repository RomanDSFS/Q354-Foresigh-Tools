// src/app/tools/[slug]/page.tsx
// ← НЕТ 'use client' здесь!

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { tools } from '@/lib/tools-data';

// Client Components
import ToolContent from '@/components/tools/ToolContent'; // ← новый компонент

// Генерация статических путей
export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.id }));
}

// Метаданные для SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.id === params.slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — Инструменты форсайта`,
    description: tool.shortDesc,
  };
}

// src/app/tools/[slug]/page.tsx
export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.id === params.slug);
  if (!tool) notFound();
  return <ToolContent toolId={tool.id} interactive={tool.interactive} />;
}