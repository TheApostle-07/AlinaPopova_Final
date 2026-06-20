import type { Metadata } from 'next';
import { ProcessPage } from '@/components/creator/ProcessPage';

export const metadata: Metadata = {
  title: 'How It Works | Alina Popova Studio',
  description: 'Understand the application, review, training, tiering, and opportunity process for the Creator Launch Program.'
};

export default function HowItWorksPage() {
  return <ProcessPage />;
}
