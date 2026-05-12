import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";

export default function CaseStudiesPage() {
  return (
    <main className="bg-background min-h-screen pt-24">
      <Header />
      <div className="py-12">
        <div className="container mx-auto px-6 text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black font-heading mb-6 tracking-tight">Case Studies</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            In-depth breakdowns of real-world projects, architectural decisions, and business impact.
          </p>
        </div>
        <CaseStudiesSection />
      </div>
      <Footer />
    </main>
  );
}
