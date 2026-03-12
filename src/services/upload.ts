import { API_URL } from '@/lib/api';

export interface UploadResponse {
    url: string;
    fileId: string;
    filename: string;
    mimetype: string;
    size: number;
}

export const uploadService = {
    async upload(file: File): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
            credentials: 'include', // Important to send cookies
            // Next.js / fetch automatically sets Content-Type to multipart/form-data with boundary
            // when body is FormData, so we don't set it manually in headers.
            headers: {
                // Assuming auth token is handled via cookies or we need to add Authorization header if in localStorage
                // 'Authorization': `Bearer ${token}` 
                // If apiRequest handles auth, we might need to replicate that logic or make apiRequest support FormData
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Erro ao fazer upload da imagem.');
        }

        return response.json();
    },
};
