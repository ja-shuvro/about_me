import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

// Font — only used for body text; heading font is loaded via @font-face in CSS
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Dynamic import so cursor never SSR-s (it's client-only DOM)
const CinematicCursor = dynamic(() => import("@/components/CinematicCursor"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "J.A. Shuvro — Flutter & Full-Stack Developer",
  description:
    "Portfolio of J.A. Shuvro — Flutter & Full-Stack Engineer from Rajshahi, Bangladesh. " +
    "Specializing in NestJS, Next.js, Laravel, PostgreSQL, and mobile architecture.",
  metadataBase: new URL("https://jashuvro.com"),
  openGraph: {
    title: "J.A. Shuvro — Flutter & Full-Stack Developer",
    description:
      "Architecture-forward engineer building scalable systems from mobile to ERP.",
    url: "https://jashuvro.com",
    siteName: "J.A. Shuvro Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "J.A. Shuvro — Flutter & Full-Stack Developer",
    description: "Portfolio of J.A. Shuvro — Full-Stack & Mobile Engineer.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {/* Cinematic cursor — glowing dot + ring, hidden on touch */}
        <CinematicCursor />
        {children}
      </body>
    </html>
  );
}
