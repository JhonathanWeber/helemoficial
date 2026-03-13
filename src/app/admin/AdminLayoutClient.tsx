"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Image as ImageIcon, Newspaper, LogOut, Menu, X } from "lucide-react";
import { authService } from "@/services/auth";
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await authService.getMe();
                setIsAuthLoading(false);
            } catch {
                router.push("/login");
            }
        };
        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error(error);
        }
        router.push("/login");
    };

    if (isAuthLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex font-sans">
                <aside className="bg-purple-950 w-64 flex flex-col fixed h-full z-20 animate-pulse">
                    <div className="h-16 border-b border-purple-800/50 m-6 rounded bg-purple-800/50"></div>
                    <div className="flex-1 px-4 space-y-4 mt-6">
                        <div className="h-12 bg-purple-800/50 rounded"></div>
                        <div className="h-12 bg-purple-800/50 rounded"></div>
                        <div className="h-12 bg-purple-800/50 rounded"></div>
                    </div>
                </aside>
                <main className="ml-64 p-8 flex-1 w-full min-h-screen animate-pulse space-y-8">
                    <div className="w-64 h-10 bg-gray-200 rounded"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="h-32 bg-gray-200 rounded-xl"></div>
                        <div className="h-32 bg-gray-200 rounded-xl"></div>
                        <div className="h-32 bg-gray-200 rounded-xl"></div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-xl mt-8"></div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            <Toaster position="top-right" />

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 md:hidden" 
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Hamburger for mobile */}
            <div className="md:hidden fixed top-4 right-4 z-10">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-2 bg-purple-900 text-white rounded-lg shadow-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`bg-purple-900 text-white transition-all duration-300 flex flex-col fixed h-full z-30
                    ${isSidebarOpen ? 'w-64' : 'w-20'} 
                    ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="p-6 flex items-center justify-between">
                    {(isSidebarOpen || isMobileOpen) && <span className="font-cursive text-2xl font-bold">Helem Admin</span>}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-purple-800 rounded hidden md:block">
                        <Menu className="w-6 h-6" />
                    </button>
                    <button onClick={() => setIsMobileOpen(false)} className="p-1 hover:bg-purple-800 rounded px-2 md:hidden">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 mt-6 px-4 space-y-2">
                    <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" isOpen={isSidebarOpen || isMobileOpen} onClick={() => setIsMobileOpen(false)} />
                    <NavItem href="/admin/galeria" icon={ImageIcon} label="Galeria" isOpen={isSidebarOpen || isMobileOpen} onClick={() => setIsMobileOpen(false)} />
                    <NavItem href="/admin/noticias" icon={Newspaper} label="Notícias" isOpen={isSidebarOpen || isMobileOpen} onClick={() => setIsMobileOpen(false)} />
                </nav>

                <div className="p-4 border-t border-purple-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-3 text-red-300 hover:bg-purple-800 hover:text-red-200 rounded-lg transition"
                    >
                        <LogOut className="w-6 h-6 min-w-6" />
                        {(isSidebarOpen || isMobileOpen) && <span className="ml-3 font-medium">Sair</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} p-4 md:p-8 pt-20 md:pt-8 w-full`}>
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon: Icon, label, isOpen, onClick }: { href: string, icon: LucideIcon, label: string, isOpen: boolean, onClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center p-3 text-gray-200 hover:bg-purple-800 hover:text-white rounded-lg transition"
        >
            <Icon className="w-6 h-6 min-w-6" />
            {isOpen && <span className="ml-3 font-medium truncate">{label}</span>}
        </Link>
    );
}
