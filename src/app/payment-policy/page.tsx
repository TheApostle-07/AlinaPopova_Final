import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Payment Policy | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Company payments', paragraphs: ['Company payment schedules, deposits, invoices, taxes, deliverables, and any production or platform charges are confirmed in the applicable written proposal or agreement.'] },
  { title: 'Creator payouts', paragraphs: ['Creator payout amount, timing, scope, usage rights, and any disclosed agency fee or commission are shared in writing before a creator accepts a paid opportunity.'] },
  { title: 'No hidden deductions', paragraphs: ['The studio does not support hidden creator deductions. Any creator-side fee, commission, tax treatment, or payment processing charge must be disclosed before acceptance where applicable.'] },
  { title: 'Disputes and records', paragraphs: ['Payment questions should be raised promptly with the campaign reference and written confirmation. Payment, invoice, and payout records may be retained for operational, accounting, and legal reasons.'] }
];

const meaning = {
  companies: ['Invoice schedules, taxes, campaign charges, and delivery expectations are set in the written proposal or agreement.', 'Raise payment questions with the campaign reference before a dispute becomes harder to resolve.'],
  creators: ['Payout, timing, scope, usage rights, and any disclosed fee are shared before you accept paid work.', 'No joining fee or hidden deduction is supported. Ask for clarification before accepting if anything is unclear.']
};

export default function PaymentPolicyPage() { return <LegalPage eyebrow="Payments" title="Payment Policy" description="How company payments, creator payouts, agency fees, revenue share, disputes, and taxes are handled." summary="Company payments, creator payouts, agency fees, and revenue-share arrangements must be confirmed in writing. Creators do not pay a joining fee and do not carry training debt." sections={sections} meaning={meaning} />; }
