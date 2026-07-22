import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { assessmentSubmitSchema } from "@/lib/validation/schemas";
import { COMPONENTS, getEffectiveWeights } from "@/lib/weights";
import {
  calcCalendarAge,
  computeHolisticAge,
  normalizeGraded,
  normalizeYesNo,
  scoreToComponentAge,
} from "@/lib/scoring";
import type { ComponentType } from "@/generated/prisma/enums";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.status === "SUSPENDED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = assessmentSubmitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } });
  if (!user.birthDate) {
    return NextResponse.json(
      { error: "Set your birth date in Settings before running an assessment." },
      { status: 400 },
    );
  }

  const questionIds = parsed.data.answers.map((a) => a.questionId);
  const questions = await prisma.question.findMany({ where: { id: { in: questionIds }, isActive: true } });
  const questionById = new Map(questions.map((q) => [q.id, q]));

  const missing = questionIds.filter((id) => !questionById.has(id));
  if (missing.length > 0) {
    return NextResponse.json({ error: `Unknown or inactive question ids: ${missing.join(", ")}` }, { status: 400 });
  }

  const weightRows = await prisma.componentWeight.findMany({ where: { userId: user.id } });
  const weights = getEffectiveWeights(weightRows);

  const now = new Date();
  const calendarAge = calcCalendarAge(user.birthDate, now);

  const normalizedByComponent = new Map<ComponentType, number[]>();
  const answerRows = parsed.data.answers.map((a) => {
    const question = questionById.get(a.questionId)!;
    const normalizedScore =
      question.type === "GRADED" ? normalizeGraded(a.rawValue) : normalizeYesNo(a.rawValue as 0 | 1);
    const list = normalizedByComponent.get(question.component) ?? [];
    list.push(normalizedScore);
    normalizedByComponent.set(question.component, list);
    return { questionId: a.questionId, rawValue: a.rawValue, normalizedScore };
  });

  const componentScores = COMPONENTS.map((component) => {
    const scores = normalizedByComponent.get(component) ?? [];
    const score = scores.length > 0 ? scores.reduce((s, v) => s + v, 0) / scores.length : 50;
    const componentAge = scoreToComponentAge(score, calendarAge);
    return { component, score, componentAge, weightUsed: weights[component] };
  });

  const componentAgeByType = Object.fromEntries(
    componentScores.map((c) => [c.component, c.componentAge]),
  ) as Record<ComponentType, number>;
  const holisticAge = computeHolisticAge(componentAgeByType, weights);

  const assessment = await prisma.assessment.create({
    data: {
      userId: user.id,
      calendarAgeAtAssessment: calendarAge,
      holisticAge,
      createdAt: now,
      componentScores: { create: componentScores },
      answers: { create: answerRows },
    },
  });

  await prisma.user.update({ where: { id: user.id }, data: { lastAssessmentAt: now } });

  return NextResponse.json({ id: assessment.id }, { status: 201 });
}
