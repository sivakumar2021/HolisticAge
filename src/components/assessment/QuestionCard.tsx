"use client";

const GRADED_LABELS = ["Strongly disagree", "Disagree", "Neutral", "Agree", "", "Strongly agree"];

export function QuestionCard({
  text,
  type,
  value,
  onChange,
}: {
  text: string;
  type: "GRADED" | "YES_NO";
  value: number | undefined;
  onChange: (value: number) => void;
}) {
  return (
    <div className="border-b border-stone-100 py-5 last:border-0">
      <p className="mb-3 text-sm font-medium text-stone-800">{text}</p>
      {type === "GRADED" ? (
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              title={GRADED_LABELS[n]}
              className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                value === n
                  ? "border-emerald-800 bg-emerald-800 text-white"
                  : "border-stone-300 text-stone-600 hover:border-emerald-700"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex gap-2">
          {[
            { label: "Yes", val: 1 },
            { label: "No", val: 0 },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => onChange(opt.val)}
              className={`rounded-md border px-4 py-1.5 text-sm font-medium transition-colors ${
                value === opt.val
                  ? "border-emerald-800 bg-emerald-800 text-white"
                  : "border-stone-300 text-stone-600 hover:border-emerald-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
