"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  ArrowRight,
  Trophy,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Compass,
} from "lucide-react";
import { QuizQuestion } from "./module1QuizQuestions";
import { usePrefersReducedMotion } from "@/components/usePrefersReducedMotion";

/* ─────────────────────────────────────────────────────────────────────────────
   STORAGE UTILITIES
   ────────────────────────────────────────────────────────────────────────── */
function readBestScore(storageKey: string): number | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw === null) return null;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function writeBestScore(storageKey: string, score: number): void {
  try {
    const current = readBestScore(storageKey);
    if (current === null || score > current) {
      localStorage.setItem(storageKey, String(score));
    }
  } catch {
    // Storage unavailable
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   SHUFFLE HELPER
   ────────────────────────────────────────────────────────────────────────── */
interface PreparedQuestion {
  question: QuizQuestion;
  shuffledOptions: string[];
  correctIndex: number;
}

function shuffleOptions(questions: QuizQuestion[]): PreparedQuestion[] {
  return questions.map((q) => {
    const originalCorrectOption = q.options[q.correctIndex];
    const optionsCopy = [...q.options];

    // Fisher-Yates shuffle
    for (let i = optionsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
    }

    const newCorrectIndex = optionsCopy.indexOf(originalCorrectOption);

    return {
      question: q,
      shuffledOptions: optionsCopy,
      correctIndex: newCorrectIndex,
    };
  });
}

function isCodeOption(text: string): boolean {
  // Only detect actual Python statements/calls (e.g. print("Hi"), age = 25)
  return (text.includes("(") && text.includes(")")) || /\w\s*=\s*/.test(text);
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROPS
   ────────────────────────────────────────────────────────────────────────── */
export interface ModuleQuizProps {
  questions: QuizQuestion[];
  storageKey?: string;
  moduleName?: string;
  onBackToLessons?: () => void;
}

export function ModuleQuiz({
  questions,
  storageKey = "zyrix_quiz_best_module-1",
  moduleName = "Module 1: Basic Python Programming",
  onBackToLessons,
}: ModuleQuizProps) {
  const reducedMotion = usePrefersReducedMotion();

  // Screen state: "intro" | "quiz" | "results"
  const [screen, setScreen] = useState<"intro" | "quiz" | "results">("intro");
  const [prepared, setPrepared] = useState<PreparedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Per-question interactive state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // Answers recorded across quiz: array of selected option indices (mapped to prepared)
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  // Best score state
  const [bestScore, setBestScore] = useState<number | null>(() =>
    readBestScore(storageKey)
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize fresh shuffle
  const initializeQuiz = useCallback(() => {
    const shuffled = shuffleOptions(questions);
    setPrepared(shuffled);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setIsChecked(false);
    setAnswers([]);
    setAnnouncement("");
    setScreen("quiz");
  }, [questions]);

  // Current question data
  const currentItem = prepared[currentIndex];
  const isLastQuestion = currentIndex === prepared.length - 1;

  // Keyboard navigation
  useEffect(() => {
    if (screen !== "quiz" || !currentItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting if user has an input focused (not usually present here)
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      const numOptions = currentItem.shuffledOptions.length;

      // 1-4 number selection (when not checked)
      if (!isChecked) {
        if (e.key === "1" && numOptions >= 1) {
          e.preventDefault();
          setSelectedIndex(0);
          return;
        }
        if (e.key === "2" && numOptions >= 2) {
          e.preventDefault();
          setSelectedIndex(1);
          return;
        }
        if (e.key === "3" && numOptions >= 3) {
          e.preventDefault();
          setSelectedIndex(2);
          return;
        }
        if (e.key === "4" && numOptions >= 4) {
          e.preventDefault();
          setSelectedIndex(3);
          return;
        }

        // Arrow keys navigation
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev === null ? 0 : (prev + 1) % numOptions
          );
          return;
        }
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev === null ? numOptions - 1 : (prev - 1 + numOptions) % numOptions
          );
          return;
        }
      }

      // Enter key
      if (e.key === "Enter") {
        e.preventDefault();
        if (!isChecked && selectedIndex !== null) {
          handleCheck();
        } else if (isChecked) {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screen, currentItem, isChecked, selectedIndex]);

  // Check answer
  const handleCheck = useCallback(() => {
    if (selectedIndex === null || !currentItem || isChecked) return;

    const isCorrect = selectedIndex === currentItem.correctIndex;
    setIsChecked(true);

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = selectedIndex;
    setAnswers(updatedAnswers);

    const feedbackText = isCorrect
      ? `Correct! ${currentItem.question.explanation}`
      : `Incorrect. Correct answer: ${
          currentItem.shuffledOptions[currentItem.correctIndex]
        }. ${currentItem.question.explanation}`;

    setAnnouncement(feedbackText);
  }, [selectedIndex, currentItem, isChecked, answers, currentIndex]);

  // Next question or finish
  const handleNext = useCallback(() => {
    if (!currentItem) return;

    if (isLastQuestion) {
      // Calculate final score
      let score = 0;
      prepared.forEach((item, idx) => {
        if (answers[idx] === item.correctIndex) {
          score += 1;
        }
      });
      writeBestScore(storageKey, score);
      setBestScore((prev) => (prev === null ? score : Math.max(prev, score)));
      setScreen("results");
    } else {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedIndex(null);
      setIsChecked(false);
      setAnnouncement("");
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentItem, isLastQuestion, prepared, answers, currentIndex, storageKey]);

  // Score statistics for results
  const scoreStats = useMemo(() => {
    if (prepared.length === 0) return { totalScore: 0, ep1Score: 0, ep2Score: 0, wrongQuestions: [] };

    let totalScore = 0;
    let ep1Score = 0;
    let ep2Score = 0;
    const wrongQuestions: {
      question: QuizQuestion;
      userAnswer: string;
      correctAnswer: string;
      explanation: string;
    }[] = [];

    prepared.forEach((item, idx) => {
      const userSelected = answers[idx];
      const isCorrect = userSelected === item.correctIndex;

      if (isCorrect) {
        totalScore += 1;
        if (item.question.episode === "What Is Python?") ep1Score += 1;
        else ep2Score += 1;
      } else {
        wrongQuestions.push({
          question: item.question,
          userAnswer:
            userSelected !== null && userSelected !== undefined
              ? item.shuffledOptions[userSelected]
              : "No answer",
          correctAnswer: item.shuffledOptions[item.correctIndex],
          explanation: item.question.explanation,
        });
      }
    });

    return { totalScore, ep1Score, ep2Score, wrongQuestions };
  }, [prepared, answers]);

  /* ─────────────────────────────────────────────────────────────────────────────
     RENDER: START / INTRO STATE
     ────────────────────────────────────────────────────────────────────────── */
  if (screen === "intro") {
    return (
      <div
        className={`w-full bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md p-6 sm:p-10 flex flex-col items-center text-center max-w-2xl mx-auto ${
          reducedMotion ? "" : "animate-in fade-in duration-300"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-[#F1E2CF] border border-[#E6DCC8] flex items-center justify-center text-[#C1502E] mb-5 shadow-xs">
          <HelpCircle className="w-7 h-7" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B2521] tracking-tight mb-2">
          Quiz
        </h2>

        <p className="text-base text-[#6B6058] font-sans leading-relaxed mb-6">
          10 questions on Episodes 1 and 2. No timer.
        </p>

        {bestScore !== null && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF4ED] border border-[#E6DCC8] text-xs font-mono font-semibold text-[#C1502E] mb-6">
            <Trophy className="w-3.5 h-3.5" />
            <span>Best: {bestScore}/10</span>
          </div>
        )}

        {/* Feature summary pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left text-xs mb-8">
          <div className="p-3.5 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C1502E] shrink-0" />
            <div>
              <span className="font-semibold text-[#2B2521]">5 Questions</span>
              <p className="text-[11px] text-[#6B6058]">From: What Is Python?</p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C1502E] shrink-0" />
            <div>
              <span className="font-semibold text-[#2B2521]">5 Questions</span>
              <p className="text-[11px] text-[#6B6058]">From: Assign a Value to a Variable</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={initializeQuiz}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-white text-sm sm:text-base font-semibold shadow-warm transition-all duration-200 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
        >
          <span>Start quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────────────────────
     RENDER: RESULTS SCREEN
     ────────────────────────────────────────────────────────────────────────── */
  if (screen === "results") {
    const { totalScore, ep1Score, ep2Score, wrongQuestions } = scoreStats;

    const encouragingLine =
      totalScore >= 9
        ? "Outstanding! You have a crystal-clear mental model of Python basics."
        : totalScore >= 6
        ? "Good work! You've grasped the core foundations. Review the questions below to lock it in."
        : "Keep practicing! Review Episodes 1 & 2 and take another shot.";

    return (
      <div
        className={`w-full max-w-3xl mx-auto flex flex-col gap-6 font-sans ${
          reducedMotion ? "" : "animate-in fade-in duration-300"
        }`}
      >
        {/* Score Summary Card */}
        <div className="bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-[#F1E2CF] border-2 border-[#C1502E] shrink-0 mx-auto sm:mx-0 shadow-xs">
            <Trophy className="w-7 h-7 text-[#C1502E] mb-1" />
            <span className="text-2xl font-bold font-serif text-[#2B2521]">
              {totalScore}/10
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] tracking-tight mb-1.5">
              {totalScore === 10
                ? "Perfect Score! 🎉"
                : totalScore >= 6
                ? "Quiz Complete!"
                : "Quiz Finished!"}
            </h2>
            <p className="text-sm text-[#6B6058] leading-relaxed">
              {encouragingLine}
            </p>
            {bestScore !== null && (
              <p className="text-xs font-mono font-semibold text-[#C1502E] mt-2">
                Best: {bestScore}/10
              </p>
            )}
          </div>
        </div>

        {/* Source Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#E6DCC8] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C1502E] block">
                Episode 1
              </span>
              <span className="text-sm font-semibold text-[#2B2521]">
                What Is Python?
              </span>
            </div>
            <span className="text-lg font-bold font-mono text-[#2B2521]">
              {ep1Score}/5
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E6DCC8] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C1502E] block">
                Episode 2
              </span>
              <span className="text-sm font-semibold text-[#2B2521]">
                Assign a Value to a Variable
              </span>
            </div>
            <span className="text-lg font-bold font-mono text-[#2B2521]">
              {ep2Score}/5
            </span>
          </div>
        </div>

        {/* Review List */}
        <div className="bg-white rounded-2xl border border-[#E6DCC8] shadow-xs overflow-hidden">
          <div className="px-5 py-4 bg-[#FAF4ED]/80 border-b border-[#E6DCC8] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#2B2521] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C1502E]" />
              <span>Question Review</span>
            </h3>
            <span className="text-xs font-mono text-[#6B6058]">
              {wrongQuestions.length === 0
                ? "100% Correct"
                : `${wrongQuestions.length} to review`}
            </span>
          </div>

          {wrongQuestions.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#6B6058]">
              <Sparkles className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-[#2B2521]">Flawless performance!</p>
              <p className="text-xs mt-1">You answered every question correctly on this attempt.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E6DCC8]">
              {wrongQuestions.map((item, idx) => (
                <div key={item.question.id || idx} className="p-5 flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono text-[#C1502E] font-bold">
                      {item.question.episode}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3" />
                      Incorrect
                    </span>
                  </div>

                  <p className="text-sm font-medium text-[#2B2521]">
                    {item.question.prompt}
                  </p>

                  {item.question.code && (
                    <div className="p-2.5 rounded-lg bg-[#1A1614] border border-[#3E352F] font-mono text-xs text-[#94d67a] overflow-x-auto whitespace-pre">
                      {item.question.code}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-1">
                    <div className="p-2.5 rounded-lg bg-red-50/60 border border-red-200/80 text-red-900">
                      <span className="font-semibold block text-[10px] uppercase tracking-wider text-red-700 mb-0.5">
                        Your Answer
                      </span>
                      <span className="font-mono text-xs">{item.userAnswer}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/80 text-emerald-900">
                      <span className="font-semibold block text-[10px] uppercase tracking-wider text-emerald-700 mb-0.5">
                        Correct Answer
                      </span>
                      <span className="font-mono text-xs">{item.correctAnswer}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B6058] bg-[#FAF4ED] p-2.5 rounded-lg border border-[#E6DCC8] leading-relaxed mt-1">
                    <strong className="text-[#2B2521] font-semibold">Why: </strong>
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <Link
            href="/#curriculum"
            onClick={onBackToLessons}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#E6DCC8] bg-white hover:bg-[#FAF4ED] text-sm font-medium text-[#2B2521] hover:text-[#C1502E] transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
          >
            <Compass className="w-4 h-4 text-[#6B6058]" />
            <span>Back to lessons</span>
          </Link>

          <button
            type="button"
            onClick={initializeQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-white text-sm font-semibold shadow-warm transition-all duration-200 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake quiz</span>
          </button>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────────────────────
     RENDER: QUESTION VIEW
     ────────────────────────────────────────────────────────────────────────── */
  if (!currentItem) return null;

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-3xl mx-auto flex flex-col gap-5 font-sans ${
        reducedMotion ? "" : "animate-in fade-in duration-200"
      }`}
    >
      {/* Hidden Live Region for Screen Readers */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Progress & Counter Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#6B6058]">
          <span className="font-semibold text-[#2B2521]">
            Question {currentIndex + 1} of {prepared.length}
          </span>
          {bestScore !== null && (
            <span className="text-[#C1502E] font-semibold">
              Best: {bestScore}/10
            </span>
          )}
        </div>

        {/* Segmented Progress Bar */}
        <div
          role="group"
          aria-label={`Progress: Question ${currentIndex + 1} of ${prepared.length}`}
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${prepared.length}, minmax(0, 1fr))`,
          }}
        >
          {prepared.map((item, idx) => {
            const hasAnswered = answers[idx] !== undefined && answers[idx] !== null;
            const isCorrect = hasAnswered && answers[idx] === item.correctIndex;
            const isCurrent = idx === currentIndex;

            let fillWidth = "0%";
            let fillBg = "#C1502E";

            if (hasAnswered) {
              fillWidth = "100%";
              fillBg = isCorrect ? "#10B981" : "#EF4444";
            } else if (isCurrent) {
              fillWidth = isChecked ? "100%" : "50%";
              if (isChecked) {
                fillBg = selectedIndex === item.correctIndex ? "#10B981" : "#EF4444";
              }
            }

            return (
              <div
                key={item.question.id || idx}
                aria-hidden="true"
                className="h-2 sm:h-2.5 rounded-full bg-[#E8DEC9] overflow-hidden"
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: fillWidth,
                    backgroundColor: fillBg,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md p-5 sm:p-7 flex flex-col gap-5">
        {/* Source Episode Pill */}
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4ED] border border-[#E6DCC8] text-xs font-mono font-medium text-[#C1502E]">
            <Sparkles className="w-3.5 h-3.5 text-[#C1502E]" />
            <span>From: {currentItem.question.episode}</span>
          </span>

          <span className="text-[11px] font-mono text-[#8C7E72] hidden sm:inline">
            Use keys 1-{currentItem.shuffledOptions.length} or Enter
          </span>
        </div>

        {/* Question Prompt */}
        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2B2521] tracking-tight leading-snug">
          {currentItem.question.prompt}
        </h3>

        {/* Code Snippet Container (if present) */}
        {currentItem.question.code && (
          <div className="w-full rounded-xl overflow-hidden border border-[#3E352F] bg-[#1E1A17] text-[#F1E2CF] shadow-xs">
            <div className="px-3.5 py-1.5 bg-[#14110F] border-b border-[#3E352F] flex items-center justify-between text-[11px] font-mono text-[#A89F91]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E07A5F]" />
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="ml-2 text-[10px] text-[#A89F91]">python</span>
              </div>
            </div>
            <div className="p-3.5 sm:p-4 font-mono text-xs sm:text-sm text-[#94d67a] whitespace-pre overflow-x-auto leading-relaxed">
              {currentItem.question.code}
            </div>
          </div>
        )}

        {/* Options List */}
        <div
          role="radiogroup"
          aria-label="Answer options"
          className="flex flex-col gap-2.5"
        >
          {currentItem.shuffledOptions.map((option, optIdx) => {
            const isSelected = selectedIndex === optIdx;
            const isCorrectOption = optIdx === currentItem.correctIndex;
            const isCode = isCodeOption(option);

            let optionStyle =
              "bg-white border-[#E6DCC8] text-[#2B2521] hover:bg-[#FAF4ED] hover:border-[#D8CEBC]";
            let badgeStyle = "bg-[#FAF4ED] text-[#6B6058] border-[#E6DCC8]";

            if (!isChecked) {
              if (isSelected) {
                optionStyle =
                  "bg-[#F1E2CF]/50 border-[#C1502E] text-[#2B2521] ring-2 ring-[#C1502E]/30";
                badgeStyle = "bg-[#C1502E] text-white border-[#C1502E]";
              }
            } else {
              // Post-check feedback styles
              if (isSelected) {
                if (isCorrectOption) {
                  optionStyle =
                    "bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30";
                  badgeStyle = "bg-emerald-600 text-white border-emerald-600";
                } else {
                  optionStyle =
                    "bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/30";
                  badgeStyle = "bg-red-600 text-white border-red-600";
                }
              } else if (isCorrectOption) {
                // Highlight the correct answer if the user picked wrong
                optionStyle =
                  "bg-emerald-50/50 border-emerald-400 border-dashed text-emerald-950";
                badgeStyle = "bg-emerald-600 text-white border-emerald-600";
              } else {
                optionStyle = "opacity-50 bg-[#FAF4ED]/50 border-[#E6DCC8]";
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={isChecked}
                onClick={() => {
                  if (!isChecked) setSelectedIndex(optIdx);
                }}
                className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] disabled:cursor-default ${optionStyle}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Number / Shortcut Key Badge */}
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 border transition-colors ${badgeStyle}`}
                  >
                    {optIdx + 1}
                  </span>

                  {/* Option Text */}
                  <span
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isCode
                        ? "font-mono font-semibold"
                        : "font-medium"
                    }`}
                  >
                    {option}
                  </span>
                </div>

                {/* Post-Check Status Icon */}
                {isChecked && (
                  <div className="shrink-0">
                    {isSelected && isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                    {isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    {!isSelected && isCorrectOption && (
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                        Correct Answer
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation Box (revealed when checked) */}
        {isChecked && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              selectedIndex === currentItem.correctIndex
                ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                : "bg-red-50/70 border-red-200 text-red-950"
            } ${reducedMotion ? "" : "animate-in fade-in slide-in-from-top-1 duration-200"}`}
          >
            {selectedIndex === currentItem.correctIndex ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}

            <div className="text-xs sm:text-sm leading-relaxed flex-1">
              <span className="font-bold block mb-0.5">
                {selectedIndex === currentItem.correctIndex
                  ? "Correct!"
                  : "Not quite."}
              </span>
              <p className="text-xs text-[#2B2521] leading-relaxed">
                {currentItem.question.explanation}
              </p>
            </div>
          </div>
        )}

        {/* Footer Transport Action Buttons */}
        <div className="pt-2 border-t border-[#E6DCC8]/80 flex items-center justify-between gap-3">
          <div className="text-xs text-[#6B6058] font-mono">
            {!isChecked
              ? selectedIndex === null
                ? "Select an option to check"
                : "Press Check or Enter"
              : "Press Next or Enter"}
          </div>

          <div className="flex items-center gap-2">
            {!isChecked ? (
              <button
                type="button"
                onClick={handleCheck}
                disabled={selectedIndex === null}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
              >
                <span>Check</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-white text-xs sm:text-sm font-semibold shadow-warm transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
              >
                <span>{isLastQuestion ? "See results" : "Next"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

