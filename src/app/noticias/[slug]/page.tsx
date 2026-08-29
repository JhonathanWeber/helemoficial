import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Newspaper } from "lucide-react";
import { getPostBySlugServer, getRecentPostsServer } from "@/lib/server-posts";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ViewTracker } from "@/components/ViewTracker";
import {
    editorialPreviewEnabled,
    getLocalEditorialPost,
    getLocalEditorialRecentPosts,
} from "@/data/editorial-preview";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const remotePost = await getPostBySlugServer(slug);
    const post = remotePost ?? (editorialPreviewEnabled ? getLocalEditorialPost(slug) : null);

    if (!post) {
        return {
            title: "Notícia não encontrada | Helem Christina",
        };
    }

    return {
        title: `${post.title} | Helem Christina`,
        description: post.summary || `Leia sobre: ${post.title}. Helem Christina, mulher de luta e coragem.`,
        openGraph: {
            title: `${post.title} | Helem Christina`,
            description: post.summary || `Confira essa notícia sobre o trabalho e a luta de Helem Christina.`,
            images: post.coverUrl ? [{ url: post.coverUrl }] : [],
            type: "article",
            publishedTime: new Date(post.createdAt).toISOString(),
            authors: ["Helem Christina"],
        },
        alternates: {
            canonical: `/noticias/${slug}`,
        }
    };
}

export default async function NewsDetailsPage({ params }: Props) {
    const { slug } = await params;
    const remotePost = await getPostBySlugServer(slug);
    const post = remotePost ?? (editorialPreviewEnabled ? getLocalEditorialPost(slug) : null);
    const recentPosts = post
        ? remotePost
            ? await getRecentPostsServer(3, post.id)
            : getLocalEditorialRecentPosts(post.id)
        : [];

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Notícia não encontrada</h1>
                <p className="text-gray-600 mb-6">A notícia que você está procurando não existe ou foi removida.</p>
                <Link
                    href="/noticias"
                    className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                </Link>
            </div>
        );
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: post.title,
        image: post.coverUrl ? [post.coverUrl] : [],
        datePublished: new Date(post.createdAt).toISOString(),
        dateModified: new Date(post.updatedAt || post.createdAt).toISOString(),
        author: [{
            "@type": "Person",
            "name": "Helem Christina",
            "url": "https://helemoficial.com"
        }]
    };

    return (
        <main className="min-h-screen flex flex-col pt-24 bg-gray-50">
            <Navbar />
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ViewTracker postId={post.id} />

            <section className="flex-grow pt-10 pb-16">
                <article className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/noticias"
                            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors mb-6 font-medium"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Voltar
                        </Link>

                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center text-gray-500 gap-4 mb-8">
                            <div className="flex items-center gap-2">
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
                            {post.category && (
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {post.category}
                                </span>
                            )}
                            {editorialPreviewEnabled && !remotePost && (
                                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Prévia local — não publicado
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Cover Image */}
                    {post.coverUrl && (
                        <div className="w-full aspect-video relative rounded-2xl overflow-hidden shadow-lg mb-10 bg-gradient-to-br from-purple-100 via-white to-orange-100">
                            <Image
                                src={post.coverUrl}
                                alt={`Imagem da notícia: ${post.title} - Helem Christina`}
                                fill
                                unoptimized
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                className="w-full h-full object-contain"
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-purple-600 hover:prose-a:text-purple-700">
                        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }} />
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <h3 className="text-sm uppercase tracking-wider font-bold text-gray-500 mb-4">Tags relacionadas</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </section>

            {/* Artigos Relacionados / Recentes */}
            {recentPosts.length > 0 && (
                <section className="bg-white py-16 border-t border-gray-100">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">
                            Leia também
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {recentPosts.map((recentPost) => (
                                <Link
                                    key={recentPost.id}
                                    href={`/noticias/${recentPost.slug}`}
                                    className="group bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col"
                                >
                                    <div className="h-48 relative bg-gradient-to-br from-purple-100 via-white to-orange-100 overflow-hidden">
                                        {recentPost.coverUrl ? (
                                            <Image
                                                src={recentPost.coverUrl}
                                                alt={recentPost.title}
                                                fill
                                                unoptimized
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-contain group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <Newspaper className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                                            <Calendar className="w-3 h-3" />
                                            <time dateTime={new Date(recentPost.createdAt).toISOString()}>
                                                {new Intl.DateTimeFormat("pt-BR", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                }).format(new Date(recentPost.createdAt))}
                                            </time>
                                        </div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2">
                                            {recentPost.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
