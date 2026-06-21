import { NextResponse } from 'next/server';
import { isValidAdminSession, ADMIN_COOKIE } from '@/lib/admin-auth';
import { adminError, adminErrorFrom, adminSuccess } from '@/lib/admin-response';
import { getApplications, type ApplicationStatus, updateApplication } from '@/lib/database';

const statuses = new Set<ApplicationStatus>(['new', 'review', 'shortlisted', 'call_needed', 'call_scheduled', 'selected', 'training', 'roster_ready', 'matched', 'active', 'paused', 'not_selected', 'rejected', 'rejected_safety']);

const authorized = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return isValidAdminSession(token);
};

const csvEscape = (value: string | number | boolean | null) => `"${String(value ?? '').replaceAll('"', '""')}"`;

export async function GET(request: Request) {
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', [], 401);
  try {
    const applications = await getApplications();
    if (new URL(request.url).searchParams.get('format') === 'csv') {
      const header = ['id', 'name', 'email', 'whatsapp', 'city', 'roles', 'formats', 'categories', 'status', 'top_10', 'tier', 'submitted_at'];
      const rows = applications.map((item) => [item.id, item.fullName, item.email, item.whatsapp, item.city, item.roleTags.join('; '), item.formatTags.join('; '), item.categoryTags.join('; '), item.status, item.isTop10, item.creatorTier, item.submittedAt].map(csvEscape).join(','));
      return new NextResponse([header.join(','), ...rows].join('\n'), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="alina-popova-creators.csv"' } });
    }
    return adminSuccess({ applications });
  } catch (error) {
    return adminErrorFrom(error, 'Unable to load creator applications. Please check the database connection.', []);
  }
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', null, 401);
  try {
    const body = await request.json().catch(() => null);
    const id = typeof body?.id === 'string' ? body.id : '';
    const status = typeof body?.status === 'string' && statuses.has(body.status as ApplicationStatus) ? body.status as ApplicationStatus : null;
    const isTop10 = typeof body?.isTop10 === 'boolean' ? body.isTop10 : null;
    const adminNotes = typeof body?.adminNotes === 'string' ? body.adminNotes.trim().slice(0, 5000) : null;
    const creatorTier = typeof body?.creatorTier === 'string' ? body.creatorTier.trim().slice(0, 100) || null : null;
    if (!/^\d+$/.test(id) || !status || isTop10 === null) return adminError('Invalid creator application update.', 'VALIDATION_ERROR', null, 400);
    const updated = await updateApplication({ id, status, isTop10, adminNotes, creatorTier });
    return updated ? adminSuccess({ updated: true }) : adminError('Creator application was not found.', 'NOT_FOUND', null, 404);
  } catch (error) {
    return adminErrorFrom(error, 'Unable to update the creator application.', null);
  }
}
