<template>
    <div :class="baseClass">
        <label v-if="label" class="font-bold text-gray">{{ label }}</label>
        <div
            class="mt-1 flex min-h-[140px] flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-gray bg-white p-4 text-center cursor-pointer transition-colors hover:border-darkGray"
            :class="{ 'opacity-50 cursor-not-allowed pointer-events-none': disabled }"
            @click="openPicker"
            @dragover.prevent
            @drop.prevent="onDrop"
        >
            <input ref="inputRef" type="file" class="hidden" :accept="accept" :disabled="disabled" @change="onChange" />
            <template v-if="!model">
                <img src="/images/default_files.webp" width="100" />
                <p class="text-base font-bold text-black text-lg">{{ description }}</p>
                <p class="text-xs text-black">Drop or click to upload a file. Format: {{ formatText }}</p>
            </template>
            <template v-else>
                <Icon name="boxicons:file" class="size-12 text-primary" />
                <p class="text-sm font-bold text-black break-all">{{ model.name }}</p>
                <p class="text-xs text-gray">Click or drop to replace</p>
            </template>
        </div>
        <p v-if="error" class="text-error mt-2 pl-2">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import type { FileInput } from '~/types/forms/fileInput';

const props = withDefaults(defineProps<FileInput>(), {
    description: 'Upload file',
    accept: 'image/png,image/gif,image/jpeg',
});

const model = defineModel<File | null>({ default: null });

const inputRef = ref<HTMLInputElement>();

const formatText = computed(() => formatList(parseFormats(props.accept)));

// "image/png, .gif, application/pdf" → ["PNG", "GIF", "PDF"]
function parseFormats(accept: string): string[] {
    return accept
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => (t.includes('/') ? t.split('/')[1] : t.replace(/^\./, '')))
        .filter((t) => t && t !== '*')
        .map((t) => t.toUpperCase());
}

function formatList(formats: string[]): string {
    if (!formats.length) return '';
    if (formats.length === 1) return formats[0];
    if (formats.length === 2) return `${formats[0]} or ${formats[1]}`;
    return `${formats.slice(0, -1).join(', ')}, or ${formats[formats.length - 1]}`;
}

function openPicker() {
    inputRef.value?.click();
}

function onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    model.value = input.files?.[0] ?? null;
    input.value = '';
}

function onDrop(e: DragEvent) {
    model.value = e.dataTransfer?.files?.[0] ?? null;
}
</script>
