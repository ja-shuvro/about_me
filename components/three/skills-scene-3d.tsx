"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  "Flutter", "React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3",
  "Laravel", "Express.js", "NestJS", "REST API",
  "MongoDB", "MySQL", "Prisma", "Sequelize",
  "WordPress", "Git", "GitHub"
];

const SKILL_COLORS = [
  "#23bcfe", "#7c3aed", "#10b981", "#f59e0b", "#f43f5e",
  "#06b6d4", "#8b5cf6", "#22c55e", "#eab308", "#ec4899"
];

/**
 * SkillsScene3D — Skill names as orbiting 3D spheres in a helix arrangement
 * Position: above center
 */
const SkillsScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Calculate helix positions for each skill
  const skillPositions = useMemo(() => {
    return SKILLS.map((_, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 4; // 2 full turns
      const y = ((i / SKILLS.length) - 0.5) * 6; // Spread vertically
      const radius = 2.5 + Math.sin(i * 0.7) * 0.5;
      return {
        x: Math.cos(angle) * radius,
        y: y + 3, // Offset up for skills section
        z: Math.sin(angle) * radius,
        color: SKILL_COLORS[i % SKILL_COLORS.length],
        size: 0.12 + Math.random() * 0.08,
      };
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    if (groupRef.current) {
      // Visible in section 2 (skills)
      const sectionStart = 2 / 7;
      const sectionEnd = 3 / 7;
      const progress = (scrollOffset - sectionStart) / (sectionEnd - sectionStart);
      const visibility = Math.max(0, Math.min(1, progress < 0.5 ? progress * 2 : 2 - progress * 2));

      groupRef.current.scale.setScalar(visibility);

      // Slow rotation of the entire helix
      groupRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      {skillPositions.map((skill, i) => (
        <Float
          key={i}
          speed={1 + i * 0.1}
          rotationIntensity={0.2}
          floatIntensity={0.4}
        >
          <mesh position={[skill.x, skill.y - 3, skill.z]}>
            <sphereGeometry args={[skill.size, 16, 16]} />
            <meshStandardMaterial
              color={skill.color}
              emissive={skill.color}
              emissiveIntensity={0.8}
              metalness={0.6}
              roughness={0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Glow halo */}
          <mesh position={[skill.x, skill.y - 3, skill.z]}>
            <sphereGeometry args={[skill.size * 2, 8, 8]} />
            <meshBasicMaterial
              color={skill.color}
              transparent
              opacity={0.08}
              depthWrite={false}
            />
          </mesh>
        </Float>
      ))}

      {/* Central axis line */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 8, 8]} />
        <meshBasicMaterial color="#23bcfe" transparent opacity={0.15} />
      </mesh>

      {/* Accent light */}
      <pointLight position={[0, 3, 0]} color="#10b981" intensity={3} distance={12} />
    </group>
  );
};

export default SkillsScene3D;
