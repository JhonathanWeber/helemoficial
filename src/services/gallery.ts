import { apiRequest } from '@/lib/api';

export interface GalleryItem {
    id: string;
    title?: string;
    imageUrl: string;
    fileId?: string; // Firebase usage
    order: number;
    createdAt: string;
}

export interface CreateGalleryItemDTO {
    imageUrl: string;
    title?: string;
    fileId?: string;
}

export const galleryService = {
    async getAll() {
        return apiRequest<GalleryItem[]>('/gallery');
    },

    async create(data: CreateGalleryItemDTO) {
        return apiRequest<GalleryItem>('/gallery', {
            method: 'POST',
            body: data,
        });
    },

    async delete(id: string) {
        return apiRequest<void>(`/gallery/${id}`, {
            method: 'DELETE',
        });
    },
};
