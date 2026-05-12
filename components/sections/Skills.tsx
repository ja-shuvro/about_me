"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    name: "Frontend",
    skills: ["Flutter", "React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3"]
  },
  {
    name: "Backend",
    skills: ["Laravel", "Express.js", "NestJS", "REST API Development"]
  },
  {
    name: "Database",
    skills: ["MongoDB", "MySQL", "Prisma", "Sequelize", "Mongoose"]
  },
  {
    name: "Tools",
    skills: ["WordPress Development", "Git", "GitHub"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black font-heading mb-4"
          >
            My Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted max-w-2xl mx-auto"
          >
            A collection of technologies and tools I work with to build robust 
            and scalable digital solutions.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {skillCategories.flatMap(cat => cat.skills).map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(35, 188, 254, 0.1)",
                borderColor: "rgba(35, 188, 254, 0.5)",
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15,
                delay: index * 0.05 
              }}
              className="px-6 py-3 rounded-2xl bg-surface border border-border text-text font-bold cursor-default flex items-center gap-2 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-accent" />
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
