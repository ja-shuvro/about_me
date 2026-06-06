"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  Monitor,
  Server,
  Mail,
  MapPin,
  Briefcase,
  Send,
  MessageCircle,
  ExternalLink,
  Github,
  Linkedin,
} from "lucide-react";
import { projects } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════
   Data Constants
   ═══════════════════════════════════════════ */

const FEATURES = [
  {
    icon: Code2,
    color: "text-[#23bcfe]",
    title: "Clean Code",
    description:
      "I write semantic, efficiently organized code that is easy to maintain and scale, following industry best practices.",
  },
  {
    icon: Monitor,
    color: "text-[#7c3aed]",
    title: "Responsive Design",
    description:
      "My applications are designed to look and function perfectly on everything from smartphones to 4K monitors.",
  },
  {
    icon: Server,
    color: "text-[#10b981]",
    title: "Performance",
    description:
      "I prioritize speed and optimization, ensuring that every millisecond is accounted for in the user experience.",
  },
];

const SKILL_CATEGORIES = [
  { name: "Frontend", skills: ["Flutter", "React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3"] },
  { name: "Backend", skills: ["Laravel", "Express.js", "NestJS", "REST API Development"] },
  { name: "Database", skills: ["MongoDB", "MySQL", "Prisma", "Sequelize", "Mongoose"] },
  { name: "Tools", skills: ["WordPress Development", "Git", "GitHub"] },
];

const EXPERIENCES = [
  {
    date: "01/2025 - 08/2025",
    title: "Flutter & Full-Stack Developer",
    company: "Rigg Technologies",
    description:
      "Developed cross-platform mobile apps using Flutter and full-stack web apps with Laravel, Express.js, and React. Designed RESTful APIs and managed MongoDB/MySQL databases.",
  },
  {
    date: "1.5 Years (Ongoing)",
    title: "Mobile App Specialist",
    company: "Freelance",
    description:
      "Delivered 10+ Android projects. Specialized in fluid UI/UX animations, REST API integration, and Riverpod/GetX state management.",
  },
  {
    date: "2 Years",
    title: "Backend Engineer",
    company: "Freelance",
    description:
      "Engineered robust server-side logic using Nest.js and Express.js. Developed secure authentication systems and architected complex database schemas.",
  },
  {
    date: "2 Years",
    title: "Frontend Web Developer",
    company: "Freelance",
    description:
      "Built 10+ web projects using React.js and Next.js. Focused on SEO-optimized, fast-loading, and responsive interfaces.",
  },
  {
    date: "3 Years",
    title: "WordPress & Plugin Specialist",
    company: "Freelance",
    description:
      "Customized WordPress ecosystems by developing bespoke plugins and themes. Bridged CMS flexibility with custom PHP/Laravel logic.",
  },
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "dev.jashuvro@gmail.com",
    link: "mailto:dev.jashuvro@gmail.com",
    color: "text-[#23bcfe]",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+880 1516-577736",
    link: "https://wa.me/8801516577736?text=Hi%20Shuvro!%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect.",
    color: "text-green-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Rajshahi, Bangladesh",
    color: "text-[#7c3aed]",
  },
  {
    icon: Briefcase,
    label: "Status",
    value: "Available for Freelance",
    color: "text-blue-400",
  },
];

/* ═══════════════════════════════════════════
   Scroll Sections Component
   ═══════════════════════════════════════════ */

const ScrollSections = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Scroll progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      // Animate each section title on scroll
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });

      // Animate content blocks
      gsap.utils.toArray<HTMLElement>(".section-content").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      });

      // Stagger cards
      gsap.utils.toArray<HTMLElement>(".stagger-group").forEach((group) => {
        const cards = group.querySelectorAll(".stagger-item");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        ref={progressRef}
        className="scroll-progress"
        style={{ transform: "scaleX(0)" }}
      />

      <div ref={containerRef} className="scroll-overlay">
        {/* ═══ SECTION 0: HERO ═══ */}
        <section id="home" className="scroll-section flex-col gap-6 pt-20">
          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "J.A. Shuvro",
                url: "https://jashuvro.com",
                jobTitle: "Flutter & Full-Stack Developer",
                worksFor: { "@type": "Organization", name: "Freelance" },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Rajshahi",
                  addressCountry: "Bangladesh",
                },
                knowsAbout: [
                  "Flutter",
                  "NestJS",
                  "Next.js",
                  "Laravel",
                  "PostgreSQL",
                  "React",
                ],
                sameAs: [
                  "https://github.com/ja-shuvro",
                  "https://linkedin.com/in/ja-shuvro",
                ],
              }),
            }}
          />

          <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
            {/* Profile Photo */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#23bcfe]/30 shadow-[0_0_40px_rgba(35,188,254,0.2)] animate-pulse-glow">
                <Image
                  src="/assets/jashuvro.png"
                  alt="J.A. Shuvro — Flutter & Full-Stack Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-text/80 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for Hire
            </div>

            {/* Role Label */}
            <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-[#23bcfe]/15 to-[#7c3aed]/15 border border-[#23bcfe]/20 text-sm font-semibold text-[#23bcfe] tracking-widest uppercase mb-8 section-label">
              Flutter & Full-Stack Developer
            </div>

            {/* H1 */}
            <h1 className="cinematic-title font-heading mb-6 section-title">
              Crafting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#23bcfe] to-[#7c3aed] animate-gradient">
                Digital Excellence
              </span>{" "}
              <br />
              for the Future.
            </h1>

            {/* Subtitle */}
            <p className="cinematic-subtitle max-w-2xl mx-auto mb-10 section-content">
              Experienced Flutter & Full-Stack Developer with a strong
              self-learning background and real-world production experience.
              Skilled in building mobile and web applications using Flutter,
              Laravel, React, Express.js, and Next.js.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center section-content">
              <a href="#projects" className="btn-cinematic btn-primary flex items-center gap-2 justify-center">
                View My Work
                <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn-cinematic btn-outline flex items-center gap-2 justify-center">
                Contact Me
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748b]/50">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
              Scroll to Explore
            </span>
            <ChevronDown size={18} className="animate-bounce" />
          </div>
        </section>

        {/* ═══ SECTION 1: ABOUT ═══ */}
        <section id="about" className="scroll-section">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div>
                <p className="section-label text-[#23bcfe] mb-4 section-title">
                  // About Me
                </p>
                <h2 className="text-4xl md:text-6xl font-black font-heading mb-8 section-title text-glow">
                  About Me
                </h2>
                <p className="text-lg text-[#64748b] leading-relaxed mb-6 section-content">
                  I am a dedicated software engineer with a track record of
                  delivering robust applications. From crafting pixel-perfect
                  mobile interfaces with Flutter to architecting scalable
                  backend systems with Laravel and Node.js, I bridge the gap
                  between complex requirements and elegant solutions.
                </p>
                <p className="text-lg text-[#64748b] leading-relaxed section-content">
                  Based in Rajshahi, Bangladesh, I&apos;ve spent years honing my
                  craft in both mobile and web ecosystems. I thrive on
                  challenges that require creative problem-solving and a deep
                  understanding of full-stack architecture.
                </p>
              </div>

              <div className="grid gap-6 stagger-group">
                {FEATURES.map((feature, index) => {
                  const IconComp = feature.icon;
                  return (
                    <div
                      key={index}
                      className="glass-card p-8 rounded-2xl flex gap-6 stagger-item group cursor-default"
                    >
                      <div className={`flex-shrink-0 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComp size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-[#64748b] leading-relaxed text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: SKILLS ═══ */}
        <section id="skills" className="scroll-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="section-label text-[#10b981] mb-4 section-title">
                // Tech Stack
              </p>
              <h2 className="text-4xl md:text-6xl font-black font-heading mb-4 section-title text-glow">
                My Expertise
              </h2>
              <p className="cinematic-subtitle max-w-2xl mx-auto section-content">
                A collection of technologies and tools I work with to build
                robust and scalable digital solutions.
              </p>
            </div>

            <div className="max-w-5xl mx-auto stagger-group">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.name} className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#64748b] mb-4 stagger-item">
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill}
                        className="glass-card px-5 py-2.5 rounded-xl text-sm font-bold cursor-default flex items-center gap-2 stagger-item hover:scale-105 transition-transform duration-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#23bcfe]" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: PROJECTS ═══ */}
        <section id="projects" className="scroll-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="section-label text-[#23bcfe] mb-4 section-title">
                // Portfolio
              </p>
              <h2 className="text-4xl md:text-6xl font-black font-heading mb-4 section-title text-glow">
                Featured Projects
              </h2>
              <p className="cinematic-subtitle max-w-2xl mx-auto section-content">
                A showcase of my recent work across mobile apps, web platforms,
                and digital solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto stagger-group">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card rounded-2xl overflow-hidden group stagger-item hover:scale-[1.02] transition-all duration-500 flex flex-col"
                >
                  <div className="aspect-video bg-[#06060f] relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#06060f]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      {project.link && project.link !== "#" && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-cinematic btn-primary text-xs flex items-center gap-2"
                        >
                          View Live <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <span className="section-label text-[#23bcfe] mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-[#23bcfe] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[#64748b] text-sm leading-relaxed mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-bold px-2 py-1 rounded bg-[#06060f] border border-[#1a1a2e] text-[#e2e8f0]/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4: CASE STUDIES ═══ */}
        <section id="case-studies" className="scroll-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="section-label text-[#f59e0b] mb-4 section-title">
                // Deep Dives
              </p>
              <h2 className="text-4xl md:text-6xl font-black font-heading mb-4 section-title text-glow-purple">
                Case Studies
              </h2>
              <p className="cinematic-subtitle max-w-2xl mx-auto section-content">
                Deep-dives into complex systems I&apos;ve architected and built to
                solve national-scale problems.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto stagger-group">
              {/* AgriflowBD */}
              <div className="glass-card rounded-3xl p-8 md:p-10 group stagger-item hover:border-[#10b981]/30 transition-all duration-500">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]">
                  ERP · Bangladesh
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-heading mb-4 leading-tight group-hover:text-[#10b981] transition-colors duration-300">
                  Modular ERP for <br />
                  Agro Distribution
                </h3>
                <p className="text-[#64748b] mb-8 leading-relaxed">
                  Replacing Excel chaos with a custom 13-module system that
                  digitizes the entire supply chain and dealer network.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#06060f] border border-[#1a1a2e] text-[#64748b]">
                    NestJS + Prisma
                  </span>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#06060f] border border-[#1a1a2e] text-[#64748b]">
                    13+ Modules
                  </span>
                </div>
                <Link
                  href="/case-studies/agriflow"
                  className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-[#10b981] transition-colors duration-300"
                >
                  Read Full Study <ArrowRight size={16} />
                </Link>
              </div>

              {/* NEGMP */}
              <div className="glass-card rounded-3xl p-8 md:p-10 group stagger-item hover:border-[#23bcfe]/30 transition-all duration-500">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border bg-[#23bcfe]/10 border-[#23bcfe]/20 text-[#23bcfe]">
                  GIS · Architecture Design
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-heading mb-4 leading-tight group-hover:text-[#23bcfe] transition-colors duration-300">
                  National Env. GIS <br />
                  Monitoring Platform
                </h3>
                <p className="text-[#64748b] mb-8 leading-relaxed">
                  A modular, satellite-integrated foundation for national-scale
                  accountability and environmental tracking.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#06060f] border border-[#1a1a2e] text-[#64748b]">
                    GEE + PostGIS
                  </span>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#06060f] border border-[#1a1a2e] text-[#64748b]">
                    Offline-First Design
                  </span>
                </div>
                <Link
                  href="/case-studies/negmp"
                  className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-[#23bcfe] transition-colors duration-300"
                >
                  Read Full Study <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="mt-12 text-center section-content">
              <Link
                href="/case-studies"
                className="btn-cinematic btn-outline inline-flex items-center gap-2"
              >
                View All Case Studies
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5: EXPERIENCE ═══ */}
        <section id="experience" className="scroll-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="section-label text-[#f43f5e] mb-4 section-title">
                // Timeline
              </p>
              <h2 className="text-4xl md:text-6xl font-black font-heading mb-4 section-title text-glow">
                Professional Journey
              </h2>
            </div>

            <div className="relative max-w-4xl mx-auto stagger-group">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#23bcfe]/50 via-[#7c3aed]/30 to-transparent" />

              <div className="space-y-12">
                {EXPERIENCES.map((exp, index) => (
                  <div
                    key={index}
                    className={`stagger-item relative flex flex-col md:flex-row gap-8 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-[#23bcfe] z-10 shadow-[0_0_15px_rgba(35,188,254,0.6)]" />

                    <div className="md:w-1/2 flex flex-col md:px-12 pl-10">
                      <span className="text-[#23bcfe] font-bold text-sm mb-2">
                        {exp.date}
                      </span>
                      <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                      <span className="text-[#e2e8f0]/50 font-medium mb-4">
                        {exp.company}
                      </span>
                      <p className="text-[#64748b] leading-relaxed text-sm">
                        {exp.description}
                      </p>
                    </div>
                    <div className="md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 6: CONTACT ═══ */}
        <section id="contact" className="scroll-section">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <p className="section-label text-[#23bcfe] mb-4 section-title">
                  // Let&apos;s Connect
                </p>
                <h2 className="text-4xl md:text-6xl font-black font-heading mb-4 section-title text-glow-strong">
                  Get In Touch
                </h2>
                <p className="cinematic-subtitle max-w-2xl mx-auto section-content">
                  Whether you have a project in mind or just want to chat, feel
                  free to reach out. I&apos;m always open to new opportunities.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6 stagger-group">
                  {CONTACT_INFO.map((item, index) => {
                    const IconComp = item.icon;
                    const content = (
                      <>
                        <div className={`p-4 rounded-xl bg-[#06060f] ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                          <IconComp size={22} />
                        </div>
                        <div>
                          <span className="section-label text-[#64748b] block mb-1">
                            {item.label}
                          </span>
                          <span className="text-base font-bold">
                            {item.value}
                          </span>
                        </div>
                      </>
                    );

                    return item.link ? (
                      <a
                        key={index}
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="glass-card flex gap-5 items-center p-5 rounded-2xl group cursor-pointer stagger-item hover:scale-[1.02] transition-all duration-300"
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        key={index}
                        className="glass-card flex gap-5 items-center p-5 rounded-2xl group stagger-item"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>

                <div className="glass-strong p-8 rounded-3xl section-content">
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="section-label text-[#e2e8f0]/60 block mb-3"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        placeholder="Your Name"
                        className="w-full px-5 py-4 rounded-xl bg-[#06060f]/80 border border-[#1a1a2e] focus:border-[#23bcfe] focus:outline-none transition-colors duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="section-label text-[#e2e8f0]/60 block mb-3"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        placeholder="your@email.com"
                        className="w-full px-5 py-4 rounded-xl bg-[#06060f]/80 border border-[#1a1a2e] focus:border-[#23bcfe] focus:outline-none transition-colors duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="section-label text-[#e2e8f0]/60 block mb-3"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Tell me about your project..."
                        className="w-full px-5 py-4 rounded-xl bg-[#06060f]/80 border border-[#1a1a2e] focus:border-[#23bcfe] focus:outline-none transition-colors duration-300 resize-none text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full btn-cinematic btn-primary flex items-center justify-center gap-2"
                    >
                      Send Message
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="py-12 border-t border-[#1a1a2e] relative z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <p className="text-[#64748b] text-sm font-medium">
                &copy; {new Date().getFullYear()}{" "}
                <span className="text-[#e2e8f0] font-bold">JA.SHUVRO</span>.
                All rights reserved.
              </p>

              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/ja-shuvro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#64748b] hover:text-[#23bcfe] transition-colors duration-300"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/ja-shuvro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#64748b] hover:text-[#23bcfe] transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://wa.me/8801516577736?text=Hi%20Shuvro!%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#64748b] hover:text-green-500 transition-colors duration-300"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
            <p className="text-[#64748b]/40 text-xs text-center italic border-t border-[#1a1a2e]/50 pt-8">
              Designed for Clarity and Scale. Built with Next.js, Three.js &
              GSAP.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ScrollSections;
