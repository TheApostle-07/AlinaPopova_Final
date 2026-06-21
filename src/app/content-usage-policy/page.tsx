import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Content Usage Policy | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Usage must be written', paragraphs: ['Creator content may be used commercially only under written usage terms. Rights are not assumed because content was delivered, posted, or paid for.'] },
  { title: 'Organic and paid usage', paragraphs: ['Organic use on a company’s owned channels must be stated in the campaign scope. Paid ads, boosted posts, whitelisting, platform-specific ad use, and media buying require separate written rights.'] },
  { title: 'Editing, repurposing, and duration', paragraphs: ['Editing, cropping, subtitling, repurposing, third-party sharing, geographic rights, exclusivity, perpetual usage, or creator likeness use must be agreed in writing before use.'] },
  { title: 'Removal and misuse', paragraphs: ['Content may not be used beyond agreed rights. If an issue is identified, the studio may request pause, removal, clarification, or a new written rights agreement.'] }
];

export default function ContentUsagePolicyPage() { return <LegalPage eyebrow="Policy" title="Content Usage Policy" description="Clear rights before creator content is posted, edited, boosted, or reused." summary="Creator content cannot be used however a company wants unless written rights are granted. Usage should be clear before content is used commercially." sections={sections} />; }
