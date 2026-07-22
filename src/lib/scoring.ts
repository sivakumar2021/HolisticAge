import { ComponentType } from "@/generated/prisma/enums";
import { COMPONENTS } from "@/lib/weights";

const MIN_AGE = 18;
const MAX_AGE = 90;

/** Max years a component age can swing from calendar age at score 0 or 100. Uniform by default; safe to tune per component later. */
export const DEFAULT_SPREAD_YEARS: Record<ComponentType, number> = {
  MENTAL: 30,
  PHYSICAL: 30,
  FINANCIAL: 30,
  CAREER: 30,
  RELATIONSHIPS: 30,
  SOCIAL: 30,
  HABITS: 30,
  LEARNING: 30,
  PURPOSE: 30,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * score 50 (average) => componentAge == calendarAge
 * score 100 (best)    => calendarAge - spread, clamped
 * score 0 (worst)     => calendarAge + spread, clamped
 */
export function scoreToComponentAge(
  score: number,
  calendarAge: number,
  spread: number = 30,
): number {
  const raw = calendarAge - ((score - 50) / 50) * spread;
  return clamp(raw, MIN_AGE, MAX_AGE);
}

export function computeHolisticAge(
  componentAges: Record<ComponentType, number>,
  weights: Record<ComponentType, number>,
): number {
  const weightedSum = COMPONENTS.reduce(
    (sum, c) => sum + componentAges[c] * (weights[c] / 100),
    0,
  );
  return weightedSum;
}

export function normalizeGraded(raw: number, max: number = 5): number {
  return clamp((raw / max) * 100, 0, 100);
}

export function normalizeYesNo(raw: 0 | 1): number {
  return raw === 1 ? 100 : 0;
}

// Score at which componentAge == calendarAge in scoreToComponentAge. Since
// DEFAULT_SPREAD_YEARS is uniform across every component, this same value
// (50) is also the break-even point for the *weighted average* score: it's
// the average score at which Holistic Age == Calendar Age (see
// weightedAverageScore below). Below it, Holistic Age runs ahead of
// Calendar Age — the "danger zone."
export const BORDERLINE_SCORE = 50;

/** Weighted average of component scores, using each component's actual weight (e.g. the weightUsed snapshot on a stored assessment). Compare against BORDERLINE_SCORE to see how far above/below break-even a person is. */
export function weightedAverageScore(
  componentScores: { score: number; weight: number }[],
): number {
  const totalWeight = componentScores.reduce((sum, c) => sum + c.weight, 0);
  if (totalWeight === 0) return BORDERLINE_SCORE;
  return componentScores.reduce((sum, c) => sum + c.score * c.weight, 0) / totalWeight;
}

export function calcCalendarAge(birthDate: Date, atDate: Date): number {
  let age = atDate.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    atDate.getMonth() > birthDate.getMonth() ||
    (atDate.getMonth() === birthDate.getMonth() && atDate.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}
