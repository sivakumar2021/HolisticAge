"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "./QuestionCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { COMPONENTS, COMPONENT_LABELS } from "@/lib/weights";
import type { ComponentType } from "@/generated/prisma/enums";

interface QuestionDTO {
  id: string;
  component: ComponentType;
  type: "GRADED" | "YES_NO";
  text: string;
  order: number;
}

export function AssessmentFlow({ questions }: { questions: QuestionDTO[] }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [tabIndex, setTabIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const grouped = useMemo(
    () =>
      COMPONENTS.map((component) => ({
        component,
        questions: questions
          .filter((q) => q.component === component)
          .sort((a, b) => a.order - b.order),
      })).filter((g) => g.questions.length > 0),
    [questions],
  );

  const FINISH_INDEX = grouped.length;
  const isFinishTab = tabIndex === FINISH_INDEX;
  const currentGroup = !isFinishTab ? grouped[tabIndex] : null;

  const totalAnswered = Object.keys(answers).length;
  const allAnswered = totalAnswered === questions.length;
  const incompleteGroups = grouped.filter(
    (g) => !g.questions.every((q) => answers[q.id] !== undefined),
  );

  function goTo(index: number) {
    setTabIndex(Math.min(FINISH_INDEX, Math.max(0, index)));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: Object.entries(answers).map(([questionId, rawValue]) => ({ questionId, rawValue })),
      }),
    });

    setSubmitting(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error?.toString?.() ?? "Something went wrong submitting your assessment.");
      return;
    }
    const body = await res.json();
    router.push(`/assessment/${body.id}`);
  }

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-6 mb-6 border-b border-stone-200 bg-stone-50/95 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between text-sm text-stone-500">
          <span>
            {totalAnswered} / {questions.length} answered
          </span>
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full bg-emerald-700 transition-all"
              style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mb-6 max-w-3xl overflow-x-auto">
        <div className="flex gap-1 border-b border-stone-200">
          {grouped.map((g, i) => {
            const groupAnswered = g.questions.every((q) => answers[q.id] !== undefined);
            const isCurrent = i === tabIndex;
            return (
              <button
                key={g.component}
                type="button"
                onClick={() => goTo(i)}
                className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                  isCurrent
                    ? "border-emerald-800 text-emerald-900"
                    : groupAnswered
                      ? "border-transparent text-emerald-700 hover:border-emerald-200"
                      : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                {COMPONENT_LABELS[g.component]}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => goTo(FINISH_INDEX)}
            className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              isFinishTab
                ? "border-emerald-800 text-emerald-900"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Finish
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        {currentGroup && (
          <Card>
            <p className="mb-1 text-xs font-medium text-stone-400">
              Dimension {tabIndex + 1} of {grouped.length}
            </p>
            <h2 className="mb-1 font-semibold text-emerald-900">
              {COMPONENT_LABELS[currentGroup.component]}
            </h2>
            {currentGroup.questions.map((q) => (
              <QuestionCard
                key={q.id}
                text={q.text}
                type={q.type}
                value={answers[q.id]}
                onChange={(value) => setAnswers((prev) => ({ ...prev, [q.id]: value }))}
              />
            ))}
          </Card>
        )}

        {isFinishTab && (
          <Card>
            <h2 className="mb-2 font-semibold text-emerald-900">Ready to finish?</h2>
            <p className="mb-4 text-sm text-stone-500">
              {totalAnswered} / {questions.length} questions answered.
            </p>
            {incompleteGroups.length > 0 && (
              <ul className="mb-4 list-inside list-disc text-sm text-amber-700">
                {incompleteGroups.map((g) => (
                  <li key={g.component}>
                    <button
                      type="button"
                      className="underline underline-offset-2"
                      onClick={() => goTo(grouped.indexOf(g))}
                    >
                      {COMPONENT_LABELS[g.component]}
                    </button>{" "}
                    still has unanswered questions
                  </li>
                ))}
              </ul>
            )}
            {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
            <Button onClick={handleSubmit} disabled={!allAnswered || submitting} className="w-full py-3">
              {submitting ? "Calculating your Holistic Age…" : "Submit assessment"}
            </Button>
          </Card>
        )}

        <div className="mt-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => goTo(tabIndex - 1)} disabled={tabIndex === 0}>
            ← Back
          </Button>
          {!isFinishTab && <Button onClick={() => goTo(tabIndex + 1)}>Next →</Button>}
        </div>
      </div>
    </div>
  );
}
