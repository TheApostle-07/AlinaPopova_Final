import { BriefcaseBusiness, CheckCircle2, Clapperboard, FileCheck2, UsersRound } from 'lucide-react';

const studioColumns = [
  { title: 'Strategy', items: ['Brand brief', 'Campaign angle', 'Content plan'], icon: BriefcaseBusiness },
  { title: 'Creators', items: ['Creator shortlist', 'Creator acceptance', 'Written scope'], icon: UsersRound },
  { title: 'Delivery', items: ['UGC / Live / Demo', 'Usage rights', 'Reporting'], icon: Clapperboard }
] as const;

export const CreatorLaunchDashboard = () => (
  <div className="relative mx-auto w-full max-w-[920px]" role="img" aria-label="Company marketing and creator network dashboard preview">
    <div className="panel-gradient rounded-[44px] border border-primary/15 p-4 shadow-soft sm:p-7">
      <div className="rounded-[36px] border border-[#ECE8EC] bg-white p-5 sm:p-7">
        <div className="text-center"><p className="text-xs font-semibold uppercase text-primary">The Alina Popova Studio System</p><p className="mt-2 font-display text-2xl text-espresso">Strategy, creators, and delivery in one managed flow.</p></div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">{studioColumns.map((column) => <div key={column.title} className="border-t border-[#ECE8EC] pt-5 md:border-l md:border-t-0 md:pl-5"><column.icon className="h-5 w-5 text-primary" aria-hidden /><h2 className="mt-4 text-lg font-semibold text-espresso">{column.title}</h2><ul className="mt-4 space-y-3 text-sm text-cocoa">{column.items.map((item) => <li key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />{item}</li>)}</ul></div>)}</div>
        <p className="mt-7 border-t border-[#ECE8EC] pt-5 text-center text-sm font-medium text-cocoa"><FileCheck2 className="mr-2 inline h-4 w-4 text-primary" aria-hidden />Brand-safe execution. Clear terms. Creator consent.</p>
      </div>
    </div>
  </div>
);
