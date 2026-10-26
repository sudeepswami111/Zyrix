"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface StoryBeat {
  id: string;
  stepNumber: string;
  title: string;
  tagline: string;
  content: React.ReactNode;
}

export function Episode1Story() {
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);

  const storyBeats: StoryBeat[] = [
    {
      id: "beat-1",
      stepNumber: "01",
      title: "The Spreadsheet & The Hesitation",
      tagline: "Thirty student exam scores and a quiet frustration",
      content: (
        <div className="space-y-4 text-sm sm:text-base text-[#2B2521] leading-relaxed font-sans">
          <p>
            Asha is a second-year student with a laptop full of exam scores. Hers,
            her classmates&apos;, three whole semesters of them — all sitting in a
            sprawling spreadsheet she has manually sorted, filtered, and recalculated
            more times than she can count.
          </p>
          <p>
            Her fingers ached from endless copy-pasting, and one wrong click always
            threatened to scramble the entire sheet. A senior passing by her desk
            noticed her screen and tossed out an offhand remark:
          </p>
          <div className="p-4 rounded-xl bg-[#FAF4ED] border-l-4 border-[#C1502E] border-y border-r border-[#E6DCC8] shadow-xs">
            <p className="font-serif italic text-base sm:text-lg text-[#8C3A20]">
              &ldquo;You know, you could automate that whole thing in Python in about three minutes.&rdquo;
            </p>
          </div>
          <p>
            Asha didn&apos;t know what to make of that. In her mind, programming was
            something reserved for computer science prodigies who dreamed in binary.
            She had never written a single line of software in her life. But looking at
            the endless grid of cells on her screen, she was desperate enough to find out.
          </p>
        </div>
      ),
    },
    {
      id: "beat-2",
      stepNumber: "02",
      title: "The Blinking Cursor",
      tagline: "A blank screen, an empty room, and a mentor's words",
      content: (
        <div className="space-y-4 text-sm sm:text-base text-[#2B2521] leading-relaxed font-sans">
          <p>
            Later that evening, sitting at her desk with a mug of tea, she opened a
            code terminal for the first time.
          </p>
          <p>
            She had braced herself for a labyrinth of technical menus, intimidating
            settings, and walls of incomprehensible buttons. Instead, she was met with
            something far simpler — and strangely more terrifying:
          </p>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1F1B18] text-[#F1E2CF] border border-[#3E352F] font-mono text-sm shadow-inner flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#C1502E] font-bold select-none">&gt;&gt;&gt;</span>
              <span className="w-2.5 h-4 bg-[#C1502E] animate-pulse" />
            </div>
            <span className="text-[11px] font-sans text-[#A89F91]">
              Waiting for input
            </span>
          </div>
          <p>
            Just a blank window and a single, steady blinking cursor. Her hands hovered
            uncertainly over the keys. Her heart beat a little faster.
          </p>
          <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8] flex items-start gap-3 shadow-xs">
            <Sparkles className="w-5 h-5 text-[#C1502E] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#6B6058] italic leading-relaxed">
              Her mentor&apos;s advice floated back into her memory: &ldquo;Don&apos;t try
              to solve the whole spreadsheet tonight. Just type one small thing. See if
              the computer answers back.&rdquo;
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "beat-3",
      stepNumber: "03",
      title: "The First Line",
      tagline: "Deep breath, fingers on keys, hit Enter",
      content: (
        <div className="space-y-4 text-sm sm:text-base text-[#2B2521] leading-relaxed font-sans">
          <p>
            She decided to keep it as simple as humanly possible. She didn&apos;t want
            to break anything. She rested her fingers on the home row and carefully
            typed out one sentence:
          </p>
          {/* Code line card */}
          <div className="p-4 rounded-2xl bg-[#1F1B18] text-[#F1E2CF] border border-[#3E352F] font-mono text-sm sm:text-base shadow-warm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#C1502E] font-bold select-none">&gt;&gt;&gt;</span>
              <span className="text-blue-400 font-semibold">print</span>
              <span className="text-[#A89F91]">(</span>
              <span className="text-emerald-300 font-medium">&quot;Exam scores analyzed!&quot;</span>
              <span className="text-[#A89F91]">)</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-[#2E241E] text-[#C1502E] px-2 py-0.5 rounded border border-[#4A3B30]">
              Ready
            </span>
          </div>
          <p>
            She hesitated over the Enter key for three long seconds. In movies, running
            a program always triggered a dramatic cascade of green matrix code or red
            flashing warnings.
          </p>
          <p>
            She took a breath and pressed Enter.
          </p>
        </div>
      ),
    },
    {
      id: "beat-4",
      stepNumber: "04",
      title: "The Echo & The Spark",
      tagline: "The words appear instantly — and everything changes",
      content: (
        <div className="space-y-4 text-sm sm:text-base text-[#2B2521] leading-relaxed font-sans">
          {/* Result Output Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 font-mono text-sm sm:text-base font-bold shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Exam scores analyzed!</span>
          </div>

          <p>
            The words printed out instantly. No loading spinner. No delay. No red error
            box telling her she wasn&apos;t qualified to be there.
          </p>
          <p>
            Asha stared at the screen for a moment, half-expecting the text to glitch
            away or for her laptop to lock up. Nothing happened. It just sat there,
            peaceful and steady.
          </p>
          <div className="p-4 rounded-xl bg-[#FAF4ED] border-l-4 border-emerald-500 border-y border-r border-[#E6DCC8] shadow-xs">
            <p className="font-serif italic text-base sm:text-lg text-[#2B2521]">
              &ldquo;That&apos;s it?&rdquo; she whispered out loud, then laughed to herself.
              &ldquo;That was really all it took?&rdquo;
            </p>
          </div>
          <p>
            In that single second, the mystery dissolved. Code wasn&apos;t magic, and it
            wasn&apos;t a secret club. It was simply a direct conversation with a machine
            that listens to what you write.
          </p>
          <p>
            Asha glanced over at the thirty spreadsheet files sitting on her desktop. For
            the first time in three semesters, they didn&apos;t look like an insurmountable
            chore. They looked like a puzzle she was finally ready to solve.
          </p>
        </div>
      ),
    },
  ];

  const currentBeat = storyBeats[activeBeatIndex];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Story Reader Card */}
      <div className="bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden flex flex-col transition-all duration-200">
        {/* Top Header Bar */}
        <div className="px-5 sm:px-7 py-4 bg-[#FAF4ED]/80 border-b border-[#E6DCC8] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C1502E]" />
            <span className="font-serif font-bold text-sm text-[#2B2521]">
              Asha&apos;s Story: The First Line
            </span>
            <span className="text-[#A89F91]">·</span>
            <span className="font-mono text-[#8C3A20] text-xs">
              Part {currentBeat.stepNumber} of 04
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] text-[#8C3A20] font-mono text-[11px] font-semibold border border-[#E6DCC8] shadow-xs">
              <BookOpen className="w-3 h-3 text-[#C1502E]" />
              <span>Narrative Story</span>
            </span>
          </div>
        </div>

        {/* Story Body */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
          {/* Asha's Illustrated Avatar */}
          <div className="shrink-0 flex items-center sm:flex-col gap-3 sm:gap-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#F1E2CF] to-[#E6DCC8] border-2 border-[#C1502E] p-1 flex items-center justify-center shadow-xs">
              <svg
                viewBox="0 0 64 64"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Illustrated portrait of Asha"
              >
                <circle cx="32" cy="28" r="18" fill="#3D2920" />
                <path
                  d="M16 34C16 22 23 16 32 16C41 16 48 22 48 34C48 40 46 45 46 45L18 45C18 45 16 40 16 34Z"
                  fill="#2E1F18"
                />
                <circle cx="32" cy="32" r="14" fill="#FCE5D8" />
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
                <circle cx="26.5" cy="32" r="1.2" fill="#2B2521" />
                <circle cx="37.5" cy="32" r="1.2" fill="#2B2521" />
                <path
                  d="M29 39C30.5 40.5 33.5 40.5 35 39"
                  stroke="#C1502E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M18 56C18 48 24 45 32 45C40 45 46 48 46 56"
                  fill="#C1502E"
                />
              </svg>
            </div>
            <div className="text-left sm:text-center">
              <span className="block text-xs font-semibold text-[#2B2521]">
                Asha
              </span>
              <span className="block text-[10px] font-mono text-[#8C7E72]">
                Student Learner
              </span>
            </div>
          </div>

          {/* Narrative Content Container */}
          <div className="flex-1 w-full flex flex-col justify-between gap-6">
            <div>
              {/* Beat Title Header */}
              <div className="mb-4 pb-3 border-b border-[#E6DCC8]/70">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C1502E] font-semibold">
                  Part {currentBeat.stepNumber}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] tracking-tight mt-0.5">
                  {currentBeat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6058] font-sans mt-0.5">
                  {currentBeat.tagline}
                </p>
              </div>

              {/* Rendered Prose Content */}
              {currentBeat.content}
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="pt-4 border-t border-[#E6DCC8]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-mono text-[11px] text-[#6B6058]">
                Beat {activeBeatIndex + 1} of {storyBeats.length}
              </span>

              <div className="flex items-center gap-2">
                {activeBeatIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveBeatIndex((prev) => prev - 1)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#E6DCC8] hover:bg-[#FAF4ED] text-[#2B2521] text-xs font-medium transition-colors cursor-pointer shadow-2xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#6B6058]" />
                    <span>Previous Beat</span>
                  </button>
                )}

                {activeBeatIndex < storyBeats.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveBeatIndex((prev) => prev + 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#C1502E] hover:bg-[#A84224] text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Next Beat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Story Complete</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Beat Timeline Selector Cards */}
      <div className="w-full">
        <div className="text-xs font-mono uppercase tracking-wider text-[#6B6058] mb-2.5 flex items-center justify-between px-1">
          <span>READING PROGRESSION</span>
          <span className="text-[11px] text-[#A89F91] normal-case">
            Click any chapter beat to jump
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {storyBeats.map((beat, idx) => {
            const isActive = idx === activeBeatIndex;
            const isRead = idx < activeBeatIndex;

            return (
              <button
                key={beat.id}
                type="button"
                onClick={() => setActiveBeatIndex(idx)}
                aria-pressed={isActive}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E] ${
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
                    Part {beat.stepNumber}
                  </span>
                  <span className="text-[10px] font-mono text-[#8C7E72]">
                    {isActive ? (
                      <span className="text-[#C1502E] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C1502E] animate-pulse" />
                        Reading
                      </span>
                    ) : isRead ? (
                      "Read"
                    ) : (
                      "Upcoming"
                    )}
                  </span>
                </div>

                <div>
                  <h4
                    className={`text-xs sm:text-sm font-semibold transition-colors ${
                      isActive ? "text-[#C1502E]" : "text-[#2B2521]"
                    }`}
                  >
                    {beat.title}
                  </h4>
                  <p className="text-[11px] text-[#6B6058] mt-1 leading-snug line-clamp-2">
                    {beat.tagline}
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
