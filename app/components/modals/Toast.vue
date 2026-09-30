<template>
    <div class="inline-flex items-start gap-3 rounded border border-gray bg-white px-4 py-3">
        <Icon :name="variantConfig.icon" class="size-7 flex-shrink-0" :class="variantConfig.color" />
        <div class="flex flex-col gap-2">
            <p class="text-[16px] font-bold leading-[20px]" :class="variantConfig.color">{{ title }}</p>
            <p v-if="description" class="text-[12px] font-medium leading-[15px] text-black">{{ description }}</p>
        </div>
        <button v-if="showClose" type="button" class="ml-auto flex-shrink-0" @click="$emit('close')">
            <Icon name="boxicons:x" class="size-4 text-black" />
        </button>
    </div>
</template>

<script lang="ts" setup>
import type { Toast } from '~/types/modals/toast';

const props = withDefaults(defineProps<Toast>(), {
    title: 'Title',
    variant: 'success',
    showClose: true,
});

defineEmits<{ close: [] }>();

const variantConfigs: Record<NonNullable<Toast['variant']>, { icon: string; color: string }> = {
    success: { icon: 'boxicons:badge-check', color: 'text-[#78C646]' },
    error: { icon: 'boxicons:alert-triangle-filled', color: 'text-[#ED525A]' },
    info: { icon: 'boxicons:info-circle', color: 'text-[#71BEDD]' },
};

const variantConfig = computed(() => variantConfigs[props.variant]);
</script>
