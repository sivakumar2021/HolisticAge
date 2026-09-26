import { ComponentType } from "@/generated/prisma/enums";

export const COMPONENTS: ComponentType[] = [
  ComponentType.MENTAL,
  ComponentType.PHYSICAL,
  ComponentType.FINANCIAL,
  ComponentType.CAREER,
  ComponentType.RELATIONSHIPS,
  ComponentType.SOCIAL,
  ComponentType.HABITS,
  ComponentType.LEARNING,
  ComponentType.PURPOSE,
];

export const COMPONENT_LABELS: Record<ComponentType, string> = {
  MENTAL: "Mental",
  PHYSICAL: "Physical",
  FINANCIAL: "Financial",
  CAREER: "Career",
  RELATIONSHIPS: "Relationships",
  SOCIAL: "Social",
  HABITS: "Habits",
  LEARNING: "Learning",
  PURPOSE: "Purpose",
};

// All nine components are weighted equally by default (100 / 9 each), so no
// single component dominates a user's Holistic Age until they customize
// weights in Settings.
const EQUAL_WEIGHT = 100 / COMPONENTS.length;

export const DEFAULT_WEIGHTS: Record<ComponentType, number> = {
  MENTAL: EQUAL_WEIGHT,
  PHYSICAL: EQUAL_WEIGHT,
  FINANCIAL: EQUAL_WEIGHT,
  CAREER: EQUAL_WEIGHT,
  RELATIONSHIPS: EQUAL_WEIGHT,
  SOCIAL: EQUAL_WEIGHT,
  HABITS: EQUAL_WEIGHT,
  LEARNING: EQUAL_WEIGHT,
  PURPOSE: EQUAL_WEIGHT,
};

const WEIGHT_SUM_TOLERANCE = 0.01;

export function sumWeights(weights: Record<ComponentType, number>): number {
  return COMPONENTS.reduce((sum, c) => sum + (weights[c] ?? 0), 0);
}

export function validateWeights(weights: Record<ComponentType, number>): {
  valid: boolean;
  sum: number;
  error?: string;
} {
  const sum = sumWeights(weights);
  for (const c of COMPONENTS) {
    if (weights[c] == null || weights[c] < 0) {
      return { valid: false, sum, error: `Missing or negative weight for ${c}` };
    }
  }
  if (Math.abs(sum - 100) > WEIGHT_SUM_TOLERANCE) {
    return { valid: false, sum, error: `Weights must sum to 100 (got ${sum.toFixed(2)})` };
  }
  return { valid: true, sum };
}

export const MIN_RATING = 1;
export const MAX_RATING = 10;

/**
 * Converts a per-component 1-10 importance rating into percentage weights
 * that always sum to exactly 100 — each component's share is just its rating
 * divided by the total of all ratings. This lets the editor use a simple,
 * independent rating scale per component instead of requiring the user to
 * manually keep 9 percentages balanced.
 */
export function ratingsToWeights(
  ratings: Record<ComponentType, number>,
): Record<ComponentType, number> {
  const total = COMPONENTS.reduce((sum, c) => sum + ratings[c], 0);
  const weights = {} as Record<ComponentType, number>;
  for (const c of COMPONENTS) {
    weights[c] = total > 0 ? (ratings[c] / total) * 100 : 100 / COMPONENTS.length;
  }
  return weights;
}

/**
 * Derives a starting 1-10 rating per component from existing percentage
 * weights (e.g. a user's previously saved weights), via min-max scaling —
 * the largest weight becomes 10, the smallest becomes 1, preserving relative
 * order. Used only to seed the rating sliders; not an exact inverse of
 * ratingsToWeights.
 */
export function weightsToRatings(
  weights: Record<ComponentType, number>,
): Record<ComponentType, number> {
  const values = COMPONENTS.map((c) => weights[c]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const ratings = {} as Record<ComponentType, number>;
  for (const c of COMPONENTS) {
    if (max === min) {
      ratings[c] = Math.round((MIN_RATING + MAX_RATING) / 2);
    } else {
      const t = (weights[c] - min) / (max - min);
      ratings[c] = Math.round(MIN_RATING + t * (MAX_RATING - MIN_RATING));
    }
  }
  return ratings;
}

/** Merges a user's saved ComponentWeight rows over the defaults; any component without a row falls back to its default. */
export function getEffectiveWeights(
  overrides: { component: ComponentType; weight: number }[],
): Record<ComponentType, number> {
  const weights = { ...DEFAULT_WEIGHTS };
  for (const o of overrides) {
    weights[o.component] = o.weight;
  }
  return weights;
}
