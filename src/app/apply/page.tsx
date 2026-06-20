import type { Metadata } from 'next';
import { CreatorApplicationForm } from '@/components/creator/CreatorApplicationForm';

export const metadata: Metadata = {
  title: 'Apply Free | Alina Popova Studio',
  description: 'Apply to the Alina Popova Creator Launch Intake in seven clear, safety-aware steps.'
};

export default function ApplyPage() {
  return <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 lg:px-10 lg:py-20"><CreatorApplicationForm /></section>;
}
