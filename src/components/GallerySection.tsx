"use client";

import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { galleryService, GalleryItem } from "@/services/gallery";

export function GallerySection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await galleryService.getAll();
                // If we don't have enough images for the infinite scroll effect (min 6),
                // duplicate them until we have at least 6 to ensure smooth scrolling
                let allImages = data;
                if (data.length > 0 && data.length < 6) {
                    while (allImages.length < 6) {
                        allImages = [...allImages, ...data];
                    }
                }
                setImages(allImages);
            } catch (error) {
                console.error("Erro ao carregar galeria:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || images.length === 0) return;

        let animationFrameId: number;
        // Adjust speed here
        const speed = 0.5; // Slower speed for better UX

        const scroll = () => {
            if (!isHovered) {
                // When we've scrolled half the width (the first set), reset to 0
                // We use >= here to catch it if it overshoots slightly
                // The container has 2 identical sets of images
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += speed;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered, images]);

    // Handle horizontal scroll on wheel
    const handleWheel = (e: React.WheelEvent) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    if (loading) {
        return (
            <section className="min-h-[400px] flex justify-center items-center bg-purple-50/90 backdrop-blur-md">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </section>
        );
    }

    if (images.length === 0) return null;

    return (
        <section id="galeria" className="min-h-screen py-24 bg-purple-50/90 backdrop-blur-md flex flex-col justify-center items-center overflow-hidden">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-12">
                <Camera className="w-10 h-10 text-purple-400 stroke-1" />
                <h2 className="text-3xl font-bold text-purple-700 leading-none">
                    <span className="text-lg font-normal text-purple-400 block -mb-1">nossa galeria</span>
                    de FOTOS!
                </h2>
            </div>

            {/* Gallery Carousel Container */}
            <div className="relative w-full max-w-[100%] py-12">

                {/* Left Blur Mask */}
                <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-purple-50 to-transparent z-10 pointer-events-none"></div>
                {/* Right Blur Mask */}
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-purple-50 to-transparent z-10 pointer-events-none"></div>

                {/* Infinite Scroll Wrapper */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto overflow-y-hidden w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onWheel={handleWheel}
                >
                    {/* First Set of Images */}
                    <div className="flex gap-6 pr-6 flex-shrink-0">
                        {images.map((item, index) => (
                            <div
                                key={`set1-${item.id}-${index}`}
                                className="min-w-[200px] max-h-[200px] md:min-w-[480px] md:max-h-[480px] aspect-square rounded-2xl overflow-hidden shadow-lg bg-white p-2 transform transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title || `Galeria ${index + 1}`}
                                    className="w-full h-full object-cover rounded-xl pointer-events-none"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Second Set (Duplicate for Infinite Loop) */}
                    <div className="flex gap-6 pr-6 flex-shrink-0">
                        {images.map((item, index) => (
                            <div
                                key={`set2-${item.id}-${index}`}
                                className="min-w-[200px] max-h-[200px] md:min-w-[480px] md:max-h-[480px] aspect-square rounded-2xl overflow-hidden shadow-lg bg-white p-2 transform transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title || `Galeria ${index + 1}`}
                                    className="w-full h-full object-cover rounded-xl pointer-events-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
