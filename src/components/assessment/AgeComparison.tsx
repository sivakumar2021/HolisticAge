import { Card } from "@/components/ui/Card";
import { BORDERLINE_SCORE } from "@/lib/scoring";

export function AgeComparison({
  holisticAge,
  calendarAge,
  avgScore,
  asOf,
}: {
  holisticAge: number;
  calendarAge: number;
  avgScore: number;
  asOf?: string;
}) {
  const diff = calendarAge - holisticAge; // positive => younger than calendar age
  const dangerZone = holisticAge > calendarAge;

  return (
    <div className="mb-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="text-center">
          <p className="text-sm text-stone-500">Holistic Age</p>
          <p
            className={`mt-2 text-5xl font-bold ${dangerZone ? "text-red-700" : "text-emerald-800"}`}
          >
            {Math.round(holisticAge)}
          </p>
          {Math.abs(diff) > 0.5 && (
            <p
              className={`mt-2 text-sm font-medium ${dangerZone ? "text-red-700" : "text-emerald-700"}`}
            >
              {dangerZone
                ? `${Math.round(Math.abs(diff))} years older than your calendar age`
                : `Living ${Math.round(diff)} years younger`}
            </p>
          )}
        </Card>
        <Card className="text-center">
          <p className="text-sm text-stone-500">Calendar Age</p>
          <p className="mt-2 text-5xl font-bold text-stone-400">{Math.round(calendarAge)}</p>
          {asOf && <p className="mt-2 text-sm text-stone-400">as of {asOf}</p>}
        </Card>
      </div>

      <div
        className={`mt-4 rounded-md border px-4 py-3 text-sm ${
          dangerZone
            ? "border-red-200 bg-red-50 text-red-900"
            : "border-emerald-200 bg-emerald-50 text-emerald-900"
        }`}
      >
        <span className="font-semibold">{dangerZone ? "Danger zone — " : "Break-even — "}</span>
        A weighted average component score of <strong>{BORDERLINE_SCORE}/100</strong> keeps your
        Holistic Age exactly at your Calendar Age. Yours is currently averaging{" "}
        <strong>{Math.round(avgScore)}/100</strong>
        {dangerZone
          ? ", below break-even, which is why your Holistic Age is running ahead of your Calendar Age."
          : " — at or above break-even, keeping your Holistic Age at or below your Calendar Age."}
      </div>
    </div>
  );
}
