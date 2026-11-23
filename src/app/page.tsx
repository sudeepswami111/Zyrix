import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ExploreZyrixSection } from "@/components/ExploreZyrixSection";
import { FinalCTA } from "@/components/FinalCTA";
import { HashRedirect } from "@/components/HashRedirect";

export const metadata: Metadata = {
  title: "Zyrix — Every Concept, Taught the Way It Actually Makes Sense",
  description:
    "An editorial interactive learning platform for machine learning and data science. Live 3D visualizations, interactive simulations, and plain-language intuition.",
};

export default function Home() {
  return (
    <>
      <HashRedirect />
      <Hero />
      <ExploreZyrixSection />
      <FinalCTA />
    </>
  );
}
