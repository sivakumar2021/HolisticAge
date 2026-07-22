import { describe, expect, it } from "vitest";
import { isDueForReassessment, daysUntilDue, DAYS_BETWEEN_ASSESSMENTS } from "@/lib/reminders";

describe("isDueForReassessment", () => {
  it("is due when the user has never been assessed", () => {
    expect(isDueForReassessment(null)).toBe(true);
  });

  it("is not due right after an assessment", () => {
    const now = new Date("2026-07-21");
    const lastAssessmentAt = new Date("2026-07-01");
    expect(isDueForReassessment(lastAssessmentAt, now)).toBe(false);
  });

  it("is due once the interval has elapsed", () => {
    const now = new Date("2026-07-21");
    const lastAssessmentAt = new Date(now.getTime() - DAYS_BETWEEN_ASSESSMENTS * 24 * 60 * 60 * 1000);
    expect(isDueForReassessment(lastAssessmentAt, now)).toBe(true);
  });
});

describe("daysUntilDue", () => {
  it("is 0 when never assessed", () => {
    expect(daysUntilDue(null)).toBe(0);
  });

  it("counts down from 30", () => {
    const now = new Date("2026-07-21T00:00:00.000Z");
    const lastAssessmentAt = new Date("2026-07-11T00:00:00.000Z");
    expect(daysUntilDue(lastAssessmentAt, now)).toBe(20);
  });
});
