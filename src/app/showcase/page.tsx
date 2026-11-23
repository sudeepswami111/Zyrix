import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { PageHeader } from "@/components/PageHeader";
import { PageClosingStrip } from "@/components/PageClosingStrip";

export const metadata: Metadata = {
  title: "Showcase | Zyrix",
  description:
    "Test drive interactive code challenges, conceptual quizzes, 3D simulations, and video player walkthroughs.",
};

export default function ShowcasePage() {
  return (
    <>
      <PageHeader
        kicker="Showcase"
        kickerIcon={<Sparkles className="w-3.5 h-3.5 text-[#C1502E]" />}
        title="See It for Yourself"
        intro="Interact directly with our four core teaching formats — debug Python leaks, take quick quizzes, and rotate 3D clusters."
      />
      <ShowcaseSection />
      <PageClosingStrip
        title="Put your skills to the test"
        description="Begin with hands-on challenges and live coding in Episode 1."
      />
    </>
  );
}
