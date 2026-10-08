"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Check,
} from "lucide-react";

interface QuizOption {
  id: string;
  letter: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  conceptCategory: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    conceptCategory: "Syntax & Functions",
    question: "What is the primary purpose of Python's print() function?",
    options: [
      {
        id: "1A",
        letter: "A",
        text: "It sends a document to a physical desktop printer.",
        isCorrect: false,
        explanation: "In Python, print() is a console output command, not a hardware printer driver.",
      },
      {
        id: "1B",
        letter: "B",
        text: "It displays output, text, or calculated results directly on the screen.",
        isCorrect: true,
        explanation: "print() outputs text or data directly to your screen or interactive terminal.",
      },
      {
        id: "1C",
        letter: "C",
        text: "It converts numbers into binary machine code files.",
        isCorrect: false,
        explanation: "print() formats and displays human-readable output rather than writing raw binary.",
      },
      {
        id: "1D",
        letter: "D",
        text: "It saves the program into a new spreadsheet file.",
        isCorrect: false,
        explanation: "print() displays data in the console; saving files requires dedicated file operations.",
      },
    ],
  },
  {
    id: 2,
    conceptCategory: "Real-World Context",
    question: "In Asha's story, why was she eager to learn Python?",
    options: [
      {
        id: "2A",
        letter: "A",
        text: "To manually re-type every exam score into a notebook.",
        isCorrect: false,
        explanation: "Asha was already tired of manual re-calculations and wanted an automated way.",
      },
      {
        id: "2B",
        letter: "B",
        text: "To automate sorting, filtering, and recalculating three semesters of student exam data.",
        isCorrect: true,
        explanation: "Python excels at automating repetitive data tasks that would take hours to calculate manually in spreadsheets.",
      },
      {
        id: "2C",
        letter: "C",
        text: "To build a 3D video game engine from scratch.",
        isCorrect: false,
        explanation: "Asha's motivation was her real-world student exam spreadsheet.",
      },
      {
        id: "2D",
        letter: "D",
        text: "To replace her computer's operating system with Linux.",
        isCorrect: false,
        explanation: "Python runs on top of your existing operating system as a programming language.",
      },
    ],
  },
  {
    id: 3,
    conceptCategory: "Execution Flow",
    question: 'What happens when you run print("Exam scores analyzed!") in Python?',
    options: [
      {
        id: "3A",
        letter: "A",
        text: "The computer pauses and waits for an external compiler before running.",
        isCorrect: false,
        explanation: "Python executes code immediately without a separate manual compilation step from the user.",
      },
      {
        id: "3B",
        letter: "B",
        text: "It prints: Exam scores analyzed! directly to the terminal.",
        isCorrect: true,
        explanation: "Python immediately evaluates the print() function and outputs the text string inside the quotes.",
      },
      {
        id: "3C",
        letter: "C",
        text: "It throws an automatic syntax error because quotes are forbidden in print().",
        isCorrect: false,
        explanation: "Quotes are mandatory for string literals, not forbidden.",
      },
      {
        id: "3D",
        letter: "D",
        text: "It deletes the quotes and closes the sandbox window.",
        isCorrect: false,
        explanation: "Python executes the command and leaves the output visible in your sandbox.",
      },
    ],
  },
  {
    id: 4,
    conceptCategory: "Strings & Data Types",
    question: 'Why are quotes placed around "Exam scores analyzed!"?',
    options: [
      {
        id: "4A",
        letter: "A",
        text: "Quotes tell Python that the enclosed characters are text (a string), not code instructions or variable names.",
        isCorrect: true,
        explanation: "Text literals in Python are called strings and must be wrapped in quotes so Python treats them as data, not code commands.",
      },
      {
        id: "4B",
        letter: "B",
        text: "Quotes are optional visual styling decoration for the terminal.",
        isCorrect: false,
        explanation: "Quotes are syntactically required for text; without them, Python attempts to evaluate the words as variable names.",
      },
      {
        id: "4C",
        letter: "C",
        text: "Quotes tell the computer to hide the words from the screen.",
        isCorrect: false,
        explanation: "Quotes do not hide text; they define the boundaries of the string.",
      },
      {
        id: "4D",
        letter: "D",
        text: "Quotes are only required when text contains numbers.",
        isCorrect: false,
        explanation: "Quotes are required for all string text, regardless of whether numbers are present.",
      },
    ],
  },
  {
    id: 5,
    conceptCategory: "Error Diagnosis",
    question: 'What error occurs if you type print("Exam scores analyzed!) missing the closing quote?',
    options: [
      {
        id: "5A",
        letter: "A",
        text: "A ZeroDivisionError",
        isCorrect: false,
        explanation: "ZeroDivisionError only occurs when attempting to divide a number by zero.",
      },
      {
        id: "5B",
        letter: "B",
        text: "A SyntaxError, because the string literal was left unclosed.",
        isCorrect: true,
        explanation: "Python requires opening quotes to have a matching closing quote. Omitting it triggers SyntaxError: unterminated string literal.",
      },
      {
        id: "5C",
        letter: "C",
        text: "A HardwareFailureError",
        isCorrect: false,
        explanation: "Syntax errors are software grammatical mistakes, never hardware failures.",
      },
      {
        id: "5D",
        letter: "D",
        text: "Python will silently guess the missing quote and run anyway.",
        isCorrect: false,
        explanation: "Python is precise and will halt with a clear SyntaxError so you can correct your code.",
      },
    ],
  },
  {
    id: 6,
    conceptCategory: "Learning Mindset",
    question: "What advice did Asha's mentor give her when she first faced the blank sandbox?",
    options: [
      {
        id: "6A",
        letter: "A",
        text: "You must memorize all Python documentation before writing your first line.",
        isCorrect: false,
        explanation: "Nobody memorizes all documentation; coding is learned through active practice.",
      },
      {
        id: "6B",
        letter: "B",
        text: "Just start with something small. See what happens.",
        isCorrect: true,
        explanation: "Coding is best learned through small, curiosity-driven steps: write a simple line, run it, and observe the result.",
      },
      {
        id: "6C",
        letter: "C",
        text: "Never click Run until you've written at least 100 lines.",
        isCorrect: false,
        explanation: "Experienced developers run small snippets frequently rather than writing huge chunks untested.",
      },
      {
        id: "6D",
        letter: "D",
        text: "Always install five third-party software packages first.",
        isCorrect: false,
        explanation: "Python's standard library and in-browser sandboxes let you start immediately with zero installs.",
      },
    ],
  },
  {
    id: 7,
    conceptCategory: "The Developer Loop",
    question: "What is the core iterative loop that every programmer relies on when building projects?",
    options: [
      {
        id: "7A",
        letter: "A",
        text: "Write code, compile to disk, restart the computer.",
        isCorrect: false,
        explanation: "Restarting the computer is not part of modern software development loops.",
      },
      {
        id: "7B",
        letter: "B",
        text: "Write something, run it, see what happens.",
        isCorrect: true,
        explanation: "The tight feedback loop of writing code, running it immediately, and observing the output is the universal developer rhythm.",
      },
      {
        id: "7C",
        letter: "C",
        text: "Copy code blindly without testing until deployment day.",
        isCorrect: false,
        explanation: "Untested code leads to unexpected defects; continuous testing is essential.",
      },
      {
        id: "7D",
        letter: "D",
        text: "Only run code once a week after formal committee approval.",
        isCorrect: false,
        explanation: "Modern programming relies on rapid, minute-by-minute testing and validation.",
      },
    ],
  },
  {
    id: 8,
    conceptCategory: "Python Architecture",
    question: "Unlike languages requiring complex compilation before seeing any output, Python allows you to:",
    options: [
      {
        id: "8A",
        letter: "A",
        text: "Execute lines of code immediately and see results right away.",
        isCorrect: true,
        explanation: "Python's interpreted execution provides instant feedback, allowing you to test and iterate without cumbersome manual compile cycles.",
      },
      {
        id: "8B",
        letter: "B",
        text: "Run programs only when completely offline with no terminal.",
        isCorrect: false,
        explanation: "Python runs both online in sandboxes and locally in terminals.",
      },
      {
        id: "8C",
        letter: "C",
        text: "Skip all mathematical logic entirely.",
        isCorrect: false,
        explanation: "Python handles mathematics with high precision and flexibility.",
      },
      {
        id: "8D",
        letter: "D",
        text: "Write code without ever using a keyboard.",
        isCorrect: false,
        explanation: "Coding still requires inputting text commands.",
      },
    ],
  },
  {
    id: 9,
    conceptCategory: "Syntax Rules",
    question: 'Which of the following is a valid Python 3 statement that successfully outputs "Hello, Python!"?',
    options: [
      {
        id: "9A",
        letter: "A",
        text: "print(Hello, Python!)",
        isCorrect: false,
        explanation: "Without quotes, Python thinks Hello and Python are undefined variable names and throws NameError.",
      },
      {
        id: "9B",
        letter: "B",
        text: 'print "Hello, Python!"',
        isCorrect: false,
        explanation: "This was legacy Python 2 syntax; modern Python 3 requires parentheses around function arguments.",
      },
      {
        id: "9C",
        letter: "C",
        text: 'print("Hello, Python!")',
        isCorrect: true,
        explanation: "In modern Python 3, print() is a function that requires parentheses and quotes around string text.",
      },
      {
        id: "9D",
        letter: "D",
        text: "output -> Hello, Python!",
        isCorrect: false,
        explanation: "This is not valid Python syntax.",
      },
    ],
  },
  {
    id: 10,
    conceptCategory: "Ecosystem & Strengths",
    question: "What makes Python the leading language for data science and machine learning?",
    options: [
      {
        id: "10A",
        letter: "A",
        text: "Its clean, readable syntax that reads like plain English, combined with instant feedback and rich libraries.",
        isCorrect: true,
        explanation: "Python's human-centric syntax, instant iteration loop, and vast scientific libraries make it the undisputed standard for data science.",
      },
      {
        id: "10B",
        letter: "B",
        text: "It forces you to write code in binary ones and zeroes.",
        isCorrect: false,
        explanation: "Python is a high-level language designed to spare humans from dealing with raw binary.",
      },
      {
        id: "10C",
        letter: "C",
        text: "It only works on government mainframe supercomputers.",
        isCorrect: false,
        explanation: "Python runs on laptops, phones, servers, and directly in browsers via WebAssembly.",
      },
      {
        id: "10D",
        letter: "D",
        text: "It requires all code to be written inside spreadsheet cells first.",
        isCorrect: false,
        explanation: "Python operates independently as standalone script files and interactive notebooks.",
      },
    ],
  },
];

export function QuizPreview() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const selectedOptionId = answers[currentQ.id];
  const hasAnswered = !!selectedOptionId;
  const selectedOption = currentQ.options.find((opt) => opt.id === selectedOptionId);
  const correctOption = currentQ.options.find((opt) => opt.isCorrect);

  // Calculate score (10 points per question = 100 max)
  const score = Object.entries(answers).reduce((acc, [qId, optId]) => {
    const question = QUIZ_QUESTIONS.find((q) => q.id === Number(qId));
    const option = question?.options.find((o) => o.id === optId);
    return option?.isCorrect ? acc + 10 : acc;
  }, 0);

  const correctCount = score / 10;

  const handleSelectOption = (optionId: string) => {
    if (hasAnswered) return; // Locked once answered
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }));
  };

  const handleNext = () => {
    if (!hasAnswered) return;
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsQuizCompleted(false);
  };

  // Completion Screen
  if (isQuizCompleted) {
    const percentage = (score / 100) * 100;
    let encouragementMessage = "";

    if (percentage === 100) {
      encouragementMessage =
        "Flawless score! You have a crystal-clear grasp of Python's execution model and the developer feedback loop.";
    } else if (percentage >= 80) {
      encouragementMessage =
        "Great job! You've firmly locked in the core foundations of Python syntax and the 'write, run, see' mindset.";
    } else if (percentage >= 60) {
      encouragementMessage =
        "Good effort! You're building solid intuition. A quick review of the story and sandbox will solidify these concepts.";
    } else {
      encouragementMessage =
        "Nice attempt! Coding takes a little practice to feel second-nature. You can retake the quiz anytime to boost your score.";
    }

    return (
      <div className="w-full bg-white rounded-xl border border-[#E6DCC8] p-6 sm:p-8 flex flex-col items-center text-center gap-6 shadow-xs animate-in fade-in duration-300">
        {/* Award Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#F1E2CF] border-2 border-[#C1502E] flex items-center justify-center text-[#C1502E] shadow-sm">
          <Award className="w-8 h-8" />
        </div>

        {/* Score Title */}
        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C1502E]">
            QUIZ COMPLETE
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B2521]">
            {score} / 100 Points Earned
          </h3>
          <p className="text-sm font-sans text-[#6B6058]">
            {correctCount} of {QUIZ_QUESTIONS.length} questions answered correctly
          </p>
        </div>

        {/* Encouraging Feedback Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8] max-w-lg text-xs sm:text-sm text-[#4A4036] leading-relaxed">
          <p>{encouragementMessage}</p>
        </div>

        {/* Score Summary Metrics */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#FAF4ED]/60 border border-[#E6DCC8] flex flex-col items-center gap-1">
            <span className="text-[#8C7E72] uppercase text-[10px]">Accuracy</span>
            <span className="text-base font-bold text-[#C1502E]">{percentage}%</span>
          </div>
          <div className="p-3 rounded-lg bg-[#FAF4ED]/60 border border-[#E6DCC8] flex flex-col items-center gap-1">
            <span className="text-[#8C7E72] uppercase text-[10px]">Total XP</span>
            <span className="text-base font-bold text-emerald-700">+{score} XP</span>
          </div>
        </div>

        {/* Retake Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleRetake}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-white text-xs sm:text-sm font-sans font-medium transition-all shadow-warm-sm cursor-pointer active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Progress Indicator Row */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#6B6058] px-1">
          <span className="flex items-center gap-1.5 font-semibold text-[#2B2521]">
            <HelpCircle className="w-3.5 h-3.5 text-[#C1502E]" />
            <span>
              Question {String(currentIdx + 1).padStart(2, "0")} of{" "}
              {String(QUIZ_QUESTIONS.length).padStart(2, "0")}
            </span>
          </span>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#8C7E72]">
              {currentQ.conceptCategory}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F1E2CF] text-[#8C3A20] text-[11px] font-semibold border border-[#E6DCC8]">
              <Award className="w-3 h-3 text-[#C1502E]" />
              <span>10 Points</span>
            </span>
          </div>
        </div>

        {/* Slim Progress Bar */}
        <div className="w-full h-1.5 bg-[#FAF4ED] border border-[#E6DCC8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C1502E] transition-all duration-300 rounded-full"
            style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>

        {/* 10-Dot Step Indicator */}
        <div className="flex items-center justify-between px-0.5 pt-0.5">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIdx;
            const isCorrect = answers[q.id]
              ? q.options.find((o) => o.id === answers[q.id])?.isCorrect
              : false;

            return (
              <div
                key={q.id}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isCurrent
                    ? "bg-[#C1502E] ring-2 ring-[#C1502E]/30 scale-125"
                    : isAnswered
                    ? isCorrect
                      ? "bg-emerald-600"
                      : "bg-[#D97706]"
                    : "bg-[#E6DCC8]"
                }`}
                title={`Question ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E6DCC8] shadow-xs space-y-5">
        {/* Question Prompt */}
        <h4 className="text-base sm:text-lg font-serif font-semibold text-[#2B2521] leading-relaxed">
          {currentQ.question}
        </h4>

        {/* Answer Options List */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;

            let cardStyles =
              "border-[#E6DCC8] bg-white hover:bg-[#FAF4ED] hover:border-[#D8CEBC] text-[#2B2521]";
            let badgeStyles = "bg-[#F1E2CF] text-[#8C3A20]";

            if (hasAnswered) {
              if (isSelected) {
                if (opt.isCorrect) {
                  cardStyles =
                    "border-[#C1502E] bg-[#F1E2CF]/50 text-[#2B2521] shadow-warm-sm ring-1 ring-[#C1502E]";
                  badgeStyles = "bg-[#C1502E] text-white";
                } else {
                  cardStyles =
                    "border-[#D97706]/70 bg-[#FAF4ED] text-[#6B6058] ring-1 ring-[#D97706]/50";
                  badgeStyles = "bg-[#D97706] text-white";
                }
              } else if (opt.isCorrect) {
                cardStyles =
                  "border-[#C1502E]/60 bg-[#F1E2CF]/25 text-[#2B2521]";
                badgeStyles = "bg-[#C1502E]/20 text-[#8C3A20]";
              } else {
                cardStyles =
                  "border-[#EDE4D5] bg-white/60 text-[#9C8F84] opacity-75";
                badgeStyles = "bg-[#EFE7DA] text-[#9C8F84]";
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                disabled={hasAnswered}
                aria-pressed={isSelected}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                  hasAnswered ? "cursor-default" : "cursor-pointer"
                } ${cardStyles}`}
              >
                {/* Option Letter Pill */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-colors ${badgeStyles}`}
                >
                  {hasAnswered && isSelected ? (
                    opt.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <XCircle className="w-4 h-4 text-white" />
                    )
                  ) : hasAnswered && opt.isCorrect ? (
                    <Check className="w-4 h-4 text-[#C1502E]" />
                  ) : (
                    opt.letter
                  )}
                </div>

                {/* Option Text */}
                <div className="flex-1 pt-0.5">
                  <span className="text-xs sm:text-sm font-sans leading-relaxed">
                    {opt.text}
                  </span>
                </div>

                {/* Status Indicator Tag if Answered */}
                {hasAnswered && isSelected && (
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded text-[11px] font-sans font-medium ${
                      opt.isCorrect
                        ? "bg-[#C1502E]/15 text-[#8C3A20]"
                        : "bg-[#D97706]/15 text-[#92400E]"
                    }`}
                  >
                    {opt.isCorrect ? "Correct answer" : "Your answer"}
                  </span>
                )}
                {hasAnswered && !isSelected && opt.isCorrect && (
                  <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-sans font-medium bg-[#C1502E]/10 text-[#8C3A20]">
                    Correct answer
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Box */}
        {hasAnswered && selectedOption && (
          <div
            className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
              selectedOption.isCorrect
                ? "bg-[#F1E2CF]/50 border-[#C1502E]/40"
                : "bg-[#FAF4ED] border-[#D97706]/40"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white shadow-xs ${
                  selectedOption.isCorrect ? "bg-[#C1502E]" : "bg-[#D97706]"
                }`}
              >
                {selectedOption.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <BookOpen className="w-4 h-4" />
                )}
              </div>

              <div className="space-y-1.5 flex-1 text-xs sm:text-sm font-sans">
                <h5 className="font-serif font-bold text-[#2B2521]">
                  {selectedOption.isCorrect
                    ? "Spot on! That's correct."
                    : "Not quite — here's the core concept:"}
                </h5>
                <p className="text-[#4A4036] leading-relaxed">
                  {selectedOption.explanation}
                </p>
                {!selectedOption.isCorrect && correctOption && (
                  <div className="pt-2 mt-2 border-t border-[#E6DCC8]/70 text-[#6B6058]">
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

        {/* Action Button: Next Question or See Results */}
        {hasAnswered && (
          <div className="pt-2 flex items-center justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-white text-xs sm:text-sm font-sans font-medium transition-all shadow-warm-sm cursor-pointer active:scale-98"
            >
              <span>
                {currentIdx < QUIZ_QUESTIONS.length - 1
                  ? "Next Question"
                  : "See Quiz Results"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Footer Insight Strip */}
      <div className="p-3 bg-[#FAF4ED] rounded-xl border border-[#E6DCC8] text-[11px] text-[#6B6058] flex flex-wrap items-center justify-between gap-2 font-sans">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C1502E]" />
          <span>Select an answer to unlock explanation and move to the next question.</span>
        </span>
        <span className="font-mono text-[#8C7E72]">
          Running Score: {score} / 100 Points
        </span>
      </div>
    </div>
  );
}
