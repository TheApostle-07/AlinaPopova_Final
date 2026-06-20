import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Brand Agreement Summary | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Scope before work', paragraphs: ['The written campaign scope should cover deliverables, creator count, timing, locations or platforms, product claims, moderation, approvals, and payment terms.'] },
  { title: 'Creator protections', paragraphs: ['Brands must respect creator consent, confirmed boundaries, safety requirements, and approved scripts. No adult, exploitative, illegal, unsafe, or coercive requests are supported.'] },
  { title: 'Usage rights', paragraphs: ['Usage rights, boosting, edits, whitelisting, and exclusivity must be expressly agreed. Rights are not assumed beyond the written scope.'] },
  { title: 'Payments and changes', paragraphs: ['Commercial fees, agency fees, cancellation, rescheduling, revisions, and any out-of-scope change are agreed in writing for the relevant campaign.'] }
];

export default function BrandAgreementPage() { return <LegalPage eyebrow="Brand agreement summary" title="Clear scope protects the campaign, the creator, and the brand." description="A plain-language guide to the terms we expect before commercial creator work starts." sections={sections} />; }
