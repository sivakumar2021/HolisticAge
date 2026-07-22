export const DAYS_BETWEEN_ASSESSMENTS = 30;

export function isDueForReassessment(lastAssessmentAt: Date | null, now: Date = new Date()): boolean {
  if (!lastAssessmentAt) return true;
  const msSinceLast = now.getTime() - lastAssessmentAt.getTime();
  const daysSinceLast = msSinceLast / (1000 * 60 * 60 * 24);
  return daysSinceLast >= DAYS_BETWEEN_ASSESSMENTS;
}

export function daysUntilDue(lastAssessmentAt: Date | null, now: Date = new Date()): number {
  if (!lastAssessmentAt) return 0;
  const daysSinceLast = (now.getTime() - lastAssessmentAt.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(DAYS_BETWEEN_ASSESSMENTS - daysSinceLast));
}
