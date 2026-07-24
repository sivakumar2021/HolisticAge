import { NextResponse } from "next/server";

// TEMPORARY diagnostic route — reveals only host/port of DATABASE_URL (never
// the credentials), to compare what the running process actually sees
// against what Railway's dashboard displays. Delete once the ECONNREFUSED
// investigation is resolved.
export async function GET() {
  const raw = process.env.DATABASE_URL ?? null;
  let hostPort: string | null = null;
  let parseError: string | null = null;

  if (raw) {
    try {
      const u = new URL(raw);
      hostPort = `${u.hostname}:${u.port || "(default)"}`;
    } catch (e) {
      parseError = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    databaseUrlSet: Boolean(raw),
    databaseUrlLength: raw?.length ?? 0,
    hostPort,
    parseError,
    startsWithPostgres: raw?.startsWith("postgres") ?? false,
    containsDollarBrace: raw?.includes("${{") ?? false,
  });
}
