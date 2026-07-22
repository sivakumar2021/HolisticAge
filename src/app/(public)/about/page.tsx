import type { Metadata } from "next";
import { AgelessLivingDiagram } from "@/components/about/AgelessLivingDiagram";

export const metadata: Metadata = {
  title: "About us — Holistic Age",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-emerald-950">About us</h1>
      <p className="mt-4 text-stone-600">
        This page is a placeholder — full details on the author, the story behind Holistic Age,
        and how it fits together with the rest of the family of products are coming soon.
      </p>

      <div className="my-12 rounded-xl border border-stone-200 bg-stone-50 p-8">
        <AgelessLivingDiagram />
        <p className="mt-6 text-center text-sm text-stone-500">
          Ageless Living is the philosophy at the center — Holistic Age, ArcScore, 3663 Lifestyle,
          and 3663 Fitness are each a different lens on living that out.
        </p>
      </div>

      <div className="space-y-6 text-stone-600">
        <p>
          Holistic Age is part of a broader Ageless Living approach: the idea that how you live —
          not just how many years you&apos;ve counted — determines how young you feel and
          function. This page will eventually cover:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Who&apos;s behind Holistic Age and why it was built</li>
          <li>How Ageless Living ties Holistic Age together with ArcScore, 3663 Lifestyle, and 3663 Fitness</li>
          <li>What each of those is, and how they complement one another</li>
        </ul>
      </div>
    </div>
  );
}
