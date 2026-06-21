import { lookup } from 'node:dns/promises';
import postgres, { type Sql } from 'postgres';

export type ApplicationStatus = 'new' | 'shortlisted' | 'call_scheduled' | 'selected' | 'training' | 'roster_ready' | 'rejected';

export interface ApplicationRecord {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  languages: string;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  cameraComfort: string;
  categories: string[];
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

export type CampaignStatus = 'new_brief' | 'discovery' | 'scoped' | 'active' | 'complete' | 'declined';

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
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS instagram_url TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS youtube_url TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS camera_comfort TEXT`;
    await sql`ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS categories JSONB NOT NULL DEFAULT '[]'::jsonb`;
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
      a.languages,
      a.instagram_url AS "instagramUrl",
      a.youtube_url AS "youtubeUrl",
      COALESCE(a.camera_comfort, '') AS "cameraComfort",
      COALESCE(a.categories, '[]'::jsonb) AS categories,
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
