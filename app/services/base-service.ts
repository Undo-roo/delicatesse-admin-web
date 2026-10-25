import type { ApiClient } from './api'

// app/services/types.ts
export interface Page<T> {
  data: T[]
  meta: {
    total: number
    page: number
    per_page: number
    total_pages: number
  }
}

export interface ListParams {
  page?: number
  per_page?: number
  search?: string
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
export abstract class BaseService<T, TList = Partial<T>, TCreate = Partial<T>, TUpdate = Partial<T>> {
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
        return this.api.get<Page<TList>>(this.endpoint(), { query: params as Record<string, any> })
    }

    show(id: string | number) {
        return this.api.get<T>(this.endpoint(id))
    }

    store(payload: Partial<TCreate>) {
        return this.api.post<T>(this.endpoint(), payload)
    }

    update(id: string | number, payload: Partial<TUpdate>) {
        return this.api.put<T>(this.endpoint(id), payload)
    }

    patch(id: string | number, payload: Partial<any>) {
        return this.api.patch<T>(this.endpoint(id), payload)
    }

    destroy(id: string | number) {
        return this.api.delete<T>(this.endpoint(id))
    }
}
