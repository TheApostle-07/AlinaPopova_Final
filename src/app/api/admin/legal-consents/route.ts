import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-auth';
import { adminError, adminErrorFrom, adminSuccess } from '@/lib/admin-response';
import { getLegalConsents } from '@/lib/database';

const authorized = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return isValidAdminSession(token);
};

export async function GET(request: Request) {
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', [], 401);
  try {
    return adminSuccess({ consents: await getLegalConsents() });
  } catch (error) {
    return adminErrorFrom(error, 'Unable to load legal consent records. Please check the database connection.', []);
  }
}
