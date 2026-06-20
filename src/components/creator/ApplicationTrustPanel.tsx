import { BadgeCheck, LockKeyhole, ShieldCheck } from 'lucide-react';

const promises = ['Application is free', '18+ only', 'No joining fee or training debt', 'No adult or unsafe work', 'No income guarantee', 'You can decline opportunities'];

export const ApplicationTrustPanel = () => (
  <aside className="lg:sticky lg:top-28 rounded-[36px] border border-primary/15 bg-porcelain/65 p-7 text-espresso shadow-soft">
    <p className="text-xs font-semibold uppercase tracking-[0.13em] text-primary">A calm place to start</p>
    <h2 className="mt-4 font-display text-4xl leading-tight">Your application stays in your control.</h2>
    <p className="mt-4 text-sm leading-6 text-cocoa">Share only what helps us understand your creator goals. Your progress is stored locally in this browser until you submit.</p>
    <ul className="mt-7 space-y-3 text-sm text-cocoa">
      {promises.map((item, index) => <li key={item} className="flex gap-3 rounded-xl border border-primary/10 bg-white px-4 py-3">{index < 4 ? <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden /> : <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />}{item}</li>)}
    </ul>
    <div className="mt-8 rounded-2xl border border-primary/15 bg-white p-4 text-xs leading-5 text-cocoa"><LockKeyhole className="mb-2 h-4 w-4 text-primary" aria-hidden />Paid commercial opportunities, if available, are shared with written scope, payout, usage rights, and agency fee terms before you accept.</div>
  </aside>
);
