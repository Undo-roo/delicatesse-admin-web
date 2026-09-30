<template>
    <span :class="[baseStyle, variantClass]">
        <Icon v-if="showIcon" name="boxicons:list-ul" class="size-4" />
        <span>{{ text }}</span>
    </span>
</template>

<script lang="ts" setup>
import type { StatusPill } from '~/types/formatters/statusPill';

const props = withDefaults(defineProps<StatusPill>(), {
    text: 'Category',
    variant: 'default',
    showIcon: true,
});

const baseStyle = 'inline-flex items-center gap-2 px-2 py-1 rounded-full w-fit min-h-[22px] text-[12px] font-normal leading-[1.25]';

const variantClasses: Record<NonNullable<StatusPill['variant']>, string> = {
    default: 'bg-status-default text-black',
    red: 'bg-status-red text-white',
    black: 'bg-status-black text-white',
    blue: 'bg-status-blue text-white',
    gray: 'bg-status-gray text-white',
    green: 'bg-status-green text-black',
    'light-blue': 'bg-status-light-blue text-black',
    orange: 'bg-status-orange text-white',
    pink: 'bg-status-pink text-black',
    teal: 'bg-status-teal text-white',
    yellow: 'bg-status-yellow text-black',
};

const variantClass = computed(() => variantClasses[props.variant]);
</script>
