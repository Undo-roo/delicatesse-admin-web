<template>
    <Teleport to="body">
        <div v-show="open" class="fixed inset-0 z-50 bg-black/50" @click.self="close"></div>
        <Transition :name="transitionName">
            <div v-show="open" :class="panelClass" role="dialog" aria-modal="true">
                <div class="mb-2 flex shrink-0 items-center justify-between">
                    <p class="text-base font-bold text-black">{{ title }}</p>
                    <button type="button" :class="['absolute z-50 flex shrink-0 cursor-pointer items-center justify-center bg-white', closeClass]" @click="close">
                        <Icon :name="closeIcon" class="size-4 text-black" />
                    </button>
                </div>

                <div :class="['flex min-h-0 flex-1 text-black', side === 'bottom' ? 'overflow-x-auto' : 'overflow-y-auto']">
                    <slot />
                </div>
            </div>
        </Transition>
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
    bottom: 'fixed inset-x-0 bottom-0 z-50 flex flex-col min-h-[800px] max-h-[80vh] rounded-tr-lg bg-white p-3',
    left: 'fixed inset-y-0 left-0 z-50 flex flex-col min-w-[320px] max-w-full rounded-rb-lg bg-white p-3',
    right: 'fixed inset-y-0 right-0 z-50 flex flex-col min-w-[320px] max-w-full rounded-lb-lg bg-white p-3',
};

const panelClass = computed(() => panelClasses[props.side]);

const closeIcons: Record<NonNullable<Sheet['side']>, string> = {
    bottom: 'boxicons:chevron-down',
    left: 'boxicons:chevron-left',
    right: 'boxicons:chevron-right',
};

const closeClasses: Record<NonNullable<Sheet['side']>, string> = {
    bottom: 'rounded-t-lg top-[-30px] left-0 py-2 px-3',
    left: 'rounded-r-lg top-0 right-[-30px] py-3 px-2',
    right: 'rounded-l-lg top-0 left-[-30px] py-3 px-2',
};

const closeClass = computed(() => closeClasses[props.side]);

const closeIcon = computed(() => closeIcons[props.side]);

const transitionNames: Record<NonNullable<Sheet['side']>, string> = {
    bottom: 'sheet-bottom',
    left: 'sheet-left',
    right: 'sheet-right',
};

const transitionName = computed(() => transitionNames[props.side]);
</script>

<style scoped>
.sheet-bottom-enter-active { transition: transform 0.3s ease-out; }
.sheet-bottom-leave-active { transition: transform 0.3s ease-in; }
.sheet-bottom-enter-from,
.sheet-bottom-leave-to { transform: translateY(100%); }

.sheet-left-enter-active { transition: transform 0.3s ease-out; }
.sheet-left-leave-active { transition: transform 0.3s ease-in; }
.sheet-left-enter-from,
.sheet-left-leave-to { transform: translateX(-100%); }

.sheet-right-enter-active { transition: transform 0.3s ease-out; }
.sheet-right-leave-active { transition: transform 0.3s ease-in; }
.sheet-right-enter-from,
.sheet-right-leave-to { transform: translateX(100%); }
</style>
