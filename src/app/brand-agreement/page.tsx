import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Company Agreement Summary | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Inquiry is not a booking', paragraphs: ['A company inquiry does not confirm a campaign. Final campaign terms are confirmed through a written proposal, invoice, written acceptance, or service agreement.'] },
  { title: 'Written campaign scope', paragraphs: ['Scope should cover deliverables, timelines, creator fit, usage rights, revisions, approvals, payment, cancellation, and any platform or production requirements.'] },
  { title: 'Creator acceptance and conduct', paragraphs: ['Creators must accept the opportunity before assignment. Companies must follow the Safety Policy, communicate respectfully, and avoid off-scope, unsafe, coercive, or inappropriate requests.'] },
  { title: 'Rights, payments, and changes', paragraphs: ['Content may only be used within written rights. Extra work, revisions, paid usage, whitelisting, or changes may require revised scope and fees. Payments follow the proposal or invoice; cancellation follows the Refund Policy.'] },
  { title: 'No guarantees', paragraphs: ['Creator-led marketing can support attention, trust, and content delivery, but sales, virality, follower growth, revenue, and platform outcomes are not guaranteed.'] }
];

const meaning = {
  companies: ['A brief starts the conversation; it does not book creators or guarantee campaign results.', 'Written scope controls deliverables, revisions, payment, creator acceptance, content rights, and cancellation.'],
  creators: ['Campaigns must be shared with clear scope, payout, usage rights, and professional conduct expectations.', 'You stay free to review, ask questions about, accept, or decline an opportunity before it begins.']
};

export default function BrandAgreementPage() { return <LegalPage eyebrow="Company Agreement" title="Company Agreement Summary" description="A simple explanation of how company briefs, campaign scope, creator matching, usage rights, payments, revisions, and cancellations work." summary="Submitting a brief does not confirm a campaign. Final campaign terms are confirmed through written proposal, invoice, or service agreement." sections={sections} meaning={meaning} />; }
