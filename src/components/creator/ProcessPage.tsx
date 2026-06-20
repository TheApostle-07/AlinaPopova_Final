import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/creator/PageHero';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { ProcessJourneyTabs } from '@/components/creator/ProcessJourneyTabs';

export const ProcessPage = () => (
  <>
    <PageHero eyebrow="How it works" title="A clear campaign path for companies and creators." description="Companies begin with a brief and clear marketing scope. Creators remain independent, receive terms before each opportunity, and never have to accept work that does not suit them." actions={<><Button href="/companies" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>Market My Company</Button><Button href="/apply" variant="secondary">Apply as Creator</Button></>} />
    <SectionWrapper>
      <ProcessJourneyTabs />
      <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-neon/20 bg-porcelain px-5 py-4 text-center text-sm leading-6 text-cocoa">Training and mock practice may be unpaid and non-commercial. Paid commercial work, creator scope, usage rights, and payout are confirmed in writing before it begins.</div>
    </SectionWrapper>
  </>
);
