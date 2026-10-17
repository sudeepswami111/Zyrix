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
  Award,
} from "lucide-react";
import { PageBackground } from "@/components/PageBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LessonTabs, LessonTabId } from "@/components/lesson/LessonTabs";
import { NarratedVideoStage } from "@/components/lesson/NarratedVideoStage";
import { episode2Scenes } from "@/components/lesson/episode2Scenes";
import { StoryPreview } from "@/components/lesson/previews/StoryPreview";
import { SandboxPreview } from "@/components/lesson/previews/SandboxPreview";
import { QuizPreview } from "@/components/lesson/previews/QuizPreview";
import {
  EPISODE_2_STARTER_CODE,
  EPISODE_2_STORY_CHAPTERS,
  EPISODE_2_QUIZ_QUESTIONS,
} from "@/components/lesson/episode2Content";

export default function Episode2Page() {
  const [activeTab, setActiveTab] = useState<LessonTabId>("watch");

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
          <span className="font-mono text-[#C1502E] font-semibold">Episode 02</span>
        </nav>

        {/* Lesson Header */}
        <div className="space-y-3 border-b border-[#E6DCC8] pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-mono font-medium text-[#8C3A20]">
              <Layers className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>MODULE 1 · EPISODE 2 PREVIEW</span>
            </span>
            <span className="text-xs font-mono text-[#6B6058] bg-white/70 px-2.5 py-1 rounded-md border border-[#E6DCC8]">
              Lesson 2 of 8
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.18]">
            Assign a Value to a Variable
          </h1>

          <p className="text-base sm:text-lg text-[#6B6058] font-sans leading-relaxed max-w-3xl">
            A narrated-style walkthrough of the second lesson in Module 1. Press play, or step through it yourself.
          </p>
        </div>

        {/* Four Format Tabs */}
        <section aria-label="Lesson learning formats" className="w-full">
          <LessonTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabOverrides={{
              watch: {
                badge: "7 Scenes",
                isAvailable: true,
                description:
                  "Narrated video stage: Step through 7 full-bleed explainer scenes with speech synthesis and auto-pacing",
              },
              story: {
                badge: undefined,
                isAvailable: true,
                description:
                  "Follow Asha's journey in 'A Name for Everything' - 3 chapters on naming variables and overwriting memory",
              },
              sandbox: {
                badge: undefined,
                isAvailable: true,
                description:
                  "Real in-browser Python 3.12 sandbox - declare variables, reassign scores, and inspect memory live",
              },
              quiz: {
                badge: undefined,
                isAvailable: true,
                description:
                  "10-question scored knowledge check on Python assignment semantics, dynamic typing, and naming rules",
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
          {/* Format 1: Watch (Narrated Video Stage Card with 16:10 aspect ratio) */}
          {activeTab === "watch" && (
            <NarratedVideoStage
              title="Assign a Value to a Variable"
              kicker="Module 1 · Episode 2 preview"
              subtitle="A narrated-style walkthrough of the second lesson in Module 1. Press play, or step through it yourself."
              scenes={episode2Scenes}
              onCtaClick={() => {
                // When CTA is clicked, switch to Sandbox tab for the interactive lesson
                setActiveTab("sandbox");
              }}
            />
          )}

          {/* Format 2: Story (Worked-Example Story) */}
          {activeTab === "story" && (
            <div className="w-full bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden flex flex-col transition-all duration-200">
              {/* Top Meta Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-[#FAF4ED]/80 border-b border-[#E6DCC8] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C1502E] animate-pulse" />
                  <span className="font-semibold text-[#2B2521]">Asha&apos;s Worked Example: The Labeled Box</span>
                  <span className="text-[#A89F91]">·</span>
                  <span className="font-mono text-[#6B6058]">3 Chapter Scenes</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C3A20] bg-[#F1E2CF] px-2.5 py-0.5 rounded-full border border-[#E6DCC8]">
                  <span>~3 min read</span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6 sm:p-8">
                <StoryPreview chapters={EPISODE_2_STORY_CHAPTERS} />
              </div>
            </div>
          )}

          {/* Format 3: Sandbox (Real In-Browser Pyodide Playground) */}
          {activeTab === "sandbox" && (
            <div className="w-full bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden flex flex-col transition-all duration-200">
              {/* Top Meta Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-[#FAF4ED]/80 border-b border-[#E6DCC8] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C1502E] animate-pulse" />
                  <span className="font-semibold text-[#2B2521]">Interactive Python 3.12 Sandbox</span>
                  <span className="text-[#A89F91]">·</span>
                  <span className="font-mono text-[#6B6058]">Live Pyodide WASM Runtime</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] text-[#8C3A20] font-mono text-[11px] font-semibold border border-[#E6DCC8] shadow-xs">
                    <Sparkles className="w-3 h-3 text-[#C1502E]" />
                    <span>Real In-Browser Execution</span>
                  </span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C1502E] mb-2">
                    <span>LIVE CODE PLAYGROUND</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] tracking-tight mb-2">
                    Experiment with Variables &amp; Reassignment
                  </h3>
                  <p className="text-sm sm:text-base text-[#6B6058] leading-relaxed font-sans">
                    Declare your own variables, overwrite old values, and see Python update references in real time without any server roundtrips.
                  </p>
                </div>

                {/* Embedded Real Pyodide Sandbox */}
                <div className="w-full rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/60 p-4 sm:p-6 overflow-hidden">
                  <SandboxPreview initialCode={EPISODE_2_STARTER_CODE} />
                </div>
              </div>

              {/* Footer Bar */}
              <div className="p-4 sm:p-5 bg-[#FAF4ED]/50 border-t border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B6058]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C1502E] shrink-0" />
                  <span>Real Python 3.12 WebAssembly runtime · Zero server latency · Instant execution</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C7E72]">
                  <span>Module 1: Episode 2 Multi-Format Track</span>
                </div>
              </div>
            </div>
          )}

          {/* Format 4: Quiz (Real 10-Question Scored Quiz) */}
          {activeTab === "quiz" && (
            <div className="w-full bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden flex flex-col transition-all duration-200">
              {/* Top Meta Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-[#FAF4ED]/80 border-b border-[#E6DCC8] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C1502E] animate-pulse" />
                  <span className="font-semibold text-[#2B2521]">Episode 2 Mastery Quiz</span>
                  <span className="text-[#A89F91]">·</span>
                  <span className="font-mono text-[#6B6058]">10 Questions</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] text-[#8C3A20] font-mono text-[11px] font-semibold border border-[#E6DCC8] shadow-xs">
                    <Award className="w-3 h-3 text-[#C1502E]" />
                    <span>100 Points Total</span>
                  </span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C1502E] mb-2">
                    <span>KNOWLEDGE RETRIEVAL</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] tracking-tight mb-2">
                    Test Your Variable Assignment Intuition
                  </h3>
                  <p className="text-sm sm:text-base text-[#6B6058] leading-relaxed font-sans">
                    Test your understanding of the single equals sign, name rebinding, quotes vs variable names, and dynamic typing.
                  </p>
                </div>

                {/* Embedded Real 10-Question Scored Quiz */}
                <div className="w-full rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/60 p-4 sm:p-6 overflow-hidden">
                  <QuizPreview questions={EPISODE_2_QUIZ_QUESTIONS} quizTitle="Episode 2: Variable Assignment Quiz" />
                </div>
              </div>

              {/* Footer Info */}
              <div className="p-4 sm:p-5 bg-[#FAF4ED]/50 border-t border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B6058]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C1502E] shrink-0" />
                  <span>10 points per question · 100 points maximum · Instant explanations on every attempt</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C7E72]">
                  <span>Module 1: Episode 2 Multi-Format Track</span>
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
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">01 · Metaphor</span>
              <h3 className="font-semibold text-[#2B2521]">The Labeled Box</h3>
              <p className="text-[#6B6058] leading-relaxed">
                A variable is just a name tag pointing to an object in memory. You don&apos;t store data in the label itself; the label references the data.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">02 · Semantics</span>
              <h3 className="font-semibold text-[#2B2521]">The &ldquo;=&rdquo; Store Command</h3>
              <p className="text-[#6B6058] leading-relaxed">
                In Python, <code className="font-mono text-xs text-[#C1502E] font-bold">=</code> does not mean algebraic equality. It evaluates the right-hand expression and stores it into the left-hand name.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">03 · Reassignment</span>
              <h3 className="font-semibold text-[#2B2521]">Overwriting References</h3>
              <p className="text-[#6B6058] leading-relaxed">
                When you assign a new value to an existing variable, the old value is disconnected and replaced. Variables can hold any data type at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav
          aria-label="Episode navigation"
          className="pt-6 border-t border-[#E6DCC8] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Back to Episode 1 */}
          <Link
            href="/learn/module-1/episode-1"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#E6DCC8] bg-white hover:bg-[#FAF4ED] text-sm font-medium text-[#2B2521] hover:text-[#C1502E] transition-all shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 text-[#6B6058] group-hover:text-[#C1502E] transition-transform group-hover:-translate-x-0.5" />
            <span>Previous: Episode 1 (What Is Python?)</span>
          </Link>

          {/* Next Episode 3 Link */}
          <div
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/70 text-sm font-medium text-[#A89F91] cursor-not-allowed select-none"
            aria-disabled="true"
            title="Episode 3 will be available in the next release"
          >
            <span>Next: Episode 3 (Data Types &amp; Operations)</span>
            <ArrowRight className="w-4 h-4 text-[#C5B8A5]" />
          </div>
        </nav>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
