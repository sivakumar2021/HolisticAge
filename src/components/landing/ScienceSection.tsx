const IMPACT_AREAS = [
  {
    title: "Social",
    body: "Ageist attitudes shape how people are treated in everyday life — the World Health Organization found that around 1 in 2 people worldwide hold ageist attitudes, affecting everything from how we're spoken to, to whether our ideas are taken seriously.",
    citation:
      "World Health Organization (2021). Global report on ageism.",
  },
  {
    title: "Professional",
    body: "Age-based assumptions still shape hiring, promotion, and how contributions are valued at work — the American Psychological Association calls ageism \"one of the last socially acceptable prejudices,\" with real consequences for careers.",
    citation: "Weir, K. (2023). APA Monitor on Psychology, 54, 36.",
  },
  {
    title: "Personal",
    body: "How old you feel often diverges sharply from your calendar age — research on \"subjective age\" found that people over 40 typically feel about 20% younger than their actual age, and that gap tends to widen with time.",
    citation: "Rubin, D. C., & Berntsen, D. (2006). Psychonomic Bulletin & Review, 13, 776–780.",
  },
  {
    title: "Psychological",
    body: "How you feel about aging isn't just a mindset — it's measurable. A Yale-led study found that people with more positive self-perceptions of aging lived, on average, 7.5 years longer than those with negative ones.",
    citation:
      "Levy, B. R., Slade, M. D., Kunkel, S. R., & Kasl, S. V. (2002). Journal of Personality and Social Psychology, 83(2), 261–270.",
  },
];

export function ScienceSection() {
  return (
    <section id="science" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-emerald-950">Age isn&apos;t just a number</h2>
        <p className="mt-4 text-stone-600">
          The way we think about age shapes how we&apos;re treated, how we feel, and even how
          long and well we live — socially, professionally, personally, and psychologically.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {IMPACT_AREAS.map((area) => (
          <div key={area.title} className="rounded-xl border border-stone-200 bg-white p-6">
            <h3 className="mb-2 font-semibold text-emerald-900">{area.title}</h3>
            <p className="text-sm text-stone-600">{area.body}</p>
            <p className="mt-3 text-xs italic text-stone-400">{area.citation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
