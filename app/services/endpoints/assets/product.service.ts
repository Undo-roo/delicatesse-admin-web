import { BaseService } from '../../base-service'
import type { ApiClient } from '../../api'
import type { Product, ProductList } from '~/types/assets/product'

export class ProductService extends BaseService<Product, ProductList> {
    constructor(api: ApiClient) {
        super(api, 'assets/products')
    }

    /** Example custom endpoint beyond the standard CRUD methods. */
    byCategory(category: string) {
        return this.api.get<Product[]>(this.endpoint('categories'), { query: { category } })
    }
    
    restore(id: string | number) {
        return this.api.patch<Product>(this.endpoint(`${id}/restore`))
    }
}
