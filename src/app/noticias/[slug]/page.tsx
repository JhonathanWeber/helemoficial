import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getPostBySlugServer } from "@/lib/server-posts";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { Metadata } from "next";
import Script from "next/script";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlugServer(slug);

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
    const post = await getPostBySlugServer(slug);

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
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
                            alt={`Imagem da notícia: ${post.title} - Helem Christina`}
                            fill
                            unoptimized
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="w-full h-full object-cover"
                            priority
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
