import { BadgeCheck, LockKeyhole, ShieldCheck } from 'lucide-react';

const promises = ['Application is free', '18+ only', 'No joining fee or training debt', 'No adult or unsafe work', 'No income guarantee', 'You can decline opportunities'];

export const ApplicationTrustPanel = () => (
  <aside className="sticky top-28 border border-primary/15 bg-ink p-7 text-ivory shadow-soft">
    <p className="text-xs font-semibold uppercase tracking-[0.13em] text-gold">A calm place to start</p>
    <h2 className="mt-4 font-display text-4xl leading-tight">Your application stays in your control.</h2>
    <p className="mt-4 text-sm leading-6 text-champagne/80">Share only what helps us understand your creator goals. Your progress is stored locally in this browser until you submit.</p>
    <ul className="mt-7 space-y-4 text-sm text-champagne">
      {promises.map((item, index) => <li key={item} className="flex gap-3">{index < 4 ? <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden /> : <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />}{item}</li>)}
    </ul>
    <div className="mt-8 border border-white/15 bg-white/5 p-4 text-xs leading-5 text-champagne/80"><LockKeyhole className="mb-2 h-4 w-4 text-gold" aria-hidden />Paid commercial opportunities, if available, are shared with written scope, payout, usage rights, and agency fee terms before you accept.</div>
  </aside>
);
