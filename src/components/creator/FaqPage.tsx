import { PageHero } from '@/components/creator/PageHero';
import { FaqExplorer } from '@/components/creator/FaqExplorer';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export const FaqPage = () => (
  <>
    <PageHero eyebrow="FAQs" title="Clear answers before you apply or book." description="Search by creator, brand, payment, or safety topics. The language is deliberately plain so you understand the program before taking a next step." />
    <SectionWrapper><FaqExplorer /></SectionWrapper>
  </>
);
