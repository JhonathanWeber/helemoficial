"use client";

import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
    {
        label: "Instagram de Helem Cristina",
        href: "https://www.instagram.com/helemcristinamoreiraoficial",
        Icon: Instagram,
        initial: { x: -50, y: 0 },
    },
    {
        label: "Facebook de Helem Cristina",
        href: "https://www.facebook.com/helen.aleksander.3",
        Icon: Facebook,
        initial: { x: 50, y: 0 },
    },
];

export function Footer() {
    return (
        <footer>
            {/* Socials Bar */}
            <div className="bg-gradient-to-b from-orange-400 to-yellow-100 py-10 flex flex-col items-center">
                <h3 className="text-xl text-purple-800 font-bold mb-1">ME SIGA</h3>
                <h2 className="text-3xl font-extrabold text-purple-900 mb-6">NAS REDES</h2>

                <div className="flex space-x-4">
                    {socialLinks.map(({ label, href, Icon, initial }, i) => {
                        return (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                title={label}
                                initial={{ ...initial, opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                                whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.1 }}
                                className="w-12 h-12 bg-purple-800 rounded-lg flex items-center justify-center text-white hover:bg-purple-600 transition hover:shadow-lg hover:shadow-purple-500/30 hover:scale-110"
                            >
                                <Icon className="w-6 h-6" />
                            </motion.a>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Crowd Banner */}
            <div className="relative w-full min-h-[50vh] md:h-[65vh] bg-gray-900 flex items-end justify-center">
                <Image
                    src="/foto_minha_caminhada_bottom.png"
                    alt="Minha caminhada com as mulheres"
                    fill
                    priority
                    sizes="100vw"
                    className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent pointer-events-none"></div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative z-10 md:mb-32 mb-[35%] max-w-5xl text-center px-6"
                >
                    <h3 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-sans drop-shadow-xl leading-tight">
                        Minha caminhada é junto com as{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 drop-shadow-md">
                            mulheres e os trabalhadores
                        </span>{" "}
                        do nosso estado!
                    </h3>
                    <p className="text-yellow-300 text-center md:text-right text-3xl sm:text-4xl md:text-5xl mt-4 font-cursive font-bold drop-shadow-lg">
                        — Helem Cristina
                    </p>
                </motion.div>
            </div>
            <div className="bg-gray-950 py-5 text-center px-4 border-t border-white/5">
                <p className="text-white/50 text-xs tracking-wider">
                    © 2026 Helem Cristina • Pré-candidata a Deputada Estadual • Rio de Janeiro
                </p>
            </div>
        </footer>
    );
}
