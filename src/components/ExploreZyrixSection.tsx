import React from "react";
import Link from "next/link";
import { Layers, GraduationCap, Sparkles, CreditCard, ArrowRight } from "lucide-react";

export function ExploreZyrixSection() {
  const cards = [
    {
      title: "How We Teach",
      description: "Our 7-medium philosophy matching each topic to how intuition forms.",
      href: "/how-we-teach",
      icon: Layers,
      pill: "01 · Methodology",
    },
    {
      title: "Curriculum",
      description: "Complete 8-module syllabus from Python syntax to deep neural nets.",
      href: "/curriculum",
      icon: GraduationCap,
      pill: "02 · Syllabus",
    },
    {
      title: "Showcase",
      description: "Hands-on preview of live 3D models, debug challenges, and quizzes.",
      href: "/showcase",
      icon: Sparkles,
      pill: "03 · Playground",
    },
    {
      title: "Pricing",
      description: "Transparent, flexible tiers starting free with no credit card required.",
      href: "/pricing",
      icon: CreditCard,
      pill: "04 · Investment",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FBF6EF] border-t border-[#E6DCC8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-medium text-[#8C3A20] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C1502E]" />
            <span>Explore Zyrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B2521] tracking-tight">
            Explore the Platform
          </h2>
          <p className="text-sm sm:text-base text-[#6B6058] font-sans leading-relaxed max-w-xl mx-auto">
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
                className="group relative flex flex-col justify-between bg-white border border-[#E6DCC8] hover:border-[#C1502E]/60 rounded-2xl p-6 transition-all duration-200 hover:shadow-warm-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2 active:scale-98"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8] text-[#C1502E] flex items-center justify-center transition-colors group-hover:bg-[#F1E2CF]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#8C3A20] bg-[#F1E2CF]/70 px-2 py-0.5 rounded-md border border-[#E6DCC8]/60">
                      {card.pill}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2B2521] group-hover:text-[#C1502E] transition-colors tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6B6058] font-sans leading-relaxed mt-2">
                    {card.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C1502E] mt-5 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
