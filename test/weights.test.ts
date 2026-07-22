import { describe, expect, it } from "vitest";
import { DEFAULT_WEIGHTS, COMPONENTS, sumWeights, validateWeights, getEffectiveWeights } from "@/lib/weights";

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
