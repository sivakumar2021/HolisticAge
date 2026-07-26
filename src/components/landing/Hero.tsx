"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// Captions are placeholders until real per-image taglines are supplied.
// Ordered to match the app's 9-component sequence (lib/weights.ts COMPONENTS).
const SLIDES = [
  {
    src: "/hero/mental.jpg",
    alt: "A multi-generational group practicing yoga and meditation together in a park",
    caption:
      "Cultivate a clear, resilient, and positive mind that grows stronger through every experience.",
  },
  {
    src: "/hero/outdoors.jpg",
    alt: "A multi-generational group jogging, cycling, kayaking, and hiking together by a mountain lake",
    caption: "Build strength, energy, mobility, and vitality to live life fully and confidently.",
  },
  {
    src: "/hero/financial.jpg",
    alt: "Three generations of a family building a savings and financial plan together at home",
    caption: "Create financial freedom and security that give you greater choice and independence.",
  },
  {
    src: "/hero/professional.jpg",
    alt: "Colleagues of different ages walking together through a city business district",
    caption: "Keep evolving your skills, experience, and ambitions to stay relevant and fulfilled.",
  },
  {
    src: "/hero/relationships.jpg",
    alt: "A multi-generational family relaxing and talking together in a living room",
    caption: "Nurture meaningful relationships built on love, trust, connection, and shared growth.",
  },
  {
    src: "/hero/social.jpg",
    alt: "An extended family of all ages gathered for an evening get-together in a backyard",
    caption:
      "Build a vibrant social life through friendships, community, belonging, and shared experiences.",
  },
  {
    src: "/hero/habits.jpg",
    alt: "A family of different ages each practicing their own morning routine and daily habits at home",
    caption: "Shape everyday habits that strengthen your wellbeing, performance, and quality of life.",
  },
  {
    src: "/hero/learning.jpg",
    alt: "A grandfather reading to grandchildren surrounded by other family members reading in a library",
    caption: "Stay curious, explore new ideas, and keep expanding what you know and can do.",
  },
  {
    src: "/hero/purpose.jpg",
    alt: "A multi-generational group of volunteers building a house and planting trees together",
    caption: "Live with intention, contribute meaningfully, and pursue what makes life truly worthwhile.",
  },
];

const AUTO_ADVANCE_MS = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const { src, alt, caption } = SLIDES[index];

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 -z-10">
        <Image src={src} alt={alt} fill priority={index === 0} className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-300">
          Beyond the calendar
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Your calendar age isn&apos;t your real age.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
          Calendar age is just a count of years — it says nothing about how clear your mind is,
          how strong your body feels, or how much purpose drives your day. Holistic Age measures
          how young you&apos;re really living, across the parts of life that actually matter, so
          you can act on what will really move the number.
        </p>

        {/* Tagline — tied to the current image, called out as its own bordered block so it reads as a caption/reaction to the photo rather than blending into the pitch copy. */}
        <div className="mx-auto mt-10 inline-block rounded-xl border border-white/40 bg-white/10 px-8 py-4 backdrop-blur-sm">
          <p className="text-xl font-semibold text-white sm:text-2xl">{caption}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/signup">
            <Button className="px-6 py-3 text-base">Find your Holistic Age</Button>
          </Link>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
