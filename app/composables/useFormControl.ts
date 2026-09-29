import { computed, toValue, useId } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

/**
 * Shared form-control helpers: a stable unique id for label/input pairing
 * and the computed "error" class used by every form field.
 */
export function useFormControl(error: MaybeRefOrGetter<string | undefined>) {
    const id = useId()

    const errorClass = computed(() => toValue(error) ? 'error' : '')

    return { id, errorClass }
}
