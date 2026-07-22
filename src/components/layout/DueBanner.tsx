import Link from "next/link";

export function DueBanner({ neverAssessed }: { neverAssessed: boolean }) {
  return (
    <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-center text-sm text-amber-900">
      {neverAssessed
        ? "You haven't run an assessment yet — "
        : "You're due for your monthly reassessment — "}
      <Link href="/assessment" className="font-medium underline underline-offset-2">
        run it now
      </Link>
      .
    </div>
  );
}
