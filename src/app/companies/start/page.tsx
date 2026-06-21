import type { Metadata } from 'next';
import { CheckCircle2, FileCheck2, Handshake } from 'lucide-react';
import { CompanyBriefForm } from '@/components/creator/CompanyBriefForm';
import { PageHero } from '@/components/creator/PageHero';

export const metadata: Metadata = {
  title: 'Build My Campaign | Alina Popova Studio',
  description: 'Share your campaign goal, platform, services, talent needs, budget, and timeline in a structured company brief.'
};

const briefPromises = [
  'A guided brief, not a sales maze',
  'Recommendation based on your campaign inputs',
  'Clear scope and usage discussion before any commitment',
  'Creator availability and commercial terms confirmed in writing'
];

export default function CompanyBriefPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Company campaign path"
        title="Build a creator-led campaign around the outcome you need."
        description="Tell us what you want to grow, where it needs to happen, and what support you need. We will qualify the brief and recommend a practical next path."
      />
      <section className="bg-porcelain/40 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-7 px-5 sm:px-8 lg:grid-cols-[0.66fr_1.34fr] lg:px-10">
          <aside className="hidden rounded-[36px] border border-primary/15 bg-white p-7 shadow-soft lg:block lg:sticky lg:top-28 lg:h-fit">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-porcelain text-primary"><Handshake className="h-5 w-5" aria-hidden /></div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-primary">A clear starting point</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-espresso">A campaign should start with clarity.</h2>
            <p className="mt-4 text-sm leading-6 text-cocoa">This brief gives the studio the context to recommend a sensible scope. It does not create a commitment, promise outcomes, or lock you into a package.</p>
            <ul className="mt-7 space-y-3">{briefPromises.map((item) => <li key={item} className="flex gap-3 rounded-[20px] border border-primary/10 bg-porcelain/60 p-4 text-sm leading-6 text-cocoa"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul>
            <div className="mt-7 rounded-[20px] border border-primary/15 bg-porcelain p-4 text-xs leading-5 text-cocoa"><FileCheck2 className="mb-2 h-4 w-4 text-primary" aria-hidden />Campaign pricing, deliverables, creator availability, usage rights, and outcomes are confirmed only through a written proposal or agreement.</div>
          </aside>
          <CompanyBriefForm />
        </div>
      </section>
    </>
  );
}
