"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { HeroConceptTransformer } from "./hero/HeroConceptTransformer";

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-24 lg:pb-32 overflow-hidden bg-[var(--zy-bg)]">
      {/* Background Decorative Radial Ambience */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 10%, rgba(255, 170, 69, 0.15) 0%, rgba(37, 184, 165, 0.08) 35%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Editorial Header Block */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Top Pill / Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E6DF] shadow-2xs text-xs font-mono font-medium text-[#17191F]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFAA45]" />
            <span>A New Medium for Learning Technology</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-[#17191F] tracking-tight leading-[1.08] text-balance">
            Understand Technology.{" "}
            <span className="text-[#FFAA45] block sm:inline">
              Don&apos;t Just Memorize It.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-[#777B85] font-sans leading-relaxed max-w-2xl text-balance">
            From your first line of Python to building intelligent machine learning
            systems, discover technology through interactive experiences, visual
            explanations, and real-world projects.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-2">
            <Link
              href="/learn/module-1/episode-1"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold bg-[#FFAA45] hover:bg-[#E68522] text-[#17191F] shadow-[0_2px_8px_rgba(255,170,69,0.25)] hover:shadow-[0_4px_16px_rgba(255,170,69,0.35)] transition-all duration-200 active:scale-98"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              href="/how-we-teach"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-base font-medium bg-white hover:bg-[#F8F7F3] text-[#17191F] border border-[#E7E6DF] shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-98"
            >
              <Compass className="w-4 h-4 text-[#25B8A5]" />
              <span>Explore Our Approach</span>
            </Link>
          </div>

          {/* Platform Credibility Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-3 text-xs font-mono text-[#777B85]">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FFAA45]" />
              <span>100% In-Browser Execution</span>
            </div>
            <span className="hidden sm:inline text-[#E7E6DF]">•</span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#25B8A5]" />
              <span>Interactive Memory Models</span>
            </div>
            <span className="hidden sm:inline text-[#E7E6DF]">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFAA45]" />
              <span>Zero Setup Required</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Concept Transformer Component */}
        <HeroConceptTransformer />
      </div>
    </section>
  );
}
