import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { createCompanyBrief, recordLegalConsent } from '@/lib/database';
import { COMPANY_INQUIRY_CONSENT, LEGAL_VERSION, companyAgreementLinks } from '@/lib/legal';
import {
  BUDGET_RANGES,
  COMPANY_BUSINESS_CATEGORIES,
  COMPANY_GOALS,
  COMPANY_PLATFORMS,
  COMPANY_TALENT_NEEDS,
  COMPANY_SERVICE_GROUPS,
  MONETIZATION_TARGETS,
  TIMELINES,
  USAGE_RIGHTS,
  recommendCompanyPackage
} from '@/lib/intake-options';
import { isRateLimited } from '@/lib/rate-limit';

type CompanyBriefPayload = {
  companyName?: unknown;
  contactName?: unknown;
  email?: unknown;
  phone?: unknown;
  websiteUrl?: unknown;
  businessCategory?: unknown;
  goals?: unknown;
  platforms?: unknown;
  monetizationTargets?: unknown;
  services?: unknown;
  talentNeeds?: unknown;
  budgetRange?: unknown;
  timeline?: unknown;
  usageRights?: unknown;
  description?: unknown;
  consent?: unknown;
};

const optionValues = (options: { value: string }[]) => new Set(options.map((option) => option.value));
const businessCategories = optionValues(COMPANY_BUSINESS_CATEGORIES);
const goals = optionValues(COMPANY_GOALS);
const platforms = optionValues(COMPANY_PLATFORMS);
const monetizationTargets = optionValues(MONETIZATION_TARGETS);
const services = optionValues(COMPANY_SERVICE_GROUPS.flatMap((group) => group.options));
const talentNeeds = optionValues(COMPANY_TALENT_NEEDS);
const budgets = optionValues(BUDGET_RANGES);
const timelines = optionValues(TIMELINES);
const usageRights = optionValues(USAGE_RIGHTS);

const stringValue = (value: unknown, maxLength: number) => (typeof value === 'string' ? value.trim().slice(0, maxLength) : '');
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
  if (isRateLimited(`company-brief:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: 'Too many briefs from this connection. Please try again later.' }, { status: 429 });
  }

  try {
    const payload = await request.json() as CompanyBriefPayload;
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ ok: false, error: 'Invalid company brief payload.' }, { status: 400 });
    }

    const companyName = stringValue(payload.companyName, 160);
    const contactName = stringValue(payload.contactName, 100);
    const email = stringValue(payload.email, 160).toLowerCase();
    const phone = stringValue(payload.phone, 25).replace(/[\s-]/g, '');
    const websiteUrl = stringValue(payload.websiteUrl, 300);
    const businessCategory = stringValue(payload.businessCategory, 80);
    const selectedGoals = values(payload.goals, goals);
    const selectedPlatforms = values(payload.platforms, platforms);
    const selectedMonetizationTargets = values(payload.monetizationTargets, monetizationTargets);
    const selectedServices = values(payload.services, services, 24);
    const selectedTalentNeeds = values(payload.talentNeeds, talentNeeds);
    const budgetRange = stringValue(payload.budgetRange, 80);
    const timeline = stringValue(payload.timeline, 80);
    const selectedUsageRights = stringValue(payload.usageRights, 80);
    const description = stringValue(payload.description, 3000);
    const consent = payload.consent === true;

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneIsValid = /^\+?[0-9]{10,15}$/.test(phone);
    if (
      companyName.length < 2 || contactName.length < 3 || !emailIsValid || !phoneIsValid || !validUrl(websiteUrl) ||
      !businessCategories.has(businessCategory) || selectedGoals.length === 0 || selectedPlatforms.length === 0 ||
      selectedServices.length === 0 || selectedTalentNeeds.length === 0 || !budgets.has(budgetRange) ||
      !timelines.has(timeline) || !usageRights.has(selectedUsageRights) || description.length < 10 || !consent
    ) {
      return NextResponse.json({ ok: false, error: 'Please complete the required brief details and agreement before submitting.' }, { status: 400 });
    }

    const recommendedPackage = recommendCompanyPackage({
      goals: selectedGoals,
      platforms: selectedPlatforms,
      services: selectedServices,
      talentNeeds: selectedTalentNeeds,
      budgetRange
    });
    const duplicateKey = createHash('sha256').update(`${companyName.toLowerCase()}|${email}`).digest('hex');
    const id = await createCompanyBrief({
      companyName,
      contactName,
      email,
      phone,
      websiteUrl,
      businessCategory,
      goals: selectedGoals,
      platforms: selectedPlatforms,
      monetizationTargets: selectedMonetizationTargets,
      services: selectedServices,
      talentNeeds: selectedTalentNeeds,
      budgetRange,
      timeline,
      usageRights: selectedUsageRights,
      description,
      recommendedPackage,
      payload: payload as Record<string, unknown>,
      duplicateKey
    });
    await recordLegalConsent({
      userType: 'company',
      userId: id,
      formType: 'company_brief',
      consentText: COMPANY_INQUIRY_CONSENT,
      legalVersion: LEGAL_VERSION,
      legalLinks: companyAgreementLinks,
      accepted: true,
      ip,
      userAgent: request.headers.get('user-agent'),
      email,
      phone
    });

    return NextResponse.json({ ok: true, id, recommendedPackage }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unable to submit your company brief right now. Please try again later.' }, { status: 500 });
  }
}
