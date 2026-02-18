export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Painel de Controle</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stat Card 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Total de Fotos</h3>
                    <p className="text-4xl font-bold text-purple-700">124</p>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Notícias Publicadas</h3>
                    <p className="text-4xl font-bold text-orange-500">15</p>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase mb-2">Visualizações Hoje</h3>
                    <p className="text-4xl font-bold text-green-500">1.2k</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Atividade Recente</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-600">Nova notícia publicada: "Encontro com Lideranças"</span>
                        </div>
                        <span className="text-xs text-gray-400">Há 2 horas</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-gray-600">5 novas fotos adicionadas à galeria "Campanha 2024"</span>
                        </div>
                        <span className="text-xs text-gray-400">Há 5 horas</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
