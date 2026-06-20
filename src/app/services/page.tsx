import type { Metadata } from 'next';
import { ServicesPage } from '@/components/creator/MarketingPages';

export const metadata: Metadata = {
  title: 'Marketing Services | Alina Popova Studio',
  description: 'Explore creator-led marketing services including UGC, reels, livestreams, creator campaigns, and paid ad creative production.'
};

export default function ServicesRoutePage() {
  return <ServicesPage />;
}
