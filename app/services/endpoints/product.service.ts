import { BaseService } from '../base-service'
import type { ApiClient } from '../api'

export interface Product {
    id: string
    name: string
    category: string
    status: string
    price: number
    stock: number
}

export class ProductService extends BaseService<Product> {
    constructor(api: ApiClient) {
        super(api, 'products')
    }

    /** Example custom endpoint beyond the standard CRUD methods. */
    byCategory(category: string) {
        return this.api.get<Product[]>(this.endpoint('categories'), { query: { category } })
    }
}
