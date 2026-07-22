import type { Metadata } from "next";
import Link from "next/link";
import { ScienceSection } from "@/components/landing/ScienceSection";

export const metadata: Metadata = {
  title: "The science — Holistic Age",
};

export default function SciencePage() {
  return (
    <>
      <ScienceSection />
      <div className="mx-auto max-w-6xl px-6 pb-16 text-center">
        <Link href="/how-it-works" className="text-sm font-medium text-emerald-800 hover:underline">
          ← Back to how it works
        </Link>
      </div>
    </>
  );
}
