"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { curriculumModules } from "@/lib/curriculumData";
import { ModuleCard } from "./curriculum/ModuleCard";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function CurriculumSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const totalGroups = curriculumModules.reduce(
    (acc, m) => acc + m.topicGroups.length,
    0
  );
  const totalConcepts = curriculumModules.reduce(
    (acc, m) =>
      acc + m.topicGroups.reduce((gAcc, g) => gAcc + g.topics.length, 0),
    0
  );

  return (
    <section
      id="curriculum"
      className="relative py-20 md:py-28 bg-[#FBF6EF] border-t border-[#E6DCC8] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-18">
          {/* Editorial Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-medium text-[#8C3A20] shadow-xs">
            <GraduationCap className="w-3.5 h-3.5 text-[#C1502E]" />
            <span>Complete Syllabus Structure</span>
          </div>

          {/* Section Heading in Serif Display */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.18]">
            Eight modules. Real depth.
          </h2>

          {/* Plain Language Intro Sentence */}
          <p className="text-base sm:text-lg text-[#6B6058] font-sans leading-relaxed max-w-2xl mx-auto">
            From Python fundamentals and vector calculus to deep neural networks and computer vision â€” explore every topic taught in the curriculum.
          </p>

          {/* Curriculum Global Stats Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-[#6B6058]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C1502E]" />
              <strong className="text-[#2B2521]">8</strong> Modules
            </span>
            <span className="text-[#E6DCC8]">â€¢</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C1502E]" />
              <strong className="text-[#2B2521]">{totalGroups}</strong> Topic Groups
            </span>
            <span className="text-[#E6DCC8]">â€¢</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C1502E]" />
              <strong className="text-[#2B2521]">{totalConcepts}+</strong> Key Concepts
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Grid (desktop: 2 columns, mobile: 1 column) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start">
          {curriculumModules.map((module, index) => (
            <ModuleCard
              key={module.number}
              module={module}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Bottom Callout & Sandbox Teaser */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 1, y: 15 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-14 max-w-3xl mx-auto p-6 rounded-2xl bg-white border border-[#E6DCC8] shadow-warm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div>
            <h4 className="text-base font-semibold text-[#2B2521]">
              Want to see these concepts in action?
            </h4>
            <p className="text-xs sm:text-sm text-[#6B6058] mt-1">
              Test out the live gradient descent visualizer in the sandbox above.
            </p>
          </div>
          <a
            href="#sandbox"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#C1502E] hover:bg-[#A84224] text-white shadow-xs transition-colors shrink-0"
          >
            <span>Jump to 3D Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}


