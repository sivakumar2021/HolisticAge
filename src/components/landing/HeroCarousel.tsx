"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// `dark: true` = image has a dark gradient on the left (use white text);
// `dark: false` = image has a light/cream gradient (use dark text instead).
// Ordered to match the app's 9-component sequence (lib/weights.ts COMPONENTS).
const SLIDES = [
  {
    src: "/hero/mental.jpg",
    alt: "A multi-generational group practicing yoga and meditation together in a park",
    caption: "How sharp and clear does your mind feel these days?",
    dark: true,
  },
  {
    src: "/hero/outdoors.jpg",
    alt: "A multi-generational group jogging, cycling, kayaking, and hiking together by a mountain lake",
    caption: "Can you relate to these images?",
    dark: true,
  },
  {
    src: "/hero/financial.jpg",
    alt: "Three generations of a family building a savings and financial plan together at home",
    caption: "Does your financial life let you breathe easy — or keep you up at night?",
    dark: true,
  },
  {
    src: "/hero/professional.jpg",
    alt: "Colleagues of different ages walking together through a city business district",
    caption: "What do these images signify in terms of age and ageing?",
    dark: true,
  },
  {
    src: "/hero/relationships.jpg",
    alt: "A multi-generational family relaxing and talking together in a living room",
    caption: "Are you nurturing the relationships that matter most?",
    dark: false,
  },
  {
    src: "/hero/social.jpg",
    alt: "An extended family of all ages gathered for an evening get-together in a backyard",
    caption: "What is society's perception of ageing?",
    dark: true,
  },
  {
    src: "/hero/habits.jpg",
    alt: "A family of different ages each practicing their own morning routine and daily habits at home",
    caption: "Are your daily habits helping you age well?",
    dark: false,
  },
  {
    src: "/hero/learning.jpg",
    alt: "A grandfather reading to grandchildren surrounded by other family members reading in a library",
    caption: "When did you last learn something new?",
    dark: false,
  },
  {
    src: "/hero/purpose.jpg",
    alt: "A multi-generational group of volunteers building a house and planting trees together",
    caption: "What gives your life a sense of purpose?",
    dark: false,
  },
];

const AUTO_ADVANCE_MS = 5000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const { src, alt, caption, dark } = SLIDES[index];

  return (
    <div
      className="mx-auto max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[2.38/1] overflow-hidden rounded-2xl shadow-sm">
        <Image src={src} alt={alt} fill priority={index === 0} className="object-cover" />
        <div className="absolute inset-0 flex items-center">
          <p
            className={`max-w-xs px-6 text-xl font-semibold leading-snug sm:max-w-sm sm:px-10 sm:text-2xl ${
              dark ? "text-white drop-shadow-sm" : "text-stone-900"
            }`}
          >
            {caption}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-emerald-800" : "w-2.5 bg-stone-300 hover:bg-stone-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
