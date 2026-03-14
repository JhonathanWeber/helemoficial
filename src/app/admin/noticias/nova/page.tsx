"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Save, Loader2, X, ImageIcon } from "lucide-react";
import Link from "next/link";
import { postsService } from "@/services/posts";
import { uploadService } from "@/services/upload";
import { NoticeBanner } from "@/components/ui/NoticeBanner";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import toast from "react-hot-toast";

export default function NovaNoticiaPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        summary: "",
        coverUrl: "",
        fileId: "",
        category: "",
        tags: [] as string[],
        published: true
    });

    const categories = [
        "Ações Sociais",
        "Saúde",
        "Educação",
        "Mulher",
        "Eventos",
        "Manifestos",
        "Outros"
    ];

    const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = e.currentTarget.value.trim();
            if (newTag && !formData.tags.includes(newTag)) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
            }
            e.currentTarget.value = '';
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setErrorMessage(null);

        setUploading(true);
        try {
            const uploadRes = await uploadService.upload(file);
            setFormData(prev => ({
                ...prev,
                coverUrl: uploadRes.url,
                fileId: uploadRes.fileId
            }));
            toast.success("Imagem enviada com sucesso!");
        } catch (error: unknown) {
            console.error("Erro no upload:", error);
            const message = error instanceof Error ? error.message : "Erro ao fazer upload da imagem de capa.";
            toast.error(message);
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
        setErrorMessage(null);
        setLoading(true);

        try {
            await postsService.create(formData);
            toast.success("Notícia criada com sucesso!");
            router.push("/admin/noticias");
        } catch (error) {
            console.error("Erro ao criar notícia:", error);
            toast.error("Erro ao criar notícia.");
        } finally {
            setLoading(false);
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

            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/noticias"
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">Nova Notícia</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-4xl">
                <div className="space-y-6">
                    {/* Cover Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Capa</label>

                        {formData.coverUrl ? (
                            <div className="relative aspect-video w-full max-w-md bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                                <Image
                                    src={formData.coverUrl}
                                    alt="Capa"
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 100vw, 768px"
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
                            placeholder="Ex: Inauguração do novo centro comunitário"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Selecione uma categoria...</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (Pressione Enter ou vírgula)</label>
                            <input
                                type="text"
                                onKeyDown={handleTagInput}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                placeholder="Adicionar tag..."
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-purple-900 transition">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
                        <RichTextEditor
                            content={formData.content}
                            onChange={(content) => setFormData({ ...formData, content })}
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
                            Publicar imediatamente
                        </label>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            {loading ? "Salvando..." : "Salvar Notícia"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
