"use client";

import React, { useState, useEffect } from "react";
import { SceneItem } from "./NarratedVideoStage";
import { ArrowRight, Sparkles, Check, Hash, Type, ToggleLeft, ListOrdered } from "lucide-react";

/**
 * Scene 1 Visual: Empty box with dashed border and "?" inside
 */
function Scene1Visual() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative w-36 h-32 sm:w-44 sm:h-36 rounded-2xl border-2 border-dashed border-[var(--stage-accent)] bg-[var(--stage-surface)]/70 flex flex-col items-center justify-center shadow-warm transition-transform duration-300 hover:scale-105">
        <span className="font-serif text-5xl sm:text-6xl font-bold text-[var(--stage-accent)] animate-pulse">
          ?
        </span>
        <span className="absolute -bottom-3 px-2.5 py-0.5 rounded-full bg-[var(--stage-card)] border border-[var(--stage-border)] text-[10px] font-mono text-[var(--stage-muted)] shadow-xs">
          empty memory slot
        </span>
      </div>
      <span className="text-xs font-mono text-[var(--stage-muted)] mt-1">
        unnamed &amp; unallocated
      </span>
    </div>
  );
}

/**
 * Scene 2 Visual: Code line `x = 5` next to a box labeled "x" with "5" dropping into it
 */
function Scene2Visual() {
  const [hasDropped, setHasDropped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasDropped(true), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 max-w-lg w-full">
      {/* Code Card */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--stage-card)] border border-[var(--stage-border)] shadow-xs font-mono text-sm sm:text-base">
        <span className="text-[var(--stage-muted)] select-none text-xs">1</span>
        <span className="font-bold text-[var(--stage-accent)]">x</span>
        <span className="text-[var(--stage-muted)] font-bold">=</span>
        <span className="font-bold text-amber-600 dark:text-amber-400">5</span>
      </div>

      {/* Assignment Arrow */}
      <div className="flex items-center gap-1 text-[var(--stage-accent)]">
        <span className="text-xs font-mono font-medium hidden sm:inline">store</span>
        <ArrowRight className="w-5 h-5 animate-pulse" />
      </div>

      {/* Box labeled "x" */}
      <div className="relative w-32 h-28 sm:w-36 sm:h-32 rounded-2xl border-2 border-[var(--stage-accent)] bg-[var(--stage-surface)] flex flex-col items-center justify-center shadow-warm">
        {/* Accent Tag Above Box */}
        <div className="absolute -top-3.5 px-3 py-0.5 rounded-md bg-[var(--stage-accent)] text-white font-mono text-xs font-bold shadow-xs flex items-center gap-1">
          <span>name:</span>
          <span className="underline">x</span>
        </div>

        {/* Dropping Value "5" */}
        <div
          className={`font-mono text-4xl sm:text-5xl font-bold text-amber-600 dark:text-amber-400 transition-all duration-500 transform ${
            hasDropped
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-8 opacity-0 scale-75"
          }`}
        >
          5
        </div>

        <span className="text-[10px] font-mono text-[var(--stage-muted)] mt-1">
          stored value
        </span>
      </div>
    </div>
  );
}

/**
 * Scene 3 Visual: Two stacked code lines (x=5 struck-through, x=10 current) with overwritten box animation
 */
function Scene3Visual() {
  const [phase, setPhase] = useState<"initial" | "transitioning" | "updated">("initial");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("transitioning"), 1400);
    const t2 = setTimeout(() => setPhase("updated"), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 max-w-lg w-full">
      {/* Two stacked code lines */}
      <div className="flex flex-col gap-2 p-3 rounded-xl bg-[var(--stage-card)] border border-[var(--stage-border)] shadow-xs w-full sm:w-auto font-mono text-xs sm:text-sm">
        {/* Line 1: x = 5 (old) */}
        <div className="flex items-center justify-between gap-3 px-2 py-1 rounded bg-[var(--stage-surface)]/50 border border-[var(--stage-border)]/50">
          <div className="flex items-center gap-2 line-through text-[var(--stage-muted)] opacity-60">
            <span className="text-[10px] text-[var(--stage-muted)]">1</span>
            <span>x = 5</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-red-500/80 bg-red-100 dark:bg-red-950/60 px-1.5 py-0.2 rounded">
            old
          </span>
        </div>

        {/* Line 2: x = 10 (current) */}
        <div className="flex items-center justify-between gap-3 px-2 py-1 rounded bg-[var(--stage-surface)] border border-[var(--stage-accent)]/40 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[var(--stage-muted)]">2</span>
            <span className="font-bold text-[var(--stage-accent)]">x = 10</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
            current
          </span>
        </div>
      </div>

      {/* Overwriting Box "x" */}
      <div className="relative w-32 h-28 sm:w-36 sm:h-32 rounded-2xl border-2 border-[var(--stage-accent)] bg-[var(--stage-surface)] flex flex-col items-center justify-center shadow-warm">
        {/* Tag above box */}
        <div className="absolute -top-3.5 px-3 py-0.5 rounded-md bg-[var(--stage-accent)] text-white font-mono text-xs font-bold shadow-xs">
          name: x
        </div>

        {/* Animated Value Swap */}
        <div className="relative h-12 flex items-center justify-center">
          {phase !== "updated" ? (
            <span
              className={`font-mono text-4xl font-bold text-amber-600 transition-all duration-400 ${
                phase === "transitioning"
                  ? "scale-50 opacity-0 -translate-y-4"
                  : "scale-100 opacity-100"
              }`}
            >
              5
            </span>
          ) : (
            <span className="font-mono text-4xl sm:text-5xl font-bold text-emerald-600 dark:text-emerald-400 animate-in zoom-in-75 duration-300">
              10
            </span>
          )}
        </div>

        {/* Overwrite notification badge */}
        <span
          className={`text-[10px] font-mono mt-1 px-1.5 py-0.5 rounded transition-all ${
            phase === "updated"
              ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-semibold"
              : "text-[var(--stage-muted)]"
          }`}
        >
          {phase === "updated" ? "overwritten ✓" : "holding 5"}
        </span>
      </div>
    </div>
  );
}

/**
 * Scene 4 Visual: 2x2 wrapping grid of 4 small cards with different types
 */
function Scene4Visual() {
  const cards = [
    {
      type: "Number",
      icon: Hash,
      code: "age = 25",
      accent: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900",
      badgeBg: "bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300",
    },
    {
      type: "Text",
      icon: Type,
      code: 'name = "Asha"',
      accent: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900",
      badgeBg: "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300",
    },
    {
      type: "True/False",
      icon: ToggleLeft,
      code: "is_done = True",
      accent: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900",
      badgeBg: "bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300",
    },
    {
      type: "List",
      icon: ListOrdered,
      code: "scores = [91, 88]",
      accent: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900",
      badgeBg: "bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl w-full">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={card.type}
            style={{ animationDelay: `${idx * 120}ms` }}
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 shadow-xs transition-transform duration-200 hover:scale-102 ${card.bg}`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`p-1.5 rounded-lg ${card.badgeBg}`}>
                <Icon className="w-4 h-4" />
              </span>
              <div className="text-left">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${card.accent}`}>
                  {card.type}
                </span>
                <div className="font-mono text-xs sm:text-sm font-semibold text-[var(--stage-text)] mt-0.5">
                  {card.code}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[var(--stage-muted)]">
              auto-typed
            </span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Scene 5 Visual: Asha avatar next to a speech bubble
 */
function Scene5Visual() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-lg w-full">
      {/* Asha Avatar */}
      <div className="flex flex-col items-center gap-1.5 shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#C1502E] to-[#E07A5F] flex items-center justify-center text-white shadow-warm border-2 border-white/80 dark:border-[#3D332B] relative">
          {/* Stylized Asha Portrait Icon */}
          <svg viewBox="0 0 48 48" className="w-10 h-10 fill-current text-white/95">
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
        {/* Pointer Triangle for speech bubble */}
        <div className="hidden sm:block absolute -left-2 top-6 w-4 h-4 rotate-45 bg-[var(--stage-card)] border-l border-b border-[var(--stage-border)]" />
        <p className="text-sm sm:text-base font-serif italic text-[var(--stage-text)] leading-relaxed">
          &ldquo;I know <span className="font-mono text-xs not-italic px-1.5 py-0.5 rounded bg-[var(--stage-code-bg)] text-[var(--stage-accent)] font-bold">print()</span> now. Let&apos;s give something a name this time.&rdquo;
        </p>
        <div className="mt-2 text-[10px] font-mono text-[var(--stage-muted)] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[var(--stage-accent)]" />
          <span>Ready to declare her first variable</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Scene 6 Visual: Asha's two lines code card with output pill
 */
function Scene6Visual() {
  return (
    <div className="flex flex-col items-center justify-center gap-3.5 max-w-md w-full">
      {/* Code Card titled "Asha's two lines" */}
      <div className="w-full rounded-xl bg-[var(--stage-surface)] border border-[var(--stage-border)] shadow-warm overflow-hidden">
        {/* Editor Window Header */}
        <div className="px-3.5 py-2 bg-[var(--stage-card)] border-b border-[var(--stage-border)] flex items-center justify-between text-xs text-[var(--stage-muted)]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 font-mono text-[11px] font-medium text-[var(--stage-text)]">
              Asha&apos;s two lines
            </span>
          </div>
          <span className="font-mono text-[10px]">python 3.12</span>
        </div>

        {/* Code Content */}
        <div className="p-4 font-mono text-sm sm:text-base text-left space-y-2 bg-[var(--stage-surface)]">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--stage-muted)] select-none">1</span>
            <span>
              <span className="text-[var(--stage-accent)] font-bold">score</span>{" "}
              <span className="text-[var(--stage-muted)]">=</span>{" "}
              <span className="text-amber-600 dark:text-amber-400 font-bold">92</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--stage-muted)] select-none">2</span>
            <span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">print</span>
              <span className="text-[var(--stage-muted)]">(</span>
              <span className="text-[var(--stage-accent)] font-bold">score</span>
              <span className="text-[var(--stage-muted)]">)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Output Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-mono text-sm sm:text-base font-bold shadow-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>→ 92</span>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-sans font-normal ml-1 border-l border-emerald-300 dark:border-emerald-800 pl-2">
          Retrieved from box &ldquo;score&rdquo;
        </span>
      </div>
    </div>
  );
}

/**
 * 7 Scenes Definition for Episode 2
 */
export const episode2Scenes: SceneItem[] = [
  {
    id: "scene-1",
    duration: 4600,
    eyebrow: "Episode 2 · Assign a value to a variable",
    headline: "Your code needs somewhere to keep things.",
    caption:
      "A score, a name, a total — once you calculate something, you need a place to put it so you can use it later.",
    visual: <Scene1Visual />,
  },
  {
    id: "scene-2",
    duration: 5600,
    eyebrow: "Episode 2 · Assign a value to a variable",
    headline: "A variable is just a labeled box.",
    caption:
      "`x = 5` puts the number 5 inside a box named `x`. The `=` doesn't mean \"equals\" here — it means \"store this.\"",
    visual: <Scene2Visual />,
  },
  {
    id: "scene-3",
    duration: 6200,
    eyebrow: "Episode 2 · Assign a value to a variable",
    headline: "Give it a new value — the old one's gone.",
    caption:
      "Variables can change — that's the whole point. Assign again, and the box's old value is simply overwritten.",
    visual: <Scene3Visual />,
  },
  {
    id: "scene-4",
    duration: 6000,
    eyebrow: "Episode 2 · Assign a value to a variable",
    headline: "The box doesn't care what's inside.",
    caption:
      "Python figures out the type on its own — numbers, text, yes/no values, even whole lists can live in a variable.",
    visual: <Scene4Visual />,
  },
  {
    id: "scene-5",
    duration: 4600,
    eyebrow: "Episode 2 · Assign a value to a variable",
    headline: "Meet Asha again.",
    caption:
      "She's about to store a number in a variable — then prove it's really there.",
    visual: <Scene5Visual />,
  },
  {
    id: "scene-6",
    duration: 5800,
    eyebrow: "Episode 2 · Assign a value to a variable",
    headline: "She writes two lines. Python remembers.",
    caption:
      "She never typed 92 into print() — she asked for the box named score, and Python opened it.",
    visual: <Scene6Visual />,
  },
  {
    id: "scene-7",
    duration: 6000,
    eyebrow: "Episode 2 · Assign a value to a variable",
    headline: "Your turn.",
    caption:
      "Episode 2 continues with your own sandbox — name a few boxes, fill them, and print what's inside.",
    cta: {
      text: "Start Episode 2 →",
      note: "This is a preview of the narrated intro — the real lesson is next.",
    },
  },
];
