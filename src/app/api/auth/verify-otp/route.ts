import { NextResponse } from 'next/server';
import { classifyIdentifier, findPlatformUserByIdentifier, verifyOtpToken } from '@/lib/platform-database';
import {
  PLATFORM_REGISTRATION_COOKIE,
  PLATFORM_SESSION_COOKIE,
  createPlatformSession,
  createRegistrationSession,
  platformCookieOptions,
  registrationCookieOptions
} from '@/lib/platform-auth';
import { isRateLimited } from '@/lib/rate-limit';

const getClientIp = (request: Request) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
const json = (payload: unknown, status = 200) => NextResponse.json(payload, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request) {
  const ip = getClientIp(request);
  try {
    const body = await request.json().catch(() => null);
    const identifierRaw = typeof body?.identifier === 'string' ? body.identifier.trim() : '';
    const otp = typeof body?.otp === 'string' ? body.otp.trim() : '';
    const identifierType = classifyIdentifier(identifierRaw);
    if (!identifierType || !/^\d{6}$/.test(otp)) {
      return json({ ok: false, error: 'Enter the 6-digit code sent to your email or phone.', code: 'VALIDATION_ERROR', data: null }, 400);
    }
    const identifier = identifierType === 'phone' ? identifierRaw.replace(/[\s-]/g, '') : identifierRaw.toLowerCase();
    if (isRateLimited(`otp-verify:${ip}:${identifier}`, 10, 15 * 60 * 1000)) {
      return json({ ok: false, error: 'Too many attempts. Please wait before trying again.', code: 'RATE_LIMITED', data: null }, 429);
    }

    const verification = await verifyOtpToken({ identifier, otp });
    if (!verification.ok) {
      const message = verification.code === 'EXPIRED_CODE'
        ? 'The code has expired. Please request a new one.'
        : verification.code === 'TOO_MANY_ATTEMPTS'
          ? 'Too many attempts. Please request a new code.'
          : 'That code is not correct. Please check and try again.';
      return json({ ok: false, error: message, code: verification.code, data: null }, 400);
    }

    const user = await findPlatformUserByIdentifier(identifier);
    if (user) {
      const session = createPlatformSession({ userId: user.id, userType: user.userType, email: user.email, phone: user.phone });
      if (!session) return json({ ok: false, error: 'Authentication is not configured.', code: 'AUTH_NOT_CONFIGURED', data: null }, 503);
      const response = json({ ok: true, error: null, code: null, data: { requiresRegistration: false, redirectTo: '/dashboard', userType: user.userType } });
      response.cookies.set(PLATFORM_SESSION_COOKIE, session, platformCookieOptions);
      response.cookies.set(PLATFORM_REGISTRATION_COOKIE, '', { ...registrationCookieOptions, maxAge: 0 });
      return response;
    }

    const registration = createRegistrationSession({ identifier, identifierType });
    if (!registration) return json({ ok: false, error: 'Authentication is not configured.', code: 'AUTH_NOT_CONFIGURED', data: null }, 503);
    const response = json({ ok: true, error: null, code: null, data: { requiresRegistration: true, redirectTo: '/register', identifierType } });
    response.cookies.set(PLATFORM_REGISTRATION_COOKIE, registration, registrationCookieOptions);
    return response;
  } catch (error) {
    const message = error instanceof Error && error.message.includes('DATABASE_URL is not configured')
      ? 'Database is not configured. Set DATABASE_URL before using OTP login.'
      : 'We could not verify the code. Please try again shortly.';
    const status = message.startsWith('Database') ? 503 : 500;
    return json({ ok: false, error: message, code: status === 503 ? 'DATABASE_NOT_CONFIGURED' : 'SERVER_ERROR', data: null }, status);
  }
}
