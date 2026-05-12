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
    image: "/projects/flirtmetrics.jpg",
    link: "#"
  },
  {
    id: 2,
    title: "Smart Prop Trader",
    category: "Web App",
    description: "A comprehensive trading platform for prop traders with detailed performance metrics.",
    tech: ["Next.js", "Node.js", "MongoDB", "Charts.js"],
    image: "/projects/smart-prop.jpg",
    link: "#"
  },
  {
    id: 3,
    title: "Student Square",
    category: "Web Platform",
    description: "An educational management system designed for school-student collaboration.",
    tech: ["React", "Express.js", "MySQL", "Prisma"],
    image: "/projects/student-square.jpg",
    link: "#"
  },
  {
    id: 4,
    title: "Rent Sale BD",
    category: "Web App",
    description: "A real estate marketplace for property rentals and sales across Bangladesh.",
    tech: ["React", "Node.js", "MySQL", "Tailwind"],
    image: "/projects/rent-sale.jpg",
    link: "#"
  },
  {
    id: 5,
    title: "Mcneil Estate",
    category: "WordPress",
    description: "High-end real estate agency website with custom property listings.",
    tech: ["WordPress", "Elementor", "Astra"],
    image: "/projects/mcneil.jpg",
    link: "#"
  },
  {
    id: 6,
    title: "Weekly Success",
    category: "Blog",
    description: "A minimalist blog platform focused on personal growth and productivity.",
    tech: ["WordPress", "Elementor", "SEO"],
    image: "/projects/weekly-success.jpg",
    link: "#"
  },
  {
    id: 7,
    title: "Foodshahi BD",
    category: "Web App",
    description: "A food delivery service platform for the local Rajshahi market.",
    tech: ["HTML5", "Tailwind CSS", "JavaScript"],
    image: "/projects/foodshahi.jpg",
    link: "#"
  }
];
