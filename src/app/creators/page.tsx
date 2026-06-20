import type { Metadata } from 'next';
import { CreatorProgramPage } from '@/components/creator/CreatorProgramPage';

export const metadata: Metadata = {
  title: 'Creators | Alina Popova Studio',
  description: 'Apply free to the Alina Popova Creator Launch Program for brand-safe creator, livestream, product demo, Instagram, and YouTube Live opportunities.'
};

export default function CreatorsPage() {
  return <CreatorProgramPage />;
}
