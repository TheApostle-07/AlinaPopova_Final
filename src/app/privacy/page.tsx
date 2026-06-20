import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Privacy | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'Information we collect', paragraphs: ['We collect information you submit through an application or direct contact, including contact details, city, social links, availability, interests, boundaries, consent records, and notes needed to review an application.'] },
  { title: 'How we use it', paragraphs: ['We use application data to review suitability, contact shortlisted applicants, maintain the creator roster, document consent, and administer accepted commercial work. We do not sell personal information.'] },
  { title: 'Sharing and retention', paragraphs: ['Access is limited to authorized operations staff and, where necessary, approved parties supporting a specific accepted campaign. We retain records only for legitimate application, operational, legal, and accounting purposes.'] },
  { title: 'Your choices', paragraphs: ['You may ask about, correct, or request deletion of your information by emailing support@alinapopova.com. Some records may need to be retained where required by law or an active agreement.'] }
];

export default function PrivacyPage() { return <LegalPage eyebrow="Privacy" title="Your application data is handled for a clear operational purpose." description="This summary explains how creator and contact information is collected and used by the studio." sections={sections} />; }
