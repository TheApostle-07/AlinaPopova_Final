import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { RegistrationWizard } from '@/components/platform/RegistrationWizard';
import { PLATFORM_REGISTRATION_COOKIE, getRegistrationSession } from '@/lib/platform-auth';

export const metadata: Metadata = {
  title: 'Choose Your Path | Alina Popova Studio',
  description: 'Choose the right public profile path for your company brief, creator application, specialist profile, or invite.'
};

export default function OnboardingRolePage() {
  const verifiedIdentifier = getRegistrationSession(cookies().get(PLATFORM_REGISTRATION_COOKIE)?.value);
  return <RegistrationWizard verifiedIdentifier={verifiedIdentifier} />;
}
