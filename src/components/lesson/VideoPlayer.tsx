"use client";

import React, { useRef, useState } from "react";
import {
  Play,
  RotateCcw,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  moduleName?: string;
  episodeNumber?: string;
}

// Video URL: set NEXT_PUBLIC_VIDEO_BASE_URL in your .env.local or hosting env vars
// e.g. NEXT_PUBLIC_VIDEO_BASE_URL=https://pub-xxxxxxxx.r2.dev
const VIDEO_BASE_URL = process.env.NEXT_PUBLIC_VIDEO_BASE_URL ?? "";

export function VideoPlayer({
  src = VIDEO_BASE_URL
    ? `${VIDEO_BASE_URL}/module-1/episode-1-what-is-python.mp4`
    : "/videos/module-1/episode-1-what-is-python.mp4",
  poster = "/videos/module-1/poster.svg",
  title = "What Is Python?",
  moduleName = "Module 1: Basic Python Programming",
  episodeNumber = "Episode 01",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E6DCC8] shadow-warm-md overflow-hidden flex flex-col transition-all duration-200">
      {/* Top Meta Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-[#FAF4ED]/80 border-b border-[#E6DCC8] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C1502E] animate-pulse" />
          <span className="font-semibold text-[#2B2521]">{title}</span>
          <span className="text-[#A89F91]">·</span>
          <span className="font-mono text-[#6B6058]">{episodeNumber}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F1E2CF] text-[#8C3A20] font-mono text-[11px] font-medium border border-[#E6DCC8]">
            <Clock className="w-3 h-3 text-[#C1502E]" />
            Full Walkthrough
          </span>
          {hasStarted && (
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1 text-[11px] text-[#6B6058] hover:text-[#2B2521] transition-colors cursor-pointer"
              title="Restart from beginning"
            >
              <RotateCcw className="w-3 h-3 text-[#C1502E]" />
              <span>Restart</span>
            </button>
          )}
        </div>
      </div>

      {/* 16:9 Video Frame */}
      <div className="relative w-full aspect-video bg-[#1F1B18] overflow-hidden group">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          aria-label={`${moduleName} - ${title} video player`}
          className="w-full h-full object-contain bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1502E]"
          onPlay={() => {
            setIsPlaying(true);
            setHasStarted(true);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          {/* Captions Track */}
          <track
            kind="captions"
            src="/captions/episode-1.vtt"
            srcLang="en"
            label="English"
            default={false}
          />
          Your browser does not support HTML5 video playback.
        </video>

        {/* Big initial Play overlay if not started */}
        {!hasStarted && (
          <div
            onClick={handlePlayPause}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[2px] transition-opacity duration-300 hover:bg-black/25 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Click to start video"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePlayPause();
              }
            }}
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C1502E] hover:bg-[#A84224] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 rounded-full bg-[#C1502E] animate-ping opacity-25" />
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
            </div>
            <span className="mt-3 text-xs sm:text-sm font-sans font-medium text-[#FBF6EF] drop-shadow-md">
              Click to play episode
            </span>
          </div>
        )}
      </div>

      {/* Bottom Summary Bar */}
      <div className="p-4 sm:p-5 bg-[#FAF4ED]/50 border-t border-[#E6DCC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B6058]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C1502E] shrink-0" />
          <span>
            <strong>Lesson Format:</strong> High-definition studio walkthrough with live conceptual diagrams.
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#8C7E72]">
          <span>Includes Captions &amp; Full Keyboard Controls</span>
        </div>
      </div>
    </div>
  );
}
