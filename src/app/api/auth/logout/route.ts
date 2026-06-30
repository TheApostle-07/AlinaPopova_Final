import { NextResponse } from 'next/server';
import { PLATFORM_REGISTRATION_COOKIE, PLATFORM_SESSION_COOKIE, expiredPlatformCookieOptions } from '@/lib/platform-auth';

export async function POST() {
  const response = NextResponse.json({ ok: true, data: { signedOut: true }, error: null, code: null }, { headers: { 'Cache-Control': 'no-store' } });
  response.cookies.set(PLATFORM_SESSION_COOKIE, '', expiredPlatformCookieOptions);
  response.cookies.set(PLATFORM_REGISTRATION_COOKIE, '', expiredPlatformCookieOptions);
  return response;
}
