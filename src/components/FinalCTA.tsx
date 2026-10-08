"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function FinalCTA() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative py-20 md:py-28 bg-[#FAF4ED] border-t border-b border-[#E6DCC8] overflow-hidden">
      {/* Subtle Warm Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#E6DCC8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 1, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-medium text-[#8C3A20] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C1502E]" />
            <span>Begin Your Journey Today</span>
          </div>

          {/* Display Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.14] max-w-3xl mx-auto">
            Every concept, taught the way it actually makes sense.
          </h2>

          {/* Supporting Subhead */}
          <p className="text-base sm:text-lg text-[#6B6058] font-sans leading-relaxed max-w-2xl mx-auto">
            Stop struggling with disconnected math proofs and passive videos.
            Experience intuitive 3D simulations, hands-on code challenges, and
            step-by-step conceptual mastery today.
          </p>

          {/* Static Parabolic Gradient Descent Visual Motif */}
          <div className="py-4 flex justify-center">
            <div className="w-48 h-16 relative">
              <svg
                viewBox="0 0 200 60"
                className="w-full h-full stroke-current text-[#C1502E]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Smooth Parabolic Loss Contour Curve */}
                <path
                  d="M10,8 Q100,56 190,8"
                  stroke="#E07A5F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M40,16 Q100,52 160,16"
                  stroke="#D97706"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                {/* Gradient descent step nodes */}
                <circle cx="28" cy="12" r="3.5" fill="#E07A5F" />
                <circle cx="58" cy="28" r="3" fill="#D97706" />
                <circle cx="82" cy="40" r="3" fill="#F59E0B" />
                <circle cx="100" cy="44" r="4.5" fill="#C1502E" />
                {/* Minimum indicator star/ring */}
                <circle cx="100" cy="44" r="7" stroke="#C1502E" strokeWidth="1.5" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-white text-sm sm:text-base font-sans font-medium shadow-warm-md hover:shadow-warm-lg transition-all duration-200 cursor-pointer active:scale-98 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
            >
              <span>Start Module 1 Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#curriculum"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF4ED] text-[#2B2521] border border-[#E6DCC8] text-sm sm:text-base font-sans font-medium shadow-xs transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
            >
              <span>Explore the Curriculum</span>
            </a>
          </div>

          {/* Reassurance Guarantee */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-[#8C7E72]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C1502E]" />
              Free access to Modules 1â€“3
            </span>
            <span className="text-[#E6DCC8]">â€¢</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C1502E]" />
              No credit card required
            </span>
            <span className="text-[#E6DCC8]">â€¢</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C1502E]" />
              Runs entirely in your modern browser
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


