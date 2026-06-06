"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * AboutScene3D — 3 floating glass feature cards + code bracket decorations
 * Position: offset right and up from center
 */
const AboutScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Card positions
  const cardPositions: [number, number, number][] = [
    [4, 2.5, -2],
    [5.5, 1, -3],
    [4, -0.5, -2],
  ];

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    if (groupRef.current) {
      // Visible in section 1 (about)
      const sectionStart = 1 / 7;
      const sectionEnd = 2 / 7;
      const progress = (scrollOffset - sectionStart) / (sectionEnd - sectionStart);
      const visibility = Math.max(0, Math.min(1, progress < 0.5 ? progress * 2 : 2 - progress * 2));

      groupRef.current.children.forEach((child, i) => {
        // Staggered fade-in from the side
        const stagger = i * 0.15;
        const childVis = Math.max(0, Math.min(1, (visibility - stagger) * 3));
        child.position.x = cardPositions[i]?.[0]! + (1 - childVis) * 3;
        child.scale.setScalar(childVis);

        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          mat.transparent = true;
          mat.opacity = childVis * 0.8;
        }
      });

      // Gentle floating
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.1;
    }
  });

  const cardColors = ["#23bcfe", "#7c3aed", "#10b981"];

  return (
    <group ref={groupRef}>
      {cardPositions.map((pos, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh position={pos} rotation={[0, -0.3, 0]}>
            <boxGeometry args={[1.8, 1.2, 0.05]} />
            <meshStandardMaterial
              color={cardColors[i]}
              metalness={0.3}
              roughness={0.2}
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Glowing edge accent */}
          <mesh position={[pos[0] - 0.88, pos[1], pos[2]]}>
            <boxGeometry args={[0.04, 1.2, 0.06]} />
            <meshBasicMaterial color={cardColors[i]} transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}

      {/* Code bracket decoration < /> */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[6.5, 3.5, -4]}>
          <torusGeometry args={[0.3, 0.02, 8, 3]} />
          <meshBasicMaterial color="#23bcfe" transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

export default AboutScene3D;
