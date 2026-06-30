import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { CampaignOSWorkspace } from '@/components/platform/CampaignOSWorkspace';
import { getPlatformSession } from '@/lib/platform-auth';
import { getPlatformDashboardData } from '@/lib/platform-database';

export const metadata: Metadata = {
  title: 'Workspace | Alina Popova Studio OS',
  description: 'Project, team, task, file, deliverable, approval, usage rights, payments, and reporting workspace.'
};

export default async function WorkspacePage() {
  const session = getPlatformSession();
  if (!session) redirect('/login');

  try {
    const data = await getPlatformDashboardData(session.userId);
    if (!data) redirect('/login');
    return <CampaignOSWorkspace data={data} />;
  } catch (error) {
    const databaseMissing = error instanceof Error && error.message.includes('DATABASE_URL is not configured');
    return (
      <main className="flex min-h-screen items-center justify-center bg-softwhite px-5">
        <section className="max-w-xl rounded-[36px] border border-primary/15 bg-white p-8 text-center shadow-soft">
          <AlertTriangle className="mx-auto h-8 w-8 text-primary" aria-hidden />
          <h1 className="mt-5 font-display text-3xl font-semibold text-espresso">Workspace database is not connected.</h1>
          <p className="mt-4 text-sm leading-7 text-cocoa">
            {databaseMissing ? 'Set DATABASE_URL to use the Campaign OS workspace records.' : 'The workspace could not load right now. Please try again shortly.'}
          </p>
          <Link href="/dashboard" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white">Back to dashboard</Link>
        </section>
      </main>
    );
  }
}
