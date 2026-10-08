import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

export function StorytellingPreview() {
  const steps = [
    { title: "Raw Data", detail: "48k rows", done: true },
    { title: "Features", detail: "ZIP target enc", done: true },
    { title: "Model Fit", detail: "XGBoost v2", active: true },
    { title: "Deploy", detail: "p95 < 12ms", done: false },
  ];

  return (
    <div className="min-h-[118px] w-full flex flex-col justify-between bg-white rounded-lg p-2.5 border border-[#E6DCC8]/70">
      <div className="flex items-center justify-between text-[11px] text-[#6B6058] gap-1">
        <span className="font-semibold text-[#2B2521] truncate">NYC Housing Case Study</span>
        <span className="text-[10px] font-mono text-[#C1502E] shrink-0 bg-[#F1E2CF]/70 px-1 rounded">Step 3/4</span>
      </div>

      {/* Connected 4-step visual flow */}
      <div className="grid grid-cols-4 gap-1.5 items-center relative my-auto">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center relative group">
            {/* Step indicator node */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                step.done
                  ? "bg-[#F1E2CF] text-[#8C3A20] border border-[#C1502E]"
                  : step.active
                  ? "bg-[#C1502E] text-white shadow-xs"
                  : "bg-[#FAF4ED] text-[#A89F91] border border-[#E6DCC8]"
              }`}
            >
              {step.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C1502E]" />
              ) : (
                idx + 1
              )}
            </div>

            {/* Label */}
            <span
              className={`text-[10px] mt-1 font-medium leading-tight ${
                step.active ? "text-[#C1502E] font-semibold" : "text-[#2B2521]"
              }`}
            >
              {step.title}
            </span>
            <span className="text-[9px] text-[#6B6058]">{step.detail}</span>

            {/* Connector arrow between steps */}
            {idx < steps.length - 1 && (
              <ChevronRight className="absolute -right-2 top-1 w-3 h-3 text-[#D8CEBC] pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      {/* Bottom contextual caption */}
      <div className="text-[10px] text-[#6B6058] bg-[#FAF4ED] px-2 py-0.5 rounded border border-[#E6DCC8] truncate">
        One real problem tracked from messy ingestion to production metrics.
      </div>
    </div>
  );
}
