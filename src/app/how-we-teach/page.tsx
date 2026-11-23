import type { Metadata } from "next";
import { Layers } from "lucide-react";
import { HowWeTeachSection } from "@/components/HowWeTeachSection";
import { PageHeader } from "@/components/PageHeader";
import { PageClosingStrip } from "@/components/PageClosingStrip";

export const metadata: Metadata = {
  title: "How We Teach | Zyrix",
  description:
    "Explore our 7 format-matched teaching mediums designed to make complex data science and machine learning concepts click.",
};

export default function HowWeTeachPage() {
  return (
    <>
      <PageHeader
        kicker="How We Teach"
        kickerIcon={<Layers className="w-3.5 h-3.5 text-[#C1502E]" />}
        title="The Format-Matching Philosophy"
        intro="Most courses force every topic through the same lecture format. We match each idea to the medium where it clicks best."
      />
      <HowWeTeachSection />
      <PageClosingStrip
        title="Experience format-matched learning"
        description="Try our 3D models, code debug challenges, and visual walkthroughs in Module 1."
      />
    </>
  );
}
