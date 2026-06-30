import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { PlatformUsersAdmin } from '@/components/admin/PlatformUsersAdmin';
import { adminAuthConfigured, hasAdminSession } from '@/lib/admin-auth';
import { getPlatformUsersForAdmin } from '@/lib/platform-database';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const authenticated = hasAdminSession();
  if (!authenticated) {
    return <AdminDashboard initialAuthenticated={false} configured={adminAuthConfigured()} />;
  }

  try {
    return <PlatformUsersAdmin users={await getPlatformUsersForAdmin()} />;
  } catch {
    return <PlatformUsersAdmin users={[]} />;
  }
}
