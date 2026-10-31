<template>
    <button
        :type="type"
        :class="[variantClass, baseClass, baseStyle]"
        :disabled="disabled"
    >
        <Icon v-if="preIcon" :class="['size-5', preIconClass]" :name="preIcon" />
        <span v-if="text">{{ text }}</span>
        <Icon v-if="postIcon" :class="['size-5', postIconClass]" :name="postIcon" />
    </button>
</template>

<script lang="ts" setup>
import type { Button } from '~/types/forms/button';

const props = withDefaults(defineProps<Button>(), {
    variant: 'default',
    type: 'button'
});

const baseStyle = `
	h-[40px] min-w-[40px] p-2 rounded-lg inline-flex 
	items-center justify-center gap-2 
	font-medium cursor-pointer transition-colors
	disabled:cursor-not-allowed disabled:bg-lightGray disabled:text-darkGray disabled:border-none disabled:shadow
`;

const variantClasses: Record<NonNullable<Button['variant']>, string> = {
    default: 'bg-primary hover:bg-primary-800 text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary-50 bg-white',
    ghost: 'text-black hover:bg-gray bg-white',
    secondary: 'bg-lightGray text-darkGray hover:bg-gray',
    destructive: 'bg-error hover:bg-red-800 text-white',
    link: 'text-primary underline hover:text-primary-800',
};

const variantClass = computed(() => variantClasses[props.variant]);
</script>
