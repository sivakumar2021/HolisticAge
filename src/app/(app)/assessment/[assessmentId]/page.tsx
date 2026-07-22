import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { COMPONENT_LABELS, COMPONENTS } from "@/lib/weights";
import { getOpportunityComponents } from "@/lib/recommendations";
import { weightedAverageScore, BORDERLINE_SCORE } from "@/lib/scoring";
import { AgeComparison } from "@/components/assessment/AgeComparison";

export default async function AssessmentResultsPage({
  params,
}: {
  params: Promise<{ assessmentId: string }>;
}) {
  const sessionUser = await requireUser();
  const { assessmentId } = await params;

  const assessment = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    include: { componentScores: true },
  });

  if (!assessment || assessment.userId !== sessionUser.id) {
    notFound();
  }

  const scoreByComponent = new Map(assessment.componentScores.map((c) => [c.component, c]));
  const opportunities = getOpportunityComponents(
    assessment.componentScores.map((c) => ({ component: c.component, score: c.score })),
  );
  const avgScore = weightedAverageScore(
    assessment.componentScores.map((c) => ({ score: c.score, weight: c.weightUsed })),
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold text-stone-900">Your results</h1>

      <AgeComparison
        holisticAge={assessment.holisticAge}
        calendarAge={assessment.calendarAgeAtAssessment}
        avgScore={avgScore}
      />

      <Card className="mb-8">
        <h2 className="mb-4 font-semibold text-stone-900">Component breakdown</h2>
        <div className="flex flex-col gap-3">
          {COMPONENTS.map((component) => {
            const cs = scoreByComponent.get(component);
            if (!cs) return null;
            return (
              <div key={component} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-sm text-stone-600">
                  {COMPONENT_LABELS[component]}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
                  <div
                    className="h-full rounded-full bg-emerald-700"
                    style={{ width: `${cs.score}%` }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right text-sm font-medium text-stone-700">
                  age {Math.round(cs.componentAge)}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="mb-8">
        <h2 className="mb-1 font-semibold text-stone-900">Where to focus next</h2>
        <p className="mb-4 text-sm text-stone-500">
          Components scoring below the {BORDERLINE_SCORE}/100 break-even line, worst first — up
          to 5 shown.
        </p>
        {opportunities.length === 0 ? (
          <p className="text-sm text-emerald-800">
            Nothing below break-even — every component is at or above the line that keeps your
            Holistic Age at or under your Calendar Age. Keep it up.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {opportunities.map((r) => (
              <div key={r.component}>
                <p className="mb-1 text-sm font-medium text-emerald-900">
                  {COMPONENT_LABELS[r.component]}{" "}
                  <span className="font-normal text-stone-400">— score {Math.round(r.score)}/100</span>
                </p>
                <ul className="list-inside list-disc text-sm text-stone-600">
                  {r.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="flex gap-3">
        <Link href="/history">
          <Button variant="outline">View trend</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost">Back to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
