
import type { ListParams } from "~/services"
import type { Page } from "~/services/base-service"

export function useApiList<T>(
  key: string,
  fetcher: (params: ListParams) => Promise<Page<T>>,
  initial: ListParams = {},
) {
  const page = ref(initial.page ?? 1)
  const perPage = ref(initial.per_page ?? 10)
  const search = ref(initial.search ?? '')
  const tab = ref((initial as { tab?: string }).tab ?? '')

  const result = useAsyncData(
    key,
    () => fetcher({
      page: page.value,
      per_page: perPage.value,
      search: search.value || undefined,
      tab: tab.value || undefined,
    }),
    { 
      watch: [page, perPage, search, tab],
    },    
  )

  watch([search, perPage, tab], () => { page.value = 1 })

  const rows = computed(() => result.data.value?.data ?? [])
  const meta = computed(() => result.data.value?.meta)

  return { page, perPage, search, tab, rows, meta, ...result }
}
