"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

/**
 * ParticleField — Living galaxy background
 *
 * Three populations:
 *   1. Dense bright core   (15% of particles) — tight white/cyan cluster
 *   2. Spiral arm particles (70%) — 3 arms, arm-colored, fanning outward
 *   3. Halo cloud           (15%) — dim, scattered far particles for depth
 *
 * Behavior:
 *   - Slow galaxy rotation (y axis)
 *   - Disc tilt changes with scroll — feels like flying through space
 *   - Opacity breathes with sin wave
 *   - AdditiveBlending for that glowing star-field look
 */

const PARTICLE_COUNT = 5000;
const ARM_COUNT      = 3;

// Per-arm palette
const ARM_INNER_COLORS = [
  new THREE.Color("#23bcfe"),  // arm 0 — cyan
  new THREE.Color("#7c3aed"),  // arm 1 — purple
  new THREE.Color("#10b981"),  // arm 2 — emerald
];
const ARM_OUTER_COLORS = [
  new THREE.Color("#062840"),  // arm 0 — deep cyan
  new THREE.Color("#1a063e"),  // arm 1 — deep purple
  new THREE.Color("#062820"),  // arm 2 — deep emerald
];
const CORE_COLOR   = new THREE.Color("#d8f4ff");
const HALO_COLOR   = new THREE.Color("#0d0d22");

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const scroll    = useScroll();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);

    const coreCount  = Math.floor(PARTICLE_COUNT * 0.15);
    const haloCount  = Math.floor(PARTICLE_COUNT * 0.12);
    const armCount   = PARTICLE_COUNT - coreCount - haloCount;

    // ── Core ──────────────────────────────────────────────────────────────
    for (let i = 0; i < coreCount; i++) {
      const r     = Math.pow(Math.random(), 2) * 4.5; // bias toward center
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.18; // flatten
      const z = r * Math.cos(phi);

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const t   = Math.min(r / 4.5, 1);
      const col = new THREE.Color().lerpColors(CORE_COLOR, ARM_INNER_COLORS[0], t * 0.6);
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    // ── Spiral Arms ───────────────────────────────────────────────────────
    for (let i = 0; i < armCount; i++) {
      const idx   = coreCount + i;
      const arm   = i % ARM_COUNT;
      const armOffset = (arm / ARM_COUNT) * Math.PI * 2;

      // Log-spiral: angle = offset + k*ln(dist)
      const dist  = 5 + Math.pow(Math.random(), 1.4) * 24;
      const k     = 1.8; // spiral tightness
      const angle = armOffset + k * Math.log(dist / 5) + (Math.random() - 0.5) * 1.2;

      const x = Math.cos(angle) * dist + (Math.random() - 0.5) * 1.5;
      const y = (Math.random() - 0.5) * (0.6 + dist * 0.04); // puffier at edges
      const z = Math.sin(angle) * dist + (Math.random() - 0.5) * 1.5;

      positions[idx * 3]     = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = z;

      const t   = Math.min((dist - 5) / 24, 1);
      const col = new THREE.Color().lerpColors(ARM_INNER_COLORS[arm], ARM_OUTER_COLORS[arm], t);
      colors[idx * 3]     = col.r;
      colors[idx * 3 + 1] = col.g;
      colors[idx * 3 + 2] = col.b;
    }

    // ── Halo / Background stars ────────────────────────────────────────────
    for (let i = 0; i < haloCount; i++) {
      const idx = coreCount + armCount + i;
      const r   = 28 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);

      positions[idx * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[idx * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      positions[idx * 3 + 2] = r * Math.cos(phi);

      const c = 0.06 + Math.random() * 0.12;
      colors[idx * 3]     = c + Math.random() * 0.08;
      colors[idx * 3 + 1] = c;
      colors[idx * 3 + 2] = c + Math.random() * 0.12;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time         = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    // Slow galaxy rotation
    pointsRef.current.rotation.y = time * 0.007;

    // Disc tilt changes with scroll — fly-through illusion
    pointsRef.current.rotation.x = 0.22 + scrollOffset * 0.35;
    pointsRef.current.rotation.z = Math.sin(scrollOffset * Math.PI) * 0.08;

    // Breathing opacity
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.52 + Math.sin(time * 0.38) * 0.11;
  });

  return (
    <points ref={pointsRef} rotation={[0.22, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleField;
