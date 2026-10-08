import React from "react";
import { AlertCircle } from "lucide-react";

export function DebugPreview() {
  return (
    <div className="min-h-[118px] w-full flex flex-col justify-between bg-[#1F1B18] text-[#F1E2CF] rounded-lg p-2.5 font-mono text-[11px] border border-[#3E352F]">
      {/* Code Header */}
      <div className="flex items-center justify-between text-[10px] text-[#A89F91] border-b border-[#3E352F] pb-1">
        <span>leak_detection.py</span>
        <span className="text-amber-400 flex items-center gap-1 font-sans text-[10px]">
          <AlertCircle className="w-3 h-3" />
          <span>1 Issue</span>
        </span>
      </div>

      {/* Code lines */}
      <div className="space-y-1 my-auto">
        <div className="flex gap-2 text-[#7C7267]">
          <span className="w-3 select-none">1</span>
          <span className="text-[#E07A5F]">scaler</span> = StandardScaler()
        </div>
        <div className="flex gap-2 text-[#7C7267]">
          <span className="w-3 select-none">2</span>
          <span>X_train = scaler.<span className="text-emerald-400">fit_transform</span>(X_tr)</span>
        </div>
        {/* Flagged Bug Line */}
        <div className="flex gap-2 bg-[#C1502E]/20 -mx-1 px-1 py-0.5 rounded border-l-2 border-[#C1502E]">
          <span className="w-3 text-[#C1502E] select-none font-bold">3</span>
          <span className="text-white">
            X_test = scaler.<span className="text-[#F87171] underline decoration-wavy decoration-[#C1502E] font-semibold">fit_transform</span>(X_te)
          </span>
        </div>
      </div>

      {/* Inline diagnostic hint */}
      <div className="text-[10px] text-[#FCA5A5] bg-[#381F1A] px-2 py-0.5 rounded flex items-center justify-between font-sans">
        <span>Data leak! Use .transform() on test data</span>
        <span className="text-amber-300 font-mono text-[9px]">L3:C18</span>
      </div>
    </div>
  );
}
