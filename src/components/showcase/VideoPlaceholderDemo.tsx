"use client";

import React, { useState } from "react";
import {
  Play,
  RotateCcw,
  Volume2,
  Maximize2,
  Sparkles,
  Clock,
  Video,
  CheckCircle2,
} from "lucide-react";

export function VideoPlaceholderDemo() {
  const [isPlayingOrClicked, setIsPlayingOrClicked] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden transition-all duration-300">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-[#E6DCC8] bg-[#FAF4ED]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F1E2CF] text-[#C1502E] flex items-center justify-center shadow-xs">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C3A20]">
                Module 3: Deep Neural Networks
              </span>
              <span className="text-[#C5B8A5]">•</span>
              <span className="text-xs text-[#6B6058] font-sans">
                Lesson 3.2
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#2B2521]">
              Demystifying Backpropagation: The Chain Rule in 3D
            </h3>
          </div>
        </div>

        {/* Status / Reset */}
        <div className="flex items-center gap-2">
          {isPlayingOrClicked && (
            <button
              onClick={() => setIsPlayingOrClicked(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E6DCC8] bg-white text-xs font-medium text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FBF6EF] transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Player</span>
            </button>
          )}
          <span className="px-2.5 py-1 rounded-md bg-[#F1E2CF] text-[11px] font-mono font-medium text-[#8C3A20]">
            Duration: 3:45
          </span>
        </div>
      </div>

      {/* Video Player Frame Container */}
      <div className="relative aspect-video max-h-[460px] w-full bg-[#1A1614] overflow-hidden select-none flex flex-col justify-between">
        {!isPlayingOrClicked ? (
          <>
            {/* Background Graphic Illustration: Computational Graph / Backpropagation Nodes */}
            <div className="absolute inset-0 bg-radial from-[#2E241E] via-[#1A1614] to-[#120F0D] flex items-center justify-center pointer-events-none">
              <svg
                viewBox="0 0 800 450"
                className="w-full h-full opacity-25"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Computational Graph Nodes and Paths */}
                <path
                  d="M150,225 C250,150 350,150 450,225"
                  fill="none"
                  stroke="#C1502E"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
                <path
                  d="M150,225 C250,300 350,300 450,225"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="3"
                />
                <path
                  d="M450,225 L650,225"
                  fill="none"
                  stroke="#E07A5F"
                  strokeWidth="4"
                />

                {/* Nodes */}
                <circle cx="150" cy="225" r="28" fill="#25201C" stroke="#C1502E" strokeWidth="3" />
                <text x="150" y="231" textAnchor="middle" fill="#F3EFE6" fontSize="16" fontFamily="monospace">x₁</text>

                <circle cx="450" cy="225" r="34" fill="#2E241E" stroke="#D97706" strokeWidth="3" />
                <text x="450" y="232" textAnchor="middle" fill="#F3EFE6" fontSize="18" fontFamily="monospace">f(W·x)</text>

                <circle cx="650" cy="225" r="30" fill="#25201C" stroke="#C1502E" strokeWidth="3" />
                <text x="650" y="232" textAnchor="middle" fill="#F3EFE6" fontSize="16" fontFamily="monospace">Loss</text>

                {/* Mathematical Annotations */}
                <text x="300" y="140" fill="#E6DCC8" fontSize="14" fontFamily="serif" fontStyle="italic">∂L / ∂w = (∂L / ∂a) · (∂a / ∂w)</text>
              </svg>
            </div>

            {/* Top Badges Overlay */}
            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1614]/85 border border-[#3A332C] text-xs font-medium text-[#E6DCC8] backdrop-blur-xs">
                <Clock className="w-3.5 h-3.5 text-[#C1502E]" />
                3:45 min visual walkthrough
              </span>
              <span className="px-2.5 py-1 rounded bg-[#C1502E]/20 border border-[#C1502E]/40 text-[#E07A5F] text-[11px] font-mono font-medium">
                4K UHD Studio Format
              </span>
            </div>

            {/* Center Big Play Button */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-3">
              <button
                onClick={() => setIsPlayingOrClicked(true)}
                className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C1502E] hover:bg-[#A84224] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Play video preview"
              >
                {/* Subtle radiating glow ring */}
                <div className="absolute inset-0 rounded-full bg-[#C1502E] animate-ping opacity-25 group-hover:opacity-40" />
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
              </button>
              <span className="text-xs text-[#E6DCC8] font-sans tracking-wide">
                Click to preview lesson format
              </span>
            </div>

            {/* Bottom Chrome Controls Bar */}
            <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-t from-[#120F0D] via-[#1A1614]/90 to-transparent">
              {/* Scrubber timeline */}
              <div className="w-full h-1.5 bg-[#3A332C] rounded-full mb-3 overflow-hidden cursor-pointer">
                <div className="h-full w-0 bg-[#C1502E] rounded-full" />
              </div>
              <div className="flex items-center justify-between text-xs text-[#A89C8F]">
                <div className="flex items-center gap-3">
                  <Play className="w-4 h-4 text-[#D8CEBC]" />
                  <span className="font-mono text-[11px]">0:00 / 3:45</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono border border-[#3A332C] text-[#C5B8A5]">
                    1080p
                  </span>
                  <Volume2 className="w-4 h-4 text-[#D8CEBC]" />
                  <Maximize2 className="w-4 h-4 text-[#D8CEBC]" />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* "Coming Soon" State */
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-[#1A1614]/95 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-[#C1502E]/20 border border-[#C1502E]/40 text-[#E07A5F] flex items-center justify-center mb-4">
              <Video className="w-6 h-6" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E241E] border border-[#4A3B30] text-xs font-mono text-[#F59E0B] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C1502E]" />
              <span>Full Video Catalog in Production</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#F3EFE6] tracking-tight mb-2">
              Studio Video Lessons Coming in Phase 6
            </h4>

            <p className="text-xs sm:text-sm text-[#C5B8A5] max-w-lg mx-auto leading-relaxed mb-6 font-sans">
              Every video on Zyrix is strictly under 5 minutes: focused on
              geometric and intuitive clarity, animated with precision, and
              immediately paired with an interactive code sandbox. We never
              substitute passive screencasts for deep learning.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsPlayingOrClicked(false)}
                className="px-4 py-2 rounded-xl bg-white text-[#2B2521] text-xs sm:text-sm font-sans font-medium hover:bg-[#FAF4ED] transition-colors cursor-pointer shadow-xs"
              >
                Return to Player View
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 sm:p-5 bg-[#FAF4ED]/50 border-t border-[#E6DCC8] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B6058] font-sans">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C1502E]" />
          <span>
            Real UI player shell • Zero fabricated clips or misleading stock footage
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#8C7E72]">
          40+ Lessons in Production
        </span>
      </div>
    </div>
  );
}
