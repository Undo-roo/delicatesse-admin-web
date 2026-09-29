<template>
    <div :class="baseClass" >
        <label v-if="label" class="font-bold" :for="id">{{ label }}</label>
        <div
            class="base-select mt-1"
            :class="[errorClass, { 'is-disabled': disabled, 'is-open': open }]"
            ref="rootEl"
            @click="onBoxClick"
        >
            <component v-if="preIcon" :is="preIcon" />
            <span v-if="selectedLabel" class="base-select__value">{{ selectedLabel }}</span>
            <span v-else class="base-select__placeholder">{{ placeholder }}</span>
            <component v-if="postIcon" :is="postIcon" />

            <div v-if="open && !disabled" class="base-select__dropdown" @click.stop>
                <input
                    v-if="searchable"
                    ref="searchInput"
                    v-model="query"
                    type="text"
                    class="base-select__search"
                    placeholder="Search…"
                />
                <div v-if="loading" class="base-select__empty">Loading…</div>
                <div v-else-if="!results.length" class="base-select__empty">No results</div>
                <div
                    v-for="(opt, index) in results"
                    :key="String(opt.value)"
                    class="base-select__option"
                    :class="{ 'base-select__option--selected': isSelected(opt) }"
                    @click="select(opt)"
                >
                    <slot name="option" :option="opt" :index="index">
                        {{ opt.label }}
                    </slot>
                </div>
            </div>
        </div>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import type { Select, SelectOption } from '~/types/forms/select';
import { useFormControl } from '~/composables/useFormControl';
import { useSearchableOptions } from '~/composables/useSearchableOptions';

const props = withDefaults(defineProps<Select>(), {
    placeholder: "Select…",
});

const model = defineModel<any>();

const { id, errorClass } = useFormControl(() => props.error);

const open = ref(false);
const rootEl = ref<HTMLElement>();
const searchInput = ref<HTMLInputElement>();

const { query, results, loading } = useSearchableOptions(
    () => props.options,
    props.fetchOptions,
);

const selectedLabel = computed(() => {
    if (model.value === undefined || model.value === null) return '';
    const found = props.options.find((o) => o.value === model.value);
    return found?.label ?? String(model.value);
});

function isSelected(opt: SelectOption) {
    return opt.value === model.value;
}

function select(opt: SelectOption) {
    model.value = opt.value;
    open.value = false;
    query.value = '';
}

function onBoxClick() {
    if (props.disabled) return;
    open.value = !open.value;
    if (open.value && props.searchable) {
        nextTick(() => searchInput.value?.focus());
    }
}

function onClickOutside(e: MouseEvent) {
    if (rootEl.value && !rootEl.value.contains(e.target as Node)) {
        open.value = false;
    }
}

onMounted(() => document.addEventListener('click', onClickOutside));
onUnmounted(() => document.removeEventListener('click', onClickOutside));
</script>
