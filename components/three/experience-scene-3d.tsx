"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * ExperienceScene3D — Visualizing Optimization, Speed & Time-Saving
 *
 * - Speed Tunnel: 45 glowing speed trails (rose and cyan) that fly past the camera along the Z-axis
 * - Milestones: Glowing nodes along the journey path, acting as steady logical stations
 * - Concept: Professional growth combined with performance optimization that saves time
 */

const MILESTONES = [
  { position: [3.5, 2.2, -4] as [number, number, number], color: "#23bcfe" },
  { position: [5.0, 0.8, -2] as [number, number, number], color: "#7c3aed" },
  { position: [3.2, -0.6, -3.5] as [number, number, number], color: "#10b981" },
  { position: [5.2, -2.0, -1.5] as [number, number, number], color: "#f59e0b" },
  { position: [3.8, -3.4, -3.0] as [number, number, number], color: "#f43f5e" },
];

const ExperienceScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const linesGroupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const nodesRef = useRef<(THREE.Mesh | null)[]>([]);

  // Pre-generate speed trails data
  const lineData = useMemo(() => {
    const data = [];
    const COUNT = 45;
    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.15;
      // Position speed lines in a circular tunnel around the camera sweep path
      const radius = 1.8 + Math.random() * 3.5;
      data.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * 25 - 20, // Spread from -20 to +5
        length: 1.5 + Math.random() * 3.8,
        speed: 0.18 + Math.random() * 0.22, // fast speeds
        color: Math.random() > 0.45 ? "#23bcfe" : "#f43f5e", // cyan or rose
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    // ─── SECTION 5: EXPERIENCE (Active range ~0.75 to 0.88) ───
    const sectionStart = 0.75;
    const sectionEnd = 0.88;
    
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
      groupRef.current.scale.setScalar(visibility);
    }

    // Pulse milestone nodes
    nodesRef.current.forEach((node, i) => {
      if (node) {
        const scale = 1 + Math.sin(time * 3 + i * 1.5) * 0.12;
        node.scale.setScalar(scale);
      }
    });

    // Animate speed lines Z position (warp speed effect)
    if (linesGroupRef.current && visibility > 0) {
      const children = linesGroupRef.current.children;
      lineData.forEach((line, i) => {
        const mesh = children[i] as THREE.Mesh;
        if (!mesh) return;
        
        // Translate towards camera
        mesh.position.z += line.speed * (1.2 + scrollOffset * 2.0); // accelerates with scroll
        
        // Reset and recycle lines when they go past camera view
        if (mesh.position.z > 6) {
          mesh.position.z = -20;
        }
      });
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      
      {/* ══ Warp Speed Tunnel Lines (Optimization) ═══════════════════════════ */}
      <group ref={linesGroupRef}>
        {lineData.map((line, i) => (
          <mesh key={`line-${i}`} position={[line.x, line.y, line.z]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, line.length, 4]} />
            <meshBasicMaterial 
              color={line.color} 
              transparent 
              opacity={0.35} 
            />
          </mesh>
        ))}
      </group>

      {/* ══ Milestone Stations along the Tunnel ══════════════════════════════ */}
      {MILESTONES.map((milestone, i) => (
        <Float key={`node-${i}`} speed={1.3} floatIntensity={0.25} rotationIntensity={0.1}>
          <group position={milestone.position}>
            {/* Core sphere */}
            <mesh ref={(el) => { nodesRef.current[i] = el; }}>
              <sphereGeometry args={[0.13, 16, 16]} />
              <meshStandardMaterial
                color={milestone.color}
                emissive={milestone.color}
                emissiveIntensity={1.8}
                metalness={0.7}
                roughness={0.1}
              />
            </mesh>
            {/* Outer glow aura */}
            <mesh>
              <sphereGeometry args={[0.26, 12, 12]} />
              <meshBasicMaterial
                color={milestone.color}
                transparent
                opacity={0.07}
                depthWrite={false}
              />
            </mesh>
            {/* Rotating rings around station node */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.22, 0.006, 8, 32]} />
              <meshBasicMaterial color={milestone.color} transparent opacity={0.3} />
            </mesh>
          </group>
        </Float>
      ))}

      {/* ══ Connection Lines between Milestone Nodes ═══════════════════════ */}
      {MILESTONES.slice(0, -1).map((milestone, i) => {
        const start = new THREE.Vector3(...milestone.position);
        const end = new THREE.Vector3(...MILESTONES[i + 1].position);
        const mid = start.clone().lerp(end, 0.5);
        mid.x -= 0.6; // curve path slightly outward
        
        return (
          <mesh key={`path-${i}`} position={mid.toArray()} rotation={[0, 0, Math.atan2(end.y - start.y, end.x - start.x)]}>
            <cylinderGeometry args={[0.003, 0.003, start.distanceTo(end), 4]} />
            <meshBasicMaterial color="#23bcfe" transparent opacity={0.15} />
          </mesh>
        );
      })}

      {/* Ambient Section Lighting */}
      <pointLight position={[3, 0, -2]} color="#f43f5e" intensity={3} distance={12} />
      <pointLight position={[5, -1, 0]} color="#23bcfe" intensity={2} distance={10} />
      
    </group>
  );
};

export default ExperienceScene3D;
