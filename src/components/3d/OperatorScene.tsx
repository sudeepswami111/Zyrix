"use client";

/**
 * OperatorScene — Pure WebGL / React Three Fiber scene for Episode 3 3D Tab.
 *
 * Uses native Three.js CanvasTexture for labels — 100% GPU-accelerated, zero DOM
 * portal issues, zero external font network requests.
 */

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { TraceStep, TraceObject } from "./trace";

/* ─────────────────────────────────────────────────────────────────────────────
   CANVAS TEXTURE GENERATOR FOR BOX LABELS
   ────────────────────────────────────────────────────────────────────────── */
function makeLabelTexture(
  label: string | undefined,
  value: string | number | undefined,
  color: TraceObject["color"]
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Background fill matching box tone
    const isTerracotta = color === "terracotta";
    const isHighlight = color === "highlight";
    const bg = isTerracotta
      ? "#C1502E"
      : isHighlight
      ? "#E8956B"
      : color === "sand"
      ? "#D8CAB6"
      : "#EDE0D0";

    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(10, 10, 492, 236, 28);
    ctx.fill();

    // Subtle border
    ctx.strokeStyle = isTerracotta ? "#9B361B" : "#C0B29E";
    ctx.lineWidth = 8;
    ctx.stroke();

    // Value text
    if (value !== undefined) {
      ctx.fillStyle = isTerracotta ? "#FFFFFF" : "#1A1210";
      ctx.font = "bold 76px 'JetBrains Mono', monospace, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const yPos = label ? 96 : 128;
      ctx.fillText(String(value), 256, yPos);
    }

    // Label text
    if (label) {
      ctx.fillStyle = isTerracotta ? "#F5EDE0" : "#6B6058";
      ctx.font = "bold 38px 'JetBrains Mono', monospace, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const yPos = value !== undefined ? 180 : 128;
      ctx.fillText(label, 256, yPos);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/* ─────────────────────────────────────────────────────────────────────────────
   BOX COMPONENT WITH TEXTURE & LERP ANIMATION
   ────────────────────────────────────────────────────────────────────────── */
interface SceneBoxProps {
  obj: TraceObject;
  reducedMotion: boolean;
}

function SceneBox({ obj, reducedMotion }: SceneBoxProps) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const isBlock = obj.kind === "block";
  const targetPos = useMemo(
    () => new THREE.Vector3(...(obj.position ?? [0, 0, 0])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [obj.position?.[0], obj.position?.[1], obj.position?.[2]]
  );
  const targetOpacity = obj.opacity ?? 1;

  // Generate label texture for non-block objects
  const texture = useMemo(() => {
    if (isBlock) return null;
    return makeLabelTexture(obj.label, obj.value, obj.color);
  }, [isBlock, obj.label, obj.value, obj.color]);

  // Cleanup texture on unmount
  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  // Color mapping
  const boxColor = useMemo(() => {
    switch (obj.color) {
      case "terracotta":
        return new THREE.Color("#C1502E");
      case "highlight":
        return new THREE.Color("#E8956B");
      case "sand":
        return new THREE.Color("#D8CAB6");
      case "cream":
        return new THREE.Color("#EDE0D0");
      case "dim":
      default:
        return new THREE.Color("#8C7E72");
    }
  }, [obj.color]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      groupRef.current.position.copy(targetPos);
      if (matRef.current) {
        matRef.current.opacity = targetOpacity;
        matRef.current.emissiveIntensity = obj.glow ? 0.8 : 0;
      }
      return;
    }

    const lerpRate = 1 - Math.exp(-6 * delta);
    groupRef.current.position.lerp(targetPos, lerpRate);

    if (matRef.current) {
      matRef.current.opacity += (targetOpacity - matRef.current.opacity) * lerpRate;
      if (obj.glow) {
        const pulse = 0.6 + 0.4 * Math.sin(_state.clock.elapsedTime * 3);
        matRef.current.emissiveIntensity = pulse;
      } else {
        matRef.current.emissiveIntensity *= 0.88;
        if (matRef.current.emissiveIntensity < 0.01) {
          matRef.current.emissiveIntensity = 0;
        }
      }
    }
  });

  if (isBlock) {
    return (
      <group ref={groupRef} position={targetPos}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.38, 0.38, 0.16]} />
          <meshStandardMaterial
            ref={matRef}
            color={boxColor}
            emissive={obj.glow ? new THREE.Color("#C1502E") : new THREE.Color(0x000000)}
            emissiveIntensity={obj.glow ? 0.8 : 0}
            transparent
            opacity={targetOpacity}
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>
      </group>
    );
  }

  // Value / Machine / Result Box
  return (
    <group ref={groupRef} position={targetPos}>
      {/* 3D Box Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.82, 0.22]} />
        <meshStandardMaterial
          ref={matRef}
          color={boxColor}
          emissive={obj.glow ? new THREE.Color("#C1502E") : new THREE.Color(0x000000)}
          emissiveIntensity={obj.glow ? 0.8 : 0}
          transparent
          opacity={targetOpacity}
          roughness={0.45}
          metalness={0.06}
        />
      </mesh>

      {/* Front Face Texture with crisp text */}
      {texture && (
        <mesh position={[0, 0, 0.115]}>
          <planeGeometry args={[1.46, 0.78]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={targetOpacity}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE ENVIRONMENT
   ────────────────────────────────────────────────────────────────────────── */
interface SceneContentProps {
  step: TraceStep;
  reducedMotion: boolean;
}

function SceneContent({ step, reducedMotion }: SceneContentProps) {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 7, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-4, -3, 3]} intensity={0.35} color="#FAF4ED" />

      {/* Grid Floor */}
      <gridHelper
        args={[16, 16, "#E6DCC8", "#EFE7DA"]}
        position={[0, -2.4, 0]}
      />

      {/* Render all trace objects */}
      {step.objects.map((obj) => (
        <SceneBox key={obj.id} obj={obj} reducedMotion={reducedMotion} />
      ))}

      {/* Controlled Orbit */}
      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.2}
        minDistance={3.8}
        maxDistance={14}
        makeDefault
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN CANVAS COMPONENT
   ────────────────────────────────────────────────────────────────────────── */
export interface OperatorSceneCanvasProps {
  step: TraceStep;
  reducedMotion: boolean;
  ariaLabel?: string;
}

export default function OperatorSceneCanvas({
  step,
  reducedMotion,
  ariaLabel = "Interactive 3D operator machine",
}: OperatorSceneCanvasProps) {
  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ width: "100%", height: "100%", background: "#F8F1E8" }}
        aria-label={ariaLabel}
        role="region"
      >
        <color attach="background" args={["#F8F1E8"]} />
        <SceneContent step={step} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
