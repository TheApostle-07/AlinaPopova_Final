import type { Metadata } from 'next';
import { FaqPage } from '@/components/creator/FaqPage';

export const metadata: Metadata = {
  title: 'FAQs | Alina Popova Studio',
  description: 'Answers about joining fees, earnings, safety, campaign choice, creator accounts, and more.'
};

export default function FaqsRoute() {
  return <FaqPage />;
}
