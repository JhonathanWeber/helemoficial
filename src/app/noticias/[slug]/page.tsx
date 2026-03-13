"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { postsService, Post } from "@/services/posts";
import { sanitizeHtml } from "@/lib/sanitize-html";

export default function NewsDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            try {
                const data = await postsService.getBySlug(slug);
                setPost(data);
            } catch (err) {
                console.error("Erro ao carregar notícia:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Notícia não encontrada</h1>
                <p className="text-gray-600 mb-6">A notícia que você está procurando não existe ou foi removida.</p>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
            <article className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors mb-6 font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                    </button>

                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                        {post.title}
                    </h1>

                    <div className="flex items-center text-gray-500 gap-2 mb-8">
                        <Calendar className="w-5 h-5" />
                        <time dateTime={post.createdAt.toString()}>
                            {new Intl.DateTimeFormat('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            }).format(new Date(post.createdAt))}
                        </time>
                    </div>
                </div>

                {/* Cover Image */}
                {post.coverUrl && (
                    <div className="w-full aspect-video relative rounded-2xl overflow-hidden shadow-lg mb-10">
                        <Image
                            src={post.coverUrl}
                            alt={post.title}
                            fill
                            unoptimized
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-purple-600 hover:prose-a:text-purple-700">
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} />
                </div>
            </article>
        </main>
    );
}
