"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Upload, X, ImageIcon } from "lucide-react";
import Link from "next/link";
import { postsService } from "@/services/posts";
import { uploadService } from "@/services/upload";

export default function EditarNoticiaPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        summary: "",
        coverUrl: "",
        fileId: "",
        published: true
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await postsService.getById(id);
                setFormData({
                    title: post.title,
                    content: post.content,
                    summary: (post as any).summary || "",
                    coverUrl: (post as any).coverUrl || "",
                    fileId: (post as any).fileId || "",
                    published: post.published
                });
            } catch (error) {
                console.error("Erro ao buscar notícia:", error);
                alert("Erro ao carregar notícia.");
                router.push("/admin/noticias");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id, router]);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const uploadRes = await uploadService.upload(file);
            setFormData(prev => ({
                ...prev,
                coverUrl: uploadRes.url,
                fileId: uploadRes.fileId
            }));
        } catch (error: any) {
            console.error("Erro no upload:", error);
            alert(error.message || "Erro ao fazer upload da imagem de capa.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemoveCover = () => {
        setFormData(prev => ({ ...prev, coverUrl: "", fileId: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await postsService.update(id, formData);
            router.push("/admin/noticias");
        } catch (error) {
            console.error("Erro ao atualizar notícia:", error);
            alert("Erro ao salvar alterações.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/noticias"
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">Editar Notícia</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-4xl">
                <div className="space-y-6">
                    {/* Cover Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Capa</label>

                        {formData.coverUrl ? (
                            <div className="relative aspect-video w-full max-w-md bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                                <img
                                    src={formData.coverUrl}
                                    alt="Capa"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveCover}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 hover:border-purple-300 transition w-full max-w-md"
                            >
                                {uploading ? (
                                    <Loader2 className="w-8 h-8 mb-2 animate-spin text-purple-600" />
                                ) : (
                                    <ImageIcon className="w-8 h-8 mb-2" />
                                )}
                                <span className="text-sm">
                                    {uploading ? "Enviando..." : "Clique para adicionar uma capa"}
                                </span>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resumo (Opcional)</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            value={formData.summary}
                            onChange={e => setFormData({ ...formData, summary: e.target.value })}
                            placeholder="Breve descrição que aparecerá na listagem..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo (HTML simples)</label>
                        <textarea
                            required
                            rows={10}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="published"
                            className="rounded text-purple-600 focus:ring-purple-500"
                            checked={formData.published}
                            onChange={e => setFormData({ ...formData, published: e.target.checked })}
                        />
                        <label htmlFor="published" className="text-sm font-medium text-gray-700">
                            Publicado
                        </label>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            {saving ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
