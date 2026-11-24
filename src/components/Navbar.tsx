"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { ZyrixLogo } from "@/components/ZyrixLogo";

interface NavbarProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

export function Navbar({ theme = "light", onToggleTheme }: NavbarProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "How We Teach", href: "/how-we-teach" },
    { label: "Curriculum", href: "/curriculum" },
    { label: "Showcase", href: "/showcase" },
    { label: "Pricing", href: "/pricing" },
  ];

  // Close mobile menu on Escape key for keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--zy-navbar-bg)] backdrop-blur-md border-b border-[var(--zy-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo Mark & Wordmark */}
          <Link
            href="/"
            className="group transition-transform active:scale-98"
            aria-label="Zyrix Home"
          >
            <ZyrixLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition-colors relative py-1 rounded-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)] focus-visible:ring-offset-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[var(--zy-accent-orange)] after:transition-all after:duration-200 ${
                    isActive
                      ? "text-[var(--zy-text)] font-semibold after:w-full"
                      : "text-[var(--zy-muted)] hover:text-[var(--zy-text)] after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side: Theme Toggle & Brand CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="p-2 rounded-xl text-[var(--zy-muted)] hover:text-[var(--zy-text)] bg-[var(--zy-surface)] hover:bg-[var(--zy-surface-2)] border border-[var(--zy-border)] transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)]"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-[var(--zy-accent-orange)]" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--zy-muted)]" />
                )}
              </button>
            )}

            {/* Premium CTA Button */}
            <Link
              href="/learn/module-1/episode-1"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--zy-accent-orange)] hover:bg-[var(--zy-accent-orange-deep)] text-[#17191F] shadow-xs hover:shadow-md transition-all duration-200 active:scale-98 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--zy-border-focus)]"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="p-2 rounded-lg text-[var(--zy-muted)] hover:text-[var(--zy-text)] bg-[var(--zy-surface)] border border-[var(--zy-border)]"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-[var(--zy-active)]" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--zy-muted)]" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--zy-text,#2B2521)] hover:bg-[var(--zy-surface-2,#F1E2CF)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--zy-border-focus)] cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--zy-surface,#FBF6EF)] border-b border-[var(--zy-border,#E6DCC8)] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--zy-surface-2,#F1E2CF)] text-[var(--zy-active-text,#C1502E)] font-semibold"
                      : "text-[var(--zy-text,#2B2521)] hover:bg-[var(--zy-surface-2,#F1E2CF)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-[var(--zy-border,#E6DCC8)]">
            <Link
              href="/learn/module-1/episode-1"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full text-base font-semibold bg-[var(--zy-accent-orange)] hover:bg-[var(--zy-accent-orange-deep)] text-[#17191F] shadow-xs"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
