import { apiRequest } from '@/lib/api';

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface LoginResponse {
    token: string;
    user: User; // Backend returns this on successful login usually, or we fetch /me
}

export const authService = {
    async login(email: string, password: string) {
        // Agora retorna mensagem e user, o token vai no cookie
        return apiRequest<{ message: string, user: User }>('/auth/login', {
            method: 'POST',
            body: { email, password },
        });
    },

    async getMe() {
        return apiRequest<{ user: User }>('/auth/me');
    },

    async logout() {
        return apiRequest<{ message: string }>('/auth/logout', { method: 'POST' });
    },
};
