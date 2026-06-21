import type { Metadata } from 'next';
import { CreatorApplicationForm } from '@/components/creator/CreatorApplicationForm';
import { PageHero } from '@/components/creator/PageHero';

export const metadata: Metadata = {
  title: 'Apply Free | Alina Popova Studio',
  description: 'Apply to the Alina Popova Creator Network in four clear, safety-aware steps.'
};

export default function ApplyPage() {
  return (
    <>
      <PageHero compact eyebrow="Creator network" title="Apply to Join the Creator Network" description="Four clear steps, saved local progress, and no joining fee. Paid commercial work, if available, is shared with written scope and payout terms before you decide." />
      <section className="bg-porcelain/40 py-12 sm:py-16 lg:py-20"><div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10"><CreatorApplicationForm /></div></section>
    </>
  );
}
