"use client";

import { useEffect, useState } from "react";
import { statsService, DashboardStats } from "@/services/stats";

export default function AdminDashboard() {
    const [data, setData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            try {
                const stats = await statsService.getDashboardStats();
                setData(stats);
            } catch (error) {
                console.error("Erro ao carregar estatísticas", error);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded w-1/4 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-32"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Painel de Controle</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stat Card 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Total de Fotos</h3>
                    <p className="text-4xl font-bold text-purple-700">{data?.stats.totalPhotos || 0}</p>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Notícias Publicadas</h3>
                    <p className="text-4xl font-bold text-orange-500">{data?.stats.totalPosts || 0}</p>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Visualizações Hoje</h3>
                    <p className="text-4xl font-bold text-green-500">{data?.stats.viewsToday || 0}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Atividade Recente</h2>
                <div className="space-y-4">
                    {data?.recentActivity?.length === 0 ? (
                        <p className="text-gray-500 text-sm py-2">Nenhuma atividade recente.</p>
                    ) : (
                        data?.recentActivity?.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-2 h-2 rounded-full ${activity.type === 'post' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                    <span className="text-gray-600">
                                        {activity.type === 'post' ? 'Nova notícia: ' : 'Nova foto na galeria: '}
                                        &quot;{activity.title}&quot;
                                    </span>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(activity.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
