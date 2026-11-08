<template>
    <div class="w-full text-black">
        <div v-if="showLabel || showRatio || showPercentage" class="flex items-center gap-1.5 mb-1">
            <Icon v-if="showIcon && showLabel" name="boxicons:list-ul" class="size-4" />
            <span v-if="showLabel" class="font-normal">{{ label }}</span>
            <span v-if="showRatio" class="font-bold">{{ current }} / {{ total }}</span>
            <span v-if="showPercentage" class="ml-auto font-bold" :class="variantClass.text">{{ pct }}%</span>
        </div>

        <div v-if="showBar" class="w-full h-[14px] rounded overflow-hidden mt-2" :class="[variantClass.track, barClass]">
            <div class="h-full rounded" :class="variantClass.fill" :style="{ width: pct + '%' }"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ProgressBar } from '~/types/formatters/progressBar';

const props = withDefaults(defineProps<ProgressBar>(), {
    label: 'Information',
    current: 2,
    total: 10,
    variant: 'default',
    showLabel: true,
    showIcon: true,
    showRatio: true,
    showPercentage: true,
    showBar: true,
	barClass: '',
});

const pct = computed(() => {
    if (!props.total) return 0;
    const v = Math.round((props.current / props.total) * 100);
    return Math.min(100, Math.max(0, v));
});

const variantClasses: Record<NonNullable<ProgressBar['variant']>, { track: string; fill: string; text: string }> = {
    default:   { track: 'bg-status-gray/20',   fill: 'bg-status-gray',   text: 'text-black' },
    emergency: { track: 'bg-status-red/20',    fill: 'bg-status-red',    text: 'text-status-red' },
    danger:    { track: 'bg-status-orange/20', fill: 'bg-status-orange', text: 'text-status-orange' },
    success:   { track: 'bg-status-green/20',  fill: 'bg-status-green',  text: 'text-status-green' },
};

const variantClass = computed(() => variantClasses[props.variant]);
</script>
