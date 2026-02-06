import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HistorySection } from "@/components/HistorySection";
import { FlagsSection } from "@/components/FlagsSection";
import { GallerySection } from "@/components/GallerySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col font-sans pt-24">
            <Navbar />
            <Hero />
            <HistorySection />
            <FlagsSection />
            <GallerySection />
            <ContactSection />
            <Footer />
        </main>
    );
}
