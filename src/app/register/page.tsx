import type { Metadata } from 'next';
import { RegistrationWizard } from '@/components/platform/RegistrationWizard';

export const metadata: Metadata = {
  title: 'Register | Alina Popova Studio OS',
  description: 'Create a company, creator, or specialist profile for the Alina Popova Studio campaign operating system.'
};

export default function RegisterPage() {
  return <RegistrationWizard />;
}
