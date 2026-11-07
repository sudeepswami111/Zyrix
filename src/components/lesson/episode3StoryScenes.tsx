"use client";

import React, { useEffect } from "react";
import { SceneItem } from "./NarratedVideoStage";

/* ─────────────────────────────────────────────────────────────────────────────
   KEYFRAME INJECTION
   ────────────────────────────────────────────────────────────────────────── */
function InjectKeyframes() {
  useEffect(() => {
    if (document.getElementById("ep3-story-keyframes")) return;
    const style = document.createElement("style");
    style.id = "ep3-story-keyframes";
    style.textContent = `
      @keyframes ep3-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      @keyframes ep3-pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.7);opacity:0} }
      @keyframes ep3-slide-up { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
      @keyframes ep3-fade-in { from{opacity:0} to{opacity:1} }
      @keyframes ep3-pop { 0%{transform:scale(0.85);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
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
          animation: "ep3-pulse-ring 2s ease-out infinite",
        }}
      />
      <div
        className="w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center text-white border-2 border-white/80 relative z-10"
        style={{
          background: "linear-gradient(135deg, #C1502E 0%, #E07A5F 100%)",
          animation: "ep3-float 3s ease-in-out infinite",
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
        Snack stall owner
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
        Asha&apos;s Stall
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
  output?: string;
}

function DarkCodeCard({ lines }: { lines: CodeLineItem[] }) {
  return (
    <div className="w-full max-w-md rounded-xl overflow-hidden border border-[#3E352F] bg-[#14110F] shadow-lg text-left">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#1A1614] border-b border-[#3E352F]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-[10px] text-[#A89F91]">stall_math.py</span>
        </div>
        <span className="font-mono text-[9px] text-[#A89F91]">python 3.12</span>
      </div>

      <div className="p-3.5 sm:p-4 space-y-2.5 bg-[#0D1117] font-mono text-xs sm:text-sm">
        {lines.map((item, idx) => (
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
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold shrink-0">
                <span className="text-emerald-500 text-[10px]">→</span>
                <span>{item.output}</span>
              </span>
            )}
          </div>
        ))}
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
   SCENE 1: Asha opens a snack stall
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
          animation: "ep3-slide-up 0.6s ease forwards",
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
          &ldquo;Samosas to count, prices to work out. Python can do the maths for me.&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-base">🥟</span>
          <span className="text-[11px] font-mono text-[var(--stage-muted)]">
            Asha&apos;s campus snack stall · first day of sales
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   EPISODE 3 SCENES ARRAY
   ────────────────────────────────────────────────────────────────────────── */
export const episode3StoryScenes: SceneItem[] = [
  {
    id: "e3-s1",
    duration: 6000,
    eyebrow: "Module 1 · Episode 3",
    headline: "Asha opens a snack stall.",
    caption:
      "Python does maths with operators, little symbols that tell it what to calculate.",
    visual: <Scene1Visual />,
  },
  {
    id: "e3-s2",
    duration: 6000,
    eyebrow: "Module 1 · Episode 3",
    headline: "Adding and taking away.",
    caption:
      "Asha adds 8 fresh samosas to her 12, then sells 5. Plus and minus work just like the calculator on your phone.",
    visual: (
      <StandardSceneVisual
        badge="+  -"
        lines={[
          { code: "print(12 + 8)", output: "20" },
          { code: "print(20 - 5)", output: "15" },
        ]}
      />
    ),
  },
  {
    id: "e3-s3",
    duration: 5500,
    eyebrow: "Module 1 · Episode 3",
    headline: "Three samosas at 15 rupees each.",
    caption:
      "The star means multiply. Python uses * because the × symbol isn't on a keyboard.",
    visual: (
      <StandardSceneVisual
        badge="*"
        lines={[{ code: "print(3 * 15)", output: "45" }]}
      />
    ),
  },
  {
    id: "e3-s4",
    duration: 6000,
    eyebrow: "Module 1 · Episode 3",
    headline: "Sharing 10 samosas between 4 friends.",
    caption:
      "A single slash divides and always gives the exact answer, decimals included. Everyone gets two and a half.",
    visual: (
      <StandardSceneVisual
        badge="/"
        lines={[{ code: "print(10 / 4)", output: "2.5" }]}
      />
    ),
  },
  {
    id: "e3-s5",
    duration: 5500,
    eyebrow: "Module 1 · Episode 3",
    headline: "But you can't cut a samosa in half.",
    caption:
      "A double slash keeps only the whole-number part. Each friend gets 2.",
    visual: (
      <StandardSceneVisual
        badge="//"
        lines={[{ code: "print(10 // 4)", output: "2" }]}
      />
    ),
  },
  {
    id: "e3-s6",
    duration: 5500,
    eyebrow: "Module 1 · Episode 3",
    headline: "So how many are left over?",
    caption:
      "The percent sign gives the remainder. Two samosas are left for Asha.",
    visual: (
      <StandardSceneVisual
        badge="%"
        lines={[{ code: "print(10 % 4)", output: "2" }]}
      />
    ),
  },
  {
    id: "e3-s7",
    duration: 6000,
    eyebrow: "Module 1 · Episode 3",
    headline: "A tray of 4 rows with 4 samosas each.",
    caption:
      "Two stars mean power. 4 ** 2 is 4 times 4, so the tray holds 16.",
    visual: (
      <StandardSceneVisual
        badge="**"
        lines={[{ code: "print(4 ** 2)", output: "16" }]}
      />
    ),
  },
  {
    id: "e3-s8",
    duration: 6500,
    eyebrow: "Module 1 · Episode 3",
    headline: "Asha writes down today's sales.",
    caption:
      "The single equals sign is the assignment operator. It works out the right side and stores the answer in the box named sales.",
    visual: (
      <StandardSceneVisual
        badge="="
        lines={[
          { code: "sales = 3 * 15" },
          { code: "print(sales)", output: "45" },
        ]}
      />
    ),
  },
  {
    id: "e3-s9",
    duration: 6500,
    eyebrow: "Module 1 · Episode 3",
    headline: "More sales come in.",
    caption:
      "That's shorthand for sales = sales + 20. Take the old value, add 20, store it back in the same box.",
    visual: (
      <StandardSceneVisual
        badge="+="
        lines={[
          { code: "sales += 20" },
          { code: "print(sales)", output: "65" },
        ]}
      />
    ),
  },
  {
    id: "e3-s10",
    duration: 7000,
    eyebrow: "Module 1 · Episode 3",
    headline: "Same shortcut, other operators.",
    caption:
      "Minus, multiply and divide all have a shortcut too. Notice the last one gives 55.0, because a single slash always gives a decimal.",
    visual: (
      <StandardSceneVisual
        badge="-=  *=  /="
        lines={[
          { code: "sales -= 10", output: "55" },
          { code: "sales *= 2", output: "110" },
          { code: "sales /= 2", output: "55.0" },
        ]}
      />
    ),
  },
];

