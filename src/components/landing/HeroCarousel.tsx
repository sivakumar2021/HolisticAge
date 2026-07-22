"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Composited from real (free-license, no-attribution-required) photos — see
// scripts/build-hero-images.mjs and assets/hero-src/.
const SLIDES = [
  {
    src: "/hero/outdoors.jpg",
    alt: "An older person walking with a cane and a younger person jogging, both outdoors",
    caption: "Can you relate to these images?",
  },
  {
    src: "/hero/professional.jpg",
    alt: "An older professional and a younger professional, each at work",
    caption: "What do these images signify in terms of age and ageing?",
  },
  {
    src: "/hero/social.jpg",
    alt: "An older person and a younger person, each enjoying a coffee",
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
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="relative aspect-[2/1]">
          <Image src={src} alt={alt} fill priority={index === 0} className="object-cover" />
        </div>
        <p className="border-t border-stone-100 px-6 py-4 text-center text-base font-medium text-stone-700">
          {caption}
        </p>
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
