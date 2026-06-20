import { BarChart3, ClipboardList, FileCheck2, UsersRound } from 'lucide-react';

export const BrandOperationsPreview = () => (
  <div className="border border-primary/15 bg-white p-4 shadow-soft sm:p-5" role="img" aria-label="Brand campaign operations preview">
    <div className="flex items-center justify-between border-b border-primary/10 pb-4"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Campaign workspace</p><p className="mt-1 font-display text-2xl text-espresso">Live Shopping Pilot</p></div><span className="rounded-md bg-sage/15 px-2.5 py-1 text-xs font-semibold text-[#527057]">Brief approved</span></div>
    <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-primary/10 bg-porcelain p-3"><UsersRound className="h-5 w-5 text-primary" aria-hidden /><p className="mt-5 text-xs text-cocoa">Creator shortlist</p><p className="mt-1 text-xl font-semibold text-espresso">03</p></div><div className="border border-primary/10 bg-porcelain p-3"><ClipboardList className="h-5 w-5 text-primary" aria-hidden /><p className="mt-5 text-xs text-cocoa">Runbook</p><p className="mt-1 text-xl font-semibold text-espresso">Ready</p></div><div className="border border-primary/10 bg-porcelain p-3"><BarChart3 className="h-5 w-5 text-primary" aria-hidden /><p className="mt-5 text-xs text-cocoa">Post-live report</p><p className="mt-1 text-xl font-semibold text-espresso">Included</p></div></div>
    <div className="mt-3 flex items-center gap-3 border border-gold/40 bg-champagne/45 px-4 py-3 text-sm text-espresso"><FileCheck2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />Usage rights, creator scope, and payment terms are confirmed before work begins.</div>
  </div>
);
