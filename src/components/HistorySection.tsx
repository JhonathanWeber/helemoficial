"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Key } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HistorySection() {
    const containerRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const updateViewport = () => setIsMobile(mediaQuery.matches);

        updateViewport();
        mediaQuery.addEventListener("change", updateViewport);

        return () => mediaQuery.removeEventListener("change", updateViewport);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    // Transformações visuais baseadas no scroll
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.8], [0.8, 1]);

    // Movimento da imagem (vem da esquerda)
    const xImage = useTransform(scrollYProgress, [0, 1], [-100, 0]);
    // Movimento do texto (vem da direita)
    const xText = useTransform(scrollYProgress, [0, 1], [100, 0]);

    const imageStyle = isMobile ? { opacity, scale } : { x: xImage, opacity, scale };
    const textStyle = isMobile ? { opacity, scale } : { x: xText, opacity, scale };

    return (
        <section
            ref={containerRef}
            id="historia"
            className="w-full min-h-screen flex flex-col justify-center bg-helem-surface/90 backdrop-blur-md py-16 px-6 md:px-20 relative overflow-hidden"
        >
            <h2 className="sr-only">Trajetória na Política e Superação de Helem Cristina</h2>
            {/* Header with Icon */}
            <motion.div
                style={{ opacity, scale }}
                className="flex flex-col items-center justify-center mb-12 text-center"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/20 text-yellow-500 ring-1 ring-yellow-400/40 mb-3 shadow-xs">
                    <Key className="w-6 h-6 rotate-45" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <span className="rounded-full border border-purple-800/20 bg-purple-900/5 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-purple-900 mb-2">
                    Trajetória & Vivência Real
                </span>
                <div className="text-3xl md:text-5xl font-extrabold text-center text-purple-950 leading-tight tracking-tight" aria-hidden="true">
                    <span className="block text-lg md:text-xl font-normal text-purple-800 mb-0.5">Conheça minha</span>
                    HISTÓRIA
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center text-base md:text-lg text-gray-800">

                {/* Left Column: Image */}
                <motion.div
                    style={imageStyle}
                    className="relative flex justify-center lg:justify-end order-1 lg:order-none"
                >
                    {/* Yellow decorative blob background */}
                    <div className="absolute top-6 md:top-10 w-64 h-[70%] md:w-80 md:h-[80%] bg-yellow-400/60 rounded-3xl mix-blend-multiply blur-2xl animate-float"></div>

                    <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[480px] bg-white p-2 rounded-3xl shadow-[0_20px_50px_-15px_rgba(76,29,149,0.25)] ring-1 ring-purple-900/10 overflow-hidden transform hover:scale-[1.02] md:hover:scale-[1.03] transition-all duration-500">
                        <Image
                            src="/helem foto de perfil corpo 2.jpg"
                            alt="Helem Cristina conversando com a população sobre segurança e direitos da mulher"
                            width={500}
                            height={700}
                            priority
                            sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 480px"
                            className="w-full h-auto object-contain object-top rounded-2xl"
                        />
                    </div>
                </motion.div>

                {/* Right Column: Text */}
                <motion.div
                    style={textStyle}
                    className="space-y-6 md:space-y-7 text-purple-950 font-medium leading-relaxed px-4 md:px-0 order-2 lg:order-none text-center md:text-left"
                >
                    <p className="text-lg md:text-xl font-semibold text-purple-900">
                        Eu sou Helem.<br />
                        <span className="text-base md:text-lg font-normal text-purple-950">
                            Sou mulher, mãe, filha de lutas e movida pelo amor às pessoas e aos territórios onde a vida acontece.
                        </span>
                    </p>
                    <p>
                        <strong>Minha história na política</strong> não começou em gabinete. <strong>Começou na escuta, lá trás, através da minha mãe</strong>, quando eu ainda era bem pequenininha.
                    </p>
                    <p className="bg-yellow-300/40 p-3 rounded-2xl -rotate-1 inline-block border border-yellow-400/30 text-purple-950 shadow-xs">
                        Depois, se concretizou na rua, nas conversas difíceis, nas dores que muita gente tenta ignorar e na certeza de que dá, sim, pra fazer diferente.
                    </p>
                    <p>
                        <strong>Luto pelas mulheres</strong>, por quem trabalha muito, pela dignidade de quem nunca teve voz.
                    </p>
                    <p>
                        Acredito numa política que abraça, que protege e que transforma – não numa política distante e fria.
                    </p>
                    <div className="border-l-4 border-helem-purple-700 bg-gradient-to-r from-purple-100/70 via-purple-50/40 to-transparent pl-5 pr-4 py-4 rounded-r-2xl italic relative text-left shadow-xs">
                        <span className="text-6xl text-purple-300/40 font-serif absolute -top-4 -left-1 select-none pointer-events-none">&ldquo;</span>
                        <p className="relative z-10 text-purple-950">
                            Sempre caminhei junto com lideranças comunitárias, movimentos e pessoas comuns que só querem viver melhor. <strong className="not-italic text-helem-purple-900">Porque política, pra mim, é presença e é coragem.</strong>
                        </p>
                    </div>
                    <p className="text-purple-900 font-semibold">
                        Eu sigo porque acredito.<br />
                        <span className="font-bold text-helem-purple-800">E porque sei que quando a gente caminha junto, ninguém fica pra trás.</span>
                    </p>
                </motion.div>
            </div>

            {/* Decorative side element */}
            <div className="absolute top-1/2 right-0 w-32 h-64 bg-helem-purple-800 rounded-l-full opacity-10 translate-x-16 animate-glow-pulse"></div>
        </section>
    );
}
