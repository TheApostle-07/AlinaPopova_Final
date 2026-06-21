import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-auth';
import { adminError, adminErrorFrom, adminSuccess } from '@/lib/admin-response';
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
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', [], 401);
  try {
    return adminSuccess({ matches: await getCompanyBriefMatches() });
  } catch (error) {
    return adminErrorFrom(error, 'Unable to load company-to-creator matches. Please check the database connection.', []);
  }
}

export async function POST(request: Request) {
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', null, 401);
  try {
    const body = await request.json().catch(() => null);
    const briefId = typeof body?.briefId === 'string' ? body.briefId : '';
    const creatorId = typeof body?.creatorId === 'string' ? body.creatorId : '';
    if (!/^\d+$/.test(briefId) || !/^\d+$/.test(creatorId)) return adminError('Invalid campaign match.', 'VALIDATION_ERROR', null, 400);
    const id = await createCompanyBriefMatch({ briefId, creatorId });
    return id ? adminSuccess({ id }, 201) : adminError('Unable to create the campaign match.', 'SERVER_ERROR', null, 500);
  } catch (error) {
    return adminErrorFrom(error, 'Unable to create the campaign match.', null);
  }
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', null, 401);
  try {
    const body = await request.json().catch(() => null);
    const id = typeof body?.id === 'string' ? body.id : '';
    const acceptanceStatus = typeof body?.acceptanceStatus === 'string' && acceptanceStatuses.has(body.acceptanceStatus as MatchAcceptanceStatus) ? body.acceptanceStatus as MatchAcceptanceStatus : null;
    const payoutStatus = typeof body?.payoutStatus === 'string' && payoutStatuses.has(body.payoutStatus as MatchPayoutStatus) ? body.payoutStatus as MatchPayoutStatus : null;
    const usageStatus = typeof body?.usageStatus === 'string' && usageStatuses.has(body.usageStatus as MatchUsageStatus) ? body.usageStatus as MatchUsageStatus : null;
    const deliveryStatus = typeof body?.deliveryStatus === 'string' && deliveryStatuses.has(body.deliveryStatus as MatchDeliveryStatus) ? body.deliveryStatus as MatchDeliveryStatus : null;
    const notes = typeof body?.notes === 'string' ? body.notes.trim().slice(0, 5000) || null : null;
    if (!/^\d+$/.test(id) || !acceptanceStatus || !payoutStatus || !usageStatus || !deliveryStatus) return adminError('Invalid campaign match update.', 'VALIDATION_ERROR', null, 400);
    const updated = await updateCompanyBriefMatch({ id, acceptanceStatus, payoutStatus, usageStatus, deliveryStatus, notes });
    return updated ? adminSuccess({ updated: true }) : adminError('Campaign match was not found.', 'NOT_FOUND', null, 404);
  } catch (error) {
    return adminErrorFrom(error, 'Unable to update the campaign match.', null);
  }
}
