import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Payment Policy | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Company payments', paragraphs: ['Company payment schedules, deposits, invoices, taxes, deliverables, and any production or platform charges are confirmed in the applicable written proposal or agreement.'] },
  { title: 'Creator payouts', paragraphs: ['Creator payout amount, timing, scope, usage rights, and any disclosed agency fee or commission are shared in writing before a creator accepts a paid opportunity.'] },
  { title: 'No hidden deductions', paragraphs: ['The studio does not support hidden creator deductions. Any creator-side fee, commission, tax treatment, or payment processing charge must be disclosed before acceptance where applicable.'] },
  { title: 'Disputes and records', paragraphs: ['Payment questions should be raised promptly with the campaign reference and written confirmation. Payment, invoice, and payout records may be retained for operational, accounting, and legal reasons.'] }
];

export default function PaymentPolicyPage() { return <LegalPage eyebrow="Policy" title="Payment Policy" description="How company invoices, creator payouts, and disclosed fees are handled." summary="Company payments follow a written proposal or invoice. Creator payouts and any disclosed commission or fee are confirmed in writing before paid work is accepted." sections={sections} />; }
