import { Check } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

const qualities = [
  'Women 18+, based in Delhi NCR',
  'Comfortable speaking on camera in Hindi and/or English',
  'Polite, calm and good with conversations',
  'Able to commit to agreed slots on time',
  'Open to learning formats, scripts and hosting styles',
  'No large follower count required – we care more about presence than popularity'
];

export const WhoWeLookForSection = () => (
  <SectionWrapper>
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Who Is This For?</p>
        <p className="text-base text-slate-500">We’re looking for hosts who feel aligned with this style of work:</p>
      </div>
      <div className="mx-auto max-w-3xl space-y-3 text-left">
        {qualities.map((quality) => (
          <p key={quality} className="flex items-start gap-3 text-sm text-slate-600">
            <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span>{quality}</span>
          </p>
        ))}
      </div>
      <p className="text-sm text-slate-500">
        Previous livestream or content experience is a plus, but not compulsory.
      </p>
    </div>
  </SectionWrapper>
);
