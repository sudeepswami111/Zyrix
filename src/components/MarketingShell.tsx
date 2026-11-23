"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBackground } from "@/components/PageBackground";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLessonRoute = pathname?.startsWith("/learn");

  if (isLessonRoute) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FBF6EF] text-[#2B2521] selection:bg-[#F1E2CF] selection:text-[#C1502E]">
      <PageBackground />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
