import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface PageClosingStripProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function PageClosingStrip({
  title = "Ready to build real intuition?",
  description = "Start with Python fundamentals and interactive 3D simulations in Module 1.",
  buttonText = "Start learning",
  buttonHref = "/learn/module-1/episode-1",
}: PageClosingStripProps) {
  return (
    <section className="py-16 md:py-20 border-t border-[#E6DCC8] bg-[#FAF4ED] text-center overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-medium text-[#8C3A20]">
          <Sparkles className="w-3.5 h-3.5 text-[#C1502E]" />
          <span>Interactive Learning</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2B2521] tracking-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-[#6B6058] font-sans leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
        <div className="pt-2">
          <Link
            href={buttonHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold bg-[#C1502E] hover:bg-[#A84224] text-[#FBF6EF] shadow-sm hover:shadow transition-all duration-200 active:scale-98 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
