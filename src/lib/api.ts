export const API_URL = '/api'; // Use relative path to leverage Next.js rewrites (proxy)

export async function apiRequest<T = any>(
    endpoint: string,
    { method = 'GET', body, headers = {} }: Omit<RequestInit, 'body'> & { body?: any } = {}
): Promise<T> {
    const config: RequestInit = {
        method,
        headers: {
            ...(body && { 'Content-Type': 'application/json' }),
            ...headers,
        },
        credentials: 'include', // Important to send cookies
        ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);


    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'API Request failed');
    }

    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}
