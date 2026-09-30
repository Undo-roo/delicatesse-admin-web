<template>
    <div :class="baseClass">
        <label v-if="label" class="font-bold" :for="id">{{ label }}</label>
        <div :class="['base-text-input mt-1 space-x-2', errorClass]">
            <Icon name="boxicons:calendar-alt" class="size-4 flex-shrink-0" />
            <input
                :id="id"
                type="text"
                readonly
                :value="date"
                :placeholder="placeholder"
                :disabled="disabled"
            />
            <Icon v-if="hasTime" name="boxicons:clock" class="size-4 flex-shrink-0" />
        </div>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import type { DateInput } from '~/types/forms/dateInput';
import { useFormControl } from '~/composables/useFormControl';

const props = withDefaults(defineProps<DateInput>(), {
    placeholder: 'Select a Date',
    hasTime: false
});

const date = defineModel<string>();

const { id, errorClass } = useFormControl(() => props.error);
</script>
