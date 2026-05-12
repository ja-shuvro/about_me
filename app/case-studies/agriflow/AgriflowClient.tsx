"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Check, 
  X, 
  Layout, 
  Database, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Package,
  ShieldCheck,
  Quote
} from "lucide-react";
import Link from "next/link";

const AgriflowClient = () => {
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
            <span className="text-accent/60">Case Study 01</span>
            <span>ERP Development</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest mb-6"
            >
              Enterprise Resource Planning · Agro Distribution
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black font-heading leading-tight mb-8"
            >
              Building an ERP That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                Grows With
              </span> the Business
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted font-light leading-relaxed max-w-3xl mb-12"
            >
              How a custom modular ERP system solved the &quot;all-or-nothing&quot; problem for a fast-growing 
              agricultural distribution company in Bangladesh.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border/50"
            >
              <div>
                <div className="text-[10px] uppercase text-green-400 font-bold tracking-widest mb-2">Developer</div>
                <div className="font-bold">J.A. Shuvro</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-green-400 font-bold tracking-widest mb-2">Client</div>
                <div className="font-bold">Agriflow BD</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-green-400 font-bold tracking-widest mb-2">Cost</div>
                <div className="font-bold">৳60,000 BDT</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-green-400 font-bold tracking-widest mb-2">Industry</div>
                <div className="font-bold">Agro / B2B</div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* The Problem Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-black font-heading mb-8">A Business Stuck in the Excel Era</h2>
              <p className="text-muted text-lg leading-relaxed mb-8">
                Agriflow was doing well — dealer network expanding, order volume rising. But their operations 
                were running on disconnected spreadsheets, WhatsApp messages, and manual record-keeping.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "📊", title: "Excel Chaos", desc: "Version conflicts and data loss." },
                  { icon: "📦", title: "No Stock Visibility", desc: "Uncertainty across warehouses." },
                  { icon: "🧾", title: "Billing Errors", desc: "Pricing mistakes in invoices." },
                  { icon: "🔒", title: "No Audit Trail", desc: "Zero accountability for changes." },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              {...fadeIn}
              className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2rem] relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-8 text-red-500/10">
                 <X size={120} />
               </div>
               <h3 className="text-red-500 font-black font-heading text-xl mb-6 uppercase tracking-widest">The Market Failure</h3>
               <p className="text-muted leading-relaxed mb-8">
                 Available ERPs were either too simple to handle complex dealer networks or so bloated that 
                 90% of features would never be used, carrying prohibitive upfront costs.
               </p>
               <ul className="space-y-4">
                  {["Paying for 20+ useless modules", "Months of complex setup", "Rigid, non-adaptable workflows"].map((text, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted">
                      <X size={16} className="text-red-500 shrink-0 mt-0.5" /> {text}
                    </li>
                  ))}
               </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Solution — Modular ERP */}
      <section className="py-24 bg-surface/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black font-heading mb-4">A Purpose-Built Modular ERP</h2>
            <p className="text-muted max-w-2xl mx-auto">Start with core operations, expand on demand. Enterprise power without the bloat.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck />, title: "IAM & Audit", desc: "Role-based access control with granular audit logging for every data change." },
              { icon: <Users />, title: "Dealer Onboarding", desc: "Full KYC with NID, trade license, and GPS-verified dealership locations." },
              { icon: <Package />, title: "Inventory Engine", desc: "Real-time stock tracking across multiple warehouses with auto-reorder alerts." },
              { icon: <ClipboardList />, title: "Sales & Invoicing", desc: "Automated sales orders, professional PDF invoicing, and dealer ledger tracking." },
              { icon: <BarChart3 />, title: "Analytics Engine", desc: "Metadata-driven report engine with instant PDF/Excel exports for management." },
              { icon: <Layout />, title: "Production BOM", desc: "Bill of Materials integration for raw material deduction during packaging." }
            ].map((mod, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-surface border border-border hover:border-green-500/50 transition-all"
              >
                <div className="text-green-500 mb-6 bg-green-500/10 w-12 h-12 rounded-xl flex items-center justify-center">
                  {mod.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{mod.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{mod.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-black font-heading uppercase tracking-widest text-muted mb-12">Technical Foundation</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["NestJS", "PostgreSQL", "Prisma", "Next.js", "Redis", "BullMQ", "AWS S3", "Tailwind"].map((tech) => (
                <span key={tech} className="px-6 py-3 rounded-xl bg-surface border border-border font-bold hover:border-green-500/50 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 p-12 md:p-20 rounded-[3rem] border border-green-500/20 relative">
             <Quote className="absolute right-12 top-12 text-green-500/5" size={160} />
             <div className="max-w-3xl relative z-10">
                <p className="text-3xl md:text-4xl font-black font-heading leading-tight mb-8 italic">
                  &quot;The real innovation was not in the technology. It was in understanding that a growing business 
                  does not need a full enterprise ERP on day one — it needs the right foundation.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 px-0 bg-green-500" />
                  <div className="text-sm font-bold uppercase tracking-widest text-muted">J.A. Shuvro, Lead Architect</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Results / Value */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-surface border border-border">
              <h3 className="text-xl font-bold mb-6 text-red-500 uppercase tracking-widest">Before Agriflow ERP</h3>
              <ul className="space-y-4">
                {["Stock unknown until physical count", "Manual billing disputes", "Reports took 4+ hours"].map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted">
                    <X size={18} className="text-red-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-surface border border-green-500/30">
              <h3 className="text-xl font-bold mb-6 text-green-500 uppercase tracking-widest">After Implementation</h3>
              <ul className="space-y-4">
                {["Real-time multi-warehouse stock", "Automated, precise invoicing", "Instant management reporting"].map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted">
                    <Check size={18} className="text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <Link 
            href="/case-studies/negmp"
            className="group inline-flex flex-col items-center gap-4 mb-20"
          >
            <span className="text-muted text-sm font-bold uppercase tracking-widest">Next Case Study</span>
            <span className="text-3xl md:text-5xl font-black font-heading group-hover:text-accent transition-colors">NEGMP: Satellite GIS Platform</span>
          </Link>
          
          <div className="pt-12 border-t border-border/50 text-muted text-sm">
            © 2026 J.A. Shuvro · Designed for Clarity and Scale
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgriflowClient;
