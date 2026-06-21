import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-auth';
import { getCompanyBriefs, type CompanyBriefStatus, updateCompanyBrief } from '@/lib/database';

const statuses = new Set<CompanyBriefStatus>(['new_brief', 'qualified', 'needs_call', 'proposal_needed', 'proposal_sent', 'negotiation', 'confirmed', 'in_production', 'delivered', 'completed', 'lost', 'rejected_unsafe']);

const authorized = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return isValidAdminSession(token);
};

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  return NextResponse.json({ ok: true, briefs: await getCompanyBriefs() });
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const body = await request.json().catch(() => null);
  const id = typeof body?.id === 'string' ? body.id : '';
  const status = typeof body?.status === 'string' && statuses.has(body.status as CompanyBriefStatus) ? body.status as CompanyBriefStatus : null;
  const adminNotes = typeof body?.adminNotes === 'string' ? body.adminNotes.trim().slice(0, 5000) || null : null;
  if (!/^\d+$/.test(id) || !status) return NextResponse.json({ ok: false, error: 'Invalid company brief update.' }, { status: 400 });
  const updated = await updateCompanyBrief({ id, status, adminNotes });
  return NextResponse.json({ ok: updated }, { status: updated ? 200 : 404 });
}
