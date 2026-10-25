import { $fetch } from 'ofetch'
import type { FetchOptions } from 'ofetch'

type FetchClient = ReturnType<typeof $fetch.create>

export interface ApiClientOptions {
    baseURL?: string
    headers?: Record<string, string>
    timeout?: number
    getToken?: () => string | null | undefined
    /** Called on any failed request. */
    onError?: (error: unknown) => void | Promise<void>
}

export class ApiClient {
    private readonly client: FetchClient
    private readonly getToken?: ApiClientOptions['getToken']
    private readonly onError?: ApiClientOptions['onError']

    constructor(options: ApiClientOptions = {}) {
        const { baseURL, headers = {}, timeout = 30_000, getToken, onError } = options

        this.client = $fetch.create({ baseURL, timeout, headers })
        this.getToken = getToken
        this.onError = onError
    }

    private async request<T = unknown>(path: string, options: FetchOptions<'json'> = {}): Promise<T> {
        const token = this.getToken?.()

        const headers = new Headers(options.headers as HeadersInit | undefined)
        if (token) headers.set('Authorization', `Bearer ${token}`)

        try {
            return await this.client<T>(path, { ...options, headers })
        }
        catch (error) {

            try {
                await this.onError?.(error)
            }
            catch (handlerError) {
                console.error('[ApiClient] error handler failed:', handlerError)
            }

            throw error // callers still decide what to do next
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