"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight, Box, Terminal, Laptop, Compass } from "lucide-react";
import { LiveExecutionPanel } from "./LiveExecutionPanel";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function subscribeMounted(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("DOMContentLoaded", callback);
  return () => window.removeEventListener("DOMContentLoaded", callback);
}

function getMountedSnapshot() {
  return typeof window !== "undefined";
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const mounted = useSyncExternalStore(subscribeMounted, getMountedSnapshot, () => false);

  const headlineWords = ["Don't", "just", "read", "code.", "Watch", "it", "run."];

  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Asymmetric Left-Aligned Headline Block */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Eyebrow Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--zy-surface-2)] border border-[var(--zy-border)] text-xs font-mono font-medium text-[var(--zy-active-text)] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--zy-run)] animate-pulse" />
              <span className="tracking-wide uppercase text-[11px]">
                Python to machine learning, visualised
              </span>
            </div>

            {/* Headline with 80ms Staggered Slide-up from Mask */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[var(--zy-text)] tracking-tight leading-[1.08] text-balance">
              {headlineWords.map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block overflow-hidden mr-[0.24em] align-bottom pb-1"
                >
                  <span
                    className={`inline-block transition-transform duration-500 ease-out ${
                      mounted || reducedMotion
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0"
                    }`}
                    style={{
                      transitionDelay: reducedMotion ? "0ms" : `${idx * 80}ms`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Subheadline in Instrument Sans */}
            <p className="text-base sm:text-lg md:text-xl text-[var(--zy-muted)] font-sans leading-relaxed max-w-xl">
              Zyrix turns every concept into something you can see, step through
              and break on purpose. It runs in your browser, with nothing to
              install.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/learn/module-1/episode-1"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold bg-[var(--zy-active)] hover:bg-[var(--zy-active-hover)] text-[var(--zy-btn-text)] shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)] focus-visible:ring-offset-2"
              >
                <span>Run your first line</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <Link
                href="/how-we-teach"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-base font-medium bg-[var(--zy-surface)] hover:bg-[var(--zy-surface-2)] text-[var(--zy-text)] border border-[var(--zy-border)] shadow-xs transition-all duration-200 active:scale-98 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)] focus-visible:ring-offset-2"
              >
                <Compass className="w-4 h-4 text-[var(--zy-run)]" />
                <span>See how we teach</span>
              </Link>
            </div>

            {/* Terminal Status Tags */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-mono text-[var(--zy-muted)]">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--zy-surface)] border border-[var(--zy-border)]">
                <Box className="w-3.5 h-3.5 text-[var(--zy-run)]" />
                <span className="text-[var(--zy-text)]/90">Live 3D visuals</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--zy-surface)] border border-[var(--zy-border)]">
                <Terminal className="w-3.5 h-3.5 text-[var(--zy-active)]" />
                <span className="text-[var(--zy-text)]/90">Debug challenges</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--zy-surface)] border border-[var(--zy-border)]">
                <Laptop className="w-3.5 h-3.5 text-[var(--zy-run)]" />
                <span className="text-[var(--zy-text)]/90">Runs in your browser</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Execution Panel */}
          <div
            className={`lg:col-span-5 w-full transition-all duration-700 ease-out ${
              mounted || reducedMotion
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
            style={{
              transitionDelay: reducedMotion ? "0ms" : "260ms",
            }}
          >
            <LiveExecutionPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
