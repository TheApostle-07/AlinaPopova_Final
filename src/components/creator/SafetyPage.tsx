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
    <SectionWrapper className="bg-porcelain/65">
      <div className="rounded-[40px] border border-primary/15 bg-white p-7 shadow-soft sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.13em] text-primary">Creator rights</p>
      <h2 className="mt-4 font-display text-4xl text-espresso">What we will not ask you to do</h2>
      <ul className="mt-8 grid gap-3 text-sm leading-6 text-cocoa md:grid-cols-2">
        {['Pay to apply, join, train, or remain on the roster', 'Accept a private client request you did not agree to', 'Do unpaid commercial work', 'Use a personal account without separate approval', 'Wear, say, pose for, or appear in something you do not accept', 'Participate in adult, exploitative, unsafe, illegal, or obscene content'].map((item) => (
          <li key={item} className="flex gap-3 rounded-xl border border-primary/10 bg-porcelain/60 p-4"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{item}</li>
        ))}
      </ul>
      </div>
    </SectionWrapper>
    <SectionWrapper>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <ShieldCheck className="h-7 w-7 text-primary" aria-hidden />
          <h2 className="mt-6 font-display text-3xl text-espresso">Brand conduct rules</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-cocoa">{['Respectful campaign communication only', 'No direct pressure or off-platform private requests', 'No adult, obscene, exploitative, or unsafe requests', 'No usage beyond the written rights and consent'].map((item) => <li key={item} className="flex gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul>
        </Card>
        <Card>
          <AlertTriangle className="h-7 w-7 text-primary" aria-hidden />
          <h2 className="mt-6 font-display text-3xl text-espresso">A documented complaint route</h2>
          <p className="mt-3 text-sm leading-6 text-cocoa">Safety concerns can be submitted through the contact page. The team records the concern, reviews the relevant campaign, and may pause work while it is assessed.</p>
          <p className="mt-5 rounded-2xl border border-neon/20 bg-porcelain px-4 py-3 text-sm font-semibold text-primary">Safety-first decisions take priority over campaign momentum.</p>
        </Card>
      </div>
    </SectionWrapper>
  </>
);
