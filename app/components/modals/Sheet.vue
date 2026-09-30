<template>
    <Teleport to="body">
        <div v-if="open" class="fixed inset-0 z-50 bg-black/50" @click.self="close">
            <div :class="panelClass">
                <div class="mb-2 flex items-center justify-between">
                    <p class="text-[12px] font-bold text-black">{{ title }}</p>
                    <button type="button" class="flex-shrink-0" @click="close">
                        <Icon :name="closeIcon" class="size-4 text-black" />
                    </button>
                </div>
                <div class="overflow-y-auto text-black">
                    <slot />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
import type { Sheet } from '~/types/modals/sheet';

const props = withDefaults(defineProps<Sheet>(), {
    title: 'Sheet',
    side: 'bottom',
});

const open = defineModel<boolean>({ default: false });
const emit = defineEmits<{ close: [] }>();

function close() {
    open.value = false;
    emit('close');
}

const panelClasses: Record<NonNullable<Sheet['side']>, string> = {
    bottom: 'absolute inset-x-0 bottom-0 max-h-[80vh] overflow-hidden rounded-t-lg bg-white p-3',
    left: 'absolute inset-y-0 left-0 w-80 max-w-full overflow-hidden rounded-r-lg bg-white p-3',
    right: 'absolute inset-y-0 right-0 w-80 max-w-full overflow-hidden rounded-l-lg bg-white p-3',
};

const panelClass = computed(() => panelClasses[props.side]);

const closeIcons: Record<NonNullable<Sheet['side']>, string> = {
    bottom: 'boxicons:chevron-down',
    left: 'boxicons:chevron-left',
    right: 'boxicons:chevron-right',
};

const closeIcon = computed(() => closeIcons[props.side]);
</script>
