"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { RotateCcw, ChevronRight, Plus, Minus, CheckCircle2 } from "lucide-react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Operator = "+=" | "-=" | "*=";

interface LiveExecutionPanelProps {
  onRunComplete?: () => void;
}

export function LiveExecutionPanel({ onRunComplete }: LiveExecutionPanelProps) {
  const reducedMotion = usePrefersReducedMotion();

  // State
  const [operator, setOperator] = useState<Operator>("+=");
  const [amount, setAmount] = useState<number>(5);
  const [activeLine, setActiveLine] = useState<1 | 2 | 3 | null>(null);
  const [boxValue, setBoxValue] = useState<number | string>(90);
  const [showBox, setShowBox] = useState<boolean>(() => reducedMotion);
  const [showOutput, setShowOutput] = useState<boolean>(() => reducedMotion);
  const [announcement, setAnnouncement] = useState<string>("");
  const [isAutoLooping, setIsAutoLooping] = useState<boolean>(true);
  const [typingComplete, setTypingComplete] = useState<boolean>(() => reducedMotion);

  // Compute result dynamically
  const computeResult = useCallback((op: Operator, amt: number): number => {
    switch (op) {
      case "+=":
        return 90 + amt;
      case "-=":
        return 90 - amt;
      case "*=":
        return 90 * amt;
    }
  }, []);

  const result = computeResult(operator, amount);

  // Full code strings
  const fullLine1 = "score = 90";
  const fullLine2 = `score ${operator} ${amount}`;
  const fullLine3 = "print(score)";

  // Typed lines for initial load animation
  const [typedChars, setTypedChars] = useState(() => ({
    line1: reducedMotion ? fullLine1 : "",
    line2: reducedMotion ? fullLine2 : "",
    line3: reducedMotion ? fullLine3 : "",
  }));

  // Timers ref for cleanup
  const timerRefs = useRef<NodeJS.Timeout[]>([]);
  const clearAllTimers = () => {
    timerRefs.current.forEach((t) => clearTimeout(t));
    timerRefs.current = [];
  };

  const schedule = (fn: () => void, delayMs: number) => {
    const id = setTimeout(fn, delayMs);
    timerRefs.current.push(id);
    return id;
  };

  // 1. Initial Load: Type in code lines (~32ms per character)
  useEffect(() => {
    if (reducedMotion) return;

    let charIdx = 0;
    const totalLine1 = fullLine1.length;
    const totalLine2 = fullLine2.length;
    const totalLine3 = fullLine3.length;

    const interval = setInterval(() => {
      charIdx++;
      if (charIdx <= totalLine1) {
        setTypedChars((prev) => ({ ...prev, line1: fullLine1.slice(0, charIdx) }));
      } else if (charIdx <= totalLine1 + totalLine2) {
        const c2 = charIdx - totalLine1;
        setTypedChars((prev) => ({ ...prev, line2: fullLine2.slice(0, c2) }));
      } else if (charIdx <= totalLine1 + totalLine2 + totalLine3) {
        const c3 = charIdx - totalLine1 - totalLine2;
        setTypedChars((prev) => ({ ...prev, line3: fullLine3.slice(0, c3) }));
      } else {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 32);

    return () => clearInterval(interval);
  }, [reducedMotion, fullLine1, fullLine2, fullLine3]);

  // Execute sequence from Line 1 to Line 3
  const executeRun = useCallback(
    (customResult: number) => {
      clearAllTimers();

      if (reducedMotion) {
        setActiveLine(3);
        setShowBox(true);
        setBoxValue(customResult);
        setShowOutput(true);
        setAnnouncement(`Line 3: print(score) outputs ${customResult}`);
        return;
      }

      // Step a: Line 1 highlights (amber), box drops in showing 90
      setActiveLine(1);
      setShowBox(true);
      setBoxValue(90);
      setShowOutput(false);
      setAnnouncement("Line 1: Variable score initialized to 90");

      // Step b: Line 2 highlights, operator glows, value rolls to customResult
      schedule(() => {
        setActiveLine(2);
        setAnnouncement(`Line 2: score ${operator} ${amount} becomes ${customResult}`);

        // Value roll transition
        schedule(() => {
          setBoxValue(customResult);
        }, 300);
      }, 2200);

      // Step c: Line 3 highlights, output pill shows "→ customResult" in teal
      schedule(() => {
        setActiveLine(3);
        setShowOutput(true);
        setAnnouncement(`Line 3: print(score) outputs ${customResult}`);
        onRunComplete?.();
      }, 4500);

      // End of run: keep on screen for pause
      schedule(() => {
        setActiveLine(null);
      }, 7200);
    },
    [operator, amount, reducedMotion, onRunComplete]
  );

  // Auto-run loop: loops every ~9 seconds when isAutoLooping is active
  useEffect(() => {
    if (!typingComplete || !isAutoLooping || reducedMotion) return;

    // Start first run asynchronously
    const startTimer = setTimeout(() => {
      executeRun(result);
    }, 100);

    const loopInterval = setInterval(() => {
      executeRun(result);
    }, 9000);

    return () => {
      clearTimeout(startTimer);
      clearInterval(loopInterval);
      clearAllTimers();
    };
  }, [typingComplete, isAutoLooping, result, executeRun, reducedMotion]);

  // Manual Trigger: Step Button
  const handleStep = () => {
    setIsAutoLooping(false);
    clearAllTimers();

    if (activeLine === null || activeLine === 3) {
      // Go to Step 1
      setActiveLine(1);
      setShowBox(true);
      setBoxValue(90);
      setShowOutput(false);
      setAnnouncement("Line 1: Variable score initialized to 90");
    } else if (activeLine === 1) {
      // Go to Step 2
      setActiveLine(2);
      setBoxValue(result);
      setShowOutput(false);
      setAnnouncement(`Line 2: score ${operator} ${amount} becomes ${result}`);
    } else if (activeLine === 2) {
      // Go to Step 3
      setActiveLine(3);
      setShowOutput(true);
      setAnnouncement(`Line 3: print(score) outputs ${result}`);
    }
  };

  // Manual Trigger: Replay Button
  const handleReplay = () => {
    setIsAutoLooping(false);
    executeRun(result);
  };

  // Handle operator change
  const handleOperatorChange = (newOp: Operator) => {
    setIsAutoLooping(false);
    setOperator(newOp);
    const newRes = computeResult(newOp, amount);
    executeRun(newRes);
  };

  // Handle amount change
  const handleAmountChange = (newAmt: number) => {
    if (newAmt < 1 || newAmt > 9) return;
    setIsAutoLooping(false);
    setAmount(newAmt);
    const newRes = computeResult(operator, newAmt);
    executeRun(newRes);
  };

  const displayLine2 = typingComplete ? `score ${operator} ${amount}` : typedChars.line2;

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl bg-[var(--zy-surface)] border border-[var(--zy-border)] shadow-2xl overflow-hidden transition-all duration-300">
      {/* Screen Reader Live Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-[var(--zy-surface-2)] border-b border-[var(--zy-border)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B81] opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB454] opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#35E0C2] opacity-80" />
          </div>
          <span className="font-mono text-xs text-[var(--zy-muted)] tracking-wider">
            zyrix · live run
          </span>
        </div>

        {/* Live Pulse Indicator */}
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              activeLine !== null
                ? "bg-[var(--zy-active)] animate-ping"
                : "bg-[var(--zy-run)] opacity-70"
            }`}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--zy-muted)]">
            {activeLine !== null ? `STEP ${activeLine}` : "IDLE"}
          </span>
        </div>
      </div>

      {/* Main Panel Content: Code (Left) & Variable Box (Right) */}
      <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* Code Editor Mid-Run (Lines 1 to 3) */}
        <div className="sm:col-span-7 flex flex-col gap-1.5 font-mono text-xs sm:text-sm">
          {/* Line 1 */}
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
              activeLine === 1
                ? "bg-[var(--zy-active-subtle)] text-[var(--zy-text)] border-l-2 border-[var(--zy-active)] font-semibold shadow-xs"
                : "text-[var(--zy-text)]/90 border-l-2 border-transparent"
            }`}
          >
            <span className="w-4 text-[var(--zy-muted)]/60 text-right select-none font-mono text-xs">
              1
            </span>
            <span className="tracking-wide">
              {typingComplete ? fullLine1 : typedChars.line1}
            </span>
          </div>

          {/* Line 2 */}
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
              activeLine === 2
                ? "bg-[var(--zy-active-subtle)] text-[var(--zy-text)] border-l-2 border-[var(--zy-active)] font-semibold shadow-xs"
                : "text-[var(--zy-text)]/90 border-l-2 border-transparent"
            }`}
          >
            <span className="w-4 text-[var(--zy-muted)]/60 text-right select-none font-mono text-xs">
              2
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span>{displayLine2.split(" ")[0] || "score"}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-xs font-bold transition-all duration-300 ${
                  activeLine === 2
                    ? "bg-[var(--zy-active)] text-[var(--zy-btn-text)] shadow-sm scale-105"
                    : "bg-[var(--zy-surface-2)] text-[var(--zy-active-text)] border border-[var(--zy-border)]"
                }`}
              >
                {operator}
              </span>
              <span>{amount}</span>
            </div>
          </div>

          {/* Line 3 */}
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
              activeLine === 3
                ? "bg-[var(--zy-active-subtle)] text-[var(--zy-text)] border-l-2 border-[var(--zy-active)] font-semibold shadow-xs"
                : "text-[var(--zy-text)]/90 border-l-2 border-transparent"
            }`}
          >
            <span className="w-4 text-[var(--zy-muted)]/60 text-right select-none font-mono text-xs">
              3
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="tracking-wide">
                {typingComplete ? fullLine3 : typedChars.line3}
              </span>
              {/* Output pill in teal */}
              {showOutput && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[var(--zy-run-subtle)] text-[var(--zy-run-text)] border border-[var(--zy-run)]/40 animate-in fade-in zoom-in-95 duration-200"
                  aria-label={`Output: ${result}`}
                >
                  <CheckCircle2 className="w-3 h-3 text-[var(--zy-run)]" />
                  <span>→ {result}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Visual: Isometric CSS 3D Variable Box */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center py-2 sm:py-0">
          <div
            className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center"
            style={{ perspective: "700px" }}
          >
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 relative transition-all duration-500 ease-out ${
                showBox
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-75 -translate-y-6"
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: reducedMotion
                  ? "none"
                  : "rotateX(22deg) rotateY(-32deg)",
              }}
            >
              {/* Front Face with score label and value */}
              <div
                className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 shadow-xl"
                style={{
                  transform: reducedMotion ? "none" : "translateZ(40px)",
                  background: "var(--zy-surface-2)",
                  borderColor:
                    activeLine === 2
                      ? "var(--zy-active)"
                      : activeLine === 3
                      ? "var(--zy-run)"
                      : "var(--zy-border)",
                  boxShadow:
                    activeLine === 2
                      ? "0 0 25px rgba(255, 180, 84, 0.35)"
                      : activeLine === 3
                      ? "0 0 25px rgba(53, 224, 194, 0.35)"
                      : "0 4px 20px rgba(0, 0, 0, 0.25)",
                }}
              >
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--zy-muted)] mb-0.5">
                  score
                </span>
                <span
                  key={String(boxValue)}
                  className={`font-mono text-2xl sm:text-3xl font-bold transition-all duration-300 ${
                    activeLine === 2
                      ? "text-[var(--zy-active-text)] scale-110"
                      : activeLine === 3
                      ? "text-[var(--zy-run-text)]"
                      : "text-[var(--zy-text)]"
                  }`}
                >
                  {boxValue}
                </span>
              </div>

              {/* Top Face */}
              {!reducedMotion && (
                <div
                  className="absolute inset-0 rounded-2xl border opacity-75"
                  style={{
                    transform: "rotateX(90deg) translateZ(40px)",
                    background: "var(--zy-surface-elevated)",
                    borderColor:
                      activeLine === 2 ? "var(--zy-active)" : "var(--zy-border)",
                  }}
                />
              )}

              {/* Right Face */}
              {!reducedMotion && (
                <div
                  className="absolute inset-0 rounded-2xl border opacity-60"
                  style={{
                    transform: "rotateY(90deg) translateZ(40px)",
                    background: "var(--zy-surface)",
                    borderColor:
                      activeLine === 2 ? "var(--zy-active)" : "var(--zy-border)",
                  }}
                />
              )}
            </div>
          </div>
          <span className="mt-2 text-[10px] font-mono uppercase tracking-wider text-[var(--zy-muted)]/80">
            Variable Container
          </span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="px-5 py-3.5 bg-[var(--zy-surface-2)]/80 border-t border-[var(--zy-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Operator Segmented Control */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-[var(--zy-muted)] uppercase tracking-wider hidden sm:inline">
            Op:
          </span>
          <div
            role="group"
            aria-label="Select line 2 operator"
            className="inline-flex rounded-lg bg-[var(--zy-surface)] border border-[var(--zy-border)] p-0.5"
          >
            {(["+=", "-=", "*="] as Operator[]).map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => handleOperatorChange(op)}
                aria-pressed={operator === op}
                className={`px-2.5 py-1 rounded-md font-mono text-xs font-semibold transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)] ${
                  operator === op
                    ? "bg-[var(--zy-active)] text-[var(--zy-btn-text)] shadow-xs"
                    : "text-[var(--zy-muted)] hover:text-[var(--zy-text)]"
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        {/* Stepper (1 to 9) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-[var(--zy-muted)] uppercase tracking-wider hidden sm:inline">
            Amt:
          </span>
          <div className="inline-flex items-center rounded-lg bg-[var(--zy-surface)] border border-[var(--zy-border)] p-0.5">
            <button
              type="button"
              onClick={() => handleAmountChange(amount - 1)}
              disabled={amount <= 1}
              aria-label="Decrease amount"
              className="p-1 rounded text-[var(--zy-muted)] hover:text-[var(--zy-text)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)] cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-mono font-bold text-xs text-[var(--zy-text)]">
              {amount}
            </span>
            <button
              type="button"
              onClick={() => handleAmountChange(amount + 1)}
              disabled={amount >= 9}
              aria-label="Increase amount"
              className="p-1 rounded text-[var(--zy-muted)] hover:text-[var(--zy-text)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Step & Replay Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleStep}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--zy-surface)] hover:bg-[var(--zy-surface-elevated)] border border-[var(--zy-border)] text-[var(--zy-text)] font-mono text-xs font-medium transition-all active:scale-95 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)]"
          >
            <span>Step</span>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--zy-muted)]" />
          </button>

          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--zy-active)] hover:bg-[var(--zy-active-hover)] text-[var(--zy-btn-text)] font-mono text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </button>
        </div>
      </div>
    </div>
  );
}
