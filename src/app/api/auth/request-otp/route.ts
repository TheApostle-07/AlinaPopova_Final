import { NextResponse } from 'next/server';
import { classifyIdentifier, createOtpToken, generateOtp, getOtpDebugHash } from '@/lib/platform-database';
import { isRateLimited } from '@/lib/rate-limit';

const getClientIp = (request: Request) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

const json = (payload: unknown, status = 200) => NextResponse.json(payload, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request) {
  const ip = getClientIp(request);
  try {
    const body = await request.json().catch(() => null);
    const identifierRaw = typeof body?.identifier === 'string' ? body.identifier.trim() : '';
    const identifierType = classifyIdentifier(identifierRaw);
    if (!identifierType) {
      return json({ ok: false, error: 'Enter a valid email address or phone number.', code: 'VALIDATION_ERROR', data: null }, 400);
    }

    const identifier = identifierType === 'phone' ? identifierRaw.replace(/[\s-]/g, '') : identifierRaw.toLowerCase();
    const rateKey = `otp:${ip}:${identifier}`;
    if (isRateLimited(rateKey, 5, 60 * 60 * 1000)) {
      return json({ ok: false, error: 'Too many code requests. Please wait before requesting another code.', code: 'RATE_LIMITED', data: null }, 429);
    }

    const otp = generateOtp();
    await createOtpToken({
      identifier,
      identifierType,
      otp,
      ip,
      userAgent: request.headers.get('user-agent')
    });

    const providerConfigured = Boolean(process.env.RESEND_API_KEY || process.env.OTP_PROVIDER_WEBHOOK_URL || process.env.WHATSAPP_OTP_PROVIDER_URL);
    return json({
      ok: true,
      error: null,
      code: null,
      data: {
        delivery: providerConfigured ? 'sent' : 'development_preview',
        identifierType,
        resendAfterSeconds: 60,
        previewCode: providerConfigured ? null : otp,
        debugRef: getOtpDebugHash(identifier)
      }
    });
  } catch (error) {
    const message = error instanceof Error && error.message.includes('DATABASE_URL is not configured')
      ? 'Database is not configured. Set DATABASE_URL before using OTP login.'
      : 'We could not send the code. Please try again shortly.';
    const status = message.startsWith('Database') ? 503 : 500;
    return json({ ok: false, error: message, code: status === 503 ? 'DATABASE_NOT_CONFIGURED' : 'SERVER_ERROR', data: null }, status);
  }
}
