import { apiRequest } from '@/lib/api';

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'EDITOR';
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'EDITOR';
}

export interface UpdateUserPayload {
    name?: string;
    email?: string;
    password?: string;
    role?: 'ADMIN' | 'EDITOR';
}

export const usersService = {
    async getAll(): Promise<AdminUser[]> {
        return apiRequest<AdminUser[]>('/users');
    },

    async create(data: CreateUserPayload): Promise<AdminUser> {
        return apiRequest<AdminUser>('/users', {
            method: 'POST',
            body: data,
        });
    },

    async update(id: string, data: UpdateUserPayload): Promise<AdminUser> {
        return apiRequest<AdminUser>(`/users/${id}`, {
            method: 'PUT',
            body: data,
        });
    },

    async delete(id: string): Promise<void> {
        return apiRequest<void>(`/users/${id}`, { method: 'DELETE' });
    },
};
