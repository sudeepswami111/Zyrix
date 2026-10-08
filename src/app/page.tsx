import React from "react";
import { PageBackground } from "@/components/PageBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowWeTeachSection } from "@/components/HowWeTeachSection";
import { CurriculumSection } from "@/components/CurriculumSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { PricingSection } from "@/components/PricingSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF6EF] text-[#2B2521] selection:bg-[#F1E2CF] selection:text-[#C1502E]">
      {/* Background layer */}
      <PageBackground />

      {/* Navigation bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero />
        <HowWeTeachSection />
        <CurriculumSection />
        <ShowcaseSection />
        <PricingSection />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
