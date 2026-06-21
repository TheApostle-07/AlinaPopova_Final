import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Creator Agreement Summary | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Application is free', paragraphs: ['There is no joining fee. Applying does not guarantee selection, paid work, income, or a fixed number of opportunities.'] },
  { title: 'Independent creator partner', paragraphs: ['Creators are generally independent creator partners unless a separate employment agreement is signed. You can accept or decline opportunities and may work elsewhere unless a separate exclusivity agreement exists.'] },
  { title: 'Training and paid work', paragraphs: ['Training, if offered, may be selection-based. Mock practice may be unpaid and non-commercial. Before paid work begins, written confirmation should cover scope, payout, timing, usage rights, any agency fee or commission, and acceptance.'] },
  { title: 'Safety and content usage', paragraphs: ['No adult, obscene, illegal, exploitative, coercive, or unsafe work is supported. Your content may not be used commercially beyond the written consent and usage terms for that work.'] },
  { title: 'Ending the relationship', paragraphs: ['Either side may end the relationship according to the relevant agreement. Existing obligations such as accepted campaign deliverables, payment, confidentiality, or usage rights may continue where written terms require.'] }
];

export default function CreatorAgreementPage() { return <LegalPage eyebrow="Creator summary" title="Creator Agreement Summary" description="The core protections behind a professional creator relationship." summary="This is a plain-language guide, not a replacement for campaign-specific terms. Applying is free, work is never forced, and paid commercial work should be confirmed in writing before it starts." sections={sections} />; }
