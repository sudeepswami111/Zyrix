import React from "react";

export function PageBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 bg-[#FBF6EF] overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft warm ambient lighting for paper-like warmth */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] opacity-70 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(245, 232, 215, 0.6) 0%, rgba(251, 246, 239, 0) 70%)",
        }}
      />
      {/* Subtle organic texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
