"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Plus, Trash2, Upload, Loader2, ImageIcon } from "lucide-react";
import { galleryService, GalleryItem } from "@/services/gallery";
import { uploadService } from "@/services/upload";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { NoticeBanner } from "@/components/ui/NoticeBanner";

export default function GaleriaPage() {
    const [photos, setPhotos] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchPhotos = async () => {
        try {
            const data = await galleryService.getAll();
            setPhotos(data);
        } catch (error) {
            console.error("Erro ao buscar fotos:", error);
            setErrorMessage("Erro ao carregar a galeria.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const handleDelete = async () => {
        if (!pendingDeleteId) return;

        try {
            setDeleting(true);
            // Optimistic update
            setPhotos(prev => prev.filter(p => p.id !== pendingDeleteId));
            await galleryService.delete(pendingDeleteId);
            setSuccessMessage("Foto excluída com sucesso.");
            setPendingDeleteId(null);
        } catch (error) {
            console.error("Erro ao excluir:", error);
            setErrorMessage("Erro ao excluir foto.");
            fetchPhotos(); // Revert on error
        } finally {
            setDeleting(false);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            // 1. Upload file
            const uploadRes = await uploadService.upload(file);

            // 2. Create gallery item
            const newPhoto = await galleryService.create({
                imageUrl: uploadRes.url,
                fileId: uploadRes.fileId,
                title: file.name.split('.')[0] // Default title from filename
            });

            setPhotos(prev => [newPhoto, ...prev]);
        } catch (error: unknown) {
            console.error("Erro no upload:", error);
            const message = error instanceof Error ? error.message : "Erro ao fazer upload da imagem.";
            setErrorMessage(message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            {errorMessage && (
                <NoticeBanner
                    type="error"
                    message={errorMessage}
                    onClose={() => setErrorMessage(null)}
                />
            )}
            {successMessage && (
                <NoticeBanner
                    type="success"
                    message={successMessage}
                    onClose={() => setSuccessMessage(null)}
                />
            )}

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Galeria</h1>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
                >
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                    {uploading ? "Enviando..." : "Adicionar Foto"}
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                />
            </div>

            {/* Upload Area (Drag & Drop trigger could be added here) */}
            <div
                className="bg-white p-6 rounded-xl shadow-sm border-2 border-dashed border-gray-200 mb-8 flex flex-col items-center justify-center py-12 text-gray-400 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => fileInputRef.current?.click()}
            >
                {uploading ? (
                    <Loader2 className="w-12 h-12 mb-2 animate-spin text-purple-600" />
                ) : (
                    <Upload className="w-12 h-12 mb-2" />
                )}
                <p>{uploading ? "Processando imagem..." : "Clique para fazer upload de uma nova foto"}</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : photos.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Nenhuma foto na galeria ainda.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {photos.map(photo => (
                        <div key={photo.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src={photo.imageUrl}
                                alt={photo.title || "Foto"}
                                fill
                                unoptimized
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setPendingDeleteId(photo.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transform hover:scale-110 transition"
                                    title="Excluir"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            {photo.title && (
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3 text-white text-xs truncate">
                                    {photo.title}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <ConfirmDialog
                isOpen={Boolean(pendingDeleteId)}
                title="Excluir foto"
                description="Tem certeza que deseja excluir esta foto? Esta ação não pode ser desfeita."
                confirmText="Excluir"
                onCancel={() => setPendingDeleteId(null)}
                onConfirm={handleDelete}
                loading={deleting}
            />
        </div>
    );
}
