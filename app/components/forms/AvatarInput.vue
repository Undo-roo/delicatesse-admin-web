<template>
    <div
        class="group relative"
        :class="editable ? 'cursor-pointer' : ''"
        @click="editable && openPicker()"
    >
        <img
            v-if="preview"
            :src="preview"
            :alt="name"
            class="rounded bg-lightGray object-cover"
            :style="{ width: `${size}px`, height: `${size}px` }"
        />
        <div
            v-else-if="name"
            class="flex items-center justify-center rounded bg-primary font-bold text-white"
            :style="{ width: `${size}px`, height: `${size}px` }"
        >
            <span :style="{ fontSize: `${Math.round(size * 0.23)}px` }">{{ initials }}</span>
        </div>
        <div
            v-else
            class="flex items-center justify-center rounded bg-primary/75"
            :style="{ width: `${size}px`, height: `${size}px` }"
        >
            <Icon name="boxicons:user-circle" class="size-16 text-white" />
        </div>

        <!-- Hover overlay (dim + camera) -->
        <div
            v-if="editable"
            class="absolute inset-0 flex items-center justify-center rounded bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
        >
			<div class="bg-primary p-2 pb-0 rounded-full">
            	<Icon name="boxicons:camera" class="size-8 text-white" />
			</div>
        </div>

        <!-- Persistent "editable" indicator -->
        <div
            v-if="editable"
            class="absolute bottom-2 right-2 flex size-7 items-center justify-center rounded-full bg-primary text-white shadow"
            title="Change avatar"
        >
            <Icon name="boxicons:edit" class="size-4" />
        </div>

        <input
            v-if="editable"
            ref="inputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onChange"
        />
    </div>
</template>

<script lang="ts" setup>
import type { AvatarInput } from '~/types/forms/avatarInput';

const props = withDefaults(defineProps<AvatarInput>(), {
    src: null,
    name: '',
    editable: false,
    size: 210,
});

const emit = defineEmits<{ change: [file: File] }>();

const inputRef = ref<HTMLInputElement>();

const preview = ref<string | null>(props.src);

watch(() => props.src, (value) => {
    preview.value = value ?? null;
});

const initials = computed(() => {
    if (!props.name) return '';
    return props.name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
});

function openPicker() {
    inputRef.value?.click();
}

function onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    preview.value = URL.createObjectURL(file);
    emit('change', file);
    input.value = '';
}
</script>
