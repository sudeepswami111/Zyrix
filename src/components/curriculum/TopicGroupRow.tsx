import React from "react";
import { TopicGroup, TeachingFormat } from "@/lib/curriculumData";
import {
  Box,
  PlayCircle,
  Bug,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Video,
} from "lucide-react";

interface TopicGroupRowProps {
  group: TopicGroup;
}

function getFormatBadgeConfig(format: TeachingFormat) {
  switch (format) {
    case "3D Visualization":
      return {
        icon: Box,
        bg: "bg-[#F1E2CF] border-[#E6DCC8] text-[#8C3A20]",
        dot: "bg-[#C1502E]",
      };
    case "Process Animation":
      return {
        icon: PlayCircle,
        bg: "bg-[#FEF3C7] border-[#FDE68A] text-[#92400E]",
        dot: "bg-amber-500",
      };
    case "Debug Challenge":
      return {
        icon: Bug,
        bg: "bg-[#FEE2E2] border-[#FECACA] text-[#991B1B]",
        dot: "bg-red-500",
      };
    case "Worked-Example Story":
      return {
        icon: BookOpen,
        bg: "bg-[#FAF4ED] border-[#E6DCC8] text-[#78350F]",
        dot: "bg-[#A84224]",
      };
    case "Quiz & Sandbox":
      return {
        icon: HelpCircle,
        bg: "bg-[#E6F4EA] border-[#CEEAD6] text-[#137333]",
        dot: "bg-emerald-600",
      };
    case "AI Tutor Chat":
      return {
        icon: MessageSquare,
        bg: "bg-[#F3E8FF] border-[#E9D5FF] text-[#6B21A8]",
        dot: "bg-purple-600",
      };
    case "Narrated Video":
      return {
        icon: Video,
        bg: "bg-[#E8EDF5] border-[#D3DDEB] text-[#1E3A8A]",
        dot: "bg-blue-600",
      };
    default:
      return {
        icon: Box,
        bg: "bg-[#F1E2CF] border-[#E6DCC8] text-[#8C3A20]",
        dot: "bg-[#C1502E]",
      };
  }
}

export function TopicGroupRow({ group }: TopicGroupRowProps) {
  const badge = getFormatBadgeConfig(group.taughtWith);
  const Icon = badge.icon;

  return (
    <div className="py-2.5 px-3 rounded-xl bg-[#FAF4ED]/50 border border-[#E6DCC8]/70 hover:bg-[#FAF4ED] transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        {/* Topic Group Name */}
        <h4 className="text-xs sm:text-sm font-semibold text-[#2B2521] tracking-tight">
          {group.groupName}
        </h4>

        {/* Taught With Format Badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${badge.bg}`}
          title={`Taught using ${group.taughtWith}`}
        >
          <Icon className="w-3 h-3" />
          <span>{group.taughtWith}</span>
        </span>
      </div>

      {/* Subtopics compact wrapped tag list */}
      <div className="flex flex-wrap gap-1.5">
        {group.topics.map((topic) => (
          <span
            key={topic}
            className="text-[11px] font-sans px-2 py-0.5 rounded-md bg-white border border-[#E6DCC8] text-[#554C45]"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
