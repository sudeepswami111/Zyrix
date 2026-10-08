import React from "react";
import { Play } from "lucide-react";

export function VideoPreview() {
  return (
    <div className="min-h-[118px] w-full flex flex-col justify-between bg-[#26211D] rounded-lg p-2.5 relative overflow-hidden group/video border border-[#3E352F]">
      {/* Subtle background abstract gradient suggesting video frame */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1614] via-[#2F2620] to-[#45362C] opacity-90" />
      
      {/* Top Video Metadata */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-[#D8CEBC]">
        <span className="font-medium truncate max-w-[70%]">Module Intro: Backpropagation</span>
        <span className="bg-[#1A1614]/80 px-1.5 py-0.5 rounded text-[9px] font-mono border border-[#45362C]">
          3:40
        </span>
      </div>

      {/* Centered Play Button */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        <div className="w-9 h-9 rounded-full bg-[#C1502E] text-white flex items-center justify-center shadow-md group-hover/video:scale-105 group-hover/video:bg-[#A84224] transition-transform duration-200">
          <Play className="w-4 h-4 ml-0.5 fill-current" />
        </div>
      </div>

      {/* Bottom scrubber timeline bar */}
      <div className="relative z-10 space-y-1">
        <div className="w-full h-1 bg-[#4A3F37] rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-[#C1502E] rounded-full" />
        </div>
        <div className="flex justify-between text-[9px] text-[#A89F91]">
          <span>Guided pacing</span>
          <span>1080p · CC</span>
        </div>
      </div>
    </div>
  );
}
