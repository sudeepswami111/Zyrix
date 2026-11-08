"use client";

/**
 * OperatorScene — High-fidelity 3D WebGL Scene for Episode 3.
 *
 * Features:
 *   - Tactile rounded 3D cards with chamfered bevels (RoundedBox)
 *   - Studio 3-point lighting + soft ContactShadows
 *   - HiDPI 1024x512 CanvasTextures with dynamic text auto-fitting
 *   - In-memory texture caching to eliminate GPU compile hitches
 *   - Physics-backed critically damped spring lerp + dynamic banking tilt
 *   - Synchronized opacity & smooth color transitions across all faces
 *   - Fully reactive to prefers-reduced-motion and DPR capped at 2
 */

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, ContactShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { TraceStep, TraceObject } from "./trace";

/* ─────────────────────────────────────────────────────────────────────────────
   TEXTURE CACHE — Avoids reallocating CanvasTextures during animation
   ────────────────────────────────────────────────────────────────────────── */
const textureCache = new Map<string, THREE.CanvasTexture>();

function getOrCreateLabelTexture(
  label: string | undefined,
  value: string | number | undefined,
  color: TraceObject["color"]
): THREE.CanvasTexture {
  const cacheKey = `${label ?? ""}|${value ?? ""}|${color ?? "dim"}`;
  const existing = textureCache.get(cacheKey);
  if (existing) return existing;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const isTerracotta = color === "terracotta";
    const isHighlight = color === "highlight";
    const isSand = color === "sand";

    // Card background fill with subtle glossy vertical gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    if (isTerracotta) {
      grad.addColorStop(0, "#C95533");
      grad.addColorStop(1, "#A43719");
    } else if (isHighlight) {
      grad.addColorStop(0, "#E88756");
      grad.addColorStop(1, "#CF6538");
    } else if (isSand) {
      grad.addColorStop(0, "#E4DACB");
      grad.addColorStop(1, "#D0C1AE");
    } else {
      // Cream
      grad.addColorStop(0, "#FAF6F0");
      grad.addColorStop(1, "#EDE4D6");
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(16, 16, 992, 480, 44);
    ctx.fill();

    // Inset border
    ctx.strokeStyle = isTerracotta
      ? "rgba(255, 255, 255, 0.28)"
      : isHighlight
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(180, 165, 145, 0.55)";
    ctx.lineWidth = 8;
    ctx.stroke();

    const hasValue = value !== undefined;
    const hasLabel = Boolean(label);

    // Operator Glyph Hero Mode (e.g. machine in the middle with only operator symbol)
    if (!hasValue && hasLabel) {
      ctx.fillStyle = isTerracotta ? "#FFFFFF" : "#1A1210";
      ctx.font = "bold 130px 'JetBrains Mono', monospace, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label!, 512, 256);
    } else {
      // Top Label Chip / Pill
      if (hasLabel) {
        ctx.font = "600 34px 'JetBrains Mono', monospace, sans-serif";
        const labelText = label!.toUpperCase();
        const textMetrics = ctx.measureText(labelText);
        const pillWidth = Math.max(textMetrics.width + 48, 120);
        const pillHeight = 52;
        const pillX = 512 - pillWidth / 2;
        const pillY = 64;

        // Pill background
        ctx.fillStyle = isTerracotta
          ? "rgba(0, 0, 0, 0.18)"
          : isHighlight
          ? "rgba(0, 0, 0, 0.15)"
          : "rgba(107, 96, 88, 0.12)";
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 26);
        ctx.fill();

        // Pill text
        ctx.fillStyle = isTerracotta
          ? "#FDF9F5"
          : isHighlight
          ? "#FFFFFF"
          : "#6B6058";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labelText, 512, pillY + pillHeight / 2 + 2);
      }

      // Hero Value Text with dynamic auto-sizing
      if (hasValue) {
        const valStr = String(value);
        let fontSize = 96;
        if (valStr.length > 12) fontSize = 48;
        else if (valStr.length > 7) fontSize = 62;
        else if (valStr.length > 4) fontSize = 78;

        ctx.fillStyle = isTerracotta ? "#FFFFFF" : isHighlight ? "#FFFFFF" : "#1A1210";
        ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const valY = hasLabel ? 300 : 256;
        ctx.fillText(valStr, 512, valY);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
}

/* ─────────────────────────────────────────────────────────────────────────────
   3D SCENE BOX WITH ROUNDED EDGES & ORGANIC SPRING INTERPOLATION
   ────────────────────────────────────────────────────────────────────────── */
interface SceneBoxProps {
  obj: TraceObject;
  reducedMotion: boolean;
}

function SceneBox({ obj, reducedMotion }: SceneBoxProps) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const labelMatRef = useRef<THREE.MeshBasicMaterial>(null);

  const isBlock = obj.kind === "block";

  // Persistent motion targets & state
  const targetPos = useMemo(
    () => new THREE.Vector3(...(obj.position ?? [0, 0, 0])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [obj.position?.[0], obj.position?.[1], obj.position?.[2]]
  );

  const targetScale = useMemo(() => {
    if (typeof obj.scale === "number") {
      return new THREE.Vector3(obj.scale, obj.scale, obj.scale);
    }
    if (Array.isArray(obj.scale)) {
      return new THREE.Vector3(...obj.scale);
    }
    return new THREE.Vector3(1, 1, 1);
  }, [obj.scale]);

  const targetOpacity = obj.opacity ?? 1;

  // Initial mount: start slightly scaled down and faded so new objects bloom into existence
  const currentPos = useRef(targetPos.clone());
  const currentScale = useRef(targetScale.clone().multiplyScalar(0.7));
  const currentOpacity = useRef(0);

  // Micro-hover phase offset unique to each object
  const floatOffset = useRef(Math.random() * Math.PI * 2);

  // Fetch cached texture
  const texture = useMemo(() => {
    if (isBlock) return null;
    return getOrCreateLabelTexture(obj.label, obj.value, obj.color);
  }, [isBlock, obj.label, obj.value, obj.color]);

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
        return new THREE.Color("#7D6F66");
    }
  }, [obj.color]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      groupRef.current.position.copy(targetPos);
      groupRef.current.scale.copy(targetScale);
      groupRef.current.rotation.set(0, 0, 0);
      if (matRef.current) {
        matRef.current.opacity = targetOpacity;
        matRef.current.color.copy(boxColor);
        matRef.current.emissiveIntensity = obj.glow ? 0.75 : 0;
      }
      if (labelMatRef.current) {
        labelMatRef.current.opacity = targetOpacity;
      }
      return;
    }

    // Safe clamped delta to prevent frame-hitch jumps
    const safeDelta = Math.min(delta, 0.05);
    const lerpRate = 1 - Math.exp(-9.5 * safeDelta);

    currentPos.current.lerp(targetPos, lerpRate);
    currentScale.current.lerp(targetScale, lerpRate);
    currentOpacity.current += (targetOpacity - currentOpacity.current) * lerpRate;

    // Apply smooth position and scale
    groupRef.current.position.copy(currentPos.current);
    groupRef.current.scale.copy(currentScale.current);

    // Subtle organic breathing hover on Y axis
    const hoverY = Math.sin(_state.clock.elapsedTime * 2.0 + floatOffset.current) * 0.022;
    groupRef.current.position.y += hoverY;

    // Subtle physical banking tilt when moving horizontally
    const vx = targetPos.x - currentPos.current.x;
    groupRef.current.rotation.z = -vx * 0.07;
    groupRef.current.rotation.x = Math.sin(_state.clock.elapsedTime * 1.8 + floatOffset.current) * 0.012;

    // Smooth opacity, color transition, and pulsating emissive glow
    if (matRef.current) {
      matRef.current.opacity = currentOpacity.current;
      matRef.current.color.lerp(boxColor, lerpRate);

      if (obj.glow) {
        const pulse = 0.55 + 0.45 * Math.sin(_state.clock.elapsedTime * 3.2);
        matRef.current.emissiveIntensity = pulse;
      } else {
        matRef.current.emissiveIntensity *= 0.85;
        if (matRef.current.emissiveIntensity < 0.01) {
          matRef.current.emissiveIntensity = 0;
        }
      }
    }

    // Synchronized opacity on the front label plane
    if (labelMatRef.current) {
      labelMatRef.current.opacity = currentOpacity.current;
    }
  });

  // Small block for Divide mode
  if (isBlock) {
    return (
      <group ref={groupRef} position={targetPos}>
        <RoundedBox
          args={[0.38, 0.38, 0.18]}
          radius={0.06}
          smoothness={3}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            ref={matRef}
            color={boxColor}
            emissive={obj.glow ? new THREE.Color("#C1502E") : new THREE.Color(0x000000)}
            emissiveIntensity={obj.glow ? 0.8 : 0}
            transparent
            opacity={targetOpacity}
            roughness={0.28}
            metalness={0.08}
          />
        </RoundedBox>
      </group>
    );
  }

  // Hero Card Box (for numbers, variables, and operator machine)
  return (
    <group ref={groupRef} position={targetPos}>
      {/* Tactile Chamfered Box Base */}
      <RoundedBox
        args={[1.42, 0.78, 0.22]}
        radius={0.07}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          ref={matRef}
          color={boxColor}
          emissive={obj.glow ? new THREE.Color("#C1502E") : new THREE.Color(0x000000)}
          emissiveIntensity={obj.glow ? 0.8 : 0}
          transparent
          opacity={targetOpacity}
          roughness={0.3}
          metalness={0.08}
        />
      </RoundedBox>

      {/* Front Face Plane with Crisp HiDPI Card Texture */}
      {texture && (
        <mesh position={[0, 0, 0.113]}>
          <planeGeometry args={[1.36, 0.72]} />
          <meshBasicMaterial
            ref={labelMatRef}
            map={texture}
            transparent
            opacity={targetOpacity}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCENE ENVIRONMENT & LIGHTING
   ────────────────────────────────────────────────────────────────────────── */
interface SceneContentProps {
  step: TraceStep;
  reducedMotion: boolean;
}

function SceneContent({ step, reducedMotion }: SceneContentProps) {
  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 9, 6]} intensity={1.35} castShadow />
      <directionalLight position={[-6, 4, 3]} intensity={0.45} color="#FAF4ED" />
      <directionalLight position={[0, 6, -6]} intensity={0.65} color="#FFFFFF" />

      {/* Soft Contact Shadows on Ground */}
      <ContactShadows
        position={[0, -2.15, 0]}
        opacity={0.45}
        scale={14}
        blur={2.4}
        far={4.5}
        color="#5C4535"
      />

      {/* Elegant Faint Grid Floor */}
      <gridHelper
        args={[18, 24, "#D8C7B3", "#EFE5D8"]}
        position={[0, -2.16, 0]}
      />

      {/* Render all trace objects */}
      {step.objects.map((obj) => (
        <SceneBox key={obj.id} obj={obj} reducedMotion={reducedMotion} />
      ))}

      {/* Controlled Camera Orbit */}
      <OrbitControls
        target={[0, -0.15, 0]}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.72}
        minPolarAngle={Math.PI * 0.22}
        minDistance={4.0}
        maxDistance={12.5}
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
        camera={{ position: [0, 0.25, 7.8], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", background: "#FAF5EE" }}
        aria-label={ariaLabel}
        role="region"
      >
        <color attach="background" args={["#FAF5EE"]} />
        <SceneContent step={step} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
