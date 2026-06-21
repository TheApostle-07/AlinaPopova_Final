import type { Metadata } from 'next';
import { ComplaintForm } from '@/components/creator/ComplaintForm';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export const metadata: Metadata = { title: 'Complaints & Grievances | Alina Popova Studio' };

export default function ComplaintsPage() {
  return <><PageHero eyebrow="Complaints" title="A clear route for concerns and grievances." description="Report a safety, conduct, payment, content-use, or campaign concern. Share only the details needed to explain the issue and do not attach identity documents or private media." /><SectionWrapper className="bg-softwhite"><div className="mx-auto max-w-4xl"><div className="mb-8 rounded-[30px] border border-primary/15 bg-white p-6 text-sm leading-7 text-cocoa"><p className="font-semibold text-espresso">What happens next</p><p className="mt-2">We record the concern, review relevant information, may pause a related campaign where appropriate, document the outcome, and escalate when required. This public process is not a substitute for emergency services or legal advice.</p></div><ComplaintForm /></div></SectionWrapper></>;
}
