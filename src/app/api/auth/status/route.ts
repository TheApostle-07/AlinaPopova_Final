import { NextResponse } from 'next/server';
import { PLATFORM_SESSION_COOKIE, getPlatformSession } from '@/lib/platform-auth';

const json = (payload: unknown, status = 200) => NextResponse.json(payload, { status, headers: { 'Cache-Control': 'no-store' } });

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${PLATFORM_SESSION_COOKIE}=`))?.slice(`${PLATFORM_SESSION_COOKIE}=`.length);
  const session = getPlatformSession(token);

  return json({
    ok: true,
    error: null,
    code: null,
    data: session
      ? { authenticated: true, userType: session.userType }
      : { authenticated: false, userType: null }
  });
}
