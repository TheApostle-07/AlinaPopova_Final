import { BadgeCheck, BarChart3, CircleCheck, LockKeyhole, PlayCircle, Sparkles } from 'lucide-react';

const modules = [
  ['Camera Confidence', 'Complete', CircleCheck],
  ['Livestream Hosting', 'In progress', PlayCircle],
  ['Brand-Safe Communication', 'Next module', LockKeyhole]
] as const;

export const CreatorLaunchDashboard = () => (
  <div className="relative mx-auto w-full max-w-[560px]" role="img" aria-label="Creator Launch Intake dashboard preview">
    <div className="border border-primary/15 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex items-center justify-between border-b border-primary/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blush/35 text-primary"><Sparkles className="h-5 w-5" aria-hidden /></span>
          <div><p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">Creator dashboard</p><p className="font-display text-xl text-espresso">Launch Intake</p></div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-sage/15 px-2.5 py-1 text-xs font-semibold text-[#527057]"><BadgeCheck className="h-3.5 w-3.5" aria-hidden /> Safety verified</span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
        <div className="border border-primary/10 bg-porcelain p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa">Your learning path</p>
          <div className="mt-4 space-y-3">
            {modules.map(([title, status, Icon], index) => (
              <div key={title} className="flex items-center gap-3">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${index === 0 ? 'bg-sage/15 text-[#527057]' : 'bg-white text-primary'}`}><Icon className="h-4 w-4" aria-hidden /></span>
                <div className="min-w-0"><p className="truncate text-sm font-semibold text-espresso">{title}</p><p className="text-xs text-cocoa">{status}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-ink p-4 text-ivory">
          <BarChart3 className="h-5 w-5 text-gold" aria-hidden />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-champagne/75">Tier progress</p>
          <p className="mt-2 font-display text-3xl">02</p>
          <p className="mt-1 text-xs leading-5 text-champagne/80">Creator Launch Intake</p>
          <div className="mt-5 h-1.5 bg-white/15"><div className="h-full w-2/3 bg-gold" /></div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border border-primary/10 bg-white px-4 py-3">
        <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-cocoa">Opportunity preview</p><p className="mt-1 text-sm font-semibold text-espresso">Product demo · lifestyle campaign</p></div>
        <span className="rounded-md bg-blush/25 px-2.5 py-1 text-xs font-semibold text-primary">Terms first</span>
      </div>
    </div>
    <div className="absolute -right-3 -top-3 hidden border border-gold/40 bg-champagne px-3 py-2 text-xs font-semibold text-espresso shadow-sm sm:block">₹0 to apply</div>
  </div>
);
