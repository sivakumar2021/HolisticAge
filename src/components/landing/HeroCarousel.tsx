"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/hero/outdoors.jpg",
    alt: "A multi-generational group jogging, cycling, kayaking, and hiking together by a mountain lake",
    caption: "Can you relate to these images?",
  },
  {
    src: "/hero/professional.jpg",
    alt: "Colleagues of different ages walking together through a city business district",
    caption: "What do these images signify in terms of age and ageing?",
  },
  {
    src: "/hero/social.jpg",
    alt: "An extended family of all ages gathered for an evening get-together in a backyard",
    caption: "What is society's perception of ageing?",
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

  const { src, alt, caption } = SLIDES[index];

  return (
    <div
      className="mx-auto max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[2.38/1] overflow-hidden rounded-2xl shadow-sm">
        <Image src={src} alt={alt} fill priority={index === 0} className="object-cover" />
        <div className="absolute inset-0 flex items-center">
          <p className="max-w-xs px-6 text-xl font-semibold leading-snug text-white drop-shadow-sm sm:max-w-sm sm:px-10 sm:text-2xl">
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
