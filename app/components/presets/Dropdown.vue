<template>
    <div
        ref="rootEl"
        class="relative"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- Trigger -->
        <div :class="triggerClass" @click="onTriggerClick">
            <slot name="trigger" :open="open" />
        </div>

        <!-- Menu -->
        <Transition name="dropdown">
            <div v-show="open" :class="[menuClass, alignClass]">
                <div :class="panelClass">
                    <template v-for="(item, i) in items" :key="i">
                        <NuxtLink
                            v-if="item.to"
                            :to="item.to"
                            :class="itemClass"
                            @click="close"
                        >
                            {{ item.label }}
                        </NuxtLink>
                        <button
                            v-else
                            type="button"
                            :class="itemClass"
                            @click="select(item)"
                        >
                            {{ item.label }}
                        </button>
                    </template>
                    <slot name="menu" />
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import type { Dropdown, DropdownItem } from '~/types/presets/dropdown';

const props = withDefaults(defineProps<Dropdown>(), {
    items: () => [],
    trigger: 'click',
    align: 'left',
    triggerClass: 'cursor-pointer',
    menuClass: 'absolute top-full z-30 pt-2',
    panelClass: 'flex min-w-[180px] flex-col gap-3 rounded bg-primary-700 px-3 py-4',
    itemClass: 'whitespace-nowrap text-[26px] font-medium text-white no-underline hover:opacity-80',
});

const emit = defineEmits<{ select: [item: DropdownItem] }>();

const open = ref(false);
const rootEl = ref<HTMLElement>();

const alignClass = computed(() => (props.align === 'right' ? 'right-0' : 'left-0'));

function onMouseEnter() {
    if (props.trigger === 'hover') open.value = true;
}

function onMouseLeave() {
    if (props.trigger === 'hover') open.value = false;
}

function onTriggerClick() {
    if (props.trigger === 'click') open.value = !open.value;
}

function select(item: DropdownItem) {
    open.value = false;
    emit('select', item);
}

function close() {
    open.value = false;
}

function onDocumentClick(e: MouseEvent) {
    if (props.trigger === 'click' && rootEl.value && !rootEl.value.contains(e.target as Node)) {
        open.value = false;
    }
}

onMounted(() => document.addEventListener('click', onDocumentClick));
onUnmounted(() => document.removeEventListener('click', onDocumentClick));
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
}
</style>
