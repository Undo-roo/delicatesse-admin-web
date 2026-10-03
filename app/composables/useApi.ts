/**
 * Access the shared API client + endpoint services.
 *
 * @example
 * const { api, auth, products } = useApi()
 * await products.list({ page: 1, per_page: 10 })
 */
export function useApi() {
    return useNuxtApp().$services
}
