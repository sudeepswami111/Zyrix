"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/components/usePrefersReducedMotion";

export interface SceneItem {
  id: string;
  duration: number; // in milliseconds
  eyebrow?: string;
  headline: string;
  caption: string;
  visual?: React.ReactNode;
  cta?: {
    text: string;
    note?: string;
    onClick?: () => void;
  };
}

export interface NarratedVideoStageProps {
  title: string;
  kicker?: string;
  subtitle?: string;
  scenes: SceneItem[];
  defaultTheme?: "light" | "dark";
  onComplete?: () => void;
  onCtaClick?: () => void;
  className?: string;
}

/**
 * Parses backticks in captions to render inline <code> tags
 */
export function formatCaption(caption: string) {
  const parts = caption.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const codeText = part.slice(1, -1);
      return (
        <code
          key={idx}
          className="font-mono text-[0.9em] px-1.5 py-0.5 rounded bg-[var(--stage-code-bg)] text-[var(--stage-accent)] border border-[var(--stage-border)] font-semibold"
        >
          {codeText}
        </code>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

/**
 * Strips markdown symbols for Web Speech API pronunciation
 */
function cleanSpeechText(text: string): string {
  return text
    .replace(/`/g, "")
    .replace(/=\s*/g, " equals ")
    .replace(/\(\)/g, " function ")
    .replace(/→/g, " outputs ")
    .replace(/—/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

export function NarratedVideoStage({
  title,
  kicker = "Module 1 · Lesson preview",
  subtitle = "A narrated-style walkthrough. Press play, or step through it yourself.",
  scenes,
  defaultTheme = "light",
  onComplete,
  onCtaClick,
  className = "",
}: NarratedVideoStageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0); // ms in current scene
  const [isNarrating, setIsNarrating] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);
  const [speechSupported, setSpeechSupported] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isSpeechActiveRef = useRef(false);

  const currentScene = scenes[currentIndex] || scenes[0];

  // Detect Web Speech API support
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Cancel any speech synthesis
  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      isSpeechActiveRef.current = false;
    }
  }, []);

  // Speak the current scene headline + caption
  const speakScene = useCallback(
    (scene: SceneItem) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      stopSpeech();

      const textToSpeak = `${cleanSpeechText(scene.headline)}. ${cleanSpeechText(
        scene.caption
      )}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.96;
      utterance.pitch = 1.0;

      // Select a natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Natural") ||
              v.name.includes("Google") ||
              v.name.includes("Samantha") ||
              v.name.includes("Alex"))
        ) || voices.find((v) => v.lang.startsWith("en"));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        isSpeechActiveRef.current = false;
      };
      utterance.onerror = () => {
        isSpeechActiveRef.current = false;
      };

      isSpeechActiveRef.current = true;
      window.speechSynthesis.speak(utterance);
    },
    [stopSpeech]
  );

  // When scene changes or narration toggles, speak if enabled
  useEffect(() => {
    if (isNarrating && isPlaying) {
      speakScene(currentScene);
    } else {
      stopSpeech();
    }
    return () => {
      stopSpeech();
    };
  }, [currentIndex, isNarrating, isPlaying, currentScene, speakScene, stopSpeech]);

  // Clean up speech when unmounting
  useEffect(() => {
    return () => {
      stopSpeech();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [stopSpeech]);

  // Jump to a specific scene
  const goToScene = useCallback(
    (newIndex: number, shouldPlay?: boolean) => {
      stopSpeech();
      const boundedIndex = Math.max(0, Math.min(scenes.length - 1, newIndex));
      setCurrentIndex(boundedIndex);
      setElapsed(0);
      lastTimeRef.current = null;
      if (typeof shouldPlay === "boolean") {
        setIsPlaying(shouldPlay);
      }
    },
    [scenes.length, stopSpeech]
  );

  // Previous & Next handlers
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      goToScene(currentIndex - 1, isPlaying);
    } else {
      setElapsed(0);
    }
  }, [currentIndex, isPlaying, goToScene]);

  const handleNext = useCallback(() => {
    if (currentIndex < scenes.length - 1) {
      goToScene(currentIndex + 1, isPlaying);
    } else {
      setIsPlaying(false);
    }
  }, [currentIndex, scenes.length, isPlaying, goToScene]);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
    lastTimeRef.current = null;
  }, []);

  const handleToggleNarration = useCallback(() => {
    setIsNarrating((prev) => {
      const next = !prev;
      if (!next) {
        stopSpeech();
      } else {
        speakScene(currentScene);
      }
      return next;
    });
  }, [currentScene, speakScene, stopSpeech]);

  // CTA Click handler: pauses playback and resets to scene 1 without re-triggering narration
  const handleCtaClick = useCallback(() => {
    stopSpeech();
    setIsPlaying(false);
    setIsNarrating(false); // disable narration on reset
    setCurrentIndex(0);
    setElapsed(0);
    lastTimeRef.current = null;

    if (currentScene.cta?.onClick) {
      currentScene.cta.onClick();
    }
    if (onCtaClick) {
      onCtaClick();
    }
  }, [currentScene, onCtaClick, stopSpeech]);

  // Animation frame loop for playback timing
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    const duration = currentScene.duration || 5000;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      setElapsed((prev) => {
        const next = prev + delta;
        if (next >= duration) {
          // Advance to next scene or complete
          if (currentIndex < scenes.length - 1) {
            setCurrentIndex((idx) => idx + 1);
            lastTimeRef.current = null;
            return 0;
          } else {
            // Reached end of last scene
            setIsPlaying(false);
            if (onComplete) onComplete();
            return duration;
          }
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, currentIndex, currentScene.duration, scenes.length, onComplete]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        handleToggleNarration();
      }
    },
    [handleTogglePlay, handlePrev, handleNext, handleToggleNarration]
  );

  // Current progress calculation
  const currentProgressPercent = useMemo(() => {
    const dur = currentScene.duration || 5000;
    return Math.min(100, Math.max(0, (elapsed / dur) * 100));
  }, [elapsed, currentScene.duration]);

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      data-theme={theme}
      style={
        {
          "--stage-bg": theme === "dark" ? "#161311" : "#FAF4ED",
          "--stage-surface": theme === "dark" ? "#221C18" : "#FFFFFF",
          "--stage-card": theme === "dark" ? "#2A231E" : "#FAF4ED",
          "--stage-text": theme === "dark" ? "#F5EFE6" : "#2B2521",
          "--stage-muted": theme === "dark" ? "#B5A797" : "#6B6058",
          "--stage-border": theme === "dark" ? "#3D332B" : "#E6DCC8",
          "--stage-accent": theme === "dark" ? "#E07A5F" : "#C1502E",
          "--stage-accent-hover": theme === "dark" ? "#F28E74" : "#A84224",
          "--stage-accent-light": theme === "dark" ? "#382921" : "#F1E2CF",
          "--stage-code-bg": theme === "dark" ? "#2D241E" : "#F4EBE0",
          "--stage-bar-bg": theme === "dark" ? "#332B25" : "#E8DEC9",
        } as React.CSSProperties
      }
      className={`group/stage relative w-full flex flex-col rounded-2xl border border-[var(--stage-border)] bg-[var(--stage-surface)] text-[var(--stage-text)] shadow-warm-md overflow-hidden transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--stage-accent)] ${className}`}
      aria-label={`${title} interactive video stage`}
    >
      {/* Top Meta Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-[var(--stage-card)] border-b border-[var(--stage-border)] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--stage-accent)] animate-pulse" />
          <span className="font-semibold text-[var(--stage-text)] tracking-tight">
            {title}
          </span>
          <span className="text-[var(--stage-muted)]">·</span>
          <span className="font-mono text-[var(--stage-muted)]">
            Scene {currentIndex + 1} of {scenes.length}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Narration Status Indicator */}
          {speechSupported && (
            <button
              type="button"
              onClick={handleToggleNarration}
              aria-label={isNarrating ? "Disable narration" : "Enable voice narration"}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all cursor-pointer border ${
                isNarrating
                  ? "bg-[var(--stage-accent)] text-white border-[var(--stage-accent)] shadow-xs"
                  : "bg-[var(--stage-card)] text-[var(--stage-muted)] hover:text-[var(--stage-text)] border-[var(--stage-border)]"
              }`}
              title="Toggle voice narration (uses Web Speech API)"
            >
              {isNarrating ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Narration ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Voice Off</span>
                </>
              )}
            </button>
          )}

          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="p-1.5 rounded-lg border border-[var(--stage-border)] text-[var(--stage-muted)] hover:text-[var(--stage-text)] hover:bg-[var(--stage-bg)] transition-colors cursor-pointer"
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? (
              <Moon className="w-3.5 h-3.5" />
            ) : (
              <Sun className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* 16:10 Video Stage Area */}
      <div className="relative w-full aspect-[16/10] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] bg-[var(--stage-bg)] flex flex-col justify-between p-5 sm:p-8 overflow-hidden select-none">
        {/* Subtle Background Pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,var(--stage-accent)_0%,transparent_60%)]"
        />

        {/* Top Eyebrow & Live Status */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--stage-card)] border border-[var(--stage-border)] shadow-xs text-xs font-mono font-medium text-[var(--stage-accent)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentScene.eyebrow || kicker}</span>
          </div>

          <div className="text-[11px] font-mono text-[var(--stage-muted)]">
            {Math.round((currentScene.duration || 5000) / 1000)}s pacing
          </div>
        </div>

        {/* Center Content: Headline & Visual / CTA */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full py-2">
          {/* Headline */}
          <h2
            key={`headline-${currentIndex}`}
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-serif font-bold text-[var(--stage-text)] tracking-tight leading-[1.2] mb-5 sm:mb-6 transition-all duration-300 ${
              reducedMotion
                ? ""
                : "animate-in fade-in slide-in-from-bottom-2 duration-300"
            }`}
          >
            {currentScene.headline}
          </h2>

          {/* Visual Display Container */}
          {currentScene.visual && (
            <div
              key={`visual-${currentIndex}`}
              className={`w-full flex items-center justify-center transition-all duration-300 ${
                reducedMotion
                  ? ""
                  : "animate-in fade-in zoom-in-95 duration-400"
              }`}
            >
              {currentScene.visual}
            </div>
          )}

          {/* CTA Display for Scene 7 */}
          {currentScene.cta && (
            <div
              key={`cta-${currentIndex}`}
              className={`flex flex-col items-center justify-center gap-3 mt-4 transition-all duration-300 ${
                reducedMotion
                  ? ""
                  : "animate-in fade-in zoom-in-95 duration-300"
              }`}
            >
              <button
                type="button"
                onClick={handleCtaClick}
                className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[var(--stage-accent)] hover:bg-[var(--stage-accent-hover)] text-white text-sm sm:text-base font-semibold transition-all duration-200 shadow-warm hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{currentScene.cta.text}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {currentScene.cta.note && (
                <p className="text-xs text-[var(--stage-muted)] max-w-md font-sans">
                  {currentScene.cta.note}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Caption Bar Overlay */}
        <div
          key={`caption-${currentIndex}`}
          aria-live="polite"
          className={`relative z-10 w-full max-w-3xl mx-auto p-3.5 sm:p-4 rounded-xl bg-[var(--stage-surface)]/90 backdrop-blur-sm border border-[var(--stage-border)] shadow-xs text-xs sm:text-sm text-[var(--stage-muted)] leading-relaxed text-center font-sans transition-all duration-300 ${
            reducedMotion ? "" : "animate-in fade-in duration-300"
          }`}
        >
          {formatCaption(currentScene.caption)}
        </div>
      </div>

      {/* Segmented Progress Bar Beneath Stage */}
      <div className="w-full px-4 sm:px-6 pt-4 pb-2 bg-[var(--stage-card)] border-t border-[var(--stage-border)]">
        <div
          role="tablist"
          aria-label="Scene progress segments"
          className="grid gap-1.5 sm:gap-2"
          style={{ gridTemplateColumns: `repeat(${scenes.length}, minmax(0, 1fr))` }}
        >
          {scenes.map((scene, idx) => {
            const isPast = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isFuture = idx > currentIndex;

            let fillWidth = "0%";
            if (isPast) fillWidth = "100%";
            else if (isCurrent) fillWidth = `${currentProgressPercent}%`;

            return (
              <button
                key={scene.id || idx}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Jump to scene ${idx + 1}: ${scene.headline}`}
                onClick={() => goToScene(idx, isPlaying)}
                title={`Scene ${idx + 1}: ${scene.headline}`}
                className="group/seg relative h-2 sm:h-2.5 rounded-full bg-[var(--stage-bar-bg)] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--stage-accent)] transition-all hover:h-3"
              >
                <div
                  className="h-full bg-[var(--stage-accent)] rounded-full transition-[width] duration-75 ease-linear group-hover/seg:bg-[var(--stage-accent-hover)]"
                  style={{ width: fillWidth }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Transport Controls Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-[var(--stage-card)] border-t border-[var(--stage-border)]/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Previous & Play/Pause & Next */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous scene"
            className="p-2 rounded-lg border border-[var(--stage-border)] bg-[var(--stage-surface)] text-[var(--stage-text)] hover:bg-[var(--stage-bg)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Previous scene (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Big Play / Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Pause lesson preview" : "Play lesson preview"}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--stage-accent)] hover:bg-[var(--stage-accent-hover)] text-white font-medium shadow-xs transition-all active:scale-95 cursor-pointer"
            title={isPlaying ? "Pause (Spacebar)" : "Play (Spacebar)"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>Play</span>
              </>
            )}
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === scenes.length - 1}
            aria-label="Next scene"
            className="p-2 rounded-lg border border-[var(--stage-border)] bg-[var(--stage-surface)] text-[var(--stage-text)] hover:bg-[var(--stage-bg)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Next scene (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Reset / Restart Button */}
          {(currentIndex > 0 || elapsed > 0) && (
            <button
              type="button"
              onClick={() => goToScene(0, false)}
              aria-label="Restart from scene 1"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-[var(--stage-muted)] hover:text-[var(--stage-text)] hover:bg-[var(--stage-bg)] transition-colors cursor-pointer"
              title="Restart from scene 1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[var(--stage-accent)]" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>

        {/* Center / Right: Scene Label & Keyboard Shortcuts */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-[var(--stage-accent-light)] text-[var(--stage-accent)] font-mono text-xs font-semibold border border-[var(--stage-border)]">
            Scene {currentIndex + 1} of {scenes.length}
          </span>

          <span className="hidden md:inline text-[11px] font-mono text-[var(--stage-muted)]">
            Space: Play/Pause · Arrows: Step · M: Voice
          </span>
        </div>
      </div>
    </div>
  );
}
