"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float, Line } from "@react-three/drei";
import * as THREE from "three";

// Tech stack split into two complementary strands
const STRAND_A = [
  "Flutter", "React.js", "Next.js", "Tailwind CSS", "HTML5", 
  "CSS3", "Git", "GitHub", "WordPress", "Riverpod"
];
const STRAND_B = [
  "Laravel", "Express.js", "NestJS", "REST API", "MongoDB", 
  "MySQL", "Prisma", "Sequelize", "Node.js", "Docker"
];

const STRAND_A_COLOR = "#23bcfe"; // Cyan for Frontend & UI Tools
const STRAND_B_COLOR = "#7c3aed"; // Purple for Backend & Systems
const BRIDGE_COLOR   = "#10b981"; // Emerald for integration/logic

/**
 * SkillsScene3D — Visualizing Structured Logic / The DNA of Code
 *
 * - Structure: Two parallel helical strands forming a stable DNA double-helix
 * - Connectors: Glowing green horizontal bridges connecting frontend/backend tech nodes
 * - Theme: Transition from chaos to order. Colors are clean cyan, purple, and emerald
 */
const SkillsScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const COUNT = STRAND_A.length;
  const HEIGHT = 5.2;
  const RADIUS = 2.4;

  // Compute double helix positions
  const helixData = useMemo(() => {
    const strand1 = [];
    const strand2 = [];
    const bridges = [];

    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2.8; // ~1.4 turns
      const y = ((i / COUNT) - 0.5) * HEIGHT;

      const p1: [number, number, number] = [Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS];
      const p2: [number, number, number] = [Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS];

      strand1.push({
        name: STRAND_A[i],
        pos: p1,
        color: STRAND_A_COLOR,
        size: 0.13 + (i % 3) * 0.015,
      });

      strand2.push({
        name: STRAND_B[i],
        pos: p2,
        color: STRAND_B_COLOR,
        size: 0.13 + (i % 3) * 0.015,
      });

      bridges.push({
        from: p1,
        to: p2,
      });
    }

    return { strand1, strand2, bridges };
  }, [COUNT]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    // ─── SECTION 2: SKILLS (Active range ~0.25 to 0.42) ───
    const sectionStart = 0.25;
    const sectionEnd = 0.42;
    
    let visibility = 0;
    if (scrollOffset >= sectionStart && scrollOffset <= sectionEnd) {
      const progress = (scrollOffset - sectionStart) / (sectionEnd - sectionStart);
      visibility = progress < 0.2 
        ? progress * 5                  // Fade in quickly
        : progress > 0.8 
          ? (1 - progress) * 5         // Fade out quickly at end
          : 1;                          // Stay visible in the middle
    } else if (scrollOffset > sectionEnd) {
      visibility = 0;
    }

    if (groupRef.current) {
      // Scale group and rotate stably to signify structured logic
      groupRef.current.scale.setScalar(visibility);
      groupRef.current.rotation.y = time * 0.18;
      
      // Gentle bounce
      groupRef.current.position.y = 3 + Math.sin(time * 0.4) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, 3, 0]} scale={0}>
      
      {/* ══ Central Helix Core Rod ═══════════════════════════════════════════ */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, HEIGHT, 8]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.12} />
      </mesh>

      {/* ══ Helix Strand 1 (Frontend/Tools) ═══════════════════════════════════ */}
      {helixData.strand1.map((node, i) => (
        <Float key={`s1-${i}`} speed={1 + i * 0.1} floatIntensity={0.15}>
          <mesh position={node.pos}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.2}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
          {/* Subtle Outer Glow */}
          <mesh position={node.pos}>
            <sphereGeometry args={[node.size * 2, 8, 8]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.06} depthWrite={false} />
          </mesh>
        </Float>
      ))}

      {/* ══ Helix Strand 2 (Backend/Databases) ════════════════════════════════ */}
      {helixData.strand2.map((node, i) => (
        <Float key={`s2-${i}`} speed={1.1 + i * 0.1} floatIntensity={0.15}>
          <mesh position={node.pos}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.2}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
          {/* Subtle Outer Glow */}
          <mesh position={node.pos}>
            <sphereGeometry args={[node.size * 2, 8, 8]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.06} depthWrite={false} />
          </mesh>
        </Float>
      ))}

      {/* ══ DNA Bridge Connectors (Logic Links) ═══════════════════════════════ */}
      {helixData.bridges.map((bridge, i) => (
        <Line
          key={`bridge-${i}`}
          points={[bridge.from, bridge.to]}
          color={BRIDGE_COLOR}
          lineWidth={0.8}
          transparent
          opacity={0.3}
        />
      ))}

      {/* ══ Ambient Section Lighting ═════════════════════════════════════════ */}
      <pointLight position={[0, 0, 0]} color="#10b981" intensity={4} distance={8} />
      <pointLight position={[0, HEIGHT/2, 2]} color="#23bcfe" intensity={2} distance={6} />
      <pointLight position={[0, -HEIGHT/2, -2]} color="#7c3aed" intensity={2} distance={6} />

    </group>
  );
};

export default SkillsScene3D;
