<template>
    <div :class="baseClass" >
        <label v-if="label" class="font-bold" :for="id">{{ label }}</label>
        <div class="base-multiselect mt-1" :class="[errorClass, { 'is-disabled': disabled }]" ref="rootEl">
            <!-- SELECTED OPTS -->
            <div class="base-multiselect__control" @click="onToggle">
                <div v-if="model.length" class="flex flex-wrap gap-2 items-center">
                    <span
                        v-for="opt in model"
                        :key="String(opt.value)"
                        class="base-multiselect__chip"
                    >
                        {{ opt.label }}
                        <button type="button" class="base-multiselect__chip-remove" @click.stop="select(opt)"> <Icon name="boxicons:x-filled" /></button>
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
                        @click="select(opt)"
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
import type { Multiselect } from '~/types/forms/multiselect';
import type { SelectOption } from '~/types/forms/select';
import { useFormControl } from '~/composables/useFormControl';
import { useSelectableOptions } from '~/composables/useSelectableOptions';

const props = withDefaults(defineProps<Multiselect>(), {
    placeholder: "Select…",
});

const model = defineModel<SelectOption[]>({ default: () => [] });

const { id, errorClass } = useFormControl(() => props.error);

const { open, rootEl, toggle, query, results, loading, isSelected, select } = useSelectableOptions(
    () => props.options,
    props.fetchOptions,
    model,
    true,
);

function onToggle() {
    if (props.disabled) return;
    toggle();
}
</script>
