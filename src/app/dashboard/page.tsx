import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getPlatformSession } from '@/lib/platform-auth';
import { getPlatformHomePath } from '@/lib/platform-routes';

export const metadata: Metadata = {
  title: 'Dashboard | Alina Popova Studio OS',
  description: 'Role-specific campaign operating dashboard for creators, companies, and internal campaign teams.'
};

export default async function DashboardPage() {
  const session = getPlatformSession();
  if (!session) redirect('/login');
  redirect(getPlatformHomePath(session.userType));
}
