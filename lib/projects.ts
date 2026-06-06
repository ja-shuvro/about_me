export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Flirtmetrics",
    category: "Mobile App",
    description: "A professional analytics platform for social interactions with real-time chat capabilities.",
    tech: ["Flutter", "Riverpod", "Firebase", "Real-time Chat"],
    image: "/assets/flirtmetrics/thumbnail.png",
    link: "https://flirtmetrics.com/"
  },
  {
    id: 2,
    title: "AgriflowBD ERP",
    category: "ERP System",
    description: "A 13-module ERP system digitizing the entire agro supply chain and dealer network for Bangladesh.",
    tech: ["NestJS", "Prisma", "React", "PostgreSQL"],
    image: "/assets/erp/dashboard.png",
    link: "https://erp-client-six.vercel.app/"
  },
  {
    id: 3,
    title: "AgriflowBD Website",
    category: "Web Platform",
    description: "Corporate landing page and marketing site for the AgriflowBD brand and distribution network.",
    tech: ["Next.js", "Tailwind CSS", "SEO"],
    image: "/assets/agriflowbd/thumbnail.png",
    link: "https://www.agriflowbd.com/"
  },
  {
    id: 4,
    title: "Smart Prop Trader",
    category: "Web App",
    description: "A comprehensive trading platform for prop traders with detailed performance metrics.",
    tech: ["Next.js", "Node.js", "MongoDB", "Charts.js"],
    image: "/assets/smartproptrader.png",
    link: "#"
  },
  {
    id: 5,
    title: "Student Square",
    category: "Web Platform",
    description: "An educational management system designed for school-student collaboration.",
    tech: ["React", "Express.js", "MySQL", "Prisma"],
    image: "/assets/studentsquare.png",
    link: "#"
  },
  {
    id: 6,
    title: "Rent Sale BD",
    category: "Web App",
    description: "A real estate marketplace for property rentals and sales across Bangladesh.",
    tech: ["React", "Node.js", "MySQL", "Tailwind"],
    image: "/assets/rentsalebd.png",
    link: "#"
  },
  {
    id: 7,
    title: "Weekly Success",
    category: "Blog",
    description: "A minimalist blog platform focused on personal growth and productivity.",
    tech: ["WordPress", "Elementor", "SEO"],
    image: "/assets/weeklysuccess.png",
    link: "#"
  }
];
