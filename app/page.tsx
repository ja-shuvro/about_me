import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <div className="relative z-10 bg-background">
        <About />
        <Skills />
        <Projects />
        <CaseStudiesSection featuredOnly={true} />
        <Experience />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
