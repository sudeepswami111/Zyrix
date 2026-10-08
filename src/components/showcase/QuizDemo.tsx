"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface QuizOption {
  id: string;
  letter: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

const QUESTION_DATA = {
  id: "data-leakage-101",
  module: "Module 2: Machine Learning Foundations",
  topic: "Data Preprocessing & Evaluation Hygiene",
  question:
    "Which of the following scenarios is a direct example of data leakage?",
  options: [
    {
      id: "opt-a",
      letter: "A",
      text: "Fitting a feature scaler (e.g. StandardScaler) on the entire dataset before creating the train/test split.",
      isCorrect: true,
      explanation:
        "When fit() computes summary statistics (mean and standard deviation) on the whole dataset, information about the test distribution leaks into the scaler. The model indirectly learns patterns from the evaluation set, resulting in artificially inflated benchmark scores.",
    },
    {
      id: "opt-b",
      letter: "B",
      text: "Evaluating model generalization using 5-fold stratified cross-validation within the training split.",
      isCorrect: false,
      explanation:
        "This is standard best practice. Stratified cross-validation within training partitions evaluates variance and helps prevent overfitting without exposing any unseen holdout test data.",
    },
    {
      id: "opt-c",
      letter: "C",
      text: "Imputing missing values in the test set using column medians computed strictly from the training set.",
      isCorrect: false,
      explanation:
        "This is the correct, leakage-free procedure. Preprocessing parameters must always be derived purely from the training set and applied downstream to the test set.",
    },
    {
      id: "opt-d",
      letter: "D",
      text: "Applying random rotations and brightness jitters to training images to improve generalization.",
      isCorrect: false,
      explanation:
        "This is data augmentation, an effective regularization technique. It modifies training samples without introducing test sample signals into the training pipeline.",
    },
  ] as QuizOption[],
};

export function QuizDemo() {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
    setHasAnswered(true);
  };

  const handleReset = () => {
    setSelectedOptionId(null);
    setHasAnswered(false);
  };

  const selectedOption = QUESTION_DATA.options.find(
    (o) => o.id === selectedOptionId
  );
  const isSelectedCorrect = selectedOption?.isCorrect ?? false;
  const correctOption = QUESTION_DATA.options.find((o) => o.isCorrect);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden transition-all duration-300">
      {/* Quiz Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E6DCC8] bg-[#FAF4ED]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F1E2CF] text-[#C1502E] flex items-center justify-center shadow-xs">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A20]">
                {QUESTION_DATA.module}
              </span>
              <span className="text-[#C5B8A5]">•</span>
              <span className="text-xs text-[#6B6058] font-sans">
                {QUESTION_DATA.topic}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#2B2521]">
              Interactive Knowledge Check
            </h3>
          </div>
        </div>

        {/* Right Status / Reset */}
        <div className="flex items-center gap-2">
          {hasAnswered && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E6DCC8] bg-white text-xs font-medium text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FBF6EF] transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          )}
          <span className="px-2.5 py-1 rounded-md bg-[#F1E2CF] text-[11px] font-mono font-medium text-[#8C3A20]">
            1 Question Sample
          </span>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-5 sm:p-7 md:p-8 space-y-6">
        {/* Question Prompt */}
        <div>
          <span className="inline-block text-xs font-mono font-semibold uppercase tracking-wider text-[#C1502E] mb-2">
            Question 01
          </span>
          <h4 className="text-lg sm:text-xl font-serif font-semibold text-[#2B2521] leading-snug">
            {QUESTION_DATA.question}
          </h4>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {QUESTION_DATA.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isAnswered = hasAnswered;

            // Visual state calculation
            let cardStyles =
              "border-[#E6DCC8] bg-white hover:bg-[#FAF4ED] hover:border-[#D8CEBC] text-[#2B2521]";
            let badgeStyles = "bg-[#F1E2CF] text-[#8C3A20]";

            if (isAnswered) {
              if (isSelected) {
                if (option.isCorrect) {
                  // User chose correctly
                  cardStyles =
                    "border-[#C1502E] bg-[#F1E2CF]/40 text-[#2B2521] shadow-warm-sm ring-1 ring-[#C1502E]";
                  badgeStyles = "bg-[#C1502E] text-white";
                } else {
                  // User chose incorrectly
                  cardStyles =
                    "border-[#D97706]/70 bg-[#FAF4ED] text-[#6B6058] ring-1 ring-[#D97706]/50";
                  badgeStyles = "bg-[#D97706] text-white";
                }
              } else if (option.isCorrect) {
                // Not chosen, but is the correct answer: show soft highlight
                cardStyles =
                  "border-[#C1502E]/60 bg-[#F1E2CF]/20 text-[#2B2521]";
                badgeStyles = "bg-[#C1502E]/20 text-[#8C3A20]";
              } else {
                // Other unselected wrong options fade out slightly
                cardStyles =
                  "border-[#EDE4D5] bg-white/60 text-[#9C8F84] opacity-75";
                badgeStyles = "bg-[#EFE7DA] text-[#9C8F84]";
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={hasAnswered}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${cardStyles}`}
                aria-pressed={isSelected}
              >
                {/* Option Letter / Icon Pill */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-colors ${badgeStyles}`}
                >
                  {isAnswered && isSelected ? (
                    option.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <XCircle className="w-4 h-4 text-white" />
                    )
                  ) : isAnswered && option.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-[#C1502E]" />
                  ) : (
                    option.letter
                  )}
                </div>

                {/* Option Content Text */}
                <div className="flex-1 pt-0.5 sm:pt-1">
                  <p className="text-xs sm:text-sm font-sans leading-relaxed">
                    {option.text}
                  </p>
                </div>

                {/* Status Indicator Tag if Answered */}
                {isAnswered && isSelected && (
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded text-[11px] font-sans font-medium ${
                      option.isCorrect
                        ? "bg-[#C1502E]/15 text-[#8C3A20]"
                        : "bg-[#D97706]/15 text-[#92400E]"
                    }`}
                  >
                    {option.isCorrect ? "Correct fix" : "Your answer"}
                  </span>
                )}
                {isAnswered && !isSelected && option.isCorrect && (
                  <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-sans font-medium bg-[#C1502E]/10 text-[#8C3A20]">
                    Correct answer
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanatory Feedback Box */}
        {hasAnswered && selectedOption && (
          <div
            className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
              isSelectedCorrect
                ? "bg-[#F1E2CF]/50 border-[#C1502E]/40"
                : "bg-[#FAF4ED] border-[#D97706]/40"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white shadow-xs ${
                  isSelectedCorrect ? "bg-[#C1502E]" : "bg-[#D97706]"
                }`}
              >
                {isSelectedCorrect ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <BookOpen className="w-4 h-4" />
                )}
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-serif font-bold text-[#2B2521]">
                    {isSelectedCorrect
                      ? "Spot on! That's textbook data leakage."
                      : "Not quite — here is the conceptual trap:"}
                  </h5>
                </div>
                <p className="text-xs sm:text-sm text-[#4A4036] font-sans leading-relaxed">
                  {selectedOption.explanation}
                </p>
                {!isSelectedCorrect && correctOption && (
                  <div className="pt-2 mt-2 border-t border-[#E6DCC8]/70 text-xs text-[#6B6058] font-sans">
                    <strong className="text-[#8C3A20]">
                      Why Option {correctOption.letter} is correct:
                    </strong>{" "}
                    {correctOption.explanation}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quiz Footer Footnote */}
        <div className="pt-3 border-t border-[#E6DCC8] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8C7E72] font-sans">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C1502E]" />
            Real Zyrix questions include multi-step hints and concept cross-links.
          </span>
          <span className="font-mono text-[11px] text-[#A89C8F]">
            68% of learners answer this correctly on first attempt
          </span>
        </div>
      </div>
    </div>
  );
}
