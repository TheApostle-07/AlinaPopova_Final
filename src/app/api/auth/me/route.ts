import { NextResponse } from 'next/server';
import { getPlatformSession } from '@/lib/platform-auth';
import { getPlatformDashboardData } from '@/lib/platform-database';

const json = (payload: unknown, status = 200) => NextResponse.json(payload, { status, headers: { 'Cache-Control': 'no-store' } });

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split(';').map((item) => item.trim()).find((item) => item.startsWith('alina_platform_session='))?.slice('alina_platform_session='.length);
  const session = getPlatformSession(token);
  if (!session) return json({ ok: false, error: 'Please sign in to continue.', code: 'UNAUTHORIZED', data: null }, 401);
  try {
    const data = await getPlatformDashboardData(session.userId);
    if (!data) return json({ ok: false, error: 'Account was not found.', code: 'NOT_FOUND', data: null }, 404);
    return json({ ok: true, error: null, code: null, data });
  } catch (error) {
    const message = error instanceof Error && error.message.includes('DATABASE_URL is not configured')
      ? 'Database is not configured. Set DATABASE_URL before using the platform dashboard.'
      : 'Unable to load your workspace right now.';
    const status = message.startsWith('Database') ? 503 : 500;
    return json({ ok: false, error: message, code: status === 503 ? 'DATABASE_NOT_CONFIGURED' : 'SERVER_ERROR', data: null }, status);
  }
}
