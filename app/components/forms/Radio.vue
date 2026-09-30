<template>
    <div :class="baseClass">
        <button
            type="button"
            class="inline-flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="disabled"
            @click="select"
        >
            <Icon
                :name="selected ? 'boxicons:radio-circle-marked' : 'boxicons:radio-circle'"
                class="size-5 flex-shrink-0"
                :class="selected ? 'text-primary' : 'text-gray'"
            />
            <span v-if="label" class="font-bold text-black">{{ label }}</span>
        </button>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import type { Radio } from '~/types/forms/radio';

const props = withDefaults(defineProps<Radio>(), {});

const model = defineModel<string | number | boolean>();

const selected = computed(() => model.value === props.value);

function select() {
    model.value = props.value;
}
</script>
