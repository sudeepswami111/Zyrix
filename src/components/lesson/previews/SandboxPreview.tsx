"use client";

import React, { useState } from "react";
import {
  Terminal,
  Play,
  RotateCcw,
  Code2,
  Cpu,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { usePyodideRunner } from "@/hooks/usePyodideRunner";

const STARTER_CODE = `print("Exam scores analyzed!")`;

export function SandboxPreview() {
  const [code, setCode] = useState(STARTER_CODE);
  const {
    isLoading,
    isReady,
    isRunning,
    initError,
    lastResult,
    runPython,
    resetOutput,
  } = usePyodideRunner();

  const lines = code.split("\n");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enable 4-space Tab indentation inside the code editor
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);

      // Restore cursor position after state update
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleRun = async () => {
    if (!isReady || isRunning) return;
    await runPython(code);
  };

  const handleReset = () => {
    setCode(STARTER_CODE);
    resetOutput();
  };

  return (
    <div className="w-full flex flex-col gap-4 font-sans">
      {/* Code Editor Frame */}
      <div className="relative w-full rounded-xl overflow-hidden border border-[#3E352F] bg-[#1E1A17] text-[#F1E2CF] shadow-sm">
        {/* Editor Title Bar */}
        <div className="px-4 py-2.5 bg-[#14110F] border-b border-[#3E352F] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            {/* Window action dots */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E07A5F]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            </div>
            <span className="px-2 py-0.5 rounded bg-[#2B2521] text-[#E07A5F] text-[11px] font-mono font-medium flex items-center gap-1.5 border border-[#4A3F37]">
              <Code2 className="w-3.5 h-3.5 text-[#C1502E]" />
              main.py
            </span>
            <span className="text-[10px] font-mono text-[#A89F91] hidden sm:inline">
              UTF-8
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Runtime Status Pill */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#25201C] border border-[#3E352F] text-[10px] font-mono text-[#D8CEBC]">
              <Cpu className="w-3 h-3 text-[#E07A5F]" />
              <span>
                {isLoading
                  ? "Loading Pyodide..."
                  : initError
                  ? "Runtime Error"
                  : "Python 3.12 (Wasm)"}
              </span>
            </span>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              title="Reset code to starter line"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2B2521] hover:bg-[#382E28] text-[#D8CEBC] text-[11px] font-mono border border-[#4A3F37] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-[#E07A5F]" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Run Button */}
            <button
              type="button"
              onClick={handleRun}
              disabled={!isReady || isRunning}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer ${
                !isReady || isRunning
                  ? "bg-[#3A332C] text-[#8C7E72] cursor-not-allowed border border-[#4A3F37]"
                  : "bg-[#C1502E] hover:bg-[#A84224] text-white active:scale-95 shadow-warm-sm border border-[#C1502E]"
              }`}
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Running...</span>
                </>
              ) : isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Starting...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Editor Body with Line Numbers */}
        <div className="relative flex font-mono text-xs sm:text-sm leading-6 py-3 px-2 sm:px-4 bg-[#1A1614] min-h-[110px]">
          {/* Line Numbers Column */}
          <div
            className="select-none text-right pr-4 text-[#5A5046] font-mono text-xs sm:text-sm leading-6 shrink-0 w-8"
            aria-hidden="true"
          >
            {lines.map((_, i) => (
              <div key={i} className="text-[#6B6058]">
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
              rows={Math.max(lines.length, 3)}
              spellCheck={false}
              aria-label="Python code editor"
              className="w-full bg-transparent text-[#F3EFE6] font-mono text-xs sm:text-sm leading-6 outline-none resize-none border-none p-0 focus:ring-0 selection:bg-[#C1502E]/40"
              style={{
                tabSize: 4,
                fontFamily:
                  'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace)',
              }}
            />
          </div>
        </div>

        {/* Real Interactive Terminal Output Tray */}
        <div className="p-3.5 sm:p-4 bg-[#14110F] border-t border-[#3E352F] flex flex-col gap-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[#A89F91] text-[10px] uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>Interactive Output</span>
            </div>
            {lastResult && (
              <div className="flex items-center gap-2 text-[10px] normal-case">
                {lastResult.error ? (
                  <span className="text-red-400 font-mono">Exit status: 1 (Error)</span>
                ) : (
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Success ({lastResult.executionTimeMs}ms)</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Output Content */}
          {isLoading ? (
            <div className="flex items-center gap-2 py-2 text-[#A89F91] text-xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C1502E]" />
              <span>Starting Python runtime (Pyodide WebAssembly)...</span>
            </div>
          ) : initError ? (
            <div className="p-2.5 rounded bg-red-950/40 border border-red-900/50 text-red-300 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-red-400 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>Runtime Initialization Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed">{initError}</p>
            </div>
          ) : lastResult ? (
            lastResult.error ? (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/60 text-red-300 overflow-x-auto">
                <div className="flex items-center gap-1.5 text-red-400 font-semibold mb-1 text-[11px]">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Python Traceback (Most Recent Call Last)</span>
                </div>
                <pre className="text-[11px] leading-relaxed whitespace-pre-wrap font-mono text-red-200">
                  {lastResult.error}
                </pre>
              </div>
            ) : lastResult.stdout ? (
              <div className="py-1">
                <pre className="text-emerald-400 font-mono text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap font-semibold">
                  {lastResult.stdout}
                </pre>
              </div>
            ) : (
              <div className="py-1 text-[#8C7E72] italic text-xs font-mono">
                [Program completed with zero output]
              </div>
            )
          ) : (
            <div className="py-1.5 text-[#8C7E72] text-xs font-mono">
              &gt; Code has not been run yet. Click &quot;Run&quot; above to execute.
            </div>
          )}
        </div>
      </div>

      {/* Light Nudge Toward Experimentation */}
      <div className="px-4 py-3 rounded-xl bg-white border border-[#E6DCC8] shadow-xs flex items-center gap-2.5 text-xs text-[#2B2521]">
        <Sparkles className="w-4 h-4 text-[#C1502E] shrink-0" />
        <p className="text-xs sm:text-sm text-[#6B6058]">
          <strong className="text-[#2B2521] font-medium">Try it yourself:</strong>{" "}
          Try changing the text inside the quotes to something else (e.g. your name or favorite dataset) and hit <span className="font-semibold text-[#C1502E]">Run</span> again!
        </p>
      </div>
    </div>
  );
}
