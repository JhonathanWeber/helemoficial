import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HistorySection } from "@/components/HistorySection";
import { NewsSection } from "@/components/NewsSection";
import { FlagsSection } from "@/components/FlagsSection";
import { GallerySection } from "@/components/GallerySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Helem Christina",
    jobTitle: "Pré-candidata a Deputada Estadual",
    affiliation: {
      "@type": "Organization",
      name: "PSDB Rio de Janeiro",
    },
    homeLocation: {
      "@type": "Place",
      name: "Maricá, Rio de Janeiro",
    },
    description:
      "Trajetória, pautas e compromissos propostos por Helem Christina, pré-candidata a Deputada Estadual no Rio de Janeiro.",
    url: "https://helemoficial.com",
    image: "https://helemoficial.com/whatsapp-image-2026-08-16-hero.jpeg",
  };

  return (
    <main className="min-h-screen flex flex-col font-sans pt-24">
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <HistorySection />
      <NewsSection />
      <FlagsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
