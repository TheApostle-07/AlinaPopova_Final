import type { Metadata } from 'next';
import { ProcessPage } from '@/components/creator/ProcessPage';

export const metadata: Metadata = {
  title: 'How It Works | Alina Popova Studio',
  description: 'Understand the company campaign process and creator network journey at Alina Popova Studio.'
};

export default function HowItWorksPage() {
  return <ProcessPage />;
}
