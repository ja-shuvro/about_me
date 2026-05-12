export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accentColor: string;
  category: string;
  icons: {
    primary: string;
    secondary: string;
  };
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "agriflow",
    title: "Modular ERP for Agro Distribution",
    subtitle: "Building an ERP That Grows With the Business",
    description: "Replacing Excel chaos with a custom 13-module system that digitizes the entire supply chain and dealer network.",
    tags: ["NestJS + Prisma", "13+ Modules"],
    accentColor: "green",
    category: "ERP · Bangladesh",
    icons: {
      primary: "Database",
      secondary: "LayoutPanelLeft"
    },
    featured: true
  },
  {
    id: "02",
    slug: "negmp",
    title: "National Env. GIS Monitoring Platform",
    subtitle: "Architecting for 250 Million Trees",
    description: "A modular, satellite-integrated foundation for national-scale accountability and environmental tracking.",
    tags: ["GEE + PostGIS", "Offline-First Design"],
    accentColor: "accent",
    category: "GIS · Architecture Design",
    icons: {
      primary: "LayoutGrid",
      secondary: "Smartphone"
    },
    featured: true
  }
];
