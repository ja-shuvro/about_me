"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * ExperienceScene3D — Glowing timeline path with milestone nodes
 * Position: right side
 */

const MILESTONES = [
  { position: [4, 2, -2] as [number, number, number], color: "#23bcfe" },
  { position: [5, 1, -1] as [number, number, number], color: "#7c3aed" },
  { position: [3.5, 0, -2.5] as [number, number, number], color: "#10b981" },
  { position: [5.5, -1, -1.5] as [number, number, number], color: "#f59e0b" },
  { position: [4, -2, -2] as [number, number, number], color: "#f43f5e" },
];

const ExperienceScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const nodesRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    if (groupRef.current) {
      // Visible in section 5 (experience)
      const sectionStart = 5 / 7;
      const sectionEnd = 6 / 7;
      const progress = (scrollOffset - sectionStart) / (sectionEnd - sectionStart);
      const visibility = Math.max(0, Math.min(1, progress < 0.5 ? progress * 2 : 2 - progress * 2));

      groupRef.current.scale.setScalar(visibility);
    }

    // Pulse milestone nodes
    nodesRef.current.forEach((node, i) => {
      if (node) {
        const scale = 1 + Math.sin(time * 2 + i * 1.2) * 0.15;
        node.scale.setScalar(scale);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Milestone nodes */}
      {MILESTONES.map((milestone, i) => (
        <Float key={i} speed={1.5} floatIntensity={0.3} rotationIntensity={0.1}>
          <group position={milestone.position}>
            {/* Core sphere */}
            <mesh ref={(el) => { nodesRef.current[i] = el; }}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color={milestone.color}
                emissive={milestone.color}
                emissiveIntensity={1.5}
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
            {/* Outer glow */}
            <mesh>
              <sphereGeometry args={[0.25, 12, 12]} />
              <meshBasicMaterial
                color={milestone.color}
                transparent
                opacity={0.08}
                depthWrite={false}
              />
            </mesh>
            {/* Ring around node */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.2, 0.008, 8, 32]} />
              <meshBasicMaterial color={milestone.color} transparent opacity={0.3} />
            </mesh>
          </group>
        </Float>
      ))}

      {/* Connecting lines between milestones */}
      {MILESTONES.slice(0, -1).map((milestone, i) => {
        const start = new THREE.Vector3(...milestone.position);
        const end = new THREE.Vector3(...MILESTONES[i + 1].position);
        const mid = start.clone().lerp(end, 0.5);
        mid.z -= 0.5; // Curve outward
        
        return (
          <mesh key={`line-${i}`} position={mid.toArray()}>
            <cylinderGeometry args={[0.003, 0.003, start.distanceTo(end), 4]} />
            <meshBasicMaterial color="#23bcfe" transparent opacity={0.15} />
          </mesh>
        );
      })}

      {/* Accent light */}
      <pointLight position={[4, 0, 0]} color="#f43f5e" intensity={2} distance={10} />
    </group>
  );
};

export default ExperienceScene3D;
