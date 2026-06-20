import type { Metadata } from 'next';
import { AboutPage } from '@/components/creator/MarketingPages';

export const metadata: Metadata = {
  title: 'About | Alina Popova Studio',
  description: 'Alina Popova Studio is a Gujarat-based creator-led marketing agency serving companies and independent creators across India.'
};

export default function AboutRoutePage() {
  return <AboutPage />;
}
