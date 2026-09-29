<template>
    <div :class="baseClass" >
        <label v-if="label" class="font-bold" :for="id">{{ label }}</label>
        <div :class="['base-text-input base-textarea mt-1', errorClass]">
            <component :is="preIcon" />
            <textarea
                :id="id"
                v-model="text"
                :placeholder="placeholder"
                :disabled="disabled"
                :rows="rows"
                :class="{
                    '!resize-none': locked
                }"
            />
            <component :is="postIcon" />
        </div>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import type { Textarea } from '~/types/forms/textarea';
import { useFormControl } from '~/composables/useFormControl';

const props = withDefaults(defineProps<Textarea>(), {
    placeholder: "Add text here",
    rows: 4,
});

const text = defineModel<string>();

const { id, errorClass } = useFormControl(() => props.error);
</script>
