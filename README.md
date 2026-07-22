# Holistic Age

A single number — Holistic Age — computed from a weighted average of 9 life components (Mental, Physical, Financial, Career, Relationships, Social, Habits, Learning, Purpose), each scored via a short assessment. See [`/`](http://localhost:3000) for the full pitch, or the plan doc this was built from for the underlying design decisions.

Stack: Next.js 16 (App Router) + TypeScript + PostgreSQL + Prisma 7 + Auth.js v5 + Tailwind CSS 4 + Recharts.

**Scope**: this is the web app only. Mobile apps and production hosting/domain setup are separate, later efforts.

## Getting started

```bash
npm install
./scripts/db-start.sh          # starts a local Postgres cluster (own data dir, port 5433)
npx prisma migrate dev         # applies the schema
npx prisma db seed             # creates admin + demo users, questions, sample history
npm run dev                    # http://localhost:3000
```

Seeded accounts (password shown is the login password):
- `admin@holisticage.app` / `adminpass123` — role ADMIN
- `demo@holisticage.app` / `demopass123` — role USER, has 3 historical assessments for the `/history` chart

Stop Postgres when done: `./scripts/db-stop.sh`.

## Environment

Copy `.env.example` to `.env` and fill in as needed. Nothing external is required for local dev:

- **Email**: defaults to `EMAIL_PROVIDER=console`, which logs activation/reminder emails to the server console instead of sending them. Set `EMAIL_PROVIDER=resend` + `RESEND_API_KEY` to send real email later.
- **OAuth (Google/Apple/Facebook)**: buttons on `/login` and `/signup` only render for providers with credentials set in `.env`. The app is fully usable via email/password with zero OAuth keys configured.
- **Cron**: `GET /api/cron/reminders` (bearer-token gated via `CRON_SECRET`) sends monthly reassessment reminders to users who are due. No scheduler is wired up yet — trigger it manually with `npx tsx scripts/trigger-reminders.ts`, or point an external cron (Vercel Cron, GitHub Actions, cron-job.org) at it once deployed.

## Testing

```bash
npm test    # Vitest — scoring formula, weight validation, reminder cadence
npm run build   # production build + typecheck
```

## Notes on the scoring formula

The source design brief only specified "weighted average of component ages," not how a 0–100 score maps to an age. We use:

```
componentAge = calendarAge - ((score - 50) / 50) * 30      // clamped to [18, 90]
```

Score 50 = average = component age equals calendar age; 100/0 swing ±30 years at the extremes. See `src/lib/scoring.ts` and `test/scoring.test.ts` for the reasoning and validation against the original design examples.
