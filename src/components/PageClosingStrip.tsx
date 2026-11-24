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
    <section className="py-16 md:py-20 border-t border-[var(--zy-border)] bg-[var(--zy-surface)] text-center overflow-hidden transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--zy-surface-2)] border border-[var(--zy-border)] text-xs font-mono font-medium text-[var(--zy-active-text)]">
          <Sparkles className="w-3.5 h-3.5 text-[var(--zy-active)]" />
          <span className="tracking-wide uppercase text-[11px]">Interactive Learning</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[var(--zy-text)] tracking-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-[var(--zy-muted)] font-sans leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
        <div className="pt-2">
          <Link
            href={buttonHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold bg-[var(--zy-active)] hover:bg-[var(--zy-active-hover)] text-[var(--zy-btn-text)] shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)] focus-visible:ring-offset-2"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
