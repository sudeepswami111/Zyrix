"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layers, BookCheck, PlayCircle, ArrowRight } from "lucide-react";
import { ModuleData } from "@/lib/curriculumData";
import { TopicGroupRow } from "./TopicGroupRow";

interface ModuleCardProps {
  module: ModuleData;
  index: number;
  prefersReducedMotion: boolean;
}

export function ModuleCard({
  module,
  index,
  prefersReducedMotion,
}: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalConcepts = module.topicGroups.reduce(
    (acc, group) => acc + group.topics.length,
    0
  );

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 1, y: 16 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.4,
        delay: prefersReducedMotion ? 0 : Math.min(index * 0.06, 0.4),
      }}
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        isExpanded
          ? "border-[#C1502E] shadow-warm-md"
          : "border-[#E6DCC8] shadow-xs hover:border-[#D8CEBC] hover:shadow-warm"
      }`}
    >
      {/* Header Button Trigger (Entire header is clickable for ease of use) */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 sm:p-6 flex flex-col justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
        aria-expanded={isExpanded}
        aria-controls={`module-content-${module.number}`}
      >
        <div className="flex items-start justify-between gap-3 w-full">
          {/* Module Number & Title */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="shrink-0 w-8 h-8 rounded-lg bg-[#F1E2CF] border border-[#E6DCC8] text-[#8C3A20] font-mono text-xs font-bold flex items-center justify-center">
              {module.number}
            </span>
            <h3 className="text-base sm:text-lg font-semibold text-[#2B2521] tracking-tight group-hover:text-[#C1502E]">
              {module.title}
            </h3>
            {module.number === "01" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C1502E] text-white text-[10px] font-mono font-medium shadow-xs">
                <PlayCircle className="w-3 h-3 fill-current" />
                Episode 1 Available
              </span>
            )}
          </div>

          {/* Expand/Collapse Chevron Affordance */}
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
              isExpanded
                ? "bg-[#C1502E] border-[#C1502E] text-white rotate-180"
                : "bg-[#FAF4ED] border-[#E6DCC8] text-[#6B6058] hover:text-[#2B2521]"
            }`}
            aria-hidden="true"
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Module Description */}
        <p className="text-xs sm:text-sm text-[#6B6058] leading-relaxed">
          {module.description}
        </p>

        {/* Footer Summary Strip */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E6DCC8]/60 w-full text-xs text-[#6B6058]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>{module.topicGroups.length} topic groups</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BookCheck className="w-3.5 h-3.5 text-[#6B6058]" />
              <span>{totalConcepts}+ concepts</span>
            </span>
          </div>

          <span className="text-[11px] font-medium text-[#C1502E] hover:underline">
            {isExpanded ? "Hide breakdown" : "View breakdown"}
          </span>
        </div>
      </button>

      {/* Accordion Expandable Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`module-content-${module.number}`}
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { height: "auto", opacity: 1 }
                : { height: "auto", opacity: 1 }
            }
            exit={
              prefersReducedMotion
                ? { height: 0, opacity: 0 }
                : { height: 0, opacity: 0 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.28,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="overflow-hidden border-t border-[#E6DCC8] bg-[#FAF4ED]/30"
          >
            <div className="p-4 sm:p-5 space-y-3">
              {/* Highlight Banner for Episode 1 on Module 01 */}
              {module.number === "01" && (
                <div className="p-3.5 rounded-xl bg-white border border-[#C1502E]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C1502E] text-white flex items-center justify-center shrink-0">
                      <PlayCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#2B2521]">
                        Episode 01: What Is Python?
                      </div>
                      <div className="text-[11px] text-[#6B6058]">
                        Full studio video walkthrough + multi-format preview
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/learn/module-1/episode-1"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#C1502E] hover:bg-[#A84224] text-white text-xs font-medium transition-all shadow-xs shrink-0"
                  >
                    <span>Watch Episode 1</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C3A20] mb-2 flex items-center justify-between">
                <span>Detailed Syllabus Breakdown</span>
                <span className="font-mono text-[#6B6058] normal-case text-[10px]">
                  All formats included
                </span>
              </div>

              {module.topicGroups.map((group) => (
                <TopicGroupRow key={group.groupName} group={group} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
