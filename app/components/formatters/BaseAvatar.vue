<template>
    <div class="inline-flex items-center gap-2">
        <div class="overflow-hidden rounded bg-lightGray" :style="{ width: `${size}px`, height: `${size}px` }">
            <img v-if="src" :src="src" :alt="name" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-[12px] font-bold text-darkGray">
                {{ initials }}
            </div>
        </div>
        <span v-if="name" class="text-[12px] font-normal leading-[1.25] text-black">{{ name }}</span>
    </div>
</template>

<script lang="ts" setup>
import type { BaseAvatar } from '~/types/formatters/baseAvatar';

const props = withDefaults(defineProps<BaseAvatar>(), {
    name: '',
    size: 28,
});

const initials = computed(() => {
    if (!props.name) return '';
    return props.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
});
</script>
