import { NextResponse } from 'next/server';

export type AdminErrorCode = 'UNAUTHORIZED' | 'DATABASE_NOT_CONFIGURED' | 'VALIDATION_ERROR' | 'NOT_FOUND' | 'SERVER_ERROR' | 'INVALID_JSON' | 'METHOD_NOT_ALLOWED';

export const adminSuccess = <T>(data: T, status = 200) => NextResponse.json({
  ok: true,
  data,
  error: null,
  code: null
}, { status, headers: { 'Cache-Control': 'no-store' } });

export const adminError = (error: string, code: AdminErrorCode, data: unknown = null, status = 500) => NextResponse.json({
  ok: false,
  data,
  error,
  code
}, { status, headers: { 'Cache-Control': 'no-store' } });

export const adminErrorFrom = (error: unknown, fallback: string, emptyData: unknown = []) => {
  const message = error instanceof Error ? error.message : '';
  if (message.includes('DATABASE_URL is not configured')) {
    return adminError('Database is not configured. Set required environment variables before using the admin workspace.', 'DATABASE_NOT_CONFIGURED', emptyData, 503);
  }
  return adminError(fallback, 'SERVER_ERROR', emptyData, 500);
};
