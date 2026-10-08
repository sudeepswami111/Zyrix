import React from "react";
import { Bot, User } from "lucide-react";

export function AITutorPreview() {
  return (
    <div className="min-h-[118px] w-full flex flex-col justify-between bg-[#FAF4ED]/70 rounded-lg p-2.5 border border-[#E6DCC8]/80 text-[10px]">
      {/* Student Question Bubble */}
      <div className="flex items-start gap-1.5 self-end max-w-[88%]">
        <div className="bg-white border border-[#E6DCC8] text-[#2B2521] px-2.5 py-1.5 rounded-xl rounded-tr-xs shadow-2xs leading-snug">
          Wait, why did my loss suddenly jump to <code className="text-[#C1502E] font-mono bg-[#F1E2CF] px-1 rounded text-[9px]">NaN</code>?
        </div>
        <div className="w-5 h-5 rounded-full bg-[#E6DCC8] flex items-center justify-center shrink-0 mt-0.5 text-[#6B6058]">
          <User className="w-3 h-3" />
        </div>
      </div>

      {/* AI Tutor Response Bubble */}
      <div className="flex items-start gap-1.5 self-start max-w-[92%] mt-1.5">
        <div className="w-5 h-5 rounded-full bg-[#C1502E] flex items-center justify-center shrink-0 mt-0.5 text-white">
          <Bot className="w-3 h-3" />
        </div>
        <div className="bg-[#F1E2CF]/90 border border-[#E6DCC8] text-[#2B2521] px-2.5 py-1.5 rounded-xl rounded-tl-xs shadow-2xs leading-snug">
          <span className="font-semibold text-[#8C3A20]">Gradient overshoot:</span> Your learning rate (0.9) vaulted over the bowl. Dial it back to <code className="font-mono text-[9px] bg-white/70 px-1 rounded">0.05</code> to stabilize convergence.
        </div>
      </div>

      {/* Active context footer */}
      <div className="text-[9px] text-[#6B6058] flex items-center justify-between border-t border-[#E6DCC8]/60 pt-1">
        <span>Aware of your live code &amp; state</span>
        <span className="text-[#C1502E] font-medium">Instant reply</span>
      </div>
    </div>
  );
}
