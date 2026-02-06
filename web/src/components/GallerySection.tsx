"use client";

import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const IMAGES = [
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=500&auto=format&fit=crop", // Woman meeting
    "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=500&auto=format&fit=crop", // Woman smiling
    "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=500&auto=format&fit=crop", // Group discussing
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=500&auto=format&fit=crop", // Women group
    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=500&auto=format&fit=crop", // Woman portrait
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=500&auto=format&fit=crop", // People bonding
];

export function GallerySection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;
        // Adjust speed here
        const speed = 1;

        const scroll = () => {
            if (!isHovered) {
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
    }, [isHovered]);

    // Handle horizontal scroll on wheel
    const handleWheel = (e: React.WheelEvent) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    return (
        <section id="galeria" className="min-h-screen py-16 bg-purple-50 flex flex-col justify-center items-center overflow-hidden">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-10">
                <Camera className="w-10 h-10 text-purple-400 stroke-1" />
                <h2 className="text-3xl font-bold text-purple-700 leading-none">
                    <span className="text-lg font-normal text-purple-400 block -mb-1">nossa galeria</span>
                    de FOTOS!
                </h2>
            </div>

            {/* Gallery Carousel Container */}
            <div className="relative w-full max-w-[100%]">

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
                    {/* First Set */}
                    <div className="flex gap-6 pr-6 flex-shrink-0">
                        {IMAGES.map((img, index) => (
                            <div
                                key={`set1-${index}`}
                                className="min-w-[320px] md:min-w-[450px] aspect-square rounded-2xl overflow-hidden shadow-lg bg-white p-2 transform transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={img}
                                    alt={`Galeria ${index + 1}`}
                                    className="w-full h-full object-cover rounded-xl pointer-events-none"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Second Set (Duplicate for Loop) */}
                    <div className="flex gap-6 pr-6 flex-shrink-0">
                        {IMAGES.map((img, index) => (
                            <div
                                key={`set2-${index}`}
                                className="min-w-[320px] md:min-w-[450px] aspect-square rounded-2xl overflow-hidden shadow-lg bg-white p-2 transform transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={img}
                                    alt={`Galeria ${index + 1}`}
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
