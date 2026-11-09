<template>
    <div :class="size ? 'flex flex-wrap items-center gap-2.5' : 'grid grid-cols-4 gap-2.5'">
        <div
            v-for="(image, index) in images"
            :key="`${index}-${image}`"
            class="flex flex-col items-center gap-1"
        >
            <div
                class="overflow-hidden rounded bg-lightGray"
                :class="size ? '' : 'aspect-[4/5] w-full'"
                :style="size ? { width: `${size}px`, height: `${Math.round(size * 1.25)}px` } : undefined"
            >
                <img
                    :src="image"
                    :alt="`${name} — ${sequenceLabel(index)}`"
                    class="h-full w-full object-cover"
                />
            </div>
            <span class="text-sm font-bold text-black">{{ sequenceLabel(index) }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { GroupImagePreview } from '~/types/formatters/groupImagePreview';

const props = withDefaults(defineProps<GroupImagePreview>(), {
    name: '',
});

const images = computed(() => props.images.filter((image) => image));

const SEQUENCE = ['Front Image', 'Back Image', 'Side Image'];

function sequenceLabel(index: number): string {
    return SEQUENCE[index] ?? 'Any Image';
}
</script>
