<template>
    <div :class="baseClass">
        <div class="flex items-center gap-2">
            <button
                type="button"
                class="relative w-12 h-6 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                :class="[radiusClass, model ? 'bg-primary' : 'bg-gray']"
                :disabled="disabled"
                @click="toggle"
            >
                <span
                    class="absolute top-[2px] left-[2px] size-5 bg-white transition-transform duration-200"
                    :class="[radiusClass, model ? 'translate-x-[24px]' : 'translate-x-0']"
                />
                <Icon
                    v-if="icon"
                    :name="icon"
                    class="absolute top-1 left-[6px] size-4 text-lightGray transition-transform duration-200"
                    :class="model ? 'translate-x-0' : 'translate-x-[20px]'"
                />
            </button>
            <span v-if="label" class="font-bold text-black">{{ label }}</span>
        </div>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import type { Toggle } from '~/types/forms/toggle';

const props = withDefaults(defineProps<Toggle>(), {
    shape: 'pill',
});

const model = defineModel<boolean>({ default: false });

const radiusClass = computed(() => (props.shape === 'square' ? 'rounded' : 'rounded-full'));

function toggle() {
    model.value = !model.value;
}
</script>
