import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-auth';
import { getContactInquiries } from '@/lib/database';

const authorized = (request: Request) => {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const token = cookieHeader.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  return isValidAdminSession(token);
};

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  return NextResponse.json({ ok: true, inquiries: await getContactInquiries() });
}
