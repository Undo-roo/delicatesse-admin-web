import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { SelectOption } from '~/types/forms/select'
import { useSearchableOptions } from '~/composables/useSearchableOptions'

/**
 * Shared dropdown + selection state for Select (single) and Multiselect (multiple).
 * The model holds the FULL option object (not just `value`), so labels always
 * render even when options change or are fetched asynchronously.
 */
export function useSelectableOptions(
    options: MaybeRefOrGetter<SelectOption[]>,
    fetchOptions: ((query: string) => Promise<SelectOption[]>) | undefined,
    model: Ref<SelectOption | undefined> | Ref<SelectOption[]>,
    multiple: boolean,
) {
    const open = ref(false)
    const rootEl = ref<HTMLElement>()

    const { query, results: searched, loading } = useSearchableOptions(options, fetchOptions)

    const selectedValues = computed<any[]>(() => {
        if (multiple) return (model.value as SelectOption[]).map((o) => o.value)
        const v = model.value as SelectOption | undefined
        return v ? [v.value] : []
    })

    // Drop already-chosen options from the list.
    const results = computed<SelectOption[]>(() =>
        searched.value.filter((o) => !selectedValues.value.includes(o.value)),
    )

    function isSelected(opt: SelectOption) {
        return selectedValues.value.includes(opt.value)
    }

    function select(opt: SelectOption) {
        if (multiple) {
            const arr = [...(model.value as SelectOption[])]
            const i = arr.findIndex((o) => o.value === opt.value)
            if (i >= 0) arr.splice(i, 1)
            else arr.push(opt)
            ;(model as Ref<SelectOption[]>).value = arr
        } else {
            ;(model as Ref<SelectOption | undefined>).value = opt
            open.value = false
            query.value = ''
        }
    }

    function toggle() {
        open.value = !open.value
    }

    function onClickOutside(e: MouseEvent) {
        if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
            open.value = false
        }
    }

    onMounted(() => document.addEventListener('click', onClickOutside))
    onUnmounted(() => document.removeEventListener('click', onClickOutside))

    return { open, rootEl, toggle, query, results, loading, isSelected, select }
}
