<template>
    <button
        :class="[variantClass, baseClass, baseStyle]"
        :disabled="disabled"
    >
        <Icon v-if="preIcon" class="size-4" :name="preIcon" />
        <span v-if="text">{{ text }}</span>
        <Icon v-if="postIcon" class="size-4" :name="postIcon" />
    </button>
</template>

<script lang="ts" setup>
import type { Button } from '~/types/forms/button';

const props = withDefaults(defineProps<Button>(), {
    variant: 'default'
});

const baseStyle = 'h-[40px] p-2 rounded-lg inline-flex items-center justify-center gap-2 font-medium cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50';

const variantClasses: Record<NonNullable<Button['variant']>, string> = {
    default: 'bg-primary hover:bg-primary-800 text-white',
    outline: 'border border-primary text-primary hover:bg-primary-50',
    ghost: 'text-primary hover:bg-primary-50',
    secondary: 'bg-lightGray text-darkGray hover:bg-gray',
    destructive: 'bg-error hover:bg-red-800 text-white',
    link: 'text-primary underline hover:text-primary-800',
};

const variantClass = computed(() => variantClasses[props.variant]);
</script>
