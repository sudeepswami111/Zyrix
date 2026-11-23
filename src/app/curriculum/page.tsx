import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { CurriculumSection } from "@/components/CurriculumSection";
import { PageHeader } from "@/components/PageHeader";
import { PageClosingStrip } from "@/components/PageClosingStrip";

export const metadata: Metadata = {
  title: "Curriculum | Zyrix",
  description:
    "From Python fundamentals and vector calculus to deep neural networks and computer vision — explore the complete Zyrix curriculum.",
};

export default function CurriculumPage() {
  return (
    <>
      <PageHeader
        kicker="Curriculum"
        kickerIcon={<GraduationCap className="w-3.5 h-3.5 text-[#C1502E]" />}
        title="Eight Modules. Real Depth."
        intro="Explore every topic, interactive exercise, and mathematical derivation taught across the full eight-module curriculum."
      />
      <CurriculumSection />
      <PageClosingStrip
        title="Ready to dive into the curriculum?"
        description="Start with Module 1: Basic Python Programming and build up to advanced machine learning."
      />
    </>
  );
}
