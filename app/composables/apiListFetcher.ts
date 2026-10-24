
import type { ListParams } from "~/services"
import type { Page } from "~/services/base-service"

export function useApiList<T>(
  key: string,
  fetcher: (params: ListParams) => Promise<Page<T>>,
  initial: ListParams = {},
) {
  const page = ref(initial.page ?? 1)
  const perPage = ref(initial.per_page ?? 10)
  const search = ref('')

  const result = useAsyncData(
    key,
    () => fetcher({ page: page.value, per_page: perPage.value, search: search.value || undefined }),
    { watch: [page, perPage, search] },
  )

  watch([search, perPage], () => { page.value = 1 })

  const rows = computed(() => result.data.value?.data ?? [])
  const meta = computed(() => result.data.value?.meta)

  return { page, perPage, search, rows, meta, ...result }
}