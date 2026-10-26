"use client";

import React from "react";
import { SceneItem } from "./NarratedVideoStage";
import {
  Camera,
  Play,
  Mail,
  Sparkles,
  ArrowRight,
  Code2,
  Terminal,
  Zap,
  CheckCircle2,
} from "lucide-react";

/**
 * Scene 1 Visual: Row of app icon tiles (Instagram, Bank, Netflix/Play, Mail)
 */
function Scene1Visual() {
  const apps = [
    {
      name: "Instagram",
      icon: Camera,
      bg: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white",
      tag: "Social",
    },
    {
      name: "Bank",
      symbol: "₹",
      bg: "bg-gradient-to-tr from-emerald-600 to-teal-700 text-white",
      tag: "Finance",
    },
    {
      name: "Netflix",
      icon: Play,
      bg: "bg-gradient-to-tr from-red-600 to-rose-900 text-white",
      tag: "Stream",
    },
    {
      name: "Mail",
      icon: Mail,
      bg: "bg-gradient-to-tr from-blue-500 to-indigo-600 text-white",
      tag: "Inbox",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-3.5 max-w-lg w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.name}
              className="p-3 sm:p-3.5 rounded-2xl bg-[var(--stage-surface)] border border-[var(--stage-border)] shadow-xs flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-xs text-base sm:text-lg font-bold font-mono ${app.bg}`}
              >
                {Icon ? <Icon className="w-5 h-5" /> : app.symbol}
              </div>
              <div className="text-center">
                <span className="block text-xs font-semibold text-[var(--stage-text)]">
                  {app.name}
                </span>
                <span className="block text-[9px] font-mono text-[var(--stage-muted)]">
                  {app.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <span className="px-3 py-1 rounded-full bg-[var(--stage-card)] border border-[var(--stage-border)] text-[10px] font-mono text-[var(--stage-muted)] shadow-xs">
        all powered by lines of code
      </span>
    </div>
  );
}

/**
 * Scene 2 Visual: Python at the center, orbited by JS / Java / C++
 */
function Scene2Visual() {
  const peers = [
    { name: "JavaScript", role: "Websites", color: "border-amber-400 text-amber-600 dark:text-amber-400" },
    { name: "Java", role: "Enterprise", color: "border-blue-400 text-blue-600 dark:text-blue-400" },
    { name: "C++", role: "Systems", color: "border-purple-400 text-purple-600 dark:text-purple-400" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-3.5 max-w-lg w-full">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
        {/* Orbiting Languages */}
        {peers.map((p) => (
          <div
            key={p.name}
            className="px-3.5 py-2 rounded-xl bg-[var(--stage-card)] border border-[var(--stage-border)] shadow-xs flex items-center gap-2"
          >
            <span className={`w-2 h-2 rounded-full border-2 ${p.color}`} />
            <div className="text-left">
              <span className="text-xs font-semibold text-[var(--stage-text)]">
                {p.name}
              </span>
              <span className="block text-[9px] font-mono text-[var(--stage-muted)]">
                {p.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Python Hero Card */}
      <div className="relative px-6 py-3.5 rounded-2xl border-2 border-[var(--stage-accent)] bg-[var(--stage-surface)] flex items-center gap-3 shadow-warm">
        <div className="w-9 h-9 rounded-xl bg-[var(--stage-accent)] text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
          py
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-base sm:text-lg font-bold text-[var(--stage-text)]">
              Python
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase bg-[var(--stage-accent-light)] text-[var(--stage-accent)]">
              #1 for learners
            </span>
          </div>
          <span className="text-[11px] text-[var(--stage-muted)] font-sans">
            AI · Data Science · Web · Automation
          </span>
        </div>
      </div>

      <span className="px-3 py-1 rounded-full bg-[var(--stage-card)] border border-[var(--stage-border)] text-[10px] font-mono text-[var(--stage-muted)] shadow-xs">
        fast to write · clean to read
      </span>
    </div>
  );
}

/**
 * Scene 3 Visual: Side-by-side comparison (Python vs compiled language)
 */
function Scene3Visual() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl w-full">
      {/* Python Side */}
      <div className="p-3.5 rounded-xl border-2 border-emerald-500/50 bg-[var(--stage-surface)] shadow-xs flex flex-col justify-between text-left">
        <div>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--stage-border)] text-xs">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
              Python
            </span>
            <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded">
              1 line
            </span>
          </div>
          <div className="font-mono text-xs sm:text-sm bg-[var(--stage-card)] p-2 rounded-lg border border-[var(--stage-border)]">
            <span className="text-blue-600 dark:text-blue-400 font-bold">print</span>
            <span className="text-[var(--stage-muted)]">(</span>
            <span className="text-emerald-600 dark:text-emerald-400">&quot;Hello&quot;</span>
            <span className="text-[var(--stage-muted)]">)</span>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-[var(--stage-border)] flex items-center justify-between text-[11px] font-mono">
          <span className="text-[var(--stage-muted)]">Output:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            → Hello
          </span>
        </div>
      </div>

      {/* Compiled Language Side */}
      <div className="p-3.5 rounded-xl border border-[var(--stage-border)] bg-[var(--stage-surface)]/60 shadow-xs flex flex-col justify-between text-left opacity-85">
        <div>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--stage-border)] text-xs text-[var(--stage-muted)]">
            <span className="font-mono font-medium">Other Languages</span>
            <span className="text-[10px] font-mono bg-[var(--stage-card)] px-1.5 py-0.5 rounded">
              5+ lines
            </span>
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] bg-[var(--stage-card)] p-2 rounded-lg border border-[var(--stage-border)] text-[var(--stage-muted)] leading-relaxed">
            <div>public class Hello &#123;</div>
            <div className="pl-2">public static void main...</div>
            <div>&#125;</div>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-[var(--stage-border)] flex items-center justify-between text-[11px] font-mono">
          <span className="text-[var(--stage-muted)]">Status:</span>
          <span className="text-amber-600 dark:text-amber-400">
            waiting to run...
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Scene 4 Visual: Asha avatar + speech bubble
 */
function Scene4Visual() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-lg w-full">
      {/* Asha Avatar */}
      <div className="flex flex-col items-center gap-1.5 shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#C1502E] to-[#E07A5F] flex items-center justify-center text-white shadow-warm border-2 border-white/80 dark:border-[#3D332B] relative">
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
 * Scene 5 Visual: She types one line, Python runs it instantly
 */
function Scene5Visual() {
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
 * Scene 6 Visual: Closing narrative beat (Write Code -> Run Instant -> Learn Loop)
 * Note: Per user instruction, NO CTA button or sandbox hand-off inside this story mode.
 */
function Scene6Visual() {
  const steps = [
    { title: "Write Line", icon: Code2, desc: "human readable" },
    { title: "Run Instant", icon: Zap, desc: "CPython runtime" },
    { title: "See Result", icon: CheckCircle2, desc: "instant feedback" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-lg w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={st.title}
              className="p-3.5 rounded-2xl bg-[var(--stage-surface)] border border-[var(--stage-border)] shadow-xs flex flex-col items-center justify-center gap-1.5 text-center"
            >
              <div className="w-9 h-9 rounded-xl bg-[var(--stage-accent-light)] text-[var(--stage-accent)] flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[var(--stage-text)]">
                {st.title}
              </span>
              <span className="text-[9px] font-mono text-[var(--stage-muted)]">
                {st.desc}
              </span>
            </div>
          );
        })}
      </div>

      <span className="px-3.5 py-1 rounded-full bg-[var(--stage-card)] border border-[var(--stage-border)] text-[10px] font-mono text-[var(--stage-muted)] shadow-xs">
        the fundamental developer loop
      </span>
    </div>
  );
}

/**
 * 6 Scenes Definition for Episode 1 (Story Mode)
 */
export const episode1Scenes: SceneItem[] = [
  {
    id: "e1-scene-1",
    duration: 4800,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "Every app on your phone started as code.",
    caption:
      "From social feeds to banking and streaming, software is just a set of instructions written by humans to solve real problems.",
    visual: <Scene1Visual />,
  },
  {
    id: "e1-scene-2",
    duration: 5200,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "Python is one of the most popular of those languages.",
    caption:
      "Created to be readable and expressive, Python has grown into the primary language for automation, artificial intelligence, and everyday scripting.",
    visual: <Scene2Visual />,
  },
  {
    id: "e1-scene-3",
    duration: 5600,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "Why? It reads almost like plain English.",
    caption:
      "Where other languages require pages of setup, `print(\"Hello\")` in Python is just one clear line that runs without compilation hurdles.",
    visual: <Scene3Visual />,
  },
  {
    id: "e1-scene-4",
    duration: 4600,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "Meet Asha.",
    caption:
      "She has three semesters of exam scores sitting in a spreadsheet. A senior suggested Python could automate her calculations in seconds.",
    visual: <Scene4Visual />,
  },
  {
    id: "e1-scene-5",
    duration: 5400,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "She types one line. Python runs it instantly.",
    caption:
      "She types `print(\"Scores analyzed!\")`, hits run, and watches the console print her message immediately. The loop has begun.",
    visual: <Scene5Visual />,
  },
  {
    id: "e1-scene-6",
    duration: 5000,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "One line. One result. You're ready.",
    caption:
      "Write something, run it, see what happens. That three-step loop is the foundation of everything you will build in Python.",
    visual: <Scene6Visual />,
  },
];
