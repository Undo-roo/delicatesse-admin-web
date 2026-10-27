<template>
    <modals-dialog v-model="open" :close-on-backdrop="!loading">
        <template #header="{ titleId }">
            <!-- w-full overrides the container's justify-end, so this content controls its own alignment -->
			<div :class="['flex size-10 items-center justify-center rounded-full', config.iconWrap]">
				<Icon :name="config.icon" class="size-5" />
			</div>
			<h2 :id="titleId" class="text-lg font-bold text-black">
				{{ title }}
			</h2>
        </template>

		{{ message }}

        <template #footer>
            <button
                type="button"
                class="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-50"
                :disabled="loading"
                @click="cancel"
            >
                {{ cancelText }}
            </button>
            <button
                type="button"
                :class="['rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50', config.button]"
                :disabled="loading"
                @click="emit('confirm')"
            >
                {{ loading ? 'Please wait…' : (confirmText ?? config.confirmText) }}
            </button>
        </template>
    </modals-dialog>
</template>

<script lang="ts" setup>

// TODO - ADD THESE TYPES AND INTERFACE TO types/

type Variant = 'destructive' | 'success' | 'warning' | 'info'

const props = withDefaults(defineProps<{
    variant?: Variant
    title: string
    message?: string
    confirmText?: string
    cancelText?: string
    loading?: boolean
}>(), {
    variant: 'warning',
    cancelText: 'Cancel',
    loading: false,
})

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ confirm: []; cancel: [] }>()

// full class strings on purpose: UnoCSS only generates classes it can find in the source,
// so building them as `bg-${color}-600` would silently produce nothing
const variants: Record<Variant, { icon: string; iconWrap: string; button: string; confirmText: string }> = {
    destructive: {
        icon: 'boxicons:trash',
        iconWrap: 'bg-red-100 text-red-600',
        button: 'bg-red-600 hover:bg-red-700',
        confirmText: 'Delete',
    },
    success: {
        icon: 'boxicons:check-circle',
        iconWrap: 'bg-green-100 text-green-600',
        button: 'bg-green-600 hover:bg-green-700',
        confirmText: 'Confirm',
    },
    warning: {
        icon: 'boxicons:error',
        iconWrap: 'bg-amber-100 text-amber-600',
        button: 'bg-amber-600 hover:bg-amber-700',
        confirmText: 'Continue',
    },
    info: {
        icon: 'boxicons:info-circle',
        iconWrap: 'bg-blue-100 text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        confirmText: 'OK',
    },
}

const config = computed(() => variants[props.variant])

function cancel() {
    open.value = false
    emit('cancel')
}
</script>