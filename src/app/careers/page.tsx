import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutStudioSection } from '@/components/sections/AboutStudioSection';
import { WhyHostWithUsSection } from '@/components/sections/WhyHostWithUsSection';
import { EngagementTiersSection } from '@/components/sections/EngagementTiersSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { WhoWeLookForSection } from '@/components/sections/WhoWeLookForSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { CareersApplicationSection } from '@/components/sections/CareersApplicationSection';

export const metadata: Metadata = {
  title: 'Careers | Alina Popova Studio',
  description:
    'Explore structured hiring for female livestream hosts in Delhi NCR with Alina Popova Studio. Learn about tiers, process, and how to apply.'
};

const CareersPage = () => (
  <>
    <HeroSection />
    <AboutStudioSection />
    <WhyHostWithUsSection />
    <EngagementTiersSection />
    <HowItWorksSection />
    <CareersApplicationSection />
    <WhoWeLookForSection />
    <FAQSection />
    <FinalCTASection />
  </>
);

export default CareersPage;
