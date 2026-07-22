import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <h2 className="text-3xl font-bold text-emerald-950">
        Your calendar age is fixed. Your Holistic Age is in your control.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-stone-600">
        Sign up to run your first assessment and start tracking what actually makes you feel and
        live younger.
      </p>
      <div className="mt-8">
        <Link href="/signup">
          <Button className="px-6 py-3 text-base">Get your Holistic Age</Button>
        </Link>
      </div>
    </section>
  );
}
