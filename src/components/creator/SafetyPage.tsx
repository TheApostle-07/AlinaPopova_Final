import { AlertTriangle, FileCheck2, HandHeart, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';

const commitments = [
  { title: 'Independent choice', description: 'Creators are independent adults who can accept or decline an opportunity before it begins.', icon: HandHeart },
  { title: 'Written commercial terms', description: 'Paid work is presented with scope, payout, usage rights, and agency fee terms before acceptance.', icon: FileCheck2 },
  { title: 'Safe categories only', description: 'We do not support adult, obscene, illegal, exploitative, unsafe, or coercive content or conduct.', icon: ShieldCheck },
  { title: 'No pay-to-play', description: 'No joining fee, hidden deduction, training debt, or unpaid commercial work is part of this program.', icon: AlertTriangle }
];

export const SafetyPage = () => (
  <>
    <PageHero
      eyebrow="Safety standard"
      title="Creator dignity, consent, and clarity come before a campaign."
      description="Alina Popova Studio supports lawful, brand-safe, consent-based creator, livestream, modelling, product demo, Instagram, YouTube Live, and campaign work."
    />
    <SectionWrapper>
      <div className="grid gap-4 md:grid-cols-2">
        {commitments.map((item) => (
          <Card key={item.title} className="bg-white">
            <item.icon className="h-7 w-7 text-primary" aria-hidden />
            <h2 className="mt-6 font-display text-3xl text-espresso">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-cocoa">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
    <SectionWrapper className="bg-ink text-ivory">
      <p className="text-sm font-semibold uppercase tracking-[0.13em] text-gold">Creator rights</p>
      <h2 className="mt-4 font-display text-4xl">What we will not ask you to do</h2>
      <ul className="mt-8 grid gap-x-10 gap-y-4 text-sm leading-6 text-champagne md:grid-cols-2">
        {['Pay to apply, join, train, or remain on the roster', 'Accept a private client request you did not agree to', 'Do unpaid commercial work', 'Use a personal account without separate approval', 'Wear, say, pose for, or appear in something you do not accept', 'Participate in adult, exploitative, unsafe, illegal, or obscene content'].map((item) => (
          <li key={item} className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />{item}</li>
        ))}
      </ul>
    </SectionWrapper>
  </>
);
