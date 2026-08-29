"use client";

import { useEffect, useRef, useState } from "react";
import { Ear, Heart, Scale, UsersRound, type LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

type Flag = {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    commitments: string[];
    icon: LucideIcon;
    visual: string;
};

export function FlagsSection() {
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

    const flags: Flag[] = [
        {
            id: "proximidade",
            eyebrow: "Ouvir antes de decidir",
            title: "Democracia de Proximidade",
            description: "Uma política presente nos territórios, construída com escuta real e conversa olho no olho.",
            commitments: [
                "Escutar moradores e lideranças comunitárias",
                "Levar as demandas do território para as decisões",
                "Transformar conversa em acompanhamento e ação",
            ],
            icon: Ear,
            visual: "from-violet-950 via-purple-700 to-indigo-500",
        },
        {
            id: "mulheres",
            eyebrow: "Força que ocupa espaços",
            title: "Mulheres no Centro das Decisões",
            description: "Mulheres não são coadjuvantes: são liderança, cuidado e decisão em todos os espaços.",
            commitments: [
                "Fortalecer redes de acolhimento e apoio",
                "Combater a violência doméstica e emocional",
                "Ampliar a presença feminina na política",
            ],
            icon: UsersRound,
            visual: "from-fuchsia-950 via-purple-700 to-pink-500",
        },
        {
            id: "justica-social",
            eyebrow: "Dignidade para todos",
            title: "Justiça Social",
            description: "O problema tem endereço. A solução também: deve chegar perto de quem mais precisa.",
            commitments: [
                "Defender dignidade nas periferias",
                "Ampliar acesso a oportunidades e renda",
                "Aproximar políticas públicas da vida real",
            ],
            icon: Scale,
            visual: "from-amber-950 via-orange-600 to-yellow-400",
        }
    ];

    // Transformações baseadas no scroll
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.8], [0.8, 1]);

    // Movimentos individuais
    const xLeft = useTransform(scrollYProgress, [0, 1], [-200, 0]);
    const yMiddle = useTransform(scrollYProgress, [0, 1], [200, 0]);
    const xRight = useTransform(scrollYProgress, [0, 1], [200, 0]);

    const getStyle = (index: number) => {
        const baseStyle = { opacity, scale };
        if (isMobile) return baseStyle;
        if (index === 0) return { ...baseStyle, x: xLeft };
        if (index === 1) return { ...baseStyle, y: yMiddle };
        return { ...baseStyle, x: xRight };
    };

    return (
        <section
            ref={containerRef}
            id="bandeiras"
            className="w-full min-h-screen flex flex-col justify-center bg-[#5B21B6]/90 backdrop-blur-md py-20 px-4 text-white overflow-hidden relative"
            aria-labelledby="bandeiras-title"
        >
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <motion.div
                    style={{ opacity, scale }}
                    className="flex flex-col items-center mb-16 text-center"
                >
                    <Heart className="w-12 h-12 mb-4 text-white fill-current" />
                    <h2 id="bandeiras-title" className="text-3xl md:text-5xl font-extrabold uppercase leading-none">
                        <span className="block text-2xl font-normal lowercase mb-1">Conheça minhas</span>
                        BANDEIRAS!
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full px-4 md:px-0">
                    {flags.map((flag, idx) => {
                        const Icon = flag.icon;

                        return (
                        <motion.div
                            key={flag.id}
                            style={getStyle(idx)}
                            className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 text-left shadow-2xl backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2"
                        >
                            <div className={`relative isolate flex aspect-[4/3] w-full items-end overflow-hidden bg-gradient-to-br ${flag.visual} p-6`}>
                                <div className="absolute -right-10 -top-12 -z-10 h-40 w-40 rounded-full border-[18px] border-white/15" aria-hidden="true" />
                                <div className="absolute -bottom-16 -left-8 -z-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                                <Icon className="absolute right-6 top-6 h-14 w-14 text-white/85" strokeWidth={1.5} aria-hidden="true" />
                                <span className="rounded-full border border-white/30 bg-black/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                                    {flag.eyebrow}
                                </span>
                                <span className="absolute bottom-5 right-6 text-5xl font-black text-white/20" aria-hidden="true">
                                    0{idx + 1}
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col p-6 md:p-7">
                                <h3 className="mb-3 text-2xl font-bold leading-tight">{flag.title}</h3>
                                <p className="mb-6 text-base leading-relaxed text-purple-100">{flag.description}</p>

                                <div className="mt-auto border-t border-white/15 pt-5">
                                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">Compromissos propostos</p>
                                    <ul className="space-y-3 text-sm leading-relaxed text-white/90">
                                        {flag.commitments.map((commitment) => (
                                            <li key={commitment} className="flex gap-3">
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" aria-hidden="true" />
                                                <span>{commitment}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                        );
                    })}
                </div>

            </div >
        </section >
    );
}
