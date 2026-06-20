import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Refunds | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Creators', paragraphs: ['There is no joining fee or training fee for the Creator Launch Program, so there is no creator-program payment to refund. No creator should pay a training debt or hidden charge.'] },
  { title: 'Brands', paragraphs: ['Brand campaign, pilot, and production payments are governed by the quote, invoice, and written campaign agreement for that engagement. Rescheduling, cancellation, credit, and refund terms depend on confirmed talent, production, and usage commitments.'] },
  { title: 'Questions', paragraphs: ['Ask for scope, timelines, included services, and commercial terms in writing before confirming a brand booking. Contact support@alinapopova.com for clarification.'] }
];

export default function RefundsPage() { return <LegalPage eyebrow="Refunds" title="No creator fees. Brand payment terms are agreed before booking." description="This page separates creator-program access from the commercial terms that apply to a specific brand engagement." sections={sections} />; }
