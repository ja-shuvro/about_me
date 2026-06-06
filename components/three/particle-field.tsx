"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

/**
 * ParticleField — Living narrative background
 *
 * Morphs based on scroll:
 *   - Scroll = 0 (Hero): Chaotic, warm-colored (amber/red) high-entropy cloud
 *   - Scroll = 0.35 (About/Skills): Migrates and structures into a neat spiral galaxy
 *   - Scroll = 0.75 (Experience): High-speed stretch along Z-axis (warp speed trail / time-saving)
 *   - Scroll = 1.0 (Contact): Calm, stable cyan-dominated orbital rings
 */

const PARTICLE_COUNT = 4000;
const ARM_COUNT      = 3;

// Galaxy palette for structured state
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
const CORE_COLOR       = new THREE.Color("#d8f4ff");

// Helper lerp functions for arrays to keep it highly optimized
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const scroll    = useScroll();

  // Pre-generate the coordinates and colors for both states
  const data = useMemo(() => {
    const chaosPos = new Float32Array(PARTICLE_COUNT * 3);
    const chaosCol = new Float32Array(PARTICLE_COUNT * 3);
    const structPos = new Float32Array(PARTICLE_COUNT * 3);
    const structCol = new Float32Array(PARTICLE_COUNT * 3);

    const coreCount  = Math.floor(PARTICLE_COUNT * 0.15);
    const haloCount  = Math.floor(PARTICLE_COUNT * 0.12);
    const armCount   = PARTICLE_COUNT - coreCount - haloCount;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // ─── 1. POPULATE CHAOS STATE (Red/Orange/Amber random cloud) ───
      // Loose, highly active spherical shell
      const rChaos = 6 + Math.pow(Math.random(), 1.5) * 18;
      const thetaC = Math.random() * Math.PI * 2;
      const phiC   = Math.acos(2 * Math.random() - 1);
      
      chaosPos[i * 3]     = rChaos * Math.sin(phiC) * Math.cos(thetaC);
      chaosPos[i * 3 + 1] = rChaos * Math.sin(phiC) * Math.sin(thetaC) * 0.75; // slightly flattened
      chaosPos[i * 3 + 2] = rChaos * Math.cos(phiC);

      // Warm chaotic colors (fire/sparks)
      const isCoreChaos = Math.random() > 0.6;
      const rCol = isCoreChaos ? 0.95 : 0.85 + Math.random() * 0.15;
      const gCol = isCoreChaos ? 0.45 : 0.15 + Math.random() * 0.25;
      const bCol = isCoreChaos ? 0.1  : 0.02 + Math.random() * 0.08;
      chaosCol[i * 3]     = rCol;
      chaosCol[i * 3 + 1] = gCol;
      chaosCol[i * 3 + 2] = bCol;

      // ─── 2. POPULATE STRUCTURED STATE (Organized Galaxy) ───
      if (i < coreCount) {
        // Galaxy core
        const r     = Math.pow(Math.random(), 2.2) * 4.5;
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        
        structPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        structPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.18;
        structPos[i * 3 + 2] = r * Math.cos(phi);

        const t   = Math.min(r / 4.5, 1);
        const col = new THREE.Color().lerpColors(CORE_COLOR, ARM_INNER_COLORS[0], t * 0.6);
        structCol[i * 3]     = col.r;
        structCol[i * 3 + 1] = col.g;
        structCol[i * 3 + 2] = col.b;
      } 
      else if (i < coreCount + armCount) {
        // Spiral arms
        const armIdx    = i - coreCount;
        const arm       = armIdx % ARM_COUNT;
        const armOffset = (arm / ARM_COUNT) * Math.PI * 2;

        const dist  = 4 + Math.pow(Math.random(), 1.4) * 23;
        const k     = 1.8; // spiral tightness
        const angle = armOffset + k * Math.log(dist / 4) + (Math.random() - 0.5) * 1.1;

        structPos[i * 3]     = Math.cos(angle) * dist + (Math.random() - 0.5) * 1.2;
        structPos[i * 3 + 1] = (Math.random() - 0.5) * (0.5 + dist * 0.035);
        structPos[i * 3 + 2] = Math.sin(angle) * dist + (Math.random() - 0.5) * 1.2;

        const t   = Math.min((dist - 4) / 23, 1);
        const col = new THREE.Color().lerpColors(ARM_INNER_COLORS[arm], ARM_OUTER_COLORS[arm], t);
        structCol[i * 3]     = col.r;
        structCol[i * 3 + 1] = col.g;
        structCol[i * 3 + 2] = col.b;
      } 
      else {
        // Ambient halo
        const r     = 24 + Math.random() * 26;
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);

        structPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        structPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
        structPos[i * 3 + 2] = r * Math.cos(phi);

        const c = 0.05 + Math.random() * 0.1;
        structCol[i * 3]     = c + Math.random() * 0.05;
        structCol[i * 3 + 1] = c;
        structCol[i * 3 + 2] = c + Math.random() * 0.08;
      }
    }

    return { chaosPos, chaosCol, structPos, structCol };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time         = state.clock.elapsedTime;
    const scrollOffset = scroll.offset; // 0 to 1

    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = geom.getAttribute("color") as THREE.BufferAttribute;

    // ─── STAGE 1: MORPH CHAOS -> STRUCTURED ───
    // Morph happens rapidly in the first 35% of the scroll
    const morphT = Math.min(scrollOffset / 0.35, 1);
    const easeMorph = morphT * morphT * (3 - 2 * morphT); // smoothstep

    // ─── STAGE 2: CASE STUDIES SCANNER PLANE ───
    const csStart = 0.58;
    const csEnd = 0.75;
    let csT = 0;
    if (scrollOffset >= csStart && scrollOffset <= csEnd) {
      const normalizedCS = (scrollOffset - csStart) / (csEnd - csStart);
      csT = Math.sin(normalizedCS * Math.PI); // peak collapse in the middle
    }

    // ─── STAGE 3: WARP SPEED / EXPERIENCE STRETCH ───
    // Experience timeline sits at scroll ~ 0.75 to 0.88
    const speedStart = 0.75;
    const speedEnd = 0.88;
    let speedT = 0;
    if (scrollOffset > speedStart && scrollOffset < speedEnd) {
      const normalizedT = (scrollOffset - speedStart) / (speedEnd - speedStart);
      speedT = Math.sin(normalizedT * Math.PI); // peak warp speed in the middle
    }

    const { chaosPos, chaosCol, structPos, structCol } = data;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // 1. Interpolate position
      let x = lerp(chaosPos[i * 3], structPos[i * 3], easeMorph);
      let y = lerp(chaosPos[i * 3 + 1], structPos[i * 3 + 1], easeMorph);
      let z = lerp(chaosPos[i * 3 + 2], structPos[i * 3 + 2], easeMorph);

      // 2. Interpolate color
      let r = lerp(chaosCol[i * 3], structCol[i * 3], easeMorph);
      let g = lerp(chaosCol[i * 3 + 1], structCol[i * 3 + 1], easeMorph);
      let b = lerp(chaosCol[i * 3 + 2], structCol[i * 3 + 2], easeMorph);

      // 3. Flatten particles into 2D scan plane during Case Studies section
      if (csT > 0) {
        y = lerp(y, 0, csT * 0.82); // collapse y toward 0
        // Shift colors slightly towards purple/magenta scan laser tones
        r = lerp(r, 0.65, csT * 0.45);
        g = lerp(g, 0.33, csT * 0.45);
        b = lerp(b, 0.95, csT * 0.45);
      }

      // 4. Apply Speed warp stretch along Z-axis (Optimization phase)
      if (speedT > 0) {
        // Stretch proportional to the particle's relative depth
        const stretchAmount = speedT * 18 * (1 + (i % 6) * 0.6);
        z -= stretchAmount;
        
        // Boost brightness to represent energy data streams
        r = Math.min(r + speedT * 0.4, 1.0);
        g = Math.min(g + speedT * 0.3, 1.0);
        b = Math.min(b + speedT * 0.5, 1.0);
      }

      posAttr.setXYZ(i, x, y, z);
      colAttr.setXYZ(i, r, g, b);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // Slow rotation
    // Accelerate rotation during the speed phase to make the space feel active
    const rotSpeed = 0.006 + speedT * 0.055;
    pointsRef.current.rotation.y = time * rotSpeed;

    // Dynamic tilt based on scroll
    pointsRef.current.rotation.x = 0.20 + scrollOffset * 0.35;
    pointsRef.current.rotation.z = Math.sin(scrollOffset * Math.PI) * 0.06;

    // Opacity breathing
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.50 + Math.sin(time * 0.32) * 0.12;
  });

  return (
    <points ref={pointsRef} rotation={[0.2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={new Float32Array(PARTICLE_COUNT * 3)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={new Float32Array(PARTICLE_COUNT * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleField;
