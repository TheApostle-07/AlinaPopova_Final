import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/creator/LegalPage';

export const metadata: Metadata = { title: 'Safety, Consent & Conduct Policy | Alina Popova Studio' };

const sections: LegalSection[] = [
  { title: 'What we support', paragraphs: ['We support lawful, brand-safe, consent-based UGC, social content, livestreams, product demos, creator marketing, and appropriate campaign or modelling work.'] },
  { title: 'What we never support', paragraphs: ['We do not support adult, obscene, illegal, exploitative, coercive, harassing, hidden-camera, minor-related inappropriate, unsafe, or unpaid commercial creator work. We do not require forced outfits, scripts, private requests, or use beyond consent.'] },
  { title: 'Creator rights', paragraphs: ['Creators can ask questions, set boundaries, request written terms, decline work, refuse unsafe requests, refuse usage beyond consent, report concerns, and exit according to the applicable agreement.'] },
  { title: 'Company conduct', paragraphs: ['Companies must communicate respectfully, avoid direct pressure or off-scope private demands, honor written rights, and avoid inappropriate comments, harassment, unpaid extra work requests, or use beyond agreed scope.'] },
  { title: 'Content usage', paragraphs: ['Organic posting, paid ads, whitelisting, perpetual usage, editing, repurposing, exclusivity, and third-party distribution each require appropriate written rights. Creator acceptance and consent are required before work is assigned.'] },
  { title: 'Complaints and consequences', paragraphs: ['A concern can be submitted through the Complaints page. We may document the issue, pause a campaign, ask for clarification, end a relationship, or escalate where required. Safety-first decisions take priority over campaign momentum.'] }
];

export default function SafetyRoute() { return <LegalPage eyebrow="Safety" title="Clear terms. Safe work. Professional conduct." description="Standards for lawful, brand-safe, consent-based creator marketing and livestream work." summary="Every campaign should have written scope, usage rights, creator consent, clear payout terms, and professional conduct. We do not support adult, unsafe, exploitative, coercive, or unpaid commercial creator work." sections={sections} />; }
