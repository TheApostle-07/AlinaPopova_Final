import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@/components/ui/Card';
import { CareersApplicationSection } from '@/components/sections/CareersApplicationSection';

export const metadata: Metadata = {
  title: 'Application Form – Alina Popova Studio',
  description: 'Apply to become a female livestream host with Alina Popova Studio in Delhi NCR.'
};

const ApplyPage = () => (
  <SectionWrapper className="pt-28">
    <Card className="mx-auto max-w-4xl border-none bg-transparent shadow-none">
      <CareersApplicationSection />
    </Card>
  </SectionWrapper>
);

export default ApplyPage;
