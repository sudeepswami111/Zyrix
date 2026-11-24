"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 bg-[var(--zy-surface)] border-t border-b border-[var(--zy-border)] overflow-hidden transition-colors duration-300">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal className="space-y-6">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--zy-surface-2)] border border-[var(--zy-border)] text-xs font-mono font-medium text-[var(--zy-active-text)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--zy-active)]" />
            <span className="tracking-wide uppercase text-[11px]">Begin Your Journey Today</span>
          </div>

          {/* Display Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--zy-text)] tracking-tight leading-[1.12] max-w-3xl mx-auto text-balance">
            Every concept, taught the way it actually makes sense.
          </h2>

          {/* Supporting Subhead */}
          <p className="text-base sm:text-lg text-[var(--zy-muted)] font-sans leading-relaxed max-w-2xl mx-auto">
            Stop struggling with disconnected math proofs and passive videos.
            Experience intuitive 3D simulations, hands-on code challenges, and
            step-by-step conceptual mastery today.
          </p>

          {/* Static Parabolic Gradient Descent Visual Motif */}
          <div className="py-4 flex justify-center" aria-hidden="true">
            <div className="w-52 h-16 relative">
              <svg
                viewBox="0 0 200 60"
                className="w-full h-full stroke-current"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Smooth Parabolic Loss Contour Curve */}
                <path
                  d="M10,8 Q100,56 190,8"
                  stroke="var(--zy-run)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M40,16 Q100,52 160,16"
                  stroke="var(--zy-active)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                {/* Gradient descent step nodes */}
                <circle cx="28" cy="12" r="3.5" fill="var(--zy-run)" />
                <circle cx="58" cy="28" r="3" fill="var(--zy-active)" />
                <circle cx="82" cy="40" r="3" fill="var(--zy-active)" />
                <circle cx="100" cy="44" r="4.5" fill="var(--zy-run)" />
                {/* Minimum indicator star/ring */}
                <circle cx="100" cy="44" r="7" stroke="var(--zy-active)" strokeWidth="1.5" opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/learn/module-1/episode-1"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--zy-active)] hover:bg-[var(--zy-active-hover)] text-[var(--zy-btn-text)] text-sm sm:text-base font-sans font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-98 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)] focus-visible:ring-offset-2"
            >
              <span>Start Module 1 Free</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>

            <Link
              href="/curriculum"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--zy-surface-2)] hover:bg-[var(--zy-surface-elevated)] text-[var(--zy-text)] border border-[var(--zy-border)] text-sm sm:text-base font-sans font-medium shadow-xs transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)] focus-visible:ring-offset-2"
            >
              <span>Explore the Curriculum</span>
            </Link>
          </div>

          {/* Reassurance Guarantee */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[var(--zy-muted)]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--zy-run)]" />
              Free access to Modules 1–3
            </span>
            <span className="text-[var(--zy-border)]">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--zy-run)]" />
              Zero installation needed
            </span>
            <span className="text-[var(--zy-border)]">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--zy-run)]" />
              Real in-browser Python
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
