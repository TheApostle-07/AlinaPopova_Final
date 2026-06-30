import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const PLATFORM_SESSION_COOKIE = 'alina_platform_session';
export const PLATFORM_REGISTRATION_COOKIE = 'alina_registration_session';

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;
const REGISTRATION_MAX_AGE_SECONDS = 60 * 15;

const getSecret = () => process.env.AUTH_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'local-platform-secret');

const sign = (value: string) => {
  const secret = getSecret();
  return secret ? createHmac('sha256', secret).update(value).digest('base64url') : null;
};

const parseSignedValue = (token: string | undefined, expectedPrefix: string) => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 4) return null;
  const [prefix, expiresAtRaw, encodedPayload, signature] = parts;
  if (prefix !== expectedPrefix) return null;
  const payload = `${prefix}.${expiresAtRaw}.${encodedPayload}`;
  const expectedSignature = sign(payload);
  const expiresAt = Number(expiresAtRaw);
  if (!expectedSignature || !signature || !Number.isFinite(expiresAt) || expiresAt < Date.now() / 1000) return null;
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return null;
  try {
    return JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as Record<string, unknown>;
  } catch {
    return null;
  }
};

const createSignedValue = (prefix: string, payload: Record<string, unknown>, maxAge: number) => {
  const expiresAt = Math.floor(Date.now() / 1000) + maxAge;
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const value = `${prefix}.${expiresAt}.${encodedPayload}`;
  const signature = sign(value);
  return signature ? `${value}.${signature}` : null;
};

export const platformAuthConfigured = () => Boolean(getSecret());

export const createPlatformSession = (payload: { userId: string; userType: string; email?: string | null; phone?: string | null }) =>
  createSignedValue('platform', payload, SESSION_MAX_AGE_SECONDS);

export const createRegistrationSession = (payload: { identifier: string; identifierType: 'email' | 'phone' }) =>
  createSignedValue('register', payload, REGISTRATION_MAX_AGE_SECONDS);

export const getPlatformSession = (token?: string) => {
  const payload = parseSignedValue(token ?? cookies().get(PLATFORM_SESSION_COOKIE)?.value, 'platform');
  const userId = typeof payload?.userId === 'string' ? payload.userId : '';
  const userType = typeof payload?.userType === 'string' ? payload.userType : '';
  if (!userId || !userType) return null;
  return {
    userId,
    userType,
    email: typeof payload?.email === 'string' ? payload.email : null,
    phone: typeof payload?.phone === 'string' ? payload.phone : null
  };
};

export const getRegistrationSession = (token?: string): { identifier: string; identifierType: 'email' | 'phone' } | null => {
  const payload = parseSignedValue(token ?? cookies().get(PLATFORM_REGISTRATION_COOKIE)?.value, 'register');
  const identifier = typeof payload?.identifier === 'string' ? payload.identifier : '';
  const identifierType: 'email' | 'phone' | null = payload?.identifierType === 'phone' ? 'phone' : payload?.identifierType === 'email' ? 'email' : null;
  if (!identifier || !identifierType) return null;
  return { identifier, identifierType };
};

export const platformCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_MAX_AGE_SECONDS
};

export const registrationCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: REGISTRATION_MAX_AGE_SECONDS
};

export const expiredPlatformCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 0
};
