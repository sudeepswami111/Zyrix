"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  Compass,
  Box,
} from "lucide-react";
import { PageBackground } from "@/components/PageBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LessonTabs, LessonTabId, TabConfig } from "@/components/lesson/LessonTabs";
import { NarratedVideoStage } from "@/components/lesson/NarratedVideoStage";
import { episode4StoryScenes } from "@/components/lesson/episode4StoryScenes";
import { ComingSoonCard } from "@/components/lesson/ComingSoonCard";
import { VideoPreview } from "@/components/formats/previews/VideoPreview";
import { DebugPreview } from "@/components/formats/previews/DebugPreview";
import { Viz3DPreview } from "@/components/formats/previews/Viz3DPreview";

export default function Episode4Page() {
  const [activeTab, setActiveTab] = useState<LessonTabId>("story");

  const extraTabs: TabConfig[] = [
    {
      id: "3d",
      label: "3D",
      badge: "Coming soon",
      isAvailable: true,
      icon: Box,
      description: "Interactive 3D gatekeeper machine — visualise comparison and logical operators live",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF6EF] text-[#2B2521] selection:bg-[#F1E2CF] selection:text-[#C1502E]">
      {/* Background layer */}
      <PageBackground />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Lesson Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#6B6058]">
          <Link
            href="/#curriculum"
            className="hover:text-[#C1502E] transition-colors flex items-center gap-1 font-medium"
          >
            <Compass className="w-3.5 h-3.5 text-[#C1502E]" />
            <span>Curriculum</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A89F91]" />
          <Link
            href="/#curriculum"
            className="hover:text-[#C1502E] transition-colors font-medium truncate"
          >
            Module 1: Basic Python Programming
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A89F91]" />
          <span className="font-mono text-[#C1502E] font-semibold">Episode 04</span>
        </nav>

        {/* Lesson Header */}
        <div className="space-y-3 border-b border-[#E6DCC8] pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-mono font-medium text-[#8C3A20]">
              <Layers className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>MODULE 1 · EPISODE 4</span>
            </span>
            <span className="text-xs font-mono text-[#6B6058] bg-white/70 px-2.5 py-1 rounded-md border border-[#E6DCC8]">
              Lesson 4 of 8
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.18]">
            Comparison and Logical Operators
          </h1>

          <p className="text-base sm:text-lg text-[#6B6058] font-sans leading-relaxed max-w-3xl">
            Comparison operators and logical operators.
          </p>
        </div>

        {/* Four Format Tabs (Watch, Story, Sandbox, 3D) */}
        <section aria-label="Lesson learning formats" className="w-full">
          <LessonTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            hiddenTabs={["quiz"]}
            extraTabs={extraTabs}
            tabOverrides={{
              watch: {
                badge: "Coming soon",
                isAvailable: true,
                description: "Watch the full studio video walkthrough for Episode 4",
              },
              story: {
                badge: "10 Scenes",
                isAvailable: true,
                description:
                  "Follow Asha at the coding event entry gate across 10 scenes teaching comparison and logical operators",
              },
              sandbox: {
                badge: "Coming soon",
                isAvailable: true,
                description:
                  "Interactive in-browser Pyodide code environment to experiment with comparison and logical operators",
              },
              "3d": {
                badge: "Coming soon",
                isAvailable: true,
                description:
                  "Interactive 3D gatekeeper machine — visualise comparison and logical operators live",
              },
            }}
          />
        </section>

        {/* Tab Content Display Area */}
        <section
          role="tabpanel"
          id={`lesson-panel-${activeTab}`}
          aria-labelledby={`lesson-tab-${activeTab}`}
          className="w-full"
        >
          {/* Watch Tab — Video Coming Soon Card (modular slot for studio video) */}
          {activeTab === "watch" && (
            <ComingSoonCard
              title="Comparison and Logical Operators Walkthrough"
              formatName="4K Studio Video"
              description="A guided studio video walkthrough explaining Python comparison operators (==, !=, >, <, >=, <=) and boolean logical operators (and, or, not)."
              preview={<VideoPreview />}
              roadmapNote="Studio video in production for Episode 4"
            />
          )}

          {/* Story Tab — Animated NarratedVideoStage */}
          {activeTab === "story" && (
            <NarratedVideoStage
              title="Comparison and Logical Operators"
              kicker="Module 1 · Episode 4"
              subtitle="Comparison operators and logical operators."
              scenes={episode4StoryScenes}
            />
          )}

          {/* Sandbox Tab — Coming Soon Card */}
          {activeTab === "sandbox" && (
            <ComingSoonCard
              title="Interactive Gatekeeper Sandbox"
              formatName="Python 3.12 (Wasm) Playground"
              description="Interactive in-browser code environment with guided practice and test challenges for comparison and logical operators."
              preview={<DebugPreview />}
              roadmapNote="Coding sandbox and test challenges coming soon for Episode 4"
            />
          )}

          {/* 3D Tab — Coming Soon Card */}
          {activeTab === "3d" && (
            <ComingSoonCard
              title="3D Logic Gatekeeper Machine"
              formatName="WebGL • React Three Fiber"
              description="Interactive 3D visualization showing boolean decisions, condition gates, and truth values in real time."
              preview={<Viz3DPreview />}
              roadmapNote="Interactive 3D scene coming soon for Episode 4"
            />
          )}
        </section>

        {/* Core Mental Models Section */}
        <section
          aria-label="Core mental models"
          className="rounded-2xl border border-[#E6DCC8] bg-white p-6 sm:p-8 flex flex-col gap-5 shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C1502E]" />
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2B2521]">
              Core Mental Models in This Episode
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">01 · Equality</span>
              <h3 className="font-semibold text-[#2B2521]">Assignment vs. Comparison (= vs ==)</h3>
              <p className="text-[#6B6058] leading-relaxed">
                A single equals sign <code className="font-mono text-xs text-[#C1502E] font-bold">=</code> stores a value. A double equals sign <code className="font-mono text-xs text-[#C1502E] font-bold">==</code> asks: are these equal? The result is always <code className="font-mono text-xs text-[#C1502E] font-bold">True</code> or <code className="font-mono text-xs text-[#C1502E] font-bold">False</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">02 · Combinations</span>
              <h3 className="font-semibold text-[#2B2521]">Logical &ldquo;and&rdquo; &amp; &ldquo;or&rdquo;</h3>
              <p className="text-[#6B6058] leading-relaxed">
                <code className="font-mono text-xs text-[#C1502E] font-bold">and</code> requires both sides to be True. <code className="font-mono text-xs text-[#C1502E] font-bold">or</code> succeeds if at least one side is True.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">03 · Inversion</span>
              <h3 className="font-semibold text-[#2B2521]">The &ldquo;not&rdquo; Operator</h3>
              <p className="text-[#6B6058] leading-relaxed">
                <code className="font-mono text-xs text-[#C1502E] font-bold">not</code> flips any truth value: <code className="font-mono text-xs text-[#C1502E] font-bold">not False</code> evaluates to True, and <code className="font-mono text-xs text-[#C1502E] font-bold">not True</code> evaluates to False.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav
          aria-label="Episode navigation"
          className="pt-6 border-t border-[#E6DCC8] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Back to Episode 3 */}
          <Link
            href="/learn/module-1/episode-3"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#E6DCC8] bg-white hover:bg-[#FAF4ED] text-sm font-medium text-[#2B2521] hover:text-[#C1502E] transition-all shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 text-[#6B6058] group-hover:text-[#C1502E] transition-transform group-hover:-translate-x-0.5" />
            <span>Previous: Episode 3 (Operators)</span>
          </Link>

          {/* Next Episode Placeholder */}
          <div
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/70 text-sm font-medium text-[#A89F91] cursor-not-allowed select-none"
            aria-disabled="true"
            title="Episode 5 will be available in the upcoming release"
          >
            <span>Next: Episode 5 (Conditionals)</span>
            <ArrowRight className="w-4 h-4 text-[#C5B8A5]" />
          </div>
        </nav>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

