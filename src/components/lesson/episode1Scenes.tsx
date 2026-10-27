"use client";

import React, { useEffect, useState } from "react";
import { SceneItem } from "./NarratedVideoStage";
import { Sparkles, Terminal, Cpu, Zap, BookOpen, Coffee, Star, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   KEYFRAME INJECTION — injects CSS once into <head>
   ────────────────────────────────────────────────────────────────────────── */
function InjectKeyframes() {
  useEffect(() => {
    if (document.getElementById("ep1-story-keyframes")) return;
    const style = document.createElement("style");
    style.id = "ep1-story-keyframes";
    style.textContent = `
      @keyframes ep1-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes ep1-pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.7);opacity:0} }
      @keyframes ep1-type { from{width:0} to{width:100%} }
      @keyframes ep1-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes ep1-slide-up { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
      @keyframes ep1-fade-in { from{opacity:0} to{opacity:1} }
      @keyframes ep1-pop { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
      @keyframes ep1-spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes ep1-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      @keyframes ep1-draw { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
      @keyframes ep1-glow { 0%,100%{box-shadow:0 0 8px 2px rgba(124,58,237,0.4)} 50%{box-shadow:0 0 20px 6px rgba(124,58,237,0.7)} }
      @keyframes ep1-bounce-x { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
      @keyframes ep1-count { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
      @keyframes ep1-orbit { from{transform:rotate(0deg) translateX(48px) rotate(0deg)} to{transform:rotate(360deg) translateX(48px) rotate(-360deg)} }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 1: Meet Asha
   ────────────────────────────────────────────────────────────────────────── */
function MeetAshaVisual() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 max-w-lg w-full">
      <InjectKeyframes />
      {/* Asha Avatar with pulse ring */}
      <div className="flex flex-col items-center gap-2 shrink-0 relative">
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            width: 88, height: 88, borderRadius: "50%",
            background: "rgba(193,80,46,0.25)",
            animation: "ep1-pulse-ring 2s ease-out infinite",
          }}
        />
        <div
          className="w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center text-white border-2 border-white/80 relative z-10"
          style={{
            background: "linear-gradient(135deg, #C1502E 0%, #E07A5F 100%)",
            animation: "ep1-float 3s ease-in-out infinite",
            boxShadow: "0 8px 32px rgba(193,80,46,0.35)",
          }}
        >
          <svg viewBox="0 0 48 48" className="w-11 h-11 fill-current text-white/95" aria-hidden="true">
            <circle cx="24" cy="18" r="9" />
            <path d="M10 40 C10 30 16 28 24 28 C32 28 38 30 38 40 Z" />
          </svg>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white z-20" />
        </div>
        <span className="text-sm font-bold text-[var(--stage-text)] z-10">Asha</span>
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
          style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.2)", color: "var(--stage-accent)" }}
        >
          2nd year student
        </span>
      </div>

      {/* Speech bubble */}
      <div
        className="relative p-4 sm:p-5 rounded-2xl text-left"
        style={{
          background: "var(--stage-card)",
          border: "1px solid var(--stage-border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          animation: "ep1-slide-up 0.6s ease forwards",
        }}
      >
        <div className="hidden sm:block absolute -left-2 top-6 w-4 h-4 rotate-45"
          style={{ background: "var(--stage-card)", borderLeft: "1px solid var(--stage-border)", borderBottom: "1px solid var(--stage-border)" }} />
        <p className="text-sm sm:text-base font-serif italic text-[var(--stage-text)] leading-relaxed">
          &ldquo;I&apos;ve never written a line of code in my life. But I have three semesters of exam scores in a spreadsheet and I need answers.&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Coffee className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[11px] font-mono text-[var(--stage-muted)]">Late Tuesday evening · laptop open</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 2: The Spreadsheet Problem
   ────────────────────────────────────────────────────────────────────────── */
function SpreadsheetVisual() {
  const rows = [
    { name: "Maths", s1: 78, s2: 82, s3: 79 },
    { name: "Physics", s1: 85, s2: 90, s3: 88 },
    { name: "CS", s1: 92, s2: 88, s3: 95 },
    { name: "English", s1: 74, s2: 70, s3: 76 },
  ];
  return (
    <div className="w-full max-w-sm" style={{ animation: "ep1-slide-up 0.5s ease forwards" }}>
      {/* Fake spreadsheet */}
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--stage-border)", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        {/* Title bar */}
        <div className="px-3 py-2 flex items-center gap-2" style={{ background: "#1D6F42" }}>
          <span className="w-2 h-2 rounded-full bg-white/40" />
          <span className="text-white text-xs font-mono font-semibold">scores.xlsx</span>
          <BookOpen className="w-3 h-3 text-white/70 ml-auto" />
        </div>
        {/* Header row */}
        <div className="grid grid-cols-4 text-[10px] font-mono font-bold px-2 py-1.5"
          style={{ background: "#D9EAD3", color: "#1D6F42", borderBottom: "1px solid #B7D4AC" }}>
          <span>Subject</span><span className="text-center">Sem 1</span><span className="text-center">Sem 2</span><span className="text-center">Sem 3</span>
        </div>
        {/* Data rows */}
        {rows.map((r, i) => (
          <div
            key={r.name}
            className="grid grid-cols-4 text-[10px] font-mono px-2 py-1.5"
            style={{
              background: i % 2 === 0 ? "var(--stage-surface)" : "var(--stage-card)",
              borderBottom: "1px solid var(--stage-border)",
              animation: `ep1-fade-in 0.4s ease ${i * 0.1 + 0.2}s both`,
            }}
          >
            <span className="font-semibold text-[var(--stage-text)]">{r.name}</span>
            <span className="text-center text-blue-600 dark:text-blue-400">{r.s1}</span>
            <span className="text-center text-blue-600 dark:text-blue-400">{r.s2}</span>
            <span className="text-center text-blue-600 dark:text-blue-400">{r.s3}</span>
          </div>
        ))}
        {/* Empty calculation cell */}
        <div className="px-2 py-2 flex items-center gap-2" style={{ background: "var(--stage-card)" }}>
          <span className="text-[10px] font-mono text-[var(--stage-muted)]">Average:</span>
          <span className="text-[10px] font-mono text-red-500 animate-pulse">???</span>
          <span className="text-[10px] font-mono text-[var(--stage-muted)] ml-auto">84 formulas needed</span>
        </div>
      </div>
      <p className="mt-2 text-[11px] font-mono text-center text-[var(--stage-muted)]">She stared at this for 2 hours. There has to be a better way.</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 3: A Friend Mentions Python
   ────────────────────────────────────────────────────────────────────────── */
function FriendTipVisual() {
  return (
    <div className="flex flex-col items-center gap-4 max-w-sm w-full">
      {/* Chat bubbles */}
      <div className="w-full space-y-3">
        {/* Friend bubble */}
        <div
          className="flex items-end gap-2"
          style={{ animation: "ep1-slide-up 0.4s ease 0.1s both" }}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>R</div>
          <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm max-w-[80%]"
            style={{ background: "var(--stage-card)", border: "1px solid var(--stage-border)" }}>
            <p className="text-xs text-[var(--stage-text)]">Hey, have you tried <strong>Python</strong>? I automated my entire grade sheet in like 10 lines. 🐍</p>
            <span className="text-[9px] text-[var(--stage-muted)]">Rahul · 9:47 PM</span>
          </div>
        </div>
        {/* Asha bubble */}
        <div
          className="flex items-end gap-2 flex-row-reverse"
          style={{ animation: "ep1-slide-up 0.4s ease 0.4s both" }}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#C1502E,#E07A5F)" }}>A</div>
          <div className="px-3.5 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <p className="text-xs text-[var(--stage-text)]">Wait — seriously? In 10 lines? How?? 😮</p>
            <span className="text-[9px] text-[var(--stage-muted)]">Asha · 9:48 PM</span>
          </div>
        </div>
        {/* Friend bubble 2 */}
        <div
          className="flex items-end gap-2"
          style={{ animation: "ep1-slide-up 0.4s ease 0.7s both" }}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>R</div>
          <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm max-w-[80%]"
            style={{ background: "var(--stage-card)", border: "1px solid var(--stage-border)" }}>
            <p className="text-xs text-[var(--stage-text)]">Just open the terminal and type <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded text-amber-800 dark:text-amber-200">python</code> 😄</p>
            <span className="text-[9px] text-[var(--stage-muted)]">Rahul · 9:48 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 4: She Opens a Terminal
   ────────────────────────────────────────────────────────────────────────── */
function TerminalOpenVisual() {
  const [line, setLine] = useState(0);
  const lines = ["$ python3", "Python 3.12.0 (main, Oct 2023)", "Type \"help\" for more information.", ">>> _"];

  useEffect(() => {
    if (line >= lines.length) return;
    const t = setTimeout(() => setLine(l => l + 1), 600);
    return () => clearTimeout(t);
  }, [line]);

  return (
    <div className="w-full max-w-sm" style={{ animation: "ep1-pop 0.5s ease forwards" }}>
      <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: "#1a1a2e" }}>
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <Terminal className="w-3 h-3 text-white/40 ml-auto" />
          <span className="text-[10px] font-mono text-white/40">Terminal</span>
        </div>
        {/* Terminal body */}
        <div className="p-4 font-mono text-xs space-y-1 min-h-[90px]" style={{ background: "#0d1117" }}>
          {lines.slice(0, line).map((l, i) => (
            <div
              key={i}
              style={{ animation: "ep1-fade-in 0.3s ease forwards", color: i === 0 ? "#94d67a" : i === 3 ? "#e2e8f0" : "#6b8a6b" }}
            >
              {l}
              {i === line - 1 && i === 3 && (
                <span style={{ animation: "ep1-blink 1s step-end infinite", color: "#94d67a" }}>█</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-[11px] font-mono text-center" style={{ color: "var(--stage-muted)" }}>
        Heart racing. Cursor blinking. She's in.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 5: She Types One Line
   ────────────────────────────────────────────────────────────────────────── */
function FirstLineVisual() {
  return (
    <div className="flex flex-col items-center gap-3.5 max-w-md w-full">
      {/* Code Editor */}
      <div
        className="w-full rounded-xl overflow-hidden"
        style={{
          background: "var(--stage-surface)",
          border: "1px solid var(--stage-border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          animation: "ep1-slide-up 0.4s ease forwards",
        }}
      >
        {/* Header */}
        <div className="px-3.5 py-2 flex items-center justify-between text-xs"
          style={{ background: "var(--stage-card)", borderBottom: "1px solid var(--stage-border)" }}>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 font-mono text-[11px] font-medium text-[var(--stage-text)]">asha_first_line.py</span>
          </div>
          <span className="font-mono text-[10px] text-[var(--stage-muted)]">python 3.12</span>
        </div>
        {/* Code */}
        <div className="p-4 font-mono text-sm text-left" style={{ background: "var(--stage-surface)" }}>
          <div className="flex items-center gap-3">
            <span className="text-xs select-none" style={{ color: "var(--stage-muted)" }}>1</span>
            <span>
              <span style={{ color: "#60a5fa", fontWeight: "bold" }}>print</span>
              <span style={{ color: "var(--stage-muted)" }}>(</span>
              <span
                style={{
                  color: "#34d399",
                  fontWeight: "500",
                  display: "inline-block",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  animation: "ep1-type 1.2s steps(20,end) 0.3s both",
                  width: 0,
                }}
              >
                &quot;Scores analyzed!&quot;
              </span>
              <span style={{ color: "var(--stage-muted)" }}>)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Run button */}
      <div
        className="flex items-center gap-2"
        style={{ animation: "ep1-fade-in 0.5s ease 1.4s both" }}
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-white"
          style={{ background: "#16a34a", boxShadow: "0 2px 8px rgba(22,163,74,0.4)" }}>
          <Zap className="w-3 h-3" />▶ Run
        </div>
        <ArrowRight className="w-4 h-4" style={{ color: "var(--stage-muted)", animation: "ep1-bounce-x 1s ease-in-out infinite" }} />
      </div>

      {/* Output */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm font-bold"
        style={{
          background: "rgba(52,211,153,0.1)",
          border: "1px solid rgba(52,211,153,0.35)",
          color: "#059669",
          animation: "ep1-pop 0.5s ease 1.8s both",
          opacity: 0,
        }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Scores analyzed!
      </div>

      <span className="text-[10px] font-mono" style={{ color: "var(--stage-muted)" }}>instant feedback loop · 0.003s</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 6: Asha's Reaction
   ────────────────────────────────────────────────────────────────────────── */
function ReactionVisual() {
  return (
    <div className="flex flex-col items-center gap-5 max-w-sm w-full">
      <InjectKeyframes />
      {/* Stars burst */}
      <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <Star
            key={deg}
            className="absolute w-4 h-4 text-amber-400 fill-amber-400"
            style={{
              transform: `rotate(${deg}deg) translateX(48px) rotate(-${deg}deg)`,
              animation: `ep1-fade-in 0.3s ease ${i * 0.1}s both`,
              opacity: 0,
            }}
          />
        ))}
        {/* Center face */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl z-10"
          style={{
            background: "linear-gradient(135deg,#fbbf24,#f59e0b)",
            boxShadow: "0 4px 24px rgba(251,191,36,0.5)",
            animation: "ep1-pop 0.5s ease 0.3s both",
            opacity: 0,
          }}
        >
          😲
        </div>
      </div>

      {/* Reaction quote */}
      <div
        className="px-4 py-3 rounded-2xl text-center max-w-xs"
        style={{
          background: "var(--stage-card)",
          border: "1px solid var(--stage-border)",
          animation: "ep1-slide-up 0.5s ease 0.8s both",
          opacity: 0,
        }}
      >
        <p className="text-sm font-serif italic text-[var(--stage-text)] leading-relaxed">
          &ldquo;Wait — that&apos;s <em>it</em>? One line? It just... ran?&rdquo;
        </p>
        <div className="mt-2 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] font-mono text-[var(--stage-muted)]">The moment it clicks</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 7: Python — Plain English Code
   ────────────────────────────────────────────────────────────────────────── */
function PlainEnglishVisual() {
  const examples = [
    { code: 'print("Hello")', label: "→ shows text" },
    { code: "scores = [78, 85, 92]", label: "→ stores numbers" },
    { code: "total = sum(scores)", label: "→ adds them all" },
    { code: "avg = total / len(scores)", label: "→ calculates average" },
  ];

  return (
    <div className="w-full max-w-sm space-y-2">
      {examples.map((ex, i) => (
        <div
          key={ex.code}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{
            background: "var(--stage-surface)",
            border: "1px solid var(--stage-border)",
            animation: `ep1-slide-up 0.4s ease ${i * 0.15}s both`,
            opacity: 0,
          }}
        >
          <code
            className="text-xs font-mono flex-1 text-left"
            style={{ color: "#60a5fa" }}
          >
            {ex.code}
          </code>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: "rgba(52,211,153,0.1)", color: "#059669", border: "1px solid rgba(52,211,153,0.2)" }}>
            {ex.label}
          </span>
        </div>
      ))}
      <p className="text-[11px] font-mono text-center mt-2" style={{ color: "var(--stage-muted)", animation: "ep1-fade-in 0.5s ease 0.7s both", opacity: 0 }}>
        Python reads like sentences — not symbols.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 8: The Loop Begins — Asha writes her real script
   ────────────────────────────────────────────────────────────────────────── */
function RealScriptVisual() {
  const codeLines = [
    { n: 1, tokens: [{ t: "# Asha's grade calculator", c: "#6b8a6b" }] },
    { n: 2, tokens: [{ t: "scores = [78, 85, 92, 74]", c: "#e2e8f0" }] },
    { n: 3, tokens: [{ t: "average = sum(scores) / len(scores)", c: "#e2e8f0" }] },
    { n: 4, tokens: [{ t: 'print(f"Average: {average:.1f}")', c: "#60a5fa" }] },
  ];

  return (
    <div className="w-full max-w-sm" style={{ animation: "ep1-pop 0.4s ease forwards" }}>
      <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#161b22" }}>
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 text-[11px] font-mono text-white/50">grades.py</span>
        </div>
        {/* Code */}
        <div className="p-4 font-mono text-xs space-y-1" style={{ background: "#0d1117" }}>
          {codeLines.map((line, i) => (
            <div
              key={line.n}
              className="flex gap-3"
              style={{ animation: `ep1-fade-in 0.3s ease ${i * 0.2}s both`, opacity: 0 }}
            >
              <span style={{ color: "#3b4048", minWidth: 12 }}>{line.n}</span>
              {line.tokens.map((tok, j) => (
                <span key={j} style={{ color: tok.c }}>{tok.t}</span>
              ))}
            </div>
          ))}
        </div>
        {/* Output */}
        <div className="px-4 py-2 border-t font-mono text-xs" style={{ background: "#010409", borderColor: "#30363d" }}>
          <span style={{ color: "#94d67a", animation: "ep1-fade-in 0.4s ease 1s both", opacity: 0 }}>
            &gt; Average: 82.3
          </span>
        </div>
      </div>
      <p className="mt-2 text-[11px] font-mono text-center" style={{ color: "var(--stage-muted)" }}>
        84 formulas → 4 lines of Python.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 9: What Python Actually Is
   ────────────────────────────────────────────────────────────────────────── */
function WhatPythonIsVisual() {
  const pills = [
    { label: "🐍 Python", desc: "the language" },
    { label: "⚡ Instant", desc: "no compile step" },
    { label: "📖 Readable", desc: "plain English" },
    { label: "🌍 Everywhere", desc: "AI · web · science" },
  ];

  return (
    <div className="flex flex-col items-center gap-3 max-w-sm w-full">
      {/* Center CPU icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
        style={{
          background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
          boxShadow: "0 0 0 0 rgba(124,58,237,0.4)",
          animation: "ep1-glow 2s ease-in-out infinite",
        }}
      >
        <Cpu className="w-7 h-7 text-white" />
      </div>
      {/* Pills */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {pills.map((p, i) => (
          <div
            key={p.label}
            className="px-3 py-2.5 rounded-xl text-center"
            style={{
              background: "var(--stage-card)",
              border: "1px solid var(--stage-border)",
              animation: `ep1-pop 0.4s ease ${i * 0.15}s both`,
              opacity: 0,
            }}
          >
            <div className="text-base">{p.label}</div>
            <div className="text-[10px] font-mono mt-0.5" style={{ color: "var(--stage-muted)" }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 10: Asha's Journey Continues
   ────────────────────────────────────────────────────────────────────────── */
function JourneyContinuesVisual() {
  const steps = [
    { icon: "🐍", label: "What is Python?", done: true },
    { icon: "📦", label: "Assign a Variable", done: false, current: true },
    { icon: "🔁", label: "Loops & Logic", done: false },
    { icon: "📊", label: "Real Project", done: false },
  ];

  return (
    <div className="w-full max-w-sm">
      {/* Path visual */}
      <div className="relative flex flex-col gap-0">
        {steps.map((step, i) => (
          <div
            key={step.label}
            className="flex items-center gap-3"
            style={{ animation: `ep1-slide-up 0.4s ease ${i * 0.15}s both`, opacity: 0 }}
          >
            {/* Node */}
            <div className="relative flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm z-10 font-bold"
                style={{
                  background: step.done ? "linear-gradient(135deg,#16a34a,#4ade80)" :
                    step.current ? "linear-gradient(135deg,#7c3aed,#a78bfa)" : "var(--stage-card)",
                  border: step.current ? "2px solid #a78bfa" : "2px solid var(--stage-border)",
                  boxShadow: step.current ? "0 0 16px rgba(124,58,237,0.5)" : "none",
                  animation: step.current ? "ep1-glow 2s ease-in-out infinite" : "none",
                }}
              >
                {step.done ? "✓" : step.icon}
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 h-6 my-0.5" style={{ background: step.done ? "#16a34a" : "var(--stage-border)" }} />
              )}
            </div>
            {/* Label */}
            <div>
              <span
                className="text-xs font-semibold"
                style={{
                  color: step.done ? "#16a34a" : step.current ? "var(--stage-accent)" : "var(--stage-muted)",
                }}
              >
                {step.label}
              </span>
              {step.current && (
                <span className="ml-2 text-[9px] font-mono px-1.5 py-0.5 rounded-full text-white"
                  style={{ background: "#7c3aed" }}>
                  Up next →
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   EXPORTED SCENE ARRAY
   ────────────────────────────────────────────────────────────────────────── */
export const episode1Scenes: SceneItem[] = [
  {
    id: "e1-s1",
    duration: 6000,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "Meet Asha.",
    caption:
      "A second-year student with a laptop, three semesters of exam scores, and zero coding experience. She's about to change that.",
    visual: <MeetAshaVisual />,
  },
  {
    id: "e1-s2",
    duration: 5500,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "The problem: 84 spreadsheet formulas.",
    caption:
      "Asha's grade spreadsheet has grown unmanageable. Calculating averages across four subjects over three semesters by hand is painful. There has to be a better way.",
    visual: <SpreadsheetVisual />,
  },
  {
    id: "e1-s3",
    duration: 5500,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "A friend says: try Python.",
    caption:
      "Rahul texts her at 9 PM — he automated his entire grade sheet in 10 lines of code. Asha is skeptical. But she opens her terminal.",
    visual: <FriendTipVisual />,
  },
  {
    id: "e1-s4",
    duration: 5000,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "She opens the terminal. Cursor blinking.",
    caption:
      "She types `python3` and hits Enter. Python 3.12 greets her. The prompt waits — `>>>` — like it's listening. Heart racing.",
    visual: <TerminalOpenVisual />,
  },
  {
    id: "e1-s5",
    duration: 6000,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "She types one line. Python runs it instantly.",
    caption:
      "She types `print(\"Scores analyzed!\")`, hits Enter, and the console prints it back immediately. No setup. No waiting. Just an answer.",
    visual: <FirstLineVisual />,
  },
  {
    id: "e1-s6",
    duration: 5000,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "\"Wait — that's it? One line?\"",
    caption:
      "She stares at the screen. The program ran in milliseconds. No compiler, no lengthy configuration — just her thought, typed out, executed. This is what they mean by \"instant feedback loop.\"",
    visual: <ReactionVisual />,
  },
  {
    id: "e1-s7",
    duration: 5500,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "Python reads like plain English.",
    caption:
      "Every line Asha writes sounds like a sentence: store this, add those, print the result. That's what makes Python the world's most beginner-friendly language.",
    visual: <PlainEnglishVisual />,
  },
  {
    id: "e1-s8",
    duration: 6000,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "She writes her real script — 4 lines replace 84 formulas.",
    caption:
      "In under 10 minutes, Asha has a working grade calculator. The spreadsheet nightmare is gone. She types four lines and Python does the rest.",
    visual: <RealScriptVisual />,
  },
  {
    id: "e1-s9",
    duration: 5000,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "So — what actually is Python?",
    caption:
      "Python is a programming language that runs your instructions immediately, reads like human sentences, and powers everything from AI to web apps to scientific research.",
    visual: <WhatPythonIsVisual />,
  },
  {
    id: "e1-s10",
    duration: 5500,
    eyebrow: "Episode 1 · What Is Python?",
    headline: "Asha's journey is just beginning.",
    caption:
      "She closed her spreadsheet for good. Next, she'll learn how to store any value in a variable — and use it anywhere in her code. Episode 2 awaits.",
    visual: <JourneyContinuesVisual />,
  },
];
