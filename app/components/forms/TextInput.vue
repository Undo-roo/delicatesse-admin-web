<template>
    <div :class="baseClass" >
        <label v-if="label" class="font-bold" :for="id">{{ label }}</label>
        <div :class="['base-text-input mt-1', errorClass]">
            <component :is="preIcon" />
            <input 
                :id="id"
                type="text"
                v-model="text"
                :placeholder="placeholder"
                :disabled="disabled"
            />
            <component :is="postIcon" />
        </div>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import { useId } from 'vue';
import type { TextInput } from '~/types/forms/textInput';

const props = withDefaults(defineProps<TextInput>(), {
    placeholder: "Add text here"
});

const text = defineModel<string>();

const errorClass = computed(() => {
    if(props.error) return "error";

    return ""
})

// Unique per component instance, stable across SSR hydration
const id = useId();
</script>
