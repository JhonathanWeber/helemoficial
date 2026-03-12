"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
    const text = "#Elas e suas fortalezas!";
    const letters = Array.from(text);

    // Gerar atrasos pseudo-aleatórios determinísticos para simular digitação humana
    // (Consistente entre server/client para evitar erros de hidratação)
    const typingDelays = letters.reduce((acc, _, i) => {
        const prev = acc.length > 0 ? acc[acc.length - 1] : 0.5;
        // Variação "humana": entre 50ms e 150ms
        // Math.sin garante que seja determinístico (sem Math.random)
        const variance = (Math.sin(i * 43758.5453) * 0.5 + 0.5) * 0.1 + 0.05;
        acc.push(prev + variance);
        return acc;
    }, [] as number[]);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }, // Fallback/Base
        },
    };

    const child = {
        visible: (delay: number) => ({
            opacity: 1,
            transition: {
                delay: delay,
                duration: 0, // Digitação seca
            },
        }),
        hidden: {
            opacity: 0,
        },
    };

    return (
        <>
            {/* Background Fixo */}
            <div className="fixed top-0 left-0 w-full h-[100dvh] -z-50">
                <Image
                    src="/helem foto de capa.jpg"
                    alt="Helem Caminhando"
                    fill
                    priority
                    sizes="100vw"
                    className="w-full h-full object-cover object-center"
                />
                {/* Overlay opcional para melhorar leitura do texto se a imagem for clara */}
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Conteúdo da Hero Section (scrollable) */}
            <div className="relative w-full min-h-[calc(100dvh-6rem)] flex items-center justify-center">
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-8xl font-bold text-white drop-shadow-lg text-center px-4 flex flex-wrap justify-center"
                    style={{ fontFamily: 'var(--font-indie)' }}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {letters.map((letter, index) => (
                        <motion.span
                            variants={child}
                            key={index}
                            custom={typingDelays[index]}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.h1>
            </div>
        </>
    );
}
