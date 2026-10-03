import { $fetch } from 'ofetch'
import type { FetchOptions } from 'ofetch'

type FetchClient = ReturnType<typeof $fetch.create>

export interface ApiClientOptions {
    /** Base URL every request is resolved against (e.g. http://localhost:8000/api). */
    baseURL?: string
    /** Default headers merged into every request. */
    headers?: Record<string, string>
    /** Request timeout in milliseconds. Defaults to 30s. */
    timeout?: number
    /** Returns the auth token attached as `Authorization: Bearer …` on every request. */
    getToken?: () => string | null | undefined
    /** Called when the API responds with 401 (clear session, redirect to login…). */
    onUnauthorized?: () => void | Promise<void>
    /** Called on any request error, after `onUnauthorized`. */
    onError?: (error: unknown) => void
}

/**
 * Configurable HTTP client built on ofetch (`$fetch`).
 * Create one instance per API and share it with your services.
 */
export class ApiClient {
    private readonly client: FetchClient
    private readonly baseHeaders: Record<string, string>
    private readonly getToken?: () => string | null | undefined
    private readonly onUnauthorized?: () => void | Promise<void>
    private readonly onError?: (error: unknown) => void

    constructor(options: ApiClientOptions = {}) {
        const {
            baseURL,
            headers = {},
            timeout = 30_000,
            getToken,
            onUnauthorized,
            onError,
        } = options

        this.client = $fetch.create({ baseURL, timeout })
        this.baseHeaders = headers
        this.getToken = getToken
        this.onUnauthorized = onUnauthorized
        this.onError = onError
    }

    private async request<T = unknown>(path: string, options: FetchOptions<'json'> = {}): Promise<T> {
        const token = this.getToken?.()

        try {
            return await this.client<T>(path, {
                ...options,
                headers: {
                    ...this.baseHeaders,
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    ...((options.headers ?? {}) as Record<string, string>),
                },
            })
        }
        catch (error) {
            const status = (error as { response?: { status?: number } })?.response?.status
            if (status === 401) {
                void this.onUnauthorized?.()
            }
            this.onError?.(error)
            throw error
        }
    }

    get<T = unknown>(path: string, options?: FetchOptions<'json'>): Promise<T> {
        return this.request<T>(path, { ...options, method: 'GET' })
    }

    post<T = unknown>(path: string, body?: unknown, options?: FetchOptions<'json'>): Promise<T> {
        return this.request<T>(path, { ...options, method: 'POST', body: body as FetchOptions<'json'>['body'] })
    }

    put<T = unknown>(path: string, body?: unknown, options?: FetchOptions<'json'>): Promise<T> {
        return this.request<T>(path, { ...options, method: 'PUT', body: body as FetchOptions<'json'>['body'] })
    }

    patch<T = unknown>(path: string, body?: unknown, options?: FetchOptions<'json'>): Promise<T> {
        return this.request<T>(path, { ...options, method: 'PATCH', body: body as FetchOptions<'json'>['body'] })
    }

    delete<T = unknown>(path: string, options?: FetchOptions<'json'>): Promise<T> {
        return this.request<T>(path, { ...options, method: 'DELETE' })
    }
}
