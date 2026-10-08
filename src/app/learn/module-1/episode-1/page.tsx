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
  BookOpen,
  Clock,
  Terminal,
  Award,
} from "lucide-react";
import { PageBackground } from "@/components/PageBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LessonTabs, LessonTabId } from "@/components/lesson/LessonTabs";
import { VideoPlayer } from "@/components/lesson/VideoPlayer";
import { StoryPreview } from "@/components/lesson/previews/StoryPreview";
import { SandboxPreview } from "@/components/lesson/previews/SandboxPreview";
import { QuizPreview } from "@/components/lesson/previews/QuizPreview";

export default function Episode1Page() {
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
          <span className="font-mono text-[#C1502E] font-semibold">Episode 01</span>
        </nav>

        {/* Lesson Header */}
        <div className="space-y-3 border-b border-[#E6DCC8] pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-mono font-medium text-[#8C3A20]">
              <Layers className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>MODULE 1 • FOUNDATIONS</span>
            </span>
            <span className="text-xs font-mono text-[#6B6058] bg-white/70 px-2.5 py-1 rounded-md border border-[#E6DCC8]">
              Lesson 1 of 8
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.18]">
            What Is Python?
          </h1>

          <p className="text-base sm:text-lg text-[#6B6058] font-sans leading-relaxed max-w-3xl">
            Unpack Python&apos;s mental model: dynamic typing, memory references, bytecode compilation, and why its syntax mirrors human thought.
          </p>
        </div>

        {/* Four Format Tabs (All tabs are now live on Episode 1 with no 'Coming soon' badges) */}
        <section aria-label="Lesson learning formats" className="w-full">
          <LessonTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabOverrides={{
              story: {
                badge: undefined,
                isAvailable: true,
                description:
                  "Follow Asha's journey in 'Asha's First Line' — a 3-chapter worked example from spreadsheet to code",
              },
              sandbox: {
                badge: undefined,
                isAvailable: true,
                description:
                  "Real in-browser Python 3.12 sandbox — run Asha's first line of code and experiment live",
              },
              quiz: {
                badge: undefined,
                isAvailable: true,
                description:
                  "10-question scored knowledge check on Python's core mental model and developer loop",
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
          {/* Format 1: Watch (Real HTML5 Video) */}
          {activeTab === "watch" && (
            <VideoPlayer
              src="/videos/module-1/episode-1-what-is-python.mp4"
              poster="/videos/module-1/poster.svg"
              title="What Is Python?"
              moduleName="Module 1: Basic Python Programming"
              episodeNumber="Episode 01"
            />
          )}

          {/* Format 2: Story (Interactive 3-Chapter Reader) */}
          {activeTab === "story" && (
            <div className="w-full bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden flex flex-col transition-all duration-200">
              {/* Top Meta Bar */}
              <div className="px-4 sm:px-6 py-3.5 bg-[#FAF4ED]/80 border-b border-[#E6DCC8] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C1502E]" />
                  <span className="font-semibold text-[#2B2521]">Asha&apos;s First Line</span>
                  <span className="text-[#A89F91]">•</span>
                  <span className="font-mono text-[#6B6058]">Worked-Example Story</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] text-[#8C3A20] font-mono text-[11px] font-semibold border border-[#E6DCC8] shadow-xs">
                    <BookOpen className="w-3 h-3 text-[#C1502E]" />
                    <span>3 Chapters</span>
                  </span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C1502E] mb-2">
                    <span>WORKED-EXAMPLE STORY</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] tracking-tight mb-2">
                    Asha&apos;s First Line
                  </h3>
                  <p className="text-sm sm:text-base text-[#6B6058] leading-relaxed font-sans">
                    Follow Asha as she learns Python from scratch — a worked example you&apos;ll follow across every lesson in this module.
                  </p>
                </div>

                {/* Embedded 3-Chapter Interactive Story Reader */}
                <div className="w-full rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/60 p-4 sm:p-6 overflow-hidden">
                  <StoryPreview />
                </div>
              </div>

              {/* Footer Info */}
              <div className="p-4 sm:p-5 bg-[#FAF4ED]/50 border-t border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B6058]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C1502E] shrink-0" />
                  <span>3-minute read • Interactive chapter reader</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C7E72]">
                  <span>Module 1: Episode 1 Multi-Format Track</span>
                </div>
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
                  <span className="font-semibold text-[#2B2521]">Interactive Python Sandbox</span>
                  <span className="text-[#A89F91]">•</span>
                  <span className="font-mono text-[#6B6058]">Python 3.12 (Wasm)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] text-[#8C3A20] font-mono text-[11px] font-semibold border border-[#E6DCC8] shadow-xs">
                    <Terminal className="w-3 h-3 text-[#C1502E]" />
                    <span>Live Playground</span>
                  </span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C1502E] mb-2">
                    <span>INTERACTIVE SANDBOX</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] tracking-tight mb-2">
                    Run Asha&apos;s First Line
                  </h3>
                  <p className="text-sm sm:text-base text-[#6B6058] leading-relaxed font-sans">
                    Experiment with Python directly in your browser. Edit the code, hit Run, and watch real Python execute via in-browser WebAssembly.
                  </p>
                </div>

                {/* Embedded Real Pyodide Sandbox Playground */}
                <div className="w-full rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/60 p-4 sm:p-6 overflow-hidden">
                  <SandboxPreview />
                </div>
              </div>

              {/* Footer Info */}
              <div className="p-4 sm:p-5 bg-[#FAF4ED]/50 border-t border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B6058]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C1502E] shrink-0" />
                  <span>Real Python 3.12 WebAssembly runtime • Zero server latency • Instant feedback</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C7E72]">
                  <span>Module 1: Episode 1 Multi-Format Track</span>
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
                  <span className="font-semibold text-[#2B2521]">Episode 1 Mastery Quiz</span>
                  <span className="text-[#A89F91]">•</span>
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
                    Test Your Episode 1 Intuition
                  </h3>
                  <p className="text-sm sm:text-base text-[#6B6058] leading-relaxed font-sans">
                    Reinforce Python syntax, the print() function, and Asha&apos;s first loop with fast retrieval practice and immediate feedback.
                  </p>
                </div>

                {/* Embedded Real 10-Question Scored Quiz */}
                <div className="w-full rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/60 p-4 sm:p-6 overflow-hidden">
                  <QuizPreview />
                </div>
              </div>

              {/* Footer Info */}
              <div className="p-4 sm:p-5 bg-[#FAF4ED]/50 border-t border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B6058]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C1502E] shrink-0" />
                  <span>10 points per question • 100 points maximum • Instant explanations on every attempt</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C7E72]">
                  <span>Module 1: Episode 1 Multi-Format Track</span>
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
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">01 • Execution</span>
              <h3 className="font-semibold text-[#2B2521]">Bytecode + Virtual Machine</h3>
              <p className="text-[#6B6058] leading-relaxed">
                Python compiles source code to bytecode (.pyc) which the CPython VM interprets instruction by instruction.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">02 • Memory Model</span>
              <h3 className="font-semibold text-[#2B2521]">Names as Sticky Labels</h3>
              <p className="text-[#6B6058] leading-relaxed">
                Variables never hold raw data; they hold reference pointers to objects floating in heap memory.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-[#C1502E] uppercase">03 • Typing System</span>
              <h3 className="font-semibold text-[#2B2521]">Dynamic &amp; Strongly Typed</h3>
              <p className="text-[#6B6058] leading-relaxed">
                Types belong to objects, not variable names. Python will never implicitly coerce mismatched types unpredictably.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav
          aria-label="Episode navigation"
          className="pt-6 border-t border-[#E6DCC8] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Back to Curriculum */}
          <Link
            href="/#curriculum"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#E6DCC8] bg-white hover:bg-[#FAF4ED] text-sm font-medium text-[#2B2521] hover:text-[#C1502E] transition-all shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 text-[#6B6058] group-hover:text-[#C1502E] transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Curriculum</span>
          </Link>

          {/* Next Episode Link */}
          <div
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/70 text-sm font-medium text-[#A89F91] cursor-not-allowed select-none"
            aria-disabled="true"
            title="Episode 2 will be available in the next release"
          >
            <span>Next: Episode 2 (Variables &amp; Mutability)</span>
            <ArrowRight className="w-4 h-4 text-[#C5B8A5]" />
          </div>
        </nav>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
