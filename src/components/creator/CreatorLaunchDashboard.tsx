import { BadgeCheck, BriefcaseBusiness, CheckCircle2, Clapperboard, FileCheck2, Sparkles, UsersRound } from 'lucide-react';

const companyFlow = [
  ['Campaign Brief', BriefcaseBusiness],
  ['Creator Shortlist', UsersRound],
  ['UGC Production', Clapperboard],
  ['Livestream Flow', Sparkles],
  ['Content Delivery', FileCheck2],
  ['Reporting', CheckCircle2]
] as const;

const creatorFlow = [
  'Free application',
  'Shortlisting',
  'Training if selected',
  'Tier placement',
  'Opportunity match',
  'Accept or decline'
] as const;

export const CreatorLaunchDashboard = () => (
  <div className="relative mx-auto w-full max-w-[920px]" role="img" aria-label="Company marketing and creator network dashboard preview">
    <div className="rounded-[44px] border border-primary/20 bg-white p-5 shadow-[0_30px_90px_rgba(214,51,132,0.12)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECECF0] pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-porcelain text-primary"><Sparkles className="h-5 w-5" aria-hidden /></span>
          <div><p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">Studio workspace</p><p className="font-display text-xl text-espresso">Campaigns + Creator Network</p></div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sage/15 bg-sage/10 px-3 py-1.5 text-xs font-semibold text-[#527057]"><BadgeCheck className="h-3.5 w-3.5" aria-hidden /> Safety verified</span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-[#ECECF0] bg-champagne p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Company Growth Engine</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {companyFlow.map(([title, Icon]) => <div key={title} className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-card"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-porcelain text-primary"><Icon className="h-4 w-4" aria-hidden /></span><p className="text-sm font-semibold text-espresso">{title}</p></div>)}
          </div>
        </div>
        <div className="rounded-2xl border border-primary/20 bg-porcelain p-4 text-espresso sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Creator Network</p>
          <p className="mt-2 font-display text-2xl">A clear path, with choice at every stage.</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">{creatorFlow.map((item) => <li key={item} className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 text-sm font-semibold text-espresso shadow-card"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul>
          <p className="mt-4 flex items-center gap-2 text-xs leading-5 text-cocoa"><BadgeCheck className="h-4 w-4 shrink-0 text-sage" aria-hidden /> Paid work begins only after written terms are accepted.</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#ECECF0] bg-white px-4 py-3">
        <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa">Campaign standard</p><p className="mt-1 text-sm font-semibold text-espresso">Clear scope, usage rights, creator consent, and payout terms.</p></div>
        <span className="rounded-full bg-porcelain px-3 py-1.5 text-xs font-semibold text-primary">Terms first</span>
      </div>
    </div>
    <div className="absolute -right-3 -top-3 hidden rounded-full border border-primary/25 bg-white px-3 py-2 text-xs font-semibold text-espresso shadow-neon sm:block">Campaign-ready</div>
  </div>
);
