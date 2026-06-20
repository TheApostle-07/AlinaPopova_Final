import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Creator Agreement Summary | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'What this covers', paragraphs: ['This summary describes the principles used for a creator-specific agreement. It does not replace the written agreement for a particular campaign.'] },
  { title: 'Your choices', paragraphs: ['You may accept or decline an opportunity before work begins. No campaign requires adult, unsafe, illegal, exploitative, or unagreed work. Your account remains yours unless you separately approve management support.'] },
  { title: 'Paid work', paragraphs: ['Before accepting paid work, you should receive the scope, payout, payment timing, usage rights, deliverables, agency fee, and relevant campaign boundaries in writing.'] },
  { title: 'Content and privacy', paragraphs: ['Your image, video, and personal data are used only with the consent and usage terms agreed for the relevant work.'] }
];

export default function CreatorAgreementPage() { return <LegalPage eyebrow="Creator agreement summary" title="Your work, your consent, and the written terms before you accept." description="A plain-language guide to the protections that should sit behind every creator-specific agreement." sections={sections} />; }
