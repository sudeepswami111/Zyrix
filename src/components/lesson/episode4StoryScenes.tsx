"use client";

import React, { useEffect } from "react";
import { SceneItem } from "./NarratedVideoStage";

/* ─────────────────────────────────────────────────────────────────────────────
   KEYFRAME INJECTION
   ────────────────────────────────────────────────────────────────────────── */
function InjectKeyframes() {
  useEffect(() => {
    if (document.getElementById("ep4-story-keyframes")) return;
    const style = document.createElement("style");
    style.id = "ep4-story-keyframes";
    style.textContent = `
      @keyframes ep4-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      @keyframes ep4-pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.7);opacity:0} }
      @keyframes ep4-slide-up { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
      @keyframes ep4-fade-in { from{opacity:0} to{opacity:1} }
      @keyframes ep4-pop { 0%{transform:scale(0.85);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED VISUAL ATOMS
   ────────────────────────────────────────────────────────────────────────── */
function AshaAvatarLarge() {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0 relative">
      <span
        className="absolute inset-0 rounded-full"
        style={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          background: "rgba(193,80,46,0.25)",
          animation: "ep4-pulse-ring 2s ease-out infinite",
        }}
      />
      <div
        className="w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center text-white border-2 border-white/80 relative z-10"
        style={{
          background: "linear-gradient(135deg, #C1502E 0%, #E07A5F 100%)",
          animation: "ep4-float 3s ease-in-out infinite",
          boxShadow: "0 8px 32px rgba(193,80,46,0.35)",
        }}
      >
        <svg
          viewBox="0 0 48 48"
          className="w-11 h-11 fill-current text-white/95"
          aria-hidden="true"
        >
          <circle cx="24" cy="18" r="9" />
          <path d="M10 40 C10 30 16 28 24 28 C32 28 38 30 38 40 Z" />
        </svg>
        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white z-20" />
      </div>
      <span className="text-sm font-bold text-[var(--stage-text)] z-10">Asha</span>
      <span
        className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
        style={{
          background: "rgba(193,80,46,0.08)",
          borderColor: "rgba(193,80,46,0.2)",
          color: "var(--stage-accent)",
        }}
      >
        College coding event attendee
      </span>
    </div>
  );
}

function AshaAvatarChip() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--stage-card)] border border-[var(--stage-border)] shadow-2xs">
      <div
        className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
        style={{ background: "linear-gradient(135deg, #C1502E 0%, #E07A5F 100%)" }}
      >
        <svg viewBox="0 0 48 48" className="w-2.5 h-2.5 fill-current" aria-hidden="true">
          <circle cx="24" cy="18" r="9" />
          <path d="M10 40 C10 30 16 28 24 28 C32 28 38 30 38 40 Z" />
        </svg>
      </div>
      <span className="text-[10px] font-mono font-medium text-[var(--stage-text)]">
        Asha @ Entry Gate
      </span>
    </div>
  );
}

function OperatorBadge({ badge }: { badge: string }) {
  return (
    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-[var(--stage-card)] border-2 border-[var(--stage-accent)] shadow-warm-xs">
      <span className="font-mono text-xl sm:text-2xl font-black text-[var(--stage-accent)] tracking-wider">
        {badge}
      </span>
    </div>
  );
}

interface CodeLineItem {
  code: string;
  output?: "True" | "False" | string;
}

function DarkCodeCard({ lines }: { lines: CodeLineItem[] }) {
  return (
    <div className="w-full max-w-md rounded-xl overflow-hidden border border-[#3E352F] bg-[#14110F] shadow-lg text-left">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#1A1614] border-b border-[#3E352F]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-[10px] text-[#A89F91]">gatekeeper.py</span>
        </div>
        <span className="font-mono text-[9px] text-[#A89F91]">python 3.12</span>
      </div>

      <div className="p-3.5 sm:p-4 space-y-2.5 bg-[#0D1117] font-mono text-xs sm:text-sm">
        {lines.map((item, idx) => {
          const isTrue = item.output === "True";
          const isFalse = item.output === "False";

          return (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 py-0.5 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[#5A5046] select-none text-[11px] w-4 shrink-0">
                  {idx + 1}
                </span>
                <span className="text-[#F3EFE6] font-semibold truncate">{item.code}</span>
              </div>
              {item.output !== undefined && (
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-xs font-bold shrink-0 border transition-colors ${
                    isTrue
                      ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                      : isFalse
                      ? "bg-[#25201C] border-[#4A3F37] text-[#D8CEBC]"
                      : "bg-[#25201C] border-[#4A3F37] text-[#D8CEBC]"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono ${
                      isTrue ? "text-emerald-400" : "text-[#8C7E72]"
                    }`}
                  >
                    →
                  </span>
                  <span>{item.output}</span>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StandardSceneVisual({
  badge,
  lines,
}: {
  badge: string;
  lines: CodeLineItem[];
}) {
  return (
    <div className="flex flex-col items-center gap-3.5 max-w-md w-full">
      <InjectKeyframes />
      <div className="flex items-center justify-center gap-3">
        <AshaAvatarChip />
        <OperatorBadge badge={badge} />
      </div>
      <DarkCodeCard lines={lines} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE 1: Asha arrives at the coding event
   ────────────────────────────────────────────────────────────────────────── */
function Scene1Visual() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 max-w-lg w-full">
      <InjectKeyframes />
      <AshaAvatarLarge />

      {/* Speech bubble */}
      <div
        className="relative p-4 sm:p-5 rounded-2xl text-left"
        style={{
          background: "var(--stage-card)",
          border: "1px solid var(--stage-border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          animation: "ep4-slide-up 0.6s ease forwards",
        }}
      >
        <div
          className="hidden sm:block absolute -left-2 top-6 w-4 h-4 rotate-45"
          style={{
            background: "var(--stage-card)",
            borderLeft: "1px solid var(--stage-border)",
            borderBottom: "1px solid var(--stage-border)",
          }}
        />
        <p className="text-sm sm:text-base font-serif italic text-[var(--stage-text)] leading-relaxed">
          &ldquo;Python is the gatekeeper today. Let&apos;s see if I get in.&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-base">🎟️</span>
          <span className="text-[11px] font-mono text-[var(--stage-muted)]">
            College Coding Event · Main Entry Gate
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   EPISODE 4 SCENES ARRAY (10 scenes, exact content & order)
   ────────────────────────────────────────────────────────────────────────── */
export const episode4StoryScenes: SceneItem[] = [
  {
    id: "e4-s1",
    duration: 6000,
    eyebrow: "Module 1 · Episode 4",
    headline: "Asha arrives at the coding event.",
    caption:
      "Python makes decisions by asking yes-or-no questions. The answer is always True or False.",
    visual: <Scene1Visual />,
  },
  {
    id: "e4-s2",
    duration: 5500,
    eyebrow: "Module 1 · Episode 4",
    headline: "Is her name on the list?",
    caption: "Two equals signs ask: are these the same? Python answers True.",
    visual: (
      <StandardSceneVisual
        badge="=="
        lines={[
          { code: 'name = "Asha"' },
          { code: 'print(name == "Asha")', output: "True" },
        ]}
      />
    ),
  },
  {
    id: "e4-s3",
    duration: 5500,
    eyebrow: "Module 1 · Episode 4",
    headline: "Is this the wrong gate?",
    caption:
      "Not-equal asks: are these different? Gate 3 is not gate 5, so the answer is True.",
    visual: (
      <StandardSceneVisual
        badge="!="
        lines={[
          { code: "gate = 3" },
          { code: "print(gate != 5)", output: "True" },
        ]}
      />
    ),
  },
  {
    id: "e4-s4",
    duration: 6000,
    eyebrow: "Module 1 · Episode 4",
    headline: "Asha is number 12 in the queue.",
    caption:
      "Greater-than and less-than compare sizes. Each one answers True or False.",
    visual: (
      <StandardSceneVisual
        badge=">  <"
        lines={[
          { code: "queue = 12" },
          { code: "print(queue > 10)", output: "True" },
          { code: "print(queue < 10)", output: "False" },
        ]}
      />
    ),
  },
  {
    id: "e4-s5",
    duration: 6500,
    eyebrow: "Module 1 · Episode 4",
    headline: "Entry is for age 18 or older.",
    caption:
      "Greater-than-or-equal includes the number itself, so exactly 18 passes. Less-than-or-equal works the same way in the other direction.",
    visual: (
      <StandardSceneVisual
        badge=">=  <="
        lines={[
          { code: "age = 18" },
          { code: "print(age >= 18)", output: "True" },
          { code: "print(age <= 17)", output: "False" },
        ]}
      />
    ),
  },
  {
    id: "e4-s6",
    duration: 6000,
    eyebrow: "Module 1 · Episode 4",
    headline: "One equals sign or two?",
    caption:
      "A single equals sign stores a value. A double equals sign asks a question. Mixing them up is the most common beginner mistake.",
    visual: (
      <StandardSceneVisual
        badge="=  vs  =="
        lines={[
          { code: "age = 18" },
          { code: "print(age == 18)", output: "True" },
        ]}
      />
    ),
  },
  {
    id: "e4-s7",
    duration: 6000,
    eyebrow: "Module 1 · Episode 4",
    headline: "She needs an age check and a ticket.",
    caption: "And is True only when both sides are True.",
    visual: (
      <StandardSceneVisual
        badge="and"
        lines={[
          { code: "age = 18" },
          { code: "has_ticket = True" },
          { code: "print(age >= 18 and has_ticket)", output: "True" },
        ]}
      />
    ),
  },
  {
    id: "e4-s8",
    duration: 6000,
    eyebrow: "Module 1 · Episode 4",
    headline: "No ticket? A student card works too.",
    caption: "Or is True when at least one side is True.",
    visual: (
      <StandardSceneVisual
        badge="or"
        lines={[
          { code: "has_ticket = False" },
          { code: "has_card = True" },
          { code: "print(has_ticket or has_card)", output: "True" },
        ]}
      />
    ),
  },
  {
    id: "e4-s9",
    duration: 6000,
    eyebrow: "Module 1 · Episode 4",
    headline: "Is she on the banned list? Not today.",
    caption: "Not flips the answer. False becomes True, and True becomes False.",
    visual: (
      <StandardSceneVisual
        badge="not"
        lines={[
          { code: "banned = False" },
          { code: "print(not banned)", output: "True" },
        ]}
      />
    ),
  },
  {
    id: "e4-s10",
    duration: 7000,
    eyebrow: "Module 1 · Episode 4",
    headline: "Asha walks in.",
    caption:
      "Comparisons give True or False, and and, or and not combine them. Python says yes, and Asha is in.",
    visual: (
      <StandardSceneVisual
        badge="and  or  not"
        lines={[
          { code: "age = 18" },
          { code: "has_ticket = True" },
          { code: "banned = False" },
          {
            code: "print(age >= 18 and has_ticket and not banned)",
            output: "True",
          },
        ]}
      />
    ),
  },
];

