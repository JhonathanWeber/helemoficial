"use client";

import { useRef } from "react";
import { Key } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HistorySection() {
    const containerRef = useRef<HTMLElement>(null);
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

    return (
        <section
            ref={containerRef}
            id="historia"
            className="w-full min-h-screen flex flex-col justify-center bg-[#FAF9F6]/90 backdrop-blur-md py-16 px-6 md:px-20 relative overflow-hidden"
        >
            {/* Header with Icon */}
            <motion.div
                style={{ opacity, scale }}
                className="flex flex-col items-center justify-center mb-12"
            >
                <Key className="text-yellow-400 w-12 h-12 mb-2 rotate-45" strokeWidth={2.5} />
                <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-900 leading-tight">
                    <span className="block text-xl font-normal text-purple-800">Conheça minha</span>
                    HISTÓRIA
                </h2>
            </motion.div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center text-base md:text-lg text-gray-800">

                {/* Left Column: Image */}
                <motion.div
                    style={{ x: xImage, opacity, scale }}
                    className="relative flex justify-center lg:justify-end order-1 lg:order-none"
                >
                    {/* Yellow decorative blob background */}
                    <div className="absolute top-10 w-64 h-[70%] md:w-80 md:h-[80%] bg-yellow-400 rounded-3xl mix-blend-multiply opacity-60 blur-2xl"></div>

                    <div className="relative z-10 w-[280px] md:w-full max-w-[500px] bg-transparent rounded-2xl border-4 border-white shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
                        <img
                            src="/helem foto de perfil corpo.jpg"
                            alt="Helem Portrait"
                            className="w-full h-auto object-contain rounded-xl"
                        />
                    </div>
                </motion.div>

                {/* Right Column: Text */}
                <motion.div
                    style={{ x: xText, opacity, scale }}
                    className="space-y-6 md:space-y-8 text-purple-950 font-medium leading-relaxed px-4 md:px-0 order-2 lg:order-none text-center md:text-left"
                >
                    <p>
                        Eu sou Helem.<br />
                        Sou mulher, mãe, filha de lutas e movida pelo amor às pessoas e aos territórios onde a vida acontece.
                    </p>
                    <p>
                        <strong>Minha história na política</strong> não começou em gabinete. <strong>Começou na escuta, lá trás, através da minha mãe</strong>, quando eu ainda era bem pequenininha.
                    </p>
                    <p className="bg-yellow-200/50 p-2 rounded -rotate-1 inline-block">
                        Depois, se concretizou na rua, nas conversas difíceis, nas dores que muita gente tenta ignorar e na certeza de que dá, sim, pra fazer diferente.
                    </p>
                    <p>
                        <strong>Luto pelas mulheres</strong>, por quem trabalha muito, pela dignidade de quem nunca teve voz.
                    </p>
                    <p>
                        Acredito numa política que abraça, que protege e que transforma – não numa política distante e fria.
                    </p>
                    <p className="border-l-4 border-purple-600 pl-4 py-1 italic">
                        Sempre caminhei junto com lideranças comunitárias, movimentos e pessoas comuns que só querem viver melhor. <strong>Porque política, pra mim, é presença e é coragem.</strong>
                    </p>
                    <p>
                        Eu sigo porque acredito.<br />
                        E porque sei que quando a gente caminha junto, ninguém fica pra trás.
                    </p>
                </motion.div>
            </div>

            {/* Decorative side element */}
            <div className="absolute top-1/2 right-0 w-32 h-64 bg-purple-800 rounded-l-full opacity-10 translate-x-16"></div>
        </section>
    );
}
