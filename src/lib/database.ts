import { lookup } from 'node:dns/promises';
import postgres, { type Sql } from 'postgres';

export type ApplicationStatus = 'new' | 'review' | 'shortlisted' | 'call_needed' | 'call_scheduled' | 'selected' | 'training' | 'roster_ready' | 'matched' | 'active' | 'paused' | 'not_selected' | 'rejected' | 'rejected_safety';

export interface ApplicationRecord {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  area: string;
  languages: string;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  cameraComfort: string;
  categories: string[];
  roleTags: string[];
  formatTags: string[];
  categoryTags: string[];
  availabilityTags: string[];
  experienceLevel: string;
  expectedPayout: string;
  roleDetails: Record<string, Record<string, string | string[]>>;
  availability: string;
  boundaries: string;
  status: ApplicationStatus;
  isTop10: boolean;
  adminNotes: string | null;
  creatorTier: string | null;
  submittedAt: string;
  duplicateCount: number;
}

export type ContactInquiryType = 'creator_support' | 'brand_inquiry' | 'safety_concern' | 'general';

export interface CompanyBriefDetails {
  companyName?: string;
  companyCategory?: string;
  packageInterest?: string;
  budgetRange?: string;
  timeline?: string;
  campaignGoal?: string;
}

export interface ContactInquiryRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  inquiryType: ContactInquiryType;
  message: string;
  details: CompanyBriefDetails;
  createdAt: string;
}

export type ComplaintStatus = 'new' | 'under_review' | 'needs_information' | 'paused' | 'escalated' | 'resolved' | 'closed';
export type ComplaintSeverity = 'low' | 'medium' | 'high' | 'urgent';

export interface ComplaintRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  reporterRole: string;
  issueType: string;
  relatedEntity: string;
  description: string;
  urgency: ComplaintSeverity;
  evidenceUrl: string | null;
  status: ComplaintStatus;
  severity: ComplaintSeverity;
  adminNotes: string | null;
  resolution: string | null;
  createdAt: string;
}

export interface LegalConsentRecord {
  id: string;
  userType: 'creator' | 'company' | 'general';
  userId: string | null;
  formType: string;
  consentText: string;
  legalVersion: string;
  accepted: boolean;
  ip: string | null;
  userAgent: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
}

export type CampaignStatus = 'new_brief' | 'discovery' | 'scoped' | 'active' | 'complete' | 'declined';

export type CompanyBriefStatus = 'new_brief' | 'qualified' | 'needs_call' | 'proposal_needed' | 'proposal_sent' | 'negotiation' | 'confirmed' | 'in_production' | 'delivered' | 'completed' | 'lost' | 'rejected_unsafe';

export interface CompanyBriefRecord {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  businessCategory: string;
  goals: string[];
  platforms: string[];
  monetizationTargets: string[];
  services: string[];
  talentNeeds: string[];
  budgetRange: string;
  timeline: string;
  usageRights: string;
  description: string;
  recommendedPackage: string;
  status: CompanyBriefStatus;
  adminNotes: string | null;
  submittedAt: string;
  duplicateCount: number;
}

export type MatchAcceptanceStatus = 'not_contacted' | 'pending' | 'accepted' | 'declined';
export type MatchPayoutStatus = 'pending' | 'agreed' | 'paid';
export type MatchUsageStatus = 'pending' | 'agreed';
export type MatchDeliveryStatus = 'not_started' | 'in_progress' | 'delivered';

export interface CompanyBriefMatchRecord {
  id: string;
  briefId: string;
  creatorId: string;
  acceptanceStatus: MatchAcceptanceStatus;
  payoutStatus: MatchPayoutStatus;
  usageStatus: MatchUsageStatus;
  deliveryStatus: MatchDeliveryStatus;
  notes: string | null;
  createdAt: string;
}

export interface CompanyCampaignRecord {
  companyId: string;
  companyName: string;
  companyCategory: string;
  contactName: string;
  contactEmail: string;
  campaignId: string;
  campaignTitle: string;
  serviceType: string;
  budgetRange: string;
  timeline: string;
  campaignGoal: string;
  status: CampaignStatus;
  createdAt: string;
}

let sqlClientPromise: Promise<Sql> | null = null;
let schemaPromise: Promise<void> | null = null;
let contactSchemaPromise: Promise<void> | null = null;
let operationsSchemaPromise: Promise<void> | null = null;
let legalConsentSchemaPromise: Promise<void> | null = null;
let companyBriefSchemaPromise: Promise<void> | null = null;
let companyBriefMatchSchemaPromise: Promise<void> | null = null;
let complaintSchemaPromise: Promise<void> | null = null;

const createSqlClient = async () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured.');
  }

  const url = new URL(connectionString);
  const originalHost = url.hostname;

  try {
    const address = await lookup(originalHost, { family: 4 });
    url.hostname = address.address;
  } catch {
    // Use the configured hostname when an IPv4 lookup is unavailable.
  }

  return postgres(url.toString(), {
    max: 3,
    connect_timeout: 10,
    idle_timeout: 20,
    onnotice: () => undefined,
    ssl: url.searchParams.get('sslmode') === 'disable' ? false : { servername: originalHost, rejectUnauthorized: true }
  });
};

export const getSqlClient = () => {
  sqlClientPromise ??= createSqlClient();
  return sqlClientPromise;
};

export const ensureApplicationsSchema = async () => {
  schemaPromise ??= (async () => {
    const sql = await getSqlClient();
    await sql`
      CREATE TABLE IF NOT EXISTS creator_applications (
        id BIGSERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        pronouns TEXT NOT NULL,
        location TEXT NOT NULL,
        languages TEXT NOT NULL,
        experience TEXT NOT NULL,
        comfort_zones TEXT NOT NULL,
        availability TEXT NOT NULL,
        preferred_tier TEXT NOT NULL,
        contact TEXT NOT NULL,
        submitted_at TIMESTAMPTZ NOT NULL,
        payload JSONB NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS email TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS whatsapp TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS city TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS area TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS instagram_url TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS youtube_url TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS camera_comfort TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS categories JSONB NOT NULL DEFAULT '[]'::jsonb`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS role_tags JSONB NOT NULL DEFAULT '[]'::jsonb`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS format_tags JSONB NOT NULL DEFAULT '[]'::jsonb`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS category_tags JSONB NOT NULL DEFAULT '[]'::jsonb`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS availability_tags JSONB NOT NULL DEFAULT '[]'::jsonb`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS experience_level TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS expected_payout TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS boundaries TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS consents JSONB NOT NULL DEFAULT '{}'::jsonb`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new'`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS is_top_10 BOOLEAN NOT NULL DEFAULT FALSE`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS admin_notes TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS creator_tier TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS duplicate_key TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`;
    await sql`CREATE INDEX IF NOT EXISTS creator_applications_status_idx ON creator_applications (status, submitted_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS creator_applications_duplicate_key_idx ON creator_applications (duplicate_key)`;
    await sql`CREATE INDEX IF NOT EXISTS creator_applications_role_tags_idx ON creator_applications USING GIN (role_tags)`;
    await sql`CREATE INDEX IF NOT EXISTS creator_applications_format_tags_idx ON creator_applications USING GIN (format_tags)`;
  })();

  return schemaPromise;
};

export const ensureContactInquiriesSchema = async () => {
  contactSchemaPromise ??= (async () => {
    const sql = await getSqlClient();
    await sql`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id BIGSERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        inquiry_type TEXT NOT NULL,
        message TEXT NOT NULL,
        details JSONB NOT NULL DEFAULT '{}'::jsonb,
        consent_given BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS details JSONB NOT NULL DEFAULT '{}'::jsonb`;
    await sql`CREATE INDEX IF NOT EXISTS contact_inquiries_type_created_idx ON contact_inquiries (inquiry_type, created_at DESC)`;
  })();

  return contactSchemaPromise;
};

export const ensureLegalConsentsSchema = async () => {
  legalConsentSchemaPromise ??= (async () => {
    const sql = await getSqlClient();
    await sql`
      CREATE TABLE IF NOT EXISTS legal_consents (
        id BIGSERIAL PRIMARY KEY,
        user_type TEXT NOT NULL,
        user_id TEXT,
        form_type TEXT NOT NULL,
        consent_text TEXT NOT NULL,
        legal_version TEXT NOT NULL,
        legal_links JSONB NOT NULL DEFAULT '[]'::jsonb,
        accepted BOOLEAN NOT NULL,
        ip TEXT,
        user_agent TEXT,
        email TEXT,
        phone TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS legal_consents_form_created_idx ON legal_consents (form_type, created_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS legal_consents_email_idx ON legal_consents (email)`;
  })();
  return legalConsentSchemaPromise;
};

export const recordLegalConsent = async ({
  userType,
  userId,
  formType,
  consentText,
  legalVersion,
  legalLinks,
  accepted,
  ip,
  userAgent,
  email,
  phone
}: {
  userType: 'creator' | 'company' | 'general';
  userId?: string;
  formType: string;
  consentText: string;
  legalVersion: string;
  legalLinks: ReadonlyArray<{ label: string; href: string }>;
  accepted: boolean;
  ip?: string | null;
  userAgent?: string | null;
  email?: string | null;
  phone?: string | null;
}) => {
  await ensureLegalConsentsSchema();
  const sql = await getSqlClient();
  await sql`
    INSERT INTO legal_consents (
      user_type, user_id, form_type, consent_text, legal_version, legal_links, accepted, ip, user_agent, email, phone
    ) VALUES (
      ${userType}, ${userId ?? null}, ${formType}, ${consentText}, ${legalVersion}, ${JSON.stringify(legalLinks)}::jsonb,
      ${accepted}, ${ip ?? null}, ${userAgent ?? null}, ${email ?? null}, ${phone ?? null}
    )
  `;
};

export const getLegalConsents = async (): Promise<LegalConsentRecord[]> => {
  await ensureLegalConsentsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    SELECT
      id::text AS id,
      user_type AS "userType",
      user_id AS "userId",
      form_type AS "formType",
      consent_text AS "consentText",
      legal_version AS "legalVersion",
      accepted,
      ip,
      user_agent AS "userAgent",
      email,
      phone,
      created_at AS "createdAt"
    FROM legal_consents
    ORDER BY created_at DESC
    LIMIT 250
  `;
  return rows as unknown as LegalConsentRecord[];
};

export const ensureComplaintsSchema = async () => {
  complaintSchemaPromise ??= (async () => {
    const sql = await getSqlClient();
    await sql`
      CREATE TABLE IF NOT EXISTS complaints (
        id BIGSERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        reporter_role TEXT NOT NULL,
        issue_type TEXT NOT NULL,
        related_entity TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL,
        urgency TEXT NOT NULL DEFAULT 'medium',
        evidence_url TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        severity TEXT NOT NULL DEFAULT 'medium',
        admin_notes TEXT,
        resolution TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS complaints_status_created_idx ON complaints (status, created_at DESC)`;
  })();
  return complaintSchemaPromise;
};

export const createComplaint = async ({
  fullName,
  email,
  phone,
  reporterRole,
  issueType,
  relatedEntity,
  description,
  urgency,
  evidenceUrl
}: Omit<ComplaintRecord, 'id' | 'status' | 'severity' | 'adminNotes' | 'resolution' | 'createdAt'>) => {
  await ensureComplaintsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    INSERT INTO complaints (full_name, email, phone, reporter_role, issue_type, related_entity, description, urgency, severity, evidence_url)
    VALUES (${fullName}, ${email}, ${phone}, ${reporterRole}, ${issueType}, ${relatedEntity}, ${description}, ${urgency}, ${urgency}, ${evidenceUrl})
    RETURNING id::text AS id
  `;
  return rows[0]?.id as string | undefined;
};

export const getComplaints = async (): Promise<ComplaintRecord[]> => {
  await ensureComplaintsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    SELECT
      id::text AS id,
      full_name AS "fullName",
      email,
      phone,
      reporter_role AS "reporterRole",
      issue_type AS "issueType",
      related_entity AS "relatedEntity",
      description,
      urgency,
      evidence_url AS "evidenceUrl",
      status,
      severity,
      admin_notes AS "adminNotes",
      resolution,
      created_at AS "createdAt"
    FROM complaints
    ORDER BY CASE severity WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'medium' THEN 3 ELSE 4 END, created_at DESC
  `;
  return rows as unknown as ComplaintRecord[];
};

export const updateComplaint = async ({ id, status, severity, adminNotes, resolution }: Pick<ComplaintRecord, 'id' | 'status' | 'severity' | 'adminNotes' | 'resolution'>) => {
  await ensureComplaintsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    UPDATE complaints
    SET status = ${status}, severity = ${severity}, admin_notes = ${adminNotes}, resolution = ${resolution}, updated_at = NOW()
    WHERE id = ${id}::bigint
    RETURNING id::text AS id
  `;
  return rows.length > 0;
};

export const createContactInquiry = async ({
  fullName,
  email,
  phone,
  inquiryType,
  message,
  details
}: Omit<ContactInquiryRecord, 'id' | 'createdAt'>) => {
  await ensureContactInquiriesSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    INSERT INTO contact_inquiries (full_name, email, phone, inquiry_type, message, details, consent_given)
    VALUES (${fullName}, ${email}, ${phone}, ${inquiryType}, ${message}, ${JSON.stringify(details)}::jsonb, TRUE)
    RETURNING id::text AS id
  `;
  return rows[0]?.id as string | undefined;
};

export const getContactInquiries = async (): Promise<ContactInquiryRecord[]> => {
  await ensureContactInquiriesSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    SELECT
      id::text AS id,
      full_name AS "fullName",
      email,
      phone,
      inquiry_type AS "inquiryType",
      message,
      COALESCE(details, '{}'::jsonb) AS details,
      created_at AS "createdAt"
    FROM contact_inquiries
    ORDER BY created_at DESC
  `;
  return rows as unknown as ContactInquiryRecord[];
};

export const ensureOperationsSchema = async () => {
  operationsSchemaPromise ??= (async () => {
    const sql = await getSqlClient();
    await sql`
      CREATE TABLE IF NOT EXISTS companies (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        contact_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS campaigns (
        id BIGSERIAL PRIMARY KEY,
        company_id BIGINT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        service_type TEXT NOT NULL,
        budget_range TEXT NOT NULL,
        timeline TEXT NOT NULL,
        campaign_goal TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new_brief',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS companies_email_idx ON companies (email)`;
    await sql`CREATE INDEX IF NOT EXISTS campaigns_status_created_idx ON campaigns (status, created_at DESC)`;
  })();
  return operationsSchemaPromise;
};

export const ensureCompanyBriefsSchema = async () => {
  companyBriefSchemaPromise ??= (async () => {
    const sql = await getSqlClient();
    await sql`
      CREATE TABLE IF NOT EXISTS company_briefs (
        id BIGSERIAL PRIMARY KEY,
        company_name TEXT NOT NULL,
        contact_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        website_url TEXT,
        business_category TEXT NOT NULL,
        goals JSONB NOT NULL DEFAULT '[]'::jsonb,
        platforms JSONB NOT NULL DEFAULT '[]'::jsonb,
        monetization_targets JSONB NOT NULL DEFAULT '[]'::jsonb,
        services JSONB NOT NULL DEFAULT '[]'::jsonb,
        talent_needs JSONB NOT NULL DEFAULT '[]'::jsonb,
        budget_range TEXT NOT NULL,
        timeline TEXT NOT NULL,
        usage_rights TEXT NOT NULL,
        description TEXT NOT NULL,
        recommended_package TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new_brief',
        admin_notes TEXT,
        payload JSONB NOT NULL,
        duplicate_key TEXT,
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS company_briefs_status_submitted_idx ON company_briefs (status, submitted_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS company_briefs_duplicate_key_idx ON company_briefs (duplicate_key)`;
    await sql`CREATE INDEX IF NOT EXISTS company_briefs_goals_idx ON company_briefs USING GIN (goals)`;
    await sql`CREATE INDEX IF NOT EXISTS company_briefs_talent_needs_idx ON company_briefs USING GIN (talent_needs)`;
  })();
  return companyBriefSchemaPromise;
};

export const ensureCompanyBriefMatchesSchema = async () => {
  companyBriefMatchSchemaPromise ??= (async () => {
    await Promise.all([ensureCompanyBriefsSchema(), ensureApplicationsSchema()]);
    const sql = await getSqlClient();
    await sql`
      CREATE TABLE IF NOT EXISTS company_brief_matches (
        id BIGSERIAL PRIMARY KEY,
        brief_id BIGINT NOT NULL REFERENCES company_briefs(id) ON DELETE CASCADE,
        creator_id BIGINT NOT NULL REFERENCES creator_applications(id) ON DELETE CASCADE,
        acceptance_status TEXT NOT NULL DEFAULT 'not_contacted',
        payout_status TEXT NOT NULL DEFAULT 'pending',
        usage_status TEXT NOT NULL DEFAULT 'pending',
        delivery_status TEXT NOT NULL DEFAULT 'not_started',
        notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (brief_id, creator_id)
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS company_brief_matches_brief_idx ON company_brief_matches (brief_id, created_at DESC)`;
  })();
  return companyBriefMatchSchemaPromise;
};

export const recordCompanyMarketingBrief = async ({
  fullName,
  email,
  phone,
  details
}: {
  fullName: string;
  email: string;
  phone: string | null;
  details: Required<CompanyBriefDetails>;
}) => {
  await ensureOperationsSchema();
  const sql = await getSqlClient();
  const matchingCompanies = await sql`
    SELECT id::text AS id
    FROM companies
    WHERE LOWER(name) = LOWER(${details.companyName}) AND LOWER(email) = LOWER(${email})
    ORDER BY updated_at DESC
    LIMIT 1
  `;
  const companyId = matchingCompanies[0]?.id as string | undefined;
  const resolvedCompanyId = companyId ?? (await sql`
    INSERT INTO companies (name, category, contact_name, email, phone)
    VALUES (${details.companyName}, ${details.companyCategory}, ${fullName}, ${email}, ${phone})
    RETURNING id::text AS id
  `)[0]?.id as string | undefined;

  if (!resolvedCompanyId) throw new Error('Unable to create a company record.');
  if (companyId) {
    await sql`
      UPDATE companies
      SET category = ${details.companyCategory}, contact_name = ${fullName}, phone = ${phone}, updated_at = NOW()
      WHERE id = ${resolvedCompanyId}::bigint
    `;
  }

  await sql`
    INSERT INTO campaigns (company_id, title, service_type, budget_range, timeline, campaign_goal)
    VALUES (${resolvedCompanyId}::bigint, ${`${details.companyName} marketing brief`}, ${details.packageInterest}, ${details.budgetRange}, ${details.timeline}, ${details.campaignGoal})
  `;
};

export const getCompanyCampaigns = async (): Promise<CompanyCampaignRecord[]> => {
  await ensureOperationsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    SELECT
      companies.id::text AS "companyId",
      companies.name AS "companyName",
      companies.category AS "companyCategory",
      companies.contact_name AS "contactName",
      companies.email AS "contactEmail",
      campaigns.id::text AS "campaignId",
      campaigns.title AS "campaignTitle",
      campaigns.service_type AS "serviceType",
      campaigns.budget_range AS "budgetRange",
      campaigns.timeline,
      campaigns.campaign_goal AS "campaignGoal",
      campaigns.status,
      campaigns.created_at AS "createdAt"
    FROM campaigns
    INNER JOIN companies ON companies.id = campaigns.company_id
    ORDER BY campaigns.created_at DESC
    LIMIT 100
  `;
  return rows as unknown as CompanyCampaignRecord[];
};

export const updateCampaignStatus = async (id: string, status: CampaignStatus) => {
  await ensureOperationsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    UPDATE campaigns
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${id}::bigint
    RETURNING id::text AS id
  `;
  return rows.length > 0;
};

export const getApplications = async (): Promise<ApplicationRecord[]> => {
  await ensureApplicationsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    SELECT
      a.id::text AS id,
      a.full_name AS "fullName",
      COALESCE(a.email, '') AS email,
      COALESCE(a.whatsapp, '') AS whatsapp,
      COALESCE(a.city, a.location) AS city,
      COALESCE(a.area, '') AS area,
      a.languages,
      a.instagram_url AS "instagramUrl",
      a.youtube_url AS "youtubeUrl",
      COALESCE(a.camera_comfort, '') AS "cameraComfort",
      COALESCE(a.categories, '[]'::jsonb) AS categories,
      COALESCE(a.role_tags, '[]'::jsonb) AS "roleTags",
      COALESCE(a.format_tags, '[]'::jsonb) AS "formatTags",
      COALESCE(a.category_tags, '[]'::jsonb) AS "categoryTags",
      COALESCE(a.availability_tags, '[]'::jsonb) AS "availabilityTags",
      COALESCE(a.experience_level, '') AS "experienceLevel",
      COALESCE(a.expected_payout, '') AS "expectedPayout",
      COALESCE(a.payload -> 'roleDetails', '{}'::jsonb) AS "roleDetails",
      a.availability,
      COALESCE(a.boundaries, '') AS boundaries,
      a.status,
      a.is_top_10 AS "isTop10",
      a.admin_notes AS "adminNotes",
      a.creator_tier AS "creatorTier",
      a.submitted_at AS "submittedAt",
      COALESCE((
        SELECT COUNT(*)::int
        FROM creator_applications duplicates
        WHERE duplicates.duplicate_key IS NOT NULL AND duplicates.duplicate_key = a.duplicate_key
      ), 0) AS "duplicateCount"
    FROM creator_applications a
    ORDER BY a.is_top_10 DESC, a.submitted_at DESC
  `;
  return rows as unknown as ApplicationRecord[];
};

export const createCompanyBrief = async ({
  companyName,
  contactName,
  email,
  phone,
  websiteUrl,
  businessCategory,
  goals,
  platforms,
  monetizationTargets,
  services,
  talentNeeds,
  budgetRange,
  timeline,
  usageRights,
  description,
  recommendedPackage,
  payload,
  duplicateKey
}: Omit<CompanyBriefRecord, 'id' | 'status' | 'adminNotes' | 'submittedAt' | 'duplicateCount'> & { payload: Record<string, unknown>; duplicateKey: string }) => {
  await ensureCompanyBriefsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    INSERT INTO company_briefs (
      company_name, contact_name, email, phone, website_url, business_category, goals, platforms, monetization_targets,
      services, talent_needs, budget_range, timeline, usage_rights, description, recommended_package, payload, duplicate_key
    ) VALUES (
      ${companyName}, ${contactName}, ${email}, ${phone}, ${websiteUrl || null}, ${businessCategory}, ${JSON.stringify(goals)}::jsonb,
      ${JSON.stringify(platforms)}::jsonb, ${JSON.stringify(monetizationTargets)}::jsonb, ${JSON.stringify(services)}::jsonb,
      ${JSON.stringify(talentNeeds)}::jsonb, ${budgetRange}, ${timeline}, ${usageRights}, ${description}, ${recommendedPackage},
      ${JSON.stringify(payload)}::jsonb, ${duplicateKey}
    )
    RETURNING id::text AS id
  `;
  return rows[0]?.id as string | undefined;
};

export const getCompanyBriefs = async (): Promise<CompanyBriefRecord[]> => {
  await ensureCompanyBriefsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    SELECT
      brief.id::text AS id,
      brief.company_name AS "companyName",
      brief.contact_name AS "contactName",
      brief.email,
      brief.phone,
      COALESCE(brief.website_url, '') AS "websiteUrl",
      brief.business_category AS "businessCategory",
      brief.goals,
      brief.platforms,
      brief.monetization_targets AS "monetizationTargets",
      brief.services,
      brief.talent_needs AS "talentNeeds",
      brief.budget_range AS "budgetRange",
      brief.timeline,
      brief.usage_rights AS "usageRights",
      brief.description,
      brief.recommended_package AS "recommendedPackage",
      brief.status,
      brief.admin_notes AS "adminNotes",
      brief.submitted_at AS "submittedAt",
      COALESCE((
        SELECT COUNT(*)::int
        FROM company_briefs duplicates
        WHERE duplicates.duplicate_key IS NOT NULL AND duplicates.duplicate_key = brief.duplicate_key
      ), 0) AS "duplicateCount"
    FROM company_briefs brief
    ORDER BY brief.submitted_at DESC
  `;
  return rows as unknown as CompanyBriefRecord[];
};

export const updateCompanyBrief = async ({ id, status, adminNotes }: { id: string; status: CompanyBriefStatus; adminNotes: string | null }) => {
  await ensureCompanyBriefsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    UPDATE company_briefs
    SET status = ${status}, admin_notes = ${adminNotes}, updated_at = NOW()
    WHERE id = ${id}::bigint
    RETURNING id::text AS id
  `;
  return rows.length > 0;
};

export const getCompanyBriefMatches = async (): Promise<CompanyBriefMatchRecord[]> => {
  await ensureCompanyBriefMatchesSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    SELECT
      id::text AS id,
      brief_id::text AS "briefId",
      creator_id::text AS "creatorId",
      acceptance_status AS "acceptanceStatus",
      payout_status AS "payoutStatus",
      usage_status AS "usageStatus",
      delivery_status AS "deliveryStatus",
      notes,
      created_at AS "createdAt"
    FROM company_brief_matches
    ORDER BY created_at DESC
  `;
  return rows as unknown as CompanyBriefMatchRecord[];
};

export const createCompanyBriefMatch = async ({ briefId, creatorId }: { briefId: string; creatorId: string }) => {
  await ensureCompanyBriefMatchesSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    INSERT INTO company_brief_matches (brief_id, creator_id)
    VALUES (${briefId}::bigint, ${creatorId}::bigint)
    ON CONFLICT (brief_id, creator_id) DO UPDATE SET updated_at = NOW()
    RETURNING id::text AS id
  `;
  return rows[0]?.id as string | undefined;
};

export const updateCompanyBriefMatch = async ({
  id,
  acceptanceStatus,
  payoutStatus,
  usageStatus,
  deliveryStatus,
  notes
}: Omit<CompanyBriefMatchRecord, 'briefId' | 'creatorId' | 'createdAt'>) => {
  await ensureCompanyBriefMatchesSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    UPDATE company_brief_matches
    SET
      acceptance_status = ${acceptanceStatus},
      payout_status = ${payoutStatus},
      usage_status = ${usageStatus},
      delivery_status = ${deliveryStatus},
      notes = ${notes},
      updated_at = NOW()
    WHERE id = ${id}::bigint
    RETURNING id::text AS id
  `;
  return rows.length > 0;
};

export const updateApplication = async ({
  id,
  status,
  isTop10,
  adminNotes,
  creatorTier
}: {
  id: string;
  status: ApplicationStatus;
  isTop10: boolean;
  adminNotes: string | null;
  creatorTier: string | null;
}) => {
  await ensureApplicationsSchema();
  const sql = await getSqlClient();
  const rows = await sql`
    UPDATE creator_applications
    SET
      status = ${status},
      is_top_10 = ${isTop10},
      admin_notes = ${adminNotes},
      creator_tier = ${creatorTier},
      updated_at = NOW()
    WHERE id = ${id}::bigint
    RETURNING id::text AS id
  `;
  return rows.length > 0;
};
