"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Sparkles, Layers } from "lucide-react";

export function ProblemComparisonSection() {
  const [revealedMemory, setRevealedMemory] = useState(true);

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-[var(--zy-surface)] border-t border-[var(--zy-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--zy-surface-2)] border border-[var(--zy-border)] text-xs font-mono font-medium text-[#E68522]">
            <Layers className="w-3.5 h-3.5 text-[#FFAA45]" />
            <span>The Pedagogical Gap</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--zy-text)] tracking-tight leading-tight">
            Learning Technology Shouldn&apos;t Feel Complicated.
          </h2>

          <p className="text-base sm:text-lg text-[var(--zy-muted)] font-sans leading-relaxed text-balance">
            Most platforms teach programming like a legal document: memorizing arbitrary rules
            and syntax tables. Zyrix reveals the underlying machinery so you build lasting, intuitive mental models.
          </p>
        </div>

        {/* The Comparative Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Card 1: Traditional Way */}
          <div className="flex flex-col justify-between rounded-3xl bg-[var(--zy-surface-2)] border border-[var(--zy-border)] p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-xs">
            {/* Top Tag */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--zy-border)]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E04D62]/10 flex items-center justify-center">
                    <AlertCircle className="w-3.5 h-3.5 text-[#E04D62]" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--zy-muted)]">
                    Traditional Online Learning
                  </span>
                </div>
                <span className="text-xs font-mono text-[#E04D62] bg-[#E04D62]/10 px-2.5 py-0.5 rounded-full font-semibold">
                  Passive &amp; Abstract
                </span>
              </div>

              {/* Simulated Frustrating Experience */}
              <div className="bg-[#12151D] rounded-2xl p-4 sm:p-5 font-mono text-xs text-white shadow-inner space-y-3 mb-6 border border-[#2A3142]">
                <div className="text-[#8E95A5] pb-2 border-b border-[#2A3142] flex items-center justify-between text-[11px]">
                  <span>bash terminal — 42-minute video recording</span>
                  <span className="text-[#E04D62]">Disconnected</span>
                </div>
                <div className="text-[#8E95A5] space-y-1">
                  <p className="text-[#8E95A5]">&gt; python script.py</p>
                  <p className="text-[#FF6B81]">
                    Traceback (most recent call last):<br />
                    &nbsp;&nbsp;File &quot;script.py&quot;, line 18, in process_batch<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;result[key] = data[idx].normalize()<br />
                    TypeError: &apos;NoneType&apos; object is not subscriptable
                  </p>
                </div>
                <div className="pt-2 text-[11px] text-[#A0A6B5] italic">
                  &quot;Just pause the video, copy what&apos;s on the screen, and memorize this pattern for your exam.&quot;
                </div>
              </div>

              {/* Pain Points List */}
              <div className="space-y-3 text-sm text-[var(--zy-muted)]">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E04D62]/15 text-[#E04D62] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✕
                  </div>
                  <p>
                    <strong className="text-[var(--zy-text)] font-semibold">Syntax memorization:</strong> You memorize rules without ever seeing where data actually lives in memory.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E04D62]/15 text-[#E04D62] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✕
                  </div>
                  <p>
                    <strong className="text-[var(--zy-text)] font-semibold">Passive video watching:</strong> 30-minute lectures where the instructor types while you struggle to stay engaged.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E04D62]/15 text-[#E04D62] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✕
                  </div>
                  <p>
                    <strong className="text-[var(--zy-text)] font-semibold">Cryptic error debugging:</strong> You hit a stack trace and have no idea how variables evolved across previous lines.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--zy-border)] text-xs font-mono text-[var(--zy-muted)] flex items-center justify-between">
              <span>Result: High drop-out rates</span>
              <span className="text-[#E04D62] font-semibold">Low retention</span>
            </div>
          </div>

          {/* Card 2: The Zyrix Way */}
          <div className="flex flex-col justify-between rounded-3xl bg-[var(--zy-surface)] border-2 border-[#FFAA45] p-6 sm:p-8 relative overflow-hidden shadow-[0_12px_36px_-6px_rgba(255,170,69,0.15),0_2px_8px_rgba(0,0,0,0.06)]">
            {/* Top Accent Ribbon */}
            <div className="absolute top-0 right-0 bg-[#FFAA45] text-[#17191F] text-[10px] font-mono font-bold uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-2xs">
              The Zyrix Standard
            </div>

            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--zy-border)]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#25B8A5]/15 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[#25B8A5]" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--zy-text)]">
                    Visual &amp; Interactive Learning
                  </span>
                </div>
              </div>

              {/* Interactive Living Demonstration */}
              <div className="bg-[var(--zy-surface-2)] rounded-2xl p-4 sm:p-5 border border-[var(--zy-border)] space-y-3 mb-6">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--zy-border)] text-xs font-mono">
                  <span className="text-[var(--zy-text)] font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFAA45]" />
                    Interactive State Inspector
                  </span>
                  <button
                    type="button"
                    onClick={() => setRevealedMemory(!revealedMemory)}
                    className="inline-flex items-center gap-1 text-[11px] text-[#0E7568] hover:text-[var(--zy-text)] font-semibold cursor-pointer"
                  >
                    {revealedMemory ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {revealedMemory ? "Collapse Memory" : "Reveal Memory"}
                  </button>
                </div>

                {revealedMemory ? (
                  <div className="space-y-2 font-mono text-xs animate-in fade-in duration-200">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--zy-surface)] border border-[var(--zy-border)]">
                      <span className="font-bold text-[var(--zy-text)]">data[idx]</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-[#E04D62]/15 text-[#E04D62] px-2 py-0.5 rounded font-bold">
                          NoneType Alert!
                        </span>
                        <span className="text-[10px] text-[var(--zy-muted)]">Heap addr: 0x0</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#25B8A5]/10 border border-[#25B8A5]/30 text-[#0E7568] text-[11px] leading-relaxed">
                      💡 <strong>Visual Insight:</strong> Line 18 attempted to invoke <code className="font-bold">.normalize()</code> on an unassigned key. Zyrix highlights the exact null node before it causes a crash.
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs font-mono text-[var(--zy-muted)]">
                    Click &apos;Reveal Memory&apos; to inspect active heap state
                  </div>
                )}
              </div>

              {/* Advantage Points */}
              <div className="space-y-3 text-sm text-[var(--zy-text)]">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#25B8A5]/20 text-[#0E7568] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <p>
                    <strong className="text-[var(--zy-text)] font-semibold">Living state models:</strong> Watch data structures expand, pointers re-route, and arrays broadcast in real-time.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#25B8A5]/20 text-[#0E7568] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <p>
                    <strong className="text-[var(--zy-text)] font-semibold">Step-by-step time scrubbing:</strong> Scrub backwards and forwards through code execution like a timeline.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#25B8A5]/20 text-[#0E7568] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <p>
                    <strong className="text-[var(--zy-text)] font-semibold">Format-matched mediums:</strong> 3D vectors for geometry, state machines for logic, and code sandboxes for building.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--zy-border)] text-xs font-mono text-[var(--zy-text)] flex items-center justify-between">
              <span>Outcome: Deep conceptual mastery</span>
              <span className="text-[#0E7568] font-bold">100% Intuition Retained</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
