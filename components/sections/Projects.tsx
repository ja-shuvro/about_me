"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/projects";

const Projects = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 }
    }
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-4">Featured Projects</h2>
            <p className="text-lg text-muted max-w-xl">
              A showcase of my recent work across mobile apps, web platforms, and digital solutions.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={scrollPrev}
              className="p-4 rounded-full border border-border bg-surface hover:bg-accent hover:text-background transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext}
              className="p-4 rounded-full border border-border bg-surface hover:bg-accent hover:text-background transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {projects.map((project) => (
              <div key={project.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="h-full rounded-3xl bg-surface border border-border overflow-hidden group hover:border-accent/30 transition-all flex flex-col"
                >
                  <div className="aspect-video bg-background relative overflow-hidden">
                    {/* Image Placeholder with Gradient if image doesn't exist */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center">
                       <span className="text-accent/20 font-black text-4xl">{project.title[0]}</span>
                    </div>
                    {/* Actual Image would go here: <Image src={project.image} alt={project.title} fill /> */}
                    
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <a 
                        href={project.link}
                        className="px-6 py-2 rounded-full bg-accent text-background font-bold flex items-center gap-2 scale-90 group-hover:scale-100 transition-transform"
                      >
                        Details <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="text-xs font-bold text-accent uppercase tracking-widest mb-2">{project.category}</span>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] font-bold px-2 py-1 rounded bg-background border border-border text-text/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
