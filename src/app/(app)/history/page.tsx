import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HolisticAgeTrendChart } from "@/components/charts/HolisticAgeTrendChart";

export default async function HistoryPage() {
  const sessionUser = await requireUser();

  const assessments = await prisma.assessment.findMany({
    where: { userId: sessionUser.id },
    orderBy: { createdAt: "asc" },
  });

  if (assessments.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Card className="text-center">
          <h1 className="mb-2 text-xl font-semibold text-stone-900">No assessments yet</h1>
          <p className="mb-6 text-stone-500">
            Run your first assessment to start building your trend.
          </p>
          <Link href="/assessment">
            <Button>Start assessment</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const chartData = assessments.map((a) => ({
    date: a.createdAt.toISOString().slice(0, 10),
    holisticAge: Math.round(a.holisticAge * 10) / 10,
    calendarAge: Math.round(a.calendarAgeAtAssessment * 10) / 10,
  }));

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold text-stone-900">History</h1>

      <Card className="mb-8">
        <HolisticAgeTrendChart data={chartData} />
      </Card>

      <Card>
        <h2 className="mb-4 font-semibold text-stone-900">Past assessments</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left text-stone-500">
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium">Holistic Age</th>
              <th className="py-2 font-medium">Calendar Age</th>
            </tr>
          </thead>
          <tbody>
            {[...assessments].reverse().map((a) => (
              <tr key={a.id} className="border-b border-stone-100 last:border-0">
                <td className="py-2">
                  <Link href={`/assessment/${a.id}`} className="text-emerald-800 hover:underline">
                    {a.createdAt.toISOString().slice(0, 10)}
                  </Link>
                </td>
                <td className="py-2">{Math.round(a.holisticAge)}</td>
                <td className="py-2">{Math.round(a.calendarAgeAtAssessment)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
