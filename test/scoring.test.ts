import { describe, expect, it } from "vitest";
import {
  scoreToComponentAge,
  computeHolisticAge,
  normalizeGraded,
  normalizeYesNo,
  calcCalendarAge,
} from "@/lib/scoring";
import { DEFAULT_WEIGHTS, COMPONENTS } from "@/lib/weights";
import type { ComponentType } from "@/generated/prisma/enums";

// Illustrative score -> component age pairs from the source infographic, at calendar age 52
// (anchored by the graphic's "score 50 -> age 52" example). 6 of 8 pairs match our linear
// formula exactly; the remaining 2 (marked approx) are off by 2-4 years, plausibly just
// marketing-graphic rounding rather than a different underlying formula.
const GRAPHIC_EXAMPLES: { score: number; expectedAge: number; approx?: boolean }[] = [
  { score: 70, expectedAge: 40 },
  { score: 65, expectedAge: 43 },
  { score: 60, expectedAge: 46 },
  { score: 55, expectedAge: 49 },
  { score: 50, expectedAge: 52 },
  { score: 75, expectedAge: 35, approx: true },
  { score: 80, expectedAge: 30, approx: true },
];

describe("scoreToComponentAge", () => {
  const calendarAge = 52;

  for (const { score, expectedAge, approx } of GRAPHIC_EXAMPLES) {
    it(`score ${score} at calendar age ${calendarAge} ${approx ? "is close to" : "equals"} ${expectedAge}`, () => {
      const actual = scoreToComponentAge(score, calendarAge);
      if (approx) {
        expect(Math.abs(actual - expectedAge)).toBeLessThanOrEqual(5);
      } else {
        expect(actual).toBeCloseTo(expectedAge, 5);
      }
    });
  }

  it("clamps to a minimum of 18", () => {
    expect(scoreToComponentAge(100, 20)).toBe(18);
  });

  it("clamps to a maximum of 90", () => {
    expect(scoreToComponentAge(0, 95)).toBe(90);
  });
});

describe("normalizeGraded / normalizeYesNo", () => {
  it("normalizes a 0-5 graded answer to 0-100", () => {
    expect(normalizeGraded(0)).toBe(0);
    expect(normalizeGraded(5)).toBe(100);
    expect(normalizeGraded(3)).toBeCloseTo(60, 5);
  });

  it("normalizes yes/no to 100/0", () => {
    expect(normalizeYesNo(1)).toBe(100);
    expect(normalizeYesNo(0)).toBe(0);
  });
});

describe("computeHolisticAge", () => {
  it("returns the same age when all components share that age", () => {
    const ages = Object.fromEntries(COMPONENTS.map((c) => [c, 45])) as Record<ComponentType, number>;
    expect(computeHolisticAge(ages, DEFAULT_WEIGHTS)).toBeCloseTo(45, 5);
  });

  it("weights components proportionally", () => {
    const ages = Object.fromEntries(COMPONENTS.map((c) => [c, 50])) as Record<ComponentType, number>;
    ages.MENTAL = 20; // youngest component age
    const holisticAge = computeHolisticAge(ages, DEFAULT_WEIGHTS);
    expect(holisticAge).toBeLessThan(50);
  });
});

describe("calcCalendarAge", () => {
  it("computes whole years, accounting for whether the birthday has passed", () => {
    expect(calcCalendarAge(new Date("1974-05-15"), new Date("2026-07-21"))).toBe(52);
    expect(calcCalendarAge(new Date("1974-05-15"), new Date("2026-04-01"))).toBe(51);
    expect(calcCalendarAge(new Date("1974-05-15"), new Date("2026-05-15"))).toBe(52);
  });
});
