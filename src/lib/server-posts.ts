import { Post } from "@/services/posts";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export async function getPublishedPostsServer(): Promise<Post[]> {
    try {
        const response = await fetch(`${BACKEND_URL}/posts`, {
            cache: "no-store",
        });

        if (!response.ok) {
            return [];
        }

        const data = (await response.json()) as Post[];
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}
