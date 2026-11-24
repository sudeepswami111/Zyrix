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

const noopSubscribe = () => () => {};

export function Footer() {
  const webglStatus = useSyncExternalStore(
    noopSubscribe,
    checkWebGL,
    () => "unsupported"
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--zy-bg)] text-[var(--zy-text)] border-t border-[var(--zy-border)] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[var(--zy-border)]">
          {/* Brand Column (2 columns span on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Zyrix Home"
            >
              <div className="w-8 h-8 rounded-xl bg-[#17191F] flex items-center justify-center text-white shadow-2xs transition-transform group-hover:scale-105 relative overflow-hidden border border-[var(--zy-border)]">
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--zy-accent-orange)] opacity-90" />
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10"
                >
                  <path
                    d="M6 7.5C6 6.67157 6.67157 6 7.5 6H16.5C17.3284 6 18 6.67157 18 7.5C18 8.01633 17.7348 8.4907 17.3 8.76L8.8 14.5H16.5C17.3284 14.5 18 15.1716 18 16C18 16.8284 17.3284 17.5 16.5 17.5H7.5C6.67157 17.5 6 16.8284 6 16C6 15.4837 6.26524 15.0093 6.7 14.74L15.2 9H7.5C6.67157 9 6 8.32843 6 7.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-[var(--zy-text)]">
                Zyrix
              </span>
            </Link>

            <p className="text-sm text-[var(--zy-muted)] font-sans leading-relaxed max-w-sm">
              An editorial interactive technology learning platform pairing
              spatial 3D mental models with in-browser execution and zero-fluff conceptual rigor.
            </p>

            {/* Real WebGL2 Status Indicator */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--zy-surface)] border border-[var(--zy-border)] text-xs font-mono text-[var(--zy-muted)] shadow-2xs">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    webglStatus === "supported"
                      ? "bg-[var(--zy-run)]"
                      : webglStatus === "unsupported"
                      ? "bg-[#D97706]"
                      : "bg-[#8E95A5] animate-pulse"
                  }`}
                />
                <span>
                  {webglStatus === "supported"
                    ? "WebGL 2.0 Acceleration Active"
                    : webglStatus === "unsupported"
                    ? "WebGL 2.0 Fallback Mode"
                    : "Detecting Graphics Capabilities..."}
                </span>
              </div>
            </div>
          </div>

          {/* Product Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--zy-text)]">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link
                  href="/how-we-teach"
                  className="text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)]"
                >
                  How We Teach
                </Link>
              </li>
              <li>
                <Link
                  href="/curriculum"
                  className="text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)]"
                >
                  Curriculum
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase"
                  className="text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)]"
                >
                  Format Showcase
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)]"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Community Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--zy-text)]">
              Community
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors"
                >
                  <span>Discord Community</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors"
                >
                  About Zyrix
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors"
                >
                  Contact & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--zy-text)]">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a
                  href="#"
                  className="text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors"
                >
                  Cookie Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--zy-muted)] hover:text-[var(--zy-text)] transition-colors"
                >
                  Honor Code
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--zy-muted)]">
          <p>© {currentYear} Zyrix Education Inc. All rights reserved.</p>
          <p className="text-[11px] opacity-80">
            Understand Technology • Built for modern browsers
          </p>
        </div>
      </div>
    </footer>
  );
}
