"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  CheckCircle2,
  Box,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { QuizDemo } from "./showcase/QuizDemo";
import { DebugChallengeDemo } from "./showcase/DebugChallengeDemo";
import { VideoPlaceholderDemo } from "./showcase/VideoPlaceholderDemo";
import { KMeansDemo } from "./showcase/KMeansDemo";

export type ShowcaseTab = "challenge" | "quiz" | "3d" | "video";

interface TabItem {
  id: ShowcaseTab;
  label: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const TABS: TabItem[] = [
  {
    id: "challenge",
    label: "Try a challenge",
    badge: "Interactive Code",
    icon: Code2,
    description: "Debug a real machine learning data leakage defect in Python",
  },
  {
    id: "quiz",
    label: "Take a quiz",
    badge: "Conceptual Check",
    icon: CheckCircle2,
    description: "Test your intuition on validation hygiene with instant feedback",
  },
  {
    id: "3d",
    label: "Explore in 3D",
    badge: "Spatial Simulation",
    icon: Box,
    description: "Step through K-Means centroid migration in interactive 3D space",
  },
  {
    id: "video",
    label: "Watch a lesson",
    badge: "Bite-Sized Studio",
    icon: PlayCircle,
    description: "Preview our 3-5 minute visual-first video player shell",
  },
];

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("challenge");

  return (
    <section
      id="showcase"
      className="relative py-20 md:py-28 bg-[#FBF6EF] border-t border-[#E6DCC8] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-14">
          {/* Editorial Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-medium text-[#8C3A20] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C1502E]" />
            <span>Interactive Format Showcase</span>
          </div>

          {/* Section Heading in Serif Display */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.18]">
            See it for yourself.
          </h2>

          {/* Plain Language Intro Sentence */}
          <p className="text-base sm:text-lg text-[#6B6058] font-sans leading-relaxed max-w-2xl mx-auto">
            Theory is easy to claim. Here is how four of our core teaching
            formats actually feel when you interact with them.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div
          role="tablist"
          aria-label="Interactive format showcase options"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10"
        >
          {TABS.map((tab, tabIdx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    const nextIdx = (tabIdx + 1) % TABS.length;
                    setActiveTab(TABS[nextIdx].id);
                    document.getElementById(`tab-${TABS[nextIdx].id}`)?.focus();
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    const prevIdx = (tabIdx - 1 + TABS.length) % TABS.length;
                    setActiveTab(TABS[prevIdx].id);
                    document.getElementById(`tab-${TABS[prevIdx].id}`)?.focus();
                  }
                }}
                className={`flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-[#C1502E] text-white shadow-warm-sm hover:bg-[#A84224]"
                    : "bg-white/90 text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FAF4ED] border border-[#E6DCC8] shadow-xs"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-white" : "text-[#C1502E]"
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Description Pill */}
        <div className="text-center mb-6">
          <p className="text-xs sm:text-sm text-[#8C7E72] font-sans">
            {TABS.find((t) => t.id === activeTab)?.description}
          </p>
        </div>

        {/* Content Area: Only mount the selected format's component */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="w-full min-h-[580px] sm:min-h-[540px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {activeTab === "challenge" && <DebugChallengeDemo />}
              {activeTab === "quiz" && <QuizDemo />}
              {activeTab === "3d" && <KMeansDemo />}
              {activeTab === "video" && <VideoPlaceholderDemo />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
