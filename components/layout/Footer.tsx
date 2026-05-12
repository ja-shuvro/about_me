const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6 text-center">
        <p className="text-muted text-sm font-medium">
          &copy; {new Date().getFullYear()} <span className="text-text font-bold">JA.SHUVRO</span>. All rights reserved.
        </p>
        <p className="text-muted/50 text-xs mt-2 italic">
          Built with Next.js, Three.js, and Framer Motion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
