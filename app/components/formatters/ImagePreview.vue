<template>
    <div class="inline-flex items-center gap-2 max-w-full">
        <div class="shrink-0 overflow-hidden rounded bg-lightGray" :style="{ width: `${size}px`, height: `${size}px` }">
            <img v-if="src" :src="src" :alt="name" class="w-full h-full object-cover" />
            <img v-else src="/images/default_image.png" :alt="name" class="w-full h-full object-cover" />
        </div>
		<div class="min-w-0">
			<span v-if="name" class="block truncate font-bold text-sm text-black">{{ name }}</span>
			<span v-if="imageData" class="block text-black font-light text-sm">{{ imageData }}</span>
		</div>
    </div>
</template>

<script lang="ts" setup>
import type { ImagePreview } from '~/types/formatters/imagePreview';

const props = withDefaults(defineProps<ImagePreview>(), {
    name: '',
	space: '',
	extension: '',
	width: 0,
	height: 0,
    size: 40,
});

const imageData = computed(() => {
	const dimension = `${props.width} x ${props.height}` 

	const data = [props.extension, props.space, dimension];


	return data.filter(d => !!d).join(' | ');
});
</script>