import type { Product, ProductList } from "~/types/assets/product";

export function useProducts() {
  const { products } = useApi();
  return useApiList<ProductList>('products', p => products.list(p), { tab: 'active' });
}

export function useProduct(id: MaybeRefOrGetter<string | number | undefined>) {
  const { products } = useApi()
  return useAsyncData<Product>(
    () => `product-${toValue(id)}`,
    () => products.show(toValue(id)!),
    { enabled: () => toValue(id) != null },
  )
}

export function useProductActions() {
    const { products } = useApi()
    const { success } = useToast()

    const loading = ref(false)

    async function run(
        action: () => Promise<unknown>,
        message: string,
        keys: string[],
    ) {
        if (loading.value) return false
        loading.value = true
        try {
            await action()
            success(message)
            await refreshNuxtData(keys)
            return true
        }
        catch {
            return false
        }
        finally {
            loading.value = false
        }
    }

    const archive = (id: string | number) => run(() => products.destroy(id), 'Product archived', ['products'])

    const restore = (id: string | number) => run(() => products.restore(id), 'Product restored', ['products'])

    return { loading, archive, restore }
}
