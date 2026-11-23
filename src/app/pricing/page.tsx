import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { PricingSection } from "@/components/PricingSection";
import { PageHeader } from "@/components/PageHeader";
import { PageClosingStrip } from "@/components/PageClosingStrip";

export const metadata: Metadata = {
  title: "Pricing | Zyrix",
  description:
    "Transparent investment in your machine learning mastery. Start free with essential foundations, or unlock the full syllabus.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        kicker="Pricing"
        kickerIcon={<CreditCard className="w-3.5 h-3.5 text-[#C1502E]" />}
        title="Learn at Your Own Pace"
        intro="Begin with essential foundations for free. Upgrade whenever you are ready for comprehensive syllabus depth and live execution sandboxes."
      />
      <PricingSection />
      <PageClosingStrip
        title="Start free today"
        description="Jump into Module 1 with zero commitment and no credit card required."
      />
    </>
  );
}
