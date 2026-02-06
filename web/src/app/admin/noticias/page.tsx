"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

const INITIAL_NEWS = [
    { id: 1, title: "Helem visita comunidade de Inoã", date: "05/02/2026", status: "Publicado" },
    { id: 2, title: "Projeto Lei 'Mulheres Fortes' aprovado", date: "01/02/2026", status: "Publicado" },
    { id: 3, title: "Agenda da semana: Fevereiro", date: "28/01/2026", status: "Rascunho" },
];

export default function NoticiasPage() {
    const [news, setNews] = useState(INITIAL_NEWS);

    const handleDelete = (id: number) => {
        if (confirm("Tem certeza que deseja excluir esta notícia?")) {
            setNews(news.filter(n => n.id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Notícias</h1>
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus className="w-5 h-5" />
                    Nova Notícia
                </button>
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
                        {news.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-medium text-gray-800">{item.title}</td>
                                <td className="p-4 text-gray-500">{item.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${item.status === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded transition">
                                        <Edit className="w-4 h-4" />
                                    </button>
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
