"use client";

import React, { useState } from "react";
import {
  MessageSquareQuote,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

interface StoryChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  sceneLabel: string;
  progressByline: string;
  readTime: string;
  content: React.ReactNode;
  closingTeaser?: string;
}

export function StoryPreview() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const chapters: StoryChapter[] = [
    {
      id: "chapter-1",
      number: "01",
      title: "The Spreadsheet That Started It",
      subtitle: "A laptop full of exam scores and a curious question",
      sceneLabel: "Scene 01: The Spreadsheet That Started It",
      progressByline: "Chapter 1 of 3 \u2022 The Motivation",
      readTime: "1 min read",
      content: (
        <div className="space-y-3.5 text-xs sm:text-sm sm:leading-relaxed text-[#2B2521]">
          <p>
            Asha is a second-year student with a laptop full of exam scores — hers,
            her classmates&apos;, three semesters of them — all sitting in a
            spreadsheet she&apos;s manually sorted, filtered, and recalculated
            more times than she can count.
          </p>
          <p>
            A senior mentions Python:{" "}
            <em className="font-serif text-[#C1502E] font-medium">
              &ldquo;You could do all of that in a few lines.&rdquo;
            </em>
          </p>
          <p>
            Asha has never written code in her life. She&apos;s not sure she believes
            it, but she&apos;s curious enough to find out.
          </p>
        </div>
      ),
    },
    {
      id: "chapter-2",
      number: "02",
      title: "Opening the Sandbox",
      subtitle: "A blank box, a blinking cursor, and a mentor's advice",
      sceneLabel: "Scene 02: Opening the Sandbox",
      progressByline: "Chapter 2 of 3 \u2022 First Contact",
      readTime: "1 min read",
      content: (
        <div className="space-y-3.5 text-xs sm:text-sm sm:leading-relaxed text-[#2B2521]">
          <p>
            She opens her first Python environment. It&apos;s just a blank box
            with a blinking cursor. No menus to learn, nothing to install,
            nothing to configure.
          </p>
          <p>
            It&apos;s simpler than she expected — and a little intimidating for
            exactly that reason.{" "}
            <span className="italic text-[#6B6058]">
              &ldquo;What am I even supposed to type?&rdquo;
            </span>{" "}
            she wonders.
          </p>
          <p>
            Her mentor&apos;s advice:{" "}
            <strong className="text-[#C1502E] font-medium">
              &ldquo;Just start with something small. See what happens.&rdquo;
            </strong>
          </p>
        </div>
      ),
    },
    {
      id: "chapter-3",
      number: "03",
      title: "The \"Aha!\" Moment",
      subtitle: "One line of code, one instant result",
      sceneLabel: "Scene 03: The \"Aha!\" Moment",
      progressByline: "Chapter 3 of 3 \u2022 The Breakthrough",
      readTime: "1 min read",
      closingTeaser:
        "Next: Asha opens her actual exam data for the first time — and discovers her first problem to solve.",
      content: (
        <div className="space-y-3.5 text-xs sm:text-sm sm:leading-relaxed text-[#2B2521]">
          <p>
            She types one line:
          </p>

          {/* Interactive Code Line Display */}
          <div className="my-2 p-3 sm:p-3.5 rounded-xl bg-[#1F1B18] text-[#F1E2CF] border border-[#3E352F] font-mono text-xs sm:text-[13px] flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2">
              <span className="text-[#C1502E] font-bold select-none">&gt;&gt;&gt;</span>
              <span className="text-[#E07A5F]">print</span>
              <span>(</span>
              <span className="text-emerald-300">&quot;Exam scores analyzed!&quot;</span>
              <span>)</span>
            </div>
            <span className="text-[10px] text-[#A89F91] font-sans bg-[#2E241E] px-2 py-0.5 rounded border border-[#4A3B30]">
              Executed
            </span>
          </div>

          <p>— and hits run.</p>

          <p>
            The words appear instantly on the screen. No compiling, no waiting, no
            error messages. Just... it worked. Asha stares at it for a second,
            half-expecting something to break. Nothing does.
          </p>

          <p className="italic text-[#C1502E] font-medium text-sm">
            &ldquo;That&apos;s it?&rdquo; she says out loud. &ldquo;That&apos;s really it?&rdquo;
          </p>

          <p>
            It is. One line, one result, right away. She doesn&apos;t know it yet,
            but this exact loop — <strong>write something, run it, see what happens</strong> —
            is the same loop she&apos;ll use for every real project she builds
            from here on, including the one sitting in her spreadsheet right now.
          </p>
        </div>
      ),
    },
  ];

  const currentChapter = chapters[activeChapterIndex];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Narrative Scene Reader Panel */}
      <div className="bg-white rounded-xl p-5 sm:p-7 border border-[#E6DCC8] shadow-xs transition-all duration-200">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          {/* Asha's Illustrated Editorial Avatar */}
          <div className="shrink-0 flex items-center sm:flex-col gap-3 sm:gap-1.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#F1E2CF] to-[#E6DCC8] border-2 border-[#C1502E] p-1 flex items-center justify-center shadow-xs">
              <svg
                viewBox="0 0 64 64"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Illustrated avatar of Asha"
              >
                {/* Hair */}
                <circle cx="32" cy="28" r="18" fill="#3D2920" />
                <path
                  d="M16 34C16 22 23 16 32 16C41 16 48 22 48 34C48 40 46 45 46 45L18 45C18 45 16 40 16 34Z"
                  fill="#2E1F18"
                />
                {/* Face */}
                <circle cx="32" cy="32" r="14" fill="#FCE5D8" />
                {/* Glasses */}
                <rect
                  x="23"
                  y="29"
                  width="7"
                  height="6"
                  rx="2"
                  stroke="#C1502E"
                  strokeWidth="1.5"
                  fill="none"
                />
                <rect
                  x="34"
                  y="29"
                  width="7"
                  height="6"
                  rx="2"
                  stroke="#C1502E"
                  strokeWidth="1.5"
                  fill="none"
                />
                <line
                  x1="30"
                  y1="32"
                  x2="34"
                  y2="32"
                  stroke="#C1502E"
                  strokeWidth="1.5"
                />
                {/* Eyes */}
                <circle cx="26.5" cy="32" r="1.2" fill="#2B2521" />
                <circle cx="37.5" cy="32" r="1.2" fill="#2B2521" />
                {/* Smile */}
                <path
                  d="M29 39C30.5 40.5 33.5 40.5 35 39"
                  stroke="#C1502E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* Torso */}
                <path
                  d="M18 56C18 48 24 45 32 45C40 45 46 48 46 56"
                  fill="#C1502E"
                />
              </svg>
            </div>
            <div>
              <span className="block text-xs font-semibold text-[#2B2521] text-left sm:text-center">
                Asha
              </span>
              <span className="block text-[10px] font-mono text-[#8C7E72] text-left sm:text-center">
                Second-Year Learner
              </span>
            </div>
          </div>

          {/* Speech / Story Narration Bubble */}
          <div className="flex-1 relative bg-[#FAF4ED] border border-[#E6DCC8] rounded-2xl rounded-tl-sm p-4 sm:p-6 text-[#2B2521] flex flex-col justify-between gap-4">
            <div>
              {/* Scene Label Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#C1502E] font-medium mb-3 pb-2 border-b border-[#E6DCC8]/70">
                <span className="flex items-center gap-1.5">
                  <MessageSquareQuote className="w-4 h-4 text-[#C1502E]" />
                  <span>{currentChapter.sceneLabel}</span>
                </span>
                <span className="text-[11px] font-mono text-[#8C3A20] bg-[#F1E2CF] px-2 py-0.5 rounded">
                  {currentChapter.readTime}
                </span>
              </div>

              {/* Rendered Narration Content */}
              {currentChapter.content}

              {/* Closing Teaser Line for Chapter 3 */}
              {currentChapter.closingTeaser && (
                <div className="mt-5 p-3.5 rounded-xl bg-white border border-[#C1502E]/40 shadow-xs flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#C1502E] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium text-[#8C3A20] leading-snug">
                    {currentChapter.closingTeaser}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Progress Indicator & Chapter Navigation Buttons */}
            <div className="pt-3 border-t border-[#E6DCC8]/70 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6B6058]">
              <span className="font-mono text-[#6B6058] flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#C1502E]" />
                <span>{currentChapter.progressByline}</span>
              </span>

              <div className="flex items-center gap-2">
                {activeChapterIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveChapterIndex((prev) => prev - 1)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E6DCC8] hover:bg-[#FAF4ED] text-[#2B2521] text-xs font-medium transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3 text-[#6B6058]" />
                    <span>Previous</span>
                  </button>
                )}

                {activeChapterIndex < chapters.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveChapterIndex((prev) => prev + 1)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#C1502E] hover:bg-[#A84224] text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Next Scene</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Story Complete</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Track Timeline Selector (Clickable Chapter 01 / 02 / 03 cards) */}
      <div className="w-full">
        <div className="text-xs font-mono uppercase tracking-wider text-[#6B6058] mb-2.5 flex items-center justify-between px-1">
          <span>SELECT CHAPTER SCENE</span>
          <span className="text-[11px] text-[#A89F91] normal-case">
            Click any card to read scene
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {chapters.map((chap, idx) => {
            const isActive = idx === activeChapterIndex;
            const isRead = idx < activeChapterIndex;

            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => setActiveChapterIndex(idx)}
                aria-pressed={isActive}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-2.5 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] ${
                  isActive
                    ? "bg-white border-[#C1502E] shadow-warm scale-[1.01]"
                    : "bg-white/70 border-[#E6DCC8] hover:border-[#C1502E]/60 hover:bg-white shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? "bg-[#C1502E] text-white"
                        : "bg-[#F1E2CF] text-[#8C3A20]"
                    }`}
                  >
                    Chapter {chap.number}
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      isActive
                        ? "text-[#C1502E] font-semibold flex items-center gap-1"
                        : "text-[#8C7E72]"
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C1502E] animate-pulse" />}
                    {isActive ? "Active Scene" : isRead ? "Read" : "Upcoming"}
                  </span>
                </div>

                <div>
                  <h4
                    className={`text-xs sm:text-sm font-semibold transition-colors ${
                      isActive ? "text-[#C1502E]" : "text-[#2B2521]"
                    }`}
                  >
                    {chap.title}
                  </h4>
                  <p className="text-[11px] text-[#6B6058] mt-1 leading-snug line-clamp-2">
                    {chap.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
