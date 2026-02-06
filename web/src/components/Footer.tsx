"use client";

import { Instagram, Facebook, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer>
            {/* Socials Bar */}
            <div className="bg-gradient-to-b from-orange-400 to-yellow-100 py-10 flex flex-col items-center">
                <h3 className="text-xl text-purple-800 font-bold mb-1">ME SIGA</h3>
                <h2 className="text-3xl font-extrabold text-purple-900 mb-6">NAS REDES</h2>

                <div className="flex space-x-4">
                    {[Instagram, Youtube, ExternalLink /* TikTok alternate */, Facebook, Linkedin].map((Icon, i) => {
                        let initial = {};
                        if (i < 2) initial = { x: -50, y: 0 }; // Left reduced
                        else if (i === 2) initial = { x: 0, y: 50 }; // Bottom reduced
                        else initial = { x: 50, y: 0 }; // Right reduced

                        return (
                            <motion.a
                                key={i}
                                href="#"
                                initial={{ ...initial, opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                                whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.1 }}
                                className="w-12 h-12 bg-purple-800 rounded-lg flex items-center justify-center text-white hover:bg-purple-600 transition shadow-lg"
                            >
                                <Icon className="w-6 h-6" />
                            </motion.a>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Crowd Banner */}
            <div className="relative w-full h-[65vh] bg-gray-900 flex items-end justify-center">
                <img
                    src="/foto_minha_caminhada_bottom.png"
                    alt="Minha caminhada com as mulheres"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />

                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="relative z-10 md:mb-40 mb-[35%] max-w-4xl text-center px-4"
                >
                    <h3 className="text-white text-4xl md:text-7xl font-bold font-sans drop-shadow-md">
                        Minha caminhada é junto com as mulheres<br />
                        e os trabalhadores do nosso estado!
                    </h3>
                    <p className="text-white text-center md:text-right text-xl md:text-3xl mt-2 font-bold">- Helem</p>
                </motion.div>
            </div>
        </footer>
    );
}
