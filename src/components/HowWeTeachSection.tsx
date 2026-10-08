"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers } from "lucide-react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { FormatCard } from "./formats/FormatCard";
import { Viz3DPreview } from "./formats/previews/Viz3DPreview";
import { AnimationPreview } from "./formats/previews/AnimationPreview";
import { DebugPreview } from "./formats/previews/DebugPreview";
import { StorytellingPreview } from "./formats/previews/StorytellingPreview";
import { QuizPreview } from "./formats/previews/QuizPreview";
import { AITutorPreview } from "./formats/previews/AITutorPreview";
import { VideoPreview } from "./formats/previews/VideoPreview";

export function HowWeTeachSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const formats = [
    {
      title: "3D Visualization",
      matchedFor: "Spatial & Mathematical Concepts",
      description:
        "Inspect multidimensional loss surfaces, rotate vector spaces, and watch kernels bend geometries.",
      preview: <Viz3DPreview />,
      accentBadge: "Format 01",
      gridSpan: "lg:col-span-4",
    },
    {
      title: "Process Animation",
      matchedFor: "Processes with Moving State",
      description:
        "Follow token flow, activation cascades, and parameter updates step by step as state evolves.",
      preview: <AnimationPreview />,
      accentBadge: "Format 02",
      gridSpan: "lg:col-span-4",
    },
    {
      title: "Debug Challenges",
      matchedFor: "Judgment & Error Analysis",
      description:
        "Identify sneaky data leaks, diagnose exploding gradients, and fix real failing model pipelines.",
      preview: <DebugPreview />,
      accentBadge: "Format 03",
      gridSpan: "lg:col-span-4",
    },
    {
      title: "Worked-Example Stories",
      matchedFor: "End-to-End Workflows",
      description:
        "Follow one continuous dataset from messy CSV ingestion through feature engineering to deployment.",
      preview: <StorytellingPreview />,
      accentBadge: "Format 04",
      gridSpan: "lg:col-span-3",
    },
    {
      title: "Quizzes & Sandboxes",
      matchedFor: "Syntax & Instant Recall",
      description:
        "Lock in API specifics and statistical definitions with rapid, low-friction recall exercises.",
      preview: <QuizPreview />,
      accentBadge: "Format 05",
      gridSpan: "lg:col-span-3",
    },
    {
      title: "In-Context AI Tutor",
      matchedFor: "Unblocking 'Why' Questions",
      description:
        "Instant conceptual answers grounded in your exact notebook state the moment loss turns to NaN.",
      preview: <AITutorPreview />,
      accentBadge: "Format 06",
      gridSpan: "lg:col-span-3",
    },
    {
      title: "Short Narrated Video",
      matchedFor: "Orientation & Guided Pacing",
      description:
        "Focused 3-minute visual walkthroughs that frame core intuition before you write a single line.",
      preview: <VideoPreview />,
      accentBadge: "Format 07",
      gridSpan: "lg:col-span-3 md:col-span-2",
    },
  ];

  return (
    <section
      id="how-we-teach"
      className="relative py-20 md:py-28 bg-[#FBF6EF] border-t border-[#E6DCC8] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-18">
          {/* Editorial Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-medium text-[#8C3A20] shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#C1502E]" />
            <span>The Format-Matching Philosophy</span>
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.18]">
            Seven ways to actually understand it.
          </h2>

          {/* Plain Language Intro Sentence */}
          <p className="text-base sm:text-lg text-[#6B6058] font-sans leading-relaxed max-w-2xl mx-auto">
            We don&apos;t force every topic into the same format â€” here&apos;s how we choose the right medium for every single concept.
          </p>
        </div>

        {/* 7 Formats Balanced Responsive Grid (Row 1: 3 cards, Row 2: 4 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {formats.map((format, index) => (
            <div key={format.title} className={format.gridSpan}>
              <FormatCard
                title={format.title}
                matchedFor={format.matchedFor}
                description={format.description}
                preview={format.preview}
                accentBadge={format.accentBadge}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>

        {/* Bottom Takeaway Callout */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 1, y: 15 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-14 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#FAF4ED] border border-[#E6DCC8] flex items-center justify-center gap-3 text-center text-xs sm:text-sm text-[#6B6058]"
        >
          <Sparkles className="w-4 h-4 text-[#C1502E] shrink-0" />
          <span>
            No single medium fits every brain or topic. By matching each idea to its ideal format, confusion drops and real mathematical intuition sticks.
          </span>
        </motion.div>
      </div>
    </section>
  );
}


