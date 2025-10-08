// src/app/page.tsx

import { tools } from '@/lib/tools-data';
import HomePageClient from '@/components/HomePageClient';

// Метаданные для SEO
export const metadata = {
  title: 'Инструменты форсайта',
  description: 'Интерактивные методы для прогнозирования и подготовки к будущему.',
};

export default function HomePage() {
  // Передаём только сериализуемые данные
  return <HomePageClient tools={tools} />;
}