"use client";

import { useEffect, useState } from "react";
import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Post, postsService } from "@/services/posts";

export function NewsSection() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch published posts (default endpoint returns published: true)
                const data = await postsService.getAll();
                // Take only the latest 3 posts
                setPosts(data.slice(0, 3));
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-white min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </section>
        );
    }

    if (posts.length === 0) return null;

    return (
        <section id="noticias" className="py-20 bg-white relative overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16 text-center">
                    <div className="bg-purple-100 p-3 rounded-full mb-4">
                        <Newspaper className="w-8 h-8 text-purple-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Últimas <span className="text-purple-600">Notícias</span>
                    </h2>
                    <p className="text-gray-500 max-w-lg">
                        Acompanhe minhas ações, projetos e novidades recentes.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full group"
                        >
                            {/* Image */}
                            <div className="h-48 overflow-hidden relative bg-gray-100">
                                {post.coverUrl ? (
                                    <img
                                        src={post.coverUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Newspaper className="w-12 h-12 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-purple-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.createdAt))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                                    {post.summary || post.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + "..."}
                                </p>

                                <Link
                                    href={`/noticias/${post.slug || post.id}`}
                                    className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-800 transition-colors group/link"
                                >
                                    Ler mais
                                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/noticias"
                        className="inline-flex items-center justify-center px-8 py-3 border border-purple-600 text-purple-600 font-medium rounded-full hover:bg-purple-50 transition-colors duration-300"
                    >
                        Ver todas as notícias
                    </Link>
                </div>

            </div>

            {/* Decorative Dots */}
            <div className="absolute top-20 right-0 opacity-10">
                <div className="w-32 h-32 pattern-dots text-purple-500"></div>
            </div>
            <div className="absolute bottom-20 left-0 opacity-10">
                <div className="w-32 h-32 pattern-dots text-purple-500"></div>
            </div>
        </section>
    );
}
