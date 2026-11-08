/**
 * Trace contract — the reusable foundation for all 3D visualiser scenes.
 *
 * A trace is a pure data structure: an ordered array of TraceStep objects.
 * The 3D renderer is a pure function of the current TraceStep.  Generators
 * for each episode / mode live in separate files and are the only code that
 * knows the domain logic.
 */

/** Which visual objects exist and what they look like in this step. */
export interface TraceObject {
  id: string;
  kind: "box" | "sphere" | "block" | "connector";
  label?: string;
  value?: string | number;
  highlight?: boolean;
  glow?: boolean;
  /** 0-1 opacity */
  opacity?: number;
  /** Normalised position hint [x, y, z] – the renderer may interpret freely */
  position?: [number, number, number];
  color?: "terracotta" | "cream" | "sand" | "dim" | "highlight";
}

/** A single step in a trace. */
export interface TraceStep {
  /** Zero-based index */
  index: number;
  /** Objects the renderer should draw */
  objects: TraceObject[];
  /** Active code line index (0-based) */
  codeLineIndex: number;
  /** Human-readable caption for this step */
  caption: string;
  /** Optional operator badge to display */
  operatorBadge?: string;
}

/** Metadata a generator can supply alongside its trace. */
export interface TraceConfig {
  /** Lines of code shown in the code panel */
  codeLines: string[];
  /** Short title shown above the code panel */
  codeTitle: string;
  /** The generated trace steps */
  steps: TraceStep[];
}

