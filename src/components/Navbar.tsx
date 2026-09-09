"use client";

import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/5521978799191";

export function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);

            // Em telas mobile (largura < 768px), manter sempre visível para evitar estranheza
            if (window.innerWidth < 768) {
                setIsVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            // No desktop, autohide suave apenas ao rolar consideravelmente
            if (currentScrollY < 10) {
                setIsVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down -> Hide (desktop only)
                setIsVisible(false);
            } else {
                // Scrolling up -> Show
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Show if mouse is within top 60px
            if (e.clientY < 60) {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 z-50 bg-helem-purple-900/90 backdrop-blur-xl backdrop-saturate-150 w-full text-white h-16 sm:h-20 md:h-24 flex justify-between items-center pl-4 sm:pl-6 md:pl-12 pr-4 sm:pr-6 md:pr-0 transition-all duration-300 ${
                isVisible ? 'translate-y-0' : 'md:-translate-y-full'
            } ${isScrolled ? 'shadow-xl bg-helem-purple-950/95' : 'shadow-md'}`}
        >
            <Link href="/" className="text-2xl sm:text-3xl md:text-4xl font-cursive font-bold hover:text-yellow-300 transition-colors">
                Helem Cristina
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 items-center text-xs tracking-wider uppercase h-full">
                <Link href="/#historia" className="relative group hover:text-yellow-300 transition">
                    <span>Minha História</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/#bandeiras" className="relative group hover:text-yellow-300 transition">
                    <span>Minhas Bandeiras</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/#galeria" className="relative group hover:text-yellow-300 transition">
                    <span>Galeria de Fotos</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/avatar" className="relative group text-yellow-300 hover:text-yellow-200 transition font-bold">
                    <span>Criar Avatar</span>
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-200 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link href="/login" className="text-white/30 hover:text-white transition" title="Login Integrante">
                    <User className="w-5 h-5" />
                </Link>
            </nav>

            <div className="hidden md:flex h-full items-stretch">
                <a
                    href={whatsappUrl || "/#contato"}
                    target={whatsappUrl ? "_blank" : undefined}
                    rel={whatsappUrl ? "noopener noreferrer" : undefined}
                    className="bg-orange-400 hover:bg-orange-500 text-white px-8 h-full rounded-none text-sm font-bold uppercase transition flex items-center justify-center hover:shadow-lg hover:shadow-orange-400/30"
                >
                    Whatsapp
                </a>
            </div>

            {/* Mobile Menu Icon */}
            <button 
                className="md:hidden p-2 rounded-xl hover:bg-white/10 active:scale-90 transition flex items-center justify-center text-white" 
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Abrir menu de navegação"
            >
                <Menu className="w-7 h-7" />
            </button>

            {/* Mobile Sidebar Overlay */}
            <div 
                className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 z-[70] h-[100dvh] w-[85%] max-w-xs bg-helem-purple-950 shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full bg-helem-purple-950 text-white">
                    <div className="flex justify-between p-6 h-16 sm:h-20 items-center border-b border-purple-900/50">
                        <span className="font-cursive text-2xl font-bold text-yellow-300">Helem Cristina</span>
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-xl hover:bg-white/10 active:scale-90 transition text-white"
                            aria-label="Fechar menu"
                        >
                            <X className="w-7 h-7" />
                        </button>
                    </div>

                    <nav className="flex flex-col items-center space-y-6 mt-8 px-6 text-base sm:text-lg uppercase tracking-wider font-bold">
                        <Link href="/#historia" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 hover:text-yellow-300 transition">
                            <span>Minha História</span>
                        </Link>
                        <Link href="/#bandeiras" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 hover:text-yellow-300 transition">
                            <span>Minhas Bandeiras</span>
                        </Link>
                        <Link href="/noticias" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 hover:text-yellow-300 transition">
                            <span>Notícias</span>
                        </Link>
                        <Link href="/#galeria" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-2 hover:text-yellow-300 transition">
                            <span>Galeria de Fotos</span>
                        </Link>
                        <Link 
                            href="/avatar" 
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-purple-700 via-orange-500 to-yellow-400 text-white shadow-lg font-extrabold"
                        >
                            <span>Criar Avatar 45789</span>
                        </Link>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-white/40 hover:text-white transition pt-2 flex items-center gap-2 text-sm font-medium">
                            <User className="w-4 h-4" />
                            <span>Área Integrante</span>
                        </Link>
                    </nav>

                    <div className="mt-auto flex flex-col">
                        <a
                            href={whatsappUrl || "/#contato"}
                            target={whatsappUrl ? "_blank" : undefined}
                            rel={whatsappUrl ? "noopener noreferrer" : undefined}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="bg-orange-400 hover:bg-orange-500 text-white py-6 text-sm font-bold uppercase transition text-center hover:shadow-lg hover:shadow-orange-400/30"
                        >
                            Whatsapp
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
