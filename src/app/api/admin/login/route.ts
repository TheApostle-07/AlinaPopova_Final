import { NextResponse } from 'next/server';
import { adminAuthConfigured, adminCookieOptions, ADMIN_COOKIE, createAdminSession, passwordsMatch } from '@/lib/admin-auth';
import { isRateLimited } from '@/lib/rate-limit';

const getClientIp = (request: Request) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`admin-login:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: 'Too many login attempts. Please try again later.' }, { status: 429 });
  }

  if (!adminAuthConfigured()) {
    return NextResponse.json({ ok: false, error: 'Admin authentication is not configured.' }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!passwordsMatch(password)) {
    return NextResponse.json({ ok: false, error: 'Invalid password.' }, { status: 401 });
  }

  const session = createAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: 'Admin authentication is not configured.' }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, session, adminCookieOptions);
  return response;
}
