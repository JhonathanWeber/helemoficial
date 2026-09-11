"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
    return (
        <section id="contato" className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-yellow-400/90 to-orange-400/90 backdrop-blur-md pt-16 pb-12 px-6 overflow-hidden">
            <div className="max-w-[90%] mx-auto w-full">

                {/* Header */}
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center mb-10 text-center"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-900/15 text-purple-950 ring-1 ring-purple-900/20 mb-3 shadow-xs">
                        <MapPin className="w-6 h-6 animate-bounce-subtle" />
                    </div>
                    <span className="rounded-full border border-purple-900/20 bg-purple-900/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-purple-950 mb-2">
                        Presença & Diálogo
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-purple-950 leading-tight tracking-tight">
                        <span className="block text-lg md:text-xl font-normal text-purple-900 mb-0.5">Venha conversar</span>
                        COMIGO!
                    </h2>
                </motion.div>

                {/* Map & Info Card */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative bg-white/70 rounded-3xl overflow-hidden shadow-2xl h-[420px] md:h-[650px] ring-1 ring-purple-900/10"
                >
                    {/* Google Maps - Maricá RJ */}
                    <div className="w-full h-full relative z-0">
                        <iframe
                            className="w-full h-full grayscale-[40%] hover:grayscale-0 transition-all duration-700 opacity-90"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-42.8251,-22.9231,-42.8191,-22.9171&amp;layer=mapnik&amp;marker=-22.91990,-42.82105"
                            title="Mapa de referência de Maricá"
                        ></iframe>
                    </div>

                    {/* Floating Card - Cores Oficiais da Helem (Roxo/Dourado) */}
                    <div className="absolute bottom-4 right-4 left-4 md:left-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-10 bg-helem-purple-950/95 border border-yellow-400/30 backdrop-blur-xl text-white p-5 md:p-7 rounded-2xl md:rounded-3xl shadow-2xl md:max-w-sm w-auto md:w-full">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold uppercase tracking-wider mb-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                            <span>Maricá, RJ</span>
                        </div>
                        <h4 className="text-xl md:text-2xl font-extrabold mb-2 text-white">Ponto de Referência</h4>
                        <p className="text-xs md:text-sm text-purple-200/90 leading-relaxed mb-5">
                            Consulte os canais oficiais para confirmar locais de atendimento, reuniões e agenda de campanha.
                        </p>
                        <div className="flex flex-col gap-2.5">
                            <a
                                href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/5521978799191"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-purple-950 font-bold py-2.5 md:py-3 px-4 rounded-xl text-xs md:text-sm transition shadow-lg text-center flex items-center justify-center gap-2"
                            >
                                <span>Falar no WhatsApp Oficial</span>
                            </a>
                            <a
                                href="https://www.openstreetmap.org/?mlat=-22.91990&mlon=-42.82105#map=17/-22.91990/-42.82105"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 md:py-2.5 px-4 rounded-xl text-xs md:text-sm transition text-center border border-white/15"
                            >
                                Abrir mapa interativo
                            </a>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
