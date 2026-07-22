import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AssessmentFlow } from "@/components/assessment/AssessmentFlow";

export default async function AssessmentPage() {
  const sessionUser = await requireUser();

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: sessionUser.id },
    select: { birthDate: true },
  });

  if (!user.birthDate) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Card className="text-center">
          <h1 className="mb-2 text-xl font-semibold text-stone-900">Set your birth date first</h1>
          <p className="mb-6 text-stone-500">
            Holistic Age is computed relative to your calendar age, so we need your birth date
            before running an assessment.
          </p>
          <Link href="/settings">
            <Button>Go to Settings</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const questions = await prisma.question.findMany({
    where: { isActive: true },
    orderBy: [{ component: "asc" }, { order: "asc" }],
  });

  return (
    <div className="px-6 py-8">
      <div className="mx-auto mb-6 max-w-3xl">
        <h1 className="text-2xl font-semibold text-stone-900">Assessment</h1>
        <p className="text-stone-500">Answer honestly — there are no wrong answers.</p>
      </div>
      <AssessmentFlow questions={questions} />
    </div>
  );
}
