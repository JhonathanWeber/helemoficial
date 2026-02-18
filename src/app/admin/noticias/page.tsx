"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Loader2, FileText } from "lucide-react";
import { postsService, Post } from "@/services/posts";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NoticiasPage() {
    const [news, setNews] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchNews = async () => {
        try {
            const data = await postsService.getAllAdmin();
            setNews(data);
        } catch (error) {
            console.error("Erro ao buscar notícias:", error);
            alert("Erro ao carregar notícias.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir esta notícia?")) return;

        try {
            setNews(prev => prev.filter(n => n.id !== id));
            await postsService.delete(id);
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir notícia.");
            fetchNews();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Notícias</h1>
                <Link
                    href="/admin/noticias/nova"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus className="w-5 h-5" />
                    Nova Notícia
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                            <th className="p-4 font-medium">Título</th>
                            <th className="p-4 font-medium">Data</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
                                </td>
                            </tr>
                        ) : news.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                    Nenhuma notícia encontrada.
                                </td>
                            </tr>
                        ) : news.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-medium text-gray-800">{item.title}</td>
                                <td className="p-4 text-gray-500">
                                    {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${item.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {item.published ? 'Publicado' : 'Rascunho'}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link
                                        href={`/admin/noticias/${item.id}`}
                                        className="inline-block text-blue-500 hover:bg-blue-50 p-2 rounded transition"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
