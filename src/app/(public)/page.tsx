import { Hero } from "@/components/landing/Hero";
import { ScienceSection } from "@/components/landing/ScienceSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTASection } from "@/components/landing/CTASection";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ScienceSection />
      <HowItWorks />
      <CTASection />
    </>
  );
}
