"use client";

import React from "react";
import { Sparkles, Clock } from "lucide-react";

interface ComingSoonCardProps {
  title: string;
  formatName: string;
  description: string;
  badgeText?: string;
  preview: React.ReactNode;
  roadmapNote?: string;
}

export function ComingSoonCard({
  title,
  formatName,
  description,
  badgeText = "Coming soon",
  preview,
  roadmapNote = "In production for the upcoming release",
}: ComingSoonCardProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden flex flex-col transition-all duration-200">
      {/* Top Meta Bar matching VideoPlayer style */}
      <div className="px-4 sm:px-6 py-3.5 bg-[#FAF4ED]/80 border-b border-[#E6DCC8] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E07A5F]" />
          <span className="font-semibold text-[#2B2521]">{title}</span>
          <span className="text-[#A89F91]">•</span>
          <span className="font-mono text-[#6B6058]">{formatName}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E2CF] text-[#8C3A20] font-mono text-[11px] font-semibold border border-[#E6DCC8] shadow-xs">
            <Sparkles className="w-3 h-3 text-[#C1502E]" />
            {badgeText}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8 flex flex-col gap-6">
        {/* Editorial Heading and Format Intro */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C1502E] mb-2">
            <span>FORMAT PREVIEW</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-[#6B6058] leading-relaxed font-sans">
            {description}
          </p>
        </div>

        {/* Embedded Preview Mockup Visual */}
        <div className="w-full rounded-xl border border-[#E6DCC8] bg-[#FAF4ED]/60 p-4 sm:p-6 overflow-hidden">
          {preview}
        </div>
      </div>

      {/* Footer Info matching VideoPlayer */}
      <div className="p-4 sm:p-5 bg-[#FAF4ED]/50 border-t border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B6058]">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C1502E] shrink-0" />
          <span>{roadmapNote}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C7E72]">
          <span>Module 1: Episode 1 Multi-Format Track</span>
        </div>
      </div>
    </div>
  );
}
