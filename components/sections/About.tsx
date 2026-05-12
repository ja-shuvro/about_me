"use client";

import { motion } from "framer-motion";
import { Code2, Monitor, Server } from "lucide-react";

const features = [
  {
    icon: <Code2 className="text-accent" size={32} />,
    title: "Clean Code",
    description: "I write semantic, efficiently organized code that is easy to maintain and scale, following industry best practices."
  },
  {
    icon: <Monitor className="text-accent2" size={32} />,
    title: "Responsive Design",
    description: "My applications are designed to look and function perfectly on everything from the smallest smartphones to the largest 4K monitors."
  },
  {
    icon: <Server className="text-green-400" size={32} />,
    title: "Performance",
    description: "I prioritize speed and optimization, ensuring that every millisecond is accounted for in the user experience."
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-8">About Me</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              I am a dedicated software engineer with a track record of delivering
              robust applications. From crafting pixel-perfect mobile interfaces with
              Flutter to architecting scalable backend systems with Laravel and Node.js,
              I bridge the gap between complex requirements and elegant solutions.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Based in Rajshahi, Bangladesh, I've spent years honing my craft in both 
              mobile and web ecosystems. I thrive on challenges that require creative 
              problem-solving and a deep understanding of full-stack architecture.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-surface/50 border border-border flex gap-6 hover:border-accent/30 transition-all group"
              >
                <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 -right-64 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export default About;
