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
    image: "/assets/flirtmetrics.png",
    link: "#"
  },
  {
    id: 2,
    title: "Smart Prop Trader",
    category: "Web App",
    description: "A comprehensive trading platform for prop traders with detailed performance metrics.",
    tech: ["Next.js", "Node.js", "MongoDB", "Charts.js"],
    image: "/assets/smartproptrader.png",
    link: "#"
  },
  {
    id: 3,
    title: "Student Square",
    category: "Web Platform",
    description: "An educational management system designed for school-student collaboration.",
    tech: ["React", "Express.js", "MySQL", "Prisma"],
    image: "/assets/studentsquare.png",
    link: "#"
  },
  {
    id: 4,
    title: "Rent Sale BD",
    category: "Web App",
    description: "A real estate marketplace for property rentals and sales across Bangladesh.",
    tech: ["React", "Node.js", "MySQL", "Tailwind"],
    image: "/assets/rentsalebd.png",
    link: "#"
  },
  {
    id: 5,
    title: "Mcneil Estate",
    category: "WordPress",
    description: "High-end real estate agency website with custom property listings.",
    tech: ["WordPress", "Elementor", "Astra"],
    image: "/assets/mcneilpstateplanning.png",
    link: "#"
  },
  {
    id: 6,
    title: "Weekly Success",
    category: "Blog",
    description: "A minimalist blog platform focused on personal growth and productivity.",
    tech: ["WordPress", "Elementor", "SEO"],
    image: "/assets/weeklysuccess.png",
    link: "#"
  },
  {
    id: 7,
    title: "Foodshahi BD",
    category: "Web App",
    description: "A food delivery service platform for the local Rajshahi market.",
    tech: ["HTML5", "Tailwind CSS", "JavaScript"],
    image: "/assets/foodshahibd.png",
    link: "#"
  }
];
