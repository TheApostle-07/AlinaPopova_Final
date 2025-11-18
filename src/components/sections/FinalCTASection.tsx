import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';

export const FinalCTASection = () => (
  <SectionWrapper className="text-center">
    <div className="mx-auto max-w-3xl space-y-6 rounded-[2.5rem] border border-slate-200 bg-gradient-to-b from-white via-white to-slate-50 px-6 py-16 shadow-sm sm:px-12">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Ready to Explore Your Tier?</p>
      <p className="text-xl text-slate-600">
        If this feels aligned with your personality and pace, we’d love to understand you better. Share your details, and we’ll
        reach out for a short, no-pressure introductory interaction.
      </p>
      <Button href="/apply">Apply Now</Button>
      <p className="text-sm text-slate-500">You’ll be redirected to a short application form. It usually takes less than 3–5 minutes to complete.</p>
    </div>
  </SectionWrapper>
);
