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
                <Icon name="boxicons:image" class="size-12 text-darkGray" />
                <p class="text-base font-bold text-black">{{ description }}</p>
                <p class="text-xs text-black">Drop or click to upload a file</p>
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

withDefaults(defineProps<FileInput>(), {
    description: 'Upload file',
});

const model = defineModel<File | null>({ default: null });

const inputRef = ref<HTMLInputElement>();

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
