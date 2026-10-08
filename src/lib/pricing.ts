/**
 * PRICING CONFIGURATION
 *
 * NOTE: The pricing numbers defined below are PLACEHOLDERS pending final
 * commercial confirmation prior to product launch. All tiers, discounts,
 * and billing calculations are consolidated here.
 */

export interface PricingTier {
  id: "free" | "core" | "all-access";
  name: string;
  tagline: string;
  monthlyPrice: number; // Placeholder value in USD
  badge?: string;
  isPopular?: boolean;
  features: string[];
  specializations?: string[];
  ctaText: string;
  ctaHref: string;
}

export const ANNUAL_DISCOUNT_RATE = 0.25; // 25% discount on annual billing

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Essential foundations for curious learners exploring machine learning.",
    monthlyPrice: 0,
    features: [
      "Modules 1–3 (Python, Vector Calculus, Linear Algebra)",
      "Standard interactive 3D & 2D showcase formats",
      "Introductory quizzes with instant reasoning feedback",
      "Community discussion forum access",
    ],
    ctaText: "Start Free",
    ctaHref: "#",
    isPopular: false,
  },
  {
    id: "core",
    name: "Core",
    tagline: "The complete curriculum with all 7 interactive teaching formats.",
    monthlyPrice: 24, // PLACEHOLDER: $24/mo ($18/mo when billed annually)
    badge: "Most Popular",
    isPopular: true,
    features: [
      "All 8 comprehensive syllabus modules (250+ key concepts)",
      "Full interactive code sandboxes with live evaluation",
      "300+ debug challenges with diagnostic test suites",
      "340+ conceptual quizzes with step-by-step reasoning",
      "Verified course completion certificate",
      "Community workspace & peer code review channels",
    ],
    ctaText: "Get Core Access",
    ctaHref: "#",
  },
  {
    id: "all-access",
    name: "All Access",
    tagline: "Core curriculum plus four dedicated professional specialization tracks.",
    monthlyPrice: 48, // PLACEHOLDER: $48/mo ($36/mo when billed annually)
    features: [
      "Everything included in the Core plan",
      "Advanced NLP + Prompt Engineering specialization",
      "MLOps + Prompt Engineering specialization",
      "Advanced CV + Prompt Engineering specialization",
      "Generative AI + Prompt Engineering specialization",
      "1-on-1 asynchronous mentor feedback on capstone code",
      "Lifetime updates to existing & newly added modules",
    ],
    specializations: [
      "Advanced NLP + Prompt Engineering",
      "MLOps + Prompt Engineering",
      "Advanced CV + Prompt Engineering",
      "Generative AI + Prompt Engineering",
    ],
    ctaText: "Get All Access",
    ctaHref: "#",
    isPopular: false,
  },
];

export interface ComputedPrice {
  monthlyRate: number;
  billedAnnualTotal: number;
  isFree: boolean;
  savingsPercentage: number;
  annualSavingsTotal: number;
}

export function computeTierPrice(
  tier: PricingTier,
  isAnnual: boolean
): ComputedPrice {
  if (tier.monthlyPrice === 0) {
    return {
      monthlyRate: 0,
      billedAnnualTotal: 0,
      isFree: true,
      savingsPercentage: 0,
      annualSavingsTotal: 0,
    };
  }

  if (isAnnual) {
    const discountedMonthly = Math.round(
      tier.monthlyPrice * (1 - ANNUAL_DISCOUNT_RATE)
    );
    const annualTotal = discountedMonthly * 12;
    const fullMonthlyAnnualTotal = tier.monthlyPrice * 12;
    const annualSavings = fullMonthlyAnnualTotal - annualTotal;

    return {
      monthlyRate: discountedMonthly,
      billedAnnualTotal: annualTotal,
      isFree: false,
      savingsPercentage: Math.round(ANNUAL_DISCOUNT_RATE * 100),
      annualSavingsTotal: annualSavings,
    };
  }

  return {
    monthlyRate: tier.monthlyPrice,
    billedAnnualTotal: tier.monthlyPrice * 12,
    isFree: false,
    savingsPercentage: 0,
    annualSavingsTotal: 0,
  };
}
