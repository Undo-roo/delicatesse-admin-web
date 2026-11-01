import { type Client, type ClientList } from "~/types/external/client"

export function useClients() {
  const { clients } = useApi();
  return useApiList<ClientList>('clients', p => clients.list(p), { tab: 'active' });
}

export function useClient(id: MaybeRefOrGetter<string | number | undefined>) {
  const { clients } = useApi()
  return useAsyncData<Client>(
    () => `client-${toValue(id)}`,
    () => clients.show(toValue(id)!),
    { enabled: () => toValue(id) != null },
  )
}

export function useClientActions() {
    const { clients } = useApi()
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

    const archive = (id: string | number) => run(() => clients.destroy(id), 'Client archived', ['clients'])

    const restore = (id: string | number) => run(() => clients.restore(id), 'Client restored', ['clients'])

    return { loading, archive, restore }
}
