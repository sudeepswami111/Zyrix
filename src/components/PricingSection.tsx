"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  CreditCard,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
} from "lucide-react";
import {
  PRICING_TIERS,
  computeTierPrice,
  ANNUAL_DISCOUNT_RATE,
} from "@/lib/pricing";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="pricing"
      className="relative py-20 md:py-28 bg-[#FBF6EF] border-t border-[#E6DCC8] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-14">
          {/* Editorial Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-medium text-[#8C3A20] shadow-xs">
            <CreditCard className="w-3.5 h-3.5 text-[#C1502E]" />
            <span>Transparent Investment</span>
          </div>

          {/* Section Heading in Serif Display */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2B2521] tracking-tight leading-[1.18]">
            Learn at your own pace.
          </h2>

          {/* Intro Sentence */}
          <p className="text-base sm:text-lg text-[#6B6058] font-sans leading-relaxed max-w-2xl mx-auto">
            Begin with essential foundations for free. Upgrade when you are
            ready for comprehensive syllabus depth, live execution sandboxes,
            and professional specialization tracks.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center p-1 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8] shadow-xs">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2 ${
                  !isAnnual
                    ? "bg-white text-[#2B2521] shadow-xs"
                    : "text-[#6B6058] hover:text-[#2B2521]"
                }`}
                aria-pressed={!isAnnual}
              >
                Monthly billing
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2 ${
                  isAnnual
                    ? "bg-white text-[#2B2521] shadow-xs"
                    : "text-[#6B6058] hover:text-[#2B2521]"
                }`}
                aria-pressed={isAnnual}
              >
                <span>Annual billing</span>
                <span className="px-2 py-0.5 rounded-full bg-[#F1E2CF] text-[#8C3A20] text-[11px] font-semibold">
                  Save {Math.round(ANNUAL_DISCOUNT_RATE * 100)}%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3-Tier Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, idx) => {
            const pricing = computeTierPrice(tier, isAnnual);
            const isFeatured = tier.isPopular;

            return (
              <motion.div
                key={tier.id}
                initial={prefersReducedMotion ? false : { opacity: 1, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : idx * 0.1,
                  ease: "easeOut",
                }}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
                  isFeatured
                    ? "bg-white border-2 border-[#C1502E] shadow-warm-md ring-1 ring-[#C1502E]/20"
                    : "bg-white border border-[#E6DCC8] shadow-xs hover:shadow-warm-sm hover:border-[#D8CEBC]"
                }`}
              >
                {/* Popular Badge on Core Plan */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F1E2CF] border border-[#E6DCC8] text-xs font-semibold text-[#8C3A20] shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#C1502E]" />
                      <span>{tier.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Tier Title & Tagline */}
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2521] tracking-tight">
                      {tier.name}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#6B6058] font-sans leading-relaxed min-h-[40px]">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-[#E6DCC8]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-serif font-bold text-[#2B2521] tracking-tight">
                        ${pricing.monthlyRate}
                      </span>
                      <span className="text-xs sm:text-sm text-[#6B6058] font-sans">
                        {pricing.isFree ? "/forever" : "/month"}
                      </span>
                    </div>

                    {/* Annual Billed Sub-note */}
                    {!pricing.isFree && (
                      <p className="mt-1 text-xs text-[#8C7E72] font-sans">
                        {isAnnual
                          ? `Billed annually ($${pricing.billedAnnualTotal}/yr) â€¢ Save $${pricing.annualSavingsTotal}/yr`
                          : "Billed monthly â€¢ Cancel anytime"}
                      </p>
                    )}
                    {pricing.isFree && (
                      <p className="mt-1 text-xs text-[#8C7E72] font-sans">
                        No credit card required
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8C3A20]">
                      What is included:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A4036] font-sans leading-snug"
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isFeatured
                                ? "bg-[#F1E2CF] text-[#C1502E]"
                                : "bg-[#FAF4ED] text-[#8C3A20]"
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specializations Callout (All Access Tier) */}
                  {tier.specializations && (
                    <div className="mb-8 p-3.5 rounded-xl bg-[#FAF4ED] border border-[#E6DCC8]/80 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-[#8C3A20] mb-2 font-serif">
                        <Layers className="w-3.5 h-3.5 text-[#C1502E]" />
                        <span>Included Specialization Tracks:</span>
                      </div>
                      <ul className="space-y-1.5 text-[11px] font-sans text-[#6B6058]">
                        {tier.specializations.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#C1502E]" />
                            <span className="font-medium text-[#2B2521]">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card CTA Action */}
                <div>
                  <a
                    href={tier.ctaHref}
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer active:scale-98 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2 ${
                      isFeatured
                        ? "bg-[#C1502E] hover:bg-[#A84224] text-white shadow-warm-sm hover:shadow-warm-md"
                        : tier.id === "all-access"
                        ? "bg-[#2B2521] hover:bg-[#1A1614] text-white shadow-xs"
                        : "bg-white hover:bg-[#FAF4ED] text-[#2B2521] border border-[#E6DCC8] shadow-xs"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Confidence & Reassurance Strip */}
        <div className="mt-14 pt-8 border-t border-[#E6DCC8] max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#6B6058] font-sans">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C1502E]" />
            <span>14-day refund guarantee</span>
          </div>
          <span className="text-[#E6DCC8] hidden sm:inline">â€¢</span>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#C1502E]" />
            <span>One-click cancellation anytime</span>
          </div>
          <span className="text-[#E6DCC8] hidden sm:inline">â€¢</span>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#C1502E]" />
            <span>No hidden fees or contracts</span>
          </div>
        </div>
      </div>
    </section>
  );
}


