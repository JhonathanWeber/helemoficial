"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
    const ref = useRef(null);
    const { scrollY } = useScroll();

    // Move the image up slightly as we scroll down
    const y = useTransform(scrollY, [0, 1000], [0, -50]);

    return (
        <section ref={ref} className="relative w-full min-h-[calc(100dvh-6rem)]">
            <motion.div style={{ y }} className="fixed inset-0 -z-50 h-[100dvh] w-full bg-gradient-to-r from-[#5367f4] via-[#ab58d2] to-[#ed7f9f]">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-transparent to-pink-500/30 animate-glow-pulse mix-blend-overlay z-10 pointer-events-none"></div>
                <picture className="absolute inset-0 block">
                    <source
                        media="(max-width: 767px)"
                        srcSet="/foto-capa-mobile.jpg"
                    />
                    <Image
                        src="/whatsapp-image-2026-08-16-hero.jpeg"
                        alt="Arte oficial de campanha de Helem Cristina para deputada estadual no Rio de Janeiro, número 45789"
                        fill
                        priority
                        sizes="100vw"
                        className="h-full w-full object-contain object-center relative z-0"
                    />
                </picture>
            </motion.div>

            <div className="relative w-full min-h-[calc(100dvh-6rem)] flex items-center justify-center pointer-events-none">
                <h1 className="sr-only">
                    Helem Cristina — candidata a deputada estadual pelo Rio de Janeiro
                </h1>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce-subtle text-white drop-shadow-md">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold mb-2 opacity-80">Rolar</span>
                    <ChevronDown className="w-6 h-6 opacity-80" />
                </div>
            </div>
        </section>
    );
}
