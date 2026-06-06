"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * ContactScene3D — Visualizing the Perfect Stable System
 *
 * - Geodesic Core: An inner glowing cyan core inside a solid, clean wireframe icosahedron shell
 * - Concentric Rings: 3 glowing rings of light rotating in perfect mathematical synchronization
 * - Balanced Satellites: 8 small clean node shapes orbiting the core in perfect, orderly paths
 * - Visitor problem node: A chaotic amber node that orbits outside, accelerating on focus, and converging/stabilizing into the core on submit
 */
const ContactScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);
  
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  const visitorNodeRef = useRef<THREE.Mesh>(null);
  const visitorMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  const scroll = useScroll();

  // Interactive state tracking refs
  const formStatus = useRef<'idle' | 'focused' | 'submitted'>('idle');
  const visitorAngle = useRef(0);
  const lerpFactor = useRef(0);
  const coreFlash = useRef(0);
  const hasFlashed = useRef(false);

  useEffect(() => {
    const handleFocus = () => {
      if (formStatus.current !== 'submitted') {
        formStatus.current = 'focused';
      }
    };
    const handleBlur = () => {
      if (formStatus.current !== 'submitted') {
        formStatus.current = 'idle';
      }
    };
    const handleSubmit = () => {
      formStatus.current = 'submitted';
    };
    const handleReset = () => {
      formStatus.current = 'idle';
      lerpFactor.current = 0;
      coreFlash.current = 0;
      hasFlashed.current = false;
    };

    window.addEventListener("contact-form-focus", handleFocus);
    window.addEventListener("contact-form-blur", handleBlur);
    window.addEventListener("contact-form-submit", handleSubmit);
    window.addEventListener("contact-form-reset", handleReset);

    return () => {
      window.removeEventListener("contact-form-focus", handleFocus);
      window.removeEventListener("contact-form-blur", handleBlur);
      window.removeEventListener("contact-form-submit", handleSubmit);
      window.removeEventListener("contact-form-reset", handleReset);
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    // ─── SECTION 6: CONTACT (Active range ~0.88 to 1.0) ───
    const sectionStart = 0.88;
    
    // Scale up as we enter the contact section
    if (groupRef.current) {
      const visibility = Math.max(0, Math.min(1, (scrollOffset - sectionStart) * 8.33));
      groupRef.current.scale.setScalar(visibility);
      
      // Quiet, slow hover
      groupRef.current.position.y = Math.sin(time * 0.35) * 0.05;
    }

    // Stable, synchronized rotations
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.15;
    }
    if (outerWireRef.current) {
      outerWireRef.current.rotation.y = -time * 0.08;
      outerWireRef.current.rotation.x = time * 0.05;
    }

    // Rings rotating in perfect harmony
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.08;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.05;
    }

    // Orderly satellite orbits
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.z = time * 0.18;
    }

    // ─── VISITOR PROBLEM NODE ANIMATION ───
    if (groupRef.current && groupRef.current.scale.x > 0.1) {
      const status = formStatus.current;

      // 1. Orbit calculation (speeds up when focused or submitted)
      const orbitSpeed = status === 'focused' ? 2.5 : (status === 'submitted' ? 4.5 : 0.8);
      visitorAngle.current += orbitSpeed * delta;

      // Orbit radius - collapses on submit
      const baseRadius = 2.4;
      if (status === 'submitted') {
        lerpFactor.current = Math.min(1.0, lerpFactor.current + delta * 0.72); // merges in ~1.4 seconds
        if (lerpFactor.current >= 0.98 && !hasFlashed.current) {
          coreFlash.current = 1.0; // Trigger core flash
          hasFlashed.current = true;
        }
      }
      const radius = baseRadius * (1.0 - lerpFactor.current);

      if (visitorNodeRef.current) {
        // Orbital ellipse path with vertical wiggle
        const xVal = Math.cos(visitorAngle.current) * radius;
        const yVal = Math.sin(visitorAngle.current) * radius * 0.7;
        const zVal = Math.sin(visitorAngle.current * 1.5) * 0.3 * radius;

        // Jitter spikes on focus, fades as it stabilizes
        const jitterIntensity = status === 'focused' ? 0.08 : (status === 'submitted' ? 0.05 * (1.0 - lerpFactor.current) : 0.015);
        const noiseX = (Math.random() - 0.5) * jitterIntensity;
        const noiseY = (Math.random() - 0.5) * jitterIntensity;
        const noiseZ = (Math.random() - 0.5) * jitterIntensity;

        visitorNodeRef.current.position.set(xVal + noiseX, yVal + noiseY, zVal + noiseZ);

        // Shrink node as it merges
        const scaleVal = lerpFactor.current >= 0.98 ? 0 : 0.75 * (1.0 - lerpFactor.current);
        visitorNodeRef.current.scale.setScalar(scaleVal);
      }

      // 2. Interpolate visitor node colors from amber/orange to cyan/white
      if (visitorMaterialRef.current) {
        const c1 = new THREE.Color("#ea580c"); // unstable orange
        const c2 = new THREE.Color("#23bcfe"); // stabilized cyan
        const currentColor = new THREE.Color().lerpColors(c1, c2, lerpFactor.current);
        visitorMaterialRef.current.color.copy(currentColor);
        visitorMaterialRef.current.emissive.copy(currentColor);
        visitorMaterialRef.current.emissiveIntensity = 2.0 + lerpFactor.current * 8.0;
      }

      // 3. Core flash decay
      if (coreFlash.current > 0.01) {
        coreFlash.current -= delta * 1.6; // decays over 0.6 seconds
      }

      // Apply flash back to geodesic core emissiveIntensity
      if (coreRef.current) {
        const material = coreRef.current.material as THREE.MeshStandardMaterial;
        if (material) {
          material.emissiveIntensity = 2.5 + coreFlash.current * 7.5;
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]} scale={0}>
      
      {/* ══ Perfect Geodesic System Core ═════════════════════════════════════ */}
      <Float speed={1.2} floatIntensity={0.25} rotationIntensity={0.05}>
        {/* Solid glowing center core */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.32, 3]} />
          <meshStandardMaterial
            color="#23bcfe"
            emissive="#0284c7"
            emissiveIntensity={2.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Outer geodesic wireframe skin */}
        <mesh ref={outerWireRef}>
          <icosahedronGeometry args={[0.345, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#23bcfe"
            emissiveIntensity={1.2}
            wireframe
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Ambient halo aura */}
        <mesh>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshBasicMaterial
            color="#23bcfe"
            transparent
            opacity={0.06}
            depthWrite={false}
          />
        </mesh>
      </Float>

      {/* ══ Concentric Synchronized Rings ═════════════════════════════════════ */}
      {/* Inner ring — cyan */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.35, 0.015, 8, 80]} />
        <meshBasicMaterial color="#23bcfe" transparent opacity={0.65} />
      </mesh>

      {/* Mid ring — white */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.68, 0.01, 8, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      {/* Outer ring — purple */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 4, 0.5, 0]}>
        <torusGeometry args={[2.0, 0.008, 8, 80]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.25} />
      </mesh>

      {/* ══ Orderly Satellite Orbits (Balanced nodes) ════════════════════════ */}
      <group ref={orbitGroupRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 1.0;
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
              <octahedronGeometry args={[0.045, 0]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#23bcfe" : "#ffffff"}
                emissive={i % 2 === 0 ? "#23bcfe" : "#ffffff"}
                emissiveIntensity={1.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          );
        })}
      </group>

      {/* ══ Chaotic Visitor's Unresolved Problem Node (Orbits & Merges) ═══════ */}
      <mesh ref={visitorNodeRef}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial
          ref={visitorMaterialRef}
          color="#ea580c"
          emissive="#ea580c"
          emissiveIntensity={2.0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Stable Section Lights */}
      <pointLight position={[0, 0, 2.5]} color="#23bcfe" intensity={5} distance={10} />
      <pointLight position={[0, 0, -2.5]} color="#ffffff" intensity={3} distance={8} />

    </group>
  );
};

export default ContactScene3D;
