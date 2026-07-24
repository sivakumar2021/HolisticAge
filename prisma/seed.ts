import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ComponentType } from "../src/generated/prisma/enums";
import { seedQuestions } from "./seed-questions";
import { DEFAULT_WEIGHTS, COMPONENTS } from "../src/lib/weights";
import { scoreToComponentAge, computeHolisticAge, normalizeGraded, normalizeYesNo, calcCalendarAge } from "../src/lib/scoring";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// [graded 0-5, yesNo 0|1] per component, oldest -> most recent, showing an improving trend.
const DEMO_ANSWERS: Record<ComponentType, [number, 0 | 1][]> = {
  MENTAL: [[2, 0], [3, 1], [3, 1]],
  PHYSICAL: [[2, 0], [2, 0], [3, 1]],
  FINANCIAL: [[3, 1], [3, 1], [3, 1]],
  CAREER: [[3, 0], [3, 1], [4, 1]],
  RELATIONSHIPS: [[3, 1], [4, 1], [4, 1]],
  SOCIAL: [[2, 0], [3, 0], [3, 1]],
  HABITS: [[2, 0], [3, 1], [3, 1]],
  LEARNING: [[3, 1], [3, 1], [4, 1]],
  PURPOSE: [[2, 0], [3, 0], [4, 1]],
};

const DAYS_AGO = [100, 70, 40];

async function main() {
  const adminPasswordHash = await bcrypt.hash("adminpass123", 12);
  const demoPasswordHash = await bcrypt.hash("demopass123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@holisticage.app" },
    update: {},
    create: {
      email: "admin@holisticage.app",
      name: "Admin",
      role: "ADMIN",
      status: "ACTIVE",
      emailVerified: new Date(),
      passwordHash: adminPasswordHash,
    },
  });

  const demoBirthDate = new Date("1974-05-15T00:00:00.000Z");
  const demo = await prisma.user.upsert({
    where: { email: "demo@holisticage.app" },
    update: {},
    create: {
      email: "demo@holisticage.app",
      name: "Demo User",
      role: "USER",
      status: "ACTIVE",
      emailVerified: new Date(),
      passwordHash: demoPasswordHash,
      birthDate: demoBirthDate,
    },
  });

  console.log(`Seeded users: admin=${admin.email}, demo=${demo.email}`);

  const questionCount = await seedQuestions(prisma);
  const questions = await prisma.question.findMany();
  const questionByComponentType: Record<string, { id: string }> = {};
  for (const q of questions) {
    questionByComponentType[`${q.component}:${q.type}`] = q;
  }

  console.log(`Seeded ${questionCount} questions`);

  const existingAssessmentCount = await prisma.assessment.count({ where: { userId: demo.id } });
  if (existingAssessmentCount > 0) {
    console.log(`Demo user already has ${existingAssessmentCount} assessments, skipping seed data`);
    return;
  }

  let lastAssessmentAt: Date | null = null;

  for (let i = 0; i < DAYS_AGO.length; i++) {
    const createdAt = new Date(Date.now() - DAYS_AGO[i] * 24 * 60 * 60 * 1000);
    const calendarAge = calcCalendarAge(demoBirthDate, createdAt);

    const componentScores: { component: ComponentType; score: number; componentAge: number; weightUsed: number }[] = [];
    const answerRows: { questionId: string; rawValue: number; normalizedScore: number }[] = [];

    for (const component of COMPONENTS) {
      const [graded, yesNo] = DEMO_ANSWERS[component][i];
      const gradedQ = questionByComponentType[`${component}:GRADED`];
      const yesNoQ = questionByComponentType[`${component}:YES_NO`];

      const gradedNorm = normalizeGraded(graded);
      const yesNoNorm = normalizeYesNo(yesNo);
      answerRows.push({ questionId: gradedQ.id, rawValue: graded, normalizedScore: gradedNorm });
      answerRows.push({ questionId: yesNoQ.id, rawValue: yesNo, normalizedScore: yesNoNorm });

      const componentScore = (gradedNorm + yesNoNorm) / 2;
      const componentAge = scoreToComponentAge(componentScore, calendarAge);
      componentScores.push({
        component,
        score: componentScore,
        componentAge,
        weightUsed: DEFAULT_WEIGHTS[component],
      });
    }

    const componentAgeByType = Object.fromEntries(
      componentScores.map((c) => [c.component, c.componentAge]),
    ) as Record<ComponentType, number>;
    const holisticAge = computeHolisticAge(componentAgeByType, DEFAULT_WEIGHTS);

    await prisma.assessment.create({
      data: {
        userId: demo.id,
        calendarAgeAtAssessment: calendarAge,
        holisticAge,
        createdAt,
        componentScores: { create: componentScores },
        answers: { create: answerRows },
      },
    });

    lastAssessmentAt = createdAt;
  }

  await prisma.user.update({
    where: { id: demo.id },
    data: { lastAssessmentAt },
  });

  console.log(`Seeded ${DAYS_AGO.length} historical assessments for demo user`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
