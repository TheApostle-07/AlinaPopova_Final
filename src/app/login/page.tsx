import type { Metadata } from 'next';
import { AuthPortal } from '@/components/platform/AuthPortal';

export const metadata: Metadata = {
  title: 'Login | Alina Popova Studio OS',
  description: 'Secure OTP login for companies, creators, specialists, and campaign collaborators.'
};

export default function LoginPage() {
  return <AuthPortal />;
}
