import { adminError, adminSuccess } from '@/lib/admin-response';
import { ADMIN_COOKIE, adminAuthConfigured, isValidAdminSession } from '@/lib/admin-auth';

const authorized = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return isValidAdminSession(token);
};

export async function GET(request: Request) {
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', null, 401);
  return adminSuccess({
    adminAuthConfigured: adminAuthConfigured(),
    databaseConfigured: Boolean(process.env.DATABASE_URL),
    siteUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    legalVersion: '2026-06-21'
  });
}
