"use client";

/**
 * OperatorScene — Premium 3D WebGL Scene for Episode 3.
 *
 * Redesigned with:
 *   - Elevated Y positions so nothing clips through the floor
 *   - Studio-quality 3-point lighting + Environment map (soft reflections)
 *   - Frosted-glass floor plane instead of debug grid
 *   - Polished PBR materials with subtle metalness
 *   - Smoother critically-damped spring interpolation
 *   - Better camera defaults (closer, higher FOV)
 */

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  ContactShadows,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import type { TraceStep, TraceObject } from "./trace";

/* ─────────────────────────────────────────────────────────────────────────────
   TEXTURE CACHE
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

    // Card background fill with soft gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    if (isTerracotta) {
      grad.addColorStop(0, "#D55A36");
      grad.addColorStop(1, "#B04020");
    } else if (isHighlight) {
      grad.addColorStop(0, "#F09060");
      grad.addColorStop(1, "#D86E42");
    } else if (isSand) {
      grad.addColorStop(0, "#EAE0D2");
      grad.addColorStop(1, "#D8CCB8");
    } else {
      // Cream
      grad.addColorStop(0, "#FEFBF6");
      grad.addColorStop(1, "#F0E8DA");
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(16, 16, 992, 480, 48);
    ctx.fill();

    // Subtle inner shadow / border
    ctx.strokeStyle = isTerracotta || isHighlight
      ? "rgba(255, 255, 255, 0.22)"
      : "rgba(160, 140, 115, 0.4)";
    ctx.lineWidth = 6;
    ctx.stroke();

    const hasValue = value !== undefined;
    const hasLabel = Boolean(label);

    // Operator glyph hero mode (machine center with only operator symbol)
    if (!hasValue && hasLabel) {
      ctx.fillStyle = isTerracotta ? "#FFFFFF" : "#1A1210";
      ctx.font = "bold 140px 'JetBrains Mono', monospace, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label!, 512, 256);
    } else {
      // Top label pill
      if (hasLabel) {
        ctx.font = "600 32px 'JetBrains Mono', monospace, sans-serif";
        const labelText = label!.toUpperCase();
        const textMetrics = ctx.measureText(labelText);
        const pillWidth = Math.max(textMetrics.width + 48, 120);
        const pillHeight = 50;
        const pillX = 512 - pillWidth / 2;
        const pillY = 68;

        ctx.fillStyle = isTerracotta || isHighlight
          ? "rgba(0, 0, 0, 0.16)"
          : "rgba(107, 96, 88, 0.1)";
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 25);
        ctx.fill();

        ctx.fillStyle = isTerracotta || isHighlight
          ? "#FFFFFF"
          : "#6B6058";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labelText, 512, pillY + pillHeight / 2 + 2);
      }

      // Hero value text with dynamic sizing
      if (hasValue) {
        const valStr = String(value);
        let fontSize = 100;
        if (valStr.length > 12) fontSize = 48;
        else if (valStr.length > 7) fontSize = 60;
        else if (valStr.length > 4) fontSize = 76;

        ctx.fillStyle = isTerracotta || isHighlight ? "#FFFFFF" : "#1A1210";
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
   FLOOR Y CONSTANT — all positions are rebased so nothing clips through
   ────────────────────────────────────────────────────────────────────────── */
const FLOOR_Y = -1.6;

/* ─────────────────────────────────────────────────────────────────────────────
   FROSTED GLASS FLOOR
   ────────────────────────────────────────────────────────────────────────── */
function FloorPlane() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, FLOOR_Y, 0]}
      receiveShadow
    >
      <circleGeometry args={[7, 64]} />
      <meshStandardMaterial
        color="#F0E6D6"
        roughness={0.85}
        metalness={0.02}
        transparent
        opacity={0.65}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SUBTLE GRID RING (decorative only — faint radial lines on floor)
   ────────────────────────────────────────────────────────────────────────── */
function FloorGrid() {
  return (
    <gridHelper
      args={[12, 16, "#DDD0C0", "#E8DED0"]}
      position={[0, FLOOR_Y + 0.001, 0]}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   REMAP OBJECT POSITIONS — clamp Y so nothing goes below floor
   ────────────────────────────────────────────────────────────────────────── */
function remapPosition(raw: [number, number, number] | undefined): [number, number, number] {
  if (!raw) return [0, 0.6, 0];
  const [x, y, z] = raw;
  // Shift everything up: original positions used y = -2 which fell through
  // We remap: original 0.45 → 0.8, original -1.1 → -0.4, original -1.95 → -1.0
  // Simple linear transform: newY = y * 0.65 + 0.5
  const newY = Math.max(y * 0.6 + 0.55, FLOOR_Y + 0.25);
  return [x, newY, z];
}

/* ─────────────────────────────────────────────────────────────────────────────
   3D SCENE BOX WITH SPRING INTERPOLATION
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

  // Remap position to stay above floor
  const remappedPos = useMemo(
    () => remapPosition(obj.position),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [obj.position?.[0], obj.position?.[1], obj.position?.[2]]
  );

  const targetPos = useMemo(
    () => new THREE.Vector3(...remappedPos),
    [remappedPos]
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

  // Spring state
  const currentPos = useRef(targetPos.clone());
  const currentScale = useRef(targetScale.clone().multiplyScalar(0.75));
  const currentOpacity = useRef(0);
  const floatOffset = useRef(Math.random() * Math.PI * 2);

  // Texture
  const texture = useMemo(() => {
    if (isBlock) return null;
    return getOrCreateLabelTexture(obj.label, obj.value, obj.color);
  }, [isBlock, obj.label, obj.value, obj.color]);

  // Color mapping — slightly richer palette
  const boxColor = useMemo(() => {
    switch (obj.color) {
      case "terracotta":
        return new THREE.Color("#C45030");
      case "highlight":
        return new THREE.Color("#E8956B");
      case "sand":
        return new THREE.Color("#DDD0BC");
      case "cream":
        return new THREE.Color("#F0E5D5");
      case "dim":
      default:
        return new THREE.Color("#9A8A7E");
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
        matRef.current.emissiveIntensity = obj.glow ? 0.6 : 0;
      }
      if (labelMatRef.current) {
        labelMatRef.current.opacity = targetOpacity;
      }
      return;
    }

    // Critically damped spring with safe delta
    const safeDelta = Math.min(delta, 0.04);
    const lerpRate = 1 - Math.exp(-8.0 * safeDelta);

    currentPos.current.lerp(targetPos, lerpRate);
    currentScale.current.lerp(targetScale, lerpRate);
    currentOpacity.current += (targetOpacity - currentOpacity.current) * lerpRate;

    // Clamp Y to never go below floor
    currentPos.current.y = Math.max(currentPos.current.y, FLOOR_Y + 0.22);

    groupRef.current.position.copy(currentPos.current);
    groupRef.current.scale.copy(currentScale.current);

    // Gentle floating
    const hoverY = Math.sin(_state.clock.elapsedTime * 1.6 + floatOffset.current) * 0.015;
    groupRef.current.position.y += hoverY;

    // Subtle tilt on horizontal movement
    const vx = targetPos.x - currentPos.current.x;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -vx * 0.05,
      lerpRate
    );
    groupRef.current.rotation.x = Math.sin(
      _state.clock.elapsedTime * 1.4 + floatOffset.current
    ) * 0.008;

    // Material updates
    if (matRef.current) {
      matRef.current.opacity = currentOpacity.current;
      matRef.current.color.lerp(boxColor, lerpRate);

      if (obj.glow) {
        const pulse = 0.4 + 0.3 * Math.sin(_state.clock.elapsedTime * 2.8);
        matRef.current.emissiveIntensity = pulse;
      } else {
        matRef.current.emissiveIntensity *= 0.88;
        if (matRef.current.emissiveIntensity < 0.01) {
          matRef.current.emissiveIntensity = 0;
        }
      }
    }

    if (labelMatRef.current) {
      labelMatRef.current.opacity = currentOpacity.current;
    }
  });

  // Small block (Divide mode)
  if (isBlock) {
    return (
      <group ref={groupRef} position={targetPos}>
        <RoundedBox
          args={[0.34, 0.34, 0.16]}
          radius={0.06}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            ref={matRef}
            color={boxColor}
            emissive={obj.glow ? new THREE.Color("#C1502E") : new THREE.Color(0x000000)}
            emissiveIntensity={obj.glow ? 0.6 : 0}
            transparent
            opacity={targetOpacity}
            roughness={0.35}
            metalness={0.12}
            envMapIntensity={0.6}
          />
        </RoundedBox>
      </group>
    );
  }

  // Hero card box
  return (
    <group ref={groupRef} position={targetPos}>
      <RoundedBox
        args={[1.42, 0.78, 0.2]}
        radius={0.08}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          ref={matRef}
          color={boxColor}
          emissive={obj.glow ? new THREE.Color("#C1502E") : new THREE.Color(0x000000)}
          emissiveIntensity={obj.glow ? 0.6 : 0}
          transparent
          opacity={targetOpacity}
          roughness={0.32}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </RoundedBox>

      {/* Front face label texture */}
      {texture && (
        <mesh position={[0, 0, 0.102]}>
          <planeGeometry args={[1.34, 0.7]} />
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
      {/* Soft environment map for reflections (no HDRI file needed) */}
      <Environment preset="apartment" environmentIntensity={0.35} />

      {/* Studio 3-point lighting */}
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-5, 4, 2]} intensity={0.4} color="#FAF0E0" />
      <directionalLight position={[0, 5, -5]} intensity={0.5} color="#FFFFFF" />

      {/* Contact shadows on the floor */}
      <ContactShadows
        position={[0, FLOOR_Y + 0.01, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={4}
        color="#6B5540"
      />

      {/* Frosted floor */}
      <FloorPlane />
      <FloorGrid />

      {/* Render all trace objects */}
      {step.objects.map((obj) => (
        <SceneBox key={obj.id} obj={obj} reducedMotion={reducedMotion} />
      ))}

      {/* Camera controls */}
      <OrbitControls
        target={[0, 0.1, 0]}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.25}
        minDistance={3.5}
        maxDistance={10}
        enableDamping
        dampingFactor={0.08}
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
        camera={{ position: [0, 1.2, 6.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        shadows
        style={{ width: "100%", height: "100%", background: "#FAF5EE" }}
        aria-label={ariaLabel}
        role="region"
      >
        <color attach="background" args={["#FAF5EE"]} />
        <fog attach="fog" args={["#FAF5EE", 10, 20]} />
        <SceneContent step={step} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
