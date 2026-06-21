import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-auth';
import { adminError, adminErrorFrom, adminSuccess } from '@/lib/admin-response';
import { getComplaints, type ComplaintSeverity, type ComplaintStatus, updateComplaint } from '@/lib/database';

const statuses = new Set<ComplaintStatus>(['new', 'under_review', 'needs_information', 'paused', 'escalated', 'resolved', 'closed']);
const severities = new Set<ComplaintSeverity>(['low', 'medium', 'high', 'urgent']);

const authorized = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return isValidAdminSession(token);
};

export async function GET(request: Request) {
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', [], 401);
  try {
    return adminSuccess({ complaints: await getComplaints() });
  } catch (error) {
    return adminErrorFrom(error, 'Unable to load complaints. Please check the database connection.', []);
  }
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return adminError('Admin authentication is required.', 'UNAUTHORIZED', null, 401);
  try {
    const body = await request.json().catch(() => null);
    const id = typeof body?.id === 'string' ? body.id : '';
    const status = typeof body?.status === 'string' && statuses.has(body.status as ComplaintStatus) ? body.status as ComplaintStatus : null;
    const severity = typeof body?.severity === 'string' && severities.has(body.severity as ComplaintSeverity) ? body.severity as ComplaintSeverity : null;
    const adminNotes = typeof body?.adminNotes === 'string' ? body.adminNotes.trim().slice(0, 5000) || null : null;
    const resolution = typeof body?.resolution === 'string' ? body.resolution.trim().slice(0, 5000) || null : null;
    if (!/^\d+$/.test(id) || !status || !severity) return adminError('Invalid complaint update.', 'VALIDATION_ERROR', null, 400);
    const updated = await updateComplaint({ id, status, severity, adminNotes, resolution });
    return updated ? adminSuccess({ updated: true }) : adminError('Complaint was not found.', 'NOT_FOUND', null, 404);
  } catch (error) {
    return adminErrorFrom(error, 'Unable to update the complaint.', null);
  }
}
