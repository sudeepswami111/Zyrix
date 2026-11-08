"use client";

/**
 * OperatorScene — React Three Fiber canvas for the Episode 3 3D tab.
 *
 * This file is loaded via dynamic import with { ssr: false } to avoid
 * server-side rendering issues with WebGL.  It renders the current
 * TraceStep as a 3D scene using simple geometries and no external assets.
 */

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { TraceStep, TraceObject } from "./trace";

/* ─────────────────────────────────────────────────────────────────────────────
   COLOUR PALETTE  (warm terracotta-cream design language)
   ────────────────────────────────────────────────────────────────────────── */
const PALETTE = {
  terracotta: new THREE.Color("#C1502E"),
  cream:      new THREE.Color("#F5EDE0"),
  sand:       new THREE.Color("#DDD0BC"),
  dim:        new THREE.Color("#8C7E72"),
  highlight:  new THREE.Color("#E8956B"),
  bg:         new THREE.Color("#F8F1E8"),
  text:       new THREE.Color("#2B2521"),
  textDim:    new THREE.Color("#6B6058"),
} as const;

function getColor(c: TraceObject["color"]): THREE.Color {
  switch (c) {
    case "terracotta": return PALETTE.terracotta;
    case "cream":      return PALETTE.cream;
    case "sand":       return PALETTE.sand;
    case "highlight":  return PALETTE.highlight;
    case "dim":
    default:           return PALETTE.dim;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATED BOX / BLOCK MESH
   ────────────────────────────────────────────────────────────────────────── */

interface SceneObjectProps {
  obj: TraceObject;
  reducedMotion: boolean;
}

function SceneBox({ obj, reducedMotion }: SceneObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef  = useRef<THREE.MeshStandardMaterial>(null);

  const targetPos = useMemo(
    () => new THREE.Vector3(...(obj.position ?? [0, 0, 0])),
    [obj.position]
  );
  const targetOpacity = obj.opacity ?? 1;
  const baseColor = useMemo(() => getColor(obj.color), [obj.color]);

  useFrame((_state, delta) => {
    if (!meshRef.current || !matRef.current) return;
    if (reducedMotion) {
      meshRef.current.position.copy(targetPos);
      matRef.current.opacity = targetOpacity;
      return;
    }
    // Smooth lerp
    const speed = 4;
    meshRef.current.position.lerp(targetPos, 1 - Math.exp(-speed * delta));
    matRef.current.opacity += (targetOpacity - matRef.current.opacity) * (1 - Math.exp(-speed * delta));

    // Pulsing glow for highlighted objects
    if (obj.glow) {
      const pulse = 0.85 + 0.15 * Math.sin(_state.clock.elapsedTime * 2.5);
      matRef.current.emissiveIntensity = pulse;
    } else {
      matRef.current.emissiveIntensity += (0 - matRef.current.emissiveIntensity) * 0.2;
    }
  });

  const isBlock = obj.kind === "block";
  const size: [number, number, number] = isBlock ? [0.42, 0.42, 0.18] : [1.3, 0.72, 0.22];
  const radius = isBlock ? 0.06 : 0.12;

  return (
    <group>
      {/* Main box */}
      <mesh
        ref={meshRef}
        position={targetPos}
        castShadow
        receiveShadow
      >
        <RoundedBox args={size} radius={radius} smoothness={2}>
          <meshStandardMaterial
            ref={matRef}
            color={baseColor}
            emissive={obj.glow ? PALETTE.terracotta : PALETTE.dim}
            emissiveIntensity={obj.glow ? 0.9 : 0}
            transparent
            opacity={targetOpacity}
            roughness={0.45}
            metalness={0.05}
          />
        </RoundedBox>

        {/* Value label */}
        {obj.value !== undefined && !isBlock && (
          <Text
            position={[0, 0.08, 0.14]}
            fontSize={0.22}
            color={PALETTE.text}
            font="/fonts/JetBrainsMono-Bold.woff"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.1}
          >
            {String(obj.value)}
          </Text>
        )}

        {/* Sub-label */}
        {obj.label && !isBlock && (
          <Text
            position={[0, -0.18, 0.14]}
            fontSize={0.11}
            color={PALETTE.textDim}
            font="/fonts/JetBrainsMono-Regular.woff"
            anchorX="center"
            anchorY="middle"
          >
            {obj.label}
          </Text>
        )}
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE ROOT
   ────────────────────────────────────────────────────────────────────────── */

export interface OperatorSceneProps {
  step: TraceStep;
  reducedMotion: boolean;
}

function SceneContent({ step, reducedMotion }: OperatorSceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 3]} intensity={1.2} castShadow />
      <directionalLight position={[-2, -2, 1]} intensity={0.3} color="#F5EDE0" />

      {/* Scene objects */}
      {step.objects.map((obj) => (
        <SceneBox
          key={obj.id}
          obj={obj}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Orbit controls: rotate + zoom only, no pan */}
      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI * 0.78}
        minPolarAngle={Math.PI * 0.22}
        minDistance={3.5}
        maxDistance={12}
        autoRotate={false}
        makeDefault
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   EXPORTED CANVAS  (loaded via dynamic import with ssr: false)
   ────────────────────────────────────────────────────────────────────────── */

export interface OperatorSceneCanvasProps {
  step: TraceStep;
  reducedMotion: boolean;
  ariaLabel?: string;
}

export default function OperatorSceneCanvas({
  step,
  reducedMotion,
  ariaLabel = "Interactive 3D operator visualiser",
}: OperatorSceneCanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: false }}
      shadows
      style={{ background: "#F8F1E8", borderRadius: "inherit" }}
      aria-label={ariaLabel}
      role="img"
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#F8F1E8"), 1);
      }}
    >
      <SceneContent step={step} reducedMotion={reducedMotion} />
    </Canvas>
  );
}

