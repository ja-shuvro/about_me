"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

// const HeroScene = dynamic(() => import("../three/HeroScene"), { ssr: false });

const Hero = () => {
  return (
    <section id="home" className="relative min-height-[100vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* <HeroScene /> */}
      
      {/* JSON-LD Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "J.A. Shuvro",
          "url": "https://jashuvro.dev",
          "jobTitle": "Flutter & Full-Stack Developer",
          "worksFor": { "@type": "Organization", "name": "Freelance" },
          "address": { "@type": "PostalAddress", "addressLocality": "Rajshahi", "addressCountry": "Bangladesh" },
          "knowsAbout": ["Flutter", "NestJS", "Next.js", "Laravel", "PostgreSQL", "React"],
          "sameAs": ["https://github.com/jashuvro", "https://linkedin.com/in/jashuvro"]
        }) }} 
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-medium text-text/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for Hire
          </div>

          {/* Label */}
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-accent/20 to-accent2/20 border border-accent/30 text-sm font-semibold text-accent tracking-wide uppercase">
            Flutter & Full-Stack Developer
          </div>

          {/* H1 */}
          <h1 className="text-5xl md:text-8xl font-black font-heading leading-[1.1] tracking-tight max-w-4xl">
            Crafting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2">
              Digital Excellence
            </span> <br />
            for the Future.
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted max-w-2xl mt-4 leading-relaxed">
            Experienced Flutter & Full-Stack Developer with a strong self-learning background 
            and real-world production experience. Skilled in building mobile and web 
            applications using Flutter, Laravel, React, Express.js, and Next.js.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a 
              href="#projects" 
              className="group px-8 py-4 rounded-xl bg-accent text-background font-bold flex items-center gap-2 hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(35,188,254,0.3)]"
            >
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-xl border border-border bg-surface/50 text-text font-bold hover:bg-surface transition-all hover:scale-105 active:scale-95"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/50"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;
