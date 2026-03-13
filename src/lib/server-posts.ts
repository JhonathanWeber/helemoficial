import type { Post } from "@/services/posts";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export interface PaginatedPostsResponse {
    data: Post[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

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

export async function getPublishedPostsPaginatedServer(page = 1, limit = 9): Promise<PaginatedPostsResponse> {
    try {
        const response = await fetch(`${BACKEND_URL}/posts/paginated?page=${page}&limit=${limit}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            return {
                data: [],
                pagination: {
                    page,
                    limit,
                    total: 0,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: page > 1,
                },
            };
        }

        const payload = (await response.json()) as PaginatedPostsResponse;
        return payload;
    } catch {
        return {
            data: [],
            pagination: {
                page,
                limit,
                total: 0,
                totalPages: 1,
                hasNext: false,
                hasPrev: page > 1,
            },
        };
    }
}
