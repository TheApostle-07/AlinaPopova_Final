import { NextResponse } from 'next/server';
import { lookup } from 'node:dns/promises';
import postgres, { type Sql } from 'postgres';

type ApplicationPayload = Record<string, unknown>;

let sqlClientPromise: Promise<Sql> | null = null;

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
    // Fall back to the original host if local DNS cannot resolve an IPv4 address.
  }

  return postgres(url.toString(), {
    max: 3,
    connect_timeout: 10,
    idle_timeout: 20,
    ssl:
      url.searchParams.get('sslmode') === 'disable'
        ? false
        : {
            servername: originalHost,
            rejectUnauthorized: true
          }
  });
};

const getSqlClient = () => {
  sqlClientPromise ??= createSqlClient();
  return sqlClientPromise;
};

const getString = (payload: ApplicationPayload, key: string) => {
  const value = payload[key];
  return typeof value === 'string' ? value.trim() : '';
};

const ensureApplicationsTable = async () => {
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
};

const requiredFields = [
  'fullName',
  'pronouns',
  'location',
  'languages',
  'experience',
  'comfortZones',
  'availability',
  'preferredTier',
  'contact'
] as const;

const normalizeSubmittedAt = (value: string) => {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? new Date().toISOString() : new Date(timestamp).toISOString();
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ApplicationPayload;
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json({ ok: false, error: 'Invalid application payload.' }, { status: 400 });
    }

    const missingField = requiredFields.find((field) => !getString(payload, field));
    if (missingField) {
      return NextResponse.json({ ok: false, error: `Missing required field: ${missingField}.` }, { status: 400 });
    }

    const submittedAt = normalizeSubmittedAt(getString(payload, 'submittedAt'));
    const sql = await getSqlClient();

    await ensureApplicationsTable();
    const rows = (await sql`
      INSERT INTO creator_applications (
        full_name,
        pronouns,
        location,
        languages,
        experience,
        comfort_zones,
        availability,
        preferred_tier,
        contact,
        submitted_at,
        payload
      )
      VALUES (
        ${getString(payload, 'fullName')},
        ${getString(payload, 'pronouns')},
        ${getString(payload, 'location')},
        ${getString(payload, 'languages')},
        ${getString(payload, 'experience')},
        ${getString(payload, 'comfortZones')},
        ${getString(payload, 'availability')},
        ${getString(payload, 'preferredTier')},
        ${getString(payload, 'contact')},
        ${submittedAt},
        ${JSON.stringify(payload)}::jsonb
      )
      RETURNING id
    `) as Array<{ id: string }>;

    return NextResponse.json({ ok: true, id: rows[0]?.id });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
