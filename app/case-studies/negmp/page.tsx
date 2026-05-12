import type { Metadata } from "next";
import NEGMPClient from "@/app/case-studies/negmp/NEGMPClient";

export const metadata: Metadata = {
  title: "NEGMP: National Environmental GIS Monitoring Platform | Case Study",
  description: "Architecting a modular, satellite-integrated GIS platform for monitoring 250 million trees in Bangladesh. Exploring the GeoEntity Schema and NDVI verification pipeline.",
  keywords: [
    "GIS Platform Architecture", 
    "National GIS Monitoring", 
    "Satellite NDVI Verification", 
    "System Architect Portfolio", 
    "Bangladesh Environmental Tech",
    "PostGIS System Design",
    "Remote Sensing Platform"
  ],
  openGraph: {
    title: "NEGMP: Architecting for 250 Million Trees",
    description: "Deep-dive into the architecture of a national-scale GIS monitoring system.",
    type: "article",
    url: "https://jashuvro.dev/case-studies/negmp",
    images: [{ url: "https://jashuvro.dev/case-studies/negmp/og-image.png" }],
  },
};

export default function NEGMPPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "National Environmental GIS Monitoring Platform (NEGMP)",
    "description": "A satellite-integrated GIS monitoring platform designed for the Ministry of Environment, Forests and Climate Change, Government of Bangladesh.",
    "author": {
      "@type": "Person",
      "name": "J.A. Shuvro"
    },
    "genre": "GIS / Software Architecture",
    "keywords": "GIS, Remote Sensing, Satellite Monitoring, PostGIS, NestJS",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NEGMPClient />
    </>
  );
}
