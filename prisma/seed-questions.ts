import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { QUESTION_BANK } from "./questions";

/**
 * Seeds only the question bank — no user accounts. Safe to run against
 * production, unlike the full dev seed (prisma/seed.ts) which creates an
 * admin account with a password hardcoded in this repo.
 */
export async function seedQuestions(prisma: PrismaClient): Promise<number> {
  for (const q of QUESTION_BANK) {
    const existing = await prisma.question.findFirst({
      where: { component: q.component, type: q.type, order: q.order },
      select: { id: true },
    });
    if (existing) {
      await prisma.question.update({
        where: { id: existing.id },
        data: { text: q.text, isActive: true },
      });
    } else {
      await prisma.question.create({
        data: { component: q.component, type: q.type, text: q.text, order: q.order },
      });
    }
  }
  return QUESTION_BANK.length;
}

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });
  const count = await seedQuestions(prisma);
  console.log(`Seeded ${count} questions`);
  await prisma.$disconnect();
}

// Only run standalone when invoked directly (not when imported by prisma/seed.ts)
if (process.argv[1]?.endsWith("seed-questions.ts")) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
