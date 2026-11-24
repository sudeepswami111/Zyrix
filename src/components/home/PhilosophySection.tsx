"use client";

import React from "react";
import { Heart, Globe2, Sparkles, Lightbulb, Users } from "lucide-react";

export function PhilosophySection() {
  const values = [
    {
      icon: Globe2,
      title: "Zero Financial Gatekeeping",
      description:
        "Top-tier technical mastery shouldn't require a $15,000 bootcamp loan or an expensive university pedigree. Core foundations should be open and accessible to all.",
    },
    {
      icon: Sparkles,
      title: "Format-Matched Mediums",
      description:
        "We never force an idea through passive slides. If a concept is spatial, we build 3D geometry; if it's algorithmic, we build an interactive time debugger.",
    },
    {
      icon: Lightbulb,
      title: "Intuition Before Formalism",
      description:
        "You understand how gears mesh before you memorize calculus equations. We give your mind the physical mental model first; the mathematical symbols follow naturally.",
    },
    {
      icon: Users,
      title: "Agency Through Building",
      description:
        "True confidence comes from getting your hands dirty with real code. We don't spoon-feed multiple-choice answers; we give you real systems to build and break.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-[var(--zy-surface)] border-t border-[var(--zy-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Philosophy Header & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Mission Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--zy-surface-2)] border border-[var(--zy-border)] text-xs font-mono font-medium text-[#FFAA45]">
              <Heart className="w-3.5 h-3.5 text-[#FFAA45]" />
              <span>Our Core Conviction</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--zy-text)] tracking-tight leading-tight">
              Education Should Be Accessible to Everyone.
            </h2>

            <p className="text-base sm:text-lg text-[var(--zy-muted)] font-sans leading-relaxed">
              We started Zyrix because computer science education has spent forty years
              making simple, elegant truths look intimidating and inaccessible.
            </p>

            <blockquote className="p-6 rounded-2xl bg-[var(--zy-surface-2)] border-l-4 border-[#FFAA45] font-sans text-sm sm:text-base text-[var(--zy-text)] italic leading-relaxed">
              &quot;Anyone who can understand a story can understand a neural network — if only it is taught through the medium where it makes physical sense.&quot;
            </blockquote>
          </div>

          {/* Right Column: 4 Core Pillars Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl sm:rounded-3xl bg-[var(--zy-surface-2)] border border-[var(--zy-border)] space-y-3 transition-all duration-300 hover:shadow-xs hover:border-[#FFAA45]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--zy-surface)] border border-[var(--zy-border)] text-[var(--zy-text)] flex items-center justify-center shadow-2xs">
                    <Icon className="w-5 h-5 text-[#FFAA45]" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-[var(--zy-text)]">
                    {val.title}
                  </h3>
                  <p className="text-sm text-[var(--zy-muted)] font-sans leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
