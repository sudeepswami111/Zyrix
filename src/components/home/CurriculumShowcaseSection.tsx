"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Binary,
  TableProperties,
  BarChart3,
  BrainCircuit,
  Rocket,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface CurriculumTrack {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  accentColor: string;
  visualType: "code" | "matrix" | "table" | "chart" | "neural" | "pipeline";
  highlight: string;
}

export function CurriculumShowcaseSection() {
  const [selectedPillar, setSelectedPillar] = useState<string>("python");

  const pillars: CurriculumTrack[] = [
    {
      id: "python",
      number: "01",
      title: "Python Programming",
      subtitle: "Memory references, control flow, object-oriented design & defensive architecture.",
      icon: Code2,
      tags: ["Variables & Scope", "Pointers & Mutability", "Classes & Dunder Methods", "Custom Exceptions"],
      accentColor: "#FFAA45",
      visualType: "code",
      highlight: "Never fear a pointer bug again.",
    },
    {
      id: "datascience",
      number: "02",
      title: "Data Science",
      subtitle: "Vectorized numerical computation, broadcasting geometry & multidimensional tensors.",
      icon: Binary,
      tags: ["NumPy N-D Arrays", "Broadcasting Rules", "Vector Dot Products", "Memory Strides"],
      accentColor: "#25B8A5",
      visualType: "matrix",
      highlight: "Multiply millions of records without loops.",
    },
    {
      id: "dataanalysis",
      number: "03",
      title: "Data Analysis",
      subtitle: "Pandas manipulation, exploratory profiling, imputation & feature pipelines.",
      icon: TableProperties,
      tags: ["DataFrame Indexing", "GroupBy Split-Apply", "Outlier Imputation", "Feature Cleansing"],
      accentColor: "#FFAA45",
      visualType: "table",
      highlight: "Transform messy real-world CSVs into clean data signals.",
    },
    {
      id: "dataviz",
      number: "04",
      title: "Data Visualization",
      subtitle: "Statistical graphics, distribution aesthetics, publication design & interactive maps.",
      icon: BarChart3,
      tags: ["Matplotlib Anatomy", "Seaborn Distributions", "Interactive Plotly", "Visual Hierarchy"],
      accentColor: "#25B8A5",
      visualType: "chart",
      highlight: "Tell undeniable stories with clean statistical plots.",
    },
    {
      id: "machinelearning",
      number: "05",
      title: "Machine Learning",
      subtitle: "Loss surfaces, gradient descent optimization, decision boundaries & clustering.",
      icon: BrainCircuit,
      tags: ["Gradient Descent", "Logistic Decision Contours", "Random Forests", "K-Means Space"],
      accentColor: "#FFAA45",
      visualType: "neural",
      highlight: "Watch weights navigate loss landscapes in real time.",
    },
    {
      id: "projects",
      number: "06",
      title: "Real-World Projects",
      subtitle: "Production ML pipelines, API deployments, model evaluation & autonomous agents.",
      icon: Rocket,
      tags: ["End-to-End Pipeline", "FastAPI Serving", "Model Monitoring", "Autonomous Workflows"],
      accentColor: "#25B8A5",
      visualType: "pipeline",
      highlight: "Deploy working intelligence to production infrastructure.",
    },
  ];

  const active = pillars.find((p) => p.id === selectedPillar) || pillars[0];
  const ActiveIcon = active.icon;

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-[var(--zy-surface)] border-t border-[var(--zy-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--zy-surface-2)] border border-[var(--zy-border)] text-xs font-mono font-medium text-[var(--zy-text)]">
              <GraduationCap className="w-3.5 h-3.5 text-[#FFAA45]" />
              <span>Comprehensive Technical Syllabus</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--zy-text)] tracking-tight leading-tight">
              Explore Our Curriculum
            </h2>

            <p className="text-base sm:text-lg text-[var(--zy-muted)] font-sans leading-relaxed">
              Six foundational pillars taking you from your first terminal command
              to designing and deploying real-world machine learning systems.
            </p>
          </div>

          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--zy-surface-2)] hover:bg-[var(--zy-border)] text-[var(--zy-text)] border border-[var(--zy-border)] transition-all duration-200 self-start md:self-auto"
          >
            <span>View Full 8-Module Syllabus</span>
            <ArrowRight className="w-4 h-4 text-[#FFAA45]" />
          </Link>
        </div>

        {/* Distinctive Curriculum Showcase: Asymmetric Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pillar List / Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar) => {
              const isSelected = selectedPillar === pillar.id;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setSelectedPillar(pillar.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[var(--zy-surface-2)] border-[#FFAA45] shadow-xs"
                      : "bg-[var(--zy-surface)] border-[var(--zy-border)] hover:bg-[var(--zy-surface-2)]/60"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                      style={{
                        backgroundColor: isSelected ? pillar.accentColor : "var(--zy-surface-2)",
                        color: isSelected ? "#17191F" : "var(--zy-muted)",
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[var(--zy-muted)]">{pillar.number}</span>
                        <h3 className="text-base font-display font-bold text-[var(--zy-text)]">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[var(--zy-muted)] font-sans line-clamp-1 mt-0.5">
                        {pillar.highlight}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded ${
                      isSelected
                        ? "bg-[#FFAA45] text-[#17191F] font-bold"
                        : "text-[var(--zy-muted)]"
                    }`}
                  >
                    {isSelected ? "Inspecting" : "Select"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Distinctive Interactive Pillar Preview Card (7 cols) */}
          <div className="lg:col-span-7 bg-[var(--zy-surface-2)] rounded-3xl border border-[var(--zy-border)] p-6 sm:p-8 lg:p-10 shadow-xs flex flex-col justify-between min-h-[500px]">
            {/* Header of Active Pillar */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--zy-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFAA45] text-[#17191F] flex items-center justify-center shadow-xs">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#FFAA45] block">
                      PILLAR {active.number} OF 06
                    </span>
                    <h3 className="text-2xl font-display font-bold text-[var(--zy-text)]">
                      {active.title}
                    </h3>
                  </div>
                </div>

                <Link
                  href="/learn/module-1/episode-1"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-[var(--zy-surface)] hover:bg-[var(--zy-surface-2)] text-[var(--zy-text)] border border-[var(--zy-border)] transition-colors"
                >
                  <span>Start Module</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFAA45]" />
                </Link>
              </div>

              <p className="text-base text-[var(--zy-muted)] font-sans leading-relaxed mb-6">
                {active.subtitle}
              </p>

              {/* Unique Visual Element based on Pillar Type */}
              <div className="my-6">
                {active.visualType === "code" && (
                  <div className="bg-[#12151D] rounded-2xl p-5 text-white font-mono text-xs space-y-2 shadow-inner border border-[#2A3142]">
                    <div className="flex justify-between text-[#8E95A5] text-[11px] pb-2 border-b border-[#2C303B]">
                      <span>memory_stack_test.py</span>
                      <span className="text-[#FFAA45]">Live Introspection</span>
                    </div>
                    <p className="text-[#8E95A5]"># Value mutation vs Reference re-assignment</p>
                    <p><span className="text-[#FFAA45]">class</span> VectorNode:</p>
                    <p className="pl-4">def __init__(self, data):</p>
                    <p className="pl-8">self.data = list(data)  # Heap allocation</p>
                    <p className="pl-8">self.id = id(self)       # Hex memory address</p>
                    <div className="pt-2 flex items-center gap-2 text-[11px] text-[#25B8A5]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Learners build custom memory inspectors in Episode 3.</span>
                    </div>
                  </div>
                )}

                {active.visualType === "matrix" && (
                  <div className="bg-[var(--zy-surface)] rounded-2xl p-5 border border-[var(--zy-border)] space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-[var(--zy-text)]">2D TENSOR BROADCASTING</span>
                      <span className="text-[#25B8A5]">O(1) Memory Layout</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                      {[1.2, 4.5, 9.8, 2.4, 6.1, 8.3].map((val, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-[var(--zy-surface-2)] border border-[var(--zy-border)] font-bold text-[var(--zy-text)]">
                          {val}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-[var(--zy-muted)] font-sans">
                      Visualize how NumPy stretches dimension shapes along singleton axes without copying physical bytes in RAM.
                    </p>
                  </div>
                )}

                {active.visualType === "table" && (
                  <div className="bg-[var(--zy-surface)] rounded-2xl p-5 border border-[var(--zy-border)] space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-[var(--zy-text)]">PANDAS GROUPBY REDUCTION</span>
                      <span className="text-[#FFAA45]">Clean Pipeline</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs">
                        <thead>
                          <tr className="border-b border-[var(--zy-border)] text-[var(--zy-muted)]">
                            <th className="pb-2">Cohort</th>
                            <th className="pb-2">Retention</th>
                            <th className="pb-2">Latency (ms)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--zy-border)]">
                          <tr>
                            <td className="py-2 font-bold text-[var(--zy-text)]">Alpha</td>
                            <td className="py-2 text-[#0E7568] font-bold">94.2%</td>
                            <td className="py-2 text-[var(--zy-muted)]">18.4</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[var(--zy-text)]">Beta</td>
                            <td className="py-2 text-[#0E7568] font-bold">89.6%</td>
                            <td className="py-2 text-[var(--zy-muted)]">22.1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {active.visualType === "chart" && (
                  <div className="bg-[var(--zy-surface)] rounded-2xl p-5 border border-[var(--zy-border)] space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-[var(--zy-text)]">STATISTICAL DENSITY ESTIMATE</span>
                      <span className="text-[#FFAA45]">Normal Distribution</span>
                    </div>
                    <div className="h-28 flex items-end justify-between gap-1.5 px-2 pt-4">
                      {[15, 25, 45, 75, 95, 90, 65, 40, 20, 10].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm transition-all duration-300"
                          style={{
                            height: `${height}%`,
                            backgroundColor: i === 4 || i === 5 ? "#FFAA45" : "#25B8A5",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[var(--zy-muted)] font-sans">
                      Learn the visual grammar of data: axes scales, quantile curves, and publication-ready formatting.
                    </p>
                  </div>
                )}

                {active.visualType === "neural" && (
                  <div className="bg-[var(--zy-surface)] rounded-2xl p-5 border border-[var(--zy-border)] space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-[var(--zy-text)]">LOSS LANDSCAPE CONVERGENCE</span>
                      <span className="text-[#25B8A5]">Epoch 140 / 200</span>
                    </div>
                    <div className="p-3 bg-[var(--zy-surface-2)] rounded-xl border border-[var(--zy-border)] flex items-center justify-between font-mono text-xs">
                      <div>
                        <span className="text-[var(--zy-muted)] block text-[10px]">CURRENT LOSS:</span>
                        <span className="font-bold text-[var(--zy-text)]">J(w, b) = 0.042</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[var(--zy-muted)] block text-[10px]">LEARNING RATE:</span>
                        <span className="font-bold text-[#25B8A5]">α = 0.01</span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--zy-muted)] font-sans">
                      Derive gradient descent step-by-step with interactive 3D convex surfaces before training deep networks.
                    </p>
                  </div>
                )}

                {active.visualType === "pipeline" && (
                  <div className="bg-[var(--zy-surface)] rounded-2xl p-5 border border-[var(--zy-border)] space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-[var(--zy-text)]">PRODUCTION ML DEPLOYMENT</span>
                      <span className="text-[#0E7568]">Status: Healthy</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono gap-2 text-center">
                      <div className="p-2.5 bg-[var(--zy-surface-2)] rounded-lg border border-[var(--zy-border)] flex-1 text-[var(--zy-text)]">
                        Kafka Ingest
                      </div>
                      <span className="text-[#FFAA45]">→</span>
                      <div className="p-2.5 bg-[#FFAA45]/20 border border-[#FFAA45] rounded-lg flex-1 text-[#E68522] font-bold">
                        ONNX Model
                      </div>
                      <span className="text-[#FFAA45]">→</span>
                      <div className="p-2.5 bg-[#25B8A5]/20 border border-[#25B8A5] rounded-lg flex-1 text-[#0E7568] font-bold">
                        FastAPI
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Topic Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {active.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--zy-surface)] border border-[var(--zy-border)] text-[var(--zy-text)] shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-6 border-t border-[var(--zy-border)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--zy-muted)]">
              <span>Includes interactive 3D simulations &amp; graded tests</span>
              <Link
                href="/learn/module-1/episode-1"
                className="text-[var(--zy-text)] font-bold hover:text-[#FFAA45] transition-colors flex items-center gap-1"
              >
                <span>Jump into Episode 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
