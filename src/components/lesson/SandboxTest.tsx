"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  Play,
  Send,
  Lightbulb,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  SkipForward,
  Terminal,
  Code2,
  Cpu,
  Loader2,
  Trophy,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { usePyodideRunner } from "@/hooks/usePyodideRunner";
import { usePrefersReducedMotion } from "@/components/usePrefersReducedMotion";
import type { TestQuestion } from "@/components/lesson/episode1TestQuestions";

/* ─────────────────────────────────────────────────────────────────────────────
   STORAGE HELPERS
   ────────────────────────────────────────────────────────────────────────── */
function readBestScore(episodeKey: string): number | null {
  try {
    const raw = localStorage.getItem(`zyrix_test_best_${episodeKey}`);
    if (raw === null) return null;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function writeBestScore(episodeKey: string, score: number): void {
  try {
    const current = readBestScore(episodeKey);
    if (current === null || score > current) {
      localStorage.setItem(`zyrix_test_best_${episodeKey}`, String(score));
    }
  } catch {
    /* storage unavailable – silent */
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   GRADING HELPER
   ────────────────────────────────────────────────────────────────────────── */
function normalise(s: string): string {
  // Trim trailing whitespace on every line, trim overall
  return s
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim();
}

interface GradeResult {
  passed: boolean;
  message: string;
}

function grade(
  question: TestQuestion,
  stdout: string,
  error: string | null,
  code: string
): GradeResult {
  if (error) {
    // Show the Python error in plain language
    const plain = error
      .replace(/PythonError:\s*/g, "")
      .replace(/Traceback \(most recent call last\):\s*/g, "")
      .trim();
    return { passed: false, message: `Python error: ${plain}` };
  }

  // Source check first (independent of output)
  if (question.sourceCheck && !question.sourceCheck.test(code)) {
    return { passed: false, message: question.sourceFailMessage ?? question.failMessage };
  }

  // Any non-empty output mode (e.g. "print your name")
  if (question.anyNonEmptyOutput) {
    const trimmed = normalise(stdout);
    if (trimmed.length === 0) {
      return { passed: false, message: question.failMessage };
    }
    return { passed: true, message: question.passMessage };
  }

  // Exact output match
  const got = normalise(stdout);
  const expected = normalise(question.expectedOutput);
  if (got === expected) {
    return { passed: true, message: question.passMessage };
  }
  return { passed: false, message: question.failMessage };
}

/* ─────────────────────────────────────────────────────────────────────────────
   TINY EDITOR (reuses the same dark-terminal aesthetic as SandboxPreview)
   ────────────────────────────────────────────────────────────────────────── */
interface MiniEditorProps {
  code: string;
  onChange: (v: string) => void;
  label: string;
}

function MiniEditor({ code, onChange, label }: MiniEditorProps) {
  const lines = code.split("\n");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const t = e.currentTarget;
      const s = t.selectionStart;
      const end = t.selectionEnd;
      const next = code.substring(0, s) + "    " + code.substring(end);
      onChange(next);
      setTimeout(() => {
        t.selectionStart = t.selectionEnd = s + 4;
      }, 0);
    }
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-[#3E352F] bg-[#1E1A17] text-[#F1E2CF] shadow-sm">
      {/* Title bar */}
      <div className="px-4 py-2 bg-[#14110F] border-b border-[#3E352F] flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 mr-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E07A5F]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
        </div>
        <span className="px-2 py-0.5 rounded bg-[#2B2521] text-[#E07A5F] text-[11px] font-mono font-medium flex items-center gap-1.5 border border-[#4A3F37]">
          <Code2 className="w-3.5 h-3.5 text-[#C1502E]" />
          answer.py
        </span>
      </div>

      {/* Code body */}
      <div className="relative flex font-mono text-xs sm:text-sm leading-6 py-3 px-2 sm:px-4 bg-[#1A1614] min-h-[80px]">
        {/* Line numbers */}
        <div
          className="select-none text-right pr-4 text-[#6B6058] font-mono text-xs sm:text-sm leading-6 shrink-0 w-8"
          aria-hidden="true"
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        {/* Textarea */}
        <div className="relative flex-1">
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={Math.max(lines.length, 3)}
            spellCheck={false}
            aria-label={label}
            className="w-full bg-transparent text-[#F3EFE6] font-mono text-xs sm:text-sm leading-6 outline-none resize-none border-none p-0 focus:ring-0 selection:bg-[#C1502E]/40"
            style={{
              tabSize: 4,
              fontFamily:
                'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   OUTPUT PANEL
   ────────────────────────────────────────────────────────────────────────── */
interface OutputPanelProps {
  stdout: string | null;
  error: string | null;
  isRunning: boolean;
  isLoading: boolean;
  initError: string | null;
  notRunYet: boolean;
}

function OutputPanel({
  stdout,
  error,
  isRunning,
  isLoading,
  initError,
  notRunYet,
}: OutputPanelProps) {
  return (
    <div className="p-3.5 sm:p-4 bg-[#14110F] border border-[#3E352F] rounded-xl flex flex-col gap-2 font-mono text-xs">
      <div className="flex items-center gap-1.5 text-[#A89F91] text-[10px] uppercase tracking-wider">
        <Terminal className="w-3.5 h-3.5 text-[#C1502E]" />
        <span>Output</span>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 py-1 text-[#A89F91]">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C1502E]" />
          <span>Starting Python runtime…</span>
        </div>
      )}
      {initError && (
        <div className="p-2.5 rounded bg-red-950/40 border border-red-900/50 text-red-300 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-red-400 mb-1">
            <AlertCircle className="w-4 h-4" />
            Runtime Error
          </div>
          <p className="text-[11px] leading-relaxed">{initError}</p>
        </div>
      )}
      {!isLoading && !initError && isRunning && (
        <div className="flex items-center gap-2 py-1 text-[#A89F91]">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C1502E]" />
          <span>Running…</span>
        </div>
      )}
      {!isLoading && !initError && !isRunning && notRunYet && (
        <div className="py-1.5 text-[#8C7E72] italic">
          &gt; Click Run or Submit to execute your code.
        </div>
      )}
      {!isLoading && !initError && !isRunning && !notRunYet && error && (
        <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/60 text-red-300 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-red-400 font-semibold mb-1 text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Python Error</span>
          </div>
          <pre className="text-[11px] leading-relaxed whitespace-pre-wrap font-mono text-red-200">
            {error
              .replace(/PythonError:\s*/g, "")
              .replace(/Traceback \(most recent call last\):\s*/g, "")
              .trim()}
          </pre>
        </div>
      )}
      {!isLoading && !initError && !isRunning && !notRunYet && !error && (
        <>
          {stdout ? (
            <pre className="text-emerald-400 font-mono text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap font-semibold">
              {stdout}
            </pre>
          ) : (
            <div className="py-1 text-[#8C7E72] italic text-xs">
              [Program completed with no output]
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   RESULT BANNER
   ────────────────────────────────────────────────────────────────────────── */
interface ResultBannerProps {
  passed: boolean;
  message: string;
  onNext: () => void;
  onSkip: () => void;
  onPrev?: () => void;
  canPrev?: boolean;
  isLastQuestion: boolean;
  canNext: boolean;
  reducedMotion: boolean;
}

function ResultBanner({
  passed,
  message,
  onNext,
  onSkip,
  onPrev,
  canPrev = false,
  isLastQuestion,
  canNext,
  reducedMotion,
}: ResultBannerProps) {
  return (
    <div
      aria-live="assertive"
      className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${
        passed
          ? "bg-emerald-950/30 border-emerald-800/50"
          : "bg-red-950/30 border-red-800/50"
      } ${reducedMotion ? "" : "animate-in fade-in slide-in-from-bottom-1 duration-200"}`}
    >
      <div className="flex items-start gap-2.5 flex-1 min-w-0">
        {passed ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        )}
        <div>
          <p className={`text-sm font-semibold ${passed ? "text-emerald-300" : "text-red-300"}`}>
            {passed ? "Correct!" : "Not quite."}
          </p>
          <p className="text-xs text-[#D8CEBC] mt-0.5 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {canPrev && onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2B2521] hover:bg-[#382E28] text-[#D8CEBC] border border-[#4A3F37] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
            aria-label="Go to previous question"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>
        )}
        {!passed && (
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2B2521] hover:bg-[#382E28] text-[#D8CEBC] border border-[#4A3F37] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
          >
            <SkipForward className="w-3.5 h-3.5" />
            Skip
          </button>
        )}
        {canNext && (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#C1502E] hover:bg-[#A84224] text-white border border-[#C1502E] transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
          >
            {isLastQuestion ? "See results" : "Next"}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   RESULT SCREEN
   ────────────────────────────────────────────────────────────────────────── */
interface QuestionResult {
  passed: boolean;
  skipped: boolean;
  hintsUsed: number;
}

interface ResultScreenProps {
  questions: TestQuestion[];
  results: QuestionResult[];
  episodeKey: string;
  onRetake: () => void;
  onPractice: () => void;
  reducedMotion: boolean;
}

function ResultScreen({
  questions,
  results,
  episodeKey,
  onRetake,
  onPractice,
  reducedMotion,
}: ResultScreenProps) {
  const score = results.filter((r) => r.passed).length;
  const totalHints = results.reduce((acc, r) => acc + r.hintsUsed, 0);
  const bestScore = readBestScore(episodeKey);

  // Write best score on mount
  useEffect(() => {
    writeBestScore(episodeKey, score);
  }, [episodeKey, score]);

  return (
    <div
      aria-live="polite"
      className={`w-full flex flex-col gap-5 ${reducedMotion ? "" : "animate-in fade-in duration-300"}`}
    >
      {/* Score card */}
      <div className="rounded-2xl border border-[#E6DCC8] bg-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#F1E2CF] border-2 border-[#C1502E] shrink-0 mx-auto sm:mx-0">
          <Trophy className="w-7 h-7 text-[#C1502E] mb-1" />
          <span className="text-2xl font-bold font-serif text-[#2B2521]">
            {score}/{questions.length}
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] mb-1">
            {score === questions.length
              ? "Perfect score! 🎉"
              : score >= questions.length / 2
              ? "Good work!"
              : "Keep practising!"}
          </h3>
          <p className="text-sm text-[#6B6058]">
            You answered {score} of {questions.length} questions correctly.
            {totalHints > 0
              ? ` You used ${totalHints} hint${totalHints !== 1 ? "s" : ""}.`
              : " No hints used — impressive!"}
          </p>
          {bestScore !== null && (
            <p className="text-xs font-mono text-[#C1502E] mt-1">
              Best score: {bestScore}/{questions.length}
            </p>
          )}
        </div>
      </div>

      {/* Per-question list */}
      <div className="rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/60 overflow-hidden">
        <div className="px-4 py-3 border-b border-[#E6DCC8] text-xs font-mono text-[#6B6058] uppercase tracking-wider">
          Question breakdown
        </div>
        {questions.map((q, idx) => {
          const r = results[idx];
          return (
            <div
              key={q.id}
              className="flex items-start gap-3 px-4 py-3 border-b last:border-0 border-[#E6DCC8]"
            >
              <div className="shrink-0 mt-0.5">
                {r?.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : r?.skipped ? (
                  <SkipForward className="w-4 h-4 text-[#A89F91]" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-mono text-[#C1502E] mr-2">
                  Q{idx + 1}
                </span>
                <span className="text-xs text-[#2B2521] font-medium">
                  {r?.passed ? "Correct" : r?.skipped ? "Skipped" : "Incorrect"}
                </span>
                {r?.hintsUsed > 0 && (
                  <span className="ml-2 text-[10px] font-mono text-[#8C7E72]">
                    ({r.hintsUsed} hint{r.hintsUsed !== 1 ? "s" : ""})
                  </span>
                )}
                <p className="text-[11px] text-[#6B6058] mt-0.5 line-clamp-2">
                  {q.prompt}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={onPractice}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#E6DCC8] bg-white hover:bg-[#FAF4ED] text-sm font-medium text-[#2B2521] hover:text-[#C1502E] transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Practice
        </button>
        <button
          type="button"
          onClick={onRetake}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-sm font-semibold text-white transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
        >
          <RotateCcw className="w-4 h-4" />
          Retake test
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN SandboxTest COMPONENT
   ────────────────────────────────────────────────────────────────────────── */
export interface SandboxTestProps {
  questions: TestQuestion[];
  episodeKey: string;
  /** Called when "Back to Practice" is clicked */
  onBackToPractice: () => void;
}

interface QuestionSessionState {
  code: string;
  hintShown: boolean;
  hintsUsed: number;
  runStdout: string | null;
  runError: string | null;
  hasRun: boolean;
  gradeResult: GradeResult | null;
  canAdvance: boolean;
}

export function SandboxTest({
  questions,
  episodeKey,
  onBackToPractice,
}: SandboxTestProps) {
  const reducedMotion = usePrefersReducedMotion();

  // ── Pyodide ──────────────────────────────────────────────────────────────
  const { isLoading, isReady, isRunning, initError, runPython } =
    usePyodideRunner();

  // ── Test state ────────────────────────────────────────────────────────────
  const [qIndex, setQIndex] = useState(0);
  const [code, setCode] = useState(questions[0]?.starter ?? "");
  const [hintShown, setHintShown] = useState(false);
  const [hintsUsedThisQ, setHintsUsedThisQ] = useState(0);

  // Output state (run-only, no grading)
  const [runStdout, setRunStdout] = useState<string | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState(false);

  // Grading state
  const [gradeResult, setGradeResult] = useState<GradeResult | null>(null);
  const [canAdvance, setCanAdvance] = useState(false);

  // Per-question result accumulator & session cache
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [sessionStates, setSessionStates] = useState<Record<number, QuestionSessionState>>({});
  const [showResults, setShowResults] = useState(false);

  // Best score (read once on mount)
  const [bestScore] = useState(() => readBestScore(episodeKey));

  const question = questions[qIndex];
  const isLastQuestion = qIndex === questions.length - 1;

  // ── Reset per question ────────────────────────────────────────────────────
  const resetForQuestion = useCallback(
    (idx: number) => {
      const q = questions[idx];
      setCode(q?.starter ?? "");
      setHintShown(false);
      setHintsUsedThisQ(0);
      setRunStdout(null);
      setRunError(null);
      setHasRun(false);
      setGradeResult(null);
      setCanAdvance(false);
    },
    [questions]
  );

  // ── Timeout-guarded run helper ────────────────────────────────────────────
  const TIMEOUT_MS = 5000;
  const runRef = useRef<AbortController | null>(null);

  const safeRun = useCallback(
    async (codeToRun: string): Promise<{ stdout: string; error: string | null }> => {
      runRef.current?.abort();
      const ac = new AbortController();
      runRef.current = ac;

      const timeoutId = setTimeout(() => ac.abort(), TIMEOUT_MS);
      try {
        const result = await runPython(codeToRun);
        clearTimeout(timeoutId);
        if (ac.signal.aborted) {
          return { stdout: "", error: "Execution timed out (5 s). Check for infinite loops." };
        }
        return { stdout: result.stdout ?? "", error: result.error ?? null };
      } catch (e: unknown) {
        clearTimeout(timeoutId);
        return {
          stdout: "",
          error: ac.signal.aborted
            ? "Execution timed out (5 s). Check for infinite loops."
            : String(e),
        };
      }
    },
    [runPython]
  );

  // ── Run (shows output, does not grade) ────────────────────────────────────
  const handleRun = useCallback(async () => {
    if (!isReady || isRunning) return;
    const { stdout, error } = await safeRun(code);
    setRunStdout(stdout);
    setRunError(error);
    setHasRun(true);
    // Clear any previous grade when the user re-runs
    setGradeResult(null);
    setCanAdvance(false);
  }, [isReady, isRunning, safeRun, code]);

  // ── Submit (runs + grades) ────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!isReady || isRunning || !question) return;
    const { stdout, error } = await safeRun(code);
    setRunStdout(stdout);
    setRunError(error);
    setHasRun(true);

    const result = grade(question, stdout, error, code);
    setGradeResult(result);
    setCanAdvance(result.passed);
  }, [isReady, isRunning, safeRun, code, question]);

  // ── Hint ──────────────────────────────────────────────────────────────────
  const handleHint = useCallback(() => {
    if (!hintShown) {
      setHintShown(true);
      setHintsUsedThisQ((n) => n + 1);
    }
  }, [hintShown]);

  // ── Previous ──────────────────────────────────────────────────────────────
  const handlePrev = useCallback(() => {
    if (qIndex <= 0) return;
    const prevIdx = qIndex - 1;

    setSessionStates((prev) => ({
      ...prev,
      [qIndex]: {
        code,
        hintShown,
        hintsUsed: hintsUsedThisQ,
        runStdout,
        runError,
        hasRun,
        gradeResult,
        canAdvance,
      },
    }));

    const prevSession = sessionStates[prevIdx];
    if (prevSession) {
      setCode(prevSession.code);
      setHintShown(prevSession.hintShown);
      setHintsUsedThisQ(prevSession.hintsUsed);
      setRunStdout(prevSession.runStdout);
      setRunError(prevSession.runError);
      setHasRun(prevSession.hasRun);
      setGradeResult(prevSession.gradeResult);
      setCanAdvance(prevSession.canAdvance);
    } else {
      resetForQuestion(prevIdx);
    }
    setQIndex(prevIdx);
  }, [
    qIndex,
    code,
    hintShown,
    hintsUsedThisQ,
    runStdout,
    runError,
    hasRun,
    gradeResult,
    canAdvance,
    sessionStates,
    resetForQuestion,
  ]);

  // ── Skip ──────────────────────────────────────────────────────────────────
  const handleSkip = useCallback(() => {
    if (!question) return;
    const skippedResult: QuestionResult = {
      passed: false,
      skipped: true,
      hintsUsed: hintsUsedThisQ,
    };
    const newResults = [...results];
    newResults[qIndex] = skippedResult;
    setResults(newResults);

    setSessionStates((prev) => ({
      ...prev,
      [qIndex]: {
        code,
        hintShown,
        hintsUsed: hintsUsedThisQ,
        runStdout,
        runError,
        hasRun,
        gradeResult: { passed: false, message: "Question skipped." },
        canAdvance: true,
      },
    }));

    if (isLastQuestion) {
      writeBestScore(
        episodeKey,
        newResults.filter((r) => r?.passed).length
      );
      setShowResults(true);
    } else {
      const next = qIndex + 1;
      const nextSession = sessionStates[next];
      if (nextSession) {
        setCode(nextSession.code);
        setHintShown(nextSession.hintShown);
        setHintsUsedThisQ(nextSession.hintsUsed);
        setRunStdout(nextSession.runStdout);
        setRunError(nextSession.runError);
        setHasRun(nextSession.hasRun);
        setGradeResult(nextSession.gradeResult);
        setCanAdvance(nextSession.canAdvance);
      } else {
        resetForQuestion(next);
      }
      setQIndex(next);
    }
  }, [
    question,
    hintsUsedThisQ,
    results,
    qIndex,
    code,
    hintShown,
    runStdout,
    runError,
    hasRun,
    isLastQuestion,
    episodeKey,
    sessionStates,
    resetForQuestion,
  ]);

  // ── Next ──────────────────────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    if (!canAdvance || !question) return;

    const passedResult: QuestionResult = {
      passed: true,
      skipped: false,
      hintsUsed: hintsUsedThisQ,
    };
    const newResults = [...results];
    newResults[qIndex] = passedResult;
    setResults(newResults);

    setSessionStates((prev) => ({
      ...prev,
      [qIndex]: {
        code,
        hintShown,
        hintsUsed: hintsUsedThisQ,
        runStdout,
        runError,
        hasRun,
        gradeResult,
        canAdvance,
      },
    }));

    if (isLastQuestion) {
      writeBestScore(
        episodeKey,
        newResults.filter((r) => r?.passed).length
      );
      setShowResults(true);
    } else {
      const next = qIndex + 1;
      const nextSession = sessionStates[next];
      if (nextSession) {
        setCode(nextSession.code);
        setHintShown(nextSession.hintShown);
        setHintsUsedThisQ(nextSession.hintsUsed);
        setRunStdout(nextSession.runStdout);
        setRunError(nextSession.runError);
        setHasRun(nextSession.hasRun);
        setGradeResult(nextSession.gradeResult);
        setCanAdvance(nextSession.canAdvance);
      } else {
        resetForQuestion(next);
      }
      setQIndex(next);
    }
  }, [
    canAdvance,
    question,
    hintsUsedThisQ,
    results,
    qIndex,
    code,
    hintShown,
    runStdout,
    runError,
    hasRun,
    gradeResult,
    isLastQuestion,
    episodeKey,
    sessionStates,
    resetForQuestion,
  ]);

  // ── Retake ────────────────────────────────────────────────────────────────
  const handleRetake = useCallback(() => {
    setQIndex(0);
    setResults([]);
    setSessionStates({});
    setShowResults(false);
    resetForQuestion(0);
  }, [resetForQuestion]);

  // ── Progress bar fills (same segmented style as NarratedVideoStage) ───────
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    progressBarRefs.current.forEach((bar, idx) => {
      if (!bar) return;
      const pastResult = results[idx];
      if (pastResult) {
        bar.style.width = "100%";
        bar.style.background = pastResult.passed
          ? "#10b981"  // emerald
          : pastResult.skipped
          ? "#6B6058"  // muted
          : "#ef4444"; // red
      } else if (idx === qIndex) {
        bar.style.width = "50%";
        bar.style.background = "#C1502E";
      } else {
        bar.style.width = "0%";
        bar.style.background = "#C1502E";
      }
    });
  }, [qIndex, results]);

  // ── Runtime status pill ───────────────────────────────────────────────────
  const runtimeLabel = isLoading
    ? "Loading Pyodide…"
    : initError
    ? "Runtime Error"
    : "Python 3.12 (Wasm)";

  // ── Memos ─────────────────────────────────────────────────────────────────
  const runDisabled = !isReady || isRunning;
  const submitDisabled = !isReady || isRunning;

  if (showResults) {
    return (
      <ResultScreen
        questions={questions}
        results={results}
        episodeKey={episodeKey}
        onRetake={handleRetake}
        onPractice={onBackToPractice}
        reducedMotion={reducedMotion}
      />
    );
  }

  if (!question) return null;

  return (
    <div className="w-full flex flex-col gap-5 font-sans">
      {/* ── Segmented progress bar ─────────────────────────────────────────── */}
      <div
        role="group"
        aria-label={`Question ${qIndex + 1} of ${questions.length}`}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center justify-between text-xs font-mono text-[#6B6058]">
          <span className="font-semibold text-[#2B2521]">
            Question {qIndex + 1} of {questions.length}
          </span>
          {bestScore !== null && (
            <span className="text-[#C1502E] font-semibold">
              Best: {bestScore}/{questions.length}
            </span>
          )}
        </div>

        <div
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${questions.length}, minmax(0, 1fr))`,
          }}
        >
          {questions.map((_, idx) => (
            <div
              key={idx}
              aria-hidden="true"
              className="h-2 sm:h-2.5 rounded-full bg-[#E8DEC9] overflow-hidden"
            >
              <div
                ref={(el) => {
                  progressBarRefs.current[idx] = el;
                }}
                className="h-full rounded-full"
                style={{ width: "0%", background: "#C1502E" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Prompt ────────────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/60 p-4 sm:p-5">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#C1502E] mb-2">
          <span>Task</span>
        </div>
        <p className="text-sm sm:text-base text-[#2B2521] leading-relaxed font-sans">
          {question.prompt}
        </p>
      </div>

      {/* ── Editor ────────────────────────────────────────────────────────── */}
      <MiniEditor
        code={code}
        onChange={(v) => {
          setCode(v);
          // Changing code invalidates the last grade
          if (gradeResult) {
            setGradeResult(null);
            setCanAdvance(false);
          }
        }}
        label={`Code editor for question ${qIndex + 1}`}
      />

      {/* ── Runtime bar + action buttons ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Runtime pill */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2B2521] border border-[#4A3F37] text-[10px] font-mono text-[#D8CEBC]">
          <Cpu className="w-3 h-3 text-[#E07A5F]" />
          {runtimeLabel}
        </span>

        <div className="flex items-center gap-2">
          {/* Hint */}
          {!hintShown && (
            <button
              type="button"
              onClick={handleHint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FAF4ED] hover:bg-[#F1E2CF] text-[#6B6058] hover:text-[#2B2521] border border-[#E6DCC8] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
              aria-label="Show hint"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#C1502E]" />
              Hint
            </button>
          )}

          {/* Reset */}
          <button
            type="button"
            onClick={() => resetForQuestion(qIndex)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-mono bg-[#2B2521] hover:bg-[#382E28] text-[#D8CEBC] border border-[#4A3F37] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
            title="Reset to starter code"
          >
            <RotateCcw className="w-3 h-3 text-[#E07A5F]" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Run */}
          <button
            type="button"
            onClick={handleRun}
            disabled={runDisabled}
            aria-label="Run code (shows output without grading)"
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] ${
              runDisabled
                ? "bg-[#3A332C] text-[#8C7E72] cursor-not-allowed border border-[#4A3F37]"
                : "bg-[#2B2521] hover:bg-[#382E28] text-[#D8CEBC] border border-[#4A3F37] active:scale-95"
            }`}
          >
            {isRunning && !gradeResult ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Running…</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run</span>
              </>
            )}
          </button>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitDisabled}
            aria-label="Submit code for grading"
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] ${
              submitDisabled
                ? "bg-[#3A332C] text-[#8C7E72] cursor-not-allowed border border-[#4A3F37]"
                : "bg-[#C1502E] hover:bg-[#A84224] text-white active:scale-95 border border-[#C1502E]"
            }`}
          >
            {isRunning && gradeResult === null && hasRun ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Checking…</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Hint reveal ───────────────────────────────────────────────────── */}
      {hintShown && (
        <div
          className={`flex items-start gap-2.5 rounded-xl border border-[#E6DCC8] bg-[#FAF4ED] px-4 py-3 text-sm text-[#6B6058] ${
            reducedMotion ? "" : "animate-in fade-in slide-in-from-top-1 duration-200"
          }`}
        >
          <Lightbulb className="w-4 h-4 text-[#C1502E] shrink-0 mt-0.5" />
          <p className="font-sans leading-relaxed">{question.hint}</p>
        </div>
      )}

      {/* ── Output panel ──────────────────────────────────────────────────── */}
      <OutputPanel
        stdout={runStdout}
        error={runError}
        isRunning={isRunning}
        isLoading={isLoading}
        initError={initError}
        notRunYet={!hasRun && !isRunning}
      />

      {/* ── Grade result banner ────────────────────────────────────────────── */}
      {gradeResult && (
        <ResultBanner
          passed={gradeResult.passed}
          message={gradeResult.message}
          onNext={handleNext}
          onSkip={handleSkip}
          onPrev={handlePrev}
          canPrev={qIndex > 0}
          isLastQuestion={isLastQuestion}
          canNext={canAdvance}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Navigation row: Previous question (when qIndex > 0) and Skip (when not graded) */}
      {!gradeResult && (
        <div className="flex items-center justify-between">
          {qIndex > 0 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#8C7E72] hover:text-[#2B2521] hover:bg-[#FAF4ED] border border-transparent hover:border-[#E6DCC8] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
              aria-label={`Go to previous question (Question ${qIndex})`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous question
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleSkip}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#8C7E72] hover:text-[#2B2521] hover:bg-[#FAF4ED] border border-transparent hover:border-[#E6DCC8] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
          >
            <SkipForward className="w-3.5 h-3.5" />
            Skip this question
          </button>
        </div>
      )}
    </div>
  );
}

