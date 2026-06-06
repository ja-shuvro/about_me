"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * HeroScene3D — Cinematic Organic Planet
 *
 * - Core: Distorted icosahedron planet (MeshDistortMaterial) — breathes & morphs
 * - Wireframe shell: structural grid overlay for tech feel
 * - Inner atmosphere: pulsing cyan haze
 * - Outer atmosphere: deep purple corona
 * - DNA Double Helix: 36-node double spiral orbiting the planet
 * - Orbital ring system: 4 rings at different inclinations
 * - 4 floating accent spheres
 * - 3 dynamic orbiting point lights + 1 fixed
 */
const HeroScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const atmos1Ref = useRef<THREE.Mesh>(null);
  const atmos2Ref = useRef<THREE.Mesh>(null);
  const atmos3Ref = useRef<THREE.Mesh>(null);
  const helixRef = useRef<THREE.Group>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const light3Ref = useRef<THREE.PointLight>(null);
  const scroll = useScroll();

  // ── DNA Helix geometry ──────────────────────────────────────────────────────
  const helixData = useMemo(() => {
    const strand1: [number, number, number][] = [];
    const strand2: [number, number, number][] = [];
    const connectors: { mid: [number, number, number] }[] = [];
    const COUNT = 40;
    const RADIUS = 2.7;
    const HEIGHT = 5.8;

    for (let i = 0; i < COUNT; i++) {
      const t = (i / COUNT) * Math.PI * 3.2; // ~1.6 full turns
      const y = (i / COUNT - 0.5) * HEIGHT;
      const p1: [number, number, number] = [Math.cos(t) * RADIUS, y, Math.sin(t) * RADIUS];
      const p2: [number, number, number] = [Math.cos(t + Math.PI) * RADIUS, y, Math.sin(t + Math.PI) * RADIUS];
      strand1.push(p1);
      strand2.push(p2);
      // connector every 4 nodes
      if (i % 4 === 0) {
        connectors.push({
          mid: [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, (p1[2] + p2[2]) / 2],
        });
      }
    }
    return { strand1, strand2, connectors };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const offset = scroll.offset;

    // ── Group: fade + push back on scroll ────────────────────────────────────
    if (groupRef.current) {
      const vis = Math.max(0, 1 - offset * 9);
      groupRef.current.position.z = -offset * 5;
      groupRef.current.scale.setScalar(0.55 + vis * 0.45);
      groupRef.current.rotation.y = time * 0.012; // very slow world-rotation
    }

    // ── Planet: breathing rotation ────────────────────────────────────────────
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.09;
      planetRef.current.rotation.z = Math.sin(time * 0.18) * 0.07;
      // Subtle scale breathing
      const breathScale = 1 + Math.sin(time * 0.6) * 0.018;
      planetRef.current.scale.setScalar(breathScale);
    }

    // ── Atmosphere shells: pulse ──────────────────────────────────────────────
    if (atmos1Ref.current) {
      const mat = atmos1Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.065 + Math.sin(time * 0.75) * 0.028;
      atmos1Ref.current.scale.setScalar(1 + Math.sin(time * 0.8) * 0.018);
    }
    if (atmos2Ref.current) {
      const mat = atmos2Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.028 + Math.sin(time * 0.5 + 1.2) * 0.012;
    }
    if (atmos3Ref.current) {
      const mat = atmos3Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.012 + Math.sin(time * 0.35 + 2.5) * 0.006;
      atmos3Ref.current.rotation.y = time * 0.04;
    }

    // ── Helix: rotate around planet ───────────────────────────────────────────
    if (helixRef.current) {
      helixRef.current.rotation.y = time * 0.22;
    }

    // ── Ring system: slow wobble ──────────────────────────────────────────────
    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.x = Math.sin(time * 0.14) * 0.06;
      ringGroupRef.current.rotation.z = Math.cos(time * 0.11) * 0.04;
    }

    // ── Dynamic orbiting lights ────────────────────────────────────────────────
    if (light1Ref.current) {
      light1Ref.current.position.set(
        Math.sin(time * 0.68) * 5.8,
        Math.cos(time * 0.48) * 3.8,
        Math.cos(time * 0.58) * 5.8
      );
      light1Ref.current.intensity = 8 + Math.sin(time * 1.4) * 2.5;
    }
    if (light2Ref.current) {
      light2Ref.current.position.set(
        Math.cos(time * 0.48 + 1.1) * 5.5,
        Math.sin(time * 0.65) * 3.8,
        Math.sin(time * 0.38) * 5.5
      );
      light2Ref.current.intensity = 6 + Math.sin(time * 0.95) * 1.8;
    }
    if (light3Ref.current) {
      light3Ref.current.position.set(
        Math.sin(time * 0.38 + 2.2) * 4.8,
        -2.5,
        Math.cos(time * 0.78) * 4.8
      );
      light3Ref.current.intensity = 3.5 + Math.sin(time * 1.1) * 1.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ══ Core Planet ══════════════════════════════════════════════════════ */}
      <mesh ref={planetRef}>
        <icosahedronGeometry args={[1.48, 8]} />
        <MeshDistortMaterial
          color="#080820"
          emissive="#14063e"
          emissiveIntensity={0.55}
          metalness={0.96}
          roughness={0.04}
          distort={0.32}
          speed={2.8}
          envMapIntensity={3.5}
        />
      </mesh>

      {/* Structural wireframe grid — tech overlay */}
      <mesh>
        <icosahedronGeometry args={[1.505, 3]} />
        <meshBasicMaterial
          color="#23bcfe"
          wireframe
          transparent
          opacity={0.055}
        />
      </mesh>

      {/* ══ Atmosphere Shells ════════════════════════════════════════════════ */}
      {/* Inner glow */}
      <mesh ref={atmos1Ref}>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial
          color="#23bcfe"
          transparent
          opacity={0.065}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      {/* Mid haze */}
      <mesh ref={atmos2Ref}>
        <sphereGeometry args={[2.55, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.028}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      {/* Outer corona */}
      <mesh ref={atmos3Ref}>
        <sphereGeometry args={[3.4, 32, 32]} />
        <meshBasicMaterial
          color="#0a2244"
          transparent
          opacity={0.012}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ══ DNA Double Helix ═════════════════════════════════════════════════ */}
      <group ref={helixRef}>
        {/* Strand 1 — Cyan */}
        {helixData.strand1.map((pos, i) => (
          <mesh key={`s1-${i}`} position={pos}>
            <sphereGeometry args={[0.058, 10, 10]} />
            <meshStandardMaterial
              color="#23bcfe"
              emissive="#23bcfe"
              emissiveIntensity={2.2}
              metalness={0.8}
              roughness={0.08}
            />
          </mesh>
        ))}

        {/* Strand 2 — Purple */}
        {helixData.strand2.map((pos, i) => (
          <mesh key={`s2-${i}`} position={pos}>
            <sphereGeometry args={[0.058, 10, 10]} />
            <meshStandardMaterial
              color="#7c3aed"
              emissive="#7c3aed"
              emissiveIntensity={2.2}
              metalness={0.8}
              roughness={0.08}
            />
          </mesh>
        ))}

        {/* Cross-connectors — Amber bridge dots */}
        {helixData.connectors.map(({ mid }, i) => (
          <mesh key={`c-${i}`} position={mid}>
            <sphereGeometry args={[0.022, 6, 6]} />
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.75} />
          </mesh>
        ))}
      </group>

      {/* ══ Orbital Ring System ══════════════════════════════════════════════ */}
      <group ref={ringGroupRef}>
        {/* Primary equatorial ring */}
        <mesh rotation={[Math.PI * 0.09, 0, Math.PI * 0.04]}>
          <torusGeometry args={[2.62, 0.009, 16, 220]} />
          <meshBasicMaterial color="#23bcfe" transparent opacity={0.58} />
        </mesh>

        {/* Tilted ring — purple */}
        <mesh rotation={[Math.PI / 2.7, 0.72, 0.1]}>
          <torusGeometry args={[3.12, 0.006, 16, 200]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.4} />
        </mesh>

        {/* Angled ring — amber */}
        <mesh rotation={[Math.PI / 4.8, -0.62, Math.PI / 3.2]}>
          <torusGeometry args={[3.65, 0.004, 16, 200]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.28} />
        </mesh>

        {/* Outermost ring — emerald */}
        <mesh rotation={[0.45, Math.PI / 3.5, 0.82]}>
          <torusGeometry args={[4.25, 0.003, 16, 200]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* ══ Floating Accent Spheres ═══════════════════════════════════════════ */}
      <Float speed={2.8} rotationIntensity={0.5} floatIntensity={1.4}>
        <mesh position={[3.1, 1.3, 0.9]}>
          <sphereGeometry args={[0.105, 16, 16]} />
          <meshStandardMaterial
            color="#23bcfe"
            emissive="#23bcfe"
            emissiveIntensity={3.5}
          />
        </mesh>
      </Float>
      <Float speed={1.9} rotationIntensity={0.4} floatIntensity={1.8}>
        <mesh position={[-3.0, -0.9, 1.3]}>
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={3.5}
          />
        </mesh>
      </Float>
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={2.2}>
        <mesh position={[0.9, 3.2, -0.6]}>
          <sphereGeometry args={[0.072, 16, 16]} />
          <meshStandardMaterial
            color="#f43f5e"
            emissive="#f43f5e"
            emissiveIntensity={3.5}
          />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-0.6, -3.2, 1.1]}>
          <sphereGeometry args={[0.062, 16, 16]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={3.5}
          />
        </mesh>
      </Float>

      {/* ══ Lighting ═════════════════════════════════════════════════════════ */}
      <pointLight ref={light1Ref} color="#23bcfe" intensity={8} distance={24} />
      <pointLight ref={light2Ref} color="#7c3aed" intensity={6} distance={22} />
      <pointLight ref={light3Ref} color="#10b981" intensity={3.5} distance={15} />
      {/* Warm floor fill */}
      <pointLight position={[0, -5, 3]} color="#f59e0b" intensity={2.2} distance={14} />
      {/* Rim light */}
      <pointLight position={[0, 0, 7]} color="#ffffff" intensity={1.2} distance={10} />
    </group>
  );
};

export default HeroScene3D;
