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
      "Mulher negra de periferia, mãe, criada no Jacarezinho, ativista na luta contra a violência feminina e pré-candidata a Deputada Estadual no RJ.",
    url: "https://helemoficial.com",
    image: "https://helemoficial.com/helem%20foto%20de%20capa.jpg",
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
