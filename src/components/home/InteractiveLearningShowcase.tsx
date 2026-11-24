"use client";

import React, { useState } from "react";
import {
  Play,
  Bug,
  Filter,
  CheckCircle2,
  XCircle,
  Cpu,
  Layers,
} from "lucide-react";

type ShowcaseTab = "variables" | "dataflow" | "debugger";

export function InteractiveLearningShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("variables");

  // State for Demo 1: Variable & Memory Inspector
  const [userScore, setUserScore] = useState<number>(10);
  const [bonusAmount, setBonusAmount] = useState<number>(5);

  // Derived state for Demo 1
  const totalScore = userScore + bonusAmount;
  const isWinner = totalScore >= 20;

  // State for Demo 2: Data Flow Transformation
  const rawData = [12, -5, 8, 20, -3, 15];
  const [filterPositives, setFilterPositives] = useState<boolean>(true);
  const [multiplier, setMultiplier] = useState<number>(2);

  const filteredData = filterPositives ? rawData.filter((x) => x > 0) : rawData;
  const mappedData = filteredData.map((x) => x * multiplier);
  const reducedSum = mappedData.reduce((acc, curr) => acc + curr, 0);

  // State for Demo 3: Interactive Visual Debugger
  const [isBugFixed, setIsBugFixed] = useState<boolean>(false);
  const [debugOutput, setDebugOutput] = useState<string | null>(null);

  const handleRunDebugger = () => {
    if (isBugFixed) {
      setDebugOutput("SUCCESS: Printed ['alpha', 'beta', 'gamma'] without IndexErrors! Loop terminated cleanly at index 2.");
    } else {
      setDebugOutput("CRASH: IndexError: list index out of range on items[3]. The loop attempted to access index 3, but maximum valid index is 2.");
    }
  };

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-[#FAF9F5] border-t border-[#E7E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7E6DF] text-xs font-mono font-medium text-[#17191F]">
            <Cpu className="w-3.5 h-3.5 text-[#25B8A5]" />
            <span>Interactive Learning Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#17191F] tracking-tight leading-tight">
            See How Zyrix Makes Code Click.
          </h2>

          <p className="text-base sm:text-lg text-[#777B85] font-sans leading-relaxed text-balance">
            Interact directly with our living execution mechanics. Tweak inputs, trigger bugs,
            and inspect how memory, tensors, and pipelines transform before your eyes.
          </p>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              type="button"
              onClick={() => setActiveTab("variables")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "variables"
                  ? "bg-[#17191F] text-white shadow-xs"
                  : "bg-white text-[#777B85] hover:text-[#17191F] border border-[#E7E6DF]"
              }`}
            >
              <Layers className="w-4 h-4 text-[#FFAA45]" />
              <span>01. Variable State Machine</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("dataflow")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "dataflow"
                  ? "bg-[#17191F] text-white shadow-xs"
                  : "bg-white text-[#777B85] hover:text-[#17191F] border border-[#E7E6DF]"
              }`}
            >
              <Filter className="w-4 h-4 text-[#25B8A5]" />
              <span>02. Data Flow Pipeline</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("debugger")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "debugger"
                  ? "bg-[#17191F] text-white shadow-xs"
                  : "bg-white text-[#777B85] hover:text-[#17191F] border border-[#E7E6DF]"
              }`}
            >
              <Bug className="w-4 h-4 text-[#FFAA45]" />
              <span>03. Interactive Debugger</span>
            </button>
          </div>
        </div>

        {/* The Live Interactive Showcase Box */}
        <div className="bg-white rounded-3xl border border-[#E7E6DF] p-6 sm:p-8 lg:p-10 shadow-[0_8px_32px_-8px_rgba(23,25,31,0.06)]">
          {/* TAB 1: VARIABLE STATE MACHINE */}
          {activeTab === "variables" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Code & Control Side (5 cols) */}
              <div className="lg:col-span-5 bg-[#17191F] rounded-2xl p-6 text-white font-mono text-xs sm:text-sm space-y-5 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-[#2C303B] text-xs text-[#8E95A5]">
                  <span>variable_mutations.py</span>
                  <span className="text-[#FFAA45]">Live WebAssembly</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-[#252A36]">
                    <span className="text-[#FFAA45]">score</span> = {userScore}
                  </div>
                  <div className="p-2 rounded-lg bg-[#252A36]">
                    <span className="text-[#FFAA45]">bonus</span> = {bonusAmount}
                  </div>
                  <div className="p-2 rounded-lg bg-[#252A36]">
                    <span className="text-[#25B8A5]">total</span> = score + bonus{" "}
                    <span className="text-[#8E95A5]"># → {totalScore}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#252A36]">
                    <span className="text-[#25B8A5]">is_winner</span> = total &gt;= 20{" "}
                    <span className={isWinner ? "text-[#00CA4E] font-bold" : "text-[#FF6B81] font-bold"}>
                      # → {isWinner ? "True" : "False"}
                    </span>
                  </div>
                </div>

                {/* Interactive Tweak Controls */}
                <div className="pt-4 border-t border-[#2C303B] space-y-3 font-sans">
                  <span className="text-xs font-mono text-[#8E95A5] uppercase tracking-wider block">
                    Interactive Controls:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setUserScore((s) => s + 5)}
                      className="px-3 py-1.5 rounded-lg bg-[#FFAA45] hover:bg-[#E68522] text-[#17191F] font-bold font-mono text-xs transition-colors cursor-pointer"
                    >
                      +5 to Score
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserScore((s) => Math.max(s - 5, 0))}
                      className="px-3 py-1.5 rounded-lg bg-[#2C303B] hover:bg-[#383D4B] text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      -5 to Score
                    </button>
                    <button
                      type="button"
                      onClick={() => setBonusAmount((b) => (b === 5 ? 15 : 5))}
                      className="px-3 py-1.5 rounded-lg bg-[#25B8A5] hover:bg-[#1E9E8D] text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      Toggle Bonus ({bonusAmount === 5 ? "15" : "5"})
                    </button>
                  </div>
                </div>
              </div>

              {/* Memory Visualizer Side (7 cols) */}
              <div className="lg:col-span-7 bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-[#E7E6DF] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E6DF]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#17191F]">
                    Stack Reference &amp; Heap Storage Map
                  </span>
                  <span className="text-xs font-mono text-[#0E7568] bg-[#25B8A5]/15 px-2.5 py-0.5 rounded-md font-bold">
                    State Synchronized
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Memory Cell: score */}
                  <div className="p-4 rounded-xl bg-white border border-[#E7E6DF] shadow-2xs space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono text-[#777B85]">
                      <span>VAR: score</span>
                      <span className="text-[10px]">addr: 0x7FA1</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-[#17191F]">{userScore}</div>
                    <span className="text-[10px] font-mono text-[#25B8A5]">Type: int (4 bytes)</span>
                  </div>

                  {/* Memory Cell: bonus */}
                  <div className="p-4 rounded-xl bg-white border border-[#E7E6DF] shadow-2xs space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono text-[#777B85]">
                      <span>VAR: bonus</span>
                      <span className="text-[10px]">addr: 0x7FA5</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-[#FFAA45]">{bonusAmount}</div>
                    <span className="text-[10px] font-mono text-[#FFAA45]">Type: int (4 bytes)</span>
                  </div>

                  {/* Memory Cell: total */}
                  <div className="p-4 rounded-xl bg-white border border-[#E7E6DF] shadow-2xs space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono text-[#777B85]">
                      <span>VAR: total</span>
                      <span className="text-[10px]">addr: 0x7FAC</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-[#25B8A5]">{totalScore}</div>
                    <span className="text-[10px] font-mono text-[#0E7568]">Evaluation: {userScore} + {bonusAmount}</span>
                  </div>

                  {/* Memory Cell: is_winner */}
                  <div
                    className={`p-4 rounded-xl border shadow-2xs space-y-1 transition-all ${
                      isWinner
                        ? "bg-[#25B8A5]/10 border-[#25B8A5]"
                        : "bg-white border-[#E7E6DF]"
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-mono text-[#777B85]">
                      <span>VAR: is_winner</span>
                      <span className="text-[10px]">addr: 0x7FB2</span>
                    </div>
                    <div
                      className={`text-2xl font-mono font-bold ${
                        isWinner ? "text-[#0E7568]" : "text-[#777B85]"
                      }`}
                    >
                      {isWinner ? "True" : "False"}
                    </div>
                    <span className="text-[10px] font-mono text-[#777B85]">
                      Condition: {totalScore} &gt;= 20
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs font-mono text-[#777B85]">
                  <span>Memory updates in real time with 0 re-compilation delay</span>
                  <span className="text-[#17191F] font-semibold">Ready for Episode 2</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATA FLOW TRANSFORMATION PIPELINE */}
          {activeTab === "dataflow" && (
            <div className="space-y-8">
              {/* Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E6DF]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#17191F]">
                    Pipeline Controls:
                  </span>
                  <button
                    type="button"
                    onClick={() => setFilterPositives(!filterPositives)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      filterPositives
                        ? "bg-[#25B8A5] text-white shadow-2xs"
                        : "bg-white text-[#777B85] border border-[#E7E6DF]"
                    }`}
                  >
                    Filter &gt; 0: {filterPositives ? "ON" : "OFF"}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#777B85]">Multiply by:</span>
                  {[1, 2, 5, 10].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMultiplier(m)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-colors cursor-pointer ${
                        multiplier === m
                          ? "bg-[#FFAA45] text-[#17191F] shadow-2xs"
                          : "bg-white text-[#777B85] border border-[#E7E6DF]"
                      }`}
                    >
                      {m}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Pipeline Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Stage 1: Input */}
                <div className="p-5 rounded-2xl bg-white border border-[#E7E6DF] shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#777B85]">
                    <span>STAGE 1: RAW INGEST</span>
                    <span>{rawData.length} items</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rawData.map((num, i) => (
                      <span
                        key={i}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          num < 0 && filterPositives
                            ? "bg-[#FAF9F5] text-[#A0A6B5] line-through border border-dashed border-[#E7E6DF]"
                            : "bg-[#17191F] text-white"
                        }`}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-sans text-[#777B85] block">
                    {filterPositives ? "Negative values discarded" : "All values passed through"}
                  </span>
                </div>

                {/* Stage 2: Map */}
                <div className="p-5 rounded-2xl bg-white border border-[#E7E6DF] shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#777B85]">
                    <span>STAGE 2: MAP (×{multiplier})</span>
                    <span className="text-[#FFAA45] font-bold">{mappedData.length} active</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mappedData.map((num, i) => (
                      <span
                        key={i}
                        className="w-10 h-9 rounded-lg bg-[#FFAA45]/20 border border-[#FFAA45] text-[#B45E00] flex items-center justify-center font-mono text-xs font-bold"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-sans text-[#777B85] block">
                    Vectorized scale across SIMD registers
                  </span>
                </div>

                {/* Stage 3: Reduce */}
                <div className="p-5 rounded-2xl bg-white border-2 border-[#25B8A5] shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#777B85]">
                    <span>STAGE 3: REDUCE (SUM)</span>
                    <span className="text-[#0E7568] font-bold">Accumulated</span>
                  </div>
                  <div className="text-3xl font-mono font-bold text-[#0E7568]">
                    Σ = {reducedSum}
                  </div>
                  <span className="text-[11px] font-sans text-[#777B85] block">
                    Instant reduction without memory allocation
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INTERACTIVE DEBUGGER */}
          {activeTab === "debugger" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Bug Code Column (6 cols) */}
              <div className="lg:col-span-6 bg-[#17191F] rounded-2xl p-6 text-white font-mono text-xs sm:text-sm space-y-4 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-[#2C303B] text-xs text-[#8E95A5]">
                  <span>off_by_one_trap.py</span>
                  <span className={isBugFixed ? "text-[#00CA4E]" : "text-[#FF605C]"}>
                    {isBugFixed ? "Fixed Code" : "Contains 1 Bug"}
                  </span>
                </div>

                <div className="space-y-2 text-[#A0A6B5]">
                  <p>items = [&quot;alpha&quot;, &quot;beta&quot;, &quot;gamma&quot;] <span className="text-[#555C6E]"># len = 3</span></p>
                  <p className="text-[#8E95A5]"># Iterate through all list items:</p>
                  <div
                    className={`p-2 rounded-lg transition-all ${
                      isBugFixed
                        ? "bg-[#25B8A5]/20 border-l-4 border-[#25B8A5] text-white"
                        : "bg-[#E04D62]/20 border-l-4 border-[#E04D62] text-white"
                    }`}
                  >
                    {isBugFixed ? (
                      <p className="text-[#35E0C2] font-bold">for i in range(len(items)):</p>
                    ) : (
                      <p className="text-[#FF6B81] font-bold">for i in range(len(items) + 1):  # BUG: + 1</p>
                    )}
                  </div>
                  <p className="pl-4">print(items[i])</p>
                </div>

                {/* Bug Actions */}
                <div className="pt-4 border-t border-[#2C303B] flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRunDebugger}
                    className="px-4 py-2 rounded-lg bg-[#FFAA45] hover:bg-[#E68522] text-[#17191F] font-bold font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run In Pyodide</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsBugFixed(!isBugFixed);
                      setDebugOutput(null);
                    }}
                    className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-colors cursor-pointer ${
                      isBugFixed
                        ? "bg-[#2C303B] text-white hover:bg-[#383D4B]"
                        : "bg-[#25B8A5] text-white hover:bg-[#1E9E8D]"
                    }`}
                  >
                    {isBugFixed ? "Re-introduce Bug (+ 1)" : "Apply One-Line Fix"}
                  </button>
                </div>
              </div>

              {/* Debugger Output Column (6 cols) */}
              <div className="lg:col-span-6 bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-[#E7E6DF] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E6DF]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#17191F]">
                    Visual Execution Feedback
                  </span>
                  <span className="text-xs font-mono text-[#777B85]">PDB Trace Simulator</span>
                </div>

                {debugOutput ? (
                  <div
                    className={`p-4 rounded-xl border text-xs font-mono leading-relaxed space-y-2 animate-in fade-in duration-200 ${
                      isBugFixed
                        ? "bg-[#25B8A5]/10 border-[#25B8A5] text-[#0E7568]"
                        : "bg-[#E04D62]/10 border-[#E04D62] text-[#E04D62]"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {isBugFixed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#25B8A5]" />
                      ) : (
                        <XCircle className="w-5 h-5 text-[#E04D62]" />
                      )}
                      <span>{isBugFixed ? "Verification Passed" : "Runtime Exception"}</span>
                    </div>
                    <p>{debugOutput}</p>
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs font-mono text-[#777B85] bg-white rounded-xl border border-dashed border-[#E7E6DF]">
                    Click &apos;Run In Pyodide&apos; to execute the script in our sandboxed browser environment.
                  </div>
                )}

                <div className="pt-2 text-xs text-[#777B85] font-sans leading-relaxed">
                  💡 In Zyrix Debug Challenges, students fix intentionally placed algorithmic bugs, teaching defensive coding and stack-trace intuition from day one.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
