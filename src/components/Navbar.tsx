"use client";

import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Always show at the very top
            if (currentScrollY < 10) {
                setIsVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current) {
                // Scrolling down -> Hide
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

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 z-50 bg-[#6D28D9] bg-helem-purple-mid w-full text-white h-24 flex justify-between items-center pl-6 md:pl-12 pr-6 md:pr-0 transition-transform duration-300 ${isVisible ? 'translate-y-0 shadow-lg' : '-translate-y-full'}`}
        >
            <div className="text-4xl font-cursive">
                Helem Christina
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 items-center text-xs tracking-wider uppercase h-full">
                <Link href="#historia" className="hover:text-yellow-300 transition">Minha História</Link>
                <Link href="#bandeiras" className="hover:text-yellow-300 transition">Minhas Bandeiras</Link>
                <Link href="#galeria" className="hover:text-yellow-300 transition">Galeria de Fotos</Link>
                <Link href="/login" className="text-white/30 hover:text-white transition" title="Login Integrante">
                    <User className="w-5 h-5" />
                </Link>
            </nav>

            <div className="hidden md:flex h-full items-stretch">
                <button className="bg-orange-400 hover:bg-orange-500 text-white px-8 h-full rounded-none text-sm font-bold uppercase transition flex items-center justify-center">
                    Whatsapp
                </button>
                <button className="bg-pink-100 text-purple-800 hover:bg-white px-8 h-full rounded-none text-sm font-bold uppercase transition flex items-center justify-center">
                    Fale comigo!
                </button>
            </div>

            {/* Mobile Menu Icon */}
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="w-8 h-8" />
            </button>

            {/* Mobile Sidebar Overlay */}
            <div className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 z-[70] h-[100dvh] w-[80%] max-w-sm bg-[#6D28D9] shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full bg-helem-purple-mid text-white">
                    <div className="flex justify-end p-6 h-24 items-center">
                        <button onClick={() => setIsMobileMenuOpen(false)}>
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    <nav className="flex flex-col items-center space-y-8 mt-10 text-lg uppercase tracking-wider font-bold">
                        <Link href="#historia" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-300 transition">Minha História</Link>
                        <Link href="#bandeiras" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-300 transition">Minhas Bandeiras</Link>
                        <Link href="#galeria" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-yellow-300 transition">Galeria de Fotos</Link>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-white/30 hover:text-white transition pt-4">
                            <User className="w-6 h-6" />
                        </Link>
                    </nav>

                    <div className="mt-auto flex flex-col">
                        <button className="bg-orange-400 hover:bg-orange-500 text-white py-6 text-sm font-bold uppercase transition">
                            Whatsapp
                        </button>
                        <button className="bg-pink-100 text-purple-800 hover:bg-white py-6 text-sm font-bold uppercase transition">
                            Fale comigo!
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
