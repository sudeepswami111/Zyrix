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
  Terminal,
} from "lucide-react";
import { PageBackground } from "@/components/PageBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LessonTabs, LessonTabId, TabConfig } from "@/components/lesson/LessonTabs";
import { NarratedVideoStage } from "@/components/lesson/NarratedVideoStage";
import { episode3StoryScenes } from "@/components/lesson/episode3StoryScenes";
import { ComingSoonCard } from "@/components/lesson/ComingSoonCard";
import { VideoPreview } from "@/components/formats/previews/VideoPreview";
import { SandboxPreview } from "@/components/lesson/previews/SandboxPreview";
import { SandboxTest } from "@/components/lesson/SandboxTest";
import { episode3TestQuestions } from "@/components/lesson/episode3TestQuestions";
import dynamic from "next/dynamic";

const OperatorMachine = dynamic(
  () => import("@/components/3d/OperatorMachine"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px] bg-[#FAF4ED] rounded-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#C1502E] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[#6B6058]">Loading 3D visualiser…</span>
        </div>
      </div>
    ),
  }
);

type SandboxMode = "practice" | "test";

const PRACTICE_STARTER_CODE = `price = 15
quantity = 3
total = price * quantity
print(total)
total += 20
print(total)`;

export default function Episode3Page() {
  const [activeTab, setActiveTab] = useState<LessonTabId>("story");
  const [sandboxMode, setSandboxMode] = useState<SandboxMode>("practice");

  const extraTabs: TabConfig[] = [
    {
      id: "3d",
      label: "3D",
      badge: undefined,
      isAvailable: true,
      icon: Box,
      description: "Interactive 3D operator machine — visualise arithmetic, division and assignment operators live",
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
          <span className="font-mono text-[#C1502E] font-semibold">Episode 03</span>
        </nav>

        {/* Lesson Header */}
        <div className="space-y-3 border-b border-[#E6DCC8] pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-mono font-medium text-[#8C3A20]">
              <Layers className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>MODULE 1 · EPISODE 3</span>
            </span>
            <span className="text-xs font-mono text-[#6B6058] bg-white/70 px-2.5 py-1 rounded-md border border-[#E6DCC8]">
              Lesson 3 of 8
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.18]">
            Operators
          </h1>

          <p className="text-base sm:text-lg text-[#6B6058] font-sans leading-relaxed max-w-3xl">
            Explore arithmetic operators and assignment shortcuts through Asha&apos;s campus snack stall — counting samosas, calculating revenue, and updating totals in Python.
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
                isAvailable: false,
                description: "Watch the full studio video walkthrough for Episode 3",
              },
              story: {
                badge: "10 Scenes",
                isAvailable: true,
                description:
                  "Follow Asha's snack stall across 10 scenes teaching arithmetic and assignment operators",
              },
              sandbox: {
                badge: undefined,
                isAvailable: true,
                description:
                  "Interactive in-browser Pyodide code environment to experiment with operators live",
              },
              "3d": {
                badge: undefined,
                isAvailable: true,
                description:
                  "Interactive 3D operator machine — visualise arithmetic, division and assignment operators live",
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
          {/* Watch Tab — Coming Soon Card */}
          {activeTab === "watch" && (
            <ComingSoonCard
              title="Operators Walkthrough"
              formatName="4K Studio Video"
              description="A guided studio video walkthrough explaining Python arithmetic operators, division nuances, and compound assignment shortcuts."
              preview={<VideoPreview />}
              roadmapNote="Studio video in production for Episode 3"
            />
          )}

          {/* Story Tab — Animated NarratedVideoStage */}
          {activeTab === "story" && (
            <NarratedVideoStage
              title="Operators"
              kicker="Module 1 · Episode 3"
              subtitle="Follow Asha as she runs her snack stall and does all the maths with Python operators."
              scenes={episode3StoryScenes}
            />
          )}

          {/* Sandbox Tab — Practice / Test Modes */}
          {activeTab === "sandbox" && (
            <div className="w-full rounded-2xl bg-white border border-[#E6DCC8] shadow-xs overflow-hidden">
              {/* Header Bar */}
              <div className="p-4 sm:p-5 border-b border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF4ED]/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C1502E] animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-[#2B2521]">
                    Interactive Python Sandbox
                  </span>
                  <span className="text-[#A89F91]">•</span>
                  <span className="text-xs font-mono text-[#6B6058]">
                    Python 3.12 (Wasm)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] text-[#8C3A20] text-xs font-mono font-medium">
                    <Terminal className="w-3.5 h-3.5 text-[#C1502E]" />
                    <span>Live Playground</span>
                  </span>
                </div>
              </div>

              {/* Practice / Test mode switcher */}
              <div className="px-4 sm:px-6 pt-5 pb-0 flex flex-wrap items-center justify-between gap-3">
                {/* Segmented pill switch */}
                <div
                  role="tablist"
                  aria-label="Sandbox mode"
                  className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]"
                >
                  {(["practice", "test"] as SandboxMode[]).map((mode) => {
                    const isActive = sandboxMode === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSandboxMode(mode)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-1 capitalize ${
                          isActive
                            ? "bg-[#C1502E] text-white shadow-xs"
                            : "text-[#6B6058] hover:text-[#2B2521] hover:bg-[#F1E2CF]"
                        }`}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>

                {/* Question count badge */}
                {sandboxMode === "test" && (
                  <span className="text-xs font-mono text-[#6B6058]">
                    Episode 3 · {episode3TestQuestions.length} questions
                  </span>
                )}
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                {sandboxMode === "practice" && (
                  <>
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C1502E] mb-2">
                        <span>INTERACTIVE SANDBOX</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] tracking-tight mb-2">
                        Run Asha&apos;s Snack Stall Bill
                      </h3>
                      <p className="text-sm sm:text-base text-[#6B6058] leading-relaxed font-sans">
                        Calculate stall revenue, update totals, and explore arithmetic operators directly in your browser. Edit the code, hit Run, and watch real Python execute via in-browser WebAssembly.
                      </p>
                    </div>

                    {/* Embedded Real Pyodide Sandbox Playground */}
                    <div className="w-full rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/60 p-4 sm:p-6 overflow-hidden">
                      <SandboxPreview
                        initialCode={PRACTICE_STARTER_CODE}
                        customTip={
                          <p className="text-xs sm:text-sm text-[#6B6058] leading-relaxed">
                            <strong className="text-[#2B2521] font-medium">Try it yourself:</strong>{" "}
                            change the price or quantity and <span className="font-semibold text-[#C1502E]">Run</span> again, then swap <code className="font-mono text-[#C1502E] font-semibold">*</code> for <code className="font-mono text-[#C1502E] font-semibold">+</code>, <code className="font-mono text-[#C1502E] font-semibold">-</code>, <code className="font-mono text-[#C1502E] font-semibold">/</code>, <code className="font-mono text-[#C1502E] font-semibold">//</code>, <code className="font-mono text-[#C1502E] font-semibold">%</code> or <code className="font-mono text-[#C1502E] font-semibold">**</code>, and try <code className="font-mono text-[#C1502E] font-semibold">-=</code>, <code className="font-mono text-[#C1502E] font-semibold">*=</code> or <code className="font-mono text-[#C1502E] font-semibold">/=</code> instead of <code className="font-mono text-[#C1502E] font-semibold">+=</code>.
                          </p>
                        }
                      />
                    </div>
                  </>
                )}

                {sandboxMode === "test" && (
                  <>
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C1502E] mb-2">
                        <span>CODING TEST</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] tracking-tight mb-2">
                        Episode 3 Test
                      </h3>
                      <p className="text-sm sm:text-base text-[#6B6058] leading-relaxed font-sans">
                        Six short coding questions based on what Episode 3 teaches. Write the code, hit Submit, and get instant feedback.
                      </p>
                    </div>

                    <SandboxTest
                      questions={episode3TestQuestions}
                      episodeKey="module-1-episode-3"
                      onBackToPractice={() => setSandboxMode("practice")}
                    />
                  </>
                )}
              </div>

              {/* Footer Info */}
              <div className="p-4 sm:p-5 bg-[#FAF4ED]/50 border-t border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B6058]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C1502E] shrink-0" />
                  <span>Real Python 3.12 WebAssembly runtime • Zero server latency • Instant feedback</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C7E72]">
                  <span>Module 1: Episode 3 Multi-Format Track</span>
                </div>
              </div>
            </div>
          )}

          {/* 3D Tab — Interactive Operator Machine */}
          {activeTab === "3d" && (
            <div className="w-full rounded-2xl bg-white border border-[#E6DCC8] shadow-xs overflow-hidden">
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF4ED]/40">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C1502E]" />
                  <span className="font-mono text-xs font-semibold text-[#2B2521]">
                    3D Operator Machine
                  </span>
                  <span className="text-[#A89F91]">•</span>
                  <span className="text-xs font-mono text-[#6B6058]">
                    WebGL · React Three Fiber
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] text-[#8C3A20] text-xs font-mono font-medium">
                  <Box className="w-3.5 h-3.5 text-[#C1502E]" />
                  <span>Live Scene</span>
                </span>
              </div>

              <OperatorMachine />

              {/* Footer */}
              <div className="p-4 sm:p-5 bg-[#FAF4ED]/50 border-t border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B6058]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C1502E] shrink-0" />
                  <span>Real-time 3D · WebGL · Trace-driven animation</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C7E72]">
                  <span>Module 1: Episode 3 · 3D Visualiser</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Lesson Key Takeaways Note Box */}
        <section className="bg-white rounded-2xl border border-[#E6DCC8] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#C1502E]" />
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2B2521]">
              Core Mental Models in This Episode
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">01 · Division</span>
              <h3 className="font-semibold text-[#2B2521]">Single vs. Double Slash</h3>
              <p className="text-[#6B6058] leading-relaxed">
                A single slash <code className="font-mono text-xs text-[#C1502E] font-bold">/</code> always produces a decimal (float). A double slash <code className="font-mono text-xs text-[#C1502E] font-bold">//</code> truncates and keeps only the whole-number part.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">02 · Remainder</span>
              <h3 className="font-semibold text-[#2B2521]">The Modulo Operator (%)</h3>
              <p className="text-[#6B6058] leading-relaxed">
                The percent sign <code className="font-mono text-xs text-[#C1502E] font-bold">%</code> computes the remainder after integer division — essential for cycles, clocks, and leftovers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">03 · Assignment</span>
              <h3 className="font-semibold text-[#2B2521]">Augmented Assignment (+=)</h3>
              <p className="text-[#6B6058] leading-relaxed">
                Writing <code className="font-mono text-xs text-[#C1502E] font-bold">x += y</code> is clean shorthand for <code className="font-mono text-xs text-[#C1502E] font-bold">x = x + y</code>: evaluate, add to the old value, and store back into the same box.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav
          aria-label="Episode navigation"
          className="pt-6 border-t border-[#E6DCC8] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Back to Quiz */}
          <Link
            href="/learn/module-1/quiz"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#E6DCC8] bg-white hover:bg-[#FAF4ED] text-sm font-medium text-[#2B2521] hover:text-[#C1502E] transition-all shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 text-[#6B6058] group-hover:text-[#C1502E] transition-transform group-hover:-translate-x-0.5" />
            <span>Previous: Quiz</span>
          </Link>

          {/* Next Episode 4 Placeholder */}
          <div
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/70 text-sm font-medium text-[#A89F91] cursor-not-allowed select-none"
            aria-disabled="true"
            title="Episode 4 will be available in the upcoming release"
          >
            <span>Next: Episode 4 (Data Types &amp; Comparisons)</span>
            <ArrowRight className="w-4 h-4 text-[#C5B8A5]" />
          </div>
        </nav>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

