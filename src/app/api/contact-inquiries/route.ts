import { NextResponse } from 'next/server';
import { createContactInquiry, recordCompanyMarketingBrief, recordLegalConsent, type ContactInquiryType } from '@/lib/database';
import { COMPANY_INQUIRY_CONSENT, CONTACT_CONSENT, LEGAL_VERSION, companyAgreementLinks } from '@/lib/legal';
import { isRateLimited } from '@/lib/rate-limit';

const inquiryTypes = new Set<ContactInquiryType>(['creator_support', 'brand_inquiry', 'safety_concern', 'general']);

const stringValue = (value: unknown, maxLength: number) => (typeof value === 'string' ? value.trim().slice(0, maxLength) : '');
const detailsValue = (value: unknown) => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};

const getClientIp = (request: Request) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`contact-inquiry:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: 'Too many messages from this connection. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json() as Record<string, unknown>;
    const fullName = stringValue(body.fullName, 100);
    const email = stringValue(body.email, 160).toLowerCase();
    const phone = stringValue(body.phone, 25);
    const inquiryType = stringValue(body.inquiryType, 40) as ContactInquiryType;
    const message = stringValue(body.message, 3000);
    const consent = body.consent === true;
    const rawDetails = detailsValue(body.details);
    const details = {
      companyName: stringValue(rawDetails.companyName, 160),
      companyCategory: stringValue(rawDetails.companyCategory, 120),
      packageInterest: stringValue(rawDetails.packageInterest, 120),
      budgetRange: stringValue(rawDetails.budgetRange, 80),
      timeline: stringValue(rawDetails.timeline, 80),
      campaignGoal: stringValue(rawDetails.campaignGoal, 2000)
    };
    const companyBriefIsComplete = inquiryType === 'brand_inquiry' && details.companyName.length >= 2 && details.companyCategory.length >= 2 && details.packageInterest.length >= 2 && details.budgetRange.length >= 2 && details.timeline.length >= 2 && details.campaignGoal.length >= 10;
    const messageIsValid = inquiryType === 'brand_inquiry' ? message.length === 0 || message.length >= 10 : message.length >= 10;

    if (
      fullName.length < 3 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !inquiryTypes.has(inquiryType) ||
      !messageIsValid ||
      (inquiryType === 'brand_inquiry' && !companyBriefIsComplete) ||
      !consent
    ) {
      return NextResponse.json({ ok: false, error: 'Please complete the required details and consent before sending your message.' }, { status: 400 });
    }

    const normalizedPhone = phone || null;
    const id = await createContactInquiry({ fullName, email, phone: normalizedPhone, inquiryType, message, details: inquiryType === 'brand_inquiry' ? details : {} });
    if (inquiryType === 'brand_inquiry' && companyBriefIsComplete) {
      await recordCompanyMarketingBrief({ fullName, email, phone: normalizedPhone, details: details as Required<typeof details> });
    }
    await recordLegalConsent({
      userType: inquiryType === 'brand_inquiry' ? 'company' : 'general',
      userId: id,
      formType: inquiryType === 'brand_inquiry' ? 'company_inquiry' : 'contact_request',
      consentText: inquiryType === 'brand_inquiry' ? COMPANY_INQUIRY_CONSENT : CONTACT_CONSENT,
      legalVersion: LEGAL_VERSION,
      legalLinks: inquiryType === 'brand_inquiry' ? companyAgreementLinks : [{ label: 'Privacy Policy', href: '/privacy' }],
      accepted: true,
      ip,
      userAgent: request.headers.get('user-agent'),
      email,
      phone: normalizedPhone
    });
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unable to send your message right now. Please try again later.' }, { status: 500 });
  }
}
