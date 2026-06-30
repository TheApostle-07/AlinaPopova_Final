import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthPortal } from '@/components/platform/AuthPortal';

export const metadata: Metadata = {
  title: 'Login | Alina Popova Studio OS',
  description: 'Secure OTP login for companies, creators, specialists, and campaign collaborators.'
};

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-softwhite px-5"><div className="rounded-[32px] border border-primary/15 bg-white p-8 text-center shadow-soft"><p className="text-sm font-semibold text-primary">Loading secure gateway...</p></div></main>}>
      <AuthPortal />
    </Suspense>
  );
}
