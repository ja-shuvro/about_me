"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Briefcase, Send } from "lucide-react";

const info = [
  { icon: <Mail className="text-accent" />, label: "Email", value: "shuvro.dev@gmail.com" },
  { icon: <MapPin className="text-accent2" />, label: "Location", value: "Rajshahi, Bangladesh" },
  { icon: <Briefcase className="text-green-400" />, label: "Status", value: "Available for Freelance" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-4">Get In Touch</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Whether you have a project in mind or just want to chat, 
              feel free to reach out. I'm always open to new opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                {info.map((item, index) => (
                  <div key={index} className="flex gap-6 items-center p-6 rounded-2xl bg-surface border border-border group hover:border-accent/30 transition-all">
                    <div className="p-4 rounded-xl bg-background text-accent group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-muted block mb-1">
                        {item.label}
                      </span>
                      <span className="text-lg font-bold text-text">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-surface border border-border"
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2 text-text/80 uppercase tracking-wide">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Your Name"
                    className="w-full px-6 py-4 rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2 text-text/80 uppercase tracking-wide">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-text/80 uppercase tracking-wide">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    placeholder="Tell me about your project..."
                    className="w-full px-6 py-4 rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-accent text-background font-black flex items-center justify-center gap-2 hover:bg-white transition-all hover:scale-[1.02] active:scale-95"
                >
                  Send Message
                  <Send size={18} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
