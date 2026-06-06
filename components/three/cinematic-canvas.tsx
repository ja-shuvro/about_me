"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  Environment,
  Preload,
  Stars,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import CameraRig, { TOTAL_SECTIONS } from "./camera-rig";
import ParticleField from "./particle-field";
import HeroScene3D from "./hero-scene-3d";
import AboutScene3D from "./about-scene-3d";
import SkillsScene3D from "./skills-scene-3d";
import ProjectsScene3D from "./projects-scene-3d";
import ExperienceScene3D from "./experience-scene-3d";
import ContactScene3D from "./contact-scene-3d";

/**
 * SceneContent — all 3D objects live inside ScrollControls
 */
const SceneContent = () => (
  <>
    <CameraRig />

    {/* ── Lighting ──────────────────────────────────────────────────────── */}
    {/* Deep-space ambient — barely anything, let emissives do the work */}
    <ambientLight intensity={0.04} color="#0a0a18" />
    {/* Sun-like directional rim */}
    <directionalLight
      position={[12, 20, 10]}
      intensity={0.18}
      color="#c8e0ff"
    />

    {/* ── Environment ───────────────────────────────────────────────────── */}
    {/* Night HDRI for PBR reflections on metallic surfaces */}
    <Environment preset="night" />

    {/* ── Deep Space Starfield ──────────────────────────────────────────── */}
    {/* Static background — inside the galaxy disc the ParticleField handles it */}
    <Stars
      radius={90}
      depth={60}
      count={4000}
      factor={3.5}
      saturation={0.4}
      fade
      speed={0.35}
    />

    {/* ── Cinematic Fog ─────────────────────────────────────────────────── */}
    {/* Color matches canvas background, near=15 keeps foreground clear */}
    <fog attach="fog" args={["#01010a", 14, 42]} />

    {/* ── Galaxy Particle Field ─────────────────────────────────────────── */}
    <ParticleField />

    {/* ── Section 3D Scenes ─────────────────────────────────────────────── */}
    <HeroScene3D />
    <AboutScene3D />
    <SkillsScene3D />
    <ProjectsScene3D />
    <ExperienceScene3D />
    <ContactScene3D />
  </>
);

/**
 * CinematicCanvas — master full-viewport WebGL stage
 */
const CinematicCanvas = () => (
  <div className="canvas-container">
    <Canvas
      camera={{
        fov: 54,
        near: 0.1,
        far: 130,
        position: [0, 0, 8],
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      style={{ background: "#01010a" }}
    >
      <Suspense fallback={null}>
        {/* ScrollControls — drives both HTML & 3D scroll offsets */}
        <ScrollControls pages={TOTAL_SECTIONS} damping={0.16} distance={1.05}>
          <Scroll>
            <SceneContent />
          </Scroll>
        </ScrollControls>

        {/* ── Post-Processing Stack ──────────────────────────────────── */}
        <EffectComposer multisampling={0}>

          {/* Bloom: punch out emissives to look like real lights */}
          <Bloom
            intensity={1.35}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.82}
            mipmapBlur
          />

          {/* Chromatic aberration: subtle lens distortion at edges */}
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0006, 0.0006)}
            radialModulation={false}
            modulationOffset={0}
          />

          {/* Vignette: darkens edges, focuses the eye to center */}
          <Vignette offset={0.22} darkness={0.78} eskil={false} />

        </EffectComposer>

        <Preload all />
      </Suspense>
    </Canvas>
  </div>
);

export default CinematicCanvas;
