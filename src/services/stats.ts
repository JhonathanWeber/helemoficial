import { apiRequest } from '@/lib/api';

export interface DashboardStats {
    stats: {
        totalPosts: number;
        totalPhotos: number;
        viewsToday: number;
    };
    recentActivity: Array<{
        type: 'post' | 'gallery';
        id: string;
        title: string;
        createdAt: string;
    }>;
}

export const statsService = {
    async getDashboardStats(): Promise<DashboardStats> {
        return apiRequest('/stats/dashboard');
    }
};
