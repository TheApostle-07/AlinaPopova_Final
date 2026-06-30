import type { Metadata } from 'next';
import { RegistrationWizard } from '@/components/platform/RegistrationWizard';

export const metadata: Metadata = {
  title: 'Choose Your Role | Alina Popova Studio OS',
  description: 'Choose whether you are joining Alina Popova Studio as a company, creator, specialist, client reviewer, or internal team member.'
};

export default function OnboardingRolePage() {
  return <RegistrationWizard />;
}
