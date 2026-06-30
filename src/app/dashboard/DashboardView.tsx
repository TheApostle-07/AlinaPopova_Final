import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import { PlatformDashboard } from '@/components/platform/PlatformDashboard';
import { getPlatformSession } from '@/lib/platform-auth';
import { getPlatformDashboardData } from '@/lib/platform-database';

export const DashboardView = async () => {
  const session = getPlatformSession();
  if (!session) redirect('/login');

  try {
    const data = await getPlatformDashboardData(session.userId);
    if (!data) redirect('/login');
    return <PlatformDashboard data={data} />;
  } catch (error) {
    const databaseMissing = error instanceof Error && error.message.includes('DATABASE_URL is not configured');
    return (
      <main className="flex min-h-screen items-center justify-center bg-softwhite px-5">
        <section className="max-w-xl rounded-[36px] border border-primary/15 bg-white p-8 text-center shadow-soft">
          <AlertTriangle className="mx-auto h-8 w-8 text-primary" aria-hidden />
          <h1 className="mt-5 font-display text-3xl font-semibold text-espresso">Platform database is not connected.</h1>
          <p className="mt-4 text-sm leading-7 text-cocoa">
            {databaseMissing ? 'Set DATABASE_URL to use registration, dashboards, projects, tasks, files, approvals, usage rights, and payments.' : 'The dashboard could not load right now. Please try again shortly.'}
          </p>
          <Link href="/login" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white">Back to login</Link>
        </section>
      </main>
    );
  }
};
