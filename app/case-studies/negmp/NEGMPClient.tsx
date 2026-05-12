"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Map, 
  Satellite, 
  Smartphone, 
  Database, 
  ShieldCheck, 
  Cpu,
  Globe,
  Layers,
  Zap,
  Wind,
  Droplets,
  ThermometerSun,
} from "lucide-react";
import Link from "next/link";

const NEGMPClient = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-background text-text min-h-screen selection:bg-accent/30 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#case-studies" className="group flex items-center gap-2 text-muted hover:text-accent transition-colors font-bold text-sm">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-muted">
            <span className="text-accent/60">Architectural Case Study</span>
            <span>Government Proposal</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent2/10 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest mb-6"
            >
              <Globe size={12} /> GIS · Remote Sensing · System Architecture
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black font-heading leading-tight mb-8"
            >
              NEGMP: Architecting for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2">
                250 Million Trees
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted font-light leading-relaxed max-w-3xl mb-12"
            >
              The government defined the vision. I designed the platform—bringing transparency, 
              accountability, and future-proof GIS infrastructure to national environmental monitoring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border/50"
            >
              <div>
                <div className="text-[10px] uppercase text-accent font-bold tracking-widest mb-2">Role</div>
                <div className="font-bold">Sole System Architect</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-accent font-bold tracking-widest mb-2">Timeline</div>
                <div className="font-bold">1 Day Design</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-accent font-bold tracking-widest mb-2">Status</div>
                <div className="font-bold text-yellow-400">Under Review</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-accent font-bold tracking-widest mb-2">Ministry</div>
                <div className="font-bold">Env. & Forests (BD)</div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* The Brief & Problem */}
      <section className="py-24 relative border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-black font-heading mb-6 tracking-tight">The Brief</h2>
              <p className="text-muted text-lg leading-relaxed mb-10">
                The Government of Bangladesh sought a GIS-integrated dashboard and mobile app to monitor 
                its electoral commitment: planting 250 million trees in five years. They defined 
                what they needed. My job was to design **how to build it**.
              </p>
              
              <h3 className="text-2xl font-black font-heading mb-4 text-red-500 uppercase tracking-tight">The Problem</h3>
              <p className="text-muted leading-relaxed mb-6">
                Historical reliance on manual, paper-based field reporting has led to inflated figures, 
                no GPS verification, and zero survival tracking. For a project of this scale, 
                this is a **structural accountability failure**.
              </p>
            </motion.div>
            
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[2.5rem] bg-surface border border-border relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-8 text-accent/5">
                 <ShieldCheck size={120} />
               </div>
               <h3 className="text-accent font-black font-heading text-xl mb-8 uppercase tracking-widest">My Contribution</h3>
               <div className="space-y-8">
                  <div>
                    <div className="text-accent font-bold mb-1">1. Full Technical Architecture</div>
                    <div className="text-sm text-muted">A coherent, deployable system from database schema to mobile app to satellite pipeline.</div>
                  </div>
                  <div>
                    <div className="text-accent font-bold mb-1">2. Future-Proof Modular Design</div>
                    <div className="text-sm text-muted">One platform, expandable indefinitely for any environmental program.</div>
                  </div>
                  <div>
                    <div className="text-accent font-bold mb-1">3. Domain-Informed Decisions</div>
                    <div className="text-sm text-muted">Ecological zones and offline-first constraints driven by field reality.</div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Core Principle — Universal GeoEntity Schema */}
      <section className="py-24 relative overflow-hidden bg-surface/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black font-heading mb-6">The Core Principle</h2>
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold uppercase tracking-widest mb-6">
              Universal GeoEntity Schema
            </div>
            <p className="text-xl text-muted font-light leading-relaxed">
              Instead of building a tree-specific schema, I designed a polymorphic spatial foundation 
              where every monitored object shares the same spatial infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Spatial Foundation", items: ["GPS Coordinates", "Multi-layer GeoJSON"] },
              { title: "Admin Hierarchy", items: ["Division → Union", "BBS Dataset Alignment"] },
              { title: "Verification Layer", items: ["Satellite NDVI Fields", "Immutable Audit Trail"] }
            ].map((box, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-surface border border-border text-center"
              >
                <h4 className="font-bold text-accent mb-4 uppercase tracking-widest text-xs">{box.title}</h4>
                <div className="space-y-2">
                  {box.items.map((item, j) => (
                    <div key={j} className="text-muted font-medium">{item}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Five Layers */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black font-heading mb-12 text-center uppercase tracking-widest">Designed Layers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: <Database />, t: "Backend", s: "NestJS + PostGIS", d: "Native spatial queries for national boundaries." },
              { icon: <Smartphone />, t: "Mobile", s: "Flutter Offline", d: "Designed for Barind Tract connectivity gaps." },
              { icon: <Layers />, t: "Dashboard", s: "Next.js + MapLibre", d: "Zero commercial API dependency." },
              { icon: <Satellite />, t: "Remote Sensing", s: "GEE + NDVI", d: "Satellite verification as ground truth." },
              { icon: <Zap />, t: "Security", s: "Keycloak OIDC", d: "Enterprise-grade role-based access control." }
            ].map((layer, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all flex flex-col"
              >
                <div className="text-accent mb-4">{layer.icon}</div>
                <h4 className="font-bold mb-1">{layer.t}</h4>
                <div className="text-[10px] font-bold text-accent2 uppercase tracking-widest mb-3">{layer.s}</div>
                <p className="text-xs text-muted leading-relaxed">{layer.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion Roadmap */}
      <section className="py-24 bg-surface/20 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black font-heading mb-4">Infrastructure for Growth</h2>
            <p className="text-muted max-w-2xl mx-auto font-light">
              Designing beyond the tree monitoring brief to create a national environmental monitoring system.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <ThermometerSun />, t: "Weather Network", d: "Temp, rainfall, and humidity by district." },
              { icon: <Droplets />, t: "Water Monitoring", d: "River levels & flood early warning." },
              { icon: <Map />, t: "Land Use Mapping", d: "Forest cover & agricultural land tracking." },
              { icon: <Wind />, t: "Air Quality", d: "PM2.5, CO2, and AQI by district." },
              { icon: <Globe />, t: "Wetland Tracking", d: "Wetland shrinkage and river course change." },
              { icon: <Cpu />, t: "Urban Heat Island", d: "City temp variation & green cover index." }
            ].map((mod, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-background border border-border hover:border-accent/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-background transition-all">
                    {mod.icon}
                  </div>
                  <h4 className="font-bold text-lg">{mod.t}</h4>
                </div>
                <p className="text-sm text-muted leading-relaxed">{mod.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Domain Knowledge Mattered */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
               <h2 className="text-3xl md:text-4xl font-black font-heading mb-8">Why Domain Knowledge Mattered</h2>
               <p className="text-muted text-lg leading-relaxed mb-6">
                 Rajshahi, where I live, is the proposed pilot region. The Barind Tract spanning Rajshahi, 
                 Chapai Nawabganj, Naogaon, and Natore is Bangladesh&apos;s most drought-stressed zone.
               </p>
               <p className="text-muted text-lg leading-relaxed">
                 The technical design respects the biological reality. Survival rate analytics were 
                 designed to track species performance by ecological zone—because a species that 
                 thrives in Natore&apos;s wetlands will fail in Naogaon&apos;s arid uplands.
               </p>
            </motion.div>
            
            <div className="space-y-4">
               {[
                 { t: "Ecological Mapping", d: "Species classification structured by regional zones." },
                 { t: "Resilient Capture", d: "Offline-first design driven by Barind connectivity gaps." },
                 { t: "Contextual Analytics", d: "Survival logic based on soil and riverbank erosion zones." }
               ].map((item, i) => (
                 <motion.div 
                   key={i} 
                   {...fadeIn}
                   transition={{ delay: i * 0.1 }}
                   className="p-6 rounded-2xl bg-surface border border-border"
                 >
                    <div className="text-accent font-black uppercase tracking-widest text-xs mb-2">{item.t}</div>
                    <div className="text-muted text-sm">{item.d}</div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Representation / Closing */}
      <footer className="py-32 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black font-heading mb-12">
            Designed to <span className="text-accent">Last</span>. <br />
            Designed to <span className="text-accent2">Grow</span>.
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-12 font-light">
             The government defined what it needed. I showed how to build it—and how to build it so 
             that it doesn&apos;t need to be rebuilt when the next program comes along.
          </p>
          <div className="mt-24 pt-12 border-t border-border/50 text-muted text-[10px] uppercase tracking-widest">
            © 2026 J.A. Shuvro · System Architect
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NEGMPClient;
