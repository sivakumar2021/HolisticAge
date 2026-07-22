import { COMPONENTS, COMPONENT_LABELS, DEFAULT_WEIGHTS } from "@/lib/weights";

const DESCRIPTIONS: Record<string, string> = {
  MENTAL: "Clarity, focus, memory, learning, creativity.",
  PHYSICAL: "Strength, energy, flexibility, endurance.",
  FINANCIAL: "Stability, freedom, planning, smart choices.",
  CAREER: "Purposeful work, skills, contribution, growth.",
  RELATIONSHIPS: "Deep connections, love, trust, meaningful bonds.",
  SOCIAL: "Community, belonging, support, engagement.",
  HABITS: "Daily routines, discipline, sleep, self-care.",
  LEARNING: "Curiosity, new skills, adaptability, growth.",
  PURPOSE: "Direction, meaning, and connection to something larger than yourself.",
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-stone-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-emerald-950">How Holistic Age works</h2>
          <p className="mt-4 text-stone-600">
            A short assessment scores you across 9 components of life. Each score becomes an
            &quot;age&quot; for that component — younger for a higher score, older for a lower
            one — and Holistic Age is their weighted average. You can tune the weights yourself
            once you&apos;re in.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPONENTS.map((c) => (
            <div key={c} className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-semibold text-emerald-900">{COMPONENT_LABELS[c]}</h3>
                <span className="text-xs font-medium text-amber-700">
                  {DEFAULT_WEIGHTS[c]}%
                </span>
              </div>
              <p className="text-sm text-stone-500">{DESCRIPTIONS[c]}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-stone-500">
          Run the assessment as often as you like — monthly is a good rhythm — and watch your
          Holistic Age trend over time against your calendar age.
        </p>
      </div>
    </section>
  );
}
