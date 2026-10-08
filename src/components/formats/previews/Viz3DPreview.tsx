import React from "react";

export function Viz3DPreview() {
  return (
    <div className="min-h-[118px] w-full flex flex-col justify-center items-center relative overflow-hidden bg-[#1E1A17] rounded-lg p-2.5">
      {/* 3D Wireframe Loss Surface SVG */}
      <svg
        viewBox="0 0 200 100"
        className="w-full h-full text-[#C1502E]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Isometric axes */}
        <line x1="20" y1="85" x2="180" y2="85" stroke="#4A3F37" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="100" y1="85" x2="100" y2="15" stroke="#4A3F37" strokeWidth="1" strokeDasharray="3 3" />

        {/* Parabolic contour curves (cross-sections) */}
        <path d="M 25 25 Q 100 85 175 25" stroke="#C1502E" strokeWidth="1.5" strokeOpacity="0.4" />
        <path d="M 35 35 Q 100 85 165 35" stroke="#C1502E" strokeWidth="1.5" strokeOpacity="0.6" />
        <path d="M 45 45 Q 100 85 155 45" stroke="#C1502E" strokeWidth="1.5" strokeOpacity="0.8" />
        <path d="M 55 55 Q 100 85 145 55" stroke="#E07A5F" strokeWidth="1.5" />
        <path d="M 70 68 Q 100 85 130 68" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Transverse grid ribs */}
        <path d="M 45 45 Q 60 72 100 85" stroke="#C1502E" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M 155 45 Q 140 72 100 85" stroke="#C1502E" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M 100 15 L 100 85" stroke="#E07A5F" strokeWidth="1" strokeOpacity="0.5" />

        {/* Converged Global Minimum Node */}
        <circle cx="100" cy="85" r="3.5" fill="#F59E0B" />
        <circle cx="100" cy="85" r="7" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.5" className="animate-ping" />

        {/* Descent Point on surface */}
        <circle cx="58" cy="56" r="3" fill="#FBBF24" />
        <path d="M 58 56 Q 78 72 100 85" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>

      {/* Subtle overlay badge */}
      <div className="absolute bottom-1.5 right-2 text-[10px] font-mono text-[#D8CEBC]/80 bg-[#2B2521]/90 px-1.5 py-0.5 rounded border border-[#4A3F37]">
        f(x, y) = x² + 1.2y²
      </div>
    </div>
  );
}
