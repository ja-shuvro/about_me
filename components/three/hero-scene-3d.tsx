"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * HeroScene3D — Visualizing the Problem / System Chaos / Inefficiency
 *
 * - Core: Highly distorted, unstable glitching sphere (red/crimson) with high speed distortion
 * - Wireframe shells: 2 offset wireframe meshes rotating erratically at different speeds
 * - System: Scattered, disconnected pulsing amber/orange particles (raw problems / lost time)
 * - Orbitals: Severely misaligned, wobbling, broken rings representing inefficient workflows
 * - Lighting: Warm warning lights (crimson, orange) pulsing erratically
 */
const HeroScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shell1Ref = useRef<THREE.Mesh>(null);
  const shell2Ref = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  const problemNodesRef = useRef<THREE.Group>(null);

  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const scroll = useScroll();

  // Generate random data for chaotic problem nodes
  const nodeData = useMemo(() => {
    const data = [];
    const COUNT = 35;
    for (let i = 0; i < COUNT; i++) {
      // Random directions and speeds for erratic movement
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      
      const r = 2.4 + Math.random() * 1.8;
      const initialPos = dir.clone().multiplyScalar(r);

      data.push({
        initialPos,
        speed: 1.5 + Math.random() * 3,
        size: 0.04 + Math.random() * 0.09,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? "#f59e0b" : "#ef4444", // amber or red
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    // ── Group Fade & Push Back on Scroll ────────────────────────────────────
    // Disappear quickly as we scroll to the About (Analysis) phase
    if (groupRef.current) {
      const vis = Math.max(0, 1 - offset * 8.33); // fades out by scroll ~0.12
      groupRef.current.position.z = -offset * 8;
      groupRef.current.scale.setScalar(vis);
      
      // erratic drift
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.08;
    }

    // ── Unstable Chaotic Core ───────────────────────────────────────────────
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.35;
      coreRef.current.rotation.x = time * 0.18;
      
      // violent pulsing
      const pulse = 1.0 + Math.sin(time * 4.5) * 0.04;
      coreRef.current.scale.setScalar(pulse);
    }

    // ── Erratic Wireframe Shells ────────────────────────────────────────────
    if (shell1Ref.current) {
      shell1Ref.current.rotation.y = -time * 0.65;
      shell1Ref.current.rotation.z = time * 0.25;
    }
    if (shell2Ref.current) {
      shell2Ref.current.rotation.x = -time * 0.45;
      shell2Ref.current.rotation.y = time * 0.85;
    }

    // ── Misaligned, Wobbling Rings ──────────────────────────────────────────
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.x = Math.sin(time * 0.8) * 0.15;
      ringGroupRef.current.rotation.y = time * 0.1;
      ringGroupRef.current.rotation.z = Math.cos(time * 0.6) * 0.2;
    }

    // ── Chaotic Problem Nodes (Erratic Jitter) ──────────────────────────────
    if (problemNodesRef.current) {
      const children = problemNodesRef.current.children;
      nodeData.forEach((node, i) => {
        const mesh = children[i] as THREE.Mesh;
        if (!mesh) return;

        // Jitter position around initial point
        const wave = Math.sin(time * node.speed + node.phase);
        const noiseX = Math.sin(time * 8 + i) * 0.12;
        const noiseY = Math.cos(time * 9 + i) * 0.12;
        const noiseZ = Math.sin(time * 7 - i) * 0.12;

        mesh.position.x = node.initialPos.x + noiseX + Math.cos(time * 0.5 + node.phase) * 0.25;
        mesh.position.y = node.initialPos.y + noiseY + Math.sin(time * 0.4 + node.phase) * 0.25;
        mesh.position.z = node.initialPos.z + noiseZ + Math.sin(time * 0.6 + node.phase) * 0.25;

        // Pulse scale
        mesh.scale.setScalar(0.7 + wave * 0.3);
      });
    }

    // ── Pulsing Warning Lights ──────────────────────────────────────────────
    if (light1Ref.current) {
      light1Ref.current.intensity = 15 + Math.sin(time * 8) * 8; // high speed flickers
    }
    if (light2Ref.current) {
      light2Ref.current.intensity = 10 + Math.cos(time * 6) * 5;
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* ══ Unstable Glitching Core ══════════════════════════════════════════ */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.38, 4]} />
        <MeshDistortMaterial
          color="#991b1b"
          emissive="#450a0a"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.2}
          distort={0.65} // high distortion
          speed={4.5}    // violent distortion movement
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Chaotic Wireframe Shells */}
      <mesh ref={shell1Ref}>
        <icosahedronGeometry args={[1.42, 2]} />
        <meshBasicMaterial
          color="#ef4444"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      <mesh ref={shell2Ref}>
        <dodecahedronGeometry args={[1.48]} />
        <meshBasicMaterial
          color="#f59e0b"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* ══ Misaligned / Broken Orbital Rings ═════════════════════════════════ */}
      <group ref={ringGroupRef}>
        {/* Ring 1 - Tilted Orange */}
        <mesh rotation={[1.1, 0.4, 0.2]}>
          <torusGeometry args={[2.5, 0.015, 8, 80]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.4} />
        </mesh>

        {/* Ring 2 - Opposing Red */}
        <mesh rotation={[-0.8, -0.6, 0.5]}>
          <torusGeometry args={[3.0, 0.01, 8, 60]} />
          <meshBasicMaterial color="#dc2626" transparent opacity={0.3} />
        </mesh>

        {/* Ring 3 - Flat, wide Amber */}
        <mesh rotation={[0.2, 0.9, -0.4]}>
          <torusGeometry args={[3.6, 0.008, 6, 50]} />
          <meshBasicMaterial color="#d97706" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* ══ Chaotic Disconnected Problem Nodes ════════════════════════════════ */}
      <group ref={problemNodesRef}>
        {nodeData.map((node, i) => (
          <mesh key={i} position={node.initialPos.toArray()}>
            <sphereGeometry args={[node.size, 8, 8]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={2.0}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* ══ Warning Lights ═══════════════════════════════════════════════════ */}
      <pointLight ref={light1Ref} position={[2.5, 3.5, 2.5]} color="#ef4444" intensity={15} distance={15} />
      <pointLight ref={light2Ref} position={[-2.5, -3.5, -2.5]} color="#f97316" intensity={10} distance={15} />
      <pointLight position={[0, 0, 6]} color="#7f1d1d" intensity={4} distance={10} />
      
    </group>
  );
};

export default HeroScene3D;
