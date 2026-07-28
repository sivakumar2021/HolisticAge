import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { COMPONENT_LABELS } from "@/lib/weights";
import { getOpportunityComponents } from "@/lib/recommendations";
import { weightedAverageScore } from "@/lib/scoring";
import { AgeComparison } from "@/components/assessment/AgeComparison";

export default async function DashboardPage() {
  const sessionUser = await requireUser();

  const [user, latestAssessment] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: sessionUser.id }, select: { birthDate: true } }),
    prisma.assessment.findFirst({
      where: { userId: sessionUser.id },
      orderBy: { createdAt: "desc" },
      include: { componentScores: true },
    }),
  ]);

  if (!latestAssessment) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Card className="text-center">
          <h1 className="mb-2 text-2xl font-semibold text-stone-900">Welcome to Holistic Age</h1>
          {user.birthDate ? (
            <>
              <p className="mb-6 text-stone-500">
                Run your first assessment to find out your Holistic Age.
              </p>
              <Link href="/assessment">
                <Button>Start your first assessment</Button>
              </Link>
            </>
          ) : (
            <>
              <p className="mb-6 text-stone-500">
                Holistic Age is computed relative to your calendar age, so set your birth date
                before running your first assessment.
              </p>
              <Link href="/settings">
                <Button>Set your birth date</Button>
              </Link>
            </>
          )}
        </Card>
      </div>
    );
  }

  const opportunities = getOpportunityComponents(
    latestAssessment.componentScores.map((c) => ({ component: c.component, score: c.score })),
  );
  const avgScore = weightedAverageScore(
    latestAssessment.componentScores.map((c) => ({ score: c.score, weight: c.weightUsed })),
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold text-stone-900">Your Dashboard</h1>

      <AgeComparison
        holisticAge={latestAssessment.holisticAge}
        calendarAge={latestAssessment.calendarAgeAtAssessment}
        avgScore={avgScore}
        asOf={latestAssessment.createdAt.toISOString().slice(0, 10)}
      />

      {!user.birthDate && (
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <p className="text-sm text-amber-900">
            Set your birth date in{" "}
            <Link href="/settings" className="font-medium underline">
              Settings
            </Link>{" "}
            to keep your calendar age accurate.
          </p>
        </Card>
      )}

      {opportunities.length > 0 && (
        <Card className="mb-6">
          <p className="mb-3 text-sm font-medium text-stone-500">
            Opportunities — components below the break-even line
          </p>
          <div className="flex flex-col gap-3">
            {opportunities.map((o) => (
              <div key={o.component}>
                <p className="text-sm font-medium text-emerald-900">
                  {COMPONENT_LABELS[o.component]}{" "}
                  <span className="font-normal text-stone-400">— score {Math.round(o.score)}/100</span>
                </p>
                <p className="text-sm text-stone-600">{o.tips[0]}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        <Link href="/assessment">
          <Button>Run a new assessment</Button>
        </Link>
        <Link href="/history">
          <Button variant="outline">View trend</Button>
        </Link>
      </div>
    </div>
  );
}
