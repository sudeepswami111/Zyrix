import React from "react";
import Link from "next/link";
import { Layers, GraduationCap, Sparkles, CreditCard, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export function ExploreZyrixSection() {
  const cards = [
    {
      title: "How We Teach",
      description: "Our 7-medium philosophy matching each topic to how intuition forms.",
      href: "/how-we-teach",
      icon: Layers,
      pill: "01 · Methodology",
      accent: "var(--zy-run)",
    },
    {
      title: "Curriculum",
      description: "Complete 8-module syllabus from Python syntax to deep neural nets.",
      href: "/curriculum",
      icon: GraduationCap,
      pill: "02 · Syllabus",
      accent: "var(--zy-active)",
    },
    {
      title: "Showcase",
      description: "Hands-on preview of live 3D models, debug challenges, and quizzes.",
      href: "/showcase",
      icon: Sparkles,
      pill: "03 · Playground",
      accent: "var(--zy-run)",
    },
    {
      title: "Pricing",
      description: "Transparent, flexible tiers starting free with no credit card required.",
      href: "/pricing",
      icon: CreditCard,
      pill: "04 · Investment",
      accent: "var(--zy-active)",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--zy-bg)] border-t border-[var(--zy-border)] overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--zy-surface-2)] border border-[var(--zy-border)] text-xs font-mono font-medium text-[var(--zy-active-text)] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--zy-active)]" />
              <span className="tracking-wide uppercase text-[11px]">Explore Zyrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--zy-text)] tracking-tight">
              Explore the Platform
            </h2>
            <p className="text-sm sm:text-base text-[var(--zy-muted)] font-sans leading-relaxed max-w-xl mx-auto">
              Everything you need to master machine learning, organized across dedicated spaces.
            </p>
          </div>

          {/* 4-column desktop, 2-column tablet, 1-column mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative flex flex-col justify-between bg-[var(--zy-surface)] border border-[var(--zy-border)] hover:border-[var(--zy-active)]/80 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)] focus-visible:ring-offset-2 active:scale-98"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl bg-[var(--zy-surface-2)] border border-[var(--zy-border)] flex items-center justify-center transition-colors group-hover:scale-105"
                        style={{ color: card.accent }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-medium text-[var(--zy-muted)] bg-[var(--zy-surface-2)] px-2 py-0.5 rounded-md border border-[var(--zy-border)]">
                        {card.pill}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--zy-text)] group-hover:text-[var(--zy-active-text)] transition-colors tracking-tight">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--zy-muted)] font-sans leading-relaxed mt-2">
                      {card.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--zy-active-text)] mt-5 group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
