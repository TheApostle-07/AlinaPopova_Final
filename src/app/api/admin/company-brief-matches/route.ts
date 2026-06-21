import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-auth';
import {
  createCompanyBriefMatch,
  getCompanyBriefMatches,
  type MatchAcceptanceStatus,
  type MatchDeliveryStatus,
  type MatchPayoutStatus,
  type MatchUsageStatus,
  updateCompanyBriefMatch
} from '@/lib/database';

const acceptanceStatuses = new Set<MatchAcceptanceStatus>(['not_contacted', 'pending', 'accepted', 'declined']);
const payoutStatuses = new Set<MatchPayoutStatus>(['pending', 'agreed', 'paid']);
const usageStatuses = new Set<MatchUsageStatus>(['pending', 'agreed']);
const deliveryStatuses = new Set<MatchDeliveryStatus>(['not_started', 'in_progress', 'delivered']);

const authorized = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return isValidAdminSession(token);
};

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  return NextResponse.json({ ok: true, matches: await getCompanyBriefMatches() });
}

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const briefId = typeof body?.briefId === 'string' ? body.briefId : '';
  const creatorId = typeof body?.creatorId === 'string' ? body.creatorId : '';
  if (!/^\d+$/.test(briefId) || !/^\d+$/.test(creatorId)) return NextResponse.json({ ok: false, error: 'Invalid campaign match.' }, { status: 400 });
  const id = await createCompanyBriefMatch({ briefId, creatorId });
  return NextResponse.json({ ok: Boolean(id), id }, { status: id ? 201 : 500 });
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const id = typeof body?.id === 'string' ? body.id : '';
  const acceptanceStatus = typeof body?.acceptanceStatus === 'string' && acceptanceStatuses.has(body.acceptanceStatus as MatchAcceptanceStatus) ? body.acceptanceStatus as MatchAcceptanceStatus : null;
  const payoutStatus = typeof body?.payoutStatus === 'string' && payoutStatuses.has(body.payoutStatus as MatchPayoutStatus) ? body.payoutStatus as MatchPayoutStatus : null;
  const usageStatus = typeof body?.usageStatus === 'string' && usageStatuses.has(body.usageStatus as MatchUsageStatus) ? body.usageStatus as MatchUsageStatus : null;
  const deliveryStatus = typeof body?.deliveryStatus === 'string' && deliveryStatuses.has(body.deliveryStatus as MatchDeliveryStatus) ? body.deliveryStatus as MatchDeliveryStatus : null;
  const notes = typeof body?.notes === 'string' ? body.notes.trim().slice(0, 5000) || null : null;
  if (!/^\d+$/.test(id) || !acceptanceStatus || !payoutStatus || !usageStatus || !deliveryStatus) return NextResponse.json({ ok: false, error: 'Invalid campaign match update.' }, { status: 400 });
  const updated = await updateCompanyBriefMatch({ id, acceptanceStatus, payoutStatus, usageStatus, deliveryStatus, notes });
  return NextResponse.json({ ok: updated }, { status: updated ? 200 : 404 });
}
