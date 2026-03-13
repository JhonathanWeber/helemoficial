import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Newspaper } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPublishedPostsPaginatedServer } from "@/lib/server-posts";
import { stripHtml } from "@/lib/sanitize-html";

type NoticiasPageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NoticiasPage({ searchParams }: NoticiasPageProps) {
    const params = searchParams ? await searchParams : undefined;
    const pageParam = params?.page;
    const pageRaw = Array.isArray(pageParam) ? pageParam[0] : pageParam;
    const currentPage = Math.max(1, Number(pageRaw || "1") || 1);

    const { data: posts, pagination } = await getPublishedPostsPaginatedServer(currentPage, 9);

    const buildPageHref = (page: number) => `/noticias?page=${page}`;

    return (
        <main className="min-h-screen flex flex-col font-sans pt-24 bg-gray-50">
            <Navbar />

            <section className="py-14 md:py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar para início
                        </Link>
                    </div>

                    <div className="mb-12 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">Todas as Notícias</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Acompanhe ações, projetos e atualizações mais recentes.
                        </p>
                    </div>

                    {posts.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                            <Newspaper className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-600">Nenhuma notícia publicada no momento.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col"
                                    >
                                        <div className="h-52 relative bg-gray-100">
                                            {post.coverUrl ? (
                                                <Image
                                                    src={post.coverUrl}
                                                    alt={post.title}
                                                    fill
                                                    unoptimized
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <Newspaper className="w-10 h-10" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                                                <Calendar className="w-4 h-4" />
                                                <time dateTime={new Date(post.createdAt).toISOString()}>
                                                    {new Intl.DateTimeFormat("pt-BR", {
                                                        day: "2-digit",
                                                        month: "long",
                                                        year: "numeric",
                                                    }).format(new Date(post.createdAt))}
                                                </time>
                                            </div>

                                            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h2>

                                            <p className="text-gray-600 text-sm mb-5 line-clamp-3 flex-grow">
                                                {post.summary || `${stripHtml(post.content).slice(0, 120)}...`}
                                            </p>

                                            <Link
                                                href={`/noticias/${post.slug || post.id}`}
                                                className="inline-flex items-center text-purple-700 font-semibold hover:text-purple-800 transition-colors"
                                            >
                                                Ler notícia completa
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <p className="text-sm text-gray-600">
                                    Página {pagination.page} de {pagination.totalPages} · {pagination.total} notícias
                                </p>

                                <div className="flex items-center gap-3">
                                    <Link
                                        href={buildPageHref(Math.max(1, pagination.page - 1))}
                                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${pagination.hasPrev
                                            ? "border-purple-300 text-purple-700 hover:bg-purple-50"
                                            : "border-gray-200 text-gray-400 pointer-events-none"
                                            }`}
                                    >
                                        Anterior
                                    </Link>
                                    <Link
                                        href={buildPageHref(pagination.page + 1)}
                                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${pagination.hasNext
                                            ? "border-purple-300 text-purple-700 hover:bg-purple-50"
                                            : "border-gray-200 text-gray-400 pointer-events-none"
                                            }`}
                                    >
                                        Próxima
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
