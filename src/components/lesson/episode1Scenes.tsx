"use client";

import React from "react";
import { SceneItem } from "./NarratedVideoStage";
import { Sparkles } from "lucide-react";

/**
 * Scene 1 Visual: Asha avatar + speech bubble ("Meet Asha.")
 */
function MeetAshaVisual() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-lg w-full">
      {/* Asha Avatar */}
      <div className="flex flex-col items-center gap-1.5 shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#C1502E] to-[#E07A5F] flex items-center justify-center text-white shadow-warm border-2 border-white/80 dark:border-[#3D332B] relative">
          <svg viewBox="0 0 48 48" className="w-10 h-10 fill-current text-white/95" aria-hidden="true">
            <circle cx="24" cy="18" r="9" />
            <path d="M10 40 C10 30 16 28 24 28 C32 28 38 30 38 40 Z" />
          </svg>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#221C18]" />
        </div>
        <span className="text-xs font-semibold text-[var(--stage-text)]">Asha</span>
        <span className="text-[10px] font-mono text-[var(--stage-muted)]">Learner</span>
      </div>

      {/* Speech Bubble */}
      <div className="relative p-4 sm:p-5 rounded-2xl bg-[var(--stage-card)] border border-[var(--stage-border)] shadow-warm text-left">
        <div className="hidden sm:block absolute -left-2 top-6 w-4 h-4 rotate-45 bg-[var(--stage-card)] border-l border-b border-[var(--stage-border)]" />
        <p className="text-sm sm:text-base font-serif italic text-[var(--stage-text)] leading-relaxed">
          &ldquo;I&apos;ve never written a line of code. Let&apos;s see what happens.&rdquo;
        </p>
        <div className="mt-2 text-[10px] font-mono text-[var(--stage-muted)] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[var(--stage-accent)]" />
          <span>Curious second-year student with a laptop</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Scene 2 Visual: She types one line, Python runs it instantly
 */
function FirstLineVisual() {
  return (
    <div className="flex flex-col items-center justify-center gap-3.5 max-w-md w-full">
      {/* Code Editor Card */}
      <div className="w-full rounded-xl bg-[var(--stage-surface)] border border-[var(--stage-border)] shadow-warm overflow-hidden">
        {/* Header */}
        <div className="px-3.5 py-2 bg-[var(--stage-card)] border-b border-[var(--stage-border)] flex items-center justify-between text-xs text-[var(--stage-muted)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 font-mono text-[11px] font-medium text-[var(--stage-text)]">
              asha_first_line.py
            </span>
          </div>
          <span className="font-mono text-[10px]">python 3.12</span>
        </div>

        {/* Code Content */}
        <div className="p-4 font-mono text-sm sm:text-base text-left bg-[var(--stage-surface)]">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--stage-muted)] select-none">1</span>
            <span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">print</span>
              <span className="text-[var(--stage-muted)]">(</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                &quot;Scores analyzed!&quot;
              </span>
              <span className="text-[var(--stage-muted)]">)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Output Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-mono text-sm sm:text-base font-bold shadow-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>✨ Scores analyzed!</span>
      </div>

      <span className="text-[10px] font-mono text-[var(--stage-muted)]">
        instant feedback loop
      </span>
    </div>
  );
}

/**
 * 2 Scenes Definition for Episode 1 Story Mode
 * Starts directly at Asha's story:
 * 1. Meet Asha.
 * 2. She types one line. Python runs it instantly.
 */
export const episode1Scenes: SceneItem[] = [
  {
    id: "e1-scene-1",
    duration: 5000,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "Meet Asha.",
    caption:
      "She has three semesters of exam scores sitting in a spreadsheet. A senior suggested Python could automate her calculations in seconds.",
    visual: <MeetAshaVisual />,
  },
  {
    id: "e1-scene-2",
    duration: 5600,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "She types one line. Python runs it instantly.",
    caption:
      "She types `print(\"Scores analyzed!\")`, hits run, and watches the console print her message immediately. The loop has begun.",
    visual: <FirstLineVisual />,
  },
];
