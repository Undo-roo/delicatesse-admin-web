import { ref, computed, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import debounce from 'lodash/debounce'
import type { SelectOption } from '~/types/forms/select'

/**
 * Shared search logic for searchable form fields.
 * - If `fetchOptions` is provided, it debounces async fetching.
 * - Otherwise it filters the static `options` locally by label.
 */
export function useSearchableOptions(
  options: MaybeRefOrGetter<SelectOption[]>,
  fetchOptions?: (query: string) => Promise<SelectOption[]>,
) {
  const query = ref('')
  const fetched = ref<SelectOption[]>([])
  const loading = ref(false)

  async function runSearch(q: string) {
    if (!fetchOptions) return
    loading.value = true
    try {
      fetched.value = (await fetchOptions(q)) ?? []
    } catch {
      fetched.value = []
    } finally {
      loading.value = false
    }
  }

  const debouncedSearch = debounce((q: string) => runSearch(q), 300)

  watch(query, (q) => {
    if (fetchOptions) debouncedSearch(q)
  })

  const results = computed<SelectOption[]>(() => {
    if (fetchOptions) return fetched.value

    const all = toValue(options)
    const q = query.value.trim().toLowerCase()
    if (!q) return all
    return all.filter((o) => o.label.toLowerCase().includes(q))
  })

  function reset() {
    query.value = ''
    fetched.value = []
    debouncedSearch.cancel()
  }

  return { query, results, loading, reset }
}
