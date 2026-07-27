import { describe, expect, it } from "vitest";
import {
  DEFAULT_WEIGHTS,
  COMPONENTS,
  sumWeights,
  validateWeights,
  getEffectiveWeights,
  redistributeWeight,
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

describe("redistributeWeight", () => {
  it("always sums to 100 after a change", () => {
    const result = redistributeWeight(DEFAULT_WEIGHTS, "PURPOSE", 40);
    expect(sumWeights(result)).toBeCloseTo(100, 5);
  });

  it("sets the target component exactly, clamped to [0, 100]", () => {
    expect(redistributeWeight(DEFAULT_WEIGHTS, "PURPOSE", 40).PURPOSE).toBe(40);
    expect(redistributeWeight(DEFAULT_WEIGHTS, "PURPOSE", 150).PURPOSE).toBe(100);
    expect(redistributeWeight(DEFAULT_WEIGHTS, "PURPOSE", -20).PURPOSE).toBe(0);
  });

  it("shrinks the other components in proportion to their prior shares", () => {
    const result = redistributeWeight(DEFAULT_WEIGHTS, "PURPOSE", 40);
    // Mental and Physical were equal (18/18) before; they should stay equal after.
    expect(result.MENTAL).toBeCloseTo(result.PHYSICAL, 5);
    // Every other component should have shrunk relative to its default.
    for (const c of COMPONENTS.filter((c) => c !== "PURPOSE")) {
      expect(result[c]).toBeLessThan(DEFAULT_WEIGHTS[c]);
    }
  });

  it("splits the remaining budget evenly when every other component is 0", () => {
    const allZero = Object.fromEntries(COMPONENTS.map((c) => [c, 0])) as typeof DEFAULT_WEIGHTS;
    const result = redistributeWeight(allZero, "MENTAL", 10);
    expect(result.MENTAL).toBe(10);
    const others = COMPONENTS.filter((c) => c !== "MENTAL");
    for (const c of others) {
      expect(result[c]).toBeCloseTo(90 / others.length, 5);
    }
  });

  it("pushing one component to 100 zeroes out the rest", () => {
    const result = redistributeWeight(DEFAULT_WEIGHTS, "MENTAL", 100);
    for (const c of COMPONENTS.filter((c) => c !== "MENTAL")) {
      expect(result[c]).toBe(0);
    }
  });
});
