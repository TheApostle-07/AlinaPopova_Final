import type { Metadata } from 'next';
import { RegistrationWizard } from '@/components/platform/RegistrationWizard';

export const metadata: Metadata = {
  title: 'Choose Your Path | Alina Popova Studio',
  description: 'Choose the right public profile path for your company brief, creator application, specialist profile, or invite.'
};

export default function OnboardingRolePage() {
  return <RegistrationWizard />;
}
