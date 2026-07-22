import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroCarousel } from "./HeroCarousel";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-4xl px-6 pt-8 text-center sm:pt-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-700">
          Beyond the calendar
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
          Your calendar age isn&apos;t your real age.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-600">
          Calendar age is just a count of years — it says nothing about how clear your mind is,
          how strong your body feels, or how much purpose drives your day. Holistic Age measures
          how young you&apos;re really living, across the parts of life that actually matter, so
          you can act on what will really move the number.
        </p>
      </div>

      <div className="px-6 py-14">
        <HeroCarousel />
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-20 text-center sm:pb-28">
        <p className="mb-6 text-lg font-medium italic text-emerald-900">
          How do you age gracefully?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/signup">
            <Button className="px-6 py-3 text-base">Find your Holistic Age</Button>
          </Link>
          <a href="#how-it-works" className="text-sm font-medium text-stone-700 hover:text-stone-900">
            See how it works →
          </a>
        </div>
      </div>
    </section>
  );
}
