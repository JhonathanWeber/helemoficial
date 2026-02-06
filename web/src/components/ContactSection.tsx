"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
    return (
        <section className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-yellow-400/90 to-orange-400/90 backdrop-blur-md pt-16 pb-12 px-6 overflow-hidden">
            <div className="max-w-[90%] mx-auto w-full">

                {/* Header */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex justify-center items-center mb-10 space-x-3"
                >
                    <MapPin className="text-purple-700 w-10 h-10 fill-transparent" />
                    <h2 className="text-3xl font-bold text-purple-800 leading-tight">
                        <span className="block text-lg font-normal text-purple-700">Venha conversar</span>
                        COMIGO!
                    </h2>
                </motion.div>

                {/* Map & Info Card */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                    whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative bg-white/50 rounded-3xl overflow-hidden shadow-xl h-[500px] md:h-[700px]"
                >
                    {/* Google Maps - Maricá RJ */}
                    <div className="w-full h-full relative z-0">
                        <iframe
                            className="w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-700 opacity-90"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-42.8251,-22.9231,-42.8191,-22.9171&amp;layer=mapnik&amp;marker=-22.91990,-42.82105"
                            title="Mapa de Maricá - Prefeitura"
                        ></iframe>
                    </div>

                    {/* Floating Card */}
                    <div className="absolute bottom-6 right-6 md:top-1/2 md:-translate-y-1/2 md:right-10 bg-[#0EA5E9] text-white p-6 rounded-2xl shadow-2xl max-w-sm w-full">
                        <h3 className="text-xl font-bold mb-1">Prefeitura Municipal</h3>
                        <h4 className="text-2xl font-extrabold mb-4">de Maricá</h4>
                        <p className="text-sm opacity-90 mb-6">
                            Rua Álvares de Castro, 346<br />
                            Centro, Maricá - RJ, 24900-880
                        </p>
                        <button className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold py-3 px-8 rounded-full w-full transition shadow-lg">
                            Ver no Mapa
                        </button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
