import React from "react";

interface ZyrixLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}

export function ZyrixLogo({
  className = "",
  size = "md",
  showWordmark = true,
}: ZyrixLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8 sm:w-9 sm:h-9",
    lg: "w-11 h-11 sm:w-12 sm:h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric Mark: The Zyrix Nexus Prism */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1C202B] to-[#12151D] p-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.18)] border border-[#2D3342]/60 group-hover:border-[#FFAA45]/60 transition-all duration-300 group-hover:scale-105 overflow-hidden`}
        aria-hidden="true"
      >
        {/* Subtle ambient corner flare */}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFAA45] opacity-30 blur-xs" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-[#25B8A5] opacity-25 blur-xs" />

        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          <defs>
            {/* Warm Orange Gradient */}
            <linearGradient id="zyrix-top-grad" x1="4" y1="6" x2="28" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFAA45" />
              <stop offset="1" stopColor="#FF7A00" />
            </linearGradient>

            {/* Soft Teal / Cyan Gradient */}
            <linearGradient id="zyrix-bot-grad" x1="4" y1="18" x2="28" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#35E0C2" />
              <stop offset="1" stopColor="#1DA594" />
            </linearGradient>

            {/* Diagonal Slash Core */}
            <linearGradient id="zyrix-diagonal" x1="26" y1="7" x2="6" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF2DC" />
              <stop offset="0.5" stopColor="#FFAA45" />
              <stop offset="1" stopColor="#35E0C2" />
            </linearGradient>
          </defs>

          {/* Top Bar of Z (Geometric Polygon) */}
          <path
            d="M5 7C5 5.89543 5.89543 5 7 5H25C26.1046 5 27 5.89543 27 7V10C27 10.6865 26.6496 11.3216 26.0718 11.6882L15.5 18.5H25C26.1046 18.5 27 19.3954 27 20.5V25C27 26.1046 26.1046 27 25 27H7C5.89543 27 5 26.1046 5 25V22C5 21.3135 5.35044 20.6784 5.9282 20.3118L16.5 13.5H7C5.89543 13.5 5 12.6046 5 11.5V7Z"
            fill="#12151D"
            opacity="0.4"
          />

          {/* Top Dynamic Facet */}
          <path
            d="M6 7.5C6 6.67157 6.67157 6 7.5 6H24.5C25.3284 6 26 6.67157 26 7.5C26 8.16315 25.5647 8.74903 24.94 8.94L11.5 13H7.5C6.67157 13 6 12.3284 6 11.5V7.5Z"
            fill="url(#zyrix-top-grad)"
          />

          {/* Dynamic Diagonal Slash Channel */}
          <path
            d="M25.2 8.4L8.8 23.6"
            stroke="url(#zyrix-diagonal)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Bottom Dynamic Facet */}
          <path
            d="M26 20.5C26 19.6716 25.3284 19 24.5 19H20.5L7.06 23.06C6.43528 23.251 6 23.8369 6 24.5C6 25.3284 6.67157 26 7.5 26H24.5C25.3284 26 26 25.3284 26 24.5V20.5Z"
            fill="url(#zyrix-bot-grad)"
          />

          {/* Core Spark Node */}
          <circle cx="16" cy="16" r="1.8" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`${textSizes[size]} font-display font-extrabold tracking-tight text-[var(--zy-text)] flex items-center`}
        >
          <span>Zyr</span>
          <span className="relative text-[var(--zy-text)]">
            ı
            {/* Signature amber glowing dot above the 'i' */}
            <span
              className="absolute top-[0.16em] left-1/2 -translate-x-1/2 w-[0.24em] h-[0.24em] rounded-full bg-[#FFAA45] shadow-[0_0_6px_#FFAA45]"
              aria-hidden="true"
            />
          </span>
          <span>x</span>
        </span>
      )}
    </div>
  );
}
