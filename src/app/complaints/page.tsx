import type { Metadata } from 'next';
import { ComplaintForm } from '@/components/creator/ComplaintForm';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export const metadata: Metadata = { title: 'Complaints & Grievances | Alina Popova Studio' };

export default function ComplaintsPage() {
  return <><PageHero compact eyebrow="Complaints" title="Complaints & Safety Concerns" description="Report safety concerns, content misuse, payment issues, privacy requests, inappropriate conduct, or policy violations." /><SectionWrapper className="!py-10 bg-softwhite sm:!py-12 lg:!py-14"><div className="mx-auto max-w-4xl"><div className="mb-7 rounded-[34px] border border-primary/15 bg-white p-7 text-sm leading-7 text-cocoa shadow-card sm:p-9"><p className="font-semibold text-espresso">At a glance</p><p className="mt-3">Creators, companies, and visitors can submit concerns for review. If an issue involves immediate danger, contact local authorities first.</p><p className="mt-4 font-semibold text-espresso">What to include</p><p className="mt-2">Use this form to share what happened, who was involved, when it happened, and what support you need. We may request more details if they are needed to review the concern.</p></div><ComplaintForm /></div></SectionWrapper></>;
}
