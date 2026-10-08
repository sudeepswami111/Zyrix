"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface PyodideRunResult {
  stdout: string;
  error: string | null;
  executionTimeMs?: number;
}

export interface UsePyodideRunnerReturn {
  isLoading: boolean;
  isReady: boolean;
  isRunning: boolean;
  initError: string | null;
  lastResult: PyodideRunResult | null;
  runPython: (code: string) => Promise<PyodideRunResult>;
  resetOutput: () => void;
}

// Global cached singleton instance of Pyodide
let pyodideGlobalPromise: Promise<any> | null = null;
let pyodideInstance: any = null;

function loadPyodideScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cannot load Pyodide in SSR environment"));
  }

  if ((window as any).loadPyodide) {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src*="pyodide.js"]'
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      if ((window as any).loadPyodide) {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () =>
          reject(new Error("Failed to load Pyodide script from CDN"))
        );
      }
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Pyodide runtime script. Please check your internet connection."));
    document.body.appendChild(script);
  });
}

function getPyodide(): Promise<any> {
  if (pyodideInstance) {
    return Promise.resolve(pyodideInstance);
  }

  if (!pyodideGlobalPromise) {
    pyodideGlobalPromise = (async () => {
      await loadPyodideScript();
      const loader = (window as any).loadPyodide;
      if (!loader) {
        throw new Error("Pyodide script loaded, but window.loadPyodide is not defined.");
      }
      const instance = await loader({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
      });
      pyodideInstance = instance;
      return instance;
    })();
  }

  return pyodideGlobalPromise;
}

export function usePyodideRunner(): UsePyodideRunnerReturn {
  const [isLoading, setIsLoading] = useState(!pyodideInstance);
  const [isReady, setIsReady] = useState(!!pyodideInstance);
  const [isRunning, setIsRunning] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<PyodideRunResult | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    if (pyodideInstance) {
      setIsLoading(false);
      setIsReady(true);
      return;
    }

    let isCancelled = false;

    getPyodide()
      .then(() => {
        if (!isCancelled && isMountedRef.current) {
          setIsLoading(false);
          setIsReady(true);
          setInitError(null);
        }
      })
      .catch((err: any) => {
        if (!isCancelled && isMountedRef.current) {
          setIsLoading(false);
          setIsReady(false);
          setInitError(err?.message || "Failed to initialize Pyodide");
        }
      });

    return () => {
      isCancelled = true;
      isMountedRef.current = false;
    };
  }, []);

  const runPython = useCallback(
    async (code: string): Promise<PyodideRunResult> => {
      setIsRunning(true);
      const startTime = performance.now();

      try {
        const pyodide = await getPyodide();
        const stdoutChunks: string[] = [];

        // Route stdout & stderr through batched collectors
        pyodide.setStdout({
          batched: (text: string) => {
            stdoutChunks.push(text);
          },
        });

        pyodide.setStderr({
          batched: (text: string) => {
            stdoutChunks.push(text);
          },
        });

        // Run Python code
        await pyodide.runPythonAsync(code);

        const duration = Math.round(performance.now() - startTime);
        const result: PyodideRunResult = {
          stdout: stdoutChunks.join("\n"),
          error: null,
          executionTimeMs: duration,
        };

        if (isMountedRef.current) {
          setLastResult(result);
          setIsRunning(false);
        }
        return result;
      } catch (err: any) {
        const duration = Math.round(performance.now() - startTime);
        const rawMessage = err?.message || String(err);
        // Clean Python traceback formatting for learner readability
        const cleanedMessage = rawMessage
          .replace(/^PythonError: Traceback \(most recent call last\):/g, "Traceback (most recent call last):")
          .trim();

        const result: PyodideRunResult = {
          stdout: "",
          error: cleanedMessage,
          executionTimeMs: duration,
        };

        if (isMountedRef.current) {
          setLastResult(result);
          setIsRunning(false);
        }
        return result;
      }
    },
    []
  );

  const resetOutput = useCallback(() => {
    setLastResult(null);
  }, []);

  return {
    isLoading,
    isReady,
    isRunning,
    initError,
    lastResult,
    runPython,
    resetOutput,
  };
}
