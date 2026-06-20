import { BadgeCheck, BarChart3, BriefcaseBusiness, CheckCircle2, Clapperboard, Sparkles, UsersRound } from 'lucide-react';

const campaignServices = [
  ['UGC + Reels', 'Creator-led content', Clapperboard],
  ['Live Marketing', 'Hosting + runbooks', BriefcaseBusiness],
  ['Creator Campaigns', 'Shortlist + delivery', UsersRound]
] as const;

export const CreatorLaunchDashboard = () => (
  <div className="relative mx-auto w-full max-w-[920px]" role="img" aria-label="Company marketing and creator network dashboard preview">
    <div className="rounded-[44px] border border-[#ECECF0] bg-white p-5 shadow-[0_30px_100px_rgba(255,45,170,0.18)] sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECECF0] pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-porcelain text-primary"><Sparkles className="h-5 w-5" aria-hidden /></span>
          <div><p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">Studio workspace</p><p className="font-display text-xl text-espresso">Campaigns + Creator Network</p></div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sage/15 bg-sage/10 px-3 py-1.5 text-xs font-semibold text-[#527057]"><BadgeCheck className="h-3.5 w-3.5" aria-hidden /> Safety verified</span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-[#ECECF0] bg-[#FFF9FD] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa">For companies</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {campaignServices.map(([title, status, Icon], index) => (
              <div key={title} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-card">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${index === 0 ? 'bg-sage/15 text-[#527057]' : 'bg-porcelain text-primary'}`}><Icon className="h-4 w-4" aria-hidden /></span>
                <div className="min-w-0"><p className="truncate text-sm font-semibold text-espresso">{title}</p><p className="text-xs text-cocoa">{status}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-neon/20 bg-porcelain p-4 text-espresso">
          <BarChart3 className="h-5 w-5 text-primary" aria-hidden />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-cocoa">For creators</p>
          <p className="mt-2 font-display text-2xl">Creator Network</p>
          <p className="mt-1 text-xs leading-5 text-cocoa">Apply, get reviewed, and match only when a suitable campaign exists.</p>
          <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-primary"><CheckCircle2 className="h-4 w-4" aria-hidden /> You choose each brief</div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#ECECF0] bg-white px-4 py-3">
        <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa">Campaign standard</p><p className="mt-1 text-sm font-semibold text-espresso">Clear scope, usage rights, creator consent, and payout terms.</p></div>
        <span className="rounded-full bg-porcelain px-3 py-1.5 text-xs font-semibold text-primary">Terms first</span>
      </div>
    </div>
    <div className="absolute -right-3 -top-3 hidden rounded-full border border-neon/30 bg-white px-3 py-2 text-xs font-semibold text-espresso shadow-neon sm:block">Campaign-ready</div>
  </div>
);
