"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Box,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";

// Dynamically import Three.js Canvas with ssr: false
const DynamicKMeansCanvas = dynamic(() => import("./KMeansCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[360px] sm:min-h-[420px] bg-[#1A1614] rounded-xl flex flex-col items-center justify-center text-[#D8CEBC] gap-3">
      <div className="w-7 h-7 border-2 border-[#C1502E] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-mono text-[#D8CEBC]">
        Mounting 3D Cluster Simulation...
      </span>
    </div>
  ),
});

const STEP_EXPLANATIONS = [
  {
    step: 0,
    title: "Step 0: Random Initialization",
    desc: "3 centroid seeds (k=3) are initialized at arbitrary 3D coordinates across the feature space before any assignments occur.",
    wcss: "184.2 (High)",
  },
  {
    step: 1,
    title: "Step 1: First Voronoi Partition",
    desc: "Points are assigned to their nearest Euclidean centroid. Centroids migrate ~45% toward the empirical mean of their initial cluster.",
    wcss: "88.6 (Rapid descent)",
  },
  {
    step: 2,
    title: "Step 2: Recomputation & Fine-Tuning",
    desc: "Boundary points re-assign to tighter clusters. Centroid positions update to the recalculated geometric centers.",
    wcss: "41.3 (Near optimum)",
  },
  {
    step: 3,
    title: "Step 3: Convergence Reached",
    desc: "Centroids shift by less than threshold tolerance (Δ < 10⁻⁴). Within-Cluster Sum of Squares (WCSS) is stabilized at minimum.",
    wcss: "34.7 (Converged)",
  },
];

export function KMeansDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Pause when offscreen via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-play loop stepping through iterations
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion || !isInView) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 2800);

    return () => clearInterval(interval);
  }, [isPlaying, prefersReducedMotion, isInView]);

  const handleNextStep = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => (prev >= 3 ? 0 : prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const stepInfo = STEP_EXPLANATIONS[currentStep];

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden transition-all duration-300"
    >
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E6DCC8] bg-[#FAF4ED]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F1E2CF] text-[#C1502E] flex items-center justify-center shadow-xs">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A20]">
                Module 2: Unsupervised Learning
              </span>
              <span className="text-[#C5B8A5]">•</span>
              <span className="text-xs text-[#6B6058] font-sans">
                K-Means Clustering
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#2B2521]">
              Interactive 3D Centroid Migration
            </h3>
          </div>
        </div>

        {/* MANDATORY ACCURACY BADGE: Clearly marked illustrative animation */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-[11px] font-medium text-[#8C3A20] shadow-xs">
            <Sparkles className="w-3 h-3 text-[#C1502E]" />
            Illustrative animation
          </span>
        </div>
      </div>

      {/* 3D Scene Viewport */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-[#1A1614] overflow-hidden select-none">
        <DynamicKMeansCanvas
          currentStep={currentStep}
          prefersReducedMotion={prefersReducedMotion}
          isInView={isInView}
        />

        {/* Top Floating Overlay: Iteration Badge */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A1614]/85 border border-[#3A332C] text-xs font-mono text-[#F3EFE6] backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#C1502E] animate-pulse" />
            <span>Iteration {currentStep} / 3</span>
            <span className="text-[#8C7E72]">•</span>
            <span className="text-[#FBBF24]">WCSS: {stepInfo.wcss}</span>
          </div>
        </div>

        {/* Bottom Floating Legend */}
        <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-2 sm:gap-3 bg-[#1A1614]/85 border border-[#3A332C] px-3 py-1.5 rounded-xl backdrop-blur-xs text-[11px] font-mono text-[#D8CEBC]">
          <span className="text-[#8C7E72] font-sans">Clusters (k=3):</span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C1502E]" />
            Cluster A
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
            Cluster B
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
            Cluster C
          </span>
        </div>
      </div>

      {/* Controls & Stepper Bar */}
      <div className="p-4 sm:p-6 bg-[#FAF4ED]/50 space-y-4">
        {/* Step Indicator Progress Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((stepIdx) => (
            <button
              key={stepIdx}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep(stepIdx);
              }}
              className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                currentStep === stepIdx
                  ? "bg-[#F1E2CF] border-[#C1502E] shadow-xs"
                  : "bg-white/80 border-[#E6DCC8] hover:bg-[#FAF4ED] text-[#6B6058]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-semibold uppercase text-[#8C3A20]">
                  Step {stepIdx}
                </span>
                {stepIdx === 3 && currentStep === 3 && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C1502E]" />
                )}
              </div>
              <p className="text-xs font-medium text-[#2B2521] line-clamp-1">
                {stepIdx === 0
                  ? "Initial"
                  : stepIdx === 1
                  ? "Assign"
                  : stepIdx === 2
                  ? "Recompute"
                  : "Converged"}
              </p>
            </button>
          ))}
        </div>

        {/* Step Explanation Callout */}
        <div className="p-4 rounded-xl bg-white border border-[#E6DCC8] flex items-start gap-3">
          <div className="w-6 h-6 rounded-md bg-[#F1E2CF] text-[#C1502E] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs sm:text-sm font-serif font-bold text-[#2B2521]">
              {stepInfo.title}
            </h5>
            <p className="text-xs sm:text-sm text-[#4A4036] font-sans leading-relaxed">
              {stepInfo.desc}
            </p>
          </div>
        </div>

        {/* Playback Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-white text-xs sm:text-sm font-sans font-medium shadow-warm-sm transition-all duration-200 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Auto Play</span>
                </>
              )}
            </button>

            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E6DCC8] bg-white text-xs sm:text-sm font-sans font-medium text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FBF6EF] transition-colors cursor-pointer"
            >
              <StepForward className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>Step Forward</span>
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E6DCC8] bg-white text-xs sm:text-sm font-sans font-medium text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FBF6EF] transition-colors cursor-pointer"
              title="Reset to step 0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <span className="text-[11px] text-[#8C7E72] font-sans">
            Paused when scrolled out of view • Respects motion preferences
          </span>
        </div>
      </div>
    </div>
  );
}
