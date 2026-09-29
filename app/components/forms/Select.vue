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
            <span v-if="model" class="base-select__value">{{ model.label }}</span>
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
import { ref, nextTick } from 'vue';
import type { Select, SelectOption } from '~/types/forms/select';
import { useFormControl } from '~/composables/useFormControl';
import { useSelectableOptions } from '~/composables/useSelectableOptions';

const props = withDefaults(defineProps<Select>(), {
    placeholder: "Select…",
});

const model = defineModel<SelectOption>();

const { id, errorClass } = useFormControl(() => props.error);

const searchInput = ref<HTMLInputElement>();

const { open, rootEl, toggle, query, results, loading, isSelected, select } = useSelectableOptions(
    () => props.options,
    props.fetchOptions,
    model,
    false,
);

function onBoxClick() {
    if (props.disabled) return;
    toggle();
    if (open.value && props.searchable) {
        nextTick(() => searchInput.value?.focus());
    }
}
</script>
