import React from "react";

interface PageHeaderProps {
  kicker: string;
  kickerIcon?: React.ReactNode;
  title: string;
  intro: string;
}

export function PageHeader({ kicker, kickerIcon, title, intro }: PageHeaderProps) {
  return (
    <header className="pt-10 pb-6 sm:pt-14 sm:pb-8 bg-[var(--zy-bg)] border-b border-[var(--zy-border)]/70 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--zy-surface-2)] border border-[var(--zy-border)] text-xs font-mono font-medium text-[var(--zy-active-text)] shadow-xs">
            {kickerIcon}
            <span className="tracking-wide uppercase text-[11px]">{kicker}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--zy-text)] tracking-tight leading-[1.12]">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--zy-muted)] font-sans leading-relaxed max-w-2xl">
            {intro}
          </p>
        </div>
      </div>
    </header>
  );
}
