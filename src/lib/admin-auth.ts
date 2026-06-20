import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'alina_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

const getSessionSecret = () => process.env.ADMIN_SESSION_SECRET;

const sign = (value: string) => {
  const secret = getSessionSecret();
  return secret ? createHmac('sha256', secret).update(value).digest('base64url') : null;
};

export const adminAuthConfigured = () => Boolean(process.env.ADMIN_PASSWORD && getSessionSecret());

export const passwordsMatch = (candidate: string) => {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return false;
  const candidateBuffer = Buffer.from(candidate);
  const configuredBuffer = Buffer.from(configured);
  return candidateBuffer.length === configuredBuffer.length && timingSafeEqual(candidateBuffer, configuredBuffer);
};

export const createAdminSession = () => {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const payload = `admin.${expiresAt}`;
  const signature = sign(payload);
  return signature ? `${payload}.${signature}` : null;
};

export const isValidAdminSession = (token: string | undefined) => {
  if (!token) return false;
  const [role, expiresAtRaw, signature] = token.split('.');
  const payload = `${role}.${expiresAtRaw}`;
  const expectedSignature = sign(payload);
  const expiresAt = Number(expiresAtRaw);
  if (!expectedSignature || !signature || role !== 'admin' || !Number.isFinite(expiresAt) || expiresAt < Date.now() / 1000) return false;
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  return signatureBuffer.length === expectedBuffer.length && timingSafeEqual(signatureBuffer, expectedBuffer);
};

export const hasAdminSession = () => isValidAdminSession(cookies().get(ADMIN_COOKIE)?.value);

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_MAX_AGE_SECONDS
};
