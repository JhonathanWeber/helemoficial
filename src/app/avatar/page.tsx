import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AvatarGenerator } from "@/components/avatar/AvatarGenerator";

export const metadata: Metadata = {
    title: "Crie sua Foto de Perfil Oficial | Helem Cristina 45789",
    description: "Coloque a moldura oficial da campanha de Helem Cristina 45789 na sua foto de perfil para WhatsApp e redes sociais.",
    openGraph: {
        title: "Crie sua Foto de Perfil Oficial | Helem Cristina 45789",
        description: "Gere seu avatar oficial de apoio a Helem Cristina para Deputada Estadual do Rio de Janeiro.",
        url: "/avatar",
        siteName: "Helem Cristina",
        images: [
            {
                url: "/whatsapp-image-2026-08-16-hero.jpeg",
                width: 1366,
                height: 768,
                alt: "Gerador de Avatar Oficial Helem Cristina 45789",
            },
        ],
    },
    alternates: {
        canonical: "/avatar",
    },
};

export default function AvatarPage() {
    return (
        <main className="min-h-screen flex flex-col font-sans pt-24 bg-gradient-to-b from-purple-50 via-helem-surface to-purple-100/50">
            <Navbar />

            <section className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
                <div className="max-w-2xl mx-auto flex flex-col items-center">
                    
                    {/* Botão Voltar */}
                    <div className="w-full flex justify-start mb-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-800 hover:text-purple-950 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar para o início
                        </Link>
                    </div>

                    {/* Cabeçalho da Página */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                            Campanha Oficial 45789
                        </div>

                        <h1 className="text-2xl sm:text-4xl font-extrabold text-purple-950 leading-tight">
                            Personalize sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-900 to-orange-500">Foto de Perfil</span>
                        </h1>
                        <p className="text-sm sm:text-base text-purple-900/80 mt-2 max-w-md mx-auto">
                            Mostre seu apoio a <strong>Helem Cristina</strong> adicionando a moldura oficial com o número <strong>45789</strong> no seu WhatsApp e redes sociais.
                        </p>
                    </div>

                    {/* Componente Interativo de Canvas */}
                    <AvatarGenerator />

                    {/* Dicas e Instruções Rápidas */}
                    <div className="w-full max-w-md mt-8 grid grid-cols-3 gap-2 text-center text-xs text-purple-900/80 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-purple-100">
                        <div className="flex flex-col items-center">
                            <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center mb-1 text-xs">1</span>
                            <span>Escolha sua foto</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center mb-1 text-xs">2</span>
                            <span>Ajuste o zoom</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center mb-1 text-xs">3</span>
                            <span>Baixe e compartilhe</span>
                        </div>
                    </div>

                    {/* Aviso de Privacidade */}
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] text-gray-500 text-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Sua foto é processada apenas no seu aparelho e não fica salva em nossos servidores.</span>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
