<template>
    <Teleport to="body">
        <Transition :name="transitionName">
            <div v-show="open" :class="positionClass">
                <div class="inline-flex relative max-w-sm gap-4 rounded rounded bg-white px-4 py-3 shadow overflow-hidden">
                    <div class="absolute -left-8 top-0 h-full w-22 rounded-full z-99" :style="{backgroundColor: variantConfig.color, opacity: .05}"></div>
                    <Icon :name="variantConfig.icon" class="size-7 flex-shrink-0 self-center" :style="{color: variantConfig.color}" />
                    <div class="flex flex-col gap-2 max-w-[300px]">
                        <p class="text-md font-bold" :style="{color: variantConfig.color}">{{ title }}</p>
                        <p v-if="description" class="text-sm font-medium text-black word-wrap">{{ description }} </p>
                    </div>
                    <button v-if="showClose" type="button" class="ml-auto flex-shrink-0 cursor-pointer self-start" @click="close">
                        <Icon name="boxicons:x" class="size-4 text-black" />
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import type { Toast } from '~/types/modals/toast';

const props = withDefaults(defineProps<Toast>(), {
    title: 'Title',
    variant: 'success',
    position: 'top-left',
    showClose: true,
    duration: 2_500,
});

const open = defineModel<boolean>({ default: false });
const emit = defineEmits<{ close: [] }>();

let timer: ReturnType<typeof setTimeout> | null = null;

function clearTimer() {
    if (timer !== null) {
        clearTimeout(timer);
        timer = null;
    }
}

function close() {
    clearTimer();
    open.value = false;
    emit('close');
}

watch(open, (val) => {
    clearTimer();
    if (val && props.duration > 0) {
        timer = setTimeout(close, props.duration);
    }
});

onUnmounted(clearTimer);

const variantConfigs: Record<NonNullable<Toast['variant']>, { icon: string; color: string }> = {
    success: { icon: 'boxicons:badge-check-filled', color: '#78C646' },
    error: { icon: 'boxicons:alert-triangle-filled', color: '#ED525A' },
    info: { icon: 'boxicons:info-circle-filled', color: '#71BEDD' },
};

const variantConfig = computed(() => variantConfigs[props.variant]);

const positionClasses: Record<NonNullable<Toast['position']>, string> = {
    'top-left': 'fixed z-50 top-4 left-4',
    'top-middle': 'fixed z-50 top-4 inset-x-0 flex justify-center',
    'top-right': 'fixed z-50 top-4 right-4',
    'bottom-left': 'fixed z-50 bottom-4 left-4',
    'bottom-middle': 'fixed z-50 bottom-4 inset-x-0 flex justify-center',
    'bottom-right': 'fixed z-50 bottom-4 right-4',
};

const transitionNames: Record<NonNullable<Toast['position']>, string> = {
    'top-left': 'toast-left',
    'top-middle': 'toast-top',
    'top-right': 'toast-right',
    'bottom-left': 'toast-left',
    'bottom-middle': 'toast-bottom',
    'bottom-right': 'toast-right',
};

const positionClass = computed(() => positionClasses[props.position]);
const transitionName = computed(() => transitionNames[props.position]);
</script>

<style scoped>
.toast-left-enter-active { transition: transform 0.3s ease-out; }
.toast-left-leave-active { transition: transform 0.3s ease-in; }
.toast-left-enter-from,
.toast-left-leave-to { transform: translateX(-100%); }

.toast-right-enter-active { transition: transform 0.3s ease-out; }
.toast-right-leave-active { transition: transform 0.3s ease-in; }
.toast-right-enter-from,
.toast-right-leave-to { transform: translateX(100%); }

.toast-top-enter-active { transition: transform 0.3s ease-out; }
.toast-top-leave-active { transition: transform 0.3s ease-in; }
.toast-top-enter-from,
.toast-top-leave-to { transform: translateY(-100%); }

.toast-bottom-enter-active { transition: transform 0.3s ease-out; }
.toast-bottom-leave-active { transition: transform 0.3s ease-in; }
.toast-bottom-enter-from,
.toast-bottom-leave-to { transform: translateY(100%); }
</style>
