"use client";

import { Camera, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
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

    const currentSpeedRef = useRef(0.5);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || images.length === 0) return;

        let animationFrameId: number;

        const scroll = () => {
            currentSpeedRef.current = isHovered 
                ? Math.max(currentSpeedRef.current * 0.95, 0) 
                : Math.min(currentSpeedRef.current + 0.02, 0.5);

            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0;
            } else {
                scrollContainer.scrollLeft += currentSpeedRef.current;
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

    const handleManualScroll = (offset: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
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
            <div className="flex flex-col items-center justify-center mb-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 ring-1 ring-purple-200 mb-3 shadow-xs">
                    <Camera className="w-6 h-6" />
                </div>
                <span className="rounded-full border border-purple-800/15 bg-purple-100/60 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-purple-900 mb-2">
                    Momentos & Encontros
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-purple-950 leading-tight tracking-tight">
                    <span className="text-lg md:text-xl font-normal text-purple-700 block mb-0.5">Nossa galeria</span>
                    DE FOTOS!
                </h2>
            </div>

            {/* Gallery Carousel Container */}
            <div className="relative w-full max-w-[100%] py-8 group/gallery">

                {/* Left Blur Mask */}
                <div className="absolute top-0 left-0 h-full w-24 sm:w-36 bg-gradient-to-r from-purple-50 via-purple-50/80 to-transparent z-10 pointer-events-none"></div>
                {/* Right Blur Mask */}
                <div className="absolute top-0 right-0 h-full w-24 sm:w-36 bg-gradient-to-l from-purple-50 via-purple-50/80 to-transparent z-10 pointer-events-none"></div>

                {/* Manual Navigation Arrows */}
                <button
                    onClick={() => handleManualScroll(-360)}
                    type="button"
                    aria-label="Rolar fotos para a esquerda"
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-purple-950 shadow-lg ring-1 ring-purple-900/10 backdrop-blur-md transition-all hover:bg-white hover:scale-110 active:scale-95"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={() => handleManualScroll(360)}
                    type="button"
                    aria-label="Rolar fotos para a direita"
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-purple-950 shadow-lg ring-1 ring-purple-900/10 backdrop-blur-md transition-all hover:bg-white hover:scale-110 active:scale-95"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Infinite Scroll Wrapper */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto overflow-y-hidden w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onWheel={handleWheel}
                >
                    {/* First Set of Images */}
                    <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 flex-shrink-0">
                        {images.map((item, index) => (
                            <div
                                key={`set1-${item.id}-${index}`}
                                className="min-w-[240px] h-[240px] sm:min-w-[300px] sm:h-[300px] md:min-w-[440px] md:h-[440px] aspect-square rounded-2xl overflow-hidden shadow-lg bg-white p-2 transform transition-transform duration-300 hover:scale-105"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title || `Galeria ${index + 1}`}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 440px"
                                        className="w-full h-full object-cover object-top md:object-center rounded-xl pointer-events-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Second Set (Duplicate for Infinite Loop) */}
                    <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 flex-shrink-0">
                        {images.map((item, index) => (
                            <div
                                key={`set2-${item.id}-${index}`}
                                className="min-w-[240px] h-[240px] sm:min-w-[300px] sm:h-[300px] md:min-w-[440px] md:h-[440px] aspect-square rounded-2xl overflow-hidden shadow-lg bg-white p-2 transform transition-transform duration-300 hover:scale-105"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title || `Galeria ${index + 1}`}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 440px"
                                        className="w-full h-full object-cover object-top md:object-center rounded-xl pointer-events-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
