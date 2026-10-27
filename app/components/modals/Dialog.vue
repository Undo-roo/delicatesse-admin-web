<template>
    <Teleport to="body">
        <Transition name="dialog">
            <div
                v-if="open"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                @click.self="onBackdropClick"
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    :aria-labelledby="titleId"
                    :class="['dialog-panel w-full rounded-lg bg-white p-6 shadow-xl', maxWidth]"
                >
					<div v-if="$slots.header" class="mb-3 flex gap-3 items-center w-full">
						<slot name="header" :title-id="titleId" />
					</div>

					<h2 v-else-if="title" :id="titleId" class="mb-3 text-lg font-bold text-black">
						{{ title }}
					</h2>

                    <div class="text-black">
                        <slot />
                    </div>

                    <div v-if="$slots.footer" class="mt-6 flex justify-end gap-2">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    title?: string
    maxWidth?: string
    /** Allow closing with the backdrop click and Escape. Turn off while saving. */
    closeOnBackdrop?: boolean
}>(), {
    maxWidth: 'max-w-md',
    closeOnBackdrop: true,
})

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ close: [] }>()
const titleId = useId()

function close() {
    open.value = false
    emit('close')
}

function onBackdropClick() {
    if (props.closeOnBackdrop) close()
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && props.closeOnBackdrop) close()
}

watch(open, (isOpen) => {
    if (!import.meta.client) return
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) window.addEventListener('keydown', onKeydown)
    else window.removeEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
    if (!import.meta.client) return
    window.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
})
</script>

<style scoped>
/* backdrop fades; the panel inside scales and slides up slightly */
.dialog-enter-active { transition: opacity 0.2s ease-out; }
.dialog-leave-active { transition: opacity 0.15s ease-in; }
.dialog-enter-from,
.dialog-leave-to { opacity: 0; }

.dialog-enter-active .dialog-panel { transition: transform 0.2s ease-out; }
.dialog-leave-active .dialog-panel { transition: transform 0.15s ease-in; }
.dialog-enter-from .dialog-panel,
.dialog-leave-to .dialog-panel { transform: translateY(8px) scale(0.96); }

@media (prefers-reduced-motion: reduce) {
    .dialog-enter-active,
    .dialog-leave-active,
    .dialog-enter-active .dialog-panel,
    .dialog-leave-active .dialog-panel { transition: none; }
}
</style>