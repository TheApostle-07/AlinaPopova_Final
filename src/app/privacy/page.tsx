import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/layout/SectionWrapper';

export const metadata: Metadata = {
  title: 'Privacy Policy – Alina Popova Studio'
};

const PrivacyPage = () => (
  <SectionWrapper className="pt-28">
    <div className="mx-auto max-w-3xl space-y-6 text-left text-sm text-slate-600">
      <h1 className="text-3xl font-semibold text-foreground">Privacy Policy</h1>
      <p>
        Alina Popova Studio collects the information you choose to share when you submit an application or speak with our team. We use this data to
        schedule calls, align tiers, and stay in touch about hosting opportunities. We do not sell or rent your personal information and only share it
        internally with the producers and operations team supporting your sessions.
      </p>
      <p>
        Session notes, schedules, and payouts are stored securely and are retained only as long as they are required for project tracking and payment
        records. You can request an export or deletion of your information by submitting a fresh application entry with the subject “Privacy Request”.
        Our team will respond within 3–5 working days.
      </p>
      <p>
        This policy may be updated as our internal processes evolve. When we make a significant change, we will highlight it in the application form
        and other communication channels. By continuing to work with Alina Popova Studio you agree to this policy and the way we handle personal data.
      </p>
    </div>
  </SectionWrapper>
);

export default PrivacyPage;
