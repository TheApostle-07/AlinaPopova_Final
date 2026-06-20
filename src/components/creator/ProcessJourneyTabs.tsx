'use client';

import { useState } from 'react';
import { CheckCircle2, ClipboardCheck, FileCheck2, GraduationCap, Headphones, ListChecks, Sparkles } from 'lucide-react';

const creatorSteps = [
  { title: 'Apply free', description: 'Share your goals, availability, interests, boundaries, and consent.', icon: ClipboardCheck },
  { title: 'Shortlisting', description: 'We review serious applications for fit, communication, and readiness.', icon: ListChecks },
  { title: 'Discovery call', description: 'Shortlisted applicants may be invited to a no-pressure conversation.', icon: Headphones },
  { title: 'Training invite', description: 'Selected creators receive relevant guidance and learning support.', icon: GraduationCap },
  { title: 'Mock practice', description: 'Practice presentation and live confidence in non-commercial formats.', icon: Sparkles },
  { title: 'Tier placement', description: 'Readiness is reviewed against communication, reliability, and campaign fit.', icon: CheckCircle2 },
  { title: 'Opportunity match', description: 'Relevant creator work is matched thoughtfully, never automatically.', icon: ListChecks },
  { title: 'Written scope and payout', description: 'Scope, payout, usage rights, and agency terms are shared before acceptance.', icon: FileCheck2 },
  { title: 'Accept or decline', description: 'You choose whether the opportunity works for you.', icon: CheckCircle2 },
  { title: 'Paid work if accepted', description: 'Commercial work begins only after terms are accepted in writing.', icon: FileCheck2 }
];

const brandSteps = [
  { title: 'Submit brief', description: 'Share the format, product, audience, timing, and campaign objective.', icon: ClipboardCheck },
  { title: 'Choose package', description: 'Confirm the pilot, campaign, monthly engine, or custom scope.', icon: ListChecks },
  { title: 'Creator shortlist', description: 'Review suitable creator or host options against the brief.', icon: Headphones },
  { title: 'Confirm usage rights', description: 'Set duration, platforms, edits, whitelisting, and payment terms in writing.', icon: FileCheck2 },
  { title: 'Script and runbook', description: 'Align the session structure, product claims, moderation, and approvals.', icon: GraduationCap },
  { title: 'Creator acceptance', description: 'The creator sees the terms and voluntarily accepts or declines.', icon: CheckCircle2 },
  { title: 'Campaign execution', description: 'Run the livestream, product demo, content, or community session.', icon: Sparkles },
  { title: 'Report', description: 'Review agreed session notes, outcomes, and next-step recommendations.', icon: ListChecks },
  { title: 'Renew or plan next campaign', description: 'Extend only where the campaign, creator, and brand all agree.', icon: FileCheck2 }
];

type Journey = 'creators' | 'companies';

export const ProcessJourneyTabs = () => {
  const [journey, setJourney] = useState<Journey>('companies');
  const steps = journey === 'creators' ? creatorSteps : brandSteps;

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="mx-auto flex w-fit rounded-full border border-neon/20 bg-white p-1.5 shadow-card" role="tablist" aria-label="Journey type">
        {(['companies', 'creators'] as const).map((item) => (
          <button
            key={item}
            id={`${item}-journey-tab`}
            type="button"
            role="tab"
            aria-controls="journey-steps"
            aria-selected={journey === item}
            onClick={() => setJourney(item)}
            className={`min-h-11 rounded-full px-5 text-sm font-semibold transition ${journey === item ? 'bg-primary text-white shadow-neon' : 'text-cocoa hover:bg-porcelain'}`}
          >
            {item === 'creators' ? 'Creator Journey' : 'Company Journey'}
          </button>
        ))}
      </div>
      <div id="journey-steps" role="tabpanel" aria-labelledby={`${journey}-journey-tab`} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-xl border border-[#ECECF0] bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-neon/40 hover:shadow-soft sm:p-6">
            <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
            <step.icon className="mt-7 h-6 w-6 text-neon" aria-hidden />
            <h2 className="mt-5 font-display text-xl font-semibold text-espresso">{step.title}</h2>
            <p className="mt-3 text-sm leading-6 text-cocoa">{step.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
