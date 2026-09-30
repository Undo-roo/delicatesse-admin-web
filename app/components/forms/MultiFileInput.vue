<template>
    <div :class="baseClass">
        <label v-if="label" class="font-bold text-gray">{{ label }}</label>
        <div class="mt-1 flex flex-wrap gap-2.5">
            <input ref="inputRef" type="file" class="hidden" :accept="accept" :disabled="disabled" @change="onChange" />
            <div v-for="(field, i) in fields" :key="i" class="flex flex-col items-center gap-1">
                <div
                    class="flex h-[100px] w-20 flex-col items-center justify-center gap-1 rounded border-2 border-dashed border-gray bg-white p-3 cursor-pointer transition-colors hover:border-darkGray"
                    :class="{ 'opacity-50 cursor-not-allowed pointer-events-none': disabled }"
                    @click="openPicker(i)"
                    @dragover.prevent
                    @drop.prevent="onDrop(i, $event)"
                >
                    <template v-if="!files[i]">
                        <span class="flex items-center justify-center rounded-[2px] bg-black p-1">
                            <Icon name="boxicons:image" class="size-4 text-white" />
                        </span>
                        <span class="text-xs leading-tight text-black text-center">Choose file<br />or<br />Drag and drop</span>
                    </template>
                    <template v-else>
                        <Icon name="boxicons:file" class="size-6 text-primary" />
                        <span class="text-xs leading-tight text-black text-center break-all">{{ files[i]?.name }}</span>
                    </template>
                </div>
                <span class="text-xs font-bold text-black">{{ field }}</span>
            </div>
        </div>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import type { MultiFileInput } from '~/types/forms/multiFileInput';

withDefaults(defineProps<MultiFileInput>(), {
    fields: () => ['Front Image', 'Back Image', 'Left Image', 'Right Image'],
});

const files = defineModel<(File | null)[]>({ default: () => [] });

const activeIndex = ref<number | null>(null);
const inputRef = ref<HTMLInputElement>();

function openPicker(i: number) {
    activeIndex.value = i;
    inputRef.value?.click();
}

function onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (activeIndex.value !== null) {
        const next = [...files.value];
        next[activeIndex.value] = file;
        files.value = next;
    }
    input.value = '';
    activeIndex.value = null;
}

function onDrop(i: number, e: DragEvent) {
    const file = e.dataTransfer?.files?.[0] ?? null;
    if (file) {
        const next = [...files.value];
        next[i] = file;
        files.value = next;
    }
}
</script>
