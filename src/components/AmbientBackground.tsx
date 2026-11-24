"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function subscribePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function AmbientBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const isFinePointer = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    () => false
  );
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !isFinePointer || reducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, [isFinePointer, reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Faint Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: "radial-gradient(var(--zy-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Subtle warm glow following cursor on desktop fine pointer */}
      {isFinePointer && !reducedMotion && coords && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(550px circle at ${coords.x}px ${coords.y}px, var(--zy-accent-orange-subtle), transparent 75%)`,
          }}
        />
      )}
    </div>
  );
}
