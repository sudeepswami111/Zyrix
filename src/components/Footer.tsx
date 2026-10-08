"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function checkWebGL(): "supported" | "unsupported" {
  if (typeof window === "undefined") return "unsupported";
  try {
    const canvas = document.createElement("canvas");
    return canvas.getContext("webgl2") ||
      canvas.getContext("experimental-webgl2")
      ? "supported"
      : "unsupported";
  } catch {
    return "unsupported";
  }
}

const noopSubscribe = () => () => { };

export function Footer() {
  const webglStatus = useSyncExternalStore(
    noopSubscribe,
    checkWebGL,
    () => "unsupported"
  );

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FBF6EF] text-[#2B2521] border-t border-[#E6DCC8] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#E6DCC8]">
          {/* Brand Column (2 columns span on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Zyrix Home"
            >
              <div className="w-8 h-8 rounded-xl bg-[#C1502E] flex items-center justify-center text-white shadow-xs">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7.5C6 6.67157 6.67157 6 7.5 6H16.5C17.3284 6 18 6.67157 18 7.5C18 8.01633 17.7348 8.4907 17.3 8.76L8.8 14.5H16.5C17.3284 14.5 18 15.1716 18 16C18 16.8284 17.3284 17.5 16.5 17.5H7.5C6.67157 17.5 6 16.8284 6 16C6 15.4837 6.26524 15.0093 6.7 14.74L15.2 9H7.5C6.67157 9 6 8.32843 6 7.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-[#2B2521]">
                Zyrix
              </span>
            </Link>

            <p className="text-sm text-[#6B6058] font-sans leading-relaxed max-w-sm">
              The publication-grade machine learning platform pairing
              interactive 3D intuition with real code debugging and conceptual
              rigor.
            </p>

            {/* Real WebGL2 Status Indicator */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF4ED] border border-[#E6DCC8] text-xs font-mono text-[#6B6058]">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${webglStatus === "supported"
                      ? "bg-[#16A34A]"
                      : webglStatus === "unsupported"
                        ? "bg-[#D97706]"
                        : "bg-[#8C7E72] animate-pulse"
                    }`}
                />
                <span>
                  {webglStatus === "supported"
                    ? "WebGL 2.0 Acceleration Active"
                    : webglStatus === "unsupported"
                      ? "WebGL 2.0 Unavailable (Fallback Mode)"
                      : "Detecting Graphics Capabilities..."}
                </span>
              </div>
            </div>
          </div>

          {/* Product Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8C3A20]">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a
                  href="#how-we-teach"
                  onClick={(e) => handleSmoothScroll(e, "#how-we-teach")}
                  className="text-[#6B6058] hover:text-[#2B2521] transition-colors rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E]"
                >
                  How We Teach
                </a>
              </li>
              <li>
                <a
                  href="#curriculum"
                  onClick={(e) => handleSmoothScroll(e, "#curriculum")}
                  className="text-[#6B6058] hover:text-[#2B2521] transition-colors rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E]"
                >
                  Curriculum
                </a>
              </li>
              <li>
                <a
                  href="#showcase"
                  onClick={(e) => handleSmoothScroll(e, "#showcase")}
                  className="text-[#6B6058] hover:text-[#2B2521] transition-colors rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E]"
                >
                  Format Showcase
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleSmoothScroll(e, "#pricing")}
                  className="text-[#6B6058] hover:text-[#2B2521] transition-colors rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C1502E]"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Community Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8C3A20]">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[#6B6058] hover:text-[#2B2521] transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[#6B6058] hover:text-[#2B2521] transition-colors"
                >
                  <span>Discord Community</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B6058] hover:text-[#2B2521] transition-colors"
                >
                  About Zyrix
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B6058] hover:text-[#2B2521] transition-colors"
                >
                  Contact & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8C3A20]">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a
                  href="#"
                  className="text-[#6B6058] hover:text-[#2B2521] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B6058] hover:text-[#2B2521] transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B6058] hover:text-[#2B2521] transition-colors"
                >
                  Cookie Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#6B6058] hover:text-[#2B2521] transition-colors"
                >
                  Honor Code
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#8C7E72]">
          <p>© {currentYear} Zyrix Education Inc. All rights reserved.</p>
          <p className="text-[11px] text-[#A89C8F]">
            Designed with warm editorial aesthetics • Built for modern browsers
          </p>
        </div>
      </div>
    </footer>
  );
}
