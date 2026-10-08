"use client";

import React, { useState } from "react";
import { ArrowRight, Compass, Box, Terminal, Laptop } from "lucide-react";
import { GradientDescentDemo } from "./GradientDescentDemo";

export function Hero() {
  // Propose 3 headline variants per architectural decision #3
  const headlineVariants = [
    "Every Concept, Taught the Way It Actually Makes Sense",
    "Stop Memorizing Formulas. Build Real Mathematical Intuition.",
    "The Deep Machinery of Data Science, Finally Made Tangible.",
  ];

  const [activeHeadlineIndex, setActiveHeadlineIndex] = useState(0);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      } else {
        // Target section does not exist yet in Phase 1; gracefully update URL without error
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Warm Tinted Pill Badge (No glow) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-medium text-[#8C3A20] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C1502E]" />
            <span>7 ways to actually understand data science</span>
          </div>

          {/* Large Serif Display Headline */}
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.12]">
              {headlineVariants[activeHeadlineIndex]}
            </h1>

            {/* Editorial Headline Variant Selector (Optional subtle toggle) */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#6B6058]">
              <span className="hidden sm:inline">Headline Variant:</span>
              {headlineVariants.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHeadlineIndex(idx)}
                  className={`px-2 py-0.5 rounded-md border text-[11px] font-sans transition-colors ${
                    activeHeadlineIndex === idx
                      ? "bg-[#C1502E] text-white border-[#C1502E] font-medium"
                      : "bg-[#FAF4ED] text-[#6B6058] border-[#E6DCC8] hover:text-[#2B2521]"
                  }`}
                  aria-label={`Select headline variant ${idx + 1}`}
                >
                  Variant {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Subheadline in Sans-Serif */}
          <p className="text-lg sm:text-xl text-[#6B6058] font-sans max-w-2xl mx-auto leading-relaxed">
            Most courses force every topic through the same lecture format. We match
            each idea to the medium where it clicks best — interactive 3D simulations,
            hands-on debugging, visual derivations, and real production datasets.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#sandbox"
              onClick={(e) => handleSmoothScroll(e, "#sandbox")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold bg-[#C1502E] hover:bg-[#A84224] text-[#FBF6EF] shadow-sm hover:shadow transition-all duration-200 active:scale-98 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
            >
              <span>Try It Live</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </a>

            <a
              href="#how-we-teach"
              onClick={(e) => handleSmoothScroll(e, "#how-we-teach")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-medium bg-[#FAF4ED] hover:bg-[#F1E2CF] text-[#2B2521] border border-[#E6DCC8] shadow-xs transition-all duration-200 active:scale-98 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
            >
              <Compass className="w-4 h-4 text-[#C1502E]" />
              <span>See How We Teach</span>
            </a>
          </div>

          {/* Truth-Only Stat Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#6B6058] font-sans">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F1E2CF]/60 border border-[#E6DCC8]">
              <Box className="w-3.5 h-3.5 text-[#C1502E]" />
              <span className="font-medium text-[#2B2521]">Live 3D Visualizations</span>
            </div>
            <span className="hidden sm:inline text-[#E6DCC8]">•</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F1E2CF]/60 border border-[#E6DCC8]">
              <Terminal className="w-3.5 h-3.5 text-[#C1502E]" />
              <span className="font-medium text-[#2B2521]">Real Debug Challenges</span>
            </div>
            <span className="hidden sm:inline text-[#E6DCC8]">•</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F1E2CF]/60 border border-[#E6DCC8]">
              <Laptop className="w-3.5 h-3.5 text-[#C1502E]" />
              <span className="font-medium text-[#2B2521]">Runs in Your Browser</span>
            </div>
          </div>
        </div>

        {/* 3D Gradient Descent Demo Showcase Container */}
        <div id="sandbox" className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <GradientDescentDemo />
        </div>
      </div>
    </section>
  );
}
