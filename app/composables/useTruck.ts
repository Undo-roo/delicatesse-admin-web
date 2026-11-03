import { type Truck, type TruckList } from "~/types/assets/truck"

export function useTrucks() {
  const { trucks } = useApi();
  return useApiList<TruckList>('trucks', p => trucks.list(p), { tab: 'active' });
}

export function useTruck(id: MaybeRefOrGetter<string | number | undefined>) {
  const { trucks } = useApi()
  return useAsyncData<Truck>(
    () => `truck-${toValue(id)}`,
    () => trucks.show(toValue(id)!),
    { enabled: () => toValue(id) != null },
  )
}

export function useTruckActions() {
    const { trucks } = useApi()
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

    const archive = (id: string | number) => run(() => trucks.destroy(id), 'Truck archived', ['trucks'])

    const restore = (id: string | number) => run(() => trucks.restore(id), 'Truck restored', ['trucks'])

    return { loading, archive, restore }
}
