import React from "react";
import { Check, HelpCircle } from "lucide-react";

export function QuizPreview() {
  return (
    <div className="min-h-[118px] w-full flex flex-col justify-between bg-white rounded-lg p-2.5 border border-[#E6DCC8]/70 text-xs">
      {/* Quiz prompt header */}
      <div className="flex items-start gap-1.5 text-[11px] font-medium text-[#2B2521] leading-tight">
        <HelpCircle className="w-3.5 h-3.5 text-[#C1502E] shrink-0 mt-0.5" />
        <span>Which method prevents test leakage during evaluation?</span>
      </div>

      {/* Mini Options */}
      <div className="space-y-1.5 my-auto">
        <div className="flex items-center justify-between px-2 py-1 rounded bg-[#FAF4ED] border border-[#E6DCC8] text-[10px] text-[#6B6058] gap-1">
          <span className="font-mono truncate">model.fit_predict()</span>
          <span className="text-[9px] text-[#A89F91] shrink-0">Leak risk</span>
        </div>

        <div className="flex items-center justify-between px-2 py-1 rounded bg-[#F1E2CF]/80 border border-[#C1502E] text-[10px] text-[#8C3A20] font-medium shadow-xs gap-1">
          <span className="font-mono font-semibold truncate">model.predict()</span>
          <span className="flex items-center gap-1 text-emerald-700 text-[10px] font-bold shrink-0">
            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
            <span>Correct</span>
          </span>
        </div>
      </div>

      {/* Bottom status feedback */}
      <div className="flex items-center justify-between text-[9px] text-[#6B6058] pt-1 border-t border-[#E6DCC8]/50">
        <span>Instant recall test</span>
        <span className="text-emerald-700 font-medium">+50 pts earned</span>
      </div>
    </div>
  );
}
