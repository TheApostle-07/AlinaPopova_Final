import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { ensureApplicationsSchema, getSqlClient, recordLegalConsent } from '@/lib/database';
import { CREATOR_AVAILABILITY, CREATOR_CATEGORIES, CREATOR_EXPERIENCE, CREATOR_FORMATS, CREATOR_ROLES } from '@/lib/intake-options';
import { CREATOR_APPLICATION_CONSENT, LEGAL_VERSION, creatorAgreementLinks } from '@/lib/legal';
import { isRateLimited } from '@/lib/rate-limit';

type ApplicationPayload = {
  fullName?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  city?: unknown;
  area?: unknown;
  instagramUrl?: unknown;
  youtubeUrl?: unknown;
  languages?: unknown;
  cameraComfort?: unknown;
  roleTags?: unknown;
  formatTags?: unknown;
  experienceLevel?: unknown;
  availabilityTags?: unknown;
  categoryTags?: unknown;
  expectedPayout?: unknown;
  boundaries?: unknown;
  consents?: unknown;
  submittedAt?: unknown;
};

const optionValues = (options: { value: string }[]) => new Set(options.map((option) => option.value));
const roles = optionValues(CREATOR_ROLES);
const formats = optionValues(CREATOR_FORMATS);
const experienceLevels = optionValues(CREATOR_EXPERIENCE);
const availability = optionValues(CREATOR_AVAILABILITY);
const categories = optionValues(CREATOR_CATEGORIES);
const requiredConsents = ['age18', 'legalAgreement'] as const;

const stringValue = (value: unknown, maxLength = 500) => (typeof value === 'string' ? value.trim().slice(0, maxLength) : '');
const values = (value: unknown, allowed: Set<string>, maximum = 16) => Array.isArray(value)
  ? [...new Set(value.filter((item): item is string => typeof item === 'string' && allowed.has(item)))].slice(0, maximum)
  : [];

const validUrl = (value: string) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

const getClientIp = (request: Request) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`application:${ip}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: 'Too many applications from this connection. Please try again later.' }, { status: 429 });
  }

  try {
    const payload = await request.json() as ApplicationPayload;
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ ok: false, error: 'Invalid application payload.' }, { status: 400 });
    }

    const fullName = stringValue(payload.fullName, 100);
    const email = stringValue(payload.email, 160).toLowerCase();
    const whatsapp = stringValue(payload.whatsapp, 20).replace(/[\s-]/g, '');
    const city = stringValue(payload.city, 100);
    const area = stringValue(payload.area, 120);
    const instagramUrl = stringValue(payload.instagramUrl, 300);
    const youtubeUrl = stringValue(payload.youtubeUrl, 300);
    const languages = stringValue(payload.languages, 250);
    const cameraComfort = stringValue(payload.cameraComfort, 120);
    const roleTags = values(payload.roleTags, roles);
    const formatTags = values(payload.formatTags, formats);
    const experienceLevel = stringValue(payload.experienceLevel, 80);
    const availabilityTags = values(payload.availabilityTags, availability);
    const categoryTags = values(payload.categoryTags, categories);
    const expectedPayout = stringValue(payload.expectedPayout, 120);
    const boundaries = stringValue(payload.boundaries, 2000);
    const consents = payload.consents && typeof payload.consents === 'object' && !Array.isArray(payload.consents)
      ? payload.consents as Record<string, unknown>
      : {};

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const whatsappIsValid = /^\+?[0-9]{10,15}$/.test(whatsapp);
    const allConsentsGiven = requiredConsents.every((key) => consents[key] === true);
    if (
      fullName.length < 3 || !emailIsValid || !whatsappIsValid || city.length < 2 || !validUrl(instagramUrl) || !validUrl(youtubeUrl) ||
      roleTags.length === 0 || formatTags.length === 0 || !experienceLevels.has(experienceLevel) || availabilityTags.length === 0 || !allConsentsGiven
    ) {
      return NextResponse.json({ ok: false, error: 'Please complete every required field and consent before submitting.' }, { status: 400 });
    }

    const submittedAtValue = stringValue(payload.submittedAt, 60);
    const submittedAt = Number.isNaN(Date.parse(submittedAtValue)) ? new Date().toISOString() : new Date(submittedAtValue).toISOString();
    const duplicateKey = createHash('sha256').update(`${email}|${whatsapp.replace(/^\+/, '')}`).digest('hex');
    await ensureApplicationsSchema();
    const sql = await getSqlClient();
    const rows = await sql`
      INSERT INTO creator_applications (
        full_name, pronouns, location, languages, experience, comfort_zones, availability, preferred_tier, contact,
        submitted_at, payload, email, whatsapp, city, area, instagram_url, youtube_url, camera_comfort, categories,
        role_tags, format_tags, category_tags, availability_tags, experience_level, expected_payout, boundaries, consents, duplicate_key
      )
      VALUES (
        ${fullName}, 'not provided', ${area ? `${area}, ${city}, India` : `${city}, India`}, ${languages || 'Not provided'}, ${experienceLevel},
        ${[...roleTags, ...formatTags, expectedPayout].filter(Boolean).join(', ')}, ${availabilityTags.join(', ')}, 'creator-network', ${`${email} | ${whatsapp}`},
        ${submittedAt}, ${JSON.stringify(payload)}::jsonb, ${email}, ${whatsapp}, ${city}, ${area || null}, ${instagramUrl || null}, ${youtubeUrl || null},
        ${cameraComfort || null}, ${JSON.stringify(categoryTags)}::jsonb, ${JSON.stringify(roleTags)}::jsonb, ${JSON.stringify(formatTags)}::jsonb,
        ${JSON.stringify(categoryTags)}::jsonb, ${JSON.stringify(availabilityTags)}::jsonb, ${experienceLevel}, ${expectedPayout || null}, ${boundaries},
        ${JSON.stringify(consents)}::jsonb, ${duplicateKey}
      )
      RETURNING id::text AS id
    `;

    const id = rows[0]?.id as string | undefined;
    await recordLegalConsent({
      userType: 'creator',
      userId: id,
      formType: 'creator_application',
      consentText: CREATOR_APPLICATION_CONSENT,
      legalVersion: LEGAL_VERSION,
      legalLinks: creatorAgreementLinks,
      accepted: true,
      ip,
      userAgent: request.headers.get('user-agent'),
      email,
      phone: whatsapp
    });
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unable to submit your application right now. Please try again later.' }, { status: 500 });
  }
}
