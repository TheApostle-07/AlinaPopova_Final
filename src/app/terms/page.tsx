import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Terms | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Program scope', paragraphs: ['The Creator Launch Program is an application, review, training, tiering, and opportunity-shortlisting program. Applying, training, or joining a roster does not guarantee selection, paid work, earnings, or a fixed number of campaigns.'] },
  { title: 'Creator independence', paragraphs: ['Creators remain independent adults. Any commercial work is voluntary and subject to a separate written scope, payout, usage-rights, safety, and fee agreement before it begins.'] },
  { title: 'Conduct and safety', paragraphs: ['We do not support adult, obscene, illegal, exploitative, unsafe, or coercive content. We may pause or decline an application, campaign, or partnership that conflicts with this standard or applicable law.'] },
  { title: 'Updates', paragraphs: ['This public summary can change as the program evolves. Material campaign-specific terms are documented separately for the applicable creator or brand.'] }
];

export default function TermsPage() { return <LegalPage eyebrow="Terms" title="Program terms, without hidden obligations." description="These terms describe the public Creator Launch Program and brand-safe service model. They are not a substitute for a campaign-specific written agreement." sections={sections} />; }
