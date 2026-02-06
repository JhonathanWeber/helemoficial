"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, Newspaper, LogOut, Menu } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside
                className={`bg-purple-900 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed h-full z-20`}
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen && <span className="font-cursive text-2xl font-bold">Helem Admin</span>}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-purple-800 rounded">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 mt-6 px-4 space-y-2">
                    <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" isOpen={isSidebarOpen} />
                    <NavItem href="/admin/galeria" icon={ImageIcon} label="Galeria" isOpen={isSidebarOpen} />
                    <NavItem href="/admin/noticias" icon={Newspaper} label="Notícias" isOpen={isSidebarOpen} />
                </nav>

                <div className="p-4 border-t border-purple-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-3 text-red-300 hover:bg-purple-800 hover:text-red-200 rounded-lg transition"
                    >
                        <LogOut className="w-6 h-6 min-w-[24px]" />
                        {isSidebarOpen && <span className="ml-3 font-medium">Sair</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon: Icon, label, isOpen }: { href: string, icon: any, label: string, isOpen: boolean }) {
    return (
        <Link
            href={href}
            className="flex items-center p-3 text-gray-200 hover:bg-purple-800 hover:text-white rounded-lg transition"
        >
            <Icon className="w-6 h-6 min-w-[24px]" />
            {isOpen && <span className="ml-3 font-medium">{label}</span>}
        </Link>
    );
}
