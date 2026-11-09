import type { Category } from "~/types/external/category"

export function useCategories() {
    const { categories } = useApi()
    return useAsyncData<Category[]>(
        'categories',
        () => categories.list(),
    )
}
