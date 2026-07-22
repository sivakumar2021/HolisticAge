import { ComponentType } from "@/generated/prisma/enums";
import { BORDERLINE_SCORE } from "@/lib/scoring";

// Static v1 tip bank, keyed by component. Shown for a user's lowest-scoring components after an assessment.
export const RECOMMENDATIONS: Record<ComponentType, string[]> = {
  MENTAL: [
    "Spend 10-15 minutes a day on a focused mental challenge — a puzzle, a language app, or reading something outside your usual topics.",
    "Try a short daily mindfulness or breathing practice to sharpen focus and reduce mental clutter.",
  ],
  PHYSICAL: [
    "Add two short walks to your day — even 10 minutes each measurably improves energy and stamina over a few weeks.",
    "Aim for at least 2-3 sessions of moderate exercise this week; consistency matters more than intensity.",
  ],
  FINANCIAL: [
    "Build a bare-bones budget for one month to see exactly where money goes — awareness alone reduces financial stress.",
    "Start or top up an emergency fund, even by a small fixed amount each payday.",
  ],
  CAREER: [
    "Identify one skill that would meaningfully grow your career and block 30 minutes a week to build it.",
    "Ask for feedback from a manager or peer on where your work could have more impact.",
  ],
  RELATIONSHIPS: [
    "Reach out to one person you trust this week just to check in — connection compounds with small, regular effort.",
    "Have one deeper conversation this month with someone close to you, beyond logistics and small talk.",
  ],
  SOCIAL: [
    "Join or revisit one community, group, or recurring activity where you see the same people regularly.",
    "Say yes to one social invitation this week you'd normally decline.",
  ],
  HABITS: [
    "Pick one habit — sleep, meals, or movement — and make it consistent for two weeks before adding another.",
    "Set a fixed wind-down time to protect 7+ hours of sleep most nights.",
  ],
  LEARNING: [
    "Start a small learning project — a course, a book, or a new skill — with a fixed 20 minutes a few times a week.",
    "Follow your curiosity: pick one topic you know nothing about and spend an hour exploring it this month.",
  ],
  PURPOSE: [
    "Write down one value or goal that matters most to you right now, and one small action this week that serves it.",
    "Volunteer, mentor, or contribute to something bigger than your day-to-day tasks, even in a small way.",
  ],
};

const MAX_OPPORTUNITIES = 5;

/**
 * Components worth acting on: those scoring below BORDERLINE_SCORE (the
 * point at which a component stops dragging Holistic Age above Calendar
 * Age), worst first, capped at MAX_OPPORTUNITIES. Returns fewer than the cap
 * — or none — when fewer components are actually below the line.
 */
export function getOpportunityComponents(
  componentScores: { component: ComponentType; score: number }[],
): { component: ComponentType; score: number; tips: string[] }[] {
  return [...componentScores]
    .filter((c) => c.score < BORDERLINE_SCORE)
    .sort((a, b) => a.score - b.score)
    .slice(0, MAX_OPPORTUNITIES)
    .map((c) => ({
      component: c.component,
      score: c.score,
      tips: RECOMMENDATIONS[c.component],
    }));
}
