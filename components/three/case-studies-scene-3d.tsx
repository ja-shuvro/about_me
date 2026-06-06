"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * CaseStudiesScene3D — Visualizing Transformation: Problem → Strategy → Solution
 *
 * - Left State (Problem): Distorted, glitchy amber/red mesh representing system chaos
 * - Right State (Solution): Balanced, geometric, clean cyan wireframe grid representing resolved architecture
 * - Scanner: A vertical neon-white laser sweep travelling back and forth, representing strategy/research
 * - Metric Nodes: Small glowing spheres that pulse with intense emissive color when the laser passes them
 */
const CaseStudiesScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const problemRef = useRef<THREE.Mesh>(null);
  const solutionRef = useRef<THREE.Mesh>(null);
  
  const metric1Ref = useRef<THREE.Mesh>(null);
  const metric3Ref = useRef<THREE.Mesh>(null);

  const scroll = useScroll();

  // Positions of metric nodes
  const metrics = useMemo(() => [
    { pos: [-1.2, 1.2, -3.5] as [number, number, number], color: "#10b981", ref: metric1Ref, label: "ERP Integration" },
    { pos: [1.8, 0.8, -3.8] as [number, number, number], color: "#7c3aed", ref: metric3Ref, label: "Performance Boost" }
  ], []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    // ─── SECTION 4: CASE STUDIES (Active range ~0.58 to 0.75) ───
    const sectionStart = 0.58;
    const sectionEnd = 0.75;
    
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
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.08;
    }

    if (visibility > 0) {
      // 1. Scanner Laser sweep back and forth across X axis (-3.5 to 3.5)
      const sweepX = Math.sin(time * 1.5) * 3.2;
      if (scannerRef.current) {
        scannerRef.current.position.x = sweepX;
      }

      // 2. Animate chaotic problem core rotation + distort speed
      if (problemRef.current) {
        problemRef.current.rotation.y = time * 0.8;
        problemRef.current.rotation.z = time * 0.3;
      }

      // 3. Animate clean solution core rotation
      if (solutionRef.current) {
        solutionRef.current.rotation.y = -time * 0.25;
        solutionRef.current.rotation.x = time * 0.15;
      }

      // 4. Animate floating metric nodes and trigger pulse on scan crossover
      metrics.forEach((metric) => {
        const mesh = metric.ref.current;
        if (!mesh) return;

        // Pulse intensity based on proximity to sweepX
        const dist = Math.abs(mesh.position.x - sweepX);
        const pulse = dist < 0.65 ? Math.max(1, 3.5 - dist * 4) : 1;
        
        // Slow float
        mesh.position.y = metric.pos[1] + Math.sin(time * 0.8 + mesh.position.x) * 0.05;

        // Apply emissive intensity pulse
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material) {
          material.emissiveIntensity = 1.2 * pulse;
          mesh.scale.setScalar(0.8 + (pulse - 1) * 0.18);
        }
      });
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      
      {/* ══ PROBLEM STATE (Left) ═════════════════════════════════════════════ */}
      <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.1}>
        <group position={[-2.4, 0, -3.2]}>
          <mesh ref={problemRef}>
            <dodecahedronGeometry args={[0.7, 1]} />
            <MeshDistortMaterial
              color="#f59e0b"
              emissive="#b45309"
              emissiveIntensity={1.2}
              metalness={0.8}
              roughness={0.3}
              distort={0.48}
              speed={3.8}
            />
          </mesh>
          <mesh>
            <dodecahedronGeometry args={[0.73, 0]} />
            <meshBasicMaterial color="#ef4444" wireframe transparent opacity={0.15} />
          </mesh>
        </group>
      </Float>

      {/* ══ SOLUTION STATE (Right) ════════════════════════════════════════════ */}
      <Float speed={1.0} floatIntensity={0.25} rotationIntensity={0.05}>
        <group position={[2.4, 0, -3.2]}>
          <mesh ref={solutionRef}>
            <icosahedronGeometry args={[0.7, 2]} />
            <meshStandardMaterial
              color="#23bcfe"
              emissive="#0369a1"
              emissiveIntensity={1.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.76, 1]} />
            <meshStandardMaterial
              color="#10b981"
              wireframe
              metalness={0.8}
              roughness={0.1}
              transparent
              opacity={0.35}
            />
          </mesh>
        </group>
      </Float>

      {/* ══ SWEEPING LASER SCANNER (Vertical line + subtle light bar) ═════════ */}
      <mesh ref={scannerRef} position={[0, 0, -3.2]}>
        <boxGeometry args={[0.08, 4.8, 0.2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        {/* Glow helper */}
        <pointLight color="#23bcfe" intensity={6} distance={6} />
      </mesh>

      {/* ══ TRANSFORMATION BRIDGE LINES ══════════════════════════════════════ */}
      {/* Dynamic line connecting the two cores */}
      <mesh position={[0, 0, -3.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.005, 0.005, 4.8, 4]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.15} />
      </mesh>

      {/* ══ METRIC NODES (Floating along the scan path) ═══════════════════════ */}
      {metrics.map((metric, i) => (
        <mesh key={`metric-${i}`} ref={metric.ref} position={metric.pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={metric.color}
            emissive={metric.color}
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Section Lights */}
      <pointLight position={[-2.4, 1.5, -2]} color="#ef4444" intensity={3} distance={10} />
      <pointLight position={[2.4, -1.5, -2]} color="#10b981" intensity={3} distance={10} />

    </group>
  );
};

export default CaseStudiesScene3D;
