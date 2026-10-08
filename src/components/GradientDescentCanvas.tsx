"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface CanvasProps {
  ballPos: { x: number; z: number };
  trail: Point3D[];
  prefersReducedMotion: boolean;
  isInView?: boolean;
  onSetCustomPosition?: (x: number, z: number) => void;
}

// Loss function definition: f(x, z) = 0.32 * x^2 + 0.48 * z^2
export function calculateSurfaceHeight(x: number, z: number): number {
  return 0.32 * x * x + 0.48 * z * z;
}

function SceneContent({
  ballPos,
  trail,
  prefersReducedMotion,
  isInView,
  onSetCustomPosition,
}: CanvasProps) {
  const ballMeshRef = useRef<THREE.Mesh>(null);

  // Sync ball position with smooth updates
  useFrame(() => {
    if (isInView === false) return;
    if (ballMeshRef.current) {
      const currentY = calculateSurfaceHeight(ballPos.x, ballPos.z) + 0.14;
      ballMeshRef.current.position.set(ballPos.x, currentY, ballPos.z);
    }
  });

  // Generate smooth 3D loss surface geometry
  const { surfaceGeometry, wireframeGeometry } = useMemo(() => {
    const size = 5.2;
    const segments = 44;
    const geom = new THREE.PlaneGeometry(size, size, segments, segments);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const pz = pos.getZ(i);
      const py = calculateSurfaceHeight(px, pz);
      pos.setY(i, py);
    }
    geom.computeVertexNormals();

    const wireGeom = new THREE.WireframeGeometry(geom);
    return { surfaceGeometry: geom, wireframeGeometry: wireGeom };
  }, []);

  // Construct trajectory line from trail points
  const lineGeometry = useMemo(() => {
    if (trail.length < 2) return null;
    const points = trail.map((p) => new THREE.Vector3(p.x, p.y + 0.08, p.z));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [trail]);

  return (
    <>
      {/* Interactive Orbit Controls: enables click & drag rotation, scroll to zoom */}
      <OrbitControls
        makeDefault
        enableZoom={true}
        enablePan={false}
        autoRotate={!prefersReducedMotion}
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.15}
        minDistance={3.8}
        maxDistance={9.5}
        dampingFactor={0.08}
      />

      {/* Warm Ambient & Directional Lighting */}
      <ambientLight intensity={1.1} color="#FFF5EB" />
      <directionalLight position={[6, 8, 4]} intensity={1.4} color="#FFF8F0" />
      <directionalLight position={[-5, 4, -5]} intensity={0.6} color="#E07A5F" />
      <pointLight position={[0, 1.2, 0]} intensity={0.8} color="#C1502E" distance={6} />

      {/* Surface Mesh: Dark warm slate base with click-to-place support */}
      <mesh
        geometry={surfaceGeometry}
        onPointerDown={(e) => {
          e.stopPropagation();
          onSetCustomPosition?.(e.point.x, e.point.z);
        }}
      >
        <meshStandardMaterial
          color="#1F1B18"
          roughness={0.65}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Surface Wireframe: Warm Terracotta Grid Lines */}
      <lineSegments geometry={wireframeGeometry}>
        <lineBasicMaterial
          color="#C1502E"
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>

      {/* Subtle Coordinate Grid at ground level for spatial anchoring */}
      <gridHelper
        args={[5.6, 14, "#C1502E", "#3A332C"]}
        position={[0, -0.02, 0]}
      />

      {/* Minimum Target Marker (convergence goal) */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.16, 32]} />
        <meshBasicMaterial color="#E07A5F" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color="#F59E0B" side={THREE.DoubleSide} />
      </mesh>

      {/* Trajectory Trail */}
      {lineGeometry && (
        <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
          color: "#F59E0B",
          linewidth: 3,
        }))} />
      )}

      {/* Trail Step Nodes */}
      {trail.map((pt, idx) => (
        <mesh key={idx} position={[pt.x, pt.y + 0.08, pt.z]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial
            color={idx === 0 ? "#E07A5F" : idx === trail.length - 1 ? "#F59E0B" : "#FBBF24"}
          />
        </mesh>
      ))}

      {/* Descending Gradient Descent Ball */}
      <mesh ref={ballMeshRef}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#C1502E"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </>
  );
}

export default function GradientDescentCanvas(props: CanvasProps) {
  return (
    <div
      role="region"
      aria-label="3D gradient descent convex loss optimization simulation"
      className="w-full h-full min-h-[360px] sm:min-h-[420px] relative bg-[#1A1614] rounded-xl overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [4.5, 3.8, 5.0], fov: 46 }}
        dpr={[1, 2]}
        frameloop={props.isInView !== false ? "always" : "demand"}
        aria-hidden="true"
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#1A1614"]} />
        <SceneContent {...props} />
      </Canvas>

      {/* Minimal Legend Tag inside Canvas Viewport */}
      <div className="absolute top-3 left-3 bg-[#241F1C]/90 backdrop-blur-sm border border-[#3E352F] text-[#F1E2CF] px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#F59E0B] inline-block animate-pulse" />
        <span>Optimization Space: 3D Paraboloid</span>
      </div>

      <div className="absolute top-3 right-3 bg-[#241F1C]/90 backdrop-blur-sm border border-[#3E352F] text-[#E07A5F] px-2.5 py-1 rounded-md text-[10px] font-mono flex items-center gap-1.5 pointer-events-none">
        <span>✦ Drag to rotate • Click bowl to place ball</span>
      </div>

      <div className="absolute bottom-3 left-3 bg-[#241F1C]/90 backdrop-blur-sm border border-[#3E352F] text-[#D8CEBC] px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-3 pointer-events-none">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <span>Current Weights</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#E07A5F]" />
          <span>Global Minimum</span>
        </span>
      </div>
    </div>
  );
}
