import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export const metadata: Metadata = {
  title: 'Terms & Guidelines – Alina Popova Studio'
};

const TermsPage = () => (
  <SectionWrapper className="pt-28">
    <div className="mx-auto max-w-3xl space-y-6 text-left text-sm text-slate-600">
      <h1 className="text-3xl font-semibold text-foreground">Terms & Guidelines</h1>
      <p>
        Engagements with Alina Popova Studio begin only after you complete the application, attend an introductory call, and sign the onboarding
        document outlining studio conduct, confidentiality, and payout cadence. All scheduling commitments must be honored unless an emergency is
        reported at least 12 hours in advance.
      </p>
      <p>
        Hosts agree not to disclose internal processes, scripts, or pricing shared during onboarding. Content captured inside the studio remains the
        property of Alina Popova Studio and its partner brands. We reserve the right to pause or discontinue an engagement if the guidelines are not
        met or if client feedback requires a change.
      </p>
      <p>
        These terms may be updated without prior notice; when we make material changes, we will highlight them during ongoing sessions and inside the
        application form. Continuing to work with Alina Popova Studio indicates your acceptance of these terms and guidelines.
      </p>
    </div>
  </SectionWrapper>
);

export default TermsPage;
