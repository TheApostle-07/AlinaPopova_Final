import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Terms | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Studio scope', paragraphs: ['Alina Popova Studio provides creator-led marketing services to companies and operates a selection-based creator network. A company inquiry, creator application, training invitation, or roster placement does not guarantee a campaign, earnings, sales, selection, or a fixed number of opportunities.'] },
  { title: 'Company engagements', paragraphs: ['Company campaigns are scoped through a separate written proposal or agreement. Deliverables, fees, timing, creator responsibilities, content approvals, and usage rights are confirmed for the relevant campaign before production begins.'] },
  { title: 'Creator independence', paragraphs: ['Creators remain independent adults. Any commercial work is voluntary and subject to a separate written scope, payout, usage-rights, safety, and fee agreement before it begins.'] },
  { title: 'Conduct and safety', paragraphs: ['We do not support adult, obscene, illegal, exploitative, unsafe, or coercive content. We may pause or decline an application, campaign, or partnership that conflicts with this standard or applicable law.'] },
  { title: 'Updates', paragraphs: ['This public summary can change as the program evolves. Material campaign-specific terms are documented separately for the applicable creator or brand.'] }
];

export default function TermsPage() { return <LegalPage eyebrow="Terms" title="Studio terms, without hidden obligations." description="These terms describe the public creator marketing and brand-safe creator-network model. They are not a substitute for a campaign-specific written agreement." sections={sections} />; }
