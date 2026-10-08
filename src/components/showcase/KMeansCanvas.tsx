"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export interface ClusterPoint {
  x: number;
  y: number;
  z: number;
  cluster: 0 | 1 | 2;
}

// 36 deterministic points distributed in 3 3D clusters
export const CLUSTER_POINTS: ClusterPoint[] = [
  // Cluster 0: Centered around [-1.7, 0.4, -1.0] (Terracotta)
  { x: -1.7, y: 0.4, z: -1.0, cluster: 0 },
  { x: -2.1, y: 0.6, z: -0.8, cluster: 0 },
  { x: -1.4, y: 0.2, z: -1.3, cluster: 0 },
  { x: -1.9, y: 0.8, z: -1.2, cluster: 0 },
  { x: -1.5, y: 0.5, z: -0.6, cluster: 0 },
  { x: -2.2, y: 0.3, z: -1.1, cluster: 0 },
  { x: -1.3, y: 0.7, z: -0.9, cluster: 0 },
  { x: -1.8, y: 0.1, z: -1.4, cluster: 0 },
  { x: -1.6, y: 0.9, z: -0.7, cluster: 0 },
  { x: -2.0, y: 0.4, z: -1.5, cluster: 0 },
  { x: -1.4, y: 0.6, z: -1.1, cluster: 0 },
  { x: -1.7, y: 0.3, z: -0.8, cluster: 0 },

  // Cluster 1: Centered around [1.8, 0.8, -0.4] (Amber)
  { x: 1.8, y: 0.8, z: -0.4, cluster: 1 },
  { x: 2.2, y: 1.0, z: -0.2, cluster: 1 },
  { x: 1.5, y: 0.6, z: -0.7, cluster: 1 },
  { x: 1.9, y: 1.2, z: -0.5, cluster: 1 },
  { x: 1.6, y: 0.7, z: -0.1, cluster: 1 },
  { x: 2.3, y: 0.8, z: -0.6, cluster: 1 },
  { x: 1.4, y: 0.9, z: -0.3, cluster: 1 },
  { x: 2.0, y: 0.5, z: -0.8, cluster: 1 },
  { x: 1.7, y: 1.1, z: -0.2, cluster: 1 },
  { x: 2.1, y: 0.7, z: -0.5, cluster: 1 },
  { x: 1.5, y: 1.0, z: -0.6, cluster: 1 },
  { x: 1.8, y: 0.6, z: -0.3, cluster: 1 },

  // Cluster 2: Centered around [0.1, -0.6, 1.4] (Teal / Sage)
  { x: 0.1, y: -0.6, z: 1.4, cluster: 2 },
  { x: -0.3, y: -0.4, z: 1.6, cluster: 2 },
  { x: 0.4, y: -0.8, z: 1.2, cluster: 2 },
  { x: 0.0, y: -0.3, z: 1.7, cluster: 2 },
  { x: 0.3, y: -0.7, z: 1.5, cluster: 2 },
  { x: -0.2, y: -0.5, z: 1.1, cluster: 2 },
  { x: 0.5, y: -0.4, z: 1.3, cluster: 2 },
  { x: -0.1, y: -0.9, z: 1.6, cluster: 2 },
  { x: 0.2, y: -0.5, z: 1.8, cluster: 2 },
  { x: -0.4, y: -0.7, z: 1.3, cluster: 2 },
  { x: 0.3, y: -0.6, z: 1.2, cluster: 2 },
  { x: 0.0, y: -0.8, z: 1.5, cluster: 2 },
];

// Exact centroid means computed from cluster points
function computeMean(points: ClusterPoint[], clusterId: 0 | 1 | 2) {
  const filtered = points.filter((p) => p.cluster === clusterId);
  const sum = filtered.reduce(
    (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y, z: acc.z + p.z }),
    { x: 0, y: 0, z: 0 }
  );
  return {
    x: sum.x / filtered.length,
    y: sum.y / filtered.length,
    z: sum.z / filtered.length,
  };
}

export const CLUSTER_MEANS = [
  computeMean(CLUSTER_POINTS, 0),
  computeMean(CLUSTER_POINTS, 1),
  computeMean(CLUSTER_POINTS, 2),
];

// Initial random initialization positions (Step 0)
const INITIAL_CENTROIDS = [
  { x: -0.4, y: 1.1, z: 0.3 },
  { x: 0.9, y: -1.0, z: -0.7 },
  { x: -1.1, y: -0.4, z: 1.1 },
];

export function getCentroidPositionsForStep(step: number) {
  // step ranges from 0 to 3
  if (step === 0) return INITIAL_CENTROIDS;

  const ratio = step === 1 ? 0.45 : step === 2 ? 0.82 : 1.0;

  return INITIAL_CENTROIDS.map((init, i) => {
    const target = CLUSTER_MEANS[i];
    return {
      x: init.x + (target.x - init.x) * ratio,
      y: init.y + (target.y - init.y) * ratio,
      z: init.z + (target.z - init.z) * ratio,
    };
  });
}

const CLUSTER_COLORS = {
  0: "#C1502E", // Terracotta
  1: "#D97706", // Amber
  2: "#0D9488", // Teal / Slate Cyan
};

interface KMeansCanvasProps {
  currentStep: number;
  prefersReducedMotion: boolean;
  isInView: boolean;
}

function KMeansScene({
  currentStep,
  prefersReducedMotion,
  isInView,
}: KMeansCanvasProps) {
  // Target positions based on current step
  const targetCentroids = useMemo(
    () => getCentroidPositionsForStep(currentStep),
    [currentStep]
  );

  // Smooth lerping positions
  const c0Pos = useRef(new THREE.Vector3(INITIAL_CENTROIDS[0].x, INITIAL_CENTROIDS[0].y, INITIAL_CENTROIDS[0].z));
  const c1Pos = useRef(new THREE.Vector3(INITIAL_CENTROIDS[1].x, INITIAL_CENTROIDS[1].y, INITIAL_CENTROIDS[1].z));
  const c2Pos = useRef(new THREE.Vector3(INITIAL_CENTROIDS[2].x, INITIAL_CENTROIDS[2].y, INITIAL_CENTROIDS[2].z));

  const c0MeshRef = useRef<THREE.Mesh>(null);
  const c1MeshRef = useRef<THREE.Mesh>(null);
  const c2MeshRef = useRef<THREE.Mesh>(null);

  const ring0Ref = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // Pause animation when offscreen
    if (!isInView) return;

    // Centroid lerping
    const lerpSpeed = prefersReducedMotion ? 1 : Math.min(delta * 4.5, 1);

    c0Pos.current.lerp(
      new THREE.Vector3(
        targetCentroids[0].x,
        targetCentroids[0].y,
        targetCentroids[0].z
      ),
      lerpSpeed
    );
    c1Pos.current.lerp(
      new THREE.Vector3(
        targetCentroids[1].x,
        targetCentroids[1].y,
        targetCentroids[1].z
      ),
      lerpSpeed
    );
    c2Pos.current.lerp(
      new THREE.Vector3(
        targetCentroids[2].x,
        targetCentroids[2].y,
        targetCentroids[2].z
      ),
      lerpSpeed
    );

    if (c0MeshRef.current) c0MeshRef.current.position.copy(c0Pos.current);
    if (c1MeshRef.current) c1MeshRef.current.position.copy(c1Pos.current);
    if (c2MeshRef.current) c2MeshRef.current.position.copy(c2Pos.current);

    if (ring0Ref.current) {
      ring0Ref.current.position.copy(c0Pos.current);
      ring0Ref.current.rotation.x += delta * 0.6;
      ring0Ref.current.rotation.y += delta * 0.8;
    }
    if (ring1Ref.current) {
      ring1Ref.current.position.copy(c1Pos.current);
      ring1Ref.current.rotation.x += delta * 0.5;
      ring1Ref.current.rotation.y += delta * 0.7;
    }
    if (ring2Ref.current) {
      ring2Ref.current.position.copy(c2Pos.current);
      ring2Ref.current.rotation.x += delta * 0.7;
      ring2Ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      {/* Interactive Orbit Controls */}
      <OrbitControls
        makeDefault
        enableZoom={true}
        enablePan={false}
        autoRotate={!prefersReducedMotion}
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.15}
        minDistance={4.2}
        maxDistance={10.0}
        dampingFactor={0.08}
      />

      {/* Lighting */}
      <ambientLight intensity={1.2} color="#FFF8F0" />
      <directionalLight position={[6, 8, 5]} intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[-6, 4, -4]} intensity={0.7} color="#E07A5F" />
      <pointLight position={[0, 0, 0]} intensity={0.6} color="#FBBF24" distance={8} />

      {/* Ground Coordinate Grid */}
      <gridHelper
        args={[7, 14, "#C1502E", "#3A332C"]}
        position={[0, -1.2, 0]}
      />

      {/* Point Cloud */}
      {CLUSTER_POINTS.map((pt, idx) => (
        <mesh key={idx} position={[pt.x, pt.y, pt.z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={CLUSTER_COLORS[pt.cluster]}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Centroid 0: Terracotta */}
      <mesh ref={c0MeshRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color="#C1502E"
          emissive="#8C3A20"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      <mesh ref={ring0Ref}>
        <torusGeometry args={[0.34, 0.02, 12, 32]} />
        <meshBasicMaterial color="#E07A5F" />
      </mesh>

      {/* Centroid 1: Amber */}
      <mesh ref={c1MeshRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color="#D97706"
          emissive="#78350F"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.34, 0.02, 12, 32]} />
        <meshBasicMaterial color="#FBBF24" />
      </mesh>

      {/* Centroid 2: Teal */}
      <mesh ref={c2MeshRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color="#0D9488"
          emissive="#115E59"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[0.34, 0.02, 12, 32]} />
        <meshBasicMaterial color="#2DD4BF" />
      </mesh>
    </>
  );
}

export default function KMeansCanvas(props: KMeansCanvasProps) {
  return (
    <Canvas
      camera={{ position: [5.2, 3.4, 5.0], fov: 42 }}
      frameloop={props.isInView ? "always" : "demand"}
      aria-hidden="true"
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full min-h-[360px] sm:min-h-[420px]"
    >
      <KMeansScene {...props} />
    </Canvas>
  );
}
