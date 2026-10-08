"use client";

import React from "react";

export function AnimationPreview() {
  return (
    <div className="min-h-[118px] w-full flex flex-col justify-between bg-white rounded-lg p-3 border border-[#E6DCC8]/60 relative overflow-hidden">
      {/* Top Header of Preview */}
      <div className="flex items-center justify-between text-[11px] text-[#6B6058] font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Epoch 12: Weight Flow</span>
        </span>
        <span className="text-[#C1502E] font-semibold">t = 240ms</span>
      </div>

      {/* Looping SVG Animated Path */}
      <div className="relative w-full h-12 flex items-center justify-center">
        <svg viewBox="0 0 200 48" className="w-full h-full" fill="none">
          {/* Baseline grid */}
          <line x1="10" y1="24" x2="190" y2="24" stroke="#E6DCC8" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Smooth Sigmoid/Tanh Activation Curve */}
          <path
            d="M 15 40 C 70 40 80 8 185 8"
            stroke="#D8CEBC"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Highlighted active segment */}
          <path
            d="M 15 40 C 70 40 80 8 185 8"
            stroke="#C1502E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="40 180"
            className="animate-[dash_2.4s_ease-in-out_infinite]"
          />

          {/* Moving State Pulse Node */}
          <circle cx="100" cy="24" r="5" fill="#C1502E">
            <animate
              attributeName="cx"
              values="15;100;185;185"
              keyTimes="0;0.5;0.9;1"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="40;24;8;8"
              keyTimes="0;0.5;0.9;1"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* State Stages Pill Row */}
      <div className="flex items-center justify-between text-[10px] text-[#6B6058] px-1">
        <span className="bg-[#FAF4ED] px-1.5 py-0.5 rounded border border-[#E6DCC8]">Input X</span>
        <span className="text-[#C1502E] font-mono">σ(W·X + b)</span>
        <span className="bg-[#F1E2CF] text-[#8C3A20] px-1.5 py-0.5 rounded border border-[#E6DCC8] font-medium">Output ŷ</span>
      </div>
    </div>
  );
}
