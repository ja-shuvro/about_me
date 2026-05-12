import type { Metadata } from "next";
import AgriflowClient from "@/app/case-studies/agriflow/AgriflowClient";

export const metadata: Metadata = {
  title: "Agriflow: Modular ERP for Agro Distribution | Case Study",
  description: "A deep-dive into building a custom 13-module ERP system for agricultural distribution. Digitizing supply chains, dealer networks, and inventory management in Bangladesh.",
  keywords: [
    "Agro ERP Bangladesh", 
    "Modular ERP Design", 
    "Supply Chain Digitization", 
    "Inventory Management System", 
    "NestJS ERP Development",
    "Agro Distribution Software"
  ],
  openGraph: {
    title: "Agriflow: Building an ERP That Grows With the Business",
    description: "Custom modular ERP system for high-scale agricultural distribution.",
    type: "article",
    url: "https://jashuvro.dev/case-studies/agriflow",
    images: [{ url: "https://jashuvro.dev/case-studies/agriflow/og-image.png" }],
  },
};

export default function AgriflowPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Agriflow Modular ERP",
    "description": "A custom 13-module ERP system designed for Agriflow BD to manage their dealer network and supply chain.",
    "author": {
      "@type": "Person",
      "name": "J.A. Shuvro"
    },
    "genre": "Enterprise Software / ERP",
    "keywords": "ERP, Agro-Tech, Supply Chain, Inventory Management, NestJS",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgriflowClient />
    </>
  );
}
