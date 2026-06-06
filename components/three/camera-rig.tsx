"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

/**
 * CameraRig — Cinematic camera orchestration
 *
 * Architecture:
 * - CatmullRom spline through 7 dramatic positions (one per section)
 * - CatmullRom spline through 7 look-at targets
 * - Breathing oscillation overlaid on top (subtle sine waves on x/y/z)
 * - Mouse parallax: ±0.55 x, ±0.4 y (feels like floating in space)
 * - Lerp factor uses exponential decay (frame-rate independent, buttery smooth)
 *
 * Section camera journey:
 *   0 Hero         — Straight face-on, close and intimate
 *   1 About        — Dramatic right sweep + upward angle
 *   2 Skills       — Bird's-eye from upper left
 *   3 Projects     — Hard left cinematic pan
 *   4 Case Studies — Way back, epic scale reveal
 *   5 Experience   — Tight right-side close-up
 *   6 Contact      — Slow dramatic zoom-in to center
 */

// ── Camera Position Path ────────────────────────────────────────────────────
const CAMERA_POSITIONS = [
  new THREE.Vector3(0,   0,    8.0),   // 0 Hero
  new THREE.Vector3(9.0, 4.0,  11.5),  // 1 About
  new THREE.Vector3(-2.5, 9.5, 13.5),  // 2 Skills
  new THREE.Vector3(-11, -1.2, 10.5),  // 3 Projects
  new THREE.Vector3(2.5, -3.5, 16.5),  // 4 Case Studies
  new THREE.Vector3(7.5, 1.8,  8.0),   // 5 Experience
  new THREE.Vector3(0,   0.5,  4.2),   // 6 Contact
];

// ── Look-At Path ────────────────────────────────────────────────────────────
const LOOK_AT_POINTS = [
  new THREE.Vector3(0,    0,   0),     // Hero: planet center
  new THREE.Vector3(3.5,  1.2, 0),    // About: right scene
  new THREE.Vector3(-1,   3.5, 0),    // Skills: sphere cluster
  new THREE.Vector3(-5.5, 0,   0),    // Projects: monitor gallery
  new THREE.Vector3(0,   -1.2, 0),    // Case Studies: wide
  new THREE.Vector3(3.5,  0,   0),    // Experience: timeline
  new THREE.Vector3(0,    0,   0),    // Contact: portal center
];

export const TOTAL_SECTIONS = 7;

const CameraRig = () => {
  const scroll    = useScroll();
  const { camera } = useThree();
  const mouseRef       = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const currentPos     = useRef(new THREE.Vector3(...CAMERA_POSITIONS[0].toArray()));
  const currentLookAt  = useRef(new THREE.Vector3());
  const targetLookAt   = useRef(new THREE.Vector3());

  // ── Build smooth splines ─────────────────────────────────────────────────
  const positionCurve = useMemo(
    () => new THREE.CatmullRomCurve3(CAMERA_POSITIONS, false, "catmullrom", 0.6),
    []
  );
  const lookAtCurve = useMemo(
    () => new THREE.CatmullRomCurve3(LOOK_AT_POINTS, false, "catmullrom", 0.5),
    []
  );

  // ── Mouse tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth)  * 2 - 1;
      mouseRef.current.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const offset = Math.max(0, Math.min(1, scroll.offset));
    const time   = state.clock.elapsedTime;

    // ── Smooth mouse (separate lerp so it's extra silky) ─────────────────
    mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.06;
    mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.06;

    // ── Spline sample ─────────────────────────────────────────────────────
    const targetPos  = positionCurve.getPoint(offset);
    const targetLook = lookAtCurve.getPoint(offset);

    // ── Breathing (alive feeling) ─────────────────────────────────────────
    // Frequencies chosen to avoid obvious periodicity
    const bX = Math.sin(time * 0.38) * 0.14 + Math.sin(time * 0.17) * 0.06;
    const bY = Math.cos(time * 0.31) * 0.10 + Math.cos(time * 0.23) * 0.04;
    const bZ = Math.sin(time * 0.26) * 0.07;

    // ── Mouse parallax ───────────────────────────────────────────────────
    targetPos.x += mouseRef.current.x * 0.55 + bX;
    targetPos.y += mouseRef.current.y * 0.40 + bY;
    targetPos.z += bZ;

    // ── Frame-rate independent exponential lerp ───────────────────────────
    // lerpFactor → 1 as delta → ∞ (never over-shoots)
    const smooth     = 1 - Math.pow(0.00035, delta);
    const lookSmooth = 1 - Math.pow(0.00028, delta);

    currentPos.current.lerp(targetPos, smooth);
    targetLookAt.current.lerp(targetLook, smooth);
    currentLookAt.current.lerp(targetLookAt.current, lookSmooth);

    // ── Cinematic Camera Roll (Banking on speed phases) ───────────────────
    const speedStart = 0.75;
    const speedEnd = 0.88;
    let roll = 0;
    if (offset >= speedStart && offset <= speedEnd) {
      const normalized = (offset - speedStart) / (speedEnd - speedStart);
      roll = Math.sin(normalized * Math.PI) * 0.18; // Peak roll roll (approx. 10 degrees)
    }
    const upVector = new THREE.Vector3(Math.sin(roll), Math.cos(roll), 0).normalize();
    camera.up.copy(upVector);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export default CameraRig;
export { TOTAL_SECTIONS as default_TOTAL_SECTIONS };
