<template>
    <div :class="baseClass">
        <label v-if="label" class="font-bold text-gray">{{ label }}</label>
        <div class="mt-1 grid grid-cols-4 gap-2.5">
            <input ref="inputRef" type="file" class="hidden" :accept="accept" :disabled="disabled" @change="onChange" />
            <div v-for="(field, i) in fields" :key="i" class="flex flex-col items-center gap-1">
                <div
                    class="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-1 overflow-hidden rounded border-2 border-dashed border-gray bg-white p-3 cursor-pointer transition-colors hover:border-darkGray"
                    :class="{ 'opacity-50 cursor-not-allowed pointer-events-none': disabled }"
                    @click="openPicker(i)"
                    @dragover.prevent
                    @drop.prevent="onDrop(i, $event)"
                >
                    <template v-if="!files[i]">
                        <span class="flex items-center justify-center rounded-[2px] bg-black/5 p-1">
                            <Icon name="boxicons:image" class="size-8 text-black" />
                        </span>
                        <span class="text-xs leading-tight text-black text-center">Choose file<br />or<br />Drag and drop</span>
                    </template>
                    <img v-else :src="previewUrl(files[i])!" :alt="field" class="absolute inset-0 h-full w-full object-cover" />

                    <button
                        v-if="files[i]"
                        type="button"
                        class="absolute top-1 right-1 flex items-center justify-center rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
                        @click.stop="removeFile(i)"
                    >
                        <Icon name="boxicons:x" class="size-4" />
                    </button>
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
    fields: () => ['Front Image', 'Back Image', 'Side Image', 'Any Image'],
});

// Each slot may hold a newly-picked `File`, an existing image `string` (URL)
// being previewed on edit, or `null` (empty).
const files = defineModel<(File | string | null)[]>({ default: () => [] });

const activeIndex = ref<number | null>(null);
const inputRef = ref<HTMLInputElement>();

// Cache object URLs per File so re-renders don't leak new URLs.
const objectUrls = new Map<File, string>();

function previewUrl(entry: File | string | null | undefined): string | null {
    if (!entry) return null;
    if (typeof entry === 'string') return entry;
    let url = objectUrls.get(entry);
    if (!url) {
        url = URL.createObjectURL(entry);
        objectUrls.set(entry, url);
    }
    return url;
}

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

function removeFile(i: number) {
    const next = [...files.value];
    next[i] = null;
    files.value = next;
}

onBeforeUnmount(() => {
    for (const url of objectUrls.values()) URL.revokeObjectURL(url);
});
</script>
