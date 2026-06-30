import { createHash, createHmac, randomInt } from 'node:crypto';
import { getSqlClient, recordLegalConsent } from '@/lib/database';
import { COMPANY_INQUIRY_CONSENT, CREATOR_APPLICATION_CONSENT, LEGAL_VERSION, companyAgreementLinks, creatorAgreementLinks } from '@/lib/legal';

export type PlatformUserType = 'creator' | 'company' | 'specialist' | 'admin' | 'campaign_manager';
export type PlatformUserStatus =
  | 'registered'
  | 'profile_incomplete'
  | 'submitted'
  | 'under_review'
  | 'shortlisted'
  | 'selected'
  | 'roster_ready'
  | 'active'
  | 'paused'
  | 'not_selected'
  | 'rejected_safety'
  | 'brief_submitted'
  | 'qualified'
  | 'active_client'
  | 'archived';

export type ProjectStatus =
  | 'draft'
  | 'briefing'
  | 'planning'
  | 'talent_matching'
  | 'awaiting_creator_acceptance'
  | 'in_production'
  | 'editing'
  | 'client_review'
  | 'revisions'
  | 'approved'
  | 'delivered'
  | 'completed'
  | 'paused'
  | 'cancelled'
  | 'disputed';

export type TaskStatus =
  | 'not_started'
  | 'waiting_for_brief'
  | 'in_progress'
  | 'submitted'
  | 'needs_revision'
  | 'approved'
  | 'blocked'
  | 'completed'
  | 'cancelled';

export interface PlatformUserRecord {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  userType: PlatformUserType;
  roles: string[];
  status: PlatformUserStatus;
  city: string;
  area: string;
  languagePreference: string;
  communicationPreference: string;
  avatarUrl: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string | null;
}

export interface CreatorProfileRecord {
  id: string;
  userId: string;
  selectedRoles: string[];
  roleDetails: Record<string, unknown>;
  platforms: string[];
  categories: string[];
  availability: string[];
  boundaries: string;
  portfolioLinks: Record<string, string>;
  experienceLevel: string;
  expectedPayout: string;
  status: PlatformUserStatus;
  profileCompletion: number;
  consentVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyProfileRecord {
  id: string;
  userId: string;
  companyName: string;
  category: string;
  website: string;
  instagram: string;
  youtube: string;
  location: string;
  status: PlatformUserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformCompanyBriefRecord {
  id: string;
  companyProfileId: string;
  goals: string[];
  platforms: string[];
  servicesNeeded: string[];
  budgetRange: string;
  timeline: string;
  usageRightsNeed: string;
  message: string;
  recommendedPackage: string;
  status: string;
  consentVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformProjectRecord {
  id: string;
  companyProfileId: string | null;
  briefId: string | null;
  title: string;
  packageType: string;
  goals: string[];
  platforms: string[];
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMemberRecord {
  id: string;
  projectId: string;
  userId: string;
  roleOnProject: string;
  permissions: string[];
  status: string;
  payoutTermsId: string | null;
  createdAt: string;
}

export interface PlatformTaskRecord {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignedTo: string | null;
  dueDate: string | null;
  priority: string;
  status: TaskStatus;
  checklist: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PlatformDeliverableRecord {
  id: string;
  projectId: string;
  title: string;
  type: string;
  platform: string;
  status: string;
  approvalStatus: string;
  usageRightsId: string | null;
  revisionCount: number;
  dueDate: string | null;
  createdAt: string;
}

export interface PlatformNotificationRecord {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  readAt: string | null;
  createdAt: string;
}

export interface PlatformDashboardData {
  user: PlatformUserRecord;
  creatorProfile: CreatorProfileRecord | null;
  companyProfile: CompanyProfileRecord | null;
  companyBriefs: PlatformCompanyBriefRecord[];
  projects: PlatformProjectRecord[];
  tasks: PlatformTaskRecord[];
  deliverables: PlatformDeliverableRecord[];
  notifications: PlatformNotificationRecord[];
  metrics: {
    activeProjects: number;
    pendingTasks: number;
    approvalsNeeded: number;
    usageRightsMissing: number;
    pendingPayouts: number;
  };
}

export interface PlatformUserAdminRecord extends PlatformUserRecord {
  profileCompletion: number | null;
  companyName: string | null;
  selectedRoles: string[];
  projectCount: number;
}

let platformSchemaPromise: Promise<void> | null = null;

const otpSecret = () => process.env.OTP_SECRET || process.env.AUTH_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'local-otp-secret');
const normalizeIdentifier = (identifier: string) => identifier.trim().toLowerCase();
const hashOtp = (identifier: string, otp: string) => createHmac('sha256', otpSecret()).update(`${normalizeIdentifier(identifier)}:${otp}`).digest('hex');
const hashIdentifier = (identifier: string) => createHash('sha256').update(normalizeIdentifier(identifier)).digest('hex');

export const classifyIdentifier = (identifier: string): 'email' | 'phone' | null => {
  const normalized = identifier.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return 'email';
  if (/^\+?[0-9]{10,15}$/.test(normalized.replace(/[\s-]/g, ''))) return 'phone';
  return null;
};

export const generateOtp = () => String(randomInt(0, 1_000_000)).padStart(6, '0');

export const ensurePlatformSchema = async () => {
  platformSchemaPromise ??= (async () => {
    const sql = await getSqlClient();
    await sql`
      CREATE TABLE IF NOT EXISTS platform_users (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        user_type TEXT NOT NULL,
        roles JSONB NOT NULL DEFAULT '[]'::jsonb,
        status TEXT NOT NULL DEFAULT 'registered',
        city TEXT NOT NULL DEFAULT '',
        area TEXT NOT NULL DEFAULT '',
        language_preference TEXT NOT NULL DEFAULT 'English',
        communication_preference TEXT NOT NULL DEFAULT 'email',
        avatar_url TEXT,
        email_verified BOOLEAN NOT NULL DEFAULT FALSE,
        phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_active_at TIMESTAMPTZ
      )
    `;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS platform_users_email_unique ON platform_users (LOWER(email)) WHERE email IS NOT NULL`;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS platform_users_phone_unique ON platform_users (phone) WHERE phone IS NOT NULL`;

    await sql`
      CREATE TABLE IF NOT EXISTS otp_tokens (
        id BIGSERIAL PRIMARY KEY,
        identifier TEXT NOT NULL,
        identifier_type TEXT NOT NULL,
        otp_hash TEXT NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        attempts INT NOT NULL DEFAULT 0,
        used_at TIMESTAMPTZ,
        ip TEXT,
        user_agent TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS otp_tokens_identifier_created_idx ON otp_tokens (identifier, created_at DESC)`;

    await sql`
      CREATE TABLE IF NOT EXISTS creator_profiles (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES platform_users(id) ON DELETE CASCADE,
        selected_roles JSONB NOT NULL DEFAULT '[]'::jsonb,
        role_details JSONB NOT NULL DEFAULT '{}'::jsonb,
        platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
        categories JSONB NOT NULL DEFAULT '[]'::jsonb,
        availability JSONB NOT NULL DEFAULT '[]'::jsonb,
        boundaries TEXT NOT NULL DEFAULT '',
        portfolio_links JSONB NOT NULL DEFAULT '{}'::jsonb,
        experience_level TEXT NOT NULL DEFAULT '',
        expected_payout TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'submitted',
        profile_completion INT NOT NULL DEFAULT 0,
        consent_version TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (user_id)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS company_profiles (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES platform_users(id) ON DELETE CASCADE,
        company_name TEXT NOT NULL,
        category TEXT NOT NULL,
        website TEXT NOT NULL DEFAULT '',
        instagram TEXT NOT NULL DEFAULT '',
        youtube TEXT NOT NULL DEFAULT '',
        location TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'brief_submitted',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (user_id)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS platform_company_briefs (
        id BIGSERIAL PRIMARY KEY,
        company_profile_id BIGINT NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
        goals JSONB NOT NULL DEFAULT '[]'::jsonb,
        platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
        services_needed JSONB NOT NULL DEFAULT '[]'::jsonb,
        budget_range TEXT NOT NULL,
        timeline TEXT NOT NULL,
        usage_rights_need TEXT NOT NULL,
        message TEXT NOT NULL,
        recommended_package TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'under_review',
        consent_version TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS platform_projects (
        id BIGSERIAL PRIMARY KEY,
        company_profile_id BIGINT REFERENCES company_profiles(id) ON DELETE SET NULL,
        brief_id BIGINT REFERENCES platform_company_briefs(id) ON DELETE SET NULL,
        title TEXT NOT NULL,
        package_type TEXT NOT NULL,
        goals JSONB NOT NULL DEFAULT '[]'::jsonb,
        platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
        status TEXT NOT NULL DEFAULT 'draft',
        start_date DATE,
        end_date DATE,
        created_by BIGINT REFERENCES platform_users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS platform_projects_status_idx ON platform_projects (status, created_at DESC)`;

    await sql`
      CREATE TABLE IF NOT EXISTS project_members (
        id BIGSERIAL PRIMARY KEY,
        project_id BIGINT NOT NULL REFERENCES platform_projects(id) ON DELETE CASCADE,
        user_id BIGINT NOT NULL REFERENCES platform_users(id) ON DELETE CASCADE,
        role_on_project TEXT NOT NULL,
        permissions JSONB NOT NULL DEFAULT '[]'::jsonb,
        status TEXT NOT NULL DEFAULT 'invited',
        payout_terms_id BIGINT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (project_id, user_id, role_on_project)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS platform_tasks (
        id BIGSERIAL PRIMARY KEY,
        project_id BIGINT NOT NULL REFERENCES platform_projects(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        assigned_to BIGINT REFERENCES platform_users(id) ON DELETE SET NULL,
        due_date DATE,
        priority TEXT NOT NULL DEFAULT 'normal',
        status TEXT NOT NULL DEFAULT 'not_started',
        checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS project_files (
        id BIGSERIAL PRIMARY KEY,
        project_id BIGINT NOT NULL REFERENCES platform_projects(id) ON DELETE CASCADE,
        task_id BIGINT REFERENCES platform_tasks(id) ON DELETE SET NULL,
        uploaded_by BIGINT REFERENCES platform_users(id) ON DELETE SET NULL,
        category TEXT NOT NULL,
        url TEXT NOT NULL,
        filename TEXT NOT NULL,
        version INT NOT NULL DEFAULT 1,
        visibility TEXT NOT NULL DEFAULT 'team',
        status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS platform_deliverables (
        id BIGSERIAL PRIMARY KEY,
        project_id BIGINT NOT NULL REFERENCES platform_projects(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        platform TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'idea',
        assigned_creator_id BIGINT REFERENCES platform_users(id) ON DELETE SET NULL,
        assigned_editor_id BIGINT REFERENCES platform_users(id) ON DELETE SET NULL,
        raw_file_url TEXT,
        final_file_url TEXT,
        approval_status TEXT NOT NULL DEFAULT 'not_submitted',
        usage_rights_id BIGINT,
        revision_count INT NOT NULL DEFAULT 0,
        due_date DATE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS message_threads (
        id BIGSERIAL PRIMARY KEY,
        project_id BIGINT REFERENCES platform_projects(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        participants JSONB NOT NULL DEFAULT '[]'::jsonb,
        visibility TEXT NOT NULL DEFAULT 'team',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id BIGSERIAL PRIMARY KEY,
        thread_id BIGINT NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
        sender_id BIGINT REFERENCES platform_users(id) ON DELETE SET NULL,
        body TEXT NOT NULL,
        attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
        read_by JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS approvals (
        id BIGSERIAL PRIMARY KEY,
        project_id BIGINT NOT NULL REFERENCES platform_projects(id) ON DELETE CASCADE,
        deliverable_id BIGINT REFERENCES platform_deliverables(id) ON DELETE CASCADE,
        reviewer_id BIGINT REFERENCES platform_users(id) ON DELETE SET NULL,
        status TEXT NOT NULL DEFAULT 'not_submitted',
        comments TEXT NOT NULL DEFAULT '',
        version INT NOT NULL DEFAULT 1,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS usage_rights (
        id BIGSERIAL PRIMARY KEY,
        project_id BIGINT NOT NULL REFERENCES platform_projects(id) ON DELETE CASCADE,
        deliverable_id BIGINT REFERENCES platform_deliverables(id) ON DELETE CASCADE,
        creator_id BIGINT REFERENCES platform_users(id) ON DELETE SET NULL,
        organic_allowed BOOLEAN NOT NULL DEFAULT TRUE,
        paid_ads_allowed BOOLEAN NOT NULL DEFAULT FALSE,
        whitelisting_allowed BOOLEAN NOT NULL DEFAULT FALSE,
        editing_allowed BOOLEAN NOT NULL DEFAULT FALSE,
        duration TEXT NOT NULL DEFAULT '',
        geography TEXT NOT NULL DEFAULT '',
        exclusivity TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'missing',
        accepted_at TIMESTAMPTZ,
        notes TEXT NOT NULL DEFAULT ''
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS payment_records (
        id BIGSERIAL PRIMARY KEY,
        project_id BIGINT REFERENCES platform_projects(id) ON DELETE CASCADE,
        user_id BIGINT REFERENCES platform_users(id) ON DELETE SET NULL,
        company_id BIGINT REFERENCES company_profiles(id) ON DELETE SET NULL,
        type TEXT NOT NULL,
        amount NUMERIC(12,2),
        due_date DATE,
        paid_date DATE,
        status TEXT NOT NULL DEFAULT 'draft',
        notes TEXT NOT NULL DEFAULT ''
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS notifications (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT NOT NULL REFERENCES platform_users(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        link TEXT,
        read_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id BIGSERIAL PRIMARY KEY,
        project_id BIGINT REFERENCES platform_projects(id) ON DELETE CASCADE,
        user_id BIGINT REFERENCES platform_users(id) ON DELETE SET NULL,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id TEXT,
        metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
  })();
  return platformSchemaPromise;
};

export const createOtpToken = async ({
  identifier,
  identifierType,
  otp,
  ip,
  userAgent
}: {
  identifier: string;
  identifierType: 'email' | 'phone';
  otp: string;
  ip: string;
  userAgent: string | null;
}) => {
  await ensurePlatformSchema();
  const sql = await getSqlClient();
  const normalized = normalizeIdentifier(identifier);
  await sql`
    UPDATE otp_tokens
    SET used_at = NOW()
    WHERE identifier = ${normalized} AND used_at IS NULL
  `;
  await sql`
    INSERT INTO otp_tokens (identifier, identifier_type, otp_hash, expires_at, ip, user_agent)
    VALUES (${normalized}, ${identifierType}, ${hashOtp(normalized, otp)}, NOW() + INTERVAL '10 minutes', ${ip}, ${userAgent})
  `;
};

export const verifyOtpToken = async ({ identifier, otp }: { identifier: string; otp: string }) => {
  await ensurePlatformSchema();
  const sql = await getSqlClient();
  const normalized = normalizeIdentifier(identifier);
  const rows = await sql`
    SELECT id::text AS id, otp_hash AS "otpHash", attempts, expires_at AS "expiresAt", used_at AS "usedAt"
    FROM otp_tokens
    WHERE identifier = ${normalized}
    ORDER BY created_at DESC
    LIMIT 1
  ` as unknown as Array<{ id: string; otpHash: string; attempts: number; expiresAt: string; usedAt: string | null }>;
  const token = rows[0];
  if (!token || token.usedAt) return { ok: false, code: 'INVALID_CODE' as const };
  if (new Date(token.expiresAt).getTime() < Date.now()) return { ok: false, code: 'EXPIRED_CODE' as const };
  if (token.attempts >= 5) return { ok: false, code: 'TOO_MANY_ATTEMPTS' as const };
  const expected = hashOtp(normalized, otp);
  if (expected !== token.otpHash) {
    await sql`UPDATE otp_tokens SET attempts = attempts + 1 WHERE id = ${token.id}::bigint`;
    return { ok: false, code: 'INVALID_CODE' as const };
  }
  await sql`UPDATE otp_tokens SET used_at = NOW() WHERE id = ${token.id}::bigint`;
  return { ok: true, code: 'VERIFIED' as const };
};

export const findPlatformUserByIdentifier = async (identifier: string): Promise<PlatformUserRecord | null> => {
  await ensurePlatformSchema();
  const sql = await getSqlClient();
  const type = classifyIdentifier(identifier);
  const normalized = normalizeIdentifier(identifier).replace(/[\s-]/g, '');
  const rows = type === 'phone'
    ? await sql`
      SELECT id::text AS id, name, email, phone, user_type AS "userType", roles, status, city, area,
        language_preference AS "languagePreference", communication_preference AS "communicationPreference",
        avatar_url AS "avatarUrl", email_verified AS "emailVerified", phone_verified AS "phoneVerified",
        created_at AS "createdAt", updated_at AS "updatedAt", last_active_at AS "lastActiveAt"
      FROM platform_users WHERE phone = ${normalized} LIMIT 1
    `
    : await sql`
      SELECT id::text AS id, name, email, phone, user_type AS "userType", roles, status, city, area,
        language_preference AS "languagePreference", communication_preference AS "communicationPreference",
        avatar_url AS "avatarUrl", email_verified AS "emailVerified", phone_verified AS "phoneVerified",
        created_at AS "createdAt", updated_at AS "updatedAt", last_active_at AS "lastActiveAt"
      FROM platform_users WHERE LOWER(email) = LOWER(${normalizeIdentifier(identifier)}) LIMIT 1
    `;
  return (rows[0] as unknown as PlatformUserRecord | undefined) ?? null;
};

export const getPlatformUser = async (userId: string): Promise<PlatformUserRecord | null> => {
  await ensurePlatformSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    SELECT id::text AS id, name, email, phone, user_type AS "userType", roles, status, city, area,
      language_preference AS "languagePreference", communication_preference AS "communicationPreference",
      avatar_url AS "avatarUrl", email_verified AS "emailVerified", phone_verified AS "phoneVerified",
      created_at AS "createdAt", updated_at AS "updatedAt", last_active_at AS "lastActiveAt"
    FROM platform_users
    WHERE id = ${userId}::bigint
    LIMIT 1
  `;
  return (rows[0] as unknown as PlatformUserRecord | undefined) ?? null;
};

export const touchPlatformUser = async (userId: string) => {
  await ensurePlatformSchema();
  const sql = await getSqlClient();
  await sql`UPDATE platform_users SET last_active_at = NOW() WHERE id = ${userId}::bigint`;
};

export const registerCreatorUser = async ({
  identifier,
  identifierType,
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
  boundaries,
  portfolioLinks,
  experienceLevel,
  expectedPayout,
  ip,
  userAgent
}: {
  identifier: string;
  identifierType: 'email' | 'phone';
  name: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  languagePreference: string;
  communicationPreference: string;
  selectedRoles: string[];
  roleDetails: Record<string, unknown>;
  platforms: string[];
  categories: string[];
  availability: string[];
  boundaries: string;
  portfolioLinks: Record<string, string>;
  experienceLevel: string;
  expectedPayout: string;
  ip: string;
  userAgent: string | null;
}) => {
  await ensurePlatformSchema();
  const sql = await getSqlClient();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhone = phone.replace(/[\s-]/g, '');
  const existingUser = await findPlatformUserByIdentifier(identifier);
  const userRows = existingUser
    ? await sql`
      UPDATE platform_users
      SET
        name = ${name},
        email = COALESCE(email, ${normalizedEmail || null}),
        phone = COALESCE(phone, ${normalizedPhone || null}),
        user_type = 'creator',
        roles = ${JSON.stringify(selectedRoles)}::jsonb,
        status = 'under_review',
        city = ${city},
        area = ${area},
        language_preference = ${languagePreference},
        communication_preference = ${communicationPreference},
        email_verified = email_verified OR ${identifierType === 'email'},
        phone_verified = phone_verified OR ${identifierType === 'phone'},
        updated_at = NOW()
      WHERE id = ${existingUser.id}::bigint
      RETURNING id::text AS id
    `
    : await sql`
      INSERT INTO platform_users (
        name, email, phone, user_type, roles, status, city, area, language_preference, communication_preference, email_verified, phone_verified
      ) VALUES (
        ${name}, ${normalizedEmail || null}, ${normalizedPhone || null}, 'creator', ${JSON.stringify(selectedRoles)}::jsonb, 'under_review',
        ${city}, ${area}, ${languagePreference}, ${communicationPreference}, ${identifierType === 'email'}, ${identifierType === 'phone'}
      )
      RETURNING id::text AS id
    `;
  const userId = userRows[0]?.id as string | undefined;
  if (!userId) throw new Error('Unable to create creator account.');
  const completion = Math.min(100, 30 + selectedRoles.length * 8 + platforms.length * 4 + categories.length * 3 + (boundaries ? 10 : 0) + (Object.values(portfolioLinks).filter(Boolean).length > 0 ? 12 : 0));
  await sql`
    INSERT INTO creator_profiles (
      user_id, selected_roles, role_details, platforms, categories, availability, boundaries, portfolio_links,
      experience_level, expected_payout, status, profile_completion, consent_version
    ) VALUES (
      ${userId}::bigint, ${JSON.stringify(selectedRoles)}::jsonb, ${JSON.stringify(roleDetails)}::jsonb, ${JSON.stringify(platforms)}::jsonb,
      ${JSON.stringify(categories)}::jsonb, ${JSON.stringify(availability)}::jsonb, ${boundaries}, ${JSON.stringify(portfolioLinks)}::jsonb,
      ${experienceLevel}, ${expectedPayout}, 'under_review', ${completion}, ${LEGAL_VERSION}
    )
    ON CONFLICT (user_id) DO UPDATE SET
      selected_roles = EXCLUDED.selected_roles,
      role_details = EXCLUDED.role_details,
      platforms = EXCLUDED.platforms,
      categories = EXCLUDED.categories,
      availability = EXCLUDED.availability,
      boundaries = EXCLUDED.boundaries,
      portfolio_links = EXCLUDED.portfolio_links,
      experience_level = EXCLUDED.experience_level,
      expected_payout = EXCLUDED.expected_payout,
      status = 'under_review',
      profile_completion = EXCLUDED.profile_completion,
      consent_version = EXCLUDED.consent_version,
      updated_at = NOW()
  `;
  await sql`
    INSERT INTO notifications (user_id, type, title, message, link)
    VALUES (${userId}::bigint, 'profile_submitted', 'Profile submitted', 'Your creator profile is under review. If shortlisted, the next step may be a discovery call or matching review.', '/dashboard')
  `;
  await recordLegalConsent({
    userType: 'creator',
    userId,
    formType: 'platform_creator_registration',
    consentText: CREATOR_APPLICATION_CONSENT,
    legalVersion: LEGAL_VERSION,
    legalLinks: creatorAgreementLinks,
    accepted: true,
    ip,
    userAgent,
    email: normalizedEmail || identifier,
    phone: normalizedPhone || null
  });
  return userId;
};

export const registerCompanyUser = async ({
  identifier,
  identifierType,
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
  message,
  recommendedPackage,
  ip,
  userAgent
}: {
  identifier: string;
  identifierType: 'email' | 'phone';
  name: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  languagePreference: string;
  communicationPreference: string;
  companyName: string;
  category: string;
  website: string;
  instagram: string;
  youtube: string;
  goals: string[];
  platforms: string[];
  servicesNeeded: string[];
  budgetRange: string;
  timeline: string;
  usageRightsNeed: string;
  message: string;
  recommendedPackage: string;
  ip: string;
  userAgent: string | null;
}) => {
  await ensurePlatformSchema();
  const sql = await getSqlClient();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhone = phone.replace(/[\s-]/g, '');
  const existingUser = await findPlatformUserByIdentifier(identifier);
  const userRows = existingUser
    ? await sql`
      UPDATE platform_users
      SET
        name = ${name},
        email = COALESCE(email, ${normalizedEmail || null}),
        phone = COALESCE(phone, ${normalizedPhone || null}),
        user_type = 'company',
        roles = '["company_contact"]'::jsonb,
        status = 'brief_submitted',
        city = ${city},
        area = ${area},
        language_preference = ${languagePreference},
        communication_preference = ${communicationPreference},
        email_verified = email_verified OR ${identifierType === 'email'},
        phone_verified = phone_verified OR ${identifierType === 'phone'},
        updated_at = NOW()
      WHERE id = ${existingUser.id}::bigint
      RETURNING id::text AS id
    `
    : await sql`
      INSERT INTO platform_users (
        name, email, phone, user_type, roles, status, city, area, language_preference, communication_preference, email_verified, phone_verified
      ) VALUES (
        ${name}, ${normalizedEmail || null}, ${normalizedPhone || null}, 'company', '["company_contact"]'::jsonb, 'brief_submitted',
        ${city}, ${area}, ${languagePreference}, ${communicationPreference}, ${identifierType === 'email'}, ${identifierType === 'phone'}
      )
      RETURNING id::text AS id
    `;
  const userId = userRows[0]?.id as string | undefined;
  if (!userId) throw new Error('Unable to create company account.');
  const profileRows = await sql`
    INSERT INTO company_profiles (user_id, company_name, category, website, instagram, youtube, location, status)
    VALUES (${userId}::bigint, ${companyName}, ${category}, ${website}, ${instagram}, ${youtube}, ${[area, city].filter(Boolean).join(', ')}, 'brief_submitted')
    ON CONFLICT (user_id) DO UPDATE SET
      company_name = EXCLUDED.company_name,
      category = EXCLUDED.category,
      website = EXCLUDED.website,
      instagram = EXCLUDED.instagram,
      youtube = EXCLUDED.youtube,
      location = EXCLUDED.location,
      status = 'brief_submitted',
      updated_at = NOW()
    RETURNING id::text AS id
  `;
  const companyProfileId = profileRows[0]?.id as string | undefined;
  if (!companyProfileId) throw new Error('Unable to create company profile.');
  await sql`
    INSERT INTO platform_company_briefs (
      company_profile_id, goals, platforms, services_needed, budget_range, timeline, usage_rights_need,
      message, recommended_package, status, consent_version
    ) VALUES (
      ${companyProfileId}::bigint, ${JSON.stringify(goals)}::jsonb, ${JSON.stringify(platforms)}::jsonb,
      ${JSON.stringify(servicesNeeded)}::jsonb, ${budgetRange}, ${timeline}, ${usageRightsNeed}, ${message},
      ${recommendedPackage}, 'under_review', ${LEGAL_VERSION}
    )
  `;
  await sql`
    INSERT INTO notifications (user_id, type, title, message, link)
    VALUES (${userId}::bigint, 'brief_submitted', 'Campaign brief submitted', 'Your brief is under review. The studio will recommend a practical campaign path before a larger scope is confirmed.', '/dashboard')
  `;
  await recordLegalConsent({
    userType: 'company',
    userId,
    formType: 'platform_company_registration',
    consentText: COMPANY_INQUIRY_CONSENT,
    legalVersion: LEGAL_VERSION,
    legalLinks: companyAgreementLinks,
    accepted: true,
    ip,
    userAgent,
    email: normalizedEmail || identifier,
    phone: normalizedPhone || null
  });
  return userId;
};

const userSelect = `
  id::text AS id, name, email, phone, user_type AS "userType", roles, status, city, area,
  language_preference AS "languagePreference", communication_preference AS "communicationPreference",
  avatar_url AS "avatarUrl", email_verified AS "emailVerified", phone_verified AS "phoneVerified",
  created_at AS "createdAt", updated_at AS "updatedAt", last_active_at AS "lastActiveAt"
`;

export const getPlatformDashboardData = async (userId: string): Promise<PlatformDashboardData | null> => {
  await ensurePlatformSchema();
  const sql = await getSqlClient();
  const users = await sql.unsafe(`SELECT ${userSelect} FROM platform_users WHERE id = $1::bigint LIMIT 1`, [userId]);
  const user = users[0] as unknown as PlatformUserRecord | undefined;
  if (!user) return null;
  await touchPlatformUser(userId);
  const [creatorRows, companyRows] = await Promise.all([
    sql`
      SELECT id::text AS id, user_id::text AS "userId", selected_roles AS "selectedRoles", role_details AS "roleDetails",
        platforms, categories, availability, boundaries, portfolio_links AS "portfolioLinks", experience_level AS "experienceLevel",
        expected_payout AS "expectedPayout", status, profile_completion AS "profileCompletion", consent_version AS "consentVersion",
        created_at AS "createdAt", updated_at AS "updatedAt"
      FROM creator_profiles WHERE user_id = ${userId}::bigint LIMIT 1
    `,
    sql`
      SELECT id::text AS id, user_id::text AS "userId", company_name AS "companyName", category, website, instagram, youtube,
        location, status, created_at AS "createdAt", updated_at AS "updatedAt"
      FROM company_profiles WHERE user_id = ${userId}::bigint LIMIT 1
    `
  ]);
  const creatorProfile = (creatorRows[0] as unknown as CreatorProfileRecord | undefined) ?? null;
  const companyProfile = (companyRows[0] as unknown as CompanyProfileRecord | undefined) ?? null;
  const companyProfileId = companyProfile?.id ?? '0';
  const [briefs, projectRows, taskRows, deliverableRows, notifications, missingUsage, pendingPayments] = await Promise.all([
    companyProfile
      ? sql`
        SELECT id::text AS id, company_profile_id::text AS "companyProfileId", goals, platforms,
          services_needed AS "servicesNeeded", budget_range AS "budgetRange", timeline, usage_rights_need AS "usageRightsNeed",
          message, recommended_package AS "recommendedPackage", status, consent_version AS "consentVersion",
          created_at AS "createdAt", updated_at AS "updatedAt"
        FROM platform_company_briefs
        WHERE company_profile_id = ${companyProfileId}::bigint
        ORDER BY created_at DESC
      `
      : Promise.resolve([]),
    sql`
      SELECT DISTINCT p.id::text AS id, p.company_profile_id::text AS "companyProfileId", p.brief_id::text AS "briefId",
        p.title, p.package_type AS "packageType", p.goals, p.platforms, p.status,
        p.start_date AS "startDate", p.end_date AS "endDate", p.created_by::text AS "createdBy",
        p.created_at AS "createdAt", p.updated_at AS "updatedAt"
      FROM platform_projects p
      LEFT JOIN project_members m ON m.project_id = p.id
      WHERE m.user_id = ${userId}::bigint OR p.created_by = ${userId}::bigint OR p.company_profile_id = ${companyProfileId}::bigint
      ORDER BY p.updated_at DESC
      LIMIT 50
    `,
    sql`
      SELECT t.id::text AS id, t.project_id::text AS "projectId", t.title, t.description, t.assigned_to::text AS "assignedTo",
        t.due_date AS "dueDate", t.priority, t.status, t.checklist, t.created_at AS "createdAt", t.updated_at AS "updatedAt"
      FROM platform_tasks t
      INNER JOIN platform_projects p ON p.id = t.project_id
      LEFT JOIN project_members m ON m.project_id = p.id
      WHERE t.assigned_to = ${userId}::bigint OR p.created_by = ${userId}::bigint OR m.user_id = ${userId}::bigint OR p.company_profile_id = ${companyProfileId}::bigint
      ORDER BY t.due_date ASC NULLS LAST, t.updated_at DESC
      LIMIT 50
    `,
    sql`
      SELECT d.id::text AS id, d.project_id::text AS "projectId", d.title, d.type, d.platform, d.status,
        d.approval_status AS "approvalStatus", d.usage_rights_id::text AS "usageRightsId", d.revision_count AS "revisionCount",
        d.due_date AS "dueDate", d.created_at AS "createdAt"
      FROM platform_deliverables d
      INNER JOIN platform_projects p ON p.id = d.project_id
      LEFT JOIN project_members m ON m.project_id = p.id
      WHERE d.assigned_creator_id = ${userId}::bigint OR d.assigned_editor_id = ${userId}::bigint OR p.created_by = ${userId}::bigint OR m.user_id = ${userId}::bigint OR p.company_profile_id = ${companyProfileId}::bigint
      ORDER BY d.created_at DESC
      LIMIT 50
    `,
    sql`
      SELECT id::text AS id, user_id::text AS "userId", type, title, message, link, read_at AS "readAt", created_at AS "createdAt"
      FROM notifications
      WHERE user_id = ${userId}::bigint
      ORDER BY created_at DESC
      LIMIT 20
    `,
    sql`
      SELECT COUNT(*)::int AS count
      FROM platform_deliverables d
      INNER JOIN platform_projects p ON p.id = d.project_id
      LEFT JOIN project_members m ON m.project_id = p.id
      WHERE d.usage_rights_id IS NULL AND (p.created_by = ${userId}::bigint OR m.user_id = ${userId}::bigint OR p.company_profile_id = ${companyProfileId}::bigint)
    `,
    sql`
      SELECT COUNT(*)::int AS count
      FROM payment_records
      WHERE user_id = ${userId}::bigint AND status IN ('pending_acceptance', 'pending_payment', 'overdue')
    `
  ]);
  const projects = projectRows as unknown as PlatformProjectRecord[];
  const tasks = taskRows as unknown as PlatformTaskRecord[];
  const deliverables = deliverableRows as unknown as PlatformDeliverableRecord[];
  return {
    user,
    creatorProfile,
    companyProfile,
    companyBriefs: briefs as unknown as PlatformCompanyBriefRecord[],
    projects,
    tasks,
    deliverables,
    notifications: notifications as unknown as PlatformNotificationRecord[],
    metrics: {
      activeProjects: projects.filter((project) => !['completed', 'cancelled', 'paused'].includes(project.status)).length,
      pendingTasks: tasks.filter((task) => !['approved', 'completed', 'cancelled'].includes(task.status)).length,
      approvalsNeeded: deliverables.filter((deliverable) => ['submitted', 'client_review', 'internal_review'].includes(deliverable.approvalStatus)).length,
      usageRightsMissing: Number((missingUsage[0] as { count?: number } | undefined)?.count ?? 0),
      pendingPayouts: Number((pendingPayments[0] as { count?: number } | undefined)?.count ?? 0)
    }
  };
};

export const getWorkspacePreview = () => ({
  projectFlow: ['Brief', 'Team', 'Tasks', 'Files', 'Deliverables', 'Approvals', 'Usage Rights', 'Payments', 'Report'],
  taskColumns: ['Not Started', 'Waiting for Brief', 'In Progress', 'Submitted', 'Needs Revision', 'Approved', 'Completed'],
  deliverableColumns: ['Idea', 'Hook Approved', 'Script Ready', 'Raw Footage', 'Editing', 'Review', 'Approved', 'Posted'],
  fileFolders: ['Brand Guidelines', 'Product Materials', 'Scripts & Hooks', 'Raw Footage', 'Edits', 'Graphics', 'Captions', 'Final Deliverables', 'Legal & Usage Rights', 'Reports'],
  templates: ['UGC Starter Pack', 'Creator Launch Campaign', 'Livestream Sales Sprint', 'Monthly Creator Marketing Engine', 'Full Package Campaign']
});

export const getOtpDebugHash = (identifier: string) => hashIdentifier(identifier).slice(0, 10);

export const getPlatformUsersForAdmin = async (): Promise<PlatformUserAdminRecord[]> => {
  await ensurePlatformSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    SELECT
      u.id::text AS id,
      u.name,
      u.email,
      u.phone,
      u.user_type AS "userType",
      u.roles,
      u.status,
      u.city,
      u.area,
      u.language_preference AS "languagePreference",
      u.communication_preference AS "communicationPreference",
      u.avatar_url AS "avatarUrl",
      u.email_verified AS "emailVerified",
      u.phone_verified AS "phoneVerified",
      u.created_at AS "createdAt",
      u.updated_at AS "updatedAt",
      u.last_active_at AS "lastActiveAt",
      cp.profile_completion AS "profileCompletion",
      company.company_name AS "companyName",
      COALESCE(cp.selected_roles, '[]'::jsonb) AS "selectedRoles",
      COALESCE(projects.count, 0)::int AS "projectCount"
    FROM platform_users u
    LEFT JOIN creator_profiles cp ON cp.user_id = u.id
    LEFT JOIN company_profiles company ON company.user_id = u.id
    LEFT JOIN LATERAL (
      SELECT COUNT(*) AS count
      FROM project_members members
      WHERE members.user_id = u.id
    ) projects ON TRUE
    ORDER BY u.created_at DESC
    LIMIT 500
  `;
  return rows as unknown as PlatformUserAdminRecord[];
};
