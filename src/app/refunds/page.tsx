import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Refund & Cancellation Policy | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Creator applications', paragraphs: ['Creator applications are free. There is no joining fee or training debt, so there is no creator application payment to refund.'] },
  { title: 'Company campaigns', paragraphs: ['Refunds and credits depend on the written proposal, payment stage, work started, creator booking, production planning, content creation, and delivered services. A company inquiry does not create a refund obligation.'] },
  { title: 'Cancellation and rescheduling', paragraphs: ['Before planning, booking, or production begins, a refund or credit may be considered according to the written proposal. After strategy, shortlisting, scripting, scheduling, creator booking, production, or live delivery begins, relevant fees may be non-refundable.', 'Rescheduling may be possible when requested within the notice window in the written campaign scope. Creator booking or cancellation fees may apply.'] },
  { title: 'Revisions and third-party issues', paragraphs: ['Revisions follow the approved package or proposal. Additional revisions, reshoots, or scope changes may be chargeable. Refunds are not generally available for platform outages, company-side delays, product unavailability, approval delays, or third-party tool failures outside the studio’s reasonable control.'] },
  { title: 'Creator payouts and requests', paragraphs: ['Creator payouts follow written campaign confirmation. For a cancellation or refund request, email support@alinapopova.com with the company name, campaign name, invoice details, and requested resolution.'] }
];

const meaning = {
  companies: ['Early cancellation may allow a refund or credit under the written proposal; booked or delivered work may not.', 'Reschedules, revisions, and scope changes should be raised promptly before creator or production commitments are affected.'],
  creators: ['Applications are free, so there is no application fee or training debt to recover.', 'Creator payouts follow the written campaign confirmation, including any accepted cancellation or rescheduling terms.']
};

export default function RefundsPage() { return <LegalPage eyebrow="Legal" title="Refund & Cancellation Policy" description="Clear expectations for company campaigns, production work, and rescheduling." summary="Creator applications are free. Company campaign refunds depend on the written scope and the stage of planning, creator booking, production, and delivery. Confirmed work and creator time may be non-refundable." sections={sections} meaning={meaning} />; }
