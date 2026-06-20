import type { Metadata } from 'next';
import { CreatorProgramPage } from '@/components/creator/CreatorProgramPage';

export const metadata: Metadata = {
  title: 'Careers | Alina Popova Studio',
  description:
    'Explore the Alina Popova Creator Launch Program for India-wide, brand-safe creator and livestream opportunities.'
};

export default function CareersPage() {
  return <CreatorProgramPage />;
}
