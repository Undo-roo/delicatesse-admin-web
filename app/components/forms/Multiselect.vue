<template>
    <div :class="baseClass" >
        <label v-if="label" class="font-bold" :for="id">{{ label }}</label>
        <div class="base-multiselect mt-1" :class="[errorClass, { 'is-disabled': disabled }]" ref="rootEl">
            <!-- SELECTED OPTS -->
            <div class="base-multiselect__control" @click="toggle">
                <div v-if="selectedOptions.length" class="flex flex-wrap gap-2 items-center">
                    <span
                        v-for="opt in selectedOptions"
                        :key="String(opt.value)"
                        class="base-multiselect__chip"
                    >
                        {{ opt.label }}
                        <button type="button" class="base-multiselect__chip-remove" @click.stop="toggleOption(opt)"> <Icon name="boxicons:x-filled" /></button>
                    </span>
                </div>
                <span v-else class="text-darkGray">{{ placeholder }}</span>
            </div>

            <!-- DROPDOWN -->
            <div v-if="open && !disabled" class="base-multiselect__dropdown">
                <input
                    v-if="searchable"
                    v-model="query"
                    type="text"
                    class="base-multiselect__search"
                    placeholder="Search…"
                />
                <div v-if="loading" class="base-multiselect__empty">Loading…</div>
                <div v-else-if="!results.length" class="base-multiselect__empty">No results</div>
                <ul v-else class="base-multiselect__list">
                    <li
                        v-for="opt in results"
                        :key="String(opt.value)"
                        class="base-multiselect__option"
                        @click="toggleOption(opt)"
                    >
                        <input type="checkbox" :checked="isSelected(opt)" @click.stop />
                        <span>{{ opt.label }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { Multiselect } from '~/types/forms/multiselect';
import type { SelectOption } from '~/types/forms/select';
import { useFormControl } from '~/composables/useFormControl';
import { useSearchableOptions } from '~/composables/useSearchableOptions';

const props = withDefaults(defineProps<Multiselect>(), {
    placeholder: "Select…",
});

const model = defineModel<any[]>({ default: () => [] });

const { id, errorClass } = useFormControl(() => props.error);

const open = ref(false);
const rootEl = ref<HTMLElement>();

const { query, results, loading } = useSearchableOptions(
    () => props.options,
    props.fetchOptions,
);

const selectedOptions = computed<SelectOption[]>(() => {
    return (model.value ?? []).map((v) => {
        const found = props.options.find((o) => o.value === v);
        return found ?? { value: v, label: String(v) };
    });
});

function isSelected(opt: SelectOption) {
    return model.value?.includes(opt.value) ?? false;
}

function toggleOption(opt: SelectOption) {
    const arr = [...(model.value ?? [])];
    const i = arr.indexOf(opt.value);
    if (i >= 0) arr.splice(i, 1);
    else arr.push(opt.value);
    model.value = arr;
}

function toggle() {
    if (props.disabled) return;
    open.value = !open.value;
}

function onClickOutside(e: MouseEvent) {
    if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
        open.value = false;
    }
}

onMounted(() => document.addEventListener('click', onClickOutside));
onUnmounted(() => document.removeEventListener('click', onClickOutside));
</script>
