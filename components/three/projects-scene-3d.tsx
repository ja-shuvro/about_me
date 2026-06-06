"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useScroll, Float, Line } from "@react-three/drei";
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

const DATA_HUB_POSITION: [number, number, number] = [0, 0, -6.5];
const PACKET_COLOR = "#23bcfe";

/**
 * ProjectScreenMesh — A single floating monitor screen with an animated data link
 */
const ProjectScreenMesh = ({ project, index }: { project: ProjectScreen; index: number }) => {
  const meshRef = useRef<THREE.Group>(null);
  const packetRef = useRef<THREE.Mesh>(null);

  // Load texture
  const texture = useLoader(THREE.TextureLoader, project.image);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Gentle bobbing for the screen group
    if (meshRef.current) {
      meshRef.current.position.y = project.position[1] + Math.sin(time * 0.45 + index * 0.7) * 0.12;
    }

    // Animate data packet traveling from Hub to Screen
    if (packetRef.current) {
      const travelSpeed = 0.5 + (index % 3) * 0.15;
      const t = (time * travelSpeed + (index * 0.18)) % 1.0;
      
      const start = DATA_HUB_POSITION;
      // account for the mesh floating y-coordinate
      const endY = project.position[1] + Math.sin(time * 0.45 + index * 0.7) * 0.12;
      
      packetRef.current.position.set(
        THREE.MathUtils.lerp(start[0], project.position[0], t),
        THREE.MathUtils.lerp(start[1], endY, t),
        THREE.MathUtils.lerp(start[2], project.position[2], t)
      );

      // Pulse packet scale
      packetRef.current.scale.setScalar(0.7 + Math.sin(time * 5 + index) * 0.3);
    }
  });

  return (
    <group>
      {/* ── Glowing Data Stream Line ── */}
      <Line
        points={[DATA_HUB_POSITION, project.position]}
        color="#23bcfe"
        lineWidth={0.6}
        transparent
        opacity={0.25}
      />

      {/* ── Traveling Data Packet (Spherical light) ── */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial
          color={PACKET_COLOR}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* ── Floating Screen Mesh ── */}
      <Float speed={0.8 + index * 0.1} rotationIntensity={0.06} floatIntensity={0.25}>
        <group ref={meshRef} position={[project.position[0], 0, project.position[2]]} rotation={project.rotation}>
          {/* Bezel frame */}
          <mesh>
            <boxGeometry args={[2.0, 1.3, 0.05]} />
            <meshStandardMaterial
              color="#0c0c1b"
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>

          {/* Screenshot Display */}
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[1.86, 1.16]} />
            <meshBasicMaterial map={texture} />
          </mesh>

          {/* Glowing blue accent bar on bottom edge */}
          <mesh position={[0, -0.68, 0.015]}>
            <boxGeometry args={[2.0, 0.03, 0.05]} />
            <meshBasicMaterial color="#23bcfe" transparent opacity={0.65} />
          </mesh>

          {/* Halo Glow behind screen */}
          <mesh position={[0, 0, -0.06]}>
            <planeGeometry args={[2.4, 1.7]} />
            <meshBasicMaterial
              color="#23bcfe"
              transparent
              opacity={0.03}
              depthWrite={false}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

/**
 * ProjectsScene3D — Core project layout with background data hub
 */
const ProjectsScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const hubTrackRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    if (groupRef.current) {
      // Visible in section 3 (projects, scroll range ~0.42 to 0.58)
      const sectionStart = 0.42;
      const sectionEnd = 0.58;
      
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

      groupRef.current.scale.setScalar(visibility);
    }

    if (hubTrackRef.current) {
      hubTrackRef.current.rotation.z = time * 0.6;
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      {/* ── Core Background Data Server/Hub ── */}
      <mesh position={DATA_HUB_POSITION}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#23bcfe"
          emissive="#23bcfe"
          emissiveIntensity={2.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Circular server data tracks */}
      <mesh ref={hubTrackRef} position={DATA_HUB_POSITION} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.55, 0.008, 8, 40]} />
        <meshBasicMaterial color="#23bcfe" transparent opacity={0.4} />
      </mesh>

      {/* Render screens */}
      {PROJECT_SCREENS.map((project, index) => (
        <ProjectScreenMesh key={project.title} project={project} index={index} />
      ))}

      {/* Lighting for projects gallery */}
      <pointLight position={[-5, 2.5, -2]} color="#23bcfe" intensity={4} distance={12} />
      <pointLight position={[-4, -2.5, -2]} color="#7c3aed" intensity={3} distance={10} />
      <pointLight position={DATA_HUB_POSITION} color="#23bcfe" intensity={3} distance={10} />
    </group>
  );
};

export default ProjectsScene3D;
