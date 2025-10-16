// src/app/page.tsx

import { tools } from '@/lib/tools-data';
import HomePageClient from '@/components/HomePageClient';

// Метаданные для SEO
export const metadata = {
  title: 'Foresight Tools',
  description: 'Interactive methods for forecasting and preparing for the future.',
};

export default function HomePage() {
  // Передаём только сериализуемые данные
  return <HomePageClient tools={tools} />;
}