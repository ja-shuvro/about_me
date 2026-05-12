"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    date: "01/2025 - 08/2025",
    title: "Flutter & Full-Stack Developer",
    company: "Rigg Technologies",
    description: "Developed cross-platform mobile apps using Flutter and full-stack web apps with Laravel, Express.js, and React. Designed RESTful APIs and managed MongoDB/MySQL databases."
  },
  {
    date: "1.5 Years (Ongoing)",
    title: "Mobile App Specialist",
    company: "Freelance",
    description: "Delivered 10+ Android projects. Specialized in fluid UI/UX animations, REST API integration, and Riverpod/GetX state management."
  },
  {
    date: "2 Years",
    title: "Backend Engineer",
    company: "Freelance",
    description: "Engineered robust server-side logic using Nest.js and Express.js. Developed secure authentication systems and architected complex database schemas."
  },
  {
    date: "2 Years",
    title: "Frontend Web Developer",
    company: "Freelance",
    description: "Built 10+ web projects using React.js and Next.js. Focused on SEO-optimized, fast-loading, and responsive interfaces."
  },
  {
    date: "3 Years",
    title: "WordPress & Plugin Specialist",
    company: "Freelance",
    description: "Customized WordPress ecosystems by developing bespoke plugins and themes. Bridged CMS flexibility with custom PHP/Laravel logic."
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black font-heading mb-16 text-center">Professional Journey</h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[-4px] md:left-1/2 md:-translate-x-1/2 top-0 w-2 h-2 rounded-full bg-accent z-10 shadow-[0_0_10px_rgba(35,188,254,0.8)]" />

                <div className="md:w-1/2 flex flex-col md:px-12">
                  <span className="text-accent font-bold text-sm mb-2">{exp.date}</span>
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <span className="text-text/60 font-medium mb-4">{exp.company}</span>
                  <p className="text-muted leading-relaxed">{exp.description}</p>
                </div>
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
