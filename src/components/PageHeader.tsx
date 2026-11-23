import React from "react";

interface PageHeaderProps {
  kicker: string;
  kickerIcon?: React.ReactNode;
  title: string;
  intro: string;
}

export function PageHeader({ kicker, kickerIcon, title, intro }: PageHeaderProps) {
  return (
    <header className="pt-10 pb-6 sm:pt-14 sm:pb-8 bg-[#FBF6EF] border-b border-[#E6DCC8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-medium text-[#8C3A20] shadow-xs">
            {kickerIcon}
            <span>{kicker}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.18]">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[#6B6058] font-sans leading-relaxed max-w-2xl">
            {intro}
          </p>
        </div>
      </div>
    </header>
  );
}
