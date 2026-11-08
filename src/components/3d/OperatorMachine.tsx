"use client";

/**
 * OperatorMachine — the full 3D operator visualiser for Episode 3.
 *
 * Layout:
 *   - Top:   three-mode segmented switch (Arithmetic | Divide | Assignment)
 *   - Left/above (responsive): 3D canvas (ssr:false dynamic import)
 *   - Right/below: code panel + caption + playback controls + inputs
 *
 * The scene is a pure function of the current TraceStep.  Inputs rebuild
 * the trace and reset to step 0.
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import dynamic from "next/dynamic";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/components/usePrefersReducedMotion";
import {
  buildArithmeticTrace,
  buildDivideTrace,
  buildAssignTrace,
  type ArithOp,
  type AssignOp,
  type ArithInputs,
  type DivideInputs,
  type AssignInputs,
} from "./episode3Traces";
import type { TraceConfig } from "./trace";

/* ─────────────────────────────────────────────────────────────────────────────
   DYNAMIC IMPORT — no SSR
   ────────────────────────────────────────────────────────────────────────── */

const OperatorSceneCanvas = dynamic(
  () => import("./OperatorScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#F8F1E8] rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#C1502E] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[#6B6058]">Loading 3D scene…</span>
        </div>
      </div>
    ),
  }
);

/* ─────────────────────────────────────────────────────────────────────────────
   WEBGL DETECTION
   ────────────────────────────────────────────────────────────────────────── */
function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────────────────────────────────── */
type Mode3D = "arithmetic" | "divide" | "assignment";
const MODES: { id: Mode3D; label: string }[] = [
  { id: "arithmetic", label: "Arithmetic" },
  { id: "divide",     label: "Divide"     },
  { id: "assignment", label: "Assignment" },
];

type PlaySpeed = 0.5 | 1 | 2;
const SPEEDS: PlaySpeed[] = [0.5, 1, 2];

/* ─────────────────────────────────────────────────────────────────────────────
   SEGMENTED PROGRESS BAR (matches Watch/Story engine style)
   ────────────────────────────────────────────────────────────────────────── */
function StepBar({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex gap-1 w-full" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
            i < current
              ? "bg-[#8C7E72]"
              : i === current
              ? "bg-[#C1502E]"
              : "bg-[#E6DCC8]"
          }`}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CODE PANEL
   ────────────────────────────────────────────────────────────────────────── */
function CodePanel({
  lines,
  activeLine,
}: {
  lines: string[];
  activeLine: number;
}) {
  return (
    <div className="rounded-xl bg-[#14110F] border border-[#3E352F] overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#3E352F]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#C1502E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#E8956B]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#8C7E72]" />
        <span className="ml-2 text-[10px] font-mono text-[#6B6058]">operator.py</span>
      </div>
      <div className="p-3 font-mono text-[13px] leading-6 select-none">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`flex gap-2 px-2 py-0.5 rounded transition-all duration-200 ${
              i === activeLine
                ? "bg-[#C1502E]/20 border-l-2 border-[#C1502E]"
                : ""
            }`}
          >
            <span className="text-[#4A3F37] w-5 text-right shrink-0 select-none text-xs">
              {i + 1}
            </span>
            <span
              className={
                i === activeLine ? "text-[#F5EDE0]" : "text-[#8C7E72]"
              }
            >
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ARITHMETIC INPUTS
   ────────────────────────────────────────────────────────────────────────── */
const ARITH_OPS: ArithOp[] = ["+", "-", "*", "/", "//", "%", "**"];

function ArithInputPanel({
  inputs,
  onChange,
}: {
  inputs: ArithInputs;
  onChange: (next: ArithInputs) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* a slider */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#6B6058] w-8">a =</span>
        <input
          type="range" min={0} max={20} value={inputs.a}
          onChange={e => onChange({ ...inputs, a: Number(e.target.value) })}
          className="flex-1 accent-[#C1502E]"
        />
        <span className="font-mono text-xs text-[#2B2521] w-6 text-right">{inputs.a}</span>
      </div>
      {/* b slider */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#6B6058] w-8">b =</span>
        <input
          type="range" min={0} max={20} value={inputs.b}
          onChange={e => onChange({ ...inputs, b: Number(e.target.value) })}
          className="flex-1 accent-[#C1502E]"
        />
        <span className="font-mono text-xs text-[#2B2521] w-6 text-right">{inputs.b}</span>
      </div>
      {/* operator buttons */}
      <div className="flex flex-wrap gap-1.5">
        {ARITH_OPS.map(op => (
          <button
            key={op}
            type="button"
            onClick={() => onChange({ ...inputs, op })}
            className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] ${
              inputs.op === op
                ? "bg-[#C1502E] text-white border-[#C1502E]"
                : "bg-white text-[#2B2521] border-[#E6DCC8] hover:bg-[#FAF4ED]"
            }`}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DIVIDE INPUTS
   ────────────────────────────────────────────────────────────────────────── */
function DivideInputPanel({
  inputs,
  onChange,
}: {
  inputs: DivideInputs;
  onChange: (next: DivideInputs) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#6B6058] w-8">n =</span>
        <input
          type="range" min={1} max={30} value={inputs.n}
          onChange={e => onChange({ ...inputs, n: Number(e.target.value) })}
          className="flex-1 accent-[#C1502E]"
        />
        <span className="font-mono text-xs text-[#2B2521] w-6 text-right">{inputs.n}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#6B6058] w-8">k =</span>
        <input
          type="range" min={1} max={10} value={inputs.k}
          onChange={e => onChange({ ...inputs, k: Number(e.target.value) })}
          className="flex-1 accent-[#C1502E]"
        />
        <span className="font-mono text-xs text-[#2B2521] w-6 text-right">{inputs.k}</span>
      </div>
      <p className="text-xs text-[#6B6058]">
        Result: <code className="font-mono text-[#C1502E]">{inputs.n} // {inputs.k} = {Math.floor(inputs.n / inputs.k)}</code>
        &nbsp;·&nbsp;
        <code className="font-mono text-[#C1502E]">{inputs.n} % {inputs.k} = {inputs.n % inputs.k}</code>
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ASSIGNMENT INPUTS
   ────────────────────────────────────────────────────────────────────────── */
const ASSIGN_OPS: AssignOp[] = ["+=", "-=", "*=", "/="];

function AssignInputPanel({
  inputs,
  history,
  onChange,
  onReset,
}: {
  inputs: AssignInputs;
  history: number[];
  onChange: (next: AssignInputs) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-[#6B6058] w-20">amount =</span>
        <input
          type="range" min={1} max={10} value={inputs.amount}
          onChange={e => onChange({ ...inputs, amount: Number(e.target.value) })}
          className="flex-1 accent-[#C1502E]"
        />
        <span className="font-mono text-xs text-[#2B2521] w-6 text-right">{inputs.amount}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ASSIGN_OPS.map(op => (
          <button
            key={op}
            type="button"
            onClick={() => onChange({ ...inputs, op })}
            className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] ${
              inputs.op === op
                ? "bg-[#C1502E] text-white border-[#C1502E]"
                : "bg-white text-[#2B2521] border-[#E6DCC8] hover:bg-[#FAF4ED]"
            }`}
          >
            {op}
          </button>
        ))}
      </div>
      {/* History list */}
      {history.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-[#8C7E72] uppercase tracking-wider">Value history</span>
          <div className="flex gap-1.5 flex-wrap">
            {history.map((v, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded font-mono text-xs border ${
                  i === history.length - 1
                    ? "bg-[#C1502E]/10 border-[#C1502E]/30 text-[#C1502E] font-semibold"
                    : "bg-[#FAF4ED] border-[#E6DCC8] text-[#6B6058]"
                }`}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={onReset}
        className="text-xs text-[#6B6058] hover:text-[#C1502E] transition-colors text-left font-mono underline underline-offset-2"
      >
        ↺ Reset score to 90
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2D FALLBACK (no WebGL)
   ────────────────────────────────────────────────────────────────────────── */
function FallbackCanvas({ caption }: { caption: string }) {
  return (
    <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center bg-[#F8F1E8] rounded-xl border border-[#E6DCC8] gap-4 p-6">
      <div className="text-4xl">🧮</div>
      <p className="text-sm text-center text-[#6B6058] max-w-xs">
        3D visualiser requires WebGL, which isn&apos;t available in this browser. The code panel and captions below still work.
      </p>
      <div className="bg-white border border-[#E6DCC8] rounded-lg px-4 py-3 text-sm text-[#2B2521] max-w-xs text-center">
        {caption}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────────────────────── */
export default function OperatorMachine() {
  const reducedMotion = usePrefersReducedMotion();
  const [webgl] = useState(() => typeof window !== "undefined" ? supportsWebGL() : true);

  // ── Mode ─────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<Mode3D>("arithmetic");

  // ── Arithmetic inputs ────────────────────────────────────────────────────
  const [arithInputs, setArithInputs] = useState<ArithInputs>({ a: 12, b: 8, op: "+" });

  // ── Divide inputs ────────────────────────────────────────────────────────
  const [divInputs, setDivInputs] = useState<DivideInputs>({ n: 10, k: 3 });

  // ── Assignment inputs + history ──────────────────────────────────────────
  const [assignInputs, setAssignInputs] = useState<AssignInputs>({ op: "+=", amount: 5, history: [90] });
  const [assignHistory, setAssignHistory] = useState<number[]>([90]);

  // ── Playback ─────────────────────────────────────────────────────────────
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<PlaySpeed>(1);
  const playRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Build trace from current inputs ──────────────────────────────────────
  const trace: TraceConfig = useMemo(() => {
    switch (mode) {
      case "arithmetic": return buildArithmeticTrace(arithInputs);
      case "divide":     return buildDivideTrace(divInputs);
      case "assignment": return buildAssignTrace({ ...assignInputs, history: assignHistory });
    }
  }, [mode, arithInputs, divInputs, assignInputs, assignHistory]);

  const totalSteps = trace.steps.length;
  const currentStep = trace.steps[Math.min(stepIdx, totalSteps - 1)];

  // ── Reset step when trace changes ─────────────────────────────────────────
  const prevTraceRef = useRef(trace);
  useEffect(() => {
    if (prevTraceRef.current !== trace) {
      setStepIdx(0);
      setIsPlaying(false);
      prevTraceRef.current = trace;
    }
  }, [trace]);

  // ── Playback timer ────────────────────────────────────────────────────────
  const advance = useCallback(() => {
    setStepIdx(prev => {
      if (prev >= totalSteps - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [totalSteps]);

  useEffect(() => {
    if (!isPlaying) {
      if (playRef.current) clearTimeout(playRef.current);
      return;
    }
    const delay = (currentStep?.objects?.length > 4 ? 2800 : 2000) / speed;
    playRef.current = setTimeout(advance, delay);
    return () => { if (playRef.current) clearTimeout(playRef.current); };
  }, [isPlaying, stepIdx, speed, advance, currentStep]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === " ") { e.preventDefault(); setIsPlaying(p => !p); }
      if (e.key === "ArrowRight") { e.preventDefault(); setStepIdx(p => Math.min(p + 1, totalSteps - 1)); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setStepIdx(p => Math.max(p - 1, 0)); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalSteps]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    setStepIdx(0);
    setIsPlaying(false);
  }, []);

  const handleModeChange = useCallback((m: Mode3D) => {
    setMode(m);
    setStepIdx(0);
    setIsPlaying(false);
  }, []);

  // For assignment: when inputs change, don't append to history (only on "apply")
  const handleArithInputChange = (next: ArithInputs) => { setArithInputs(next); };
  const handleDivInputChange   = (next: DivideInputs) => { setDivInputs(next); };
  const handleAssignInputChange = (next: AssignInputs) => { setAssignInputs(next); };
  const handleAssignReset = () => {
    setAssignHistory([90]);
    setAssignInputs(prev => ({ ...prev, history: [90] }));
  };

  // Caption for aria-live
  const caption = currentStep?.caption ?? "";

  return (
    <div className="flex flex-col gap-0 w-full">
      {/* ── Top bar: mode switch + step counter ───────────────────────────── */}
      <div className="px-4 sm:px-6 pt-5 pb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#E6DCC8]">
        <div
          role="tablist"
          aria-label="Visualiser mode"
          className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]"
        >
          {MODES.map(m => {
            const isActive = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleModeChange(m.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-1 ${
                  isActive
                    ? "bg-[#C1502E] text-white shadow-xs"
                    : "text-[#6B6058] hover:text-[#2B2521] hover:bg-[#F1E2CF]"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs text-[#6B6058]">
          Step {stepIdx + 1} of {totalSteps}
        </span>
      </div>

      {/* ── Main two-column layout ────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-0">

        {/* Left: 3D canvas */}
        <div
          className="lg:w-[55%] h-[280px] sm:h-[340px] lg:h-[480px] border-b lg:border-b-0 lg:border-r border-[#E6DCC8] relative overflow-hidden"
          aria-label="3D visualiser canvas"
        >
          {webgl ? (
            <OperatorSceneCanvas
              step={currentStep}
              reducedMotion={reducedMotion}
              ariaLabel={`3D operator scene: ${caption}`}
            />
          ) : (
            <FallbackCanvas caption={caption} />
          )}

          {/* Operator badge overlay */}
          {currentStep?.operatorBadge && (
            <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-[#C1502E] flex items-center justify-center shadow-lg">
              <span className="font-mono font-bold text-white text-sm">
                {currentStep.operatorBadge}
              </span>
            </div>
          )}
        </div>

        {/* Right: controls + code + caption + inputs */}
        <div className="lg:w-[45%] flex flex-col gap-4 p-4 sm:p-5">

          {/* Progress bar */}
          <StepBar total={totalSteps} current={stepIdx} />

          {/* Playback controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStepIdx(p => Math.max(p - 1, 0))}
              disabled={stepIdx === 0}
              className="p-1.5 rounded-lg text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FAF4ED] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
              aria-label="Step back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(p => !p)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C1502E] hover:bg-[#A84224] text-white text-xs font-semibold transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-1"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? "Pause" : "Play"}
            </button>

            <button
              type="button"
              onClick={() => setStepIdx(p => Math.min(p + 1, totalSteps - 1))}
              disabled={stepIdx === totalSteps - 1}
              className="p-1.5 rounded-lg text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FAF4ED] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
              aria-label="Step forward"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FAF4ED] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
              aria-label="Reset to start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Speed */}
            <div className="ml-auto flex items-center gap-1 p-0.5 rounded-lg bg-[#FAF4ED] border border-[#E6DCC8]">
              {SPEEDS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C1502E] ${
                    speed === s
                      ? "bg-[#C1502E] text-white"
                      : "text-[#6B6058] hover:bg-[#F1E2CF]"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Caption aria-live */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className={`rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/60 px-4 py-3 text-sm text-[#2B2521] leading-relaxed min-h-[60px] transition-opacity duration-200 ${reducedMotion ? "" : ""}`}
          >
            <div className="flex items-start gap-2">
              <Zap className="w-3.5 h-3.5 text-[#C1502E] mt-0.5 shrink-0" />
              <span>{caption}</span>
            </div>
          </div>

          {/* Code panel */}
          <CodePanel
            lines={trace.codeLines}
            activeLine={currentStep?.codeLineIndex ?? 0}
          />

          {/* Inputs */}
          <div className="rounded-xl border border-[#E6DCC8] bg-white p-4">
            <div className="text-[10px] font-mono text-[#8C7E72] uppercase tracking-wider mb-3">
              Inputs · {mode === "arithmetic" ? "Arithmetic" : mode === "divide" ? "Divide" : "Assignment"}
            </div>
            {mode === "arithmetic" && (
              <ArithInputPanel inputs={arithInputs} onChange={handleArithInputChange} />
            )}
            {mode === "divide" && (
              <DivideInputPanel inputs={divInputs} onChange={handleDivInputChange} />
            )}
            {mode === "assignment" && (
              <AssignInputPanel
                inputs={assignInputs}
                history={assignHistory}
                onChange={handleAssignInputChange}
                onReset={handleAssignReset}
              />
            )}
          </div>

          {/* Keyboard hint */}
          <p className="text-[10px] font-mono text-[#A89F91] text-center">
            Space: Play/Pause · ← →: Step
          </p>
        </div>
      </div>
    </div>
  );
}

