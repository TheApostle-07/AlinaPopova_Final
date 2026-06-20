import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-auth';
import { getCompanyCampaigns, type CampaignStatus, updateCampaignStatus } from '@/lib/database';

const statuses = new Set<CampaignStatus>(['new_brief', 'discovery', 'scoped', 'active', 'complete', 'declined']);

const authorized = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return isValidAdminSession(token);
};

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  return NextResponse.json({ ok: true, campaigns: await getCompanyCampaigns() });
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const id = typeof body?.id === 'string' ? body.id : '';
  const status = typeof body?.status === 'string' && statuses.has(body.status as CampaignStatus) ? body.status as CampaignStatus : null;
  if (!/^\d+$/.test(id) || !status) return NextResponse.json({ ok: false, error: 'Invalid campaign update.' }, { status: 400 });
  const updated = await updateCampaignStatus(id, status);
  return NextResponse.json({ ok: updated }, { status: updated ? 200 : 404 });
}
