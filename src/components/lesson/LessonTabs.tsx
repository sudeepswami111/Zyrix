"use client";

import React from "react";
import { PlayCircle, BookOpen, Code2, HelpCircle } from "lucide-react";

export type LessonTabId = "watch" | "story" | "sandbox" | "quiz";

export interface TabConfig {
  id: LessonTabId;
  label: string;
  badge?: string;
  isAvailable?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const LESSON_TABS: TabConfig[] = [
  {
    id: "watch",
    label: "Watch",
    badge: "Active",
    isAvailable: true,
    icon: PlayCircle,
    description: "4K studio video walkthrough explaining Python's execution architecture",
  },
  {
    id: "story",
    label: "Story",
    badge: "Coming soon",
    isAvailable: false,
    icon: BookOpen,
    description: "Follow Asha's journey learning Python from scratch across worked examples",
  },
  {
    id: "sandbox",
    label: "Sandbox",
    badge: "Coming soon",
    isAvailable: false,
    icon: Code2,
    description: "Interactive in-browser Pyodide code environment to experiment with memory references",
  },
  {
    id: "quiz",
    label: "Quiz",
    badge: "Coming soon",
    isAvailable: false,
    icon: HelpCircle,
    description: "Test your mental model and recall on Python syntax and execution rules",
  },
];

interface LessonTabsProps {
  activeTab: LessonTabId;
  onTabChange: (tabId: LessonTabId) => void;
  tabOverrides?: Partial<Record<LessonTabId, Partial<TabConfig>>>;
}

export function LessonTabs({ activeTab, onTabChange, tabOverrides }: LessonTabsProps) {
  const tabs = LESSON_TABS.map((tab) => ({
    ...tab,
    ...(tabOverrides?.[tab.id] || {}),
  }));

  return (
    <div className="w-full space-y-4">
      {/* Scrollable / Responsive Tab Bar */}
      <div className="w-full overflow-x-auto pb-1 -mb-1">
        <div
          role="tablist"
          aria-label="Lesson learning formats"
          className="flex items-center gap-2 sm:gap-3 min-w-max sm:min-w-0"
        >
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                role="tab"
                id={`lesson-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`lesson-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    const nextIdx = (idx + 1) % tabs.length;
                    onTabChange(tabs[nextIdx].id);
                    document.getElementById(`lesson-tab-${tabs[nextIdx].id}`)?.focus();
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    const prevIdx = (idx - 1 + tabs.length) % tabs.length;
                    onTabChange(tabs[prevIdx].id);
                    document.getElementById(`lesson-tab-${tabs[prevIdx].id}`)?.focus();
                  }
                }}
                className={`group flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E] focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-[#C1502E] text-white shadow-warm hover:bg-[#A84224]"
                    : "bg-white/90 text-[#6B6058] hover:text-[#2B2521] hover:bg-[#FAF4ED] border border-[#E6DCC8] shadow-xs"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-white" : "text-[#C1502E]"
                  }`}
                />
                <span className="font-semibold">{tab.label}</span>

                {/* Status Badge */}
                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? "bg-white/20 text-white font-medium"
                        : tab.isAvailable
                        ? "bg-[#F1E2CF] text-[#8C3A20]"
                        : "bg-[#FAF4ED] text-[#8C7E72] border border-[#E6DCC8]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Tab Sub-description */}
      <div className="flex items-center justify-between text-xs text-[#6B6058] px-1 font-sans">
        <p>
          {tabs.find((t) => t.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
}
