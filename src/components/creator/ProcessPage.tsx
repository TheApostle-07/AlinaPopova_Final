import { ArrowRight, CheckCircle2, ClipboardCheck, FileCheck2, GraduationCap, Headphones, ListChecks, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';

const steps = [
  { title: 'Apply free', description: 'Share your goals, availability, interests, boundaries, and consent.', icon: ClipboardCheck },
  { title: 'Shortlisting', description: 'We review serious applications for fit, communication, and readiness.', icon: ListChecks },
  { title: 'Discovery call', description: 'Shortlisted applicants may be invited to a no-pressure conversation.', icon: Headphones },
  { title: 'Training invite', description: 'Selected creators receive relevant guidance and learning support.', icon: GraduationCap },
  { title: 'Mock practice', description: 'Practice presentation and live confidence in non-commercial formats.', icon: Sparkles },
  { title: 'Tier placement', description: 'Readiness is reviewed against communication, reliability, and campaign fit.', icon: CheckCircle2 },
  { title: 'Opportunity match', description: 'Relevant creator work is matched thoughtfully, never automatically.', icon: ListChecks },
  { title: 'Written terms', description: 'Scope, payout, usage rights, and agency terms are shared before acceptance.', icon: FileCheck2 },
  { title: 'Accept or decline', description: 'You choose whether the opportunity works for you.', icon: CheckCircle2 },
  { title: 'Paid work if accepted', description: 'Commercial work begins only after terms are accepted in writing.', icon: FileCheck2 }
];

export const ProcessPage = () => (
  <>
    <PageHero eyebrow="How it works" title="A clearer path from application to opportunity." description="No upfront fee, no guaranteed income, and no obligation to accept work. The program helps selected creators become camera-ready and brand-ready with a transparent process." actions={<Button href="/apply" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Start Your Application</Button>} />
    <SectionWrapper>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => <article key={step.title} className="border border-primary/15 bg-white p-5 sm:p-6"><span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span><step.icon className="mt-7 h-6 w-6 text-gold" aria-hidden /><h2 className="mt-5 font-display text-2xl text-espresso">{step.title}</h2><p className="mt-3 text-sm leading-6 text-cocoa">{step.description}</p></article>)}
      </div>
      <div className="mt-10 border-l-4 border-primary bg-blush/15 px-5 py-4 text-sm leading-6 text-cocoa">Training and mock practice may be unpaid and non-commercial. Paid commercial work is confirmed in writing before it begins.</div>
    </SectionWrapper>
  </>
);
