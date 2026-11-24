import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ProblemComparisonSection } from "@/components/home/ProblemComparisonSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CurriculumShowcaseSection } from "@/components/home/CurriculumShowcaseSection";
import { InteractiveLearningShowcase } from "@/components/home/InteractiveLearningShowcase";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { FinalCTA } from "@/components/FinalCTA";
import { HashRedirect } from "@/components/HashRedirect";

export const metadata: Metadata = {
  title: "Zyrix — Understand Technology. Don't Just Memorize It.",
  description:
    "An editorial interactive technology learning platform. From your first line of Python to building intelligent machine learning systems through visual memory models, simulations, and real-world projects.",
};

export default function Home() {
  return (
    <>
      <HashRedirect />
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: The Problem With Traditional Learning */}
      <ProblemComparisonSection />

      {/* Section 3: How Zyrix Works (Understand -> Visualize -> Build) */}
      <HowItWorksSection />

      {/* Section 4: Explore Our Curriculum */}
      <CurriculumShowcaseSection />

      {/* Section 5: Interactive Learning Showcase */}
      <InteractiveLearningShowcase />

      {/* Section 6: Our Philosophy */}
      <PhilosophySection />

      {/* Section 7: Final CTA */}
      <FinalCTA />
    </>
  );
}
