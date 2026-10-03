import type { ApiClient } from './api'

export interface ListParams {
    page?: number
    per_page?: number
    search?: string
    sort?: string
    order?: 'asc' | 'desc'
    [key: string]: unknown
}

/**
 * Base class for every endpoint service — Laravel resource-controller style.
 *
 * @example
 * class ProductService extends BaseService<Product> {
 *   constructor(api: ApiClient) { super(api, 'products') }
 * }
 *
 * productService.list()      // GET    /products
 * productService.show(1)     // GET    /products/1
 * productService.store(x)    // POST   /products
 * productService.update(1,x) // PUT    /products/1
 * productService.patch(1,x)  // PATCH  /products/1
 * productService.destroy(1)  // DELETE /products/1
 */
export abstract class BaseService<T = unknown> {
    protected readonly resource: string

    constructor(
        protected readonly api: ApiClient,
        resource: string,
    ) {
        this.resource = resource.replace(/^\/+|\/+$/g, '')
    }

    /** Join the resource path with a segment (id or nested sub-resource). */
    protected endpoint(segment: string | number = ''): string {
        const tail = String(segment).replace(/^\/+|\/+$/g, '')
        return tail ? `${this.resource}/${tail}` : this.resource
    }

    list(params?: ListParams) {
        return this.api.get<T[]>(this.endpoint(), { query: params as Record<string, any> })
    }

    show(id: string | number) {
        return this.api.get<T>(this.endpoint(id))
    }

    store(payload: Partial<T>) {
        return this.api.post<T>(this.endpoint(), payload)
    }

    update(id: string | number, payload: Partial<T>) {
        return this.api.put<T>(this.endpoint(id), payload)
    }

    patch(id: string | number, payload: Partial<T>) {
        return this.api.patch<T>(this.endpoint(id), payload)
    }

    destroy(id: string | number) {
        return this.api.delete<T>(this.endpoint(id))
    }
}
