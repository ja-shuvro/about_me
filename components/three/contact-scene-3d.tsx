"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * ContactScene3D — Glowing portal ring + floating decorative elements
 * Position: centered, close-up — camera zooms in for final section
 */
const ContactScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const portalRef = useRef<THREE.Mesh>(null);
  const portal2Ref = useRef<THREE.Mesh>(null);
  const portal3Ref = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    if (groupRef.current) {
      // Visible in section 6 (contact)
      const sectionStart = 6 / 7;
      const visibility = Math.max(0, Math.min(1, (scrollOffset - sectionStart) * 7));
      groupRef.current.scale.setScalar(visibility);
    }

    // Portal ring rotation
    if (portalRef.current) {
      portalRef.current.rotation.z = time * 0.5;
      portalRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    }
    if (portal2Ref.current) {
      portal2Ref.current.rotation.z = -time * 0.3;
      portal2Ref.current.rotation.y = Math.cos(time * 0.2) * 0.3;
    }
    if (portal3Ref.current) {
      portal3Ref.current.rotation.x = time * 0.2;
      portal3Ref.current.rotation.z = Math.sin(time * 0.4) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Main portal ring */}
      <mesh ref={portalRef}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#23bcfe" transparent opacity={0.8} />
      </mesh>

      {/* Second ring — tilted */}
      <mesh ref={portal2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.8, 0.012, 16, 100]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.5} />
      </mesh>

      {/* Third ring — opposite tilt */}
      <mesh ref={portal3Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[2.1, 0.008, 16, 100]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} />
      </mesh>

      {/* Central glow core */}
      <Float speed={2} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#23bcfe"
            emissive="#23bcfe"
            emissiveIntensity={2}
            metalness={0.8}
            roughness={0.1}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Inner glow halo */}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color="#23bcfe"
            transparent
            opacity={0.05}
            depthWrite={false}
          />
        </mesh>
      </Float>

      {/* Orbiting small elements */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <Float key={i} speed={2 + i * 0.3} floatIntensity={0.5} rotationIntensity={0.3}>
            <mesh position={[Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0]}>
              <octahedronGeometry args={[0.05, 0]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#23bcfe" : "#7c3aed"}
                emissive={i % 2 === 0 ? "#23bcfe" : "#7c3aed"}
                emissiveIntensity={1.5}
              />
            </mesh>
          </Float>
        );
      })}

      {/* Portal light */}
      <pointLight position={[0, 0, 2]} color="#23bcfe" intensity={5} distance={10} />
      <pointLight position={[0, 0, -2]} color="#7c3aed" intensity={3} distance={8} />
    </group>
  );
};

export default ContactScene3D;
