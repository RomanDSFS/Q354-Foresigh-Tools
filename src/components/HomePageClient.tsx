// src/components/HomePageClient.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import type { Tool } from '@/lib/tools-data';
import { ToolSlug } from '@/lib/translations';

export default function HomePageClient({ tools }: { tools: Tool[] }) {
  const { t, tTool } = useLanguage(); // ← вот откуда берётся t и tTool

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('siteTitle')}</h1>
            <p className="mt-2 text-gray-700">{t('description')}</p>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const id = tool.id as ToolSlug;
            return (
              <Link key={id} href={`/tools/${id}`} className="block">
                <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 h-full">
                  <h2 className="text-xl font-semibold text-gray-900">{tTool(id, 'name')}</h2>
                  <p className="mt-2 text-gray-700">{tTool(id, 'shortDesc')}</p>
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                      {tool.interactive ? t('interactiveLabel') : 'Описание'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}