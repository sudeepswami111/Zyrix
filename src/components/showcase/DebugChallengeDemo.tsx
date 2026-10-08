"use client";

import React, { useState } from "react";
import {
  Code2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Eye,
  FileCode,
} from "lucide-react";

const INITIAL_CODE = `from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

# 1. Fit scaler and normalize training features
X_train_scaled = scaler.fit_transform(X_train)

# 2. Normalize test features for model evaluation
# BUG: fit_transform() leaks test set distribution into the scaler!
X_test_scaled = scaler.fit_transform(X_test)`;

const SOLUTION_CODE = `from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

# 1. Fit scaler and normalize training features
X_train_scaled = scaler.fit_transform(X_train)

# 2. Normalize test features for model evaluation
# FIXED: transform() reuses mean/std strictly learned from training
X_test_scaled = scaler.transform(X_test)`;

export function DebugChallengeDemo() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");
  const [showHint, setShowHint] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  const handleReset = () => {
    setCode(INITIAL_CODE);
    setStatus("idle");
    setFeedback("");
    setShowHint(false);
    setHasAttempted(false);
  };

  const handleRevealSolution = () => {
    setCode(SOLUTION_CODE);
    setStatus("success");
    setFeedback(
      "Solution revealed! Notice how changing .fit_transform(X_test) to .transform(X_test) ensures no evaluation parameters leak into the feature scaler."
    );
  };

  const handleCheckFix = () => {
    setHasAttempted(true);

    // Normalize whitespace for resilient pattern validation
    const normalized = code.replace(/\r\n/g, "\n");

    const hasFitTransformTest = /scaler\s*\.\s*fit_transform\s*\(\s*X_test\s*\)/.test(
      normalized
    );
    const hasTransformTest = /scaler\s*\.\s*transform\s*\(\s*X_test\s*\)/.test(
      normalized
    );
    const hasTrainFit =
      /scaler\s*\.\s*fit_transform\s*\(\s*X_train\s*\)/.test(normalized) ||
      (/scaler\s*\.\s*fit\s*\(\s*X_train\s*\)/.test(normalized) &&
        /scaler\s*\.\s*transform\s*\(\s*X_train\s*\)/.test(normalized));

    if (hasTransformTest && !hasFitTransformTest && hasTrainFit) {
      setStatus("success");
      setFeedback(
        "✓ Clean fix! By calling scaler.transform(X_test), the test set is scaled using only the mean and standard deviation learned from X_train. The test set remains completely unseen."
      );
    } else if (hasFitTransformTest) {
      setStatus("error");
      setFeedback(
        "Not quite yet. Look closely at line 9: `X_test_scaled = scaler.fit_transform(X_test)`. Calling .fit_transform() re-estimates mean and variance on the test data. Which method only applies already-fitted parameters?"
      );
    } else if (!hasTrainFit) {
      setStatus("error");
      setFeedback(
        "Check your training step on line 6: `X_train_scaled = scaler.fit_transform(X_train)`. Make sure you still fit the scaler on the training set!"
      );
    } else {
      setStatus("error");
      setFeedback(
        "Make sure line 9 assigns `X_test_scaled = scaler.transform(X_test)`. Look for typos in method or variable names."
      );
    }
  };

  // Split lines for line numbers
  const lines = code.split("\n");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enable tab indentation inside textarea
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const updated =
        code.substring(0, start) + "    " + code.substring(end);
      setCode(updated);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden transition-all duration-300">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E6DCC8] bg-[#FAF4ED]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F1E2CF] text-[#C1502E] flex items-center justify-center shadow-xs">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A20]">
                Module 2: Data Preprocessing
              </span>
              <span className="text-[#C5B8A5]">•</span>
              <span className="text-xs text-[#6B6058] font-sans">
                Defect Diagnosis
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#2B2521]">
              Fix the Data Leakage Bug
            </h3>
          </div>
        </div>

        {/* Status indicator & reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E6DCC8] bg-white text-xs font-medium text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FBF6EF] transition-colors cursor-pointer shadow-xs"
            title="Reset code to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Code</span>
          </button>
          <span className="px-2.5 py-1 rounded-md bg-[#F1E2CF] text-[11px] font-mono font-medium text-[#8C3A20]">
            Python 3.11
          </span>
        </div>
      </div>

      {/* Task Description */}
      <div className="px-5 pt-5 pb-3 sm:px-7 sm:pt-6 text-xs sm:text-sm text-[#4A4036] font-sans leading-relaxed border-b border-[#F1E2CF]/80 bg-[#FFFDF9]">
        <p>
          <strong className="text-[#2B2521] font-medium">The Scenario: </strong>
          A machine learning model achieves 99.1% validation accuracy in staging,
          but drops to 71.3% when evaluated on production data. Spot and edit the
          data leakage bug on line 9 below so the test set remains strictly unseen.
        </p>
      </div>

      {/* Code Editor Container */}
      <div className="bg-[#1A1614] border-y border-[#3A332C]">
        {/* Editor Chrome Top Bar */}
        <div className="px-4 py-2 bg-[#25201C] border-b border-[#3A332C] flex items-center justify-between text-xs text-[#A89C8F]">
          <div className="flex items-center gap-2">
            <FileCode className="w-3.5 h-3.5 text-[#C1502E]" />
            <span className="font-mono text-[#D8CEBC] text-xs">
              evaluate_pipeline.py
            </span>
            <span className="text-[11px] text-[#8C7E72] hidden sm:inline">
              (editable snippet)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#8C7E72]">
              {lines.length} lines
            </span>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded ${
                status === "success"
                  ? "bg-[#1E3A2F] text-[#4ADE80]"
                  : status === "error"
                  ? "bg-[#3A281E] text-[#FBBF24]"
                  : "bg-[#2E2722] text-[#C5B8A5]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status === "success"
                    ? "bg-[#4ADE80]"
                    : status === "error"
                    ? "bg-[#FBBF24]"
                    : "bg-[#A89C8F]"
                }`}
              />
              {status === "success"
                ? "Pass"
                : status === "error"
                ? "Fix Needed"
                : "Ready to Test"}
            </span>
          </div>
        </div>

        {/* Editor Area with Line Numbers */}
        <div className="relative flex font-mono text-xs sm:text-sm leading-6 py-3 px-2 sm:px-4">
          {/* Line Numbers Column */}
          <div
            className="select-none text-right pr-4 text-[#5A5046] font-mono text-xs sm:text-sm leading-6 shrink-0 w-8"
            aria-hidden="true"
          >
            {lines.map((_, i) => (
              <div
                key={i}
                className={i === 8 ? "text-[#C1502E] font-bold" : ""}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Editable Text Area */}
          <div className="relative flex-1">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={lines.length}
              spellCheck={false}
              className="w-full bg-transparent text-[#F3EFE6] font-mono text-xs sm:text-sm leading-6 outline-hidden resize-none border-none p-0 focus:ring-0 selection:bg-[#C1502E]/40"
              style={{
                tabSize: 4,
                fontFamily:
                  'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Editor Controls & Feedback Area */}
      <div className="p-5 sm:p-6 bg-[#FAF4ED]/50 space-y-4">
        {/* Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCheckFix}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-white text-xs sm:text-sm font-sans font-medium shadow-warm-sm transition-all duration-200 cursor-pointer active:scale-98"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Check My Fix</span>
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#E6DCC8] bg-white text-xs sm:text-sm font-sans font-medium text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FBF6EF] transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
            </button>
          </div>

          {(hasAttempted || status === "error") && (
            <button
              onClick={handleRevealSolution}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-sans font-medium text-[#8C3A20] hover:bg-[#F1E2CF]/60 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Reveal Solution</span>
            </button>
          )}
        </div>

        {/* Hint Box (Collapsible) */}
        {showHint && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDF9] border border-[#E6DCC8] text-xs sm:text-sm text-[#6B6058] font-sans flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-[#F1E2CF] text-[#C1502E] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="text-[#2B2521]">Hint:</strong> In scikit-learn,{" "}
              <code className="px-1.5 py-0.5 rounded bg-[#F1E2CF] text-[#8C3A20] font-mono text-xs">
                .fit_transform()
              </code>{" "}
              calculates mean and standard deviation from the input data, then scales it.
              Which method applies <em>existing</em> pre-calculated parameters without
              fitting new ones?
            </div>
          </div>
        )}

        {/* Verification Status Banner */}
        {status !== "idle" && (
          <div
            className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
              status === "success"
                ? "bg-[#F1E2CF]/50 border-[#C1502E]/50 text-[#2B2521]"
                : "bg-[#FAF4ED] border-[#D97706]/50 text-[#6B6058]"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white shadow-xs ${
                  status === "success" ? "bg-[#C1502E]" : "bg-[#D97706]"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertTriangle className="w-4 h-4" />
                )}
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-serif font-bold text-[#2B2521]">
                  {status === "success"
                    ? "Pass — Defect Resolved!"
                    : "Diagnosis Feedback"}
                </h5>
                <p className="text-xs sm:text-sm font-sans leading-relaxed text-[#4A4036]">
                  {feedback}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8C7E72] font-sans border-t border-[#E6DCC8]/60">
          <span>
            ⚡ Verified via pattern-match AST validator. Zyrix full course challenges execute in isolated WebAssembly runtimes with unit test suites.
          </span>
          <span className="font-mono text-[11px] text-[#A89C8F]">
            Challenge ID: #DBG-204
          </span>
        </div>
      </div>
    </div>
  );
}
