/**
 * Episode 3 trace generators — one per mode (Arithmetic, Divide, Assignment).
 *
 * Each generator is a pure function that accepts the current inputs and returns
 * a TraceConfig.  The 3D renderer has no knowledge of these functions.
 */

import type { TraceConfig, TraceObject, TraceStep } from "./trace";

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED HELPERS
   ────────────────────────────────────────────────────────────────────────── */

export type ArithOp = "+" | "-" | "*" | "/" | "//" | "%" | "**";
export type AssignOp = "+=" | "-=" | "*=" | "/=";

function formatNum(n: number): string {
  if (!isFinite(n)) return "Error";
  if (Number.isInteger(n)) return String(n);
  // Show up to 4 sig-figs for decimals
  return parseFloat(n.toPrecision(4)).toString();
}

function applyArith(a: number, b: number, op: ArithOp): number | null {
  if (b === 0 && (op === "/" || op === "//" || op === "%")) return null;
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return a / b;
    case "//": return Math.floor(a / b);
    case "%": return a % b;
    case "**": return Math.pow(a, b);
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   MODE A — ARITHMETIC
   ────────────────────────────────────────────────────────────────────────── */

export interface ArithInputs {
  a: number;
  b: number;
  op: ArithOp;
}

export function buildArithmeticTrace(inputs: ArithInputs): TraceConfig {
  const { a, b, op } = inputs;
  const result = applyArith(a, b, op);
  const divByZero = result === null;

  const codeLines = [
    `a = ${a}`,
    `b = ${b}`,
    `result = a ${op} b  # → ${divByZero ? "ZeroDivisionError" : formatNum(result!)}`,
    `print(result)`,
  ];

  const steps: TraceStep[] = [];
  let idx = 0;

  // Step 0 — show a
  steps.push({
    index: idx++,
    objects: [
      { id: "a", kind: "box", label: "a", value: a, position: [-1.8, 0, 0], color: "cream", opacity: 1 },
      { id: "machine", kind: "box", label: op, position: [0, 0, 0], color: "dim", opacity: 0.4 },
      { id: "b", kind: "box", label: "b", value: b, position: [1.8, 0, 0], color: "cream", opacity: 0.3 },
      { id: "result", kind: "box", label: "result", value: "?", position: [0, -1.8, 0], color: "dim", opacity: 0.2 },
    ],
    codeLineIndex: 0,
    caption: `a is set to ${a}. It's the first value going into the operator.`,
    operatorBadge: op,
  });

  // Step 1 — show b
  steps.push({
    index: idx++,
    objects: [
      { id: "a", kind: "box", label: "a", value: a, position: [-1.8, 0, 0], color: "cream", opacity: 1 },
      { id: "machine", kind: "box", label: op, position: [0, 0, 0], color: "dim", opacity: 0.4 },
      { id: "b", kind: "box", label: "b", value: b, position: [1.8, 0, 0], color: "cream", opacity: 1 },
      { id: "result", kind: "box", label: "result", value: "?", position: [0, -1.8, 0], color: "dim", opacity: 0.2 },
    ],
    codeLineIndex: 1,
    caption: `b is set to ${b}. The two values are ready to be combined.`,
    operatorBadge: op,
  });

  // Step 2 — both entering machine
  steps.push({
    index: idx++,
    objects: [
      { id: "a", kind: "box", label: "a", value: a, position: [-0.7, 0, 0], color: "terracotta", opacity: 1, glow: true },
      { id: "machine", kind: "box", label: op, position: [0, 0, 0], color: "terracotta", opacity: 1, glow: true },
      { id: "b", kind: "box", label: "b", value: b, position: [0.7, 0, 0], color: "terracotta", opacity: 1, glow: true },
      { id: "result", kind: "box", label: "result", value: "?", position: [0, -1.8, 0], color: "dim", opacity: 0.2 },
    ],
    codeLineIndex: 2,
    caption: divByZero
      ? `You can't divide by zero — Python raises a ZeroDivisionError here.`
      : `${a} ${op} ${b} → the machine is calculating…`,
    operatorBadge: op,
  });

  // Step 3 — result emerges (or error)
  if (divByZero) {
    steps.push({
      index: idx++,
      objects: [
        { id: "a", kind: "box", label: "a", value: a, position: [-1.8, 0, 0], color: "cream", opacity: 0.4 },
        { id: "machine", kind: "box", label: "⚠", position: [0, 0, 0], color: "highlight", opacity: 1, glow: true },
        { id: "b", kind: "box", label: "b", value: b, position: [1.8, 0, 0], color: "cream", opacity: 0.4 },
        { id: "error", kind: "box", label: "ZeroDivisionError", value: "b = 0", position: [0, -1.8, 0], color: "highlight", opacity: 1 },
      ],
      codeLineIndex: 2,
      caption: `Python raises ZeroDivisionError: division by zero is undefined. Change b to a non-zero value.`,
      operatorBadge: "⚠",
    });
  } else {
    const r = result!;
    steps.push({
      index: idx++,
      objects: [
        { id: "a", kind: "box", label: "a", value: a, position: [-1.8, 0, 0], color: "cream", opacity: 0.5 },
        { id: "machine", kind: "box", label: op, position: [0, 0, 0], color: "terracotta", opacity: 0.7 },
        { id: "b", kind: "box", label: "b", value: b, position: [1.8, 0, 0], color: "cream", opacity: 0.5 },
        { id: "result", kind: "box", label: "result", value: formatNum(r), position: [0, -1.8, 0], color: "terracotta", opacity: 1, glow: true, highlight: true },
      ],
      codeLineIndex: 2,
      caption: `${a} ${op} ${b} = ${formatNum(r)}. The result box now holds the value.`,
      operatorBadge: op,
    });

    // Step 4 — print
    steps.push({
      index: idx++,
      objects: [
        { id: "a", kind: "box", label: "a", value: a, position: [-1.8, 0, 0], color: "cream", opacity: 0.3 },
        { id: "machine", kind: "box", label: op, position: [0, 0, 0], color: "dim", opacity: 0.3 },
        { id: "b", kind: "box", label: "b", value: b, position: [1.8, 0, 0], color: "cream", opacity: 0.3 },
        { id: "result", kind: "box", label: "result", value: formatNum(r), position: [0, -1.8, 0], color: "terracotta", opacity: 1, glow: true },
        { id: "output", kind: "box", label: "print →", value: formatNum(r), position: [0, -3.0, 0], color: "highlight", opacity: 1 },
      ],
      codeLineIndex: 3,
      caption: `print(result) outputs ${formatNum(r)} to the console.`,
      operatorBadge: op,
    });
  }

  return { codeLines, codeTitle: `a ${op} b`, steps };
}

/* ─────────────────────────────────────────────────────────────────────────────
   MODE B — DIVIDE (// and % explainer)
   ────────────────────────────────────────────────────────────────────────── */

export interface DivideInputs {
  n: number; // 1-30
  k: number; // 1-10
}

export function buildDivideTrace(inputs: DivideInputs): TraceConfig {
  const { n, k } = inputs;
  const full = Math.floor(n / k);
  const rem = n % k;

  const codeLines = [
    `n = ${n}`,
    `k = ${k}`,
    `print(n // k)  # → ${full}`,
    `print(n % k)   # → ${rem}`,
  ];

  const totalBlocks = Math.min(n, 30); // cap for rendering

  // Build block objects
  function makeBlocks(highlighted: number[], dimmed: number[]): TraceObject[] {
    const objs: TraceObject[] = [];
    for (let i = 0; i < totalBlocks; i++) {
      const col = i % 6;
      const row = Math.floor(i / 6);
      const pos: [number, number, number] = [col * 0.6 - 1.5, -row * 0.6 + 1.2, 0];
      objs.push({
        id: `block-${i}`,
        kind: "block",
        position: pos,
        color: highlighted.includes(i) ? "terracotta" : dimmed.includes(i) ? "highlight" : "sand",
        opacity: highlighted.includes(i) ? 1 : dimmed.includes(i) ? 0.6 : 0.5,
        glow: highlighted.includes(i),
      });
    }
    return objs;
  }

  const steps: TraceStep[] = [];
  let idx = 0;

  // Step 0 — show all n blocks
  steps.push({
    index: idx++,
    objects: makeBlocks([], []),
    codeLineIndex: 0,
    caption: `n = ${n}. These are ${n} blocks — Asha has that many samosas.`,
  });

  // Step 1 — group them into groups of k
  const groupHighlight = Array.from({ length: full * k }, (_, i) => i);
  const remBlocks = Array.from({ length: rem }, (_, i) => full * k + i);
  steps.push({
    index: idx++,
    objects: makeBlocks(groupHighlight, remBlocks),
    codeLineIndex: 1,
    caption: `Sorting ${n} samosas into groups of ${k}. How many full groups fit?`,
  });

  // Step 2 — highlight full groups (n // k)
  steps.push({
    index: idx++,
    objects: [
      ...makeBlocks(groupHighlight, remBlocks),
      { id: "full-label", kind: "box", label: `n // k = ${full}`, value: `${full} full groups`, position: [0, -2.4, 0], color: "terracotta", opacity: 1, glow: true },
    ],
    codeLineIndex: 2,
    caption: `${n} ÷ ${k} = ${full} full groups. The double-slash drops the leftover — it only counts complete groups.`,
    operatorBadge: "//",
  });

  // Step 3 — highlight remainder (n % k)
  steps.push({
    index: idx++,
    objects: [
      ...makeBlocks(remBlocks, groupHighlight),
      { id: "full-label", kind: "box", label: `n // k = ${full}`, value: `${full} full groups`, position: [0, -2.4, 0], color: "dim", opacity: 0.4 },
      { id: "rem-label", kind: "box", label: `n % k = ${rem}`, value: `${rem} left over`, position: [0, -3.1, 0], color: "highlight", opacity: 1, glow: true },
    ],
    codeLineIndex: 3,
    caption: rem === 0
      ? `No blocks left over — ${n} divides perfectly into groups of ${k}. n % k = 0.`
      : `${rem} block${rem !== 1 ? "s" : ""} left over after the full groups. That's the remainder — n % k = ${rem}.`,
    operatorBadge: "%",
  });

  return { codeLines, codeTitle: `n // k and n % k`, steps };
}

/* ─────────────────────────────────────────────────────────────────────────────
   MODE C — ASSIGNMENT (augmented assignment)
   ────────────────────────────────────────────────────────────────────────── */

export interface AssignInputs {
  op: AssignOp;
  amount: number; // 1-10
  history: number[]; // last few values (maintained externally)
}

export function buildAssignTrace(inputs: AssignInputs): TraceConfig {
  const { op, amount, history } = inputs;
  const startValue = history[history.length - 1] ?? 90;
  const plainOp = op[0] as "+" | "-" | "*" | "/"; // strip "="
  const rawResult = applyArith(startValue, amount, plainOp as ArithOp);
  const result = rawResult === null ? null : rawResult;

  const expandedCode = `score = score ${plainOp} ${amount}`;
  const codeLines = [
    `score = ${startValue}       # current value`,
    `score ${op} ${amount}            # shorthand for:`,
    expandedCode,
    `print(score)   # → ${result === null ? "Error" : formatNum(result)}`,
  ];

  const steps: TraceStep[] = [];
  let idx = 0;

  // Step 0 — show current score box
  steps.push({
    index: idx++,
    objects: [
      { id: "score", kind: "box", label: "score", value: startValue, position: [0, 0.5, 0], color: "cream", opacity: 1 },
    ],
    codeLineIndex: 0,
    caption: `score currently holds ${startValue}. We're about to update it.`,
  });

  // Step 1 — show the shorthand line
  steps.push({
    index: idx++,
    objects: [
      { id: "score", kind: "box", label: "score", value: startValue, position: [0, 0.5, 0], color: "terracotta", opacity: 1, glow: true },
      { id: "op-label", kind: "box", label: op, value: `${amount}`, position: [0, -0.9, 0], color: "sand", opacity: 1 },
    ],
    codeLineIndex: 1,
    caption: `score ${op} ${amount} is shorthand — Python expands it to: score = score ${plainOp} ${amount}.`,
    operatorBadge: op,
  });

  // Step 2 — show the expanded form
  steps.push({
    index: idx++,
    objects: [
      { id: "score-old", kind: "box", label: "score (old)", value: startValue, position: [-1.6, 0.5, 0], color: "cream", opacity: 0.7 },
      { id: "plain-op", kind: "box", label: plainOp, position: [0, 0.5, 0], color: "dim", opacity: 0.8 },
      { id: "amount", kind: "box", label: `${amount}`, value: amount, position: [1.6, 0.5, 0], color: "sand", opacity: 1 },
    ],
    codeLineIndex: 2,
    caption: `Expanded: score = ${startValue} ${plainOp} ${amount}. Python evaluates the right side first.`,
    operatorBadge: plainOp,
  });

  // Step 3 — result
  if (result === null) {
    steps.push({
      index: idx++,
      objects: [
        { id: "score", kind: "box", label: "score", value: "Error", position: [0, 0.5, 0], color: "highlight", opacity: 1, glow: true },
      ],
      codeLineIndex: 3,
      caption: `ZeroDivisionError: you can't divide by zero. Change amount to a non-zero value.`,
    });
  } else {
    const isDecimal = op === "/=" && !Number.isInteger(result);
    steps.push({
      index: idx++,
      objects: [
        { id: "score-old", kind: "box", label: "score (old)", value: startValue, position: [0, 1.5, 0], color: "dim", opacity: 0.3 },
        { id: "score", kind: "box", label: "score", value: formatNum(result), position: [0, 0.5, 0], color: "terracotta", opacity: 1, glow: true, highlight: true },
      ],
      codeLineIndex: 3,
      caption: isDecimal
        ? `score is now ${formatNum(result)}. Note: /= uses true division, so the result is always a decimal.`
        : `The old value fades out, and score is updated to ${formatNum(result)}.`,
      operatorBadge: op,
    });
  }

  return { codeLines, codeTitle: `score ${op} ${amount}`, steps };
}

