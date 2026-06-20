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

let sqlClientPromise: Promise<Sql> | null = null;
let schemaPromise: Promise<void> | null = null;

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
