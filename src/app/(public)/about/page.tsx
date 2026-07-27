import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About us — Holistic Age",
};

const PRODUCTS = [
  {
    name: "Holistic Age",
    tagline: "Know Your True Age",
    description:
      "Goes beyond chronological age to provide a broader view of where you are today across the dimensions that shape your life. It creates a more meaningful picture of your overall vitality and wellbeing.",
  },
  {
    name: "Arc Score",
    tagline: "Measure Progress in Real Time",
    description:
      "Transforms progress into a visible, trackable measure. The Arc Score helps you understand how your choices and actions are influencing your journey, encouraging continuous improvement rather than chasing a fixed destination.",
  },
  {
    name: "3663 Lifestyle",
    tagline: "Live Better, Every Day",
    description:
      "Turns the Ageless Living philosophy into everyday action. It focuses on the choices, relationships, learning, habits, mindset, purpose, and experiences that help create a richer and more fulfilling life.",
  },
  {
    name: "3663 Fitness",
    tagline: "Move Stronger, Live Longer",
    description:
      "Builds the physical foundation for an active life through strength, mobility, endurance, balance, and consistent movement — helping you maintain the capability and confidence to keep doing the things you enjoy.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative isolate h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src="/about/interconnected-apps.jpg"
          alt="Ageless Living at the center, connected to Holistic Age, Arc Score, 3663 Lifestyle, and 3663 Fitness"
          fill
          priority
          className="object-cover"
        />
        {/* Lightens the source graphic's saturated space theme so it doesn't clash with the site's airy palette, and fades to white at the bottom so it melts into the page instead of cutting off sharply. */}
        <div className="absolute inset-0 bg-white/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </section>

      <div className="mx-auto max-w-3xl px-6 pb-16">
        <h1 className="text-3xl font-bold text-emerald-950">
          Ageless Living — One Framework. Four Connected Components.
        </h1>

        <p className="mt-6 text-stone-600">
          <strong className="text-stone-800">Ageless Living</strong> is a holistic framework
          designed around a simple idea: living well is not defined by the number of years you
          have lived, but by how well you{" "}
          <strong className="text-stone-800">
            think, feel, function, grow, and engage with life
          </strong>
          .
        </p>

        <p className="mt-4 text-stone-600">
          At the center is <strong className="text-stone-800">Ageless Living</strong>, connecting
          four complementary components that turn this philosophy into something that can be
          understood, measured, practiced, and improved.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="rounded-lg border border-stone-200 bg-white p-5">
              <h3 className="font-semibold text-emerald-900">
                {p.name} — {p.tagline}
              </h3>
              <p className="mt-2 text-sm text-stone-600">{p.description}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-semibold text-emerald-950">How it comes together</h2>

        <p className="mt-4 font-medium text-stone-800">
          Holistic Age tells you where you are. Arc Score shows how you are progressing. 3663
          Lifestyle shapes how you live. 3663 Fitness strengthens how you move.
        </p>

        <p className="mt-4 text-stone-600">
          Together, they create a continuous cycle of{" "}
          <strong className="text-stone-800">understanding → measuring → acting → improving</strong>,
          with <strong className="text-stone-800">Ageless Living</strong> providing the framework
          that connects them all.
        </p>

        <p className="mt-8 border-l-4 border-emerald-800 pl-4 text-lg font-medium italic text-emerald-950">
          Ageless Living is not about turning back the clock. It is about making the years ahead
          stronger, richer, more purposeful, and more alive.
        </p>
      </div>
    </div>
  );
}
