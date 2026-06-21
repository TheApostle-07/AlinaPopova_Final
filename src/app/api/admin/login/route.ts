import { NextResponse } from 'next/server';
import { adminAuthConfigured, adminCookieOptions, ADMIN_COOKIE, createAdminSession, passwordsMatch } from '@/lib/admin-auth';
import { adminError, adminSuccess } from '@/lib/admin-response';
import { isRateLimited } from '@/lib/rate-limit';

const getClientIp = (request: Request) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`admin-login:${ip}`, 5, 15 * 60 * 1000)) {
    return adminError('Too many login attempts. Please try again later.', 'VALIDATION_ERROR', null, 429);
  }

  if (!adminAuthConfigured()) {
    return adminError('Admin authentication is not configured.', 'DATABASE_NOT_CONFIGURED', null, 503);
  }

  try {
    const body = await request.json().catch(() => null);
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!passwordsMatch(password)) {
      return adminError('Invalid password.', 'UNAUTHORIZED', null, 401);
    }

    const session = createAdminSession();
    if (!session) {
      return adminError('Admin authentication is not configured.', 'DATABASE_NOT_CONFIGURED', null, 503);
    }

    const response = adminSuccess({ authenticated: true });
    response.cookies.set(ADMIN_COOKIE, session, adminCookieOptions);
    return response;
  } catch {
    return adminError('Unable to complete admin sign-in.', 'SERVER_ERROR', null, 500);
  }
}
