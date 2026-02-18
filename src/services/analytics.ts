import { apiRequest } from '@/lib/api';

export type AnalyticsType = 'VISIT' | 'POST_VIEW' | 'IMAGE_VIEW';

export interface TrackEventParams {
    type: AnalyticsType;
    postId?: string;
    galleryItemId?: string;
    url?: string;
}

export const analyticsService = {
    async track(params: TrackEventParams) {
        // We use window.location.href if url is not provided, but mostly handled by caller or backend could infer referer
        const payload = {
            ...params,
            url: params.url || (typeof window !== 'undefined' ? window.location.href : undefined)
        };

        // Fire and forget - usually analytics doesn't block UI
        apiRequest('/analytics', {
            method: 'POST',
            body: payload
        }).catch(err => console.error('Analytics error:', err));
    }
};
