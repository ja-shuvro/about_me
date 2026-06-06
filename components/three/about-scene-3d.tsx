"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Float, Line } from "@react-three/drei";
import * as THREE from "three";

/**
 * AboutScene3D — Visualizing Analysis & Deconstruction
 *
 * - Architectural Grid: Flat horizontal wireframe plane scanned by a laser
 * - Laser Scanner: A moving neon-purple line sweeping across the grid
 * - Data Mapping: Floating nodes that form glowing lines of connection as they get scanned
 * - Glass feature cards: Floating cards on the right representing design principles
 */
const AboutScene3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  // Floating nodes to analyze
  const nodes = useMemo(() => {
    return [
      { pos: [1.2, 1.5, -4], size: 0.08 },
      { pos: [2.5, 0.5, -3], size: 0.06 },
      { pos: [0.8, -0.8, -4], size: 0.07 },
      { pos: [3.2, -0.2, -5], size: 0.05 },
      { pos: [1.8, -1.5, -3], size: 0.09 },
      { pos: [4.0, 1.8, -4.5], size: 0.06 },
    ];
  }, []);

  // Connection links between nodes
  const connections = useMemo(() => {
    return [
      { from: 0, to: 1 },
      { from: 1, to: 3 },
      { from: 0, to: 2 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 1, to: 4 },
    ];
  }, []);

  // Card details
  const cardPositions: [number, number, number][] = [
    [4.2, 2.3, -2],
    [5.5, 0.8, -3],
    [4.2, -0.7, -2],
  ];
  const cardColors = ["#23bcfe", "#7c3aed", "#10b981"];

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const scrollOffset = scroll.offset;

    // ─── SECTION 1: ABOUT (Active range ~0.12 to 0.25) ───
    const sectionStart = 0.12;
    const sectionEnd = 0.25;
    
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
      groupRef.current.position.z = -scrollOffset * 2;
      groupRef.current.scale.setScalar(visibility);
    }

    // ─── Sweep Laser Scanner back and forth ───
    if (scanLineRef.current && visibility > 0) {
      // Moves along the Z-axis between -1.5 and -6.5
      const zPos = -4 + Math.sin(time * 1.8) * 2.5;
      scanLineRef.current.position.z = zPos;
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      
      {/* ══ Flat Architectural Grid ══════════════════════════════════════════ */}
      <mesh position={[2, -2.2, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8, 12, 10]} />
        <meshBasicMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* ══ Moving Purple Laser Scanner Line ═════════════════════════════════ */}
      <mesh ref={scanLineRef} position={[2, -2.18, -4]}>
        <boxGeometry args={[10, 0.05, 0.08]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* ══ Analyzing Floating Data Nodes ════════════════════════════════════ */}
      {nodes.map((node, i) => (
        <Float key={`node-${i}`} speed={1.2 + i * 0.2} floatIntensity={0.4}>
          <mesh position={node.pos as [number, number, number]}>
            <sphereGeometry args={[node.size, 10, 10]} />
            <meshStandardMaterial
              color="#7c3aed"
              emissive="#7c3aed"
              emissiveIntensity={2.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}

      {/* ══ Connecting Light Threads (Mapping structure) ══════════════════════ */}
      {connections.map((conn, i) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        if (!fromNode || !toNode) return null;

        return (
          <Line
            key={`conn-${i}`}
            points={[
              fromNode.pos as [number, number, number],
              toNode.pos as [number, number, number],
            ]}
            color="#a855f7"
            lineWidth={0.8}
            transparent
            opacity={0.35}
          />
        );
      })}

      {/* ══ Glass Feature Cards ══════════════════════════════════════════════ */}
      {cardPositions.map((pos, i) => (
        <Float key={`card-${i}`} speed={1.4 + i * 0.3} rotationIntensity={0.1} floatIntensity={0.25}>
          <mesh position={pos} rotation={[0, -0.25, 0]}>
            <boxGeometry args={[1.9, 1.1, 0.04]} />
            <meshStandardMaterial
              color={cardColors[i]}
              metalness={0.4}
              roughness={0.15}
              transparent
              opacity={0.14}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Glowing edge indicator */}
          <mesh position={[pos[0] - 0.93, pos[1], pos[2]]}>
            <boxGeometry args={[0.035, 1.1, 0.05]} />
            <meshBasicMaterial color={cardColors[i]} transparent opacity={0.55} />
          </mesh>
        </Float>
      ))}

    </group>
  );
};

export default AboutScene3D;
