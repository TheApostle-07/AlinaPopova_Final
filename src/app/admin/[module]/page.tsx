import { notFound } from 'next/navigation';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { adminAuthConfigured, hasAdminSession } from '@/lib/admin-auth';
import { isAdminModule } from '@/lib/admin-modules';

export const dynamic = 'force-dynamic';

export default function AdminModulePage({ params }: { params: { module: string } }) {
  if (!isAdminModule(params.module) || params.module === 'dashboard') notFound();
  return <AdminDashboard initialAuthenticated={hasAdminSession()} configured={adminAuthConfigured()} initialModule={params.module} />;
}
