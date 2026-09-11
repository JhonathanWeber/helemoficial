"use client";

import { useEffect, useState } from "react";
import { Newspaper, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Post, postsService } from "@/services/posts";
import { stripHtml } from "@/lib/sanitize-html";
import { editorialPreviewEnabled, localEditorialPosts } from "@/data/editorial-preview";

export function NewsSection() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch published posts (default endpoint returns published: true)
                const data = await postsService.getAll();
                // In development, show the reviewed editorial drafts first without publishing them.
                setPosts(editorialPreviewEnabled ? [...localEditorialPosts, ...data].slice(0, 3) : data.slice(0, 3));
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
                setPosts(editorialPreviewEnabled ? localEditorialPosts : []);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-white min-h-[400px] flex flex-col items-center justify-center">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full">
                                <div className="aspect-[4/3] w-full skeleton sm:aspect-video"></div>
                                <div className="p-6 flex flex-col gap-3">
                                    <div className="h-6 w-3/4 skeleton rounded"></div>
                                    <div className="h-4 w-full skeleton rounded mt-3"></div>
                                    <div className="h-4 w-5/6 skeleton rounded"></div>
                                    <div className="h-4 w-1/4 skeleton rounded mt-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (posts.length === 0) return null;

    return (
        <section id="noticias" className="py-20 bg-white relative overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16 text-center max-w-2xl mx-auto">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 ring-1 ring-purple-200 mb-3 shadow-xs">
                        <Newspaper className="w-6 h-6" />
                    </div>
                    <span className="rounded-full border border-purple-800/15 bg-purple-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-purple-900 mb-2">
                        Atualizações & Ações
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-950 mb-3 tracking-tight">
                        Últimas <span className="text-helem-purple-700">Notícias</span>
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
                        Acompanhe minhas ações, projetos, posicionamentos e agenda recente por todo o Rio de Janeiro.
                    </p>
                    {editorialPreviewEnabled && (
                        <span className="mt-4 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-semibold text-amber-800 border border-amber-200">
                            Prévia local — não publicado
                        </span>
                    )}
                </div>

                {/* Grid */}
                <motion.div
                    variants={{
                        hidden: {},
                        show: {}
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {posts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100/90 flex flex-col h-full group ring-1 ring-purple-950/5"
                        >
                            {/* Image */}
                            <div className="aspect-[4/3] sm:aspect-video overflow-hidden relative bg-gradient-to-br from-purple-100/60 via-purple-50 to-orange-50">
                                {post.coverUrl ? (
                                    <Image
                                        src={post.coverUrl}
                                        alt={post.title}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Newspaper className="w-12 h-12 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-purple-800 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-purple-100">
                                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                                    <span>{new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.createdAt))}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-7 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-helem-purple-700 transition-colors leading-snug">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-light">
                                    {post.summary || `${stripHtml(post.content).substring(0, 100)}...`}
                                </p>

                                <div className="pt-4 border-t border-gray-100 mt-auto">
                                    <Link
                                        href={`/noticias/${post.slug || post.id}`}
                                        className="inline-flex items-center text-helem-purple-700 font-bold text-sm hover:text-helem-purple-900 transition-colors group/link"
                                    >
                                        <span>Ler matéria completa</span>
                                        <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

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
