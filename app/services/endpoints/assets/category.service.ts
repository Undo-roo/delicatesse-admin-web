import { BaseService } from '../../base-service'
import type { ApiClient } from '../../api'
import type { Category } from '~/types/external/category'

export class CategoryService extends BaseService<Category, Category> {
    constructor(api: ApiClient) {
        super(api, 'assets/categories')
    }

    // The categories endpoint returns a plain array (not the paginated
    // `{ data, meta }` envelope the base list() expects).
    list() {
        return this.api.get<Category[]>(this.endpoint())
    }
}
