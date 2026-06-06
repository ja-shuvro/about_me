import { Github, Linkedin, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <p className="text-muted text-sm font-medium">
            &copy; {new Date().getFullYear()} <span className="text-text font-bold">JA.SHUVRO</span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/ja-shuvro" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/ja-shuvro" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://wa.me/8801516577736?text=Hi%20Shuvro!%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect." target="_blank" rel="noopener noreferrer" className="text-muted hover:text-green-500 transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
        <p className="text-muted/50 text-xs text-center italic border-t border-border/50 pt-8">
          Designed for Clarity and Scale. Built with Next.js & Framer Motion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
