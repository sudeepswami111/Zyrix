"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AmbientBackground } from "@/components/AmbientBackground";

function getInitialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem("zyrix-marketing-theme");
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  } catch {
    // Safe fallback if localStorage is unavailable
  }
  return "dark";
}

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLessonRoute = pathname?.startsWith("/learn");

  // Dark-first default palette with lazy initial state
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("zyrix-marketing-theme", next);
    } catch {
      // Safe fallback
    }
  };

  // Lesson pages maintain the exact existing cream/terracotta look
  if (isLessonRoute) {
    return <>{children}</>;
  }

  return (
    <div
      className="zy-marketing relative min-h-screen flex flex-col transition-colors duration-300"
      data-theme={theme}
    >
      <AmbientBackground />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
