"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useScroll, Float } from "@react-three/drei";
import * as THREE from "three";

interface ProjectScreen {
  title: string;
  image: string;
  position: [number, number, number];
  rotation: [number, number, number];
}

const PROJECT_SCREENS: ProjectScreen[] = [
  { title: "Flirtmetrics", image: "/assets/flirtmetrics/thumbnail.png", position: [-6, 1.5, -3], rotation: [0, 0.4, 0] },
  { title: "ERP System", image: "/assets/erp/dashboard.png", position: [-4.5, 0, -2], rotation: [0, 0.3, 0] },
  { title: "AgriflowBD", image: "/assets/agriflowbd/thumbnail.png", position: [-3, -1, -1], rotation: [0, 0.2, 0] },
  { title: "Smart Prop Trader", image: "/assets/smartproptrader.png", position: [-5.5, -2, -2.5], rotation: [0, 0.35, 0] },
  { title: "Rent Sale BD", image: "/assets/rentsalebd.png", position: [-7, 0, -4], rotation: [0, 0.45, 0] },
  { title: "Student Square", image: "/assets/studentsquare.png", position: [-4, 2.5, -3.5], rotation: [0, 0.25, 0] },
  { title: "Weekly Success", image: "/assets/weeklysuccess.png", position: [-6.5, -1, -3.5], rotation: [0, 0.4, 0] },
];

/**
 * ProjectScreen3D — A single floating monitor screen displaying a project screenshot
 */
const ProjectScreenMesh = ({ project, index }: { project: ProjectScreen; index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Load texture
  const texture = useLoader(THREE.TextureLoader, project.image);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      // Gentle floating bob
      meshRef.current.position.y = project.position[1] + Math.sin(time * 0.5 + index * 0.8) * 0.15;
    }
  });

  return (
    <Float speed={0.8 + index * 0.1} rotationIntensity={0.05} floatIntensity={0.2}>
      <group position={project.position} rotation={project.rotation}>
        {/* Screen frame */}
        <mesh ref={meshRef}>
          <boxGeometry args={[2, 1.3, 0.05]} />
          <meshStandardMaterial
            color="#0d0d1a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Screen display — project screenshot */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.85, 1.15]} />
          <meshBasicMaterial map={texture} />
        </mesh>

        {/* Bottom bezel accent */}
        <mesh position={[0, -0.7, 0.01]}>
          <boxGeometry args={[2, 0.04, 0.06]} />
          <meshBasicMaterial color="#23bcfe" transparent opacity={0.5} />
        </mesh>

        {/* Glow behind screen */}
        <mesh ref={glowRef} position={[0, 0, -0.1]}>
          <planeGeometry args={[2.5, 1.8]} />
          <meshBasicMaterial
            color="#23bcfe"
            transparent
            opacity={0.03}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
};

/**
 * ProjectsScene3D — Array of floating monitor screens showing project screenshots
 * Position: offset left
 */
const ProjectsScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    const scrollOffset = scroll.offset;

    if (groupRef.current) {
      // Visible in section 3 (projects)
      const sectionStart = 3 / 7;
      const sectionEnd = 4 / 7;
      const progress = (scrollOffset - sectionStart) / (sectionEnd - sectionStart);
      const visibility = Math.max(0, Math.min(1, progress < 0.5 ? progress * 2 : 2 - progress * 2));

      groupRef.current.scale.setScalar(visibility);
    }
  });

  return (
    <group ref={groupRef}>
      {PROJECT_SCREENS.map((project, index) => (
        <ProjectScreenMesh key={project.title} project={project} index={index} />
      ))}

      {/* Accent lighting for project gallery */}
      <pointLight position={[-5, 2, 0]} color="#23bcfe" intensity={3} distance={12} />
      <pointLight position={[-4, -2, -1]} color="#7c3aed" intensity={2} distance={10} />
    </group>
  );
};

export default ProjectsScene3D;
