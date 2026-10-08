"use client";

import React from "react";
import { motion } from "framer-motion";

interface FormatCardProps {
  title: string;
  matchedFor: string;
  description: string;
  preview: React.ReactNode;
  accentBadge?: string;
  index: number;
  prefersReducedMotion: boolean;
}

export function FormatCard({
  title,
  matchedFor,
  description,
  preview,
  accentBadge,
  index,
  prefersReducedMotion,
}: FormatCardProps) {
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 1, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.45,
        delay: prefersReducedMotion ? 0 : Math.min(index * 0.08, 0.48),
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group flex flex-col justify-between bg-white rounded-2xl border border-[#E6DCC8] p-5 sm:p-6 shadow-xs hover:shadow-warm-md hover:border-[#D9CEB8] transition-all duration-300"
    >
      <div>
        {/* Top matching metadata badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#F1E2CF]/70 text-[#8C3A20] border border-[#E6DCC8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C1502E]" />
            <span>Matched for: {matchedFor}</span>
          </span>
          {accentBadge && (
            <span className="text-[10px] font-mono text-[#6B6058] uppercase tracking-wider">
              {accentBadge}
            </span>
          )}
        </div>

        {/* Format Title */}
        <h3 className="text-lg font-semibold text-[#2B2521] tracking-tight group-hover:text-[#C1502E] transition-colors">
          {title}
        </h3>

        {/* One-line Description */}
        <p className="mt-1.5 text-xs sm:text-sm text-[#6B6058] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Embedded Miniature Visual Preview */}
      <div className="mt-5 pt-4 border-t border-[#E6DCC8]/60">
        <div className="w-full bg-[#FAF4ED]/50 rounded-xl border border-[#E6DCC8]/70 p-3 overflow-hidden select-none transition-transform duration-200 group-hover:scale-[1.01]">
          {preview}
        </div>
      </div>
    </motion.div>
  );
}


