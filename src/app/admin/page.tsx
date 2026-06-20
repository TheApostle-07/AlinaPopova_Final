import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { adminAuthConfigured, hasAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return <AdminDashboard initialAuthenticated={hasAdminSession()} configured={adminAuthConfigured()} />;
}
