import { NextResponse } from 'next/server';
import {
  PLATFORM_REGISTRATION_COOKIE,
  PLATFORM_SESSION_COOKIE,
  createPlatformSession,
  expiredPlatformCookieOptions,
  getRegistrationSession,
  platformCookieOptions
} from '@/lib/platform-auth';
import { registerCompanyUser, registerCreatorUser, type PlatformUserType } from '@/lib/platform-database';
import { getPlatformHomePath } from '@/lib/platform-routes';
import {
  BUDGET_RANGES,
  COMPANY_BUSINESS_CATEGORIES,
  COMPANY_GOALS,
  COMPANY_PLATFORMS,
  COMPANY_SERVICE_GROUPS,
  CREATOR_AVAILABILITY,
  CREATOR_CATEGORIES,
  CREATOR_EXPERIENCE,
  CREATOR_FORMATS,
  CREATOR_ROLES,
  TIMELINES,
  USAGE_RIGHTS,
  recommendCompanyPackage
} from '@/lib/intake-options';

const getClientIp = (request: Request) => request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
const json = (payload: unknown, status = 200) => NextResponse.json(payload, { status, headers: { 'Cache-Control': 'no-store' } });
const stringValue = (value: unknown, max = 500) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const validUrl = (value: string) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};
const optionSet = (options: { value: string }[]) => new Set(options.map((option) => option.value));
const fromAllowed = (value: unknown, allowed: Set<string>, max = 20) => Array.isArray(value)
  ? [...new Set(value.filter((item): item is string => typeof item === 'string' && allowed.has(item)))].slice(0, max)
  : [];

const roleValues = optionSet(CREATOR_ROLES);
const formatValues = optionSet(CREATOR_FORMATS);
const categoryValues = optionSet(CREATOR_CATEGORIES);
const availabilityValues = optionSet(CREATOR_AVAILABILITY);
const experienceValues = optionSet(CREATOR_EXPERIENCE);
const companyCategories = optionSet(COMPANY_BUSINESS_CATEGORIES);
const companyGoals = optionSet(COMPANY_GOALS);
const companyPlatforms = optionSet(COMPANY_PLATFORMS);
const companyServices = optionSet(COMPANY_SERVICE_GROUPS.flatMap((group) => group.options));
const budgets = optionSet(BUDGET_RANGES);
const timelines = optionSet(TIMELINES);
const usageRights = optionSet(USAGE_RIGHTS);

export async function POST(request: Request) {
  const registration = getRegistrationSession(request.headers.get('cookie')?.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${PLATFORM_REGISTRATION_COOKIE}=`))?.slice(PLATFORM_REGISTRATION_COOKIE.length + 1));
  if (!registration) {
    return json({ ok: false, error: 'Please verify your email or phone before completing registration.', code: 'OTP_REQUIRED', data: null }, 401);
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ ok: false, error: 'Invalid registration details.', code: 'VALIDATION_ERROR', data: null }, 400);
    const userType = body.userType === 'company' ? 'company' : body.userType === 'specialist' ? 'specialist' : body.userType === 'creator' ? 'creator' : null;
    const name = stringValue(body.name, 120);
    const email = stringValue(body.email, 160).toLowerCase();
    const phone = stringValue(body.phone, 25).replace(/[\s-]/g, '');
    const city = stringValue(body.city, 80);
    const area = stringValue(body.area, 120);
    const languagePreference = stringValue(body.languagePreference, 80) || 'English';
    const communicationPreference = stringValue(body.communicationPreference, 40) || 'Email';
    const legalAccepted = body.legalAccepted === true;
    const ageConfirmed = body.ageConfirmed === true;

    if (name.length < 3 || city.length < 2 || !area || !legalAccepted) {
      return json({ ok: false, error: 'Please complete the required account details and agreement.', code: 'VALIDATION_ERROR', data: null }, 400);
    }
    if (registration.identifierType === 'email' && email !== registration.identifier) {
      return json({ ok: false, error: 'Use the same email address that you verified.', code: 'VALIDATION_ERROR', data: null }, 400);
    }
    if (registration.identifierType === 'phone' && phone !== registration.identifier) {
      return json({ ok: false, error: 'Use the same phone number that you verified.', code: 'VALIDATION_ERROR', data: null }, 400);
    }

    let userId: string;
    let resolvedUserType: PlatformUserType;
    if (userType === 'creator' || userType === 'specialist') {
      if (!ageConfirmed) {
        return json({ ok: false, error: 'Creator applications are only open to people who are 18 or older.', code: 'AGE_REQUIRED', data: null }, 400);
      }
      const selectedRoles = fromAllowed(body.selectedRoles, roleValues);
      const platforms = fromAllowed(body.platforms, formatValues);
      const categories = fromAllowed(body.categories, categoryValues);
      const availability = fromAllowed(body.availability, availabilityValues);
      const experienceLevel = stringValue(body.experienceLevel, 80);
      const roleDetails = body.roleDetails && typeof body.roleDetails === 'object' && !Array.isArray(body.roleDetails) ? body.roleDetails as Record<string, unknown> : {};
      const portfolioLinks = body.portfolioLinks && typeof body.portfolioLinks === 'object' && !Array.isArray(body.portfolioLinks) ? body.portfolioLinks as Record<string, string> : {};
      if (selectedRoles.length === 0 || platforms.length === 0 || availability.length === 0 || !experienceValues.has(experienceLevel)) {
        return json({ ok: false, error: 'Select at least one role, format, availability option, and experience level.', code: 'VALIDATION_ERROR', data: null }, 400);
      }
      const cleanPortfolio = Object.fromEntries(Object.entries(portfolioLinks).map(([key, value]) => [key, stringValue(value, 400)]).filter(([, value]) => value && validUrl(value)));
      userId = await registerCreatorUser({
        identifier: registration.identifier,
        identifierType: registration.identifierType,
        name,
        phone,
        email,
        city,
        area,
        languagePreference,
        communicationPreference,
        selectedRoles,
        roleDetails,
        platforms,
        categories,
        availability,
        boundaries: stringValue(body.boundaries, 2000),
        portfolioLinks: cleanPortfolio,
        experienceLevel,
        expectedPayout: stringValue(body.expectedPayout, 200),
        ip: getClientIp(request),
        userAgent: request.headers.get('user-agent')
      });
      resolvedUserType = 'creator';
    } else if (userType === 'company') {
      const companyName = stringValue(body.companyName, 160);
      const category = stringValue(body.companyCategory, 80);
      const website = stringValue(body.website, 300);
      const instagram = stringValue(body.instagram, 300);
      const youtube = stringValue(body.youtube, 300);
      const goals = fromAllowed(body.goals, companyGoals);
      const platforms = fromAllowed(body.platforms, companyPlatforms);
      const servicesNeeded = fromAllowed(body.servicesNeeded, companyServices, 24);
      const budgetRange = stringValue(body.budgetRange, 80);
      const timeline = stringValue(body.timeline, 80);
      const usageRightsNeed = stringValue(body.usageRightsNeed, 80);
      if (
        companyName.length < 2 || !companyCategories.has(category) || goals.length === 0 || platforms.length === 0 ||
        servicesNeeded.length === 0 || !budgets.has(budgetRange) || !timelines.has(timeline) || !usageRights.has(usageRightsNeed) ||
        !validUrl(website) || !validUrl(instagram) || !validUrl(youtube)
      ) {
        return json({ ok: false, error: 'Please complete the company profile, campaign goal, platform, budget, timeline, and usage fields.', code: 'VALIDATION_ERROR', data: null }, 400);
      }
      userId = await registerCompanyUser({
        identifier: registration.identifier,
        identifierType: registration.identifierType,
        name,
        phone,
        email,
        city,
        area,
        languagePreference,
        communicationPreference,
        companyName,
        category,
        website,
        instagram,
        youtube,
        goals,
        platforms,
        servicesNeeded,
        budgetRange,
        timeline,
        usageRightsNeed,
        message: stringValue(body.message, 3000),
        recommendedPackage: recommendCompanyPackage({ goals, platforms, services: servicesNeeded, talentNeeds: ['not_sure'], budgetRange }),
        ip: getClientIp(request),
        userAgent: request.headers.get('user-agent')
      });
      resolvedUserType = 'company';
    } else {
      return json({ ok: false, error: 'Choose whether you are registering as a company or creator.', code: 'VALIDATION_ERROR', data: null }, 400);
    }

    const session = createPlatformSession({ userId, userType: resolvedUserType, email, phone });
    if (!session) return json({ ok: false, error: 'Authentication is not configured.', code: 'AUTH_NOT_CONFIGURED', data: null }, 503);
    const response = json({ ok: true, error: null, code: null, data: { redirectTo: getPlatformHomePath(resolvedUserType), userId, userType: resolvedUserType } }, 201);
    response.cookies.set(PLATFORM_SESSION_COOKIE, session, platformCookieOptions);
    response.cookies.set(PLATFORM_REGISTRATION_COOKIE, '', expiredPlatformCookieOptions);
    return response;
  } catch (error) {
    const message = error instanceof Error && error.message.includes('DATABASE_URL is not configured')
      ? 'Database is not configured. Set DATABASE_URL before completing registration.'
      : 'Something went wrong while creating your account. Please try again.';
    const status = message.startsWith('Database') ? 503 : 500;
    return json({ ok: false, error: message, code: status === 503 ? 'DATABASE_NOT_CONFIGURED' : 'SERVER_ERROR', data: null }, status);
  }
}
