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

export default function BrandAgreementPage() { return <LegalPage eyebrow="Company summary" title="Company Agreement Summary" description="The essentials for a clear, respectful creator marketing engagement." summary="A company inquiry is not a booking. Campaign terms, creator fit, usage rights, payment, revisions, and cancellation are confirmed in writing before work begins." sections={sections} />; }
