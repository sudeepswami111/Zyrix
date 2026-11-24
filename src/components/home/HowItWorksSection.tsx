"use client";

import React, { useState } from "react";
import { BookOpen, Eye, Hammer, Sparkles, Check, ArrowRight, Play } from "lucide-react";

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [simSlider, setSimSlider] = useState<number>(4);
  const [codeTested, setCodeTested] = useState<boolean>(false);

  const steps = [
    {
      num: "01",
      id: 1 as const,
      title: "Understand",
      icon: BookOpen,
      accent: "#FFAA45",
      headline: "Learn concepts through simple explanations.",
      description:
        "Every complex topic begins with zero-jargon intuition. We strip away academic pretension and explain the 'why' before the syntax.",
      features: [
        "First-principles mental frameworks",
        "Visual storytelling through real-world scenarios",
        "Plain-English translations for every keyword",
      ],
    },
    {
      num: "02",
      id: 2 as const,
      title: "Visualize",
      icon: Eye,
      accent: "#25B8A5",
      headline: "Watch concepts come to life through animations.",
      description:
        "Never guess how data flows. Rotate 3D vector fields, inspect RAM allocations, and watch neural weights converge in real-time.",
      features: [
        "Interactive 3D geometry & WebGL models",
        "Real-time memory stack and heap graphs",
        "Controllable time-scrubbing playback",
      ],
    },
    {
      num: "03",
      id: 3 as const,
      title: "Build",
      icon: Hammer,
      accent: "#17191F",
      headline: "Apply your knowledge by solving challenges and building projects.",
      description:
        "Cement intuition with real in-browser execution. Fix real bugs, write performant algorithms, and ship end-to-end models.",
      features: [
        "In-browser WebAssembly Python runtime",
        "Instant test-driven verification with helpful feedback",
        "Portfolio-ready machine learning projects",
      ],
    },
  ];

  const current = steps[activeStep - 1];

  return (
    <section id="how-zyrix-works" className="relative py-20 sm:py-28 lg:py-32 bg-[#FAF9F5] border-t border-[#E7E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7E6DF] text-xs font-mono font-medium text-[#17191F]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFAA45]" />
            <span>The Zyrix Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#17191F] tracking-tight leading-tight">
            How Zyrix Works
          </h2>

          <p className="text-base sm:text-lg text-[#777B85] font-sans leading-relaxed text-balance">
            A three-step learning progression designed for permanent intuition.
            You read, you visualize the machinery, and you immediately build it yourself.
          </p>
        </div>

        {/* 3-Step Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Step Selector Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((s) => {
              const isActive = activeStep === s.id;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStep(s.id)}
                  className={`w-full text-left p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white border-[#17191F] shadow-[0_8px_24px_-4px_rgba(23,25,31,0.08)] scale-[1.01]"
                      : "bg-white/60 border-[#E7E6DF] hover:bg-white hover:border-[#D5D4CC]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shadow-2xs"
                        style={{
                          backgroundColor: isActive ? s.accent : "#F8F7F3",
                          color: isActive ? (s.id === 1 ? "#17191F" : "#FFFFFF") : "#777B85",
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-[#777B85] block font-semibold">
                          PHASE {s.num}
                        </span>
                        <h3 className="text-xl font-display font-bold text-[#17191F]">
                          {s.title}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                        isActive
                          ? "bg-[#17191F] text-white"
                          : "bg-[#F8F7F3] text-[#777B85]"
                      }`}
                    >
                      {isActive ? "Active Phase" : "Explore"}
                    </span>
                  </div>

                  <p className="text-sm text-[#777B85] font-sans leading-relaxed mt-2">
                    {s.headline}
                  </p>

                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-[#E7E6DF] space-y-2 animate-in fade-in duration-200">
                      {s.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-sans text-[#17191F]">
                          <Check className="w-3.5 h-3.5 text-[#25B8A5] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Dynamic Preview Stage (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E7E6DF] p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_-4px_rgba(23,25,31,0.05)] min-h-[460px] flex flex-col justify-between">
            {/* Header of Preview */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E6DF]">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#FFAA45]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#17191F]">
                  Phase {current.num} Interactive Demonstration
                </span>
              </div>
              <span className="text-xs font-mono text-[#25B8A5] bg-[#25B8A5]/10 px-2.5 py-1 rounded-lg">
                Real-Time Sandbox
              </span>
            </div>

            {/* Dynamic Stage Content based on active step */}
            <div className="my-8">
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-[#FAF9F5] p-5 sm:p-6 rounded-2xl border border-[#E7E6DF] space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[#777B85]">
                      <span>CONCEPT: DYNAMIC TYPING</span>
                      <span className="text-[#FFAA45] font-bold">Intuition First</span>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-[#E7E6DF] font-mono text-xs sm:text-sm text-[#17191F] space-y-1.5">
                      <p className="text-[#777B85]"># In Python, variables are tag stickers, not boxes.</p>
                      <p>
                        <span className="text-[#FFAA45] font-bold">x</span> = 42{" "}
                        <span className="text-[#777B85]">{"# sticker 'x' on integer 42"}</span>
                      </p>
                      <p>
                        <span className="text-[#FFAA45] font-bold">x</span> = &quot;Zyrix&quot;{" "}
                        <span className="text-[#777B85]">{"# sticker 'x' moved to string 'Zyrix'"}</span>
                      </p>
                    </div>

                    <p className="text-sm font-sans text-[#777B85] leading-relaxed">
                      Instead of dry rules about pointers and references, we show you that variables don&apos;t store objects — they point to them. This simple mental model eliminates 90% of beginner assignment confusion.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-[#FAF9F5] p-5 sm:p-6 rounded-2xl border border-[#E7E6DF] space-y-5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#17191F] font-bold">
                        INTERACTIVE VECTOR MULTIPLIER
                      </span>
                      <span className="text-[#25B8A5] font-mono font-bold">
                        Scale Factor: {simSlider}x
                      </span>
                    </div>

                    {/* Interactive Slider */}
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="1"
                        max="8"
                        value={simSlider}
                        onChange={(e) => setSimSlider(Number(e.target.value))}
                        className="w-full accent-[#25B8A5] cursor-pointer"
                        aria-label="Scale Factor Slider"
                      />
                      <div className="flex justify-between text-[11px] font-mono text-[#777B85]">
                        <span>1x Scale</span>
                        <span>4x Default</span>
                        <span>8x Max Expansion</span>
                      </div>
                    </div>

                    {/* Visual Animated Bars */}
                    <div className="bg-white p-4 rounded-xl border border-[#E7E6DF] space-y-3">
                      <span className="text-xs font-mono text-[#777B85] block">
                        Vector Magnitude Transformation [x, y, z]:
                      </span>
                      <div className="space-y-2">
                        {[
                          { label: "Dim X", base: 12 },
                          { label: "Dim Y", base: 18 },
                          { label: "Dim Z", base: 24 },
                        ].map((dim, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span className="text-xs font-mono w-12 text-[#17191F]">{dim.label}</span>
                            <div className="flex-1 h-5 bg-[#FAF9F5] rounded-md overflow-hidden border border-[#E7E6DF] p-0.5">
                              <div
                                className="h-full rounded-xs transition-all duration-300"
                                style={{
                                  width: `${Math.min(dim.base * simSlider * 0.45, 100)}%`,
                                  backgroundColor: idx === 1 ? "#FFAA45" : "#25B8A5",
                                }}
                              />
                            </div>
                            <span className="text-xs font-mono font-bold text-[#17191F] w-12 text-right">
                              {dim.base * simSlider}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-[#17191F] p-5 sm:p-6 rounded-2xl text-white font-mono text-xs sm:text-sm space-y-4 shadow-inner">
                    <div className="flex items-center justify-between pb-2 border-b border-[#2C303B] text-xs text-[#8E95A5]">
                      <span>challenge_01.py</span>
                      <span className="text-[#25B8A5]">Test-Driven Verification</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#A0A6B5]">
                      <p className="text-[#8E95A5]"># Calculate weighted score with threshold</p>
                      <p><span className="text-[#FFAA45]">def</span> evaluate_candidate(scores):</p>
                      <p className="pl-4">weighted = sum(scores) / len(scores)</p>
                      <p className="pl-4">
                        <span className="text-[#FFAA45]">return</span> weighted &gt;= 75
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setCodeTested(!codeTested)}
                        className="px-4 py-2 rounded-lg bg-[#FFAA45] hover:bg-[#E68522] text-[#17191F] font-bold text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{codeTested ? "Reset Test" : "Run Test Suite"}</span>
                      </button>

                      {codeTested && (
                        <span className="text-xs text-[#25B8A5] font-bold flex items-center gap-1 animate-in fade-in duration-150">
                          <Check className="w-4 h-4" /> 3 / 3 Tests Passed (0.04ms)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Insight Footer */}
            <div className="pt-4 border-t border-[#E7E6DF] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#777B85]">
              <span>Curriculum Phase: Active Step {activeStep} of 3</span>
              <a
                href="/learn/module-1/episode-1"
                className="inline-flex items-center gap-1 text-[#17191F] font-bold hover:text-[#FFAA45] transition-colors"
              >
                <span>Try this in Episode 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
