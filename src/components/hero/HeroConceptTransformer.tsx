"use client";

import React, { useState, useEffect } from "react";
import { Play, Sparkles, Layers, Cpu, ArrowRight } from "lucide-react";

type ConceptMode = "memory" | "vector" | "neural";

interface MemoryBlock {
  id: string;
  varName: string;
  address: string;
  type: string;
  value: string;
  color: "orange" | "teal" | "charcoal";
}

export function HeroConceptTransformer() {
  const [mode, setMode] = useState<ConceptMode>("memory");
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);

  // Auto-advance step when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, mode]);

  // Reset step on mode change
  const handleModeChange = (newMode: ConceptMode) => {
    setMode(newMode);
    setStep(0);
  };

  // Memory states for Concept 1
  const memorySteps: {
    codeLine: number;
    code: string[];
    explanation: string;
    blocks: MemoryBlock[];
  }[] = [
    {
      codeLine: 0,
      code: [
        'users = ["Asha", "Dev"]',
        "capacity = 4",
        "is_open = True",
        "users.append('Zayn')",
      ],
      explanation: "Python allocates memory on the Heap for the list, while the pointer variable lives on the Stack.",
      blocks: [
        { id: "b1", varName: "users", address: "0x7F01", type: "list[str]", value: '["Asha", "Dev"]', color: "orange" },
        { id: "b2", varName: "capacity", address: "0x7F08", type: "int", value: "4", color: "charcoal" },
      ],
    },
    {
      codeLine: 1,
      code: [
        'users = ["Asha", "Dev"]',
        "capacity = 4",
        "is_open = True",
        "users.append('Zayn')",
      ],
      explanation: "Primitive integer 'capacity = 4' is stored with instant direct reference evaluation.",
      blocks: [
        { id: "b1", varName: "users", address: "0x7F01", type: "list[str]", value: '["Asha", "Dev"]', color: "orange" },
        { id: "b2", varName: "capacity", address: "0x7F08", type: "int", value: "4", color: "charcoal" },
      ],
    },
    {
      codeLine: 2,
      code: [
        'users = ["Asha", "Dev"]',
        "capacity = 4",
        "is_open = True",
        "users.append('Zayn')",
      ],
      explanation: "Boolean flag 'is_open' registers at new memory block 0x7F10 without copying data.",
      blocks: [
        { id: "b1", varName: "users", address: "0x7F01", type: "list[str]", value: '["Asha", "Dev"]', color: "orange" },
        { id: "b2", varName: "capacity", address: "0x7F08", type: "int", value: "4", color: "charcoal" },
        { id: "b3", varName: "is_open", address: "0x7F10", type: "bool", value: "True", color: "teal" },
      ],
    },
    {
      codeLine: 3,
      code: [
        'users = ["Asha", "Dev"]',
        "capacity = 4",
        "is_open = True",
        "users.append('Zayn')",
      ],
      explanation: "List mutates in place at heap address 0x7F01: length increases to 3 with dynamic reallocation.",
      blocks: [
        { id: "b1", varName: "users", address: "0x7F01", type: "list[str]", value: '["Asha", "Dev", "Zayn"]', color: "orange" },
        { id: "b2", varName: "capacity", address: "0x7F08", type: "int", value: "4", color: "charcoal" },
        { id: "b3", varName: "is_open", address: "0x7F10", type: "bool", value: "True", color: "teal" },
      ],
    },
  ];

  // Vector calculation states for Concept 2
  const vectorSteps = [
    {
      code: "raw_features = [1.2, 3.4, 5.0]",
      weights: "[2.0, 0.5, 1.0]",
      stepTitle: "1. Raw Vector Alignment",
      values: [1.2, 3.4, 5.0],
      weightsArr: [2.0, 0.5, 1.0],
      products: [2.4, 1.7, 5.0],
      sum: 9.1,
    },
    {
      code: "weighted = raw_features * weights",
      weights: "[2.0, 0.5, 1.0]",
      stepTitle: "2. Vectorized Pointwise Multiplication",
      values: [1.2, 3.4, 5.0],
      weightsArr: [2.0, 0.5, 1.0],
      products: [2.4, 1.7, 5.0],
      sum: 9.1,
    },
    {
      code: "score = sum(weighted) -> 9.1",
      weights: "[2.0, 0.5, 1.0]",
      stepTitle: "3. Dot Product Reduction",
      values: [1.2, 3.4, 5.0],
      weightsArr: [2.0, 0.5, 1.0],
      products: [2.4, 1.7, 5.0],
      sum: 9.1,
    },
    {
      code: "normalized = max(0, score)",
      weights: "[2.0, 0.5, 1.0]",
      stepTitle: "4. Activation Threshold",
      values: [1.2, 3.4, 5.0],
      weightsArr: [2.0, 0.5, 1.0],
      products: [2.4, 1.7, 5.0],
      sum: 9.1,
    },
  ];

  // Neural states for Concept 3
  const neuralWeights = [0.85, -0.42, 1.15];
  const neuralInputs = [1.0, 0.5, 0.8];

  const currentMem = memorySteps[step % memorySteps.length];
  const currentVec = vectorSteps[step % vectorSteps.length];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 bg-[var(--zy-surface)] rounded-2xl sm:rounded-3xl border border-[var(--zy-border)] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 sm:px-6 bg-[var(--zy-surface-2)] border-b border-[var(--zy-border)]">
        {/* Concept Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--zy-surface)] rounded-xl border border-[var(--zy-border)] shadow-2xs">
          <button
            type="button"
            onClick={() => handleModeChange("memory")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              mode === "memory"
                ? "bg-[#FFAA45] text-[#17191F] font-bold shadow-xs"
                : "text-[var(--zy-muted)] hover:text-[var(--zy-text)] hover:bg-[var(--zy-surface-2)]"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#17191F]" />
            <span>01. Memory Pointers</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("vector")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              mode === "vector"
                ? "bg-[#25B8A5] text-white font-bold shadow-xs"
                : "text-[var(--zy-muted)] hover:text-[var(--zy-text)] hover:bg-[var(--zy-surface-2)]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>02. Vector Math</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("neural")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              mode === "neural"
                ? "bg-[#FFAA45] text-[#17191F] font-bold shadow-xs"
                : "text-[var(--zy-muted)] hover:text-[var(--zy-text)] hover:bg-[var(--zy-surface-2)]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#17191F]" />
            <span>03. Neural Flow</span>
          </button>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-[#0E7568] bg-[#25B8A5]/15 border border-[#25B8A5]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25B8A5] animate-pulse" />
            Interactive Visualization
          </span>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause auto-run" : "Play auto-run"}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--zy-surface)] hover:bg-[var(--zy-surface-2)] border border-[var(--zy-border)] text-[var(--zy-text)] transition-colors cursor-pointer"
          >
            {isPlaying ? <span className="text-xs">⏸ Pause</span> : <Play className="w-3 h-3 text-[#FFAA45] fill-current" />}
          </button>

          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) % 4)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#FFAA45] hover:bg-[#E68522] text-[#17191F] font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Step</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6 sm:p-8 lg:p-10">
        {/* Mode 1: Memory & State Pointers */}
        {mode === "memory" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Code Side (4 cols) */}
            <div className="lg:col-span-5 bg-[#12151D] rounded-2xl p-5 sm:p-6 text-white shadow-inner font-mono text-xs sm:text-sm border border-[var(--zy-border)]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2C303B] text-xs text-[#8E95A5]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF605C]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD44]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00CA4E]" />
                  <span className="ml-2 font-mono text-[11px] text-[#A0A6B5]">memory_model.py</span>
                </span>
                <span className="text-[#FFAA45] text-[11px]">Step {step + 1} of 4</span>
              </div>

              <div className="space-y-2">
                {currentMem.code.map((line, idx) => {
                  const isActive = idx === currentMem.codeLine;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-[#1E2330] text-white border-l-3 border-[#FFAA45] shadow-xs"
                          : "text-[#8E95A5]"
                      }`}
                    >
                      <span className="text-[#555C6E] text-xs select-none w-4">{idx + 1}</span>
                      <span className={isActive ? "text-[#FFAA45] font-semibold" : ""}>{line}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-[#2C303B] text-xs text-[#A0A6B5] flex items-start gap-2">
                <span className="text-[#25B8A5] font-bold">Intuition:</span>
                <p className="leading-relaxed">{currentMem.explanation}</p>
              </div>
            </div>

            {/* Visualizer Side (7 cols): Physical Memory Layout */}
            <div className="lg:col-span-7 bg-[var(--zy-surface-2)] rounded-2xl p-6 border border-[var(--zy-border)] relative">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--zy-border)]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--zy-muted)]">
                    Hardware RAM Visualization
                  </span>
                </div>
                <span className="text-xs font-mono text-[#0E7568] bg-[#25B8A5]/15 px-2 py-0.5 rounded-md font-bold">
                  Active Reference Map
                </span>
              </div>

              {/* Memory Cells Grid */}
              <div className="space-y-3">
                {currentMem.blocks.map((block) => (
                  <div
                    key={block.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 sm:p-4 rounded-xl bg-[var(--zy-surface)] border border-[var(--zy-border)] shadow-xs transition-all duration-300 hover:border-[#FFAA45]"
                  >
                    {/* Stack Pointer */}
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      <div className="w-7 h-7 rounded-lg bg-[#FFAA45] text-[#17191F] flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                        {block.varName[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[var(--zy-text)] font-mono flex items-center gap-1.5">
                          {block.varName}
                          <span className="text-[10px] text-[var(--zy-muted)] font-sans font-normal">({block.type})</span>
                        </div>
                        <span className="text-[11px] font-mono text-[var(--zy-muted)]">stack ref → {block.address}</span>
                      </div>
                    </div>

                    {/* Arrow / Connection */}
                    <div className="hidden sm:flex items-center gap-1 text-[#FFAA45] px-2">
                      <div className="w-8 h-[2px] bg-[#FFAA45]/40 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t-2 border-r-2 border-[#FFAA45] rotate-45" />
                      </div>
                    </div>

                    {/* Heap Memory Cell */}
                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 bg-[var(--zy-surface-2)] px-3.5 py-2 rounded-lg border border-[var(--zy-border)]">
                      <div className="text-left">
                        <span className="text-[10px] font-mono uppercase text-[var(--zy-muted)] block">Heap Value</span>
                        <span className="text-xs font-mono font-bold text-[var(--zy-text)]">{block.value}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--zy-surface)] border border-[var(--zy-border)] text-[var(--zy-muted)]">
                        {block.address}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Interactive Callout */}
              <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--zy-muted)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFAA45]" />
                  <span>Garbage Collection: Active (0 dangling refs)</span>
                </div>
                <span className="text-[var(--zy-text)] font-medium">Click &apos;Step&apos; to mutate state →</span>
              </div>
            </div>
          </div>
        )}

        {/* Mode 2: Vector Math & Broadcasting */}
        {mode === "vector" && (
          <div className="space-y-6">
            <div className="bg-[var(--zy-surface-2)] rounded-2xl p-6 sm:p-8 border border-[var(--zy-border)]">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--zy-border)]">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[var(--zy-text)] font-mono">
                    {currentVec.stepTitle}
                  </h4>
                  <p className="text-xs text-[var(--zy-muted)] mt-0.5 font-sans">
                    Watching SIMD parallel vector computing operate across continuous array memory.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#25B8A5]/15 text-[#0E7568] font-bold">
                  NumPy / PyTorch Engine
                </span>
              </div>

              {/* Vector Grid Visualization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Vector A */}
                <div className="bg-[var(--zy-surface)] p-4 rounded-xl border border-[var(--zy-border)] shadow-xs">
                  <span className="text-xs font-mono uppercase text-[var(--zy-muted)] block mb-2">Input Vector X</span>
                  <div className="flex items-center justify-center gap-2">
                    {currentVec.values.map((v, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-lg bg-[var(--zy-surface-2)] border-2 border-[var(--zy-border)] flex items-center justify-center font-mono font-bold text-sm text-[var(--zy-text)] shadow-2xs"
                      >
                        {v}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operator Symbol */}
                <div className="flex flex-col items-center justify-center text-[#FFAA45]">
                  <span className="text-2xl font-bold font-mono">×</span>
                  <span className="text-[11px] font-mono text-[var(--zy-muted)]">Broadcasting</span>
                </div>

                {/* Vector B (Weights) */}
                <div className="bg-[var(--zy-surface)] p-4 rounded-xl border border-[var(--zy-border)] shadow-xs">
                  <span className="text-xs font-mono uppercase text-[var(--zy-muted)] block mb-2">Weight Vector W</span>
                  <div className="flex items-center justify-center gap-2">
                    {currentVec.weightsArr.map((w, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-lg bg-[#FFAA45]/20 border-2 border-[#FFAA45] flex items-center justify-center font-mono font-bold text-sm text-[#E68522] shadow-2xs"
                      >
                        {w}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resulting Tensor Stream */}
              <div className="mt-6 p-4 rounded-xl bg-[var(--zy-surface)] border border-[var(--zy-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#25B8A5] text-white flex items-center justify-center font-bold text-xs">
                    Σ
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--zy-muted)] block">Pointwise Product Reduction</span>
                    <span className="text-sm font-mono font-bold text-[var(--zy-text)]">
                      [{currentVec.products.join(", ")}] → Total Score:{" "}
                      <span className="text-[#0E7568]">{currentVec.sum}</span>
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono bg-[var(--zy-surface-2)] px-3 py-1.5 rounded-lg border border-[var(--zy-border)] text-[var(--zy-muted)]">
                  0 Memory Copies (Strided View)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Mode 3: Neural Decision Flow */}
        {mode === "neural" && (
          <div className="bg-[var(--zy-surface-2)] rounded-2xl p-6 sm:p-8 border border-[var(--zy-border)]">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--zy-border)]">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[var(--zy-text)] font-mono">
                  Artificial Neuron Activation &amp; Gradient Step
                </h4>
                <p className="text-xs text-[var(--zy-muted)] mt-0.5 font-sans">
                  Interactive feed-forward propagation showing signal accumulation through non-linear activation.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#FFAA45]/20 text-[#E68522] font-bold">
                Forward Pass Active
              </span>
            </div>

            {/* Neural Diagram Layout */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
              {/* Inputs Column */}
              <div className="space-y-3 w-full md:w-1/3">
                <span className="text-xs font-mono uppercase text-[var(--zy-muted)] block mb-2">Input Synapses (x)</span>
                {neuralInputs.map((val, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--zy-surface)] border border-[var(--zy-border)] shadow-2xs"
                  >
                    <span className="font-mono text-xs font-bold text-[var(--zy-text)]">x_{i + 1} = {val}</span>
                    <span className="text-[11px] font-mono text-[#FFAA45] bg-[#FFAA45]/10 px-2 py-0.5 rounded">
                      w_{i + 1}: {neuralWeights[i]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Synaptic Summation Node */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--zy-surface)] border-2 border-[var(--zy-border)] shadow-sm relative w-40 text-center">
                <div className="w-12 h-12 rounded-full bg-[#17191F] text-white flex items-center justify-center font-mono font-bold text-lg mb-2">
                  Σ
                </div>
                <span className="text-xs font-mono font-bold text-[var(--zy-text)]">Linear Sum</span>
                <span className="text-xs font-mono text-[#25B8A5] mt-1 font-semibold">z = 1.56</span>
              </div>

              {/* Non-linear Activation Function */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--zy-surface)] border-2 border-[#25B8A5] shadow-sm relative w-40 text-center">
                <div className="w-12 h-12 rounded-full bg-[#25B8A5] text-white flex items-center justify-center font-mono font-bold text-sm mb-2">
                  ReLU
                </div>
                <span className="text-xs font-mono font-bold text-[var(--zy-text)]">Output (a)</span>
                <span className="text-sm font-mono text-[#0E7568] font-bold mt-1">max(0, z) → 1.56</span>
              </div>
            </div>

            {/* Explanatory footer */}
            <div className="mt-4 p-3 bg-[var(--zy-surface)] rounded-xl border border-[var(--zy-border)] flex items-center justify-between text-xs font-mono text-[var(--zy-muted)]">
              <span>Activation State: Firing (Gradient = 1.0)</span>
              <span className="text-[#FFAA45] font-semibold">Zero-math intuition built visually</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Strip */}
      <div className="px-6 py-3.5 bg-[var(--zy-surface-2)] border-t border-[var(--zy-border)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--zy-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25B8A5]" />
          <span>Interactive execution engine running in WebAssembly (Python 3.12)</span>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <span>60 FPS Vector Simulation</span>
          <span>•</span>
          <span className="text-[var(--zy-text)] font-semibold">Module 1 Preview</span>
        </div>
      </div>
    </div>
  );
}
