import type { Metadata } from 'next';
import { CreatorProgramPage } from '@/components/creator/CreatorProgramPage';

export const metadata: Metadata = {
  title: 'Creator Launch Program | Alina Popova Studio',
  description: 'Apply free. Train free if selected. Build your creator presence and become eligible for paid, brand-safe opportunities.'
};

export default function CreatorLaunchProgramPage() {
  return <CreatorProgramPage />;
}
