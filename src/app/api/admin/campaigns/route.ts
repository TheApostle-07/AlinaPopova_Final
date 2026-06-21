import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-auth';
import { adminError, adminErrorFrom, adminSuccess } from '@/lib/admin-response';
import { getCompanyCampaigns, type CampaignStatus, updateCampaignStatus } from '@/lib/database';

const statuses = new Set<CampaignStatus>(['new_brief', 'discovery', 'scoped', 'active', 'complete', 'declined']);

const authorized = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return isValidAdminSession(token);
};

export async function GET(request: Request) {
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', [], 401);
  try {
    return adminSuccess({ campaigns: await getCompanyCampaigns() });
  } catch (error) {
    return adminErrorFrom(error, 'Unable to load campaigns. Please check the database connection.', []);
  }
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', null, 401);
  try {
    const body = await request.json().catch(() => null);
    const id = typeof body?.id === 'string' ? body.id : '';
    const status = typeof body?.status === 'string' && statuses.has(body.status as CampaignStatus) ? body.status as CampaignStatus : null;
    if (!/^\d+$/.test(id) || !status) return adminError('Invalid campaign update.', 'VALIDATION_ERROR', null, 400);
    const updated = await updateCampaignStatus(id, status);
    return updated ? adminSuccess({ updated: true }) : adminError('Campaign was not found.', 'NOT_FOUND', null, 404);
  } catch (error) {
    return adminErrorFrom(error, 'Unable to update the campaign.', null);
  }
}
