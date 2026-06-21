import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Cookie Policy | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'What cookies are used for', paragraphs: ['The website may use essential cookies or browser storage to keep forms working, save local draft progress, improve security, and understand basic website performance.'] },
  { title: 'Analytics and choices', paragraphs: ['If analytics or advertising cookies are introduced, this policy and any relevant consent mechanism should be updated. You can usually control cookies through browser settings, although essential website features may be affected.'] },
  { title: 'Local application drafts', paragraphs: ['The creator application may save an unfinished draft in the current browser session. This draft remains in that browser session until submission, clearing, or browser closure.'] }
];

export default function CookiePolicyPage() { return <LegalPage eyebrow="Policy" title="Cookie Policy" description="How essential browser storage and any future analytics tools are handled." summary="We use only the browser storage and cookies needed to operate forms, protect the site, and understand basic performance. This policy will be updated before any expanded analytics or advertising cookie use." sections={sections} />; }
