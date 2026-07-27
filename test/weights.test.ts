import { describe, expect, it } from "vitest";
import {
  DEFAULT_WEIGHTS,
  COMPONENTS,
  MIN_RATING,
  MAX_RATING,
  sumWeights,
  validateWeights,
  getEffectiveWeights,
  ratingsToWeights,
  weightsToRatings,
} from "@/lib/weights";

describe("DEFAULT_WEIGHTS", () => {
  it("sums to 100", () => {
    expect(sumWeights(DEFAULT_WEIGHTS)).toBeCloseTo(100, 5);
  });

  it("has an entry for every component, including Purpose", () => {
    expect(COMPONENTS).toContain("PURPOSE");
    for (const c of COMPONENTS) {
      expect(DEFAULT_WEIGHTS[c]).toBeGreaterThan(0);
    }
  });
});

describe("validateWeights", () => {
  it("accepts weights summing to 100", () => {
    expect(validateWeights(DEFAULT_WEIGHTS).valid).toBe(true);
  });

  it("rejects weights that don't sum to 100", () => {
    const bad = { ...DEFAULT_WEIGHTS, MENTAL: DEFAULT_WEIGHTS.MENTAL + 10 };
    const result = validateWeights(bad);
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/sum to 100/);
  });

  it("rejects negative weights", () => {
    const bad = { ...DEFAULT_WEIGHTS, PHYSICAL: -5 };
    expect(validateWeights(bad).valid).toBe(false);
  });
});

describe("getEffectiveWeights", () => {
  it("falls back to defaults when there are no overrides", () => {
    expect(getEffectiveWeights([])).toEqual(DEFAULT_WEIGHTS);
  });

  it("applies overrides on top of defaults", () => {
    const result = getEffectiveWeights([{ component: "PURPOSE", weight: 20 }]);
    expect(result.PURPOSE).toBe(20);
    expect(result.MENTAL).toBe(DEFAULT_WEIGHTS.MENTAL);
  });
});

describe("ratingsToWeights", () => {
  it("always sums to 100", () => {
    const ratings = Object.fromEntries(
      COMPONENTS.map((c, i) => [c, 1 + (i % MAX_RATING)]),
    ) as Record<(typeof COMPONENTS)[number], number>;
    expect(sumWeights(ratingsToWeights(ratings))).toBeCloseTo(100, 5);
  });

  it("splits evenly when every rating is equal", () => {
    const equal = Object.fromEntries(COMPONENTS.map((c) => [c, 5])) as Record<
      (typeof COMPONENTS)[number],
      number
    >;
    const result = ratingsToWeights(equal);
    for (const c of COMPONENTS) {
      expect(result[c]).toBeCloseTo(100 / COMPONENTS.length, 5);
    }
  });

  it("gives a component twice the rating twice the percentage", () => {
    const ratings = Object.fromEntries(COMPONENTS.map((c) => [c, 5])) as Record<
      (typeof COMPONENTS)[number],
      number
    >;
    ratings.PURPOSE = 10;
    const result = ratingsToWeights(ratings);
    expect(result.PURPOSE).toBeCloseTo(result.MENTAL * 2, 5);
  });
});

describe("weightsToRatings", () => {
  it("maps the largest weight to MAX_RATING and the smallest to MIN_RATING", () => {
    const ratings = weightsToRatings(DEFAULT_WEIGHTS);
    expect(ratings.MENTAL).toBe(MAX_RATING);
    expect(ratings.PHYSICAL).toBe(MAX_RATING);
    expect(ratings.CAREER).toBe(MIN_RATING);
  });

  it("round-trips back through ratingsToWeights to something that still sums to 100", () => {
    const ratings = weightsToRatings(DEFAULT_WEIGHTS);
    expect(sumWeights(ratingsToWeights(ratings))).toBeCloseTo(100, 5);
  });

  it("gives every component the same midpoint rating when weights are all equal", () => {
    const equal = Object.fromEntries(COMPONENTS.map((c) => [c, 100 / COMPONENTS.length])) as Record<
      (typeof COMPONENTS)[number],
      number
    >;
    const ratings = weightsToRatings(equal);
    for (const c of COMPONENTS) {
      expect(ratings[c]).toBe(Math.round((MIN_RATING + MAX_RATING) / 2));
    }
  });
});
