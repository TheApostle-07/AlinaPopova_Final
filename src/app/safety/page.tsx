import type { Metadata } from 'next';
import { SafetyPage } from '@/components/creator/SafetyPage';

export const metadata: Metadata = {
  title: 'Safety Standard | Alina Popova Studio',
  description: 'Clear boundaries for consent-based, brand-safe creator and livestream opportunities.'
};

export default function SafetyRoute() {
  return <SafetyPage />;
}
