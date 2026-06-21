import { NextResponse } from 'next/server';
import { createComplaint, recordLegalConsent, type ComplaintSeverity } from '@/lib/database';
import { COMPLAINT_CONSENT, LEGAL_VERSION } from '@/lib/legal';
import { isRateLimited } from '@/lib/rate-limit';

const roles = new Set(['creator', 'company', 'visitor', 'other']);
const issueTypes = new Set(['safety_concern', 'harassment', 'content_misuse', 'payment_issue', 'privacy_request', 'company_conduct', 'creator_conduct', 'other']);
const urgencyLevels = new Set<ComplaintSeverity>(['low', 'medium', 'high', 'urgent']);
const stringValue = (value: unknown, maxLength: number) => typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
const getClientIp = (request: Request) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

const validUrl = (value: string) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`complaint:${ip}`, 5, 60 * 60 * 1000)) return NextResponse.json({ ok: false, error: 'Too many submissions from this connection. Please try again later.' }, { status: 429 });

  try {
    const body = await request.json() as Record<string, unknown>;
    const fullName = stringValue(body.fullName, 100);
    const email = stringValue(body.email, 160).toLowerCase();
    const phone = stringValue(body.phone, 25) || null;
    const reporterRole = stringValue(body.reporterRole, 30);
    const issueType = stringValue(body.issueType, 40);
    const relatedEntity = stringValue(body.relatedEntity, 500);
    const description = stringValue(body.description, 5000);
    const urgency = stringValue(body.urgency, 20) as ComplaintSeverity;
    const evidenceUrl = stringValue(body.evidenceUrl, 500) || null;
    const consent = body.consent === true;

    if (fullName.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !roles.has(reporterRole) || !issueTypes.has(issueType) || !urgencyLevels.has(urgency) || description.length < 10 || !validUrl(evidenceUrl ?? '') || !consent) {
      return NextResponse.json({ ok: false, error: 'Please complete the required complaint details and consent before submitting.' }, { status: 400 });
    }

    const id = await createComplaint({ fullName, email, phone, reporterRole, issueType, relatedEntity, description, urgency, evidenceUrl });
    await recordLegalConsent({
      userType: 'general',
      userId: id,
      formType: 'complaint_submission',
      consentText: COMPLAINT_CONSENT,
      legalVersion: LEGAL_VERSION,
      legalLinks: [{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Safety Policy', href: '/safety' }],
      accepted: true,
      ip,
      userAgent: request.headers.get('user-agent'),
      email,
      phone
    });
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unable to submit the complaint right now. Please try again later.' }, { status: 500 });
  }
}
