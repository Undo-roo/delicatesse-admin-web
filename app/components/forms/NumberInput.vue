<template>
    <div :class="baseClass">
        <label v-if="label" class="font-bold" :for="id">{{ label }}</label>
        <div :class="['base-text-input mt-1 space-x-2', errorClass]">
            <Icon v-if="preIcon" :name="preIcon" class="size-4 flex-shrink-0" />
            <input
                :id="id"
                type="text"
                inputmode="numeric"
                autocomplete="off"
                :value="text"
                :placeholder="placeholder"
                :disabled="disabled"
                @keydown="onKeydown"
                @input="onInput"
            />
            <Icon v-if="postIcon" :name="postIcon" class="size-4 flex-shrink-0" />
        </div>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import type { NumberInput } from '~/types/forms/numberInput';
import { useFormControl } from '~/composables/useFormControl';

const props = withDefaults(defineProps<NumberInput>(), {
    placeholder: 'Add number here'
});

const text = defineModel<string>();

const { id, errorClass } = useFormControl(() => props.error);

const ALLOWED_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End', 'Enter'];

function onKeydown(e: KeyboardEvent) {
    // Allow shortcuts (copy/paste/select-all) — the input handler sanitizes the rest.
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (ALLOWED_KEYS.includes(e.key)) return;
    if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}

function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const digits = target.value.replace(/\D/g, '');
    if (target.value !== digits) target.value = digits;
    text.value = digits;
}
</script>
