"use client";

import React, { useEffect, useState } from "react";
import { SceneItem } from "./NarratedVideoStage";
import { Sparkles, ArrowRight, Package, Zap } from "lucide-react";

/* Reuse Episode 1 keyframes if already injected, else inject */
function InjectKeyframes() {
  useEffect(() => {
    if (document.getElementById("ep2-story-keyframes")) return;
    const style = document.createElement("style");
    style.id = "ep2-story-keyframes";
    style.textContent = `
      @keyframes ep2-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes ep2-pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.7);opacity:0} }
      @keyframes ep2-type { from{width:0} to{width:100%} }
      @keyframes ep2-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes ep2-slide-up { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
      @keyframes ep2-fade-in { from{opacity:0} to{opacity:1} }
      @keyframes ep2-pop { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
      @keyframes ep2-glow { 0%,100%{box-shadow:0 0 8px 2px rgba(124,58,237,0.4)} 50%{box-shadow:0 0 20px 6px rgba(124,58,237,0.7)} }
      @keyframes ep2-bounce-x { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }
      @keyframes ep2-fill { from{width:0} to{width:100%} }
      @keyframes ep2-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
      @keyframes ep2-strike { from{width:0} to{width:100%} }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

/* ─── SCENE 1: Asha's problem — she keeps re-typing the same number ──────── */
function RepeatingNumberVisual() {
  return (
    <div className="w-full max-w-sm" style={{ animation: "ep2-slide-up 0.5s ease forwards" }}>
      <InjectKeyframes />
      <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#161b22" }}>
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 text-[11px] font-mono text-white/50">grades_v3.py</span>
        </div>
        <div className="p-4 font-mono text-xs space-y-1.5" style={{ background: "#0d1117" }}>
          {[
            { n: 1, text: 'print("Math:", 92)', c: "#e2e8f0" },
            { n: 2, text: 'print("Avg:", 92 / 3)', c: "#e2e8f0" },
            { n: 3, text: 'print("Pass?", 92 > 75)', c: "#e2e8f0" },
            { n: 4, text: '# changed to 88... now fix 3 lines', c: "#6b8a6b" },
          ].map((line, i) => (
            <div
              key={line.n}
              className="flex gap-3"
              style={{ animation: `ep2-fade-in 0.3s ease ${i * 0.15}s both`, opacity: 0 }}
            >
              <span style={{ color: "#3b4048", minWidth: 12 }}>{line.n}</span>
              <span style={{ color: line.c }}>{line.text}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-[11px] font-mono text-center" style={{ color: "var(--stage-muted)" }}>
        She typed 92 three times. Change the score — fix all three.
      </p>
    </div>
  );
}

/* ─── SCENE 2: The "box" mental model ───────────────────────────────────── */
function BoxMetaphorVisual() {
  return (
    <div className="flex flex-col items-center gap-4 max-w-sm w-full">
      <InjectKeyframes />
      {/* The box */}
      <div
        className="relative flex flex-col items-center"
        style={{ animation: "ep2-pop 0.5s ease 0.1s both", opacity: 0 }}
      >
        {/* Label tag */}
        <div
          className="px-4 py-1 rounded-t-xl font-mono text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
        >
          score
        </div>
        {/* Box body */}
        <div
          className="w-28 h-20 flex items-center justify-center rounded-b-xl rounded-tr-xl border-2 text-3xl font-bold"
          style={{
            border: "2px dashed #a78bfa",
            background: "rgba(124,58,237,0.07)",
            color: "#f59e0b",
          }}
        >
          92
        </div>
        {/* "= stores this" annotation */}
        <div
          className="mt-2 flex items-center gap-1.5 text-[10px] font-mono"
          style={{ color: "var(--stage-muted)", animation: "ep2-fade-in 0.4s ease 0.6s both", opacity: 0 }}
        >
          <code style={{ color: "#a78bfa", fontWeight: "bold" }}>score = 92</code>
          <span>→ puts 92 inside</span>
        </div>
      </div>

      {/* Rule pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { label: "= means store", color: "#7c3aed" },
          { label: "name on left", color: "#16a34a" },
          { label: "value on right", color: "#ea580c" },
        ].map((p, i) => (
          <span
            key={p.label}
            className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold text-white"
            style={{
              background: p.color,
              animation: `ep2-slide-up 0.35s ease ${0.7 + i * 0.12}s both`,
              opacity: 0,
            }}
          >
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── SCENE 3: Asha writes score = 92 for the first time ────────────────── */
function FirstAssignVisual() {
  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-3.5">
      <InjectKeyframes />
      <div
        className="w-full rounded-xl overflow-hidden"
        style={{
          background: "var(--stage-surface)",
          border: "1px solid var(--stage-border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          animation: "ep2-pop 0.45s ease forwards",
        }}
      >
        <div
          className="px-3.5 py-2 flex items-center justify-between text-xs"
          style={{ background: "var(--stage-card)", borderBottom: "1px solid var(--stage-border)" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 font-mono text-[11px] font-medium" style={{ color: "var(--stage-text)" }}>
              grades.py
            </span>
          </div>
        </div>
        <div className="p-4 font-mono text-sm text-left space-y-2" style={{ background: "var(--stage-surface)" }}>
          {/* Line 1 */}
          <div className="flex items-center gap-3">
            <span className="text-xs select-none" style={{ color: "var(--stage-muted)" }}>1</span>
            <span>
              <span style={{ color: "#a78bfa", fontWeight: "bold" }}>score</span>
              <span style={{ color: "var(--stage-muted)" }}> = </span>
              <span style={{ color: "#f59e0b", fontWeight: "bold" }}>92</span>
            </span>
          </div>
          {/* Line 2 */}
          <div
            className="flex items-center gap-3"
            style={{ animation: "ep2-fade-in 0.4s ease 0.8s both", opacity: 0 }}
          >
            <span className="text-xs select-none" style={{ color: "var(--stage-muted)" }}>2</span>
            <span>
              <span style={{ color: "#60a5fa", fontWeight: "bold" }}>print</span>
              <span style={{ color: "var(--stage-muted)" }}>(</span>
              <span style={{ color: "#a78bfa", fontWeight: "bold" }}>score</span>
              <span style={{ color: "var(--stage-muted)" }}>)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Output */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm font-bold"
        style={{
          background: "rgba(52,211,153,0.1)",
          border: "1px solid rgba(52,211,153,0.3)",
          color: "#059669",
          animation: "ep2-pop 0.45s ease 1.4s both",
          opacity: 0,
        }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        92
        <span className="ml-1 text-[10px] font-sans font-normal" style={{ color: "var(--stage-muted)" }}>
          retrieved from "score"
        </span>
      </div>
    </div>
  );
}

/* ─── SCENE 4: Now she changes the score — only one place to update ──────── */
function OneChangeVisual() {
  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-3">
      <InjectKeyframes />
      {/* Old value crossed out */}
      <div
        className="w-full rounded-xl p-3 flex items-center gap-3 font-mono text-xs relative overflow-hidden"
        style={{
          background: "rgba(239,68,68,0.07)",
          border: "1px solid rgba(239,68,68,0.25)",
          animation: "ep2-fade-in 0.4s ease 0.1s both",
          opacity: 0,
        }}
      >
        <span style={{ color: "var(--stage-muted)", minWidth: 12 }}>1</span>
        <span style={{ color: "#f87171" }}>score</span>
        <span style={{ color: "var(--stage-muted)" }}> = </span>
        <span
          className="relative text-red-400 font-bold"
          style={{ textDecoration: "line-through", textDecorationColor: "#ef4444" }}
        >
          92
        </span>
        <span
          className="ml-1 text-[10px] px-2 py-0.5 rounded-full"
          style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}
        >
          old value gone
        </span>
      </div>

      {/* Arrow */}
      <ArrowRight
        className="w-5 h-5"
        style={{
          color: "var(--stage-accent)",
          animation: "ep2-bounce-x 1s ease-in-out infinite",
          rotate: "90deg",
        }}
      />

      {/* New value */}
      <div
        className="w-full rounded-xl p-3 flex items-center gap-3 font-mono text-xs"
        style={{
          background: "rgba(52,211,153,0.07)",
          border: "1px solid rgba(52,211,153,0.25)",
          animation: "ep2-slide-up 0.4s ease 0.5s both",
          opacity: 0,
        }}
      >
        <span style={{ color: "var(--stage-muted)", minWidth: 12 }}>1</span>
        <span style={{ color: "#a78bfa", fontWeight: "bold" }}>score</span>
        <span style={{ color: "var(--stage-muted)" }}> = </span>
        <span style={{ color: "#34d399", fontWeight: "bold" }}>88</span>
        <span
          className="ml-1 text-[10px] px-2 py-0.5 rounded-full"
          style={{ background: "rgba(52,211,153,0.15)", color: "#059669" }}
        >
          updated!
        </span>
      </div>

      <p
        className="text-[11px] font-mono text-center"
        style={{ color: "var(--stage-muted)", animation: "ep2-fade-in 0.4s ease 1s both", opacity: 0 }}
      >
        Change score once → every print(score) updates automatically.
      </p>
    </div>
  );
}

/* ─── SCENE 5: Variables hold any type ──────────────────────────────────── */
function AnyTypeVisual() {
  const types = [
    { code: "score = 92", label: "int", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
    { code: 'name = "Asha"', label: "str", color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.3)" },
    { code: "passed = True", label: "bool", color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)" },
    { code: "grades = [78, 85, 92]", label: "list", color: "#f472b6", bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)" },
  ];

  return (
    <div className="w-full max-w-sm space-y-2">
      <InjectKeyframes />
      {types.map((t, i) => (
        <div
          key={t.label}
          className="flex items-center justify-between px-3 py-2.5 rounded-xl"
          style={{
            background: t.bg,
            border: `1px solid ${t.border}`,
            animation: `ep2-slide-up 0.4s ease ${i * 0.12}s both`,
            opacity: 0,
          }}
        >
          <code className="font-mono text-xs" style={{ color: "var(--stage-text)" }}>{t.code}</code>
          <span
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
            style={{ color: t.color, background: t.bg, border: `1px solid ${t.border}` }}
          >
            {t.label}
          </span>
        </div>
      ))}
      <p
        className="text-[11px] font-mono text-center pt-1"
        style={{ color: "var(--stage-muted)", animation: "ep2-fade-in 0.4s ease 0.6s both", opacity: 0 }}
      >
        Python figures out the type on its own — you just name it.
      </p>
    </div>
  );
}

/* ─── SCENE 6: Memory diagram — name tag pointing to object ─────────────── */
function MemoryDiagramVisual() {
  return (
    <div className="flex flex-col items-center gap-3 max-w-sm w-full">
      <InjectKeyframes />
      {/* Memory diagram */}
      <div className="flex items-center gap-4 w-full justify-center">
        {/* Name column */}
        <div className="flex flex-col gap-3 items-end">
          {["score", "name", "passed"].map((n, i) => (
            <div
              key={n}
              className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold text-white"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
                animation: `ep2-slide-up 0.3s ease ${i * 0.15}s both`,
                opacity: 0,
              }}
            >
              {n}
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex flex-col gap-3 items-center">
          {["→", "→", "→"].map((arr, i) => (
            <span
              key={i}
              className="font-mono text-sm"
              style={{ color: "var(--stage-muted)", animation: `ep2-fade-in 0.3s ease ${0.5 + i * 0.15}s both`, opacity: 0 }}
            >
              {arr}
            </span>
          ))}
        </div>

        {/* Value boxes */}
        <div className="flex flex-col gap-3 items-start">
          {[
            { val: "92", c: "#f59e0b" },
            { val: '"Asha"', c: "#60a5fa" },
            { val: "True", c: "#34d399" },
          ].map((v, i) => (
            <div
              key={v.val}
              className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold"
              style={{
                background: "var(--stage-card)",
                border: "1px solid var(--stage-border)",
                color: v.c,
                animation: `ep2-pop 0.3s ease ${0.5 + i * 0.15}s both`,
                opacity: 0,
              }}
            >
              {v.val}
            </div>
          ))}
        </div>
      </div>

      <p
        className="text-[11px] font-mono text-center"
        style={{ color: "var(--stage-muted)", animation: "ep2-fade-in 0.4s ease 1s both", opacity: 0 }}
      >
        The name is a tag. The value lives in memory. = re-points the tag.
      </p>
    </div>
  );
}

/* ─── SCENE 7: Asha's reaction — "I only need to change one line now" ──── */
function AshaReactionVisual() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 max-w-lg w-full">
      <InjectKeyframes />
      {/* Avatar */}
      <div className="flex flex-col items-center gap-2 shrink-0 relative">
        <span
          className="absolute rounded-full"
          style={{
            inset: 0, width: 84, height: 84, borderRadius: "50%",
            background: "rgba(193,80,46,0.2)",
            animation: "ep2-pulse-ring 2s ease-out infinite",
          }}
        />
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white border-2 border-white/80 relative z-10"
          style={{
            background: "linear-gradient(135deg,#C1502E,#E07A5F)",
            animation: "ep2-float 3s ease-in-out infinite",
            boxShadow: "0 8px 32px rgba(193,80,46,0.3)",
          }}
        >
          <svg viewBox="0 0 48 48" className="w-11 h-11 fill-current text-white/95" aria-hidden>
            <circle cx="24" cy="18" r="9" />
            <path d="M10 40 C10 30 16 28 24 28 C32 28 38 30 38 40 Z" />
          </svg>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white z-20" />
        </div>
        <span className="text-sm font-bold z-10" style={{ color: "var(--stage-text)" }}>Asha</span>
      </div>

      {/* Speech bubble */}
      <div
        className="relative p-4 sm:p-5 rounded-2xl text-left"
        style={{
          background: "var(--stage-card)",
          border: "1px solid var(--stage-border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          animation: "ep2-slide-up 0.5s ease 0.2s both",
          opacity: 0,
        }}
      >
        <div className="hidden sm:block absolute -left-2 top-6 w-4 h-4 rotate-45"
          style={{ background: "var(--stage-card)", borderLeft: "1px solid var(--stage-border)", borderBottom: "1px solid var(--stage-border)" }} />
        <p className="text-sm sm:text-base font-serif italic leading-relaxed" style={{ color: "var(--stage-text)" }}>
          &ldquo;I changed one line at the top and every calculation updated. That&apos;s actually magic.&rdquo;
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-mono" style={{ color: "var(--stage-muted)" }}>
            The power of naming things
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── SCENE 8: Naming conventions ───────────────────────────────────────── */
function NamingRulesVisual() {
  const rules = [
    { code: "my_score", icon: "✅", label: "snake_case — preferred" },
    { code: "myScore", icon: "✅", label: "camelCase — allowed" },
    { code: "2score", icon: "❌", label: "can't start with a number" },
    { code: "for", icon: "❌", label: "reserved keyword" },
  ];

  return (
    <div className="w-full max-w-sm space-y-2">
      <InjectKeyframes />
      {rules.map((r, i) => {
        const isGood = r.icon === "✅";
        return (
          <div
            key={r.code}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{
              background: isGood ? "rgba(52,211,153,0.06)" : "rgba(239,68,68,0.06)",
              border: `1px solid ${isGood ? "rgba(52,211,153,0.25)" : "rgba(239,68,68,0.25)"}`,
              animation: `ep2-slide-up 0.35s ease ${i * 0.12}s both`,
              opacity: 0,
            }}
          >
            <span className="text-base">{r.icon}</span>
            <code className="font-mono text-xs font-bold" style={{ color: isGood ? "#34d399" : "#f87171" }}>
              {r.code}
            </code>
            <span className="ml-auto text-[10px] font-mono" style={{ color: "var(--stage-muted)" }}>{r.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── SCENE 9: Asha's final grade script ────────────────────────────────── */
function FinalScriptVisual() {
  const lines = [
    { n: 1, text: "# Asha's grade tool", c: "#6b8a6b" },
    { n: 2, text: "score = 88", c: "#e2e8f0" },
    { n: 3, text: 'name = "Asha"', c: "#e2e8f0" },
    { n: 4, text: 'print(f"{name}: {score}")', c: "#60a5fa" },
    { n: 5, text: 'print("Pass?", score > 75)', c: "#60a5fa" },
  ];

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-2.5">
      <InjectKeyframes />
      <div className="w-full rounded-xl overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#161b22" }}>
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 text-[11px] font-mono text-white/50">grade_tool.py</span>
        </div>
        <div className="p-4 font-mono text-xs space-y-1" style={{ background: "#0d1117" }}>
          {lines.map((line, i) => (
            <div
              key={line.n}
              className="flex gap-3"
              style={{ animation: `ep2-fade-in 0.3s ease ${i * 0.18}s both`, opacity: 0 }}
            >
              <span style={{ color: "#3b4048", minWidth: 12 }}>{line.n}</span>
              <span style={{ color: line.c }}>{line.text}</span>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t font-mono text-xs space-y-0.5" style={{ background: "#010409", borderColor: "#30363d" }}>
          <div style={{ color: "#94d67a", animation: "ep2-fade-in 0.4s ease 1.1s both", opacity: 0 }}>
            Asha: 88
          </div>
          <div style={{ color: "#94d67a", animation: "ep2-fade-in 0.4s ease 1.4s both", opacity: 0 }}>
            Pass? True
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SCENE 10: Roadmap — what's next ───────────────────────────────────── */
function RoadmapVisual() {
  const steps = [
    { icon: "🐍", label: "What is Python?", done: true },
    { icon: "📦", label: "Assign a Variable", done: true },
    { icon: "🔁", label: "Loops & Logic", done: false, current: true },
    { icon: "📊", label: "Real Project", done: false },
  ];

  return (
    <div className="w-full max-w-sm">
      <InjectKeyframes />
      <div className="relative flex flex-col gap-0">
        {steps.map((step, i) => (
          <div
            key={step.label}
            className="flex items-center gap-3"
            style={{ animation: `ep2-slide-up 0.4s ease ${i * 0.15}s both`, opacity: 0 }}
          >
            <div className="relative flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm z-10 font-bold"
                style={{
                  background: step.done
                    ? "linear-gradient(135deg,#16a34a,#4ade80)"
                    : step.current
                    ? "linear-gradient(135deg,#7c3aed,#a78bfa)"
                    : "var(--stage-card)",
                  border: step.current ? "2px solid #a78bfa" : "2px solid var(--stage-border)",
                  boxShadow: step.current ? "0 0 16px rgba(124,58,237,0.5)" : "none",
                  animation: step.current ? "ep2-glow 2s ease-in-out infinite" : "none",
                }}
              >
                {step.done ? "✓" : step.icon}
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 h-6 my-0.5" style={{ background: step.done ? "#16a34a" : "var(--stage-border)" }} />
              )}
            </div>
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
                <span
                  className="ml-2 text-[9px] font-mono px-1.5 py-0.5 rounded-full text-white"
                  style={{ background: "#7c3aed" }}
                >
                  Up next
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-4 px-3 py-2.5 rounded-xl text-center text-xs font-mono"
        style={{
          background: "rgba(124,58,237,0.07)",
          border: "1px solid rgba(124,58,237,0.2)",
          color: "var(--stage-accent)",
          animation: "ep2-fade-in 0.5s ease 0.8s both",
          opacity: 0,
        }}
      >
        <Package className="w-4 h-4 inline-block mr-1.5 text-violet-400" />
        You can now store anything. Next — make your code repeat itself.
      </div>
    </div>
  );
}

/* ─── EXPORTED SCENE ARRAY ──────────────────────────────────────────────── */
export const episode2StoryScenes: SceneItem[] = [
  {
    id: "e2s-1",
    duration: 5500,
    eyebrow: "Episode 2 · Assign a Value to a Variable",
    headline: "Asha typed the same number three times.",
    caption:
      "She's proud of her grade script — but changing one score means hunting through every line. There has to be a better way to remember a value.",
    visual: <RepeatingNumberVisual />,
  },
  {
    id: "e2s-2",
    duration: 5500,
    eyebrow: "Episode 2 · Assign a Value to a Variable",
    headline: "A variable is a labeled box.",
    caption:
      "`score = 92` puts 92 into a box labeled 'score'. The `=` doesn't mean 'equals' — it means 'store this value under this name'.",
    visual: <BoxMetaphorVisual />,
  },
  {
    id: "e2s-3",
    duration: 5500,
    eyebrow: "Episode 2 · Assign a Value to a Variable",
    headline: "She writes two lines. Python remembers.",
    caption:
      "She never types 92 directly into print(). She asks for the box called 'score', and Python opens it and reads the value out.",
    visual: <FirstAssignVisual />,
  },
  {
    id: "e2s-4",
    duration: 5000,
    eyebrow: "Episode 2 · Assign a Value to a Variable",
    headline: "Change it once — everything updates.",
    caption:
      "She changes score from 92 to 88 in exactly one place. Every print() that uses 'score' instantly reflects the new value. No find-and-replace.",
    visual: <OneChangeVisual />,
  },
  {
    id: "e2s-5",
    duration: 5500,
    eyebrow: "Episode 2 · Assign a Value to a Variable",
    headline: "The box doesn't care what's inside.",
    caption:
      "A variable can hold a number, a piece of text, a yes/no value, or a whole list. Python figures out the type automatically — you just name it.",
    visual: <AnyTypeVisual />,
  },
  {
    id: "e2s-6",
    duration: 5500,
    eyebrow: "Episode 2 · Assign a Value to a Variable",
    headline: "A name is just a tag pointing to memory.",
    caption:
      "Internally, the variable name points to where the value lives in memory. When you reassign, the tag moves — the old value is released.",
    visual: <MemoryDiagramVisual />,
  },
  {
    id: "e2s-7",
    duration: 5000,
    eyebrow: "Episode 2 · Assign a Value to a Variable",
    headline: "\"That's actually magic.\"",
    caption:
      "Asha changed one line at the top — score = 88 — and every output updated. This is the power of naming things instead of repeating them.",
    visual: <AshaReactionVisual />,
  },
  {
    id: "e2s-8",
    duration: 5000,
    eyebrow: "Episode 2 · Assign a Value to a Variable",
    headline: "Names have rules — and good style.",
    caption:
      "Variable names can't start with a number or use Python keywords. snake_case (like my_score) is the Python convention — clear, readable, consistent.",
    visual: <NamingRulesVisual />,
  },
  {
    id: "e2s-9",
    duration: 6000,
    eyebrow: "Episode 2 · Assign a Value to a Variable",
    headline: "Asha's final script: 5 lines, zero magic numbers.",
    caption:
      "Every value has a name. Change score at the top and the whole script stays correct. Her grade tool is clean, readable, and easy to update.",
    visual: <FinalScriptVisual />,
  },
  {
    id: "e2s-10",
    duration: 5500,
    eyebrow: "Episode 2 · Assign a Value to a Variable",
    headline: "You can now store anything. What's next?",
    caption:
      "Episode 2 complete. You know how to name values and change them in one place. Episode 3 introduces loops — making your code repeat itself automatically.",
    visual: <RoadmapVisual />,
  },
];
