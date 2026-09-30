<template>
    <Teleport to="body">
        <div
            v-if="open"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            @click.self="close"
        >
            <div class="w-full max-w-[420px] rounded-lg bg-white p-3">
                <div class="mb-3 flex items-center justify-between">
                    <p class="text-[12px] font-bold text-black">{{ title }}</p>
                    <button type="button" class="flex-shrink-0" @click="close">
                        <Icon name="boxicons:x" class="size-4 text-black" />
                    </button>
                </div>
                <div class="text-black">
                    <slot />
                </div>
                <div v-if="$slots.footer" class="mt-3 flex justify-end gap-2">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
import type { Dialog } from '~/types/modals/dialog';

withDefaults(defineProps<Dialog>(), {
    title: 'Dialog',
});

const open = defineModel<boolean>({ default: false });
const emit = defineEmits<{ close: [] }>();

function close() {
    open.value = false;
    emit('close');
}
</script>
