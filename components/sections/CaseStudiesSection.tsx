"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Database, 
  LayoutPanelLeft, 
  Globe, 
  Smartphone, 
  LayoutGrid 
} from "lucide-react";
import { PROJECTS } from "@/lib/data/projects";

// Icon mapping to handle dynamic data
const IconMap: Record<string, any> = {
  Database: Database,
  LayoutPanelLeft: LayoutPanelLeft,
  Globe: Globe,
  Smartphone: Smartphone,
  LayoutGrid: LayoutGrid,
};

interface CaseStudiesSectionProps {
  featuredOnly?: boolean;
}

const CaseStudiesSection = ({ featuredOnly = false }: CaseStudiesSectionProps) => {
  const displayedProjects = featuredOnly 
    ? PROJECTS.filter(p => p.featured) 
    : PROJECTS;

  return (
    <section id="case-studies" className="py-24 bg-surface/10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black font-heading mb-6">Case Studies</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto font-light">
            Deep-dives into complex systems I&apos;ve architected and built to solve national-scale problems.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {displayedProjects.map((project, index) => {
            const PrimaryIcon = IconMap[project.icons.primary] || LayoutGrid;
            const SecondaryIcon = IconMap[project.icons.secondary] || Smartphone;
            
            // Handle colors dynamically
            const accentClass = project.accentColor === "green" 
              ? "group-hover:text-green-400" 
              : "group-hover:text-accent";
            const borderClass = project.accentColor === "green" 
              ? "hover:border-green-500/30" 
              : "hover:border-accent/30";
            const badgeClass = project.accentColor === "green" 
              ? "bg-green-500/10 border-green-500/20 text-green-400" 
              : "bg-accent/10 border-accent/20 text-accent";
            const glowClass = project.accentColor === "green" 
              ? "bg-green-500/5 group-hover:bg-green-500/10" 
              : "bg-accent/5 group-hover:bg-accent/10";
            const iconTextClass = project.accentColor === "green" 
              ? "text-green-500" 
              : "text-accent";
            const readMoreClass = project.accentColor === "green" 
              ? "hover:text-green-400" 
              : "hover:text-accent";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative rounded-[2.5rem] bg-surface border border-border p-8 md:p-10 overflow-hidden ${borderClass} transition-all flex flex-col`}
              >
                <div className={`absolute top-0 right-0 w-64 h-64 blur-3xl -z-10 ${glowClass} transition-colors`} />
                
                <div className="flex-1">
                  <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border ${badgeClass}`}>
                    {project.category}
                  </div>
                  <h3 className={`text-3xl font-black font-heading mb-4 leading-tight ${accentClass} transition-colors`}>
                    {project.title.split("<br />").map((text, i) => (
                      <span key={i}>{text}{i === 0 && <br />}</span>
                    ))}
                  </h3>
                  <p className="text-muted mb-8 leading-relaxed font-light">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background border border-border text-xs font-bold text-muted">
                      <PrimaryIcon size={14} className={iconTextClass} /> {project.tags[0]}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background border border-border text-xs font-bold text-muted">
                      <SecondaryIcon size={14} className={iconTextClass} /> {project.tags[1]}
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/case-studies/${project.slug}`}
                  className={`mt-auto inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-text ${readMoreClass} transition-colors`}
                >
                  Read Full Study <ArrowRight size={18} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Button - Only show on landing page when filtered */}
        {featuredOnly && (
          <div className="mt-16 text-center">
            <Link 
              href="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-surface border border-border text-muted font-bold hover:text-accent hover:border-accent/50 transition-all group"
            >
              View All Case Studies 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
