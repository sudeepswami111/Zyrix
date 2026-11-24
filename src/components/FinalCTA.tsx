"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-[var(--zy-surface)] border-t border-[var(--zy-border)] overflow-hidden">
      {/* Background Decorative Radial Gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255, 170, 69, 0.15) 0%, rgba(37, 184, 165, 0.08) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--zy-surface-2)] border border-[var(--zy-border)] text-xs font-mono font-medium text-[var(--zy-text)] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FFAA45]" />
          <span>Begin Your Technical Journey</span>
        </div>

        {/* Display Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--zy-text)] tracking-tight leading-[1.1] text-balance">
          Your Journey Into Technology Starts Here.
        </h2>

        {/* Supporting Subhead */}
        <p className="text-base sm:text-lg md:text-xl text-[var(--zy-muted)] font-sans leading-relaxed max-w-2xl mx-auto text-balance">
          Join thousands of learners building real intuition from their very first
          line of code. No prerequisites, no setup, no credit card required.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/learn/module-1/episode-1"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFAA45] hover:bg-[#E68522] text-[#17191F] text-base font-sans font-semibold shadow-[0_2px_12px_rgba(255,170,69,0.3)] hover:shadow-[0_4px_20px_rgba(255,170,69,0.4)] transition-all duration-200 cursor-pointer active:scale-98"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>

          <Link
            href="/curriculum"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[var(--zy-surface-2)] hover:bg-[var(--zy-border)] text-[var(--zy-text)] border border-[var(--zy-border)] text-base font-sans font-medium shadow-2xs transition-all duration-200 cursor-pointer active:scale-98"
          >
            <span>Explore Curriculum</span>
          </Link>
        </div>

        {/* Reassurance Guarantee */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[var(--zy-muted)]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#25B8A5]" />
            Free Essential Foundations
          </span>
          <span className="hidden sm:inline text-[var(--zy-border)]">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#FFAA45]" />
            Instant In-Browser Execution
          </span>
          <span className="hidden sm:inline text-[var(--zy-border)]">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#25B8A5]" />
            Zero Credit Card Required
          </span>
        </div>
      </div>
    </section>
  );
}
