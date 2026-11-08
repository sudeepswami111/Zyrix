/**
 * Episode 3 trace generators — one per mode (Arithmetic, Divide, Assignment).
 *
 * Each generator is a pure function that accepts the current inputs and returns
 * a TraceConfig. The 3D renderer has no knowledge of these functions.
 *
 * Stable actor IDs are preserved across steps to guarantee continuous,
 * buttery-smooth 3D spring animations without jarring pop-ins or collisions.
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
  return parseFloat(n.toPrecision(4)).toString();
}

function applyArith(a: number, b: number, op: ArithOp): number | null {
  if (b === 0 && (op === "/" || op === "//" || op === "%")) return null;
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    case "//":
      return Math.floor(a / b);
    case "%":
      return a % b;
    case "**":
      return Math.pow(a, b);
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
      { id: "a", kind: "box", label: "a", value: a, position: [-2.1, 0.45, 0], scale: 1.05, color: "cream", opacity: 1, glow: true },
      { id: "machine", kind: "box", label: op, position: [0, 0.45, 0], scale: 0.95, color: "dim", opacity: 0.35 },
      { id: "b", kind: "box", label: "b", value: b, position: [2.1, 0.45, 0], scale: 0.95, color: "cream", opacity: 0.25 },
      { id: "result", kind: "box", label: "result", value: "?", position: [0, -1.1, -0.3], scale: 0.8, opacity: 0.15, color: "dim" },
      { id: "output", kind: "box", label: "CONSOLE", value: "?", position: [0, -1.1, -0.6], scale: 0.5, opacity: 0, color: "highlight" },
    ],
    codeLineIndex: 0,
    caption: `a is set to ${a}. It's the first value going into the operator.`,
    operatorBadge: op,
  });

  // Step 1 — show b
  steps.push({
    index: idx++,
    objects: [
      { id: "a", kind: "box", label: "a", value: a, position: [-2.1, 0.45, 0], scale: 1.0, color: "cream", opacity: 0.85, glow: false },
      { id: "machine", kind: "box", label: op, position: [0, 0.45, 0], scale: 0.95, color: "dim", opacity: 0.45 },
      { id: "b", kind: "box", label: "b", value: b, position: [2.1, 0.45, 0], scale: 1.05, color: "cream", opacity: 1, glow: true },
      { id: "result", kind: "box", label: "result", value: "?", position: [0, -1.1, -0.3], scale: 0.8, opacity: 0.15, color: "dim" },
      { id: "output", kind: "box", label: "CONSOLE", value: "?", position: [0, -1.1, -0.6], scale: 0.5, opacity: 0, color: "highlight" },
    ],
    codeLineIndex: 1,
    caption: `b is set to ${b}. Both values are ready to enter the machine.`,
    operatorBadge: op,
  });

  // Step 2 — both slide into the machine, machine activates
  steps.push({
    index: idx++,
    objects: [
      // a and b slide smoothly into the machine's rear intake ports
      { id: "a", kind: "box", label: "a", value: a, position: [-0.95, 0.45, -0.28], scale: 0.65, color: "terracotta", opacity: 0.28 },
      // Machine scales up heroically and pulses in terracotta with hero glyph
      { id: "machine", kind: "box", label: op, position: [0, 0.45, 0.05], scale: 1.18, color: "terracotta", opacity: 1, glow: true, highlight: true },
      { id: "b", kind: "box", label: "b", value: b, position: [0.95, 0.45, -0.28], scale: 0.65, color: "terracotta", opacity: 0.28 },
      { id: "result", kind: "box", label: "result", value: "?", position: [0, -1.1, -0.2], scale: 0.88, opacity: 0.3, color: "dim" },
      { id: "output", kind: "box", label: "CONSOLE", value: "?", position: [0, -1.1, -0.6], scale: 0.5, opacity: 0, color: "highlight" },
    ],
    codeLineIndex: 2,
    caption: divByZero
      ? `You can't divide by zero — Python raises a ZeroDivisionError.`
      : `${a} ${op} ${b} → the operator machine processes both values…`,
    operatorBadge: op,
  });

  // Step 3 — result emerges (or error)
  if (divByZero) {
    steps.push({
      index: idx++,
      objects: [
        { id: "a", kind: "box", label: "a", value: a, position: [-2.1, 0.45, -0.25], scale: 0.82, color: "cream", opacity: 0.35 },
        { id: "machine", kind: "box", label: "⚠ ZeroDiv", position: [0, 0.45, 0], scale: 1.12, color: "highlight", opacity: 1, glow: true },
        { id: "b", kind: "box", label: "b", value: b, position: [2.1, 0.45, -0.25], scale: 0.82, color: "cream", opacity: 0.35 },
        { id: "result", kind: "box", label: "Error", value: "Div by zero", position: [0, -1.1, 0.05], scale: 1.1, color: "highlight", opacity: 1, glow: true },
        { id: "output", kind: "box", label: "CONSOLE", value: "?", position: [0, -1.1, -0.6], scale: 0.5, opacity: 0, color: "highlight" },
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
        { id: "a", kind: "box", label: "a", value: a, position: [-2.1, 0.45, -0.25], scale: 0.85, color: "cream", opacity: 0.45 },
        { id: "machine", kind: "box", label: op, position: [0, 0.45, 0], scale: 1.0, color: "terracotta", opacity: 0.65 },
        { id: "b", kind: "box", label: "b", value: b, position: [2.1, 0.45, -0.25], scale: 0.85, color: "cream", opacity: 0.45 },
        { id: "result", kind: "box", label: "result", value: formatNum(r), position: [0, -1.1, 0.05], scale: 1.12, color: "terracotta", opacity: 1, glow: true, highlight: true },
        { id: "output", kind: "box", label: "CONSOLE", value: formatNum(r), position: [0, -1.1, -0.5], scale: 0.6, opacity: 0, color: "highlight" },
      ],
      codeLineIndex: 2,
      caption: `${a} ${op} ${b} = ${formatNum(r)}. The result box emerges with the computed value.`,
      operatorBadge: op,
    });

    // Step 4 — print
    steps.push({
      index: idx++,
      objects: [
        { id: "a", kind: "box", label: "a", value: a, position: [-2.1, 0.45, -0.4], scale: 0.75, color: "cream", opacity: 0.25 },
        { id: "machine", kind: "box", label: op, position: [0, 0.45, 0], scale: 0.88, color: "dim", opacity: 0.3 },
        { id: "b", kind: "box", label: "b", value: b, position: [2.1, 0.45, -0.4], scale: 0.75, color: "cream", opacity: 0.25 },
        { id: "result", kind: "box", label: "result", value: formatNum(r), position: [0, -0.85, 0], scale: 0.98, color: "terracotta", opacity: 0.85 },
        { id: "output", kind: "box", label: "CONSOLE", value: formatNum(r), position: [0, -1.95, 0.05], scale: 1.12, color: "highlight", opacity: 1, glow: true },
      ],
      codeLineIndex: 3,
      caption: `print(result) outputs ${formatNum(r)} to the screen.`,
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
    `print(n // k)  # → ${full} (whole groups)`,
    `print(n % k)   # → ${rem} (leftover)`,
  ];

  const totalBlocks = Math.min(n, 30);

  // Position generator for unorganized pool (Step 0)
  function makeUnorganizedBlocks(): TraceObject[] {
    const objs: TraceObject[] = [];
    const cols = Math.min(totalBlocks, 6);
    for (let i = 0; i < totalBlocks; i++) {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const x = (c - (cols - 1) / 2) * 0.46;
      const y = 0.95 - r * 0.44;
      objs.push({
        id: `block-${i}`,
        kind: "block",
        position: [x, y, 0],
        scale: 1.0,
        color: "sand",
        opacity: 0.85,
        glow: false,
      });
    }
    return objs;
  }

  // Adaptive grouping: handles any combination of n and k without clipping or off-screen overflow
  function makeGroupedBlocks(highlightFull: boolean, highlightRem: boolean): TraceObject[] {
    const objs: TraceObject[] = [];

    const twoRows = full > 5;
    const groupsPerRow = twoRows ? Math.ceil(full / 2) : full;

    for (let g = 0; g < full; g++) {
      const rowIndex = twoRows ? (g < groupsPerRow ? 0 : 1) : 0;
      const colInRow = twoRows ? (g < groupsPerRow ? g : g - groupsPerRow) : g;
      const countInThisRow = twoRows ? (rowIndex === 0 ? groupsPerRow : full - groupsPerRow) : full;

      const groupSpacing = Math.min(1.25, 4.8 / Math.max(countInThisRow, 1));
      const groupCenterX = (colInRow - (countInThisRow - 1) / 2) * groupSpacing;
      const groupBaseY = twoRows ? (rowIndex === 0 ? 1.05 : 0.22) : 0.75;

      const itemsPerRow = k > 4 ? 3 : 2;
      for (let item = 0; item < k; item++) {
        const blockIdx = g * k + item;
        if (blockIdx >= totalBlocks) break;

        const c = item % itemsPerRow;
        const r = Math.floor(item / itemsPerRow);
        const bx = groupCenterX + (c - (itemsPerRow - 1) / 2) * 0.36;
        const by = groupBaseY - r * 0.36;

        objs.push({
          id: `block-${blockIdx}`,
          kind: "block",
          position: [bx, by, 0],
          scale: highlightFull ? 1.08 : 0.95,
          color: highlightFull ? "terracotta" : "sand",
          opacity: highlightFull ? 1 : 0.65,
          glow: highlightFull,
        });
      }
    }

    // Remainder blocks
    const remBaseY = twoRows ? -0.55 : -0.32;
    for (let r = 0; r < rem; r++) {
      const blockIdx = full * k + r;
      if (blockIdx >= totalBlocks) break;
      const remX = (r - (rem - 1) / 2) * 0.44;

      objs.push({
        id: `block-${blockIdx}`,
        kind: "block",
        position: [remX, remBaseY, 0],
        scale: highlightRem ? 1.15 : 0.9,
        color: highlightRem ? "highlight" : "dim",
        opacity: highlightRem ? 1 : 0.45,
        glow: highlightRem,
      });
    }

    return objs;
  }

  const steps: TraceStep[] = [];
  let idx = 0;

  // Step 0 — show all n blocks
  steps.push({
    index: idx++,
    objects: [
      ...makeUnorganizedBlocks(),
      {
        id: "full-label",
        kind: "box",
        label: `// (Floor Division)`,
        value: `${full} full groups`,
        position: [0, -1.45, -0.5],
        scale: 0.6,
        color: "terracotta",
        opacity: 0,
      },
      {
        id: "rem-label",
        kind: "box",
        label: `% (Modulo Remainder)`,
        value: rem === 0 ? "0 remainder" : `${rem} leftover`,
        position: [1.5, -1.45, -0.5],
        scale: 0.6,
        color: "highlight",
        opacity: 0,
      },
    ],
    codeLineIndex: 0,
    caption: `n = ${n}. Here are ${n} items ready to be sorted into groups of ${k}.`,
  });

  // Step 1 — group them into groups of k
  steps.push({
    index: idx++,
    objects: [
      ...makeGroupedBlocks(false, false),
      {
        id: "full-label",
        kind: "box",
        label: `// (Floor Division)`,
        value: `${full} full groups`,
        position: [0, -1.45, -0.4],
        scale: 0.75,
        color: "terracotta",
        opacity: 0.15,
      },
      {
        id: "rem-label",
        kind: "box",
        label: `% (Modulo Remainder)`,
        value: rem === 0 ? "0 remainder" : `${rem} leftover`,
        position: [1.5, -1.45, -0.4],
        scale: 0.75,
        color: "highlight",
        opacity: 0.15,
      },
    ],
    codeLineIndex: 1,
    caption: `Sorting into groups of ${k}: ${full} full group${full !== 1 ? "s" : ""}${rem > 0 ? ` and ${rem} leftover` : ""}.`,
  });

  // Step 2 — highlight full groups (n // k)
  steps.push({
    index: idx++,
    objects: [
      ...makeGroupedBlocks(true, false),
      {
        id: "full-label",
        kind: "box",
        label: `// (Floor Division)`,
        value: `${full} full groups`,
        position: [0, -1.45, 0.05],
        scale: 1.1,
        color: "terracotta",
        opacity: 1,
        glow: true,
      },
      {
        id: "rem-label",
        kind: "box",
        label: `% (Modulo Remainder)`,
        value: rem === 0 ? "0 remainder" : `${rem} leftover`,
        position: [1.5, -1.45, -0.2],
        scale: 0.85,
        color: "dim",
        opacity: 0.3,
      },
    ],
    codeLineIndex: 2,
    caption: `${n} // ${k} = ${full}. Double slash counts only whole groups, dropping any leftovers.`,
    operatorBadge: "//",
  });

  // Step 3 — highlight remainder (n % k)
  steps.push({
    index: idx++,
    objects: [
      ...makeGroupedBlocks(false, true),
      {
        id: "full-label",
        kind: "box",
        label: `// (Floor Division)`,
        value: `${full} groups`,
        position: [-1.5, -1.45, 0],
        scale: 0.95,
        color: "dim",
        opacity: 0.5,
      },
      {
        id: "rem-label",
        kind: "box",
        label: `% (Modulo Remainder)`,
        value: rem === 0 ? "0 remainder" : `${rem} leftover`,
        position: [1.5, -1.45, 0.05],
        scale: 1.1,
        color: "highlight",
        opacity: 1,
        glow: true,
      },
    ],
    codeLineIndex: 3,
    caption: rem === 0
      ? `No blocks left over — ${n} divides evenly by ${k}. ${n} % ${k} = 0.`
      : `${rem} block${rem !== 1 ? "s" : ""} left over. That's the remainder: ${n} % ${k} = ${rem}.`,
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
      { id: "score", kind: "box", label: "score", value: startValue, position: [0, 0.45, 0], scale: 1.08, color: "cream", opacity: 1, glow: false },
      { id: "amount", kind: "box", label: "amount", value: amount, position: [1.9, 0.45, -0.4], scale: 0.6, color: "sand", opacity: 0 },
      { id: "op_machine", kind: "box", label: "shorthand", value: `${op} ${amount}`, position: [0, -0.85, -0.3], scale: 0.6, color: "sand", opacity: 0 },
      { id: "old_ghost", kind: "box", label: "previous", value: startValue, position: [0, 0.45, -0.5], scale: 0.5, color: "dim", opacity: 0 },
    ],
    codeLineIndex: 0,
    caption: `score currently holds ${startValue} in memory.`,
  });

  // Step 1 — show the shorthand line
  steps.push({
    index: idx++,
    objects: [
      { id: "score", kind: "box", label: "score", value: startValue, position: [0, 0.45, 0], scale: 1.12, color: "terracotta", opacity: 1, glow: true },
      { id: "amount", kind: "box", label: "amount", value: amount, position: [1.9, 0.45, -0.3], scale: 0.6, color: "sand", opacity: 0 },
      { id: "op_machine", kind: "box", label: "shorthand", value: `${op} ${amount}`, position: [0, -0.85, 0.05], scale: 1.02, color: "sand", opacity: 1, glow: true },
      { id: "old_ghost", kind: "box", label: "previous", value: startValue, position: [0, 0.45, -0.5], scale: 0.5, color: "dim", opacity: 0 },
    ],
    codeLineIndex: 1,
    caption: `score ${op} ${amount} is shorthand — Python expands it to score = score ${plainOp} ${amount}.`,
    operatorBadge: op,
  });

  // Step 2 — show the expanded form
  steps.push({
    index: idx++,
    objects: [
      { id: "score", kind: "box", label: "score (current)", value: startValue, position: [-1.9, 0.45, 0], scale: 0.95, color: "cream", opacity: 0.85 },
      { id: "op_machine", kind: "box", label: plainOp, position: [0, 0.45, 0], scale: 1.15, color: "terracotta", opacity: 1, glow: true },
      { id: "amount", kind: "box", label: "amount", value: amount, position: [1.9, 0.45, 0], scale: 0.95, color: "sand", opacity: 1 },
      { id: "old_ghost", kind: "box", label: "previous", value: startValue, position: [0, 0.45, -0.5], scale: 0.5, color: "dim", opacity: 0 },
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
        { id: "score", kind: "box", label: "score", value: "ZeroDivision", position: [0, 0.45, 0.05], scale: 1.18, color: "highlight", opacity: 1, glow: true },
        { id: "op_machine", kind: "box", label: plainOp, position: [0, 0.45, -0.4], scale: 0.6, color: "terracotta", opacity: 0 },
        { id: "amount", kind: "box", label: "amount", value: amount, position: [0, 0.45, -0.4], scale: 0.6, color: "sand", opacity: 0 },
        { id: "old_ghost", kind: "box", label: "previous", value: startValue, position: [0, 0.45, -0.5], scale: 0.5, color: "dim", opacity: 0 },
      ],
      codeLineIndex: 3,
      caption: `ZeroDivisionError: you can't divide by zero. Change amount to a non-zero value.`,
    });
  } else {
    const isDecimal = op === "/=" && !Number.isInteger(result);
    steps.push({
      index: idx++,
      objects: [
        { id: "score", kind: "box", label: "score", value: formatNum(result), position: [0, 0.45, 0.05], scale: 1.18, color: "terracotta", opacity: 1, glow: true, highlight: true },
        { id: "old_ghost", kind: "box", label: "previous", value: startValue, position: [0, 1.45, -0.3], scale: 0.75, color: "dim", opacity: 0.35 },
        { id: "op_machine", kind: "box", label: plainOp, position: [0, 0.45, -0.4], scale: 0.6, color: "terracotta", opacity: 0 },
        { id: "amount", kind: "box", label: "amount", value: amount, position: [0, 0.45, -0.4], scale: 0.6, color: "sand", opacity: 0 },
      ],
      codeLineIndex: 3,
      caption: isDecimal
        ? `score is now ${formatNum(result)}. /= always produces a decimal (float).`
        : `The old value is replaced: score is updated to ${formatNum(result)} in the same box.`,
      operatorBadge: op,
    });
  }

  return { codeLines, codeTitle: `score ${op} ${amount}`, steps };
}
