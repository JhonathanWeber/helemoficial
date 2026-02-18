import { apiRequest } from '@/lib/api';

export interface Post {
    id: string;
    title: string;
    content: string; // HTML/Markdown from Rich Text Editor
    summary?: string; // Add summary
    slug: string;
    coverUrl?: string; // Add coverUrl
    fileId?: string;   // Add fileId
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePostDTO {
    title: string;
    content: string;
    summary?: string;
    coverUrl?: string;
    fileId?: string;
    published?: boolean;
}

export const postsService = {
    async getAll() {
        return apiRequest<Post[]>('/posts');
    },

    async getAllAdmin() {
        return apiRequest<Post[]>('/posts/admin/all');
    },

    async getBySlug(slug: string) {
        return apiRequest<Post>(`/posts/${slug}`);
    },

    async getById(id: string) {
        return apiRequest<Post>(`/posts/${id}`);
    },

    async create(data: CreatePostDTO) {
        return apiRequest<Post>('/posts', {
            method: 'POST',
            body: data,
        });
    },

    async update(id: string, data: Partial<CreatePostDTO>) {
        return apiRequest<Post>(`/posts/${id}`, {
            method: 'PUT',
            body: data,
        });
    },

    async delete(id: string) {
        return apiRequest<void>(`/posts/${id}`, {
            method: 'DELETE',
        });
    },
};
