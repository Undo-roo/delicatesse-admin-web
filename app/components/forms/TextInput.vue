<template>
    <div :class="baseClass" >
        <label v-if="label" class="font-bold" :for="id">{{ label }}</label>
        <div :class="['base-text-input mt-1 space-x-2 bg-white', errorClass]">
            <Icon v-if="preIcon" :name="preIcon" :class="['size-4 flex-shrink-0', preIconClass]" />
            <input 
                :id="id"
                :type="type"
                v-model="text"
                :placeholder="placeholder"
                :disabled="disabled"
            />
            <Icon v-if="postIcon" :name="postIcon" :class="['size-4 flex-shrink-0', postIconClass]" />
        </div>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import type { TextInput } from '~/types/forms/textInput';
import { useFormControl } from '~/composables/useFormControl';

const props = withDefaults(defineProps<TextInput>(), {
    placeholder: "Add text here",
    type: "text"
});

const text = defineModel<string>();

const { id, errorClass } = useFormControl(() => props.error);
</script>
