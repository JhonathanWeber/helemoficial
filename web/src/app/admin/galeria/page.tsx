"use client";

import { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";

const INITIAL_PHOTOS = [
    { id: 1, url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=300", title: "Encontro Mulheres" },
    { id: 2, url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=300", title: "Sorriso" },
    { id: 3, url: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=300", title: "Grupo Debate" },
];

export default function GaleriaPage() {
    const [photos, setPhotos] = useState(INITIAL_PHOTOS);

    const handleDelete = (id: number) => {
        if (confirm("Tem certeza que deseja excluir esta foto?")) {
            setPhotos(photos.filter(p => p.id !== id));
        }
    };

    const handleUpload = () => {
        alert("Funcionalidade de upload será integrada com o backend (ex: AWS S3 ou UploadThing).");
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Galeria</h1>
                <button
                    onClick={handleUpload}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus className="w-5 h-5" />
                    Adicionar Foto
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 border-dashed border-2 flex flex-col items-center justify-center py-12 text-gray-400 cursor-pointer hover:bg-gray-50 transition" onClick={handleUpload}>
                <Upload className="w-12 h-12 mb-2" />
                <p>Clique ou arraste fotos aqui para fazer upload</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {photos.map(photo => (
                    <div key={photo.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <button
                                onClick={() => handleDelete(photo.id)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                                title="Excluir"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
