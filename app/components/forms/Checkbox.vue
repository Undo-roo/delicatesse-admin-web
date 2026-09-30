<template>
    <div :class="baseClass">
        <button
            type="button"
            class="inline-flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="disabled"
            @click="toggle"
        >
            <Icon
                :name="model ? 'boxicons:checkbox-square' : 'boxicons:checkbox'"
                class="size-6 flex-shrink-0"
                :class="model ? 'text-primary' : 'text-gray'"
            />
            <span v-if="label" class="font-bold text-black">{{ label }}</span>
        </button>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import type { Checkbox } from '~/types/forms/checkbox';

withDefaults(defineProps<Checkbox>(), {});

const model = defineModel<boolean>({ default: false });

function toggle() {
    model.value = !model.value;
}
</script>
