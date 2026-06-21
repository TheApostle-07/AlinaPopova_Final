import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { ensureApplicationsSchema, getSqlClient, recordLegalConsent } from '@/lib/database';
import { CREATOR_APPLICATION_CONSENT, LEGAL_VERSION, creatorAgreementLinks } from '@/lib/legal';
import { isRateLimited } from '@/lib/rate-limit';

type ApplicationPayload = {
  fullName?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  city?: unknown;
  instagramUrl?: unknown;
  youtubeUrl?: unknown;
  cameraComfort?: unknown;
  languages?: unknown;
  categories?: unknown;
  availability?: unknown;
  boundaries?: unknown;
  experience?: unknown;
  workMode?: unknown;
  expectedPayout?: unknown;
  consents?: unknown;
  submittedAt?: unknown;
};

const allowedCategories = new Set(['ugc', 'instagram-reels', 'youtube-shorts', 'youtube-live', 'instagram-live', 'livestreams', 'modelling', 'product-demos', 'live-shopping', 'brand-campaigns']);
const requiredConsents = [
  'age18',
  'legalAgreement'
] as const;

const stringValue = (value: unknown, maxLength = 500) => (typeof value === 'string' ? value.trim().slice(0, maxLength) : '');
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
    const payload = (await request.json()) as ApplicationPayload;
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ ok: false, error: 'Invalid application payload.' }, { status: 400 });
    }

    const fullName = stringValue(payload.fullName, 100);
    const email = stringValue(payload.email, 160).toLowerCase();
    const whatsapp = stringValue(payload.whatsapp, 20).replace(/[\s-]/g, '');
    const city = stringValue(payload.city, 100);
    const instagramUrl = stringValue(payload.instagramUrl, 300);
    const youtubeUrl = stringValue(payload.youtubeUrl, 300);
    const cameraComfort = stringValue(payload.cameraComfort, 120);
    const languages = stringValue(payload.languages, 250);
    const availability = stringValue(payload.availability, 120);
    const boundaries = stringValue(payload.boundaries, 2000);
    const experience = stringValue(payload.experience, 500);
    const workMode = stringValue(payload.workMode, 120);
    const expectedPayout = stringValue(payload.expectedPayout, 120);
    const categories = Array.isArray(payload.categories)
      ? [...new Set(payload.categories.filter((category): category is string => typeof category === 'string' && allowedCategories.has(category)))].slice(0, 10)
      : [];
    const consents = payload.consents && typeof payload.consents === 'object' && !Array.isArray(payload.consents)
      ? payload.consents as Record<string, unknown>
      : {};

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const whatsappIsValid = /^\+?[0-9]{10,15}$/.test(whatsapp);
    const allConsentsGiven = requiredConsents.every((key) => consents[key] === true);
    if (
      fullName.length < 3 || !emailIsValid || !whatsappIsValid || city.length < 2 || !cameraComfort || languages.length < 2 ||
      !availability || categories.length === 0 || !validUrl(instagramUrl) || !validUrl(youtubeUrl) || !allConsentsGiven
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
        submitted_at, payload, email, whatsapp, city, instagram_url, youtube_url, camera_comfort, categories,
        boundaries, consents, duplicate_key
      )
      VALUES (
        ${fullName}, 'not provided', ${`${city}, India`}, ${languages}, ${experience || instagramUrl || youtubeUrl || 'New creator'},
        ${[...categories, workMode, expectedPayout].filter(Boolean).join(', ')}, ${availability}, 'creator-network', ${`${email} | ${whatsapp}`}, ${submittedAt},
        ${JSON.stringify(payload)}::jsonb, ${email}, ${whatsapp}, ${city}, ${instagramUrl || null}, ${youtubeUrl || null},
        ${cameraComfort}, ${JSON.stringify(categories)}::jsonb, ${boundaries}, ${JSON.stringify(consents)}::jsonb, ${duplicateKey}
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
