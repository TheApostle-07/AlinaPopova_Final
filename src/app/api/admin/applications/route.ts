import { NextResponse } from 'next/server';
import { isValidAdminSession, ADMIN_COOKIE } from '@/lib/admin-auth';
import { getApplications, type ApplicationStatus, updateApplication } from '@/lib/database';

const statuses = new Set<ApplicationStatus>(['new', 'shortlisted', 'call_scheduled', 'selected', 'training', 'roster_ready', 'rejected']);

const authorized = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return isValidAdminSession(token);
};

const csvEscape = (value: string | number | boolean | null) => `"${String(value ?? '').replaceAll('"', '""')}"`;

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const applications = await getApplications();
  if (new URL(request.url).searchParams.get('format') === 'csv') {
    const header = ['id', 'name', 'email', 'whatsapp', 'city', 'languages', 'categories', 'status', 'top_10', 'tier', 'submitted_at'];
    const rows = applications.map((item) => [item.id, item.fullName, item.email, item.whatsapp, item.city, item.languages, item.categories.join('; '), item.status, item.isTop10, item.creatorTier, item.submittedAt].map(csvEscape).join(','));
    return new NextResponse([header.join(','), ...rows].join('\n'), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="creator-applications.csv"' } });
  }
  return NextResponse.json({ ok: true, applications });
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const id = typeof body?.id === 'string' ? body.id : '';
  const status = typeof body?.status === 'string' && statuses.has(body.status as ApplicationStatus) ? body.status as ApplicationStatus : null;
  const isTop10 = typeof body?.isTop10 === 'boolean' ? body.isTop10 : null;
  const adminNotes = typeof body?.adminNotes === 'string' ? body.adminNotes.trim().slice(0, 5000) : null;
  const creatorTier = typeof body?.creatorTier === 'string' ? body.creatorTier.trim().slice(0, 100) || null : null;
  if (!/^\d+$/.test(id) || !status || isTop10 === null) return NextResponse.json({ ok: false, error: 'Invalid application update.' }, { status: 400 });
  const updated = await updateApplication({ id, status, isTop10, adminNotes, creatorTier });
  return NextResponse.json({ ok: updated }, { status: updated ? 200 : 404 });
}
