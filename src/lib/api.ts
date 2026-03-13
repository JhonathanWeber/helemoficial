export const API_URL = '/api'; // Use relative path to leverage Next.js rewrites (proxy)

export async function apiRequest<T = unknown>(
    endpoint: string,
    { method = 'GET', body, headers = {} }: Omit<RequestInit, 'body'> & { body?: unknown } = {}
): Promise<T> {
    const normalizedHeaders = new Headers(headers);

    if (body !== undefined && body !== null) {
        normalizedHeaders.set('Content-Type', 'application/json');
    }

    const config: RequestInit = {
        method,
        headers: normalizedHeaders,
        credentials: 'include', // Important to send cookies
        ...(body !== undefined && body !== null ? { body: JSON.stringify(body) } : {}),
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
