import dynamic from "next/dynamic";

// Dynamically import client-only components — no SSR for WebGL + GSAP
const CinematicCanvas = dynamic(
  () => import("@/components/three/cinematic-canvas"),
  { ssr: false }
);

const Header = dynamic(
  () => import("@/components/layout/Header"),
  { ssr: false }
);

const ScrollSections = dynamic(
  () => import("@/components/layout/scroll-sections"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative">
      {/* Fixed 3D Canvas Background */}
      <CinematicCanvas />

      {/* Navigation Header */}
      <Header />

      {/* HTML Content Overlay — scrolls over the 3D canvas */}
      <ScrollSections />
    </main>
  );
}
