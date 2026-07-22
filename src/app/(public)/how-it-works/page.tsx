import type { Metadata } from "next";
import Link from "next/link";
import { HowItWorks } from "@/components/landing/HowItWorks";

export const metadata: Metadata = {
  title: "How it works — Holistic Age",
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorks />
      <div className="mx-auto max-w-6xl px-6 pb-16 text-center">
        <Link href="/science" className="text-sm font-medium text-emerald-800 hover:underline">
          Next: the science behind it →
        </Link>
      </div>
    </>
  );
}
