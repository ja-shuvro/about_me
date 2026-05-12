"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06060f);
    scene.fog = new THREE.Fog(0x06060f, 8, 20);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Objects
    // 1. TorusKnot
    const knotGeometry = new THREE.TorusKnotGeometry(1, 0.32, 180, 24, 2, 3);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.85,
      roughness: 0.1,
    });
    const torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
    scene.add(torusKnot);

    // 2. 2x Torus rings
    const ringGeometry = new THREE.TorusGeometry(1.8, 0.005, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.4,
    });
    
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring2.rotation.x = Math.PI / 2;
    scene.add(ring1, ring2);

    // 3. 2500 Particles
    const particlesCount = 2500;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const particleColors = [
      new THREE.Color(0x7c3aed),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xf97316),
      new THREE.Color(0xfbbf24),
    ];

    for (let i = 0; i < particlesCount; i++) {
      // Sphere distribution: r = 4 to 14
      const r = 4 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x7c3aed, 4);
    const pointLight2 = new THREE.PointLight(0x06b6d4, 4);
    const pointLight3 = new THREE.PointLight(0xf97316, 2);
    pointLight3.position.set(0, -5, 2);
    scene.add(pointLight1, pointLight2, pointLight3);

    // Mouse follow
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      // Rotations
      torusKnot.rotation.x += 0.004;
      torusKnot.rotation.y += 0.007;

      ring1.rotation.z += 0.002;
      ring2.rotation.z -= 0.002;

      // Lights orbit
      const time = Date.now() * 0.001;
      pointLight1.position.x = Math.sin(time * 0.7) * 3;
      pointLight1.position.y = Math.cos(time * 0.5) * 3;
      pointLight1.position.z = Math.cos(time * 0.3) * 3;

      pointLight2.position.x = Math.cos(time * 0.3) * 3;
      pointLight2.position.y = Math.sin(time * 0.5) * 3;
      pointLight2.position.z = Math.sin(time * 0.7) * 3;

      // Mouse follow camera
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frame);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      knotGeometry.dispose();
      knotMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default HeroScene;
