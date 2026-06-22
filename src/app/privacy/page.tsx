import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Privacy Policy | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Who we are and what we collect', paragraphs: ['Alina Popova Studio collects information submitted through creator applications, company campaign briefs, contact requests, and complaints. This can include contact details, age confirmation, city, social links, interests, availability, boundaries, company category, budget range, campaign goals, consent records, and operational notes.'] },
  { title: 'Why we use personal data', paragraphs: ['We use information to review creator applications, respond to companies, operate campaigns, record consent, confirm eligibility, process payments, prevent spam or misuse, handle complaints, and improve the website. We do not sell creator personal data or publicly display creator contact details without consent.'] },
  { title: 'Consent and retention', paragraphs: ['Forms record the consent text, policy version, timestamp, and available security metadata such as IP address and user agent. Consent may be withdrawn where applicable, although records needed for safety, accounting, campaign, fraud prevention, or legal obligations may be retained.', 'Inactive or rejected application records may be retained for 12–24 months unless deletion is requested or a legitimate legal or safety reason requires longer retention. Campaign, payment, and complaint records may be retained for legitimate business and legal purposes.'] },
  { title: 'Sharing and creator protection', paragraphs: ['Information is shared only where needed with authorized team members, service providers, payment processors, professional advisers, and confirmed campaign parties. Companies do not automatically receive creator direct contact details. Portfolio links are reviewed internally and campaign-specific sharing is limited to what is needed.'] },
  { title: 'Your rights and security', paragraphs: ['You may request access, correction, deletion, or withdrawal of consent where applicable by contacting support@alinapopova.com. We use reasonable technical and organizational safeguards, but no internet transmission or storage system is completely risk-free.'] },
  { title: 'Cookies, children, and updates', paragraphs: ['The site may use essential cookies and limited analytics. See the Cookie Policy for more information. Creator applications are for adults aged 18 or older. This policy may change as the studio or applicable requirements evolve.'] }
];

const meaning = {
  companies: ['Your brief is used to respond, scope campaign options, and maintain operational or legal records.', 'Business and contact information is not sold or used outside legitimate studio operations.'],
  creators: ['Your profile, boundaries, and contact details are reviewed for applications and matching, not publicly listed.', 'You can request access, correction, deletion, or consent withdrawal where applicable.']
};

export default function PrivacyPage() { return <LegalPage eyebrow="Privacy" title="Privacy Policy" description="How Alina Popova Studio collects, uses, stores, and protects information from creators, companies, and visitors." summary="We collect only the information needed to review creator applications, respond to company briefs, manage campaigns, store consent, process payments, handle safety concerns, and improve the website. We do not sell creator personal data or publicly display creator contact details without consent." sections={sections} meaning={meaning} />; }
