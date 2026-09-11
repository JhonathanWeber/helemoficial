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
        <section ref={ref} className="relative w-full h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] md:h-[calc(100dvh-6rem)] bg-gradient-to-r from-[#5367f4] via-[#ab58d2] to-[#ed7f9f] overflow-hidden flex items-center justify-center">
            {/* Imagem de Fundo e Arte Oficial */}
            <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-transparent to-pink-500/20 animate-glow-pulse mix-blend-overlay z-10 pointer-events-none"></div>
                <Image
                    src="/whatsapp-image-2026-08-16-hero.jpeg"
                    alt="Arte oficial de campanha de Helem Cristina para deputada estadual no Rio de Janeiro, número 45789"
                    fill
                    priority
                    sizes="100vw"
                    className="w-full h-full object-contain object-center z-0"
                />
            </motion.div>

            <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none">
                <h1 className="sr-only">
                    Helem Cristina — candidata a deputada estadual pelo Rio de Janeiro
                </h1>

                {/* Scroll Indicator */}
                <a
                    href="#historia"
                    className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce-subtle text-white drop-shadow-md pointer-events-auto group cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full px-4 py-2"
                    aria-label="Rolar para a seção Minha História"
                >
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] font-bold mb-1 opacity-85 group-hover:text-yellow-300 group-hover:opacity-100 transition-colors">Rolar</span>
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 opacity-85 group-hover:text-yellow-300 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
                </a>
            </div>
        </section>
    );
}
