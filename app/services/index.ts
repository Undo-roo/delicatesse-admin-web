import { ApiClient } from './api'
import type { ApiClientOptions } from './api'
import { AuthService } from './endpoints/auth.service'
import { ProductService } from './endpoints/product.service'

/** Every endpoint service instance, all built around a single ApiClient. */
export interface Services {
    api: ApiClient
    auth: AuthService
    products: ProductService
}

/**
 * Create the shared ApiClient + all endpoint services.
 * Register new endpoint services here — they become available via `useApi()`.
 */
export function createServices(options: ApiClientOptions = {}): Services {
    const api = new ApiClient(options)

    return {
        api,
        auth: new AuthService(api),
        products: new ProductService(api),
    }
}

export { ApiClient }
export type { ApiClientOptions } from './api'
export { BaseService } from './base-service'
export type { ListParams } from './base-service'
