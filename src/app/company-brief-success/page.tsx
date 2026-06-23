import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CompanyBriefSuccessPage() {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-3xl items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="w-full rounded-[40px] border border-primary/15 bg-white p-8 shadow-soft sm:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary">Brief received</p>
        <h1 className="mt-4 font-display text-4xl text-espresso">Your company brief is in the review queue.</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-cocoa">We will review the goal, channel, service needs, budget, and timeline before suggesting a next step. Scope, pricing, creator availability, usage rights, and outcomes are always confirmed in writing.</p>
        <Button href="/services" className="mt-8">Explore Services</Button>
      </div>
    </section>
  );
}
