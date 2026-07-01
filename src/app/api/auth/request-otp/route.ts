import { NextResponse } from 'next/server';
import { classifyIdentifier, createOtpToken, generateOtp, getOtpDebugHash } from '@/lib/platform-database';
import { isRateLimited } from '@/lib/rate-limit';
import { deliverOtp } from '@/lib/otp-delivery';

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

    const delivery = await deliverOtp({ identifier, identifierType, otp });
    if (!delivery.ok) {
      if (delivery.error?.includes('configured')) console.error('OTP delivery provider is not configured:', delivery.error);
      return json({
        ok: false,
        error: delivery.error === 'Email verification is not configured.' || delivery.error === 'Phone verification is not configured.'
          ? 'Verification is temporarily unavailable. Please contact support.'
          : 'We could not send the code. Please try again shortly.',
        code: delivery.error?.includes('configured') ? 'OTP_DELIVERY_NOT_CONFIGURED' : 'OTP_DELIVERY_FAILED',
        data: { debugRef: getOtpDebugHash(identifier) }
      }, delivery.error?.includes('configured') ? 503 : 502);
    }

    return json({
      ok: true,
      error: null,
      code: null,
      data: {
        delivery: delivery.delivery,
        identifierType,
        resendAfterSeconds: 60,
        previewCode: delivery.delivery === 'development_preview' ? otp : null,
        debugRef: getOtpDebugHash(identifier)
      }
    });
  } catch (error) {
    console.error('OTP request failed:', error instanceof Error ? error.message : 'Unknown error');
    const message = error instanceof Error && error.message.includes('DATABASE_URL is not configured')
      ? 'Verification is temporarily unavailable. Please contact support.'
      : 'We could not send the code. Please try again shortly.';
    const status = error instanceof Error && error.message.includes('DATABASE_URL is not configured') ? 503 : 500;
    return json({ ok: false, error: message, code: status === 503 ? 'DATABASE_NOT_CONFIGURED' : 'SERVER_ERROR', data: null }, status);
  }
}
