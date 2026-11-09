import { BaseService } from '../../base-service'
import type { ApiClient } from '../../api'
import type { Product, ProductList, ProductPayload } from '~/types/assets/product'

export class ProductService extends BaseService<Product, ProductList, ProductPayload, ProductPayload> {
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

    uploadNutritionalFacts(id: string | number, file: File) {
        const formData = new FormData()
        formData.append('file', file)
        return this.api.put<Product>(this.endpoint(`${id}/nutritional-facts`), formData)
    }

    uploadImages(id: string | number, files: File[]) {
        const formData = new FormData()
        files.forEach((file) => formData.append('files', file))
        return this.api.put<Product>(this.endpoint(`${id}/images`), formData)
    }
}
