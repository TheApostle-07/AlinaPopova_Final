import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const HomeCTASection = () => (
  <SectionWrapper className="text-center">
    <div className="mx-auto max-w-3xl space-y-6 rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 px-8 py-16 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Ready When You Are</p>
      <h2 className="text-3xl font-semibold text-foreground">Book a calm, structured discovery call.</h2>
      <p className="text-base text-slate-600">
        Tell us about your livestream goals—whether you are a founder, creative director, or host exploring new tiers. We reply
        within 48 working hours with next steps.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button href="/apply" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Apply Now</Button>
      </div>
    </div>
  </SectionWrapper>
);
