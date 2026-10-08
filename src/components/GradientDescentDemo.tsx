"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Sliders,
  Sparkles,
  Code2,
  BookOpen,
  ArrowDownRight,
  TrendingDown,
} from "lucide-react";
import { calculateSurfaceHeight } from "./GradientDescentCanvas";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// Dynamically import Three.js Canvas with ssr: false to prevent hydration mismatches
const DynamicGradientDescentCanvas = dynamic(
  () => import("./GradientDescentCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[360px] sm:min-h-[420px] bg-[#1A1614] rounded-xl flex flex-col items-center justify-center text-[#D8CEBC] gap-3">
        <div className="w-7 h-7 border-2 border-[#C1502E] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-[#D8CEBC]">
          Mounting 3D Loss Surface...
        </span>
      </div>
    ),
  }
);

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const INITIAL_POINT = { x: 2.1, z: 1.95 };
const MAX_STEPS = 45;

export function GradientDescentDemo() {
  // CRITICAL FIX FROM PRIOR BUILD: Must default strictly to 'simple' on initial load
  const [mode, setMode] = useState<"simple" | "technical">("simple");

  const [ballPos, setBallPos] = useState({
    x: INITIAL_POINT.x,
    z: INITIAL_POINT.z,
  });
  const [trail, setTrail] = useState<Point3D[]>([
    {
      x: INITIAL_POINT.x,
      y: calculateSurfaceHeight(INITIAL_POINT.x, INITIAL_POINT.z),
      z: INITIAL_POINT.z,
    },
  ]);
  const [stepCount, setStepCount] = useState(0);
  const [learningRate, setLearningRate] = useState(0.08);

  // CRITICAL: Starts playing automatically on initial mount
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Pause simulation when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Perform single gradient descent update
  const takeStep = useCallback(() => {
    setBallPos((prev) => {
      // Derivatives: dH/dx = 0.64 * x, dH/dz = 0.96 * z
      const gradX = 0.64 * prev.x;
      const gradZ = 0.96 * prev.z;

      const nextX = prev.x - learningRate * gradX;
      const nextZ = prev.z - learningRate * gradZ;
      const nextY = calculateSurfaceHeight(nextX, nextZ);

      setTrail((prevTrail) => {
        if (prevTrail.length > 50) return prevTrail;
        return [...prevTrail, { x: nextX, y: nextY, z: nextZ }];
      });

      return { x: nextX, z: nextZ };
    });

    setStepCount((c) => c + 1);
  }, [learningRate]);

  // Reset to initial state
  const resetSimulation = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    setBallPos({ x: INITIAL_POINT.x, z: INITIAL_POINT.z });
    setTrail([
      {
        x: INITIAL_POINT.x,
        y: calculateSurfaceHeight(INITIAL_POINT.x, INITIAL_POINT.z),
        z: INITIAL_POINT.z,
      },
    ]);
    setStepCount(0);
  }, []);

  // Set a custom ball position (e.g. when user clicks directly on the 3D surface)
  const setCustomPoint = useCallback((x: number, z: number) => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    const clampedX = Math.max(-2.3, Math.min(2.3, x));
    const clampedZ = Math.max(-2.3, Math.min(2.3, z));
    const y = calculateSurfaceHeight(clampedX, clampedZ);
    setBallPos({ x: clampedX, z: clampedZ });
    setTrail([{ x: clampedX, y, z: clampedZ }]);
    setStepCount(0);
    setIsPlaying(true);
  }, []);

  // Animation loop: runs automatically on load, pauses when offscreen
  useEffect(() => {
    if (!isPlaying || !isInView) return;

    // Check if converged or reached max steps
    const currentHeight = calculateSurfaceHeight(ballPos.x, ballPos.z);
    if (stepCount >= MAX_STEPS || currentHeight < 0.005) {
      // Loop smoothly after a pleasant 1.4s pause at minimum
      resetTimerRef.current = setTimeout(() => {
        resetSimulation();
      }, 1400);
      return;
    }

    const interval = setInterval(() => {
      takeStep();
    }, 120);

    return () => {
      clearInterval(interval);
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };
  }, [isPlaying, isInView, stepCount, ballPos.x, ballPos.z, takeStep, resetSimulation]);

  // Current mathematical values
  const currentHeight = calculateSurfaceHeight(ballPos.x, ballPos.z);
  const gradMagnitude = Math.sqrt(
    Math.pow(0.64 * ballPos.x, 2) + Math.pow(0.96 * ballPos.z, 2)
  );

  // Derived values for Simple mode (House price estimation scenario)
  const priceError = Math.round(currentHeight * 4200 + 120);
  const priceSqftWeight = (145 + ballPos.x * 24).toFixed(1);
  const bedroomWeight = (22000 + ballPos.z * 6500).toFixed(0);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden transition-all duration-300"
    >
      {/* Card Header & Controls Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E6DCC8] bg-[#FAF4ED]/50 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Interactive Title & Mode Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F1E2CF] text-[#C1502E] flex items-center justify-center shadow-xs">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-[#2B2521] tracking-tight">
                {mode === "simple"
                  ? "Interactive Intuition: Predicting House Prices"
                  : "Convex Loss Optimization: 2D Gradient Descent"}
              </h3>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F1E2CF] text-[#8C3A20]">
                Live 3D Model
              </span>
            </div>
            <p className="text-xs text-[#6B6058]">
              {mode === "simple"
                ? "Watch the model automatically tweak its price formula to reduce errors."
                : "Iteratively minimizing cost function J(w) using steepest descent."}
            </p>
          </div>
        </div>

        {/* Right: Mode Toggle (CRITICAL: Defaults to Simple) */}
        <div
          className="inline-flex p-1 rounded-xl bg-[#F1E2CF]/80 border border-[#E6DCC8] text-xs font-medium"
          role="radiogroup"
          aria-label="Explanation Complexity"
        >
          <button
            type="button"
            role="radio"
            aria-checked={mode === "simple"}
            onClick={() => setMode("simple")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              mode === "simple"
                ? "bg-[#C1502E] text-white shadow-xs font-semibold"
                : "text-[#6B6058] hover:text-[#2B2521]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Simple Mode</span>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={mode === "technical"}
            onClick={() => setMode("technical")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              mode === "technical"
                ? "bg-[#C1502E] text-white shadow-xs font-semibold"
                : "text-[#6B6058] hover:text-[#2B2521]"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Technical Mode</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: 3D Canvas + Context Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#E6DCC8]">
        {/* 3D Visualizer Canvas (8 cols on desktop) */}
        <div className="lg:col-span-8 p-3 sm:p-5 flex flex-col bg-[#FAF4ED]/20">
          <div className="w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden shadow-inner border border-[#E6DCC8]/70 relative">
            <DynamicGradientDescentCanvas
              ballPos={ballPos}
              trail={trail}
              prefersReducedMotion={prefersReducedMotion}
              isInView={isInView}
              onSetCustomPosition={setCustomPoint}
            />
          </div>

          {/* Interactive Playback Toolbar */}
          <div className="mt-4 p-3 rounded-xl bg-white border border-[#E6DCC8] flex flex-wrap items-center justify-between gap-4 shadow-xs">
            {/* Playback Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#C1502E] hover:bg-[#A84224] text-white shadow-xs transition-colors active:scale-95"
                aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Resume</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  takeStep();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FAF4ED] hover:bg-[#F1E2CF] text-[#2B2521] border border-[#E6DCC8] transition-colors"
                title="Advance 1 step"
                aria-label="Advance 1 step"
              >
                <StepForward className="w-3.5 h-3.5" />
                <span>Step</span>
              </button>

              <button
                type="button"
                onClick={resetSimulation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FAF4ED] hover:bg-[#F1E2CF] text-[#6B6058] hover:text-[#2B2521] border border-[#E6DCC8] transition-colors"
                title="Reset position"
                aria-label="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Learning Rate Slider */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#6B6058]">
                <Sliders className="w-3.5 h-3.5 text-[#C1502E]" />
                <span className="font-medium">
                  {mode === "simple" ? "Step Size" : "Learning Rate (α)"}:
                </span>
                <span className="font-mono text-[#2B2521] font-semibold w-10">
                  {learningRate.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.02"
                max="0.18"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-24 sm:w-28 accent-[#C1502E] cursor-pointer"
                aria-label="Learning rate adjustment"
              />
            </div>

            {/* Step Counter Badge */}
            <div className="text-xs font-mono text-[#6B6058] bg-[#FAF4ED] px-2.5 py-1 rounded-md border border-[#E6DCC8]">
              Step <span className="font-semibold text-[#2B2521]">{stepCount}</span> / {MAX_STEPS}
            </div>
          </div>
        </div>

        {/* Real-time Metrics & Pedagogical Breakdown (4 cols on desktop) */}
        <div className="lg:col-span-4 p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-[#E6DCC8] bg-white flex flex-col justify-between">
          <div className="space-y-4">
            {/* Live Metrics Header */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6058]">
                {mode === "simple" ? "Model Performance" : "Mathematical Convergence"}
              </span>

              {mode === "simple" ? (
                // Simple Mode Metrics: House Pricing
                <div className="mt-3 space-y-2.5">
                  <div className="p-3 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]">
                    <div className="text-xs text-[#6B6058]">Current Error per House</div>
                    <div className="text-2xl font-serif font-bold text-[#C1502E] mt-0.5">
                      ${priceError.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-[#6B6058] mt-1 flex items-center gap-1">
                      <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Dropped from initial $13,800 mistake</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#FBF6EF] border border-[#E6DCC8]">
                      <div className="text-[#6B6058]">Price per Sq Ft</div>
                      <div className="font-semibold text-[#2B2521] mt-0.5">
                        ${priceSqftWeight}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FBF6EF] border border-[#E6DCC8]">
                      <div className="text-[#6B6058]">Bedroom Base</div>
                      <div className="font-semibold text-[#2B2521] mt-0.5">
                        ${parseInt(bedroomWeight).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Technical Mode Metrics: Gradient Calculus
                <div className="mt-3 space-y-2.5 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]">
                    <div className="text-[11px] font-sans text-[#6B6058]">
                      Objective Loss J(w₁, w₂)
                    </div>
                    <div className="text-xl font-bold text-[#C1502E] mt-0.5">
                      {currentHeight.toFixed(4)}
                    </div>
                    <div className="text-[11px] font-sans text-[#6B6058] mt-1">
                      Target: Global Minimum (0.0000)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-[#FBF6EF] border border-[#E6DCC8]">
                      <div className="text-[#6B6058] font-sans text-[11px]">Gradient ‖∇J‖</div>
                      <div className="font-semibold text-[#2B2521] mt-0.5">
                        {gradMagnitude.toFixed(4)}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FBF6EF] border border-[#E6DCC8]">
                      <div className="text-[#6B6058] font-sans text-[11px]">Weights [w₁, w₂]</div>
                      <div className="font-semibold text-[#2B2521] mt-0.5 truncate">
                        [{ballPos.x.toFixed(2)}, {ballPos.z.toFixed(2)}]
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Explanation / Intuition Box */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6058]">
                {mode === "simple" ? "How It Works" : "Algorithm Implementation"}
              </span>

              {mode === "simple" ? (
                <div className="mt-2 text-xs leading-relaxed text-[#2B2521] space-y-2 bg-[#FAF4ED]/60 p-3 rounded-xl border border-[#E6DCC8]">
                  <p>
                    <strong className="text-[#C1502E]">The Bowl Analogy:</strong> Imagine dropping a marble into a smooth mixing bowl. No matter where it begins, gravity nudges it downhill until it settles quietly at the bottom.
                  </p>
                  <p className="text-[#6B6058]">
                    Here, the bowl&apos;s height represents how inaccurate our price estimates are. With each step, the algorithm recalculates the steepest downward slope and updates the estimates until the error cannot get any smaller.
                  </p>
                </div>
              ) : (
                <div className="mt-2 bg-[#1A1614] p-3 rounded-xl text-[#F1E2CF] font-mono text-[11px] border border-[#3E352F] overflow-x-auto">
                  <div className="text-[#D8CEBC]/60 mb-1">{"# Python / NumPy parameter update"}</div>
                  <div>
                    <span className="text-[#E07A5F]">grad_w</span> = np.array([0.64 * w[0], 0.96 * w[1]])
                  </div>
                  <div>
                    <span className="text-[#F59E0B]">w</span> = w - alpha * grad_w
                  </div>
                  <div>
                    <span className="text-[#E07A5F]">loss</span> = 0.32 * w[0]**2 + 0.48 * w[1]**2
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#3E352F] text-[10px] text-[#D8CEBC]/70 font-sans">
                    Update rule: w := w - α∇J(w)
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick takeaway note */}
          <div className="mt-4 pt-3 border-t border-[#E6DCC8] flex items-center gap-2 text-xs text-[#6B6058]">
            <Sparkles className="w-4 h-4 text-[#C1502E] shrink-0" />
            <span>
              {mode === "simple"
                ? "Every mathematical equation has a tangible, visual counterpart."
                : "Real-time forward gradient descent computed entirely in your browser."}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Caption linking to Phase 2 */}
      <div className="px-4 py-3 bg-[#FAF4ED] flex items-center justify-between text-xs text-[#6B6058]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C1502E]" />
          <span>
            This 3D interactive model is <strong>1 of 7 learning formats</strong> in Zyrix.
          </span>
        </div>
        <a
          href="#how-we-teach"
          className="text-[#C1502E] hover:text-[#A84224] font-medium hover:underline flex items-center gap-1 transition-colors"
        >
          <span>See all 7 formats</span>
          <ArrowDownRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
