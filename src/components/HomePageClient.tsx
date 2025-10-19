// src/components/HomePageClient.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import type { Tool } from '@/lib/tools-data';
import { ToolSlug } from '@/lib/translations';

export default function HomePageClient({ tools }: { tools: Tool[] }) {
  const { t, tTool } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Компактная шапка */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {t('siteTitle')}
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-700 leading-snug">
              {t('description')}
            </p>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Основной контент: компактные отступы и сетка 3×2 на десктопе */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const id = tool.id as ToolSlug;

            return (
              <Link key={id} href={`/tools/${id}`} className="block">
                <div className="relative bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 h-full flex flex-col">
                  {/* Бейдж прогресса (справа сверху) */}
                  {typeof tool.progress === 'number' && (
                    <div
                      className="absolute top-2 right-2 select-none"
                      aria-label={`${tool.progress}% ready`}
                      title={`${tool.progress}%`}
                    >
                      <span
                        className={[
                          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold',
                          tool.progress >= 75
                            ? 'bg-emerald-100 text-emerald-800'
                            : tool.progress >= 50
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700',
                        ].join(' ')}
                      >
                        {tool.progress}%
                      </span>
                    </div>
                  )}

                  {/* Заголовок и описание — с ограничением строк */}
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 clamp-2">
                    {tTool(id, 'name')}
                  </h2>
                  <p className="mt-1 text-sm text-gray-800 clamp-3">
                    {tTool(id, 'shortDesc')}
                  </p>

                  {/* Метка «интерактивный/демо», прижата книзу карточки */}
                  <div className="mt-3 pt-1">
                    <span className="inline-block px-3 py-1 text-xs md:text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
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
