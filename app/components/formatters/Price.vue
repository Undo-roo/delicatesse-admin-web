<template>
    <span class="inline-flex items-center gap-2 px-1 py-2">
        <span class="text-[12px] font-bold text-gray">{{ currency }}</span>
        <Icon v-if="variant === 'decrease'" name="boxicons:minus" class="size-4 text-status-red" />
        <Icon v-if="variant === 'increase'" name="boxicons:plus" class="size-4 text-status-green" />
        <span class="text-[12px] font-bold text-black">{{ value }}</span>
    </span>
</template>

<script lang="ts" setup>
import type { Price } from '~/types/formatters/price';

withDefaults(defineProps<Price>(), {
    value: '2.25K',
    currency: '₱',
    variant: 'default',
});
</script>
