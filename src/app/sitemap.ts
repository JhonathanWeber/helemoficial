import { MetadataRoute } from 'next';
import { getPublishedPostsServer } from '@/lib/server-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://helemoficial.com';

    // Base routes
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/noticias`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
    ];

    try {
        // Dynamic routes for news
        const posts = await getPublishedPostsServer();

        const postRoutes = posts.map((post) => ({
            url: `${baseUrl}/noticias/${post.slug || post.id}`,
            lastModified: new Date(post.createdAt),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        return [...routes, ...postRoutes];
    } catch (error) {
        console.error('Erro ao gerar sitemap de noticias:', error);
        return routes;
    }
}