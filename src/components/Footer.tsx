"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ZyrixLogo } from "@/components/ZyrixLogo";

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
              className="group inline-block"
              aria-label="Zyrix Home"
            >
              <ZyrixLogo size="md" />
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
